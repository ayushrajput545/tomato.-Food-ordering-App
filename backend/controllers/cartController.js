const User = require('../models/userModel');

//add cart items to db
exports.addToCart= async(req,res)=>{

    try{
        const userId = req.user.id;
        const {foodId} = req.body;

        const userData = await User.findById({_id:userId});
         
        const cartData = await userData.cartData //here cartData is object in userData

        if(!cartData[foodId]){             
            cartData[foodId]=1;       // output -> hfjdijfdjn2323ik:1 //here that id will 1
        }
        else{
            cartData[foodId] += 1;
        }

        await User.findByIdAndUpdate(userId , {cartData});

        return res.status(200).json({
            success:true,
            message:"Added to cart",
            userData
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while adding to cart'
        })
    }
}

//remove cart items from db
exports.removeCart= async(req,res)=>{

    try{
        const userId = req.user.id;
        const{foodId} = req.body;

        const userData = await User.findById({_id:userId});
        const cartData = await userData.cartData;

        if(cartData[foodId]>0){
            cartData[foodId] -=1;
        }

        await User.findByIdAndUpdate(userId , {cartData});

        return res.status(200).json({
            success:true,
            message:"Item Romoved",
            userData
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while removing from cart'
        })

    }

}

//fetch cart data from db
exports.getCart= async(req,res)=>{

    try{
        const userId = req.user.id;
        const userData = await User.findById({_id:userId});

        const cartData = userData.cartData;

        return res.status(200).json({
            success:true,
            message:"Cart Data Fethced",
            cartData
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while fetching cart detail'
        })

    }

}

