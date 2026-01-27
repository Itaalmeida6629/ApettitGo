const clientService = require('../services/clientService')
const clientModels = require('../models/clientModels')
const validateLogin = require('../utils/validateLogin')
const bcrypt = require('bcrypt')

class ClientController {
    static async login(req, res) {
        try {
            if (!validateLogin(req.body)) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' })
            }
            const { email, senha } = req.body

            const client = await clientModels.findByEmail(email)
            if (!client) {
                return res.status(401).json({ error: 'Cliente não encontrado' })
            }
            const senhaValida = await bcrypt.compare(senha, client.senha_hash)
            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha inválida' })
            }
            res.json({
                id: client.id,
                nome: client.nome,
                email: client.email,
                telefone: client.telefone
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao realizar login' })
        }
    }

    // Lista todos os clientes
    static async getAll(req, res) {
        try {
            const clients = await clientService.findAllClients()
            res.json(clients)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca cliente por ID
    static async getById(req, res) {
        try {
            const client = await clientService.findClientById(req.params.id)
            res.json(client)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo cliente
    static async create(req, res) {
        try {
            const id = await clientService.createClient(req.body)
            res.status(201).json({ message: 'Cliente criado com sucesso.', id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um cliente existente
    static async update(req, res) {
        try {
            await clientService.updateClient(req.params.id, req.body)
            res.json({ message: 'Cliente atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um cliente
    static async delete(req, res) {
        try {
            await clientService.deleteClient(req.params.id)
            res.json({ message: 'Cliente deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = ClientController