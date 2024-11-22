const express = require('express');
const router = express.Router();

const{placeOrder ,verifyOrder,userOrders ,listOrders , updateStatus}= require('../controllers/orderController');
const {auth} = require('../middlewares/auth');

router.post('/placeorder',auth, placeOrder);
router.post('/verify', verifyOrder);
router.get('/userorders',auth ,userOrders);
router.get('/listorders', listOrders); 
router.post('/updatestatus', updateStatus);

module.exports=router;

