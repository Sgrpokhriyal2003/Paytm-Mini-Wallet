const express = require('express')
const router = express.Router()

const {authorizeUser} = require("../middleware/auth")
const {getBalance, transferMoney} = require("../controller/account-controller")

router.get("/account/balance", authorizeUser, getBalance);
router.post("/account/transfer", authorizeUser, transferMoney)

module.exports = router

