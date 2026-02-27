const ItemModel = require('../models/itemModels')
const validateString = require('../utils/validateString')
const CategoryModel = require('../models/categoryModels')

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
        const nomeNormalizado = nome.trim().toLowerCase()
        const erroNome = validateString(nomeNormalizado, { min: 1, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)

        const itemExistente = await ItemModel.findByName(nomeNormalizado)
        if (itemExistente) throw new Error('Já existe um item com esse nome')

        const descricaoNormalizada = descricao.trim().toLowerCase()
        const erroDescricao = validateString(descricaoNormalizada, { min: 1, max: 255, fieldName: 'descricao' })
        if (erroDescricao) throw new Error(erroDescricao)

        const precoNumero = Number(preco)
        if (isNaN(precoNumero) || precoNumero < 0) throw new Error('Preço inválido')

        if (!Number.isInteger(id_categoria)) throw new Error('Categoria inválida')
            
        const categoriaExistente = await CategoryModel.findById(id_categoria)
        if (!categoriaExistente) { throw new Error('Categoria não encontrada') }


        return ItemModel.create({ nome, descricao, preco: precoNumero, id_categoria })
    }

    static async updateItem(id, data) {
        const notFind = await ItemModel.findById(id)
        if (!notFind) throw new Error('Item não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome !== undefined) {
            const nomeNormalizado = payload.nome.trim().toLowerCase()
            const error = validateString(nomeNormalizado, { min: 1, max: 100, fieldName: 'nome' })
            if (error) throw new Error(error)
            const itemExistente = await ItemModel.findByName(nomeNormalizado)
            if (itemExistente) throw new Error('Já existe um item com esse nome')
        }
        if (payload.descricao !== undefined) {
            const descricaoNormalizada = payload.descricao.trim().toLowerCase()
            const error = validateString(descricaoNormalizada, { min: 1, max: 255, fieldName: 'descricao' })
            if (error) throw new Error(error)
        }
        if (payload.preco !== undefined) {
            const precoNumero = Number(payload.preco)
            if (isNaN(precoNumero) || precoNumero < 0)
                throw new Error('Preço inválido')
        }
        if (payload.id_categoria !== undefined) {
            if (!Number.isInteger(payload.id_categoria) && payload.id_categoria !== null) {
                throw new Error('Categoria inválida')
            }
            const categoriaExistente = await CategoryModel.findById(payload.id_categoria)
            if (!categoriaExistente) {
                throw new Error('Categoria não encontrada')
            }
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
