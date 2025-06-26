const express = require('express')
const { addToCart,fetchCartItems ,updateCartItemQty ,deleteCartItem} =require('../../controllers/cart/cart');
const router=express.Router()

router.post('/add' , addToCart)
router.get('/get/:userId' , fetchCartItems)
router.put('/edit' , updateCartItemQty)
router.delete('/delete' , deleteCartItem)

module.exports=router


