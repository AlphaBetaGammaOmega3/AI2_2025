const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:iduser', controller.get);
router.put('/:iduser', controller.update);
router.delete('/:iduser', controller.delete);

module.exports = router;
