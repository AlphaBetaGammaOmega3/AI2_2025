const { tiposproduto } = require('../Models');

module.exports = {

  async findAll(req, res) {
    try {
      const allTiposProd = await tiposproduto.findAll();
      return res.json(allTiposProd);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const { idtipoproduto } = req.params;
      const tipoProd = await tiposproduto.findByPk(idtipoproduto);
      if (!tipoProd) return res.status(404).json({ error: 'Tipo produto not found' });
      return res.json(tipoProd);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { descricao } = req.body;
      const newTipoProd = await tiposproduto.create({ descricao });
      return res.status(201).json(newTipoProd);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { idtipoproduto } = req.params;
      const { descricao } = req.body;

      const tipoProd = await tiposproduto.findByPk(idtipoproduto);
      if (!tipoProd) return res.status(404).json({ error: 'Tipo produto not found' });

      await tipoProd.update({ descricao });
      return res.json(tipoProd);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { idtipoproduto } = req.params;
      const tipoProd = await tiposproduto.findByPk(idtipoproduto);
      if (!tipoProd) return res.status(404).json({ error: 'Tipo produto not found' });

      await tipoProd.destroy();
      return res.json({ message: 'Tipo produto deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
