const {imageUploadUtil} = require('../../helpers/cloudinary');
const Product = require('../../models/product');

const handleImageUpload= async (req , res)=>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        console.log("produc comtorllerf")

        res.json({
            success : true ,
            result
        })

    }
    catch(error){

        console.log(error)
        res.json({
            success : false,
            message : 'error occured',
        })
    }
}


const addProduct = async (req , res)=>{

    try{
        const {image , description , category , brand , price , salePrice , totalStock,title} = req.body;
        const newlyCreadedProduct=new Product({
            image , description , category , brand , price , salePrice , totalStock,title,
        })

        await newlyCreadedProduct.save()
        res.status(201).json({
            success : true ,
            data : newlyCreadedProduct
            
        })

    }catch(e){
console.log(e)
res.status(500).json({
    success : false ,
    message : 'some error occured',
})
    }
}

const fetchAllProduct = async (req , res)=>{

console.log('fetcj all product calleded')
    try{
console.log('fetcj all product calleded')
        const listOfProduct= await Product.find({})
        console.log(listOfProduct)
        res.status(200).json({
            success : true,
            data : listOfProduct,
        })

    }catch(e){
console.log(e)
res.status(500).json({
    success : false ,
    message : 'some error occured',
})
    }
}


const editProduct = async (req , res)=>{
    const {id} =req.params
 const {image , title , description , category , brand , price , salePrice , totalStock,} = req.body;
 
    try{


const findProduct = await Product.findById(id)
 if(!findProduct){
    return res.status(404).json({
        success : false ,
        message : 'product is not found'
    })
 }

findProduct.title=title || findProduct.title
findProduct.description=description || findProduct.description
findProduct.category=category || findProduct.category
findProduct.brand=brand || findProduct.brand
findProduct.salePrice=salePrice || findProduct.salePrice
findProduct.totalStock=totalStock || findProduct.totalStock
findProduct.image=image || findProduct.image
await findProduct.save()

res.status(200).json({
    success : true,
    data : findProduct,
})


    }catch(e){
console.log(e)
res.status(500).json({
    success : false ,
    message : 'some error occured',
})
    }
}

const deleteProduct = async (req , res)=>{

    try{
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product){
    return res.status(404).json({
        success : false ,
        message : 'product is not found'
    })
 }
 res.status(200).json({
    success : true ,
    message : 'product deleted successfully',

 })


    }catch(e){
console.log(e)
res.status(500).json({
    success : false ,
    message : 'some error occured',
})
    }
}



module.exports = {handleImageUpload , addProduct , fetchAllProduct , editProduct , deleteProduct }