const Order = require('../../models/Order'); // Adjust path as per your structure
const User = require('../../models/user');


const addOrder = async (req, res) => {

  console.log('add ordrer apiu called')
  try {
    const { orderItems, shippingAddress, paymentMethod, totalAmount , user} = req.body;
// const orders = await Order.find({_d : orderItems._id}).populate('_id','title','price','image');
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items provided' });
    }

    const newOrder = new Order({
      user:user, // Assuming authentication middleware adds `user`
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error });
  }
};


const getUserOrders = async (req, res) => {
   const {userId} = req.params
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user orders', error });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus ,paymentStatus, isDelivered } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus,paymentStatus, isDelivered, deliveredAt: isDelivered ? Date.now() : null },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order', error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting order', error });
  }
};


const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // If user is not admin, ensure user owns the order
    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order', error });
  }
};

module.exports={addOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder}