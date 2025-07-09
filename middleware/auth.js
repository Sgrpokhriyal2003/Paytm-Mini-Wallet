const jwt = require("jsonwebtoken")

const authorizaUser = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({
            message: "authorization header is required!"
        })
    }

    try{
        const token = authHeader.split(" ")[1]
        if(!token){
            return res.status(400).json({
                message: "Token Is Required!"
            })
        }   

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next();
    }
    catch(error){
        res.status(400).json({message: "invalid token"})
    }
}

module.exports = {
    authorizaUser
}