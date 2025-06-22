import fs from 'fs';
import path from 'path';
import foodModel from '../models/foodModel.js';
const addFood = async(req,res)=>{
    const filename = `${req.file.filename}`
 
    const newfood = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : filename
    });
    await newfood.save()
    res.status(201).json({ success : true , message : "Food Added Successfully"})
}
const listAllFood = async(req,res)=>{
    try{
        const allfoods = await foodModel.find({})
        res.json({success : true , data : allfoods})
    }
    catch(err){
        console.log(err)
        res.json({success:false , message : "error"})
    }
}
const removeFood = async (req, res) => {
  try {
    const fooditem = await foodModel.findById(req.body.id);

    const imagePath = path.join('uploads', fooditem.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Image delete error:", err);
      } else {
        console.log("Image deleted:", imagePath);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export {addFood , listAllFood , removeFood}