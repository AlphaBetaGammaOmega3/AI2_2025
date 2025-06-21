const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.post('/', vendasController.create);
router.get('/', vendasController.findAll);
router.get('/:idvenda', vendasController.get);
router.put('/:idvenda', vendasController.update); // se quiser permitir update no futuro
router.delete('/:idvenda', vendasController.delete);

module.exports = router;
