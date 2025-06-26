const express = require('express')
const {fetchAllFilteredProduct} =require('../../controllers/shop/product-controller');

const router=express.Router()


router.get('/get' , fetchAllFilteredProduct)


module.exports=router