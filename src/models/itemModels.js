const db = require('../config/database')

class ItemModel {
    // Busca todos os itens
    static async findAll() {
        const [rows] = await db.query('SELECT id_item AS id, nome, descricao, preco, id_categoria FROM Item_Cardapio ORDER BY nome ASC')
        return rows
    }

    // Busca um item pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_item AS id, nome, descricao, preco, id_categoria FROM Item_Cardapio WHERE id_item = ? ORDER BY nome ASC', [id])
        return rows[0]
    }

    // Busca um item pelo nome
    static async findByName(nome) {
        const [rows] = await db.query(
            'SELECT * FROM Item_Cardapio WHERE LOWER(nome) = ?',
            [nome]
        )
        return rows[0]
    }

    // Cria um novo item
    static async create({ nome, descricao, preco, id_categoria }) {
        const [result] = await db.query(
            'INSERT INTO Item_Cardapio (nome, descricao, preco, id_categoria) VALUES (?, ?, ?, ?)',
            [nome, descricao, preco, id_categoria]
        )
        return result.insertId // Retorna o ID do item criado
    }

    // Atualiza campos permitidos: nome, descricao, preco, id_categoria
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.nome) { fields.push('nome = ?'); values.push(data.nome) }
        if (data.descricao) { fields.push('descricao = ?'); values.push(data.descricao) }
        if (data.preco) { fields.push('preco = ?'); values.push(data.preco) }
        if (data.id_categoria) { fields.push('id_categoria = ?'); values.push(data.id_categoria) }
        if (fields.length === 0) return
        
        const sql = `UPDATE Item_Cardapio SET ${fields.join(', ')} WHERE id_item = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta um item
    static async delete(id) {
        await db.query('DELETE FROM Item_Cardapio WHERE id_item = ?', [id])
    }
}

module.exports = ItemModel
