const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', carrinhoController.create);
router.get('/', carrinhoController.findAll);
router.get('/:iduser', carrinhoController.getByUser);
router.put('/:iduser', carrinhoController.update);
router.delete('/:iduser', carrinhoController.deleteByUser);
router.delete('/:iduser/:idprod', carrinhoController.deleteProdutoDoUser);

module.exports = router;
