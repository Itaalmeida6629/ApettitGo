const express = require('express')
// Importa o framework Express
const ItemController = require('../controllers/itemController')
// Importa o controller responsável por gerenciar itens
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para criar um novo item
router.post('/', ItemController.create)
// Rota para listar todos os itens
router.get('/', ItemController.getAll)
// Rota para buscar item por ID
router.get('/:id', ItemController.getById)
// Rota para atualizar um item existente pelo ID
router.put('/:id', ItemController.update)
// Rota para deletar um item pelo ID
router.delete('/:id', ItemController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal
