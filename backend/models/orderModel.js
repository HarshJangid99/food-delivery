import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId , required :true},
    name : {type:String , required: true},
    items : {type:Array , required : true},
    amount : {type : Number , required : true} ,
    address : {type: Object , required:true},
    payment : {type:Boolean , required:true},
    phone : {type:String , required : true},
    status : {type:String , default : "Food Processing"},
    date : {type: Date , default : Date.now()}
});
const orderModel = mongoose.models.orders || mongoose.model('orders' , orderSchema)
export default orderModel