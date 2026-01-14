const CategoryService = require('../services/categoryService')

class CategoryController {
    // Lista todas as categorias
    static async getAll(req, res) {
        try {
            const categories = await CategoryService.findAllCategories()
            res.json(categories)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca categoria por ID
    static async getById(req, res) {
        try {
            const category = await CategoryService.findCategoryById(req.params.id)
            res.json(category)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria uma nova categoria
    static async create(req, res) {
        try {
            const id = await CategoryService.createCategory(req.body)
            res.status(201).json({ message: 'Categoria criada com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza uma categoria existente
    static async update(req, res) {
        try {
            await CategoryService.updateCategory(req.params.id, req.body)
            res.json({ message: 'Categoria atualizada com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta uma categoria
    static async delete(req, res) {
        try {
            await CategoryService.deleteCategory(req.params.id)
            res.json({ message: 'Categoria deletada com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = CategoryController
