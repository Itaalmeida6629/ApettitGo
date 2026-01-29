const StatusModel = require('../models/statusModels')
const validateString = require('../utils/validateString')

class StatusService {
    static async findAllStatuses() {
        return StatusModel.findAll()
    }

    static async findStatusById(id) {
        const status = await StatusModel.findById(id)
        if (!status) throw new Error('Status não encontrado')
        return status
    }

    static async createStatus(data) {
        const { nome_status } = data
        if (!nome_status) throw new Error('Campo obrigatório faltando (nome do status)')
        const nomeStatusNormalizado = nome_status.trim().toLowerCase()
        const erroNomeStatus = validateString(nomeStatusNormalizado, { min: 3, max: 100, fieldName: 'nome_status' })
        if (erroNomeStatus) throw new Error(erroNomeStatus)
        const statusExistente = await StatusModel.findByName(nomeStatusNormalizado)
        if (statusExistente) throw new Error('Já existe um status com esse nome')

        return StatusModel.create({ nome_status })
    }

    static async updateStatus(id, data) {
        const notFind = await StatusModel.findById(id)
        if (!notFind) throw new Error('Status não encontrado')
        const payload = { ...data }
        if (Object.keys(payload).length === 0) throw new Error('Nenhum dado fornecido para atualização')
        if (payload.nome_status !== undefined) {
            const nomeStatusNormalizado = payload.nome_status.trim().toLowerCase()
            const error = validateString(nomeStatusNormalizado, { min: 3, max: 100, fieldName: 'nome_status' })
            if (error) throw new Error(error)
            const statusExistente = await StatusModel.findByName(nomeStatusNormalizado)
            if (statusExistente) throw new Error('Já existe um status com esse nome')

            await StatusModel.update(id, payload)
        }
    }
    static async deleteStatus(id) {
        const notFind = await StatusModel.findById(id)
        if (!notFind) throw new Error('Status não encontrado')
        await StatusModel.delete(id)
    }
}

module.exports = StatusService