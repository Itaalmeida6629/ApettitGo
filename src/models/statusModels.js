const db = require('../config/database')

class StatusModel {
    // Busca todos os status
    static async findAll() {
        const [rows] = await db.query('SELECT id_status AS id, nome_status FROM Status_Pedido ORDER BY id_status ASC')
        return rows
    }

    // Busca um status pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_status AS id, nome_status FROM Status_Pedido WHERE id_status = ?', [id])
        return rows[0]
    }

    // Busca um status pelo nome
    static async findByName(nome_status) {
        const [rows] = await db.query('SELECT * FROM Status_Pedido WHERE LOWER(nome_status) = ?', [nome_status])
        return rows[0]
    }

    // Cria um novo status
    static async create({ nome_status }) {
        const [result] = await db.query('INSERT INTO Status_Pedido (nome_status) VALUES (?)', [nome_status])
        return result.insertId // Retorna o ID do status criado
    }

    // Atualiza campos permitidos: nome_status
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.nome_status) { fields.push('nome_status = ?'); values.push(data.nome_status) }
        if (fields.length === 0) return
        const sql = `UPDATE Status_Pedido SET ${fields.join(', ')} WHERE id_status = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta um status
    static async delete(id) {
        await db.query('DELETE FROM Status_Pedido WHERE id_status = ?', [id])
    }
}

module.exports = StatusModel

