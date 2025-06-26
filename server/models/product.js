
const { Schema, model }=require('mongoose')

const productSchema = new Schema({
    image : String,
    title : String,
    description : String,
    category : String,
    brand : String,
    price : Number,
    salePrice : Number,
    totalStock : Number,
},{timestamps : true});

const Product = model('product', productSchema);


module.exports=Product