const express = require('express')
const router = express.Router()

const {authorizeUser} = require("../middleware/auth")
const {registerUser, loginUser, updateUser} = require("../controller/user-controller")

router.post("/user/signup", registerUser);
router.post("/user/signin", loginUser)
router.put("/user/update",  authorizeUser, updateUser)



module.exports = router