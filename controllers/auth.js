const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // generate token: password match true
            const token = jwt.sign({ email: candidate.email, userId: candidate._id }, keys.jwt, {expiresIn: 3600})
            res.status(200).json({ token: `Bearer ${token}` })
        } else {
            // status 401 - "Unauthorized"
            res.status(401).json({ message: "Password does not match. Try again." })
        }
    } else {
        // status 404 - "not found"
        res.status(404).json({ message: "User not found." })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // status 409 - "Conflict"
        res.status(409).json({
            message: 'User already exist. Please use another email.'
        })
    } else {
        // Задает уровень сложности шифрования
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            // функция хеширования, куда передаем объект хеширования и способ
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            // status 201 - "Created"
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}