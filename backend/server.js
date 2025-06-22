import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js";

const app = express()
const port = 4000
 //middleware

 app.use(express.json())
 app.use(cors({
  origin: [
    'https://foodd-delivery-app.netlify.app/',     // ✅ your real Netlify frontend URL
    '',        // ✅ optional if admin too
  ],

 }))
 app.use('/uploads', express.static('uploads'))
//db connection
connectDB()

//routes
app.use('/api/food' , foodRouter)
app.use('/api/user' , userRouter )
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)
 app.get("/" , (req,res)=>{
   res.send("API WORKING")
 })
 app.listen(port , ()=>{
    console.log(`Server started on http://localhost:${port}`)
 })

//  mongodb+srv://harshuu9982:Harshu001@cluster0.mvucf0e.mongodb.net/?