const { vendas, vendas_itens, produtos, carrinhos } = require('../Models');
const { Sequelize } = require('sequelize');

module.exports = {

  // Listar todas as vendas (admin) ou apenas do usuário logado (cliente)
  async findAll(req, res) {
    try {
      const { iduser, idtipouser } = req.user;
      const whereClause = idtipouser === 1 ? {} : { iduser }; // admin vê tudo, clientes só as suas

      const allVendas = await vendas.findAll({
        where: whereClause,
        include: [
          {
            model: vendas_itens,
            as: 'vendas_itens',
            required: false,  // <<< aqui para evitar falhas se algum produto foi eliminado
          }
        ],
        order: [['datacompra', 'DESC']]
      });

      return res.json(allVendas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obter uma venda específica
  async get(req, res) {
    try {
      const { idvenda } = req.params;
      const { iduser, idtipouser } = req.user;

      const venda = await vendas.findOne({
        where: { idvenda },
        include: [
          {
            model: vendas_itens,
            as: 'vendas_itens',
            required: false,  // <<< evita erro se itens faltarem
          }
        ]
      });

      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      // Se não for admin, só pode ver suas próprias vendas
      if (idtipouser !== 1 && venda.iduser !== iduser) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      return res.json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar nova venda a partir do carrinho do usuário
  async create(req, res) {
    try {
      const { iduser } = req.user;

      // Busca os produtos no carrinho do usuário
      const carrinhoProdutos = await carrinhos.findAll({
        where: { iduser },
        include: [{ model: produtos, as: 'idprod_produto' }],
      });

      if (carrinhoProdutos.length === 0) {
        return res.status(400).json({ error: 'Carrinho vazio' });
      }

      // Calcula o valor total e verifica estoque
      let valorfinal = 0;
      for (const item of carrinhoProdutos) {
        if (item.quantidade > item.idprod_produto.stock) {
          return res.status(400).json({
            error: `Estoque insuficiente para o produto ${item.idprod_produto.nome}`,
          });
        }
        valorfinal += item.quantidade * item.idprod_produto.valor;
      }

      // Cria a venda com data atual (ajustada para horário de Lisboa)
      const dataAgoraLisboa = new Date(
        new Date().toLocaleString("en-GB", { timeZone: "Europe/Lisbon" })
      );

      const novaVenda = await vendas.create({
        iduser,
        valorfinal,
        datacompra: dataAgoraLisboa,
      });

      // Cria os itens da venda e atualiza o estoque
      for (const item of carrinhoProdutos) {
        await vendas_itens.create({
          idvenda: novaVenda.idvenda,
          idprod: item.idprod,
          quantidade: item.quantidade,
          precounitario: item.idprod_produto.valor,
          nomeprod: item.idprod_produto.nome,
          imagemprod: item.idprod_produto.imagem,
          tamanhoprod: item.idprod_produto.tamanho,
        });

        await produtos.update(
          { stock: Sequelize.literal(`stock - ${item.quantidade}`) },
          { where: { idprod: item.idprod } }
        );
      }

      // Limpa o carrinho do usuário
      await carrinhos.destroy({ where: { iduser } });

      // Retorna a venda completa
      const vendaCompleta = await vendas.findOne({
        where: { idvenda: novaVenda.idvenda },
        include: [{ model: vendas_itens, as: 'vendas_itens', required: false }],
      });

      return res.status(201).json(vendaCompleta);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar venda (pouco usado)
  async update(req, res) {
    try {
      const { idvenda } = req.params;
      const { valorfinal, datacompra } = req.body;
      const { iduser, idtipouser } = req.user;

      const venda = await vendas.findByPk(idvenda);
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });

      // Só admin ou dono da venda podem atualizar
      if (idtipouser !== 1 && venda.iduser !== iduser) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      await venda.update({ valorfinal, datacompra });
      return res.json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar uma venda (ex: por admin)
  async delete(req, res) {
    try {
      const { idvenda } = req.params;
      const { iduser, idtipouser } = req.user;

      const venda = await vendas.findByPk(idvenda);
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });

      // Só admin ou dono da venda podem deletar
      if (idtipouser !== 1 && venda.iduser !== iduser) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      // Remove os itens associados à venda
      await vendas_itens.destroy({ where: { idvenda } });

      // Remove a venda
      await venda.destroy();

      return res.json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
