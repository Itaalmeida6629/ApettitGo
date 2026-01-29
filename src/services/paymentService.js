const PaymentModel = require('../models/paymentModels')
const validateString = require('../utils/validateString')

class PaymentService {
    static async findAllPayments() {
        return PaymentModel.findAll()
    }

    static async findPaymentById(id) {
        const payment = await PaymentModel.findById(id)
        if (!payment) throw new Error('Forma de pagamento não encontrada')
        return payment
    }
    
    static async createPayment(data) {
        const { forma_pagamento } = data
        if (!forma_pagamento) throw new Error('Campo obrigatório faltando (forma de pagamento)')
        const formaPagamentoNormalizado = forma_pagamento.trim().toLowerCase()
        const erroFormaPagamento = validateString(formaPagamentoNormalizado, { min: 3, max: 100, fieldName: 'forma_pagamento' })
        if (erroFormaPagamento) throw new Error(erroFormaPagamento)
        const formaPagamentoExistente = await PaymentModel.findByName(formaPagamentoNormalizado)
        if (formaPagamentoExistente) throw new Error('Já existe uma forma de pagamento com esse nome')

        return PaymentModel.create({ forma_pagamento })
    }

    static async updatePayment(id, data) {
        const notFind = await PaymentModel.findById(id)
        if (!notFind) throw new Error('Forma de pagamento não encontrada')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.forma_pagamento !== undefined) {
            const formaPagamentoNormalizado = payload.forma_pagamento.trim().toLowerCase()
            const error = validateString(formaPagamentoNormalizado, { min: 3, max: 100, fieldName: 'forma_pagamento' })
            if (error) throw new Error(error)
        }
        const formaPagamentoExistente = await PaymentModel.findByName(formaPagamentoNormalizado)
        if (formaPagamentoExistente) throw new Error('Já existe uma forma de pagamento com esse nome')

        await PaymentModel.update(id, payload)
    }
    
    static async deletePayment(id) {
        const notFind = await PaymentModel.findById(id)
        if (!notFind) throw new Error('Forma de pagamento não encontrada')
        await PaymentModel.delete(id)
    }
}

module.exports = PaymentService