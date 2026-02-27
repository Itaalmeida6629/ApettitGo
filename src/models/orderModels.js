const db = require('../config/database')

class OrderModel {
    // Busca todos os pedidos
    static async findAll () {
        const [rows] = await db.query('SELECT id_pedido as id, id_cliente, data_pedido, tipo, taxa_entrega, valor_total, id_endereco, id_status FROM pedido')
        return rows
    }

    // Busca um pedido pelo id
    static async findById (id) {
        const [rows] = await db.query('SELECT id_pedido as id, id_cliente, data_pedido, tipo, taxa_entrega, valor_total, id_endereco, id_status FROM pedido WHERE id_pedido = ?', [id])
        return rows[0]
    }

    // Cria um novo pedido
    static async create ({ id_cliente, tipo, taxa_entrega, id_endereco, id_status }) {
        const [result] = await db.query(
            'INSERT INTO pedido (id_cliente, tipo, taxa_entrega, id_endereco, id_status) VALUES (?, ?, ?, ?, ?)',
            [id_cliente, tipo, taxa_entrega, id_endereco, id_status]
        )
        return result.insertId // Retorna o ID do pedido criado
    }

    static async updateTotalValue(id_pedido) {
        const [rows] = await db.query ('SELECT SUM(subtotal) AS total FROM Item_Pedido WHERE id_pedido = ?',
        [id_pedido])
        
        const somaItens = Number(rows[0].total) || 0

        const [pedidoRows] = await db.query('SELECT taxa_entrega FROM pedido WHERE id_pedido = ?',
        [id_pedido])
        const taxaEntrega = Number(pedidoRows[0].taxa_entrega) || 0

        const valorTotal = somaItens + taxaEntrega

        await db.query('UPDATE pedido SET valor_total = ? WHERE id_pedido = ?', [valorTotal, id_pedido])
    }

    // Atualiza campos permitidos: id_cliente, data_pedido, tipo, taxa_entrega, valor_total, id_endereco, id_status
    static async update (id, data) {
        const fields = []
        const values = []
        if (data.id_cliente) { fields.push('id_cliente = ?'); values.push(data.id_cliente) }
        if (data.data_pedido) { fields.push('data_pedido = ?'); values.push(data.data_pedido) }
        if (data.tipo) { fields.push('tipo = ?'); values.push(data.tipo) }
        if (data.taxa_entrega) { fields.push('taxa_entrega = ?'); values.push(data.taxa_entrega) }
        if (data.valor_total) { fields.push('valor_total = ?'); values.push(data.valor_total) }
        if (data.id_endereco) { fields.push('id_endereco = ?'); values.push(data.id_endereco) }
        if (data.id_status) { fields.push('id_status = ?'); values.push(data.id_status) }
        if (fields.length === 0) return

        const sql = `UPDATE pedido SET ${fields.join(', ')} WHERE id_pedido = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta um pedido
    static async delete (id) {
        await db.query('DELETE FROM pedido WHERE id_pedido = ?', [id])
    }
}

module.exports = OrderModel