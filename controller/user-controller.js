const zod = require("zod")
const {User} = require("../model/user");
const { Account } = require("../model/bank");
const jwt = require('jsonwebtoken');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const registerUser = async(req, res) => {
    try{

    const {username, firstName, lastName, password} = req.body

    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            message: "All Inputs Fields Are Required!"
        })
    }

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.status(400).json({
            message: "Email is already taken!"
        })
      }

    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password
    })

    const userId = newUser._id

    // --- create a new account --- //
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })


    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "24h"})

    res.status(201).json({
        message: "user registered successfully!",
        accessToken: token
    })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error: "server side error"
        })
    }
}

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


const loginUser = async(req, res) => {
    try{
        const {username, password} = req.body
        const {success} = signinBody.safeParse(req.body)
        if(!success){
        return res.status(400).json({
            message: 'invalid input fields!'
          })
        }

        const user = await User.findOne({username, password})
        if(!user){
            return res.status(401).json({
                message: "error while logging in!"
            })
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"24h"})
        res.status(200).json({
            accessToken: token
        })
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error: "server side error!"
        })
    }
}

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const updateUser = async(req, res) => {
    try{
        const {success} = updateBody.safeParse(req.body)
        if(!success){
            return res.status(400).json({
                message: "error while updating information"
            })
        }

        await User.updateOne({_id: req.userId}, req.body)
        res.status(200).json({
            message: "user updated successfully!"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "server side error!"
        })
    }

}


const getUser = async(req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUser
}


