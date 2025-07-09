const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3001

//local imports
const connectDB = require('./config/db');
const userRouter = require('./routes/user-route');
const accountRouter = require("./routes/account-route");

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get("/home", (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to paytm wallet applicaion💸"
    })
})

//routes
app.use("/api/v1", userRouter)
app.use("/api/v1", accountRouter)

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
