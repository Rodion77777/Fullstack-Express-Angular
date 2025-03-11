// добавление зависимости
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const password = require('passport')
const passjwt = require('passport-jwt')

// Добавление файла с роутами
const analyticsRoutes = require('./routes/analytics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const passport = require('passport')

// инициализация зависимости, создание экземпляра этого фреймворка
const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) // создает js обьекты из json
app.use(cors())
app.use(morgan('dev'))

app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

// простой роут тестовый, принимает три параметра, но для теста достаточно двух. res - даем ответ на обращение по роуту
app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Working'
    })
})

module.exports = app