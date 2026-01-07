const AdminModel = require('../models/adminModels');
const validateEmail = require('../utils/validateEmail');
const bcrypt = require('bcrypt');

class AdminService {
    static async findAllAdmins() {
        return AdminModel.findAll();
    }

    static async findAdminById(id) {
        const admin = await AdminModel.findById(id);
        if (!admin) throw new Error('Administrador não encontrado');
        return admin;
    }

    static async createAdmin(data) {
        const { nome, email, senha } = data;
        if (!nome || !email || !senha) throw new Error('Campos obrigatórios faltando (nome, email, senha)');
        if (!validateEmail(email)) throw new Error('Email inválido');
        const existing = await AdminModel.findByEmail(email);
        if (existing) throw new Error('Email já cadastrado');
        const senha_hash = await bcrypt.hash(senha, 10);
        const id = await AdminModel.create({ nome, email, senha_hash });
        return id;
    }

    static async updateAdmin(id, data) {
        if (data.email && !validateEmail(data.email)) throw new Error('Email inválido');
        const payload = { ...data };
        if (payload.senha) payload.senha_hash = await bcrypt.hash(payload.senha, 10);
        // remove raw senha if present
        delete payload.senha;
        await AdminModel.update(id, payload);
    }

    static async deleteAdmin(id) {
        await AdminModel.delete(id);
    }
}

module.exports = AdminService;