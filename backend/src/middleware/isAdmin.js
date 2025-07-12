const jwt = require('jsonwebtoken');
const db = require('../Models');
const User = db.users;

const JWT_SECRET = 'secretoforte';

module.exports = async (req, res, next) => {
  try {
    // Recebe o token do header Authorization no formato: "Bearer TOKEN"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // índice 1, é o token
    const token = authHeader.split(' ')[1];

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Procura o user para confirmar se existe e obtem o tipo
    const user = await User.findByPk(decoded.iduser || decoded.id); // dependendo do payload

    if (!user) {
      return res.status(401).json({ message: 'User não encontrado' });
    }

    // Verifica se é admin (idtipouser == 1)
    if (user.idtipouser !== 1) {
      return res.status(403).json({ message: 'Acesso negado: apenas administradores' });
    }

    // Guarda dados do user na requisição para uso posterior
    req.user = user;

    // enviar o token como cookie httpOnly
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
