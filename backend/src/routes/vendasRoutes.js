const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/', isAuthenticated, vendasController.create);
router.get('/', isAuthenticated, vendasController.findAll);
router.get('/:idvenda', isAuthenticated, vendasController.get);
router.put('/:idvenda', isAuthenticated, vendasController.update); // se quiser permitir update no futuro
router.delete('/:idvenda', isAuthenticated, vendasController.delete);

module.exports = router;
