const express = require('express');
// Importa o framework Express
const AdminController = require('../controllers/adminController');
// Importa o controller responsável por gerenciar administradores
const router = express.Router();
// Cria uma nova instância de roteador do Express

// Rota para criar um novo administrador
router.post('/', AdminController.create);
// Rota para listar todos os administradores
router.get('/', AdminController.getAll);
// Rota para buscar administrador por ID
router.get('/:id', AdminController.getById);
// Rota para atualizar um administrador existente pelo ID
router.put('/:id', AdminController.update);
// Rota para deletar um administrador pelo ID
router.delete('/:id', AdminController.delete);

module.exports = router;
// Exporta o roteador configurado para ser usado no app principal
