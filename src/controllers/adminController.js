const AdminService = require('../services/adminService')

class AdminController {
    // Lista todos os administradores
    static async getAll(req, res) {
        try {
            const admins = await AdminService.findAllAdmins()
            res.json(admins)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca administrador por ID
    static async getById(req, res) {
        try {
            const admin = await AdminService.findAdminById(req.params.id)
            res.json(admin)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo administrador
    static async create(req, res) {
        try {
            const id = await AdminService.createAdmin(req.body)
            res.status(201).json({ message: 'Administrador criado com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um administrador existente
    static async update(req, res) {
        try {
            await AdminService.updateAdmin(req.params.id, req.body)
            res.json({ message: 'Administrador atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um administrador
    static async delete(req, res) {
        try {
            await AdminService.deleteAdmin(req.params.id)
            res.json({ message: 'Administrador deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = AdminController