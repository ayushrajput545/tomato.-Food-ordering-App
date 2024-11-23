const User = require('../models/userModel');
const Order = require('../models/orderModel');
require('dotenv').config();
const Stripe = require('stripe');
const orderModel = require('../models/orderModel');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 

exports.placeOrder= async(req,res)=>{
    
    const frontend_url = "https://app.netlify.com/sites/rococo-croissant-8cfe60"

    try{

        const userId = req.user.id;
        const{items , amount , address}= req.body;

        const newOrder = await orderModel.create({userId , items , amount , address});

        await User.findByIdAndUpdate(userId , {cartData:{}});

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity, 
        }));

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100 // * 80 for inr
            },
            quantity:1
        })
 

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,  //when we redirect to verify route in frontend extract this from searchparams
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
             
        })

        

        return res.status(200).json({
            success:true,
            message:"Order Placed Successfully",
            newOrder,
            session_url:session.url
                  
        })
        

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating order",
            error:err.message
        })
    }
}

exports.verifyOrder = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment Done",
            });
        } 
        else {
            await Order.findByIdAndDelete(orderId);
            return res.status(401).json({
                success: false,
                message: "Payment Failed",
            });
        }

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};


//user orders for frontend

exports.userOrders = async(req,res)=>{

    try{

        const userId = req.user.id;

        const orders = await Order.find({userId}); // fetched orders of that loggedin user

        return res.status(200).json({
            success:true,
            message:"User orders fetched sucessfully",
            orders
        })

    }
    catch(err){
        return res.status(500).json({
            sucess:false,
            message:"Internal Server Error",
            error:err.message
        })
    }

}

//listing order of all the users in admin panel
exports.listOrders = async(req,res)=>{

    try{

        const orders = await Order.find({})  // fteched orders of all the user

        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}

//update stattus from admin pannel

exports.updateStatus = async(req,res)=>{

    try{
        const {orderId , status} = req.body;
        await Order.findByIdAndUpdate(orderId , {status:status});
        return res.status(200).json({
            sucess:true,
            message:"Status Updated"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:err.message
        })
    
    }
}
