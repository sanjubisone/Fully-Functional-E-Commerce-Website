const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String,
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: true,
      enum: ['CashOnDelivery', 'razorpay']
    },
    paymentStatus: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Paid', 'Failed'],
    },
    orderStatus: {
      type: String,
      default: 'Processing',
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    totalAmount: {
      type: Number,
      required: true
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
