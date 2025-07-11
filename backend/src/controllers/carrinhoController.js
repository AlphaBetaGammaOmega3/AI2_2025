const { carrinhos, users, produtos, vendas } = require('../Models');

module.exports = {
  async findAll(req, res) {
    try {
      const allCarrinhos = await carrinhos.findAll({
        include: [{ model: users, as: 'iduser_user' }]  // verifique alias aqui e no Models/index.js
      });
      return res.json(allCarrinhos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getByUser(req, res) {
    try {
      const { iduser } = req.params;

      const carrinhoItens = await carrinhos.findAll({
        where: { iduser },
        include: [
          { model: users, as: 'iduser_user' },
          { model: produtos, as: 'idprod_produto' }  // incluir dados do produto
        ]
      });

      if (!carrinhoItens || carrinhoItens.length === 0)
        return res.status(404).json({ error: 'Carrinho do usuário não encontrado ou vazio' });

      return res.json(carrinhoItens);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


  async create(req, res) {
  try {
    const { iduser, idprod, quantidade } = req.body;

    console.log("REQ BODY RECEBIDO:", req.body);

    if (!iduser || !idprod || !quantidade) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (iduser, idprod, quantidade)' });
    }

    // Verifica se já existe esse produto no carrinho do mesmo user
    const existente = await carrinhos.findOne({
      where: { iduser, idprod }
    });

    if (existente) {
      // Atualiza quantidade se já existir
      await existente.update({ quantidade: existente.quantidade + quantidade });
      return res.status(200).json(existente);
    }

    // Cria novo item
    const newCarrinho = await carrinhos.create({ iduser, idprod, quantidade });
    return res.status(201).json(newCarrinho);
  } catch (error) {
    console.error("Erro ao criar item no carrinho:", error.message, error);
    return res.status(500).json({ error: error.message });
  }
},


  async update(req, res) {
    try {
      const { iduser } = req.params;
      const { iduser: novoIdUser, idprod, quantidade } = req.body;

      console.log('iduser (param):', iduser);
      console.log('Body:', req.body);

      const carrinho = await carrinhos.findOne({ where: { iduser } });
      if (!carrinho) return res.status(404).json({ error: 'Carrinho not found' });

      await carrinho.update({
        iduser: novoIdUser !== undefined ? novoIdUser : carrinho.iduser,
        idprod: idprod !== undefined ? idprod : carrinho.idprod,
        quantidade: quantidade !== undefined ? quantidade : carrinho.quantidade
      });

      return res.json(carrinho);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteProdutoDoUser(req, res) {
  try {
    console.log('DELETE /carrinhos/:iduser/:idprod chamada');
    console.log('Parâmetros recebidos:', req.params);

    const { iduser, idprod } = req.params;

    const deletedCount = await carrinhos.destroy({
      where: { iduser, idprod }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado no carrinho desse usuário' });
    }

    return res.json({ message: `Produto ${idprod} removido do carrinho do usuário ${iduser}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},


  async deleteByUser(req, res) {
    try {
      const { iduser } = req.params;

      const deletedCount = await carrinhos.destroy({
        where: { iduser }
      });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Nenhum carrinho encontrado para esse usuário' });
      }

      return res.json({ message: `Todos os itens do carrinho do usuário ${iduser} foram deletados` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

};
