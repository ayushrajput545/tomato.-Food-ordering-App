const express = require('express');
const router = express.Router();

const{placeOrder}= require('../controllers/orderController');
const {auth} = require('../middlewares/auth');

router.post('/placeorder',auth, placeOrder);

module.exports=router;

