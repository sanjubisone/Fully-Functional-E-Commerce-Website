
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authrouter=require('./routes/auth/auth-rout')
const adminProductRouter=require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/products-routs')
const cartProductRouter = require('./routes/cart/carts-routs')
const addressProductRouter = require('./routes/address/address-rots')
const orderRouter = require('./routes/order/orders-routs')
const paymentRoutes = require('./routes/payment');


require('dotenv').config();

console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(
    cors({
        origin: 'https://fully-functional-e-commerce-website.vercel.app', // Adjust this to your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
             'Authorization',
           'Catch-Control',
           'Expires',
           'Pragma',
            
            ],
        credentials: true,
    })
);

app.get('/' , (req , res)=>{
  console.log('get api called ')
  res.send('hello sanju bhow RE YOU')
})

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' ,authrouter)
app.use('/api/admin/products' ,adminProductRouter)
app.use('/api/shop/products' ,shopProductRouter)
app.use('/api/cart/items' ,cartProductRouter)
app.use('/api/address' ,addressProductRouter)
app.use('/api/orders' ,orderRouter)
app.use('/api/payment', paymentRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
