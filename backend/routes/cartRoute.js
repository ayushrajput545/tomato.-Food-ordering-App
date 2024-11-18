const express = require('express');
const router = express.Router();

const {addToCart , removeCart , getCart} = require('../controllers/cartController');
const{auth} = require('../middlewares/auth');

router.post('/addtocart',auth, addToCart);
router.post('/removecart', auth ,removeCart);
router.get('/getcart', auth ,getCart);

module.exports=router