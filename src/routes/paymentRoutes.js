const express = require('express');
// Importa o framework Express
const PaymentController = require('../controllers/paymentController')
// Importa o controller responsável por gerenciar formas de pagamento
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para criar uma nova forma de pagamento
router.post('/', PaymentController.create)
// Rota para listar todas as formas de pagamento
router.get('/', PaymentController.getAll)
// Rota para buscar forma de pagamento por ID
router.get('/:id', PaymentController.getById)
// Rota para atualizar uma forma de pagamento existente pelo ID
router.put('/:id', PaymentController.update)
// Rota para deletar uma forma de pagamento pelo ID
router.delete('/:id', PaymentController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal