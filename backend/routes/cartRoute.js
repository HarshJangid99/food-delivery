import express from 'express'
import jwtVerify from '../middleware/jwtAuth.js'
import { cartupdate, refreshcart } from '../controllers/cartController.js'
const cartRouter = express.Router()
cartRouter.patch('/updatecart' ,jwtVerify, cartupdate)
cartRouter.get('/refreshcart' , jwtVerify , refreshcart)
export {cartRouter}