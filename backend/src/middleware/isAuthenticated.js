const jwt = require('jsonwebtoken');
const db = require('../Models');
const User = db.users;

const JWT_SECRET = process.env.JWT_SECRET || 'secretoforte';

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho está presente e começa com 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    // Decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Procura o user na bd
    const user = await User.findByPk(decoded.iduser || decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User não encontrado' });
    }

    // Injeta o user no request
    req.user = user;
    next(); // para o próximo middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado', error: error.message });
  }
};
