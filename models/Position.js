const {Schema, model} = require('mongoose')

const positionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = model('positions', positionSchema)