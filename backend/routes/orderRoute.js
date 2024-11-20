const express = require('express');
const router = express.Router();

const{placeOrder ,verifyOrder,userOrders}= require('../controllers/orderController');
const {auth} = require('../middlewares/auth');

router.post('/placeorder',auth, placeOrder);
router.post('/verify', verifyOrder);
router.get('/userorders',auth ,userOrders);

module.exports=router;

