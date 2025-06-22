import express from 'express'
import { addFood, listAllFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'
import jwtVerify from '../middleware/jwtAuth.js'
const foodRouter = express.Router()
const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req,file,cb)=>{
        return cb(null , `${Date.now() + file.originalname}`)
    }
})
const upload = multer({storage:storage})
foodRouter.post('/addfood', upload.single("image"), addFood)
foodRouter.get('/list' , listAllFood)
foodRouter.post('/remove' , removeFood)
export default foodRouter