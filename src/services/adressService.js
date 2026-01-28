const AddressModel = require('../models/adressModels')
const validateString = require('../utils/validateString')
const ClientModel = require('../models/clientModels')

class AddressService {
    static async findAllAddresses() {
        return AddressModel.findAll()
    }

    static async findAddressById(id) {
        const address = await AddressModel.findById(id)
        if (!address) throw new Error('Endereço não encontrado')
        return address
    }

    static async createAddress(data) {
        const { rua, numero, bairro, cidade, estado, cep, id_cliente } = data
        if (!rua || !numero || !bairro || !cidade || !estado || !cep || !id_cliente) {
            throw new Error('Campos obrigatórios faltando (rua, numero, bairro, cidade, estado, cep, id do cliente)')
        }
        const ruaNormalizada = rua.trim()
        const bairroNormalizado = bairro.trim().toLowerCase()
        const cidadeNormalizada = cidade.trim().toLowerCase()
        const estadoNormalizado = estado.trim().toLowerCase()
        const cepNormalizado = cep.trim().toLowerCase()

        const erroRua = validateString(ruaNormalizada, { min: 3, max: 100, fieldName: 'rua' })
        if (erroRua) throw new Error(erroRua)
        const erroBairro = validateString(bairroNormalizado, { min: 3, max: 100, fieldName: 'bairro' })
        if (erroBairro) throw new Error(erroBairro)
        const erroCidade = validateString(cidadeNormalizada, { min: 2, max: 100, fieldName: 'cidade' })
        if (erroCidade) throw new Error(erroCidade)
        const erroEstado = validateString(estadoNormalizado, { min: 2, max: 100, fieldName: 'estado' })
        if (erroEstado) throw new Error(erroEstado)
        const erroCep = validateString(cepNormalizado, { min: 5, max: 20, fieldName: 'cep' })
        if (erroCep) throw new Error(erroCep)
        if (isNaN(numero) || Number(numero) <= 0) {
            throw new Error('Número inválido')
        }
        if (isNaN(id_cliente) || Number(id_cliente) <= 0) {
            throw new Error('ID do cliente inválido')
        }
        const clienteExistente = await ClientModel.findById(id_cliente)
        if (!clienteExistente) {
            throw new Error('Cliente não encontrado')
        }

        return AddressModel.create({ rua: ruaNormalizada, numero, bairro: bairroNormalizado, cidade: cidadeNormalizada, estado: estadoNormalizado, cep: cepNormalizado, id_cliente })
    }

    static async updateAddress(id, data) {
        const notFind = await AddressModel.findById(id)
        if (!notFind) throw new Error('Endereço não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.rua !== undefined) {
            const error = validateString(payload.rua, { min: 3, max: 100, fieldName: 'rua' })
            if (error) throw new Error('Rua inválida')
        }
        if (payload.numero !== undefined) {
            if (isNaN(payload.numero) || Number(payload.numero) <= 0) {
                throw new Error('Número inválido')
            }
        }
            if (payload.bairro !== undefined) {
                const error = validateString(payload.bairro, { min: 3, max: 100, fieldName: 'bairro' })
                if (error) throw new Error('Bairro inválido')
            }
            if (payload.cidade !== undefined) {
                const error = validateString(payload.cidade, { min: 2, max: 100, fieldName: 'cidade' })
                if (error) throw new Error('Cidade inválida')
            }
            if (payload.estado !== undefined) {
                const error = validateString(payload.estado, { min: 2, max: 100, fieldName: 'estado' })
                if (error) throw new Error('Estado inválido')
            }
            if (payload.cep !== undefined) {
                const error = validateString(payload.cep, { min: 5, max: 20, fieldName: 'cep' })
                if (error) throw new Error('CEP inválido')
            }
            if (payload.id_cliente !== undefined) {
                if (isNaN(payload.id_cliente) || Number(payload.id_cliente) <= 0) {
                    throw new Error('ID do cliente inválido')
                }
                const clienteExistente = await ClientModel.findById(payload.id_cliente)
                if (!clienteExistente) {
                    throw new Error('Cliente não encontrado')
                }
            }

            await AddressModel.update(id, payload)
        }

    static async deleteAddress(id) {
        const notFind = await AddressModel.findById(id)
        if (!notFind) throw new Error('Endereço não encontrado')
        await AddressModel.delete(id)
    }
}

module.exports = AddressService