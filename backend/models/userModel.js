const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    cartData:{
        type:Object,
        default:{}
    },
},{minimize:false});  // retained empty object when saving document to monmgodb ; by default it is minimize:true then monogdb removed empty object cartdata

module.exports = mongoose.model('User' , userSchema);