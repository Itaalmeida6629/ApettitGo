const db = require('../config/database')

class ItemOrderModel {
    // Busca todos os itens de um pedido
    static async findById(id_pedido) {
        const [rows] = await db.query(
            'SELECT * FROM Item_Pedido WHERE id_pedido = ?', [id_pedido])
        return rows
    }

    // Adiciona um item a um pedido
    static async create({ id_pedido, id_item, quantidade, preco_unitario, subtotal }) {
        const [result] = await db.query(
            'INSERT INTO Item_Pedido (id_pedido, id_item, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
            [id_pedido, id_item, quantidade, preco_unitario, subtotal]
        )
        return result.insertId // Retorna o ID do item do pedido criado
    }

    // Atualiza campos permitidos: quantidade, preco_unitario, subtotal
    static async update(id, data) {
        const fields = []
        const values = []
        if (data.quantidade) { fields.push('quantidade = ?'); values.push(data.quantidade) }
        if (data.preco_unitario) { fields.push('preco_unitario = ?'); values.push(data.preco_unitario) }
        if (data.subtotal) { fields.push('subtotal = ?'); values.push(data.subtotal) }
        if (fields.length === 0) return
        
        const sql = `UPDATE Item_Pedido SET ${fields.join(', ')} WHERE id_item_pedido = ?`
        values.push(id)
        await db.query(sql, values)
    }

    // Deleta um item de um pedido
    static async delete(id) {
        await db.query('DELETE FROM Item_Pedido WHERE id_item_pedido = ?', [id])
    }
}

module.exports = ItemOrderModel