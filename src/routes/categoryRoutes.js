const express = require('express')
// Importa o framework Express
const CategoryController = require('../controllers/categoryController')
// Importa o controller responsável por gerenciar categorias
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para criar uma nova categoria
router.post('/', CategoryController.create)
// Rota para listar todas as categorias
router.get('/', CategoryController.getAll)
// Rota para buscar categoria por ID
router.get('/:id', CategoryController.getById)
// Rota para atualizar uma categoria existente pelo ID
router.put('/:id', CategoryController.update)
// Rota para deletar uma categoria pelo ID
router.delete('/:id', CategoryController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal