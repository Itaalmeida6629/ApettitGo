const AdressService = require('../services/adressService')

class AdressController {
    // Lista todos os endereços
    static async getAll(req, res) {
        try {
            const addresses = await AdressService.findAllAddresses()
            res.json(addresses)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // Busca endereço por ID
    static async getById(req, res) {
        try {
            const address = await AdressService.findAddressById(req.params.id)
            res.json(address)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

    // Cria um novo endereço
    static async create(req, res) {
        try {
            const id = await AdressService.createAddress(req.body)
            res.status(201).json({ message: 'Endereço criado com sucesso.', id })
        } catch (error) {   
            res.status(400).json({ error: error.message })
        }
    }

    // Atualiza um endereço existente
    static async update(req, res) {
        try {
            await AdressService.updateAddress(req.params.id, req.body)
            res.json({ message: 'Endereço atualizado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    // Deleta um endereço
    static async delete(req, res) {
        try {
            await AdressService.deleteAddress(req.params.id)
            res.json({ message: 'Endereço deletado com sucesso.' })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = AdressController