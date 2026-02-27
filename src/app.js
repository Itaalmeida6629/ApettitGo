const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const adminRoutes = require('./routes/adminRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const itemRoutes = require('./routes/itemRoutes')
const clientRoutes = require('./routes/clientRoutes')
const adressRoutes = require('./routes/adressRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const statusRoutes = require('./routes/statusRoutes')
const orderRoutes = require('./routes/orderRoutes')
const itemOrderRoutes = require('./routes/itemOrderRoutes')
const errorMiddleware = require('./middlewares/errorMiddlewares')



const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/admins', adminRoutes)
app.use('/categories', categoryRoutes)
app.use('/items', itemRoutes)
app.use('/clients', clientRoutes)
app.use('/addresses', adressRoutes)
app.use('/payments', paymentRoutes)
app.use('/statuses', statusRoutes)
app.use('/orders', orderRoutes)
app.use('/item-orders', itemOrderRoutes)

app.use(errorMiddleware)

module.exports = app
