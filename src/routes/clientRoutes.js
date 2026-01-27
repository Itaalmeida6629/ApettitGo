const express = require('express')
// Importa o framework Express
const ClientController = require('../controllers/clientController')
// Importa o controller responsável por gerenciar clientes
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para criar um novo cliente
router.post('/', ClientController.create)
// Rota para listar todos os clientes
router.get('/', ClientController.getAll)
// Rota para buscar cliente por ID
router.get('/:id', ClientController.getById)
// Rota para atualizar um cliente existente pelo ID
router.put('/:id', ClientController.update)
// Rota para deletar um cliente pelo ID
router.delete('/:id', ClientController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal