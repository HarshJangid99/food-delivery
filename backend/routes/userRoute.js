import express from 'express'
import {  login, profile, userregister } from '../controllers/userController.js'
import jwtVerify from '../middleware/jwtAuth.js'
const userRouter = express.Router()
userRouter.post('/register' , userregister )
userRouter.post('/login' , login)
userRouter.get('/profile' ,jwtVerify, profile)
export {userRouter}