const ErrorResponse = require("../utils/errorResponse");
var jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    console.log("Executed")
    const privateKey = process.env.PRIVATE_KEY
    const token = req.headers.authorization;
    console.log("req.headers.authorization::",req.headers.authorization)
    if(!token){
        next(new ErrorResponse("You are not an authorized user",401))
    }
    const decodeToken = jwt.verify(token,privateKey)
    console.log(decodeToken)
    req.adminData = {userId : decodeToken.adminEmail}
    next()
}