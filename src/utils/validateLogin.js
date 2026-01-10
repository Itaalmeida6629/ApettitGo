// Valida campos mínimos para login de usuário/administrador
function validateLogin(body) {
    if (!body) return false
    const { email, senha } = body
    return !!email && !!senha
}

module.exports = validateLogin
