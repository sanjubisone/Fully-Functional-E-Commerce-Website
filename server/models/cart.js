const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', // Make sure you have a 'Product' model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.'],
        default: 1
    }
}, {_id: false}); // _id is not needed for subdocuments here

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Make sure you have a 'User' model
        required: true,
        unique: true // Usually, a user has only one cart
    },
    items: [cartItemSchema]
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Cart', CartSchema); 