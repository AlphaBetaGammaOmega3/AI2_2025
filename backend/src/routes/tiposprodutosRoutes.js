const express = require('express');
const router = express.Router();
const tiposProdutosController = require('../controllers/tiposprodutosController');

router.post('/', tiposProdutosController.create);
router.get('/', tiposProdutosController.findAll);
router.get('/:idtipoproduto', tiposProdutosController.get);
router.put('/:idtipoproduto', tiposProdutosController.update);
router.delete('/:idtipoproduto', tiposProdutosController.delete);

module.exports = router;
