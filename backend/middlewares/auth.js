const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req,res,next)=>{
    
    try{
        const{token} = req.headers

        if(!token){
            return res.status(402).json({
                success:false,
                message:"Token Missing"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            console.log(err);
            return res.status(402).json({
                success:false,
                message:'Token invalid'
            })
        }
        next();

    }
    catch(err){
        console.log(err);
        return res.status(402).json({
            success:false,
            message:'Something went wrong while verifying token',
            error:err.message
        })
    }
}