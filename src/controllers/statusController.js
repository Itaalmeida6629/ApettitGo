const StatusService = require('../services/statusService')

class StatusController {
    // Lista todos os status
    static async getAll(req, res) {
        try {
            const statuses = await StatusService.findAllStatuses()
            res.json(statuses)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca status por ID
    static async getById(req, res) {
        try {
            const status = await StatusService.findStatusById(req.params.id)
            res.json(status)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo status
    static async create(req, res) {
        try {
            const id = await StatusService.createStatus(req.body)
            res.status(201).json({ message: `Status criado com sucesso.`, id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um status existente
    static async update(req, res) {
        try {
            await StatusService.updateStatus(req.params.id, req.body)
            res.json({ message: 'Status atualizado com sucesso' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um status
    static async delete(req, res) {
        try {
            await StatusService.deleteStatus(req.params.id)
            res.json({ message: 'Status deletado com sucesso' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = StatusController