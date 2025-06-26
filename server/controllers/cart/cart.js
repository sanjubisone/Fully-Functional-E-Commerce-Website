const Cart = require("../../models/cart");
const Product = require("../../models/product"); // Optional - for validation

/**
 * Adds an item to the cart. If the cart doesn't exist, it creates one.
 * If the item is already in the cart, it updates the quantity.
 */
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and Product ID are required.',
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        if (product.totalStock < quantity) {
            return res.status(400).json({ success: false, message: 'Not enough stock available.' });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Cart exists for the user
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // Product does not exist in cart, add as a new item
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
            const populatedCart = await cart.populate('items.productId');
            return res.status(200).json({ success: true, data: populatedCart });
        } else {
            // No cart for the user, create a new one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity }],
            });
            const populatedCart = await newCart.populate('items.productId');
            return res.status(201).json({ success: true, data: populatedCart });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error adding item to cart.',
        });
    }
};

/**
 * Fetches all items in a user's cart, populating product details.
 */
const fetchCartItems = async (req, res) => {
     
    try {
      console.log('cart fetching called')
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            model: 'product',
        });

        if (!cart) {
            // Return an empty cart structure if no cart is found
            return res.status(200).json({ success: true, data: { items: [] } });
        }

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart items.',
        });
    }
};

/**
 * Updates the quantity of a specific item in the cart.
 */
const updateCartItemQty = async (req, res) => {
    console.log('updateCartItemQty')
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'User ID, Product ID, and quantity are required.',
            });
        }
        const cart = await Cart.findOne({ userId });

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

        if ( (cart.items[itemIndex].quantity+quantity) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be greater than 0. Use the delete endpoint to remove an item.',
            });
        }

        

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found.' });
        }

        

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
            const updatedCart = await (await cart.save()).populate('items.productId');
            res.status(200).json({ success: true, data: updatedCart });
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item quantity.',
        });
    }
};

/**
 * Deletes an item from the cart.
 */
const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.query; // Assuming IDs are in params for DELETE
        console.log('delete cart product query ',req.query)

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        ).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found or item not in cart.' });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting cart item.',
        });
    }
};

module.exports = { deleteCartItem, updateCartItemQty, fetchCartItems, addToCart };
