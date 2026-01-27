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
        const nomeNormalizado = nome.trim().toLowerCase()
        const emailNormalizado = email.trim().toLowerCase()
        const erroNome = validateString(nomeNormalizado, { min: 3, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)
        if (!validateEmail(emailNormalizado)) throw new Error('Email inválido')
        const erroSenha = validateString(senha, { min: 6, max: 255, fieldName: 'senha' })
        if (erroSenha) throw new Error(erroSenha)
        const emailExistente = await AdminModel.findByEmail(emailNormalizado)
        if (emailExistente) throw new Error('Email já cadastrado')
        const senha_hash = await bcrypt.hash(senha, 10)
        return AdminModel.create({ nome: nomeNormalizado, email: emailNormalizado, senha_hash })
    }

    static async updateAdmin(id, data) {
        const notFind = await AdminModel.findById(id)
        if (!notFind) throw new Error('Administrador não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome !== undefined) {
            const error = validateString(payload.nome, { min: 3, max: 100, fieldName: 'nome' })
            if (error) throw new Error('Nome inválido')
        }
        if (payload.email !== undefined) {
            if (!validateEmail(payload.email)) throw new Error('Email inválido')
        }
        const emailExistente = await AdminModel.findByEmail(payload.email)
        if (emailExistente) throw new Error('Email já cadastrado')
        if (payload.senha) {
            const error = validateString(payload.senha, { min: 6, max: 255, fieldName: 'senha' })
            if (error) throw new Error('Senha inválida')
            payload.senha_hash = await bcrypt.hash(payload.senha, 10)
            delete payload.senha
        }

        await AdminModel.update(id, payload)
    }

    static async deleteAdmin(id) {
        const notFind = await AdminModel.findById(id)
        if (!notFind) throw new Error('Administrador não encontrado')
        await AdminModel.delete(id)
    }
}

module.exports = AdminService
