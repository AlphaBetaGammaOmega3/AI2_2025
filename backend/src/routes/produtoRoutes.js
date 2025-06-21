const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const isAdmin = require('../middleware/isAdmin');
const authorizeRoles = require('../middleware/authorizeRoles');

router.get('/', produtosController.findAll);
router.get('/:idproduto', produtosController.get);

// Rotas protegidas pelo middleware isAdmin
router.post('/', authorizeRoles(4), isAdmin, produtosController.create);
router.put('/:idproduto', authorizeRoles(4), isAdmin, produtosController.update);
router.delete('/:idproduto', authorizeRoles(4), isAdmin, produtosController.delete);

module.exports = router;
