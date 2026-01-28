const db = require('../config/database')

class AddressModel {
    // Busca todos os endereços

    static async findAll() {
        const [rows] = await db.query('SELECT id_endereco AS id, rua, numero, bairro, cidade, estado, cep, id_cliente FROM Endereco')
        return rows
    }

    // Busca um endereço pelo id

    static async findById(id) {
        const [rows] = await db.query('SELECT id_endereco AS id, rua, numero, bairro, cidade, estado, cep, id_cliente FROM Endereco WHERE id_endereco = ?',
            [id])
        return rows[0]
    }

    // Cria um novo endereço

    static async create({ rua, numero, bairro, cidade, estado, cep, id_cliente }) {
        const [result] = await db.query(
            'INSERT INTO Endereco (rua, numero, bairro, cidade, estado, cep, id_cliente) VALUES (?,?,?,?,?,?,?)',
            [rua, numero, bairro, cidade, estado, cep, id_cliente]
        )
        return result.insertId // Retorna o ID do endereço criado
    }

    // Atualiza campos permitidos: rua, numero, bairro, cidade, estado, cep, id_cliente

    static async update(id, data) {
        const fields = []
        const values = []
        if (data.rua) { fields.push('rua = ?'); values.push(data.rua) }
        if (data.numero) { fields.push('numero = ?'); values.push(data.numero) }
        if (data.bairro) { fields.push('bairro = ?'); values.push(data.bairro) }
        if (data.cidade) { fields.push('cidade = ?'); values.push(data.cidade) }
        if (data.estado) { fields.push('estado = ?'); values.push(data.estado) }
        if (data.cep) { fields.push('cep = ?'); values.push(data.cep) }
        
        if (data.id_cliente) { fields.push('id_cliente = ?'); values.push(data.id_cliente) }
        if (fields.length === 0) return

        const query = `UPDATE Endereco SET ${fields.join(', ')} WHERE id_endereco = ?`
        values.push(id)
        await db.query(query, values)
    }

    // Deleta um endereço

    static async delete(id) {
        await db.query('DELETE FROM Endereco WHERE id_endereco = ?', [id])
    }
}

module.exports = AddressModel