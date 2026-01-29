const db = require('../config/database')

class PaymentModel {
    // Busca todas as formas de pagamento
    static async findAll() {
        const [rows] = await db.query('SELECT id_pagamento AS id, forma_pagamento FROM Forma_Pagamento ORDER BY forma_pagamento ASC')
        return rows
    }

    // Busca uma forma de pagamento pelo nome
    static async findByName(forma_pagamento) {
        const [rows] = await db.query('SELECT * FROM Forma_Pagamento WHERE LOWER(forma_pagamento) = ?', [forma_pagamento])
        return rows[0]
    }

    // Busca uma forma de pagamento pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT id_pagamento AS id, forma_pagamento FROM Forma_Pagamento WHERE id_pagamento = ?', [id])
        return rows[0]
    }

    // Cria uma nova forma de pagamento
    static async create({ forma_pagamento }) {
        const [result] = await db.query('INSERT INTO Forma_Pagamento (forma_pagamento) VALUES (?)', [forma_pagamento])
        return result.insertId // Retorna o ID da forma de pagamento criada
    }

    // Atualiza campos permitidos: nome, descricao
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.forma_pagamento) { fields.push('forma_pagamento = ?'); values.push(data.forma_pagamento) }
        if (fields.length === 0) return
        const sql = `UPDATE Forma_Pagamento SET ${fields.join(', ')} WHERE id_pagamento = ?`
        values.push(id)
        await db.query(sql, values)
    }


    // Deleta uma forma de pagamento
    static async delete(id) {
        await db.query('DELETE FROM Forma_Pagamento WHERE id_pagamento = ?', [id])
    }
}

module.exports = PaymentModel