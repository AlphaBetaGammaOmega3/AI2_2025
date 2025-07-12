const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const produtosController = require('../controllers/produtosController');
const isAdmin = require('../middleware/isAdmin');
const authorizeRoles = require('../middleware/authorizeRoles');

// multer config (não cria pasta aqui)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

router.get('/', produtosController.findAll);
router.get('/:idproduto', produtosController.get);

router.post('/', authorizeRoles(1), isAdmin, produtosController.create);
router.put('/:idproduto', authorizeRoles(1), isAdmin, produtosController.update);
router.delete('/:idproduto', authorizeRoles(1), isAdmin, produtosController.delete);

module.exports = router;
