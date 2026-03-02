const ItemOrderModel = require('../models/itemOrderModels')
const ItemModel = require('../models/itemModels')
const OrderModel = require('../models/orderModels')

class ItemOrderService {
    static async findAllItemsByOrderId(id_pedido) {
        const order = await OrderModel.findById(id_pedido)
        if (!order) throw new Error('Pedido não encontrado')
        return ItemOrderModel.findById(id_pedido)
    }

    static async createItemOrder(pedido, data) {
        const order = await OrderModel.findById(pedido)
        if (!order) throw new Error('Pedido não encontrado')

        const { id_item, quantidade} = data

        if (!id_item || !quantidade) throw new Error('Campos obrigatórios faltando (id_pedido, id_item, quantidade)')

        if (!Number.isInteger(id_item)) throw new Error('ID do item inválido')
        const item = await ItemModel.findById(id_item)
        if (!item) throw new Error('Item não encontrado')

        if (!Number.isInteger(quantidade) || quantidade <= 0) throw new Error('Quantidade inválida')

        const precoUnitario = await ItemModel.findPriceById(id_item)
        if (!precoUnitario) throw new Error('Preço do item não encontrado')

        const subtotal = precoUnitario * quantidade

        const created = await ItemOrderModel.create({ id_pedido: pedido, id_item, quantidade, preco_unitario: precoUnitario, subtotal: subtotal })
        
        await OrderModel.updateTotalValue(pedido)

        return created
    }

    static async updateItemOrder(id, data) {
        const itemOrder = await ItemOrderModel.findById(id)
        if (!itemOrder) throw new Error('Item do pedido não encontrado')

        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.id_item !== undefined) {
            if (!Number.isInteger(payload.id_item)) throw new Error('ID do item inválido')
            const item = await ItemModel.findById(payload.id_item)
            if (!item) throw new Error('Item não encontrado')
        }

        if (payload.quantidade !== undefined) {
            if (!Number.isInteger(payload.quantidade) || payload.quantidade <= 0) throw new Error('Quantidade inválida')
        }

        if (payload.preco_unitario !== undefined) {
            if (typeof payload.preco_unitario !== 'number' || payload.preco_unitario < 0) throw new Error('Preço unitário inválido')
        }

        if (payload.quantidade !== undefined && payload.preco_unitario !== undefined) {
            payload.subtotal = payload.preco_unitario * payload.quantidade
        }

        const novaQuantidade = payload.quantidade !== undefined ? payload.quantidade : itemOrder.quantidade
        const novoPrecoUnitario = payload.preco_unitario !== undefined ? payload.preco_unitario : itemOrder.preco_unitario
        payload.subtotal = novaQuantidade * novoPrecoUnitario

        await ItemOrderModel.update(id, payload)
        await OrderModel.updateTotalValue(itemOrder.id_pedido)

        return { message: 'Item do pedido atualizado com sucesso' }
    }

    static async deleteItemOrder(id) {
        const itemOrder = await ItemOrderModel.findById(id)
        if (!itemOrder) throw new Error('Item do pedido não encontrado')
        await ItemOrderModel.delete(id)

        await OrderModel.updateValorTotal(itemOrder.id_pedido)

        return { message: 'Item removido com sucesso' }
    }
}

module.exports = ItemOrderService