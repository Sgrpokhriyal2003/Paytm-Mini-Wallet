const { mongoose } = require("mongoose")
const {Account} = require("../model/bank")



const getBalance = async(req, res) => {
    try{
        const account = await Account.findOne({
            userId: req.userId
        })

        if(!account){
            return res.status(404).json({
                message: "user not found with this userId"
            })
        }

        res.status(200).json({
            balance: account.balance
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "error while fetching account balance"
        })
    }
}

//bad solution - does not use transaction
// const transferMoney = async(req, res) => {
//     const {amount, to} = req.body

//     const account = await Account.findOne({
//         userId: req.userId
//     })

//     if(!account){
//         return res.status(404).json({
//             message: "account not found with this id in our bank!"
//         })
//     }

//     if(account.balance < amount){
//         return res.status(400).json({
//             message: "insufficient balance!"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     })

//     if(!toAccount){
//         return res.status(404).json({
//             message: "invalid account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     },{
//         $inc:{
//             balance: -amount
//        }    
//     })

//     await Account.updateOne({
//         userId: to
//     },{
//         $inc:{
//             balance: amount
//         }
//     })

//     res.json({
//         message: "transfer successfull"
//     })

// }

const transferMoney = async(req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body

    //fetch the account within the transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "insufficient balance: can't perform this operation"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "invalid account"
        })
    }

    //perform the transfer
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    //commit the transaction
    await session.commitTransaction()
    res.status(200).json({
        message: "Transfer successfull"
    })
}

module.exports = {
    getBalance,
    transferMoney
}