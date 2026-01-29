const PaymentService = require('../services/paymentService')

class PaymentController {
    // Lista todas as formas de pagamento
    static async getAll(req, res) {
        try {
            const payments = await PaymentService.findAllPayments()
            res.json(payments)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca forma de pagamento por ID
    static async getById(req, res) {
        try {
            const payment = await PaymentService.findPaymentById(req.params.id)
            res.json(payment)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria uma nova forma de pagamento
    static async create(req, res) {
        try {
            const id = await PaymentService.createPayment(req.body)
            res.status(201).json({ message: `Forma de pagamento criada com sucesso.`, id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza uma forma de pagamento existente
    static async update(req, res) {
        try {
            await PaymentService.updatePayment(req.params.id, req.body)
            res.json({ message: 'Forma de pagamento atualizada com sucesso' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta uma forma de pagamento
    static async delete(req, res) {
        try {
            await PaymentService.deletePayment(req.params.id)
            res.json({ message: 'Forma de pagamento deletada com sucesso' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = PaymentController