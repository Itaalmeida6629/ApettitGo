const express = require('express')
// Importa o framework Express
const OrderController = require('../controllers/orderController')
// Importa o controller responsável por gerenciar pedidos
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para listar todos os pedidos
router.get('/', OrderController.getAll)
// Rota para buscar pedido por ID
router.get('/:id', OrderController.getById)
// Rota para criar um novo pedido
router.post('/', OrderController.create)
// Rota para atualizar um pedido existente pelo ID
router.put('/:id', OrderController.update)
// Rota para deletar um pedido pelo ID
router.delete('/:id', OrderController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal