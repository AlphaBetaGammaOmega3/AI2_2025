const bcrypt = require('bcryptjs');
const { users, tiposuser } = require('../Models');

module.exports = {

  async findAll(req, res) {
    try {
      const allUsers = await users.findAll({
        include: [{ model: tiposuser, as: 'tipouser' }]
      });
      return res.json(allUsers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const { iduser } = req.params;
      const user = await users.findByPk(iduser, {
        include: [{ model: tiposuser, as: 'tipouser' }]
      });
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { idtipouser, nome, email, password, morada } = req.body;
      
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds
      
      const newUser = await users.create({
        idtipouser,
        nome,
        email,
        password: hashedPassword,
        morada
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { iduser } = req.params;
      const { idtipouser, nome, email, password, morada } = req.body;

      const user = await users.findByPk(iduser);
      if (!user) return res.status(404).json({ error: 'User not found' });

      await user.update({ idtipouser, nome, email, password, morada });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { iduser } = req.params;
      const user = await users.findByPk(iduser);
      if (!user) return res.status(404).json({ error: 'User not found' });

      await user.destroy();
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
