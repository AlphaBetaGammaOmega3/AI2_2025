const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/', isAuthenticated, carrinhoController.create);
router.get('/', isAuthenticated, carrinhoController.findAll);
router.get('/:iduser', isAuthenticated, carrinhoController.getByUser);
router.put('/:iduser', isAuthenticated, carrinhoController.update);
router.delete('/:iduser', isAuthenticated, carrinhoController.deleteByUser);
router.delete('/:iduser/:idprod', isAuthenticated, carrinhoController.deleteProdutoDoUser);

module.exports = router;
