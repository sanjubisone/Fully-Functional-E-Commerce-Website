// routes/payment.js
const express = require('express');
const router = express.Router();
const getRazorpayInstance = require('../utils/razorpay'); // Now imports a function

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  console.log('crate order aip called')

  try {
    const razorpay = getRazorpayInstance(); // Call the function to get the instance
    const options = {
      amount: amount * 100, // Razorpay amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
