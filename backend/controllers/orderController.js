import orderModel from "../models/orderModel.js"
import Stripe from "stripe"
import userModel from "../models/userModel.js"
import foodModel from "../models/foodModel.js"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const orderplace = async(req,res)=>{
try{
    const neworder =new orderModel({
    userId : req.user.userId,
    name : req.body.name,
    items : req.body.items,
    amount : req.body.amount,
    address : req.body.address,
payment : req.body.payment,
phone : req.body.phone
   
})
await neworder.save()
await userModel.findByIdAndUpdate(req.user.userId , {cartData:{}})

return res.json({success:true , message : "Your order has been placed"})
}catch(err){
    return res.json({success:false , message : "Something went wrong while ordering"})
}
}
const createCheckoutSession = async(req,res)=>{
const {cartItems} = req.body
const foodIds = Object.keys(cartItems)
const food = await foodModel.find({_id : {$in : foodIds}})


try{
const session = await stripe.checkout.sessions.create({
payment_method_types : ['card' ],
mode : 'payment',
line_items : food.map((items)=>({
    price_data : {
currency : 'inr',
product_data : {
    name : items.name
},
unit_amount : items.price * 100
    },
    quantity : cartItems[items._id.toString()]
})),
success_url : 'http://localhost:5173/order-success',
cancel_url : 'http://localhost:5173/order-cancel'
})
return res.json({ success : true ,id : session.id})
}catch(err){
    console.log("stripe error" + err)
    return res.json({succes:false , message:"session error "})
}
}
const userorders = async(req,res)=>{
  try{
  const orders =await orderModel.find({ userId: req.user.userId })
  if(orders){
    return res.json({success:true , data : orders})
  }else{
    return res.json({success:false , message : "You dont have any active orders"})
  }
  }catch(err){
return res.json({success:false , message : "Something went wrong while fetching orders"})
  }
}
const adminorders = async(req,res)=>{
 try{
  const orders = await orderModel.find({})
 if(orders){
   return res.json({success:true , data : orders})
 }else{
  return res.json({success:false , message : "There is no data"})
 }
 }catch(err){
 return  res.json({success:false , message : "Some error occured while fetching the orders"})
 }
}
const updatestatus = async(req,res)=>{
const {status , orderId} = req.body
try{
  const order = await orderModel.findById( orderId)
  if(order){
    order.status = status
    await order.save()
    return res.json({success:true  , message : "status updated"})
  }
}catch(err){
return res.json({succes:false , message:"status not updated"})
}
}
export {orderplace , userorders , createCheckoutSession , adminorders , updatestatus}