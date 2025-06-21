// middleware/isAdmin.js
const jwt = require('jsonwebtoken');
const db = require('../Models');
const User = db.users;

const JWT_SECRET = 'secretoforte'; // ideal usar .env

module.exports = async (req, res, next) => {
  try {
    // Recebe o token do header Authorization no formato: "Bearer TOKEN"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Corrigido: pegar índice 1, que é o token
    const token = authHeader.split(' ')[1];

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Busca o usuário para confirmar se existe e obter o tipo
    const user = await User.findByPk(decoded.iduser || decoded.id); // dependendo do payload

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se é admin (idtipouser == 4 conforme seu código)
    if (user.idtipouser !== 4) {
      return res.status(403).json({ message: 'Acesso negado: apenas administradores' });
    }

    // Guarda dados do usuário na requisição para uso posterior se precisar
    req.user = user;

    // Opcional: enviar o token como cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora
    });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};
