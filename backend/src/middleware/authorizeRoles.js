const jwt = require('jsonwebtoken');
const db = require('../Models');
const User = db.users;

const JWT_SECRET = 'secretoforte'; 

// Recebe os tipos de user permitidos por parâmetro
function authorizeRoles(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findByPk(decoded.iduser || decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User não encontrado' });
      }

      if (!allowedRoles.includes(user.idtipouser)) {
        return res.status(403).json({ message: 'Acesso negado: tipo de User não permitido' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  };
}

module.exports = authorizeRoles;
