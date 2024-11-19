const User = require('../models/userModel');
const Order = require('../models/orderModel');
require('dotenv').config();
const Stripe = require('stripe');
const orderModel = require('../models/orderModel');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.placeOrder= async(req,res)=>{
    
    const frontend_url = "http://localhost:3001"

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
                unit_amount: item.price * 100, // Multiplies the price by 100 for Stripe 
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
            success_url:`${frontend_url}/verify?success=true&orderId${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId${newOrder._id}`
             
        })

        return res.status(200).json({
            success:false,
            message:"Order Placed Successfully",
            newOrder,
            session_url:session.url
        })
        

    }
    catch(err){
        console.log(err);
        return res.status(200).json({
            success:false,
            message:"Something went wrong while creating order",
            error:err.message
        })
    }


}