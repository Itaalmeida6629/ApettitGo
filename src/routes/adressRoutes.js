const express = require('express')
// Importa o framework Express
const AdressController = require('../controllers/adressController')
// Importa o controller responsável por gerenciar endereços
const router = express.Router()
// Cria uma nova instância de roteador do Express
// Rota para listar todos os endereços
router.get('/', AdressController.getAll)
// Rota para buscar endereço por ID
router.get('/:id', AdressController.getById)
// Rota para criar um novo endereço
router.post('/', AdressController.create)
// Rota para atualizar um endereço existente pelo ID
router.put('/:id', AdressController.update)
// Rota para deletar um endereço pelo ID
router.delete('/:id', AdressController.delete)

module.exports = router
// Exporta o roteador configurado para ser usado no app principal