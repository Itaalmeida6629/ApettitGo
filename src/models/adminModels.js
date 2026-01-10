const db = require('../config/database')

class AdminModel {
    // Busca todos os administradores (sem expor senha)
    static async findAll() {
        const [rows] = await db.query('SELECT id_admin AS id, nome, email, data_criacao FROM Administrador')
        return rows
    }

    // Busca um administrador pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_admin AS id, nome, email, data_criacao FROM Administrador WHERE id_admin = ?',
            [id])
        return rows[0]
    }

    // Busca por email (retorna toda a linha, incluindo senha_hash)
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM Administrador WHERE email = ?', [email])
        return rows[0]
    }

    // Cria um novo administrador (recebe senha_hash pronta)
    static async create({ nome, email, senha_hash }) {
        const [result] = await db.query(
            'INSERT INTO Administrador (nome, email, senha_hash) VALUES (?,?,?)',
            [nome, email, senha_hash]
        )
        return result.insertId // Retorna o ID do administrador criado
    }

    // Atualiza campos permitidos: nome, email, senha_hash
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.nome) { fields.push('nome = ?'); values.push(data.nome) }
        if (data.email) { fields.push('email = ?'); values.push(data.email) }
        if (data.senha_hash) { fields.push('senha_hash = ?'); values.push(data.senha_hash) }
        if (fields.length === 0) return
        const sql = `UPDATE Administrador SET ${fields.join(', ')} WHERE id_admin = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta um administrador
    static async delete(id) {
        await db.query('DELETE FROM Administrador WHERE id_admin = ?', [id])
    }
}

module.exports = AdminModel
