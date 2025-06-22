import express from 'express'
import jwtVerify from '../middleware/jwtAuth.js'
import {  adminorders, createCheckoutSession, orderplace, updatestatus, userorders } from '../controllers/orderController.js'
const orderRouter = express.Router()
orderRouter.post('/create-checkout-session' , jwtVerify , createCheckoutSession)
orderRouter.post('/order-placed' , jwtVerify , orderplace)
orderRouter.get('/userorders' , jwtVerify , userorders)
orderRouter.get('/adminorders' ,adminorders )
orderRouter.put('/updatestatus' , updatestatus)
export {orderRouter}