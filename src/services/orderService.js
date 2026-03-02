const OrderModel = require('../models/orderModels')
const ClientModel = require('../models/clientModels')
const AddressModel = require('../models/adressModels')
const StatusModel = require('../models/statusModels')
const tipos = ['delivery', 'retirada']

class OrderService {
    static async findAllOrders() {
        return OrderModel.findAll()
    }

    static async findOrderById(id) {
        const order = await OrderModel.findById(id)
        if (!order) throw new Error('Pedido não encontrado')
        return order
    }

    static async createOrder(data) {
        const { id_cliente, tipo, taxa_entrega, valor_total, id_endereco, id_status } = data
        if (!id_cliente || !tipo || !id_status) {
            throw new Error('Campos obrigatórios faltando (id_cliente, tipo, taxa_entrega, id_status)')
        }

        const tipoNormalizado = tipo.trim().toLowerCase()

        if (!Number.isInteger(id_cliente)) throw new Error('ID do cliente inválido')
        const clienteExistente = await ClientModel.findById(id_cliente)
        if (!clienteExistente) throw new Error('Cliente não encontrado')

        if (!tipos.includes(tipoNormalizado)) throw new Error('Tipo de pedido inválido')
        
        if (taxa_entrega) {
        var taxaEntregaNumero = Number(taxa_entrega)
        if (isNaN(taxaEntregaNumero) || taxaEntregaNumero < 0) throw new Error('Taxa de entrega inválida')
        } else {
            taxaEntregaNumero = 0
        }

        if (id_endereco !== undefined) {
            if (!Number.isInteger(id_endereco)) throw new Error('ID do endereço inválido')
            const enderecoExistente = await AddressModel.findById(id_endereco)
            if (!enderecoExistente) throw new Error('Endereço não encontrado')
        }

        if (!Number.isInteger(id_status)) throw new Error('ID do status inválido')
        const statusExistente = await StatusModel.findById(id_status)
        if (!statusExistente) throw new Error('Status não encontrado')

        return OrderModel.create({ id_cliente, tipo, taxa_entrega: taxaEntregaNumero, id_endereco, id_status })
    }

    
    static async updateOrder(id, data) {
        const notFind = await OrderModel.findById(id)
        if (!notFind) throw new Error('Pedido não encontrado')

        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        
        const tipoNormalizado = payload.tipo.trim().toLowerCase() 

        if (payload.id_cliente !== undefined) {
            if (!Number.isInteger(payload.id_cliente)) throw new Error('ID do cliente inválido')
            const clienteExistente = await ClientModel.findById(payload.id_cliente)
            if (!clienteExistente) throw new Error('Cliente não encontrado')
        }

        if (payload.tipo !== undefined) {
            if (!tipos.includes(tipoNormalizado)) throw new Error('Tipo de pedido inválido')
        }

        if (payload.taxa_entrega !== undefined) {
            const taxaEntregaNumero = Number(payload.taxa_entrega)
            if (isNaN(taxaEntregaNumero) || taxaEntregaNumero < 0) throw new Error('Taxa de entrega inválida')
        }

        if (payload.valor_total !== undefined) {
            const valorTotalNumero = Number(payload.valor_total)
            if (isNaN(valorTotalNumero) || valorTotalNumero < 0) throw new Error('Valor total inválido')
        }

        if (payload.id_endereco !== undefined) {
            if (!Number.isInteger(payload.id_endereco)) throw new Error('ID do endereço inválido')
            const enderecoExistente = await AddressModel.findById(payload.id_endereco)
            if (!enderecoExistente) throw new Error('Endereço não encontrado')
        }

        if (payload.id_status !== undefined) {
            if (!Number.isInteger(payload.id_status)) throw new Error('ID do status inválido')
            const statusExistente = await StatusModel.findById(payload.id_status)
            if (!statusExistente) throw new Error('Status não encontrado')
        }

        await OrderModel.update(id, payload)
    }

    static async deleteOrder(id) {
        const notFind = await OrderModel.findById(id)
        if (!notFind) throw new Error('Pedido não encontrado')
        await OrderModel.delete(id)
    }
}

module.exports = OrderService