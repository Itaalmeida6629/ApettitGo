const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const adminRoutes = require('./routes/adminRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const errorMiddleware = require('./middlewares/errorMiddlewares')

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/admins', adminRoutes)
app.use('/categories', categoryRoutes)

app.use(errorMiddleware)

module.exports = app