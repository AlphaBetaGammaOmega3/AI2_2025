const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/isAuthenticated'); 

router.get('/me', isAuthenticated, controller.getMe); 
router.get('/', isAuthenticated, controller.findAll); 
router.get('/:iduser', isAuthenticated, controller.get); 
router.post('/', controller.create);
router.post('/reset-password', controller.resetPassword);
router.put('/:iduser', isAuthenticated, controller.update); 
router.delete('/:iduser', isAuthenticated, controller.delete); 
router.delete('/delete-admin', async (req, res) => {
  try {
    const deleted = await db.users.destroy({ where: { email: 'admin@gmail.com' } });
    res.json({ message: `Admin deletado (${deleted} registo(s))` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
