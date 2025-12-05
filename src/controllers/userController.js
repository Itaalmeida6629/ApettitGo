const UserService = require('../services/userService');
class UserController {
    // Método para listar todos os usuários
    static async getAll(req, res) {
        try {
            const users = await UserService.findAllUsers(); // Chama o service para buscar usuários
            res.json(users); // Retorna a lista em formato JSON
        } catch (error) {
            res.status(500).json({ error: error.message }); // Em caso de erro, retorna status 500(erro interno)
        }
    }
    // Método para criar um novo usuário
    static async create(req, res) {
        try {
            const id = await UserService.createUser(req.body); // Chama o service para criar usuário
            res.status(201).json({ message: 'Usuário criado com sucesso.', id }); // Retorna status 201(criado) e o ID
        } catch (error) {
            res.status(400).json({ error: error.message }); // Em caso de erro de validação, retorna status 400
        }
    }

}  
   

module.exports = UserController;