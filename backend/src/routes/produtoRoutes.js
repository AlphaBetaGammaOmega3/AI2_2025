const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const isAdmin = require('../middleware/isAdmin');
const authorizeRoles = require('../middleware/authorizeRoles');
const isAuthenticated = require('../middleware/isAuthenticated'); // <-- importar


router.get('/', produtosController.findAll);
router.get('/:idproduto', produtosController.get);

// Rotas protegidas pelo middleware isAdmin
router.post('/', authorizeRoles(1), isAdmin, produtosController.create);
router.put('/:idproduto', authorizeRoles(1), isAdmin, produtosController.update);
router.delete('/:idproduto', authorizeRoles(1), isAdmin, produtosController.delete);

module.exports = router;
