const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

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

userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified('password')) return next()

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next();
    }
    catch(error){
        return next(error)
    }
})

// userSchema.methods.comparePassword = async function(userPassword) {
//     const user = this
//     try{
//         const isMatch = await bcrypt.compare(userPassword, user.password)
//         return isMatch
//     }
//     catch(error){
//         throw error
//     }
// }


const User = mongoose.model('User', userSchema)
module.exports = {
    User
}