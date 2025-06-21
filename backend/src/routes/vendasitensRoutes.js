const express = require('express');
const router = express.Router();
const vendasItensController = require('../controllers/vendasitensController');

// Listar todos os itens de vendas
router.get('/', vendasItensController.findAll);

// Buscar item por venda + produto (chave composta)
router.get('/:idvenda/:idprod', vendasItensController.get);

// Criar item de venda
router.post('/', vendasItensController.create);

// Atualizar item de venda
router.put('/:idvenda/:idprod', vendasItensController.update);

// Deletar item de venda
router.delete('/:idvenda/:idprod', vendasItensController.delete);

module.exports = router;
