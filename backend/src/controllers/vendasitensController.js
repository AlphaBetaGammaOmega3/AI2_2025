const { vendas_itens, produtos, vendas } = require('../Models');

module.exports = {

  // Listar todos os itens de venda
  async findAll(req, res) {
    try {
      const allItens = await vendas_itens.findAll({
        include: [
          { model: produtos, as: 'idprod_produto' },
          { model: vendas, as: 'idvenda_venda' }
        ]
      });
      return res.json(allItens);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar um item de venda por PK composta (idvenda + idprod)
  async get(req, res) {
    try {
      const { idvenda, idprod } = req.params;
      const item = await vendas_itens.findOne({
        where: { idvenda, idprod },
        include: [
          { model: produtos, as: 'idprod_produto' },
          { model: vendas, as: 'idvenda_venda' }
        ]
      });
      if (!item) return res.status(404).json({ error: 'Item de venda não encontrado' });
      return res.json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar um item de venda
  async create(req, res) {
    try {
      const { idvenda, idprod, quantidade, precounitario } = req.body;

      // Validar se item já existe (PK composta)
      const exists = await vendas_itens.findOne({ where: { idvenda, idprod } });
      if (exists) {
        return res.status(400).json({ error: 'Item de venda já existe' });
      }

      const novoItem = await vendas_itens.create({ idvenda, idprod, quantidade, precounitario });
      return res.status(201).json(novoItem);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar um item de venda
  async update(req, res) {
    try {
      const { idvenda, idprod } = req.params;
      const { quantidade, precounitario } = req.body;

      const item = await vendas_itens.findOne({ where: { idvenda, idprod } });
      if (!item) return res.status(404).json({ error: 'Item de venda não encontrado' });

      await item.update({ quantidade, precounitario });
      return res.json(item);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar um item de venda
  async delete(req, res) {
    try {
      const { idvenda, idprod } = req.params;

      const item = await vendas_itens.findOne({ where: { idvenda, idprod } });
      if (!item) return res.status(404).json({ error: 'Item de venda não encontrado' });

      await item.destroy();
      return res.json({ message: 'Item de venda deletado com sucesso' });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
