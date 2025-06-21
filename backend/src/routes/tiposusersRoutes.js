const express = require('express');
const router = express.Router();
const tiposUsersController = require('../controllers/tiposusersController');

router.post('/', tiposUsersController.create);
router.get('/', tiposUsersController.findAll);
router.get('/:idtipouser', tiposUsersController.get);
router.put('/:idtipouser', tiposUsersController.update);
router.delete('/:idtipouser', tiposUsersController.delete);

module.exports = router;
