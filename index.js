const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3001

//local imports
const connectDB = require('./config/db');

app.use(express.json())
app.use(morgan('dev'))

app.get("/home", (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to paytm wallet applicaion💸"
    })
})

//connection to db
connectDB()
.then(() => {
    app.listen(port, () => {
    console.log(`server is listen on port: http://localhost:${port}`)
    })
})
.catch((err) => {
    console.log(err);
})
