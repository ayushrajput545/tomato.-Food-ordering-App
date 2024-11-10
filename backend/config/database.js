const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{

    mongoose.connect(process.env.DATABASE_URL)
   .then(()=>{console.log("DB CONNECTION SUCCESSFULL")})
   .catch((err)=>{
    console.log(err)
    console.log("Failed to connect DB")})

}
module.exports = dbConnect;