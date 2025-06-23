const express = require('express');
const router = express.Router();
const vendasItensController = require('../controllers/vendasitensController');
const isAdmin = require('../middleware/isAdmin');

router.get('/', isAdmin, vendasItensController.findAll);
router.get('/:idvenda/:idprod', isAdmin, vendasItensController.get);
router.post('/', isAdmin, vendasItensController.create);
router.put('/:idvenda/:idprod', isAdmin, vendasItensController.update);
router.delete('/:idvenda/:idprod', isAdmin, vendasItensController.delete);

module.exports = router;
