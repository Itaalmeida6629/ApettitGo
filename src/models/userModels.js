const db = require('../config/database');
// Importa a conexão pool com o banco de dados
class UserModel {
    // Busca todos os usuários
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }
    // Busca um usuário pelo id
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?',
            [id]);
        return rows[0];
    }
    // Cria um novo usuário
    static async create(user) {
    const { nome, email, senha, telefone } = user
    const senha_hash = await bcrypt.hash(senha, 10)
    const [result] = await db.query('INSERT INTO users (nome, email, senha_hash, telefone) VALUES (?,?,?,?)',
        [nome, email, senha_hash, telefone]);
    return result.insertId; // Retorna o ID do usuário criado
}}
module.exports = UserModel
