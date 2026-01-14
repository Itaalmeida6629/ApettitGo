const db = require('../config/database')

class CategoryModel {
    // Busca todas as categorias
    static async findAll() {
        const [rows] = await db.query('SELECT id_categoria AS id, nome, descricao FROM Categoria')
        return rows
    }

    // Busca uma categoria pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_categoria AS id, nome, descricao FROM Categoria WHERE id_categoria = ?', [id])
        return rows[0]
    }

    // Busca uma categoria pelo nome
    static async findByName(nome) {
        const [rows] = await db.query(
            'SELECT * FROM Categoria WHERE nome = ?',
            [nome]
        )
        return rows[0]
    }

    // Cria uma nova categoria
    static async create({ nome, descricao }) {
        const [result] = await db.query(
            'INSERT INTO Categoria (nome, descricao) VALUES (?, ?)',
            [nome, descricao]
        )
        return result.insertId // Retorna o ID da categoria criada
    }

    // Atualiza campos permitidos: nome, descricao
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.nome) { fields.push('nome = ?'); values.push(data.nome) }

        if (data.descricao) { fields.push('descricao = ?'); values.push(data.descricao) }

        if (fields.length === 0) return
        const sql = `UPDATE Categoria SET ${fields.join(', ')} WHERE id_categoria = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta uma categoria
    static async delete(id) {
        await db.query('DELETE FROM Categoria WHERE id_categoria = ?', [id])
    }
}

module.exports = CategoryModel
