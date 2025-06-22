import userModel from "../models/userModel.js"

const cartupdate = async(req,res)=>{
  const {cart} = req.body
 try{
  const user = await userModel.findById(req.user.userId)
user.cartData = cart
await user.save()
return res.json({success:true , message:"cart updated" , data : user.cartData})
 }catch(err){
return res.json({success:false , message : "Sometwhing went wrong while updating the cart "})
 }

}
const refreshcart = async(req,res)=>{
try{
  const user  = await userModel.findById(req.user.userId)
  const cartdata = user.cartData
  return res.json({success:true , data : cartdata})

}catch(err){
  return res.json({success:false , message : "some error occured cart"})
}
}
export {cartupdate , refreshcart}