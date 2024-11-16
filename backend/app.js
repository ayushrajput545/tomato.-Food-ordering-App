const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./config/database');
const foodRoute = require('./routes/foodRoute');
const userRoute = require('./routes/userRoute')

const PORT = process.env.PORT || 4000

//connect db
dbConnect();

//add middlewares
app.use(express.json()) // convert frontend data into json format
app.use(cors())         //connect frontend to bknd

app.use('/api/v1',foodRoute);
app.use('/images' , express.static('uploads'));
app.use('/api/v1',userRoute);

app.use('/',(req,res)=>{
    res.send("API WORKING")
})

//server listen
app.listen(PORT, ()=>{
    console.log(`Server is running at port no ${PORT}`);
})

