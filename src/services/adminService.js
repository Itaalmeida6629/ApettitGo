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
        if (!nome || !email || !senha) {
            throw new Error('Campos obrigatórios faltando (nome, email, senha)')
        }

        const nomeError = validateString(nome, { min: 3, max: 100, fieldName: 'Nome' })
        if (nomeError) throw new Error(nomeError)

        if (!validateEmail(email)) {
            throw new Error('Email inválido')
        }

        const senhaError = validateString(senha, { min: 6, max: 255, fieldName: 'Senha' })
        if (senhaError) throw new Error(senhaError)

        const existing = await AdminModel.findByEmail(email)
        if (existing) throw new Error('Email já cadastrado')

        const senha_hash = await bcrypt.hash(senha, 10)
        return AdminModel.create({ nome, email, senha_hash })
    }

    static async updateAdmin(id, data) {
        const payload = {}
        if (data.nome) {
            const nomeError = validateString(data.nome, { min: 3, max: 100, fieldName: 'Nome' })
            if (nomeError) throw new Error(nomeError)
            payload.nome = data.nome
        }

        if (data.email) {
            if (!validateEmail(data.email)) {
                throw new Error('Email inválido')
            }
            payload.email = data.email
        }

        if (data.senha) {
            const senhaError = validateString(data.senha, { min: 6, max: 255, fieldName: 'Senha' })
            if (senhaError) throw new Error(senhaError)
            payload.senha_hash = await bcrypt.hash(data.senha, 10)
        }

        await AdminModel.update(id, payload)
    }

    static async deleteAdmin(id) {
        await AdminModel.delete(id)
    }
}

module.exports = AdminService