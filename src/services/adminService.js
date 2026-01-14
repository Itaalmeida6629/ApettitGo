const AdminModel = require('../models/adminModels')
const validateEmail = require('../utils/validateEmail')
const validateString = require('../utils/validateString')
const bcrypt = require('bcrypt')

class AdminService {
    static async findAllAdmins() {
        return AdminModel.findAll()
    }

    static async findAdminById(id) {
        const admin = await AdminModel.findById(id)
        if (!admin) throw new Error('Administrador não encontrado')
        return admin
    }

    static async createAdmin(data) {
        const { nome, email, senha } = data
        if (!nome || !email || !senha) throw new Error('Campos obrigatórios faltando (nome, email, senha)')
        if (!validateString(nome, 3, 100)) throw new Error('Nome inválido')
        if (!validateEmail(email)) throw new Error('Email inválido')
        if (!validateString(senha, 6, 255)) throw new Error('Senha inválida')
        const existing = await AdminModel.findByEmail(email)
        if (existing) throw new Error('Email já cadastrado')
        const senha_hash = await bcrypt.hash(senha, 10)
        return AdminModel.create({ nome, email, senha_hash })
    }

    static async updateAdmin(id, data) {
        const payload = { ...data }

        if (payload.nome && !validateString(payload.nome, 3, 100)) throw new Error('Nome inválido')
        if (payload.email && !validateEmail(payload.email)) throw new Error('Email inválido')
        if (payload.senha) {
            if (!validateString(payload.senha, 6, 255)) throw new Error('Senha inválida')
            payload.senha_hash = await bcrypt.hash(payload.senha, 10)
            delete payload.senha
        }

        await AdminModel.update(id, payload)
    }

    static async deleteAdmin(id) {
        await AdminModel.delete(id)
    }
}

module.exports = AdminService
