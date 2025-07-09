const express = require('express')
const router = express.Router()

const {authorizeUser} = require("../middleware/auth")
const {registerUser, loginUser, updateUser, getUser} = require("../controller/user-controller")

router.post("/user/signup", registerUser);
router.post("/user/signin", loginUser)
router.put("/user/update",  authorizeUser, updateUser)
router.get("/user/bulk", getUser)


module.exports = router