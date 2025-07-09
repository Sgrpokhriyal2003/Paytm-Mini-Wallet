const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = {
    User
}