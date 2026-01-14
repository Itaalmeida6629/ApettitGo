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
        const erroNome = validateString(nome, { min: 1, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)
        const erroDescricao = validateString(descricao, { min: 1, max: 255, fieldName: 'descricao' })
        if (erroDescricao) throw new Error(erroDescricao)
        const categoriaExistente = await CategoryModel.findByName(nome)
        if (categoriaExistente) throw new Error('Já existe uma categoria com esse nome')
        const id = await CategoryModel.create({ nome, descricao })
        return id
    }

    static async updateCategory(id, data) {
        const payload = { ...data }

        if (payload.nome && !validateString(payload.nome, 1, 100)) throw new Error('Nome inválido')
        if (payload.descricao && !validateString(payload.descricao, 1, 255)) throw new Error('Descrição inválida')
        await CategoryModel.update(id, payload)
    }

    static async deleteCategory(id) {
        await CategoryModel.delete(id)
    }
}

module.exports = CategoryService
