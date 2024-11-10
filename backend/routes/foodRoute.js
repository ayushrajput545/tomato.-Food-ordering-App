const express = require('express');
const router = express.Router();
const multer = require('multer');


const{addFood ,showFoodList ,removeFood} = require('../controllers/foodController');

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

router.post('/addfood',upload.single("image"), addFood);
router.get('/showFoodList',showFoodList);
router.delete('/removeFood' ,removeFood);

module.exports=router

