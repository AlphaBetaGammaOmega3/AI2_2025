const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/isAuthenticated'); // ⬅️ Importa o middleware

router.post('/', controller.create);
router.get('/', isAuthenticated, controller.findAll); // se quiser proteger a listagem
router.get('/:iduser', isAuthenticated, controller.get); // protege perfil
router.put('/:iduser', isAuthenticated, controller.update); // ⬅️ ESSENCIAL
router.delete('/:iduser', isAuthenticated, controller.delete); // opcional

module.exports = router;
