const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();

//signup user
exports.signup= async(req,res)=>{
    try{
          
        const{name , email , password}= req.body;

        if(!name || !email || !password){
            return res.status(402).json({
                success:false,
                message:'All fields are required',
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(402).json({
                success:false,
                message:'User Already exist! Please login',
            });
        }

        //validate email and strong password
        if(!validator.isEmail(email)){
            return res.status(402).json({
                success:false,
                message:'Please enter valid email',
            });
        }

        if(password.length<4){
            return res.status(402).json({
                success:false,
                message:'Password must have at least 4 digits',
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({name:name , email:email , password:hashedPassword});

        const payload ={
            email:newUser.email,
            id:newUser._id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET , {expiresIn:"2d"});
        const userObj = newUser.toObject(); // Convert Mongoose document to plain object
        userObj.token = token;

        return res.status(200).json({
            success:true,
            message:'User Successfully Created',
            newUser:userObj,
            token
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while signing up',
            error:err.message
        })
    }

}


//login user
exports.login = async(req,res)=>{

    try{
        const{email , password} = req.body;

        if(!email || !password){
            return res.status(402).json({
                success:false,
                message:'All fields are required',
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(402).json({
                success:false,
                message:'User not exist! Please signup',
            });
        }

        if(await bcrypt.compare(password,user.password)){

            const payload ={
                email:user.email,
                id:user._id
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET , {expiresIn:"2d"});
            const userObj = user.toObject(); // Convert Mongoose document to plain object
            userObj.token = token;
            userObj.password=undefined;

            return res.status(200).json({
                success:false,
                message:"Logged In",
                token,
                userObj,
            })
        }
        else{
            return res.status(402).json({
                success:false,
                message:'Password Incorrect',
            });

        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while Logged In',
            error:err.message
        })
    }



}

