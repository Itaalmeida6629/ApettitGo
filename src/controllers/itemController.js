const ItemService = require('../services/itemService')

class ItemController {
    // Lista todos os itens
    static async getAll(req, res) {
        try {
            const items = await ItemService.findAllItems()
            res.json(items)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca item por ID
    static async getById(req, res) {
        try {
            const item = await ItemService.findItemById(req.params.id)
            res.json(item)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo item
    static async create(req, res) {
        try {
            const id = await ItemService.createItem(req.body)
            res.status(201).json({ message: 'Item criado com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um item existente
    static async update(req, res) {
        try {
            await ItemService.updateItem(req.params.id, req.body)
            res.json({ message: 'Item atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um item
    static async delete(req, res) {
        try {
            await ItemService.deleteItem(req.params.id)
            res.json({ message: 'Item deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = ItemController
