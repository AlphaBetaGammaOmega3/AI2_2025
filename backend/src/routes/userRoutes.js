const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/isAuthenticated'); 

router.get('/me', isAuthenticated, controller.getMe); 
router.get('/', isAuthenticated, controller.findAll); 
router.get('/:iduser', isAuthenticated, controller.get); 
router.post('/', controller.create);// 
router.put('/:iduser', isAuthenticated, controller.update); 
router.delete('/:iduser', isAuthenticated, controller.delete); 


module.exports = router;
