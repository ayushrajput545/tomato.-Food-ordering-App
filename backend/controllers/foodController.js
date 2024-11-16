const food = require('../models/foodModel');
const fs = require('fs');

exports.addFood = async(req,res)=>{

    try{

        let image_filename =   `${req.file.filename}`;  //image -> same name as we write in multer "image" key = image value : file any
        const{name , description , price , category}= req.body;

        if(!name || !description || !image_filename || !price){
            return res.status(402).json({
                success:false,
                message:"All fields are required"
            })
        }

        const foodDetails = await food.create({name , description , price , category ,image:image_filename});

        return res.status(200).json({
            sucess:true,
            message:"Food Details successsfully added"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while adding food",
            err:err.message
        })
    }
}

//get food details
exports.showFoodList = async(req,res)=>{
    try{

        const foodDetails = await food.find({});

        return res.status(200).json({
            success:true,
            message:"Food detail fetched successfully",
            foodDetails
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while fetching food details",
            error:err.message
        })
    }
}

//delete food item 
exports.removeFood = async(req,res)=>{
    try{
        const {foodId} = req.body;
        
        const Food = await food.findById(foodId);//deleting image from upload folder
        fs.unlink(`uploads/${Food.image}`,()=>{})   

        await food.findByIdAndDelete(foodId); //delete from db

        return res.status(200).json({
            success:true,
            message:"Food Item Deleted"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting food item",
            error:err.message
        })
    }
}