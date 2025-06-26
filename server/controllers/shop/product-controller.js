const fetchAllFilteredProduct = async (req , res)=>{
    console.log('req.query ',req.query)

const brand = req.query['brand[]'];
const category = req.query['category[]'];

  const query = {};

  if (category) {
    query.category = { $in: Array.isArray(category) ? category : [category] };
  }

  if (brand) {
    query.brand = { $in: Array.isArray(brand) ? brand : [brand] };
  }
  console.log('query ',query)


const Product = require('../../models/product');
console.log('fetcj all product calleded')
    try{
console.log('fetcj all product calleded')
        const listOfProduct= await Product.find(query)
        // console.log(listOfProduct)
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

module.exports = {fetchAllFilteredProduct}