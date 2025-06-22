
import jwt from "jsonwebtoken"
const jwtVerify = (req,res , next)=>{
const authHeader = req.headers.authorization
if(!authHeader)return res.json({success : false , message : "Unauthorized request"})
    const token = authHeader.split(" ")[1]
try{
    const decoded = jwt.verify(token , "secret123" )
    req.user = decoded
    next()
}catch(err){
    return res.json({success:false , message : "Some error occured"})
}
}
export default jwtVerify