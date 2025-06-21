const { tiposuser } = require('../Models');

module.exports = {

  async findAll(req, res) {
    try {
      const allTipos = await tiposuser.findAll();
      return res.json(allTipos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const { idtipouser } = req.params;
      const tipo = await tiposuser.findByPk(idtipouser);
      if (!tipo) return res.status(404).json({ error: 'Tipo user not found' });
      return res.json(tipo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { descricao } = req.body;
      const newTipo = await tiposuser.create({ descricao });
      return res.status(201).json(newTipo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { idtipouser } = req.params;
      const { descricao } = req.body;

      const tipo = await tiposuser.findByPk(idtipouser);
      if (!tipo) return res.status(404).json({ error: 'Tipo user not found' });

      await tipo.update({ descricao });
      return res.json(tipo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { idtipouser } = req.params;
      const tipo = await tiposuser.findByPk(idtipouser);
      if (!tipo) return res.status(404).json({ error: 'Tipo user not found' });

      await tipo.destroy();
      return res.json({ message: 'Tipo user deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
