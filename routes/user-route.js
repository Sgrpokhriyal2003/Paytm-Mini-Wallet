const express = require('express')
const router = express.Router()

const {registerUser, loginUser} = require("../controller/user-controller")

router.post("/user/signup", registerUser);
router.post("/user/signin", loginUser)



module.exports = router