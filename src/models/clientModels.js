const db = require('../config/database')

class ClientModel {
    // Busca todos os clientes
    static async findAll() {
        const [rows] = await db.query('SELECT id_cliente AS id, nome, email, telefone FROM Cliente')
        return rows
    }
    // Busca um cliente pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_cliente AS id, nome, email, telefone FROM Cliente WHERE id_cliente = ?', [id])
        return rows[0]
    }

    // Busca um cliente pelo email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM Cliente WHERE email = ?', [email])
        return rows[0]
    }
    
    // Cria um novo cliente
    static async create({ nome, email, senha_hash, telefone }) {
        const [result] = await db.query(
            'INSERT INTO Cliente (nome, email, senha_hash, telefone) VALUES (?, ?, ?, ?)',
            [nome, email, senha_hash, telefone]
        )
        return result.insertId
    }
    // Atualiza campos permitidos: nome, email, telefone
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.nome) { fields.push('nome = ?'); values.push(data.nome) }
        if (data.email) { fields.push('email = ?'); values.push(data.email) }
        if (data.telefone) { fields.push('telefone = ?'); values.push(data.telefone) }
        if (data.senha_hash) { fields.push('senha_hash = ?'); values.push(data.senha_hash) }
        if (fields.length === 0) return

        const sql = `UPDATE Cliente SET ${fields.join(', ')} WHERE id_cliente = ?`
        values.push(id)
        await db.query(sql, values)
    }
    // Deleta um cliente
    static async delete(id) {
        await db.query('DELETE FROM Cliente WHERE id_cliente = ?', [id])
    }
}

module.exports = ClientModel