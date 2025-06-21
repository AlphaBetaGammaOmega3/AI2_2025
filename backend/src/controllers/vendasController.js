const { vendas, vendas_itens, produtos, carrinhos } = require('../Models');
const { Sequelize } = require('sequelize');

module.exports = {

  async findAll(req, res) {
    try {
      const allVendas = await vendas.findAll({
        include: [
          {
            model: vendas_itens,
            as: 'vendas_itens',
            include: [
              { 
                model: produtos, 
                as: 'idprod_produto'
              }
            ]
          }
        ]
      });
      return res.json(allVendas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const { idvenda } = req.params;
      const venda = await vendas.findOne({
        where: { idvenda },
        include: [
          {
            model: vendas_itens,
            as: 'vendas_itens',
            include: [
              { model: produtos, as: 'idprod_produto' }
            ]
          }
        ]
      });
      if (!venda) return res.status(404).json({ error: 'Venda not found' });
      return res.json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { iduser } = req.body;

      if (!iduser) {
        return res.status(400).json({ error: 'O iduser é obrigatório' });
      }

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
          return res.status(400).json({ error: `Estoque insuficiente para o produto ${item.idprod_produto.nome}` });
        }
        valorfinal += item.quantidade * item.idprod_produto.valor;
      }

      // Cria a venda com data atual
      const novaVenda = await vendas.create({
        iduser,
        valorfinal,
        datacompra: new Date(),
      });

      // Cria os itens da venda e atualiza o estoque
      for (const item of carrinhoProdutos) {
        await vendas_itens.create({
          idvenda: novaVenda.idvenda,
          idprod: item.idprod,
          quantidade: item.quantidade,
          precounitario: item.idprod_produto.valor,
        });

        await produtos.update(
          { stock: Sequelize.literal(`stock - ${item.quantidade}`) },
          { where: { idprod: item.idprod } }
        );
      }

      // Limpa o carrinho do usuário
      await carrinhos.destroy({ where: { iduser } });

      // Retorna a venda completa com itens e produtos relacionados
      const vendaCompleta = await vendas.findOne({
        where: { idvenda: novaVenda.idvenda },
        include: [
          {
            model: vendas_itens,
            as: 'vendas_itens',
            include: [{ model: produtos, as: 'idprod_produto' }],
          },
        ],
      });

      return res.status(201).json(vendaCompleta);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { idvenda } = req.params;
      const { valorfinal, datacompra } = req.body;

      const venda = await vendas.findByPk(idvenda);
      if (!venda) return res.status(404).json({ error: 'Venda not found' });

      await venda.update({ valorfinal, datacompra });
      return res.json(venda);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { idvenda } = req.params;
      const venda = await vendas.findByPk(idvenda);
      if (!venda) return res.status(404).json({ error: 'Venda not found' });

      // Apaga os itens da venda primeiro
      await vendas_itens.destroy({ where: { idvenda } });

      // Apaga a venda
      await venda.destroy();

      return res.json({ message: 'Venda deleted successfully' });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
