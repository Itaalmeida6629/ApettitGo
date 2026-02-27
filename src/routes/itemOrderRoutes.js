const express = require('express')
// Importa o framework Express
const ItemOrderController = require('../controllers/itemOrderController')
// Importa o controller responsável por gerenciar itens de pedido
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para listar todos os itens de um pedido específico
router.get('/order/:orderId', ItemOrderController.getAll)
// Rota para criar um novo item de pedido para um pedido específico
router.post('/order/:orderId', ItemOrderController.create)
// Rota para atualizar um item de pedido existente pelo ID
router.put('/:id', ItemOrderController.update)
// Rota para deletar um item de pedido pelo ID
router.delete('/:id', ItemOrderController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal