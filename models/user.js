const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 25,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        min: 5,
        max: 30,
        required: true
    },
    points: {
        type: Number,
        default: 0
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)