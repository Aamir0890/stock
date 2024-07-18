const express=require('express');
const userController=require('../controller/userController')
const middleware=require('../middleware/auth')
const router=express.Router();


router.post('/login',userController.login)
router.post('/signup',userController.createUser)
router.post('/subscribe',middleware,userController.subscribe)

router.get('/stocks', userController.getStocks);



module.exports=router
