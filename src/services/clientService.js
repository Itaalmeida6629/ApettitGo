const clientModel = require('../models/clientModels')
const validateEmail = require('../utils/validateEmail')
const validateString = require('../utils/validateString')
const validateLogin = require('../utils/validateLogin')
const bcrypt = require('bcrypt')

class ClientService {

    static async loginClient(data) {
        const erroLogin = validateLogin(data)
        if (erroLogin) throw new Error(erroLogin)
        if (!validateEmail(data.email)) {
            throw new Error('Email inválido')
        }
        const client = await clientModel.findByEmail(data.email)
        if (!client) {
            throw new Error('Email ou senha inválidos')
        }
        const senhaValida = await bcrypt.compare(data.senha, client.senha_hash)
        if (!senhaValida) {
            throw new Error('Email ou senha inválidos')
        }

        return {
            id: client.id_cliente,
            nome: client.nome,
            email: client.email,
            telefone: client.telefone
        }
    }

    static async findAllClients() {
        return clientModel.findAll()
    }

    static async findClientById(id) {
        const client = await clientModel.findById(id)
        if (!client) throw new Error('Cliente não encontrado')
        return client
    }

    static async createClient(data) {
        const { nome, email, senha, telefone } = data
        if (!nome || !email || !senha || !telefone) throw new Error('Campos obrigatórios faltando (nome, email, senha, telefone)')
        const nomeNormalizado = nome.trim().toLowerCase()
        const erroNome = validateString(nomeNormalizado, { min: 3, max: 100, fieldName: 'nome' })
        if (erroNome) throw new Error(erroNome)
        if (!validateEmail(email)) throw new Error('Email inválido')
        const emailExistente = await clientModel.findByEmail(email)
        if (emailExistente) throw new Error('Email já cadastrado')
        const erroTelefone = validateString(telefone, { min: 10, max: 15, fieldName: 'telefone' })
        if (erroTelefone) throw new Error(erroTelefone)
        const senhaHash = await bcrypt.hash(senha, 10)

        return clientModel.create({ nome, email, senha_hash: senhaHash, telefone })
    }

    static async updateClient(id, data) {
        const notFind = await clientModel.findById(id)
        if (!notFind) throw new Error('Cliente não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome !== undefined) {
            const error = validateString(payload.nome, { min: 3, max: 100, fieldName: 'nome' })
            if (error) throw new Error('Nome inválido')
        }
        if (payload.email !== undefined) {
            if (!validateEmail(payload.email)) throw new Error('Email inválido')
        }
        const emailExistente = await clientModel.findByEmail(payload.email)
        if (emailExistente) throw new Error('Email já cadastrado')
        if (payload.telefone !== undefined) {
            const error = validateString(payload.telefone, { min: 10, max: 15, fieldName: 'telefone' })
            if (error) throw new Error('Telefone inválido')
        }
        if (payload.senha !== undefined) {
            const error = validateString(payload.senha, { min: 6, max: 255, fieldName: 'senha' })
            if (error) throw new Error('Senha inválida')
            payload.senha_hash = await bcrypt.hash(payload.senha, 10)
            delete payload.senha
        }
        await clientModel.update(id, payload)
    }

    static async deleteClient(id) {
        const notFind = await clientModel.findById(id)
        if (!notFind) throw new Error('Cliente não encontrado')
        await clientModel.delete(id)
    }
}

module.exports = ClientService