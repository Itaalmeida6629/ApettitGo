const OrderService = require('../services/orderService')

class OrderController {
    // Lista todos os pedidos
    static async getAll(req, res) {
        try {
            const orders = await OrderService.findAllOrders()
            res.json(orders)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca pedido por ID
    static async getById(req, res) {
        try {
            const order = await OrderService.findOrderById(req.params.id)
            res.json(order)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo pedido
    static async create(req, res) {
        try {
            const id = await OrderService.createOrder(req.body)
            res.status(201).json({ message: 'Pedido criado com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um pedido existente
    static async update(req, res) {
        try {
            await OrderService.updateOrder(req.params.id, req.body)
            res.json({ message: 'Pedido atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um pedido existente
    static async delete(req, res) {
        try {
            await OrderService.deleteOrder(req.params.id)
            res.json({ message: 'Pedido deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
} 

module.exports = OrderController