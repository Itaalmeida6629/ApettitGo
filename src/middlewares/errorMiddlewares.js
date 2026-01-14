// Middleware centralizado de tratamento de erros
function errorMiddleware(err, req, res, next) {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ error: err.message || 'Erro interno do servidor' })
}

module.exports = errorMiddleware
