const express = require('express');
const router = express.Router();
const tiposUsersController = require('../controllers/tiposusersController');
const isAdmin = require('../middleware/isAdmin');

router.post('/', isAdmin, tiposUsersController.create);
router.get('/', isAdmin, tiposUsersController.findAll);
router.get('/:idtipouser', isAdmin, tiposUsersController.get);
router.put('/:idtipouser', isAdmin, tiposUsersController.update);
router.delete('/:idtipouser', isAdmin, tiposUsersController.delete);

module.exports = router;
