const bcrypt = require('bcryptjs');
const { users, tiposuser } = require('../Models');

module.exports = {

  async findAll(req, res) {
    try {
      const allUsers = await users.findAll({
        attributes: { exclude: ['password'] }, // exclui a senha do retorno
        include: [{ model: tiposuser, as: 'tipouser' }]
      });
      return res.json(allUsers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getMe(req, res) {
    try {
      const user = await users.findByPk(req.user.iduser, {
        attributes: { exclude: ['password'] },
        include: [{ model: tiposuser, as: 'tipouser' }]
      });

      if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const { iduser } = req.params;
      const user = await users.findByPk(iduser, {
        attributes: { exclude: ['password'] },
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await users.create({
        idtipouser,
        nome,
        email,
        password: hashedPassword,
        morada
      });
      // não envia a senha no JSON
      const userSafe = newUser.toJSON();
      delete userSafe.password;
      return res.status(201).json(userSafe);
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

      if (req.user.idtipouser !== 1 && idtipouser && idtipouser !== user.idtipouser) {
        return res.status(403).json({ error: 'Permissão negada para alterar tipo de utilizador' });
      }

      const updatedData = {
        nome: nome ?? user.nome,
        email: email ?? user.email,
        morada: morada ?? user.morada,
      };

      if (req.user.idtipouser === 1 && idtipouser) {
        updatedData.idtipouser = idtipouser;
      }

      if (password && password.trim() !== '') {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      await user.update(updatedData);

      const userSafe = user.toJSON();
      delete userSafe.password;
      return res.json(userSafe);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      const user = await users.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Utilizador não encontrado" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });

      return res.json({ message: "Palavra-passe atualizada com sucesso" });
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
