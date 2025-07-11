const express = require('express');
const router = express.Router();
const tiposProdutosController = require('../controllers/tiposprodutosController');
const isAdmin = require('../middleware/isAdmin');

router.post('/', isAdmin, tiposProdutosController.create);
router.get('/', tiposProdutosController.findAll);
router.get('/:idtipoproduto', tiposProdutosController.get);
router.put('/:idtipoproduto', isAdmin, tiposProdutosController.update);
router.delete('/:idtipoproduto', isAdmin, tiposProdutosController.delete);

module.exports = router;
