const express = require('express')
// Importa o framework Express
const StatusController = require('../controllers/statusController')
// Importa o controller responsável por gerenciar status
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para listar todos os status
router.get('/', StatusController.getAll)
// Rota para buscar status por ID
router.get('/:id', StatusController.getById)
// Rota para criar um novo status
router.post('/', StatusController.create)
// Rota para atualizar um status existente pelo ID
router.put('/:id', StatusController.update)
// Rota para deletar um status pelo ID
router.delete('/:id', StatusController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal