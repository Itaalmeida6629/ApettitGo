const CategoryModel = require('../models/categoryModels')
const validateString = require('../utils/validateString')

class CategoryService {
    static async findAllCategories() {
        return CategoryModel.findAll()
    }

    static async findCategoryById(id) {
        const category = await CategoryModel.findById(id)
        if (!category) throw new Error('Categoria não encontrada')
        return category
    }

    static async createCategory(data) {
        const { nome, descricao } = data
        if (!nome || !descricao) throw new Error('Campos obrigatórios faltando (nome, descricao)')
        const nomeNormalizado = nome.trim().toLowerCase()
        const erroNome = validateString(nome, { min: 1, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)
        const categoriaExistente = await CategoryModel.findByName(nomeNormalizado)
        if (categoriaExistente) throw new Error('Já existe uma categoria com esse nome')
        const descricaoNormalizada = descricao.trim().toLowerCase()
        const erroDescricao = validateString(descricaoNormalizada, { min: 1, max: 255, fieldName: 'descricao' })
        if (erroDescricao) throw new Error(erroDescricao)


        return CategoryModel.create({ nome, descricao })
    }

    static async updateCategory(id, data) {
        const notFind = await CategoryModel.findById(id)
        if (!notFind) throw new Error('Categoria não encontrada')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome !== undefined) {
            const nomeNormalizado = payload.nome.trim().toLowerCase()
            const error = validateString(nomeNormalizado, { min: 1, max: 100, fieldName: 'nome' })
            if (error) throw new Error('Nome inválido')
            const categoriaExistente = await CategoryModel.findByName(nomeNormalizado)
            if (categoriaExistente) throw new Error('Já existe uma categoria com esse nome')
        }
        if (payload.descricao !== undefined) {
            const descricaoNormalizada = payload.descricao.trim().toLowerCase()
            const error = validateString(descricaoNormalizada, { min: 1, max: 255, fieldName: 'descricao' })
            if (error) throw new Error('Descrição inválida')
        }

        await CategoryModel.update(id, payload)
    }

    static async deleteCategory(id) {
        const notFind = await CategoryModel.findById(id)
        if (!notFind) throw new Error('Categoria não encontrada')
        await CategoryModel.delete(id)
    }
}

module.exports = CategoryService
