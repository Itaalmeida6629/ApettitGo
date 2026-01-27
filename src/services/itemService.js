const ItemModel = require('../models/itemModels')
const validateString = require('../utils/validateString')

class ItemService {
    static async findAllItems() {
        return ItemModel.findAll()
    }

    static async findItemById(id) {
        const item = await ItemModel.findById(id)
        if (!item) throw new Error('Item não encontrado')
        return item
    }

    static async createItem(data) {
        const { nome, descricao, preco, id_categoria } = data
        if (!nome || !descricao || preco === undefined || !id_categoria) throw new Error('Campos obrigatórios faltando (nome, descricao, preco, id_categoria)')
        const erroNome = validateString(nome, { min: 1, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)
        const erroDescricao = validateString(descricao, { min: 1, max: 255, fieldName: 'descricao' })
        if (erroDescricao) throw new Error(erroDescricao)
        if (typeof preco !== 'number' || preco < 0) throw new Error('Preço inválido')
        if (!Number.isInteger(id_categoria)) throw new Error('Categoria inválida')
        const itemExistente = await ItemModel.findByName(nome)
        if (itemExistente) throw new Error('Já existe um item com esse nome')
        return ItemModel.create({ nome, descricao, preco, id_categoria })
    }

    static async updateItem(id, data) {
        const notFind = await ItemModel.findById(id)
        if (!notFind) throw new Error('Item não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome !== undefined) {
            const error = validateString(payload.nome, { min: 1, max: 100, fieldName: 'nome' })
            if (error) throw new Error(error)
        }

        if (payload.descricao !== undefined) {
            const error = validateString(payload.descricao, { min: 1, max: 255, fieldName: 'descricao' })
            if (error) throw new Error(error)
        }

        await ItemModel.update(id, payload)
    }

    static async deleteItem(id) {
        const notFind = await ItemModel.findById(id)
        if (!notFind) throw new Error('Item não encontrado')
        await ItemModel.delete(id)
    }
}

module.exports = ItemService
