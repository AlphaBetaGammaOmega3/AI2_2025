const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/isAuthenticated'); 

// Rota para obter dados do próprio usuário (logado)
router.get('/me', isAuthenticated, controller.getMe); 

// Rota para listar todos os usuários (requer autenticação)
router.get('/', isAuthenticated, controller.findAll); 

// Rota para pegar um usuário por id
router.get('/:iduser', isAuthenticated, controller.get); 

// Criar usuário (pode ser aberto, sem autenticação)
router.post('/', controller.create);

// Resetar senha
router.post('/reset-password', controller.resetPassword);

// Atualizar usuário (requer autenticação)
router.put('/:iduser', isAuthenticated, controller.update); 

// Deletar usuário (requer autenticação)
router.delete('/:iduser', isAuthenticated, controller.delete); 

module.exports = router;
