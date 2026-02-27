const ItemOrderService = require('../services/itemOrderService')

class ItemOrderController {
    // Lista todos os itens de um pedido
    static async getAll(req, res) {
        try {
            const items = await ItemOrderService.findAllItemsByOrderId(req.params.orderId)
            res.json(items)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Cria um novo item de pedido
    static async create(req, res) {
        try {
            const id = await ItemOrderService.createItemOrder(req.params.orderId, req.body)
            res.status(201).json({ message: 'Item de pedido criado com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um item de pedido existente
    static async update(req, res) {
        try {
            const updated = await ItemOrderService.updateItemOrder(req.params.id, req.body)
            res.json({ message: 'Item de pedido atualizado com sucesso.', updated })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um item de pedido
    static async delete(req, res) {
        try {
            await ItemOrderService.deleteItemOrder(req.params.id)
            res.json({ message: 'Item de pedido deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = ItemOrderController
