const express = require('express');
const router = express.Router();
const {
  addOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../../controllers/orders/order-controllers');
const {authMiddleware }=require('../../controllers/auth/auth-controller')

router.get('/check-auth',(req , res)=>{
// const user=req.user
res.status(200).json({
    success : true,
    message :'authnticated user',
    user  : req.user
})
}
)
// Assume you have auth middleware: authMiddleware, isAdmin

router.post('/', addOrder);
router.get('/my-orders/:userId', getUserOrders);
// router.get('/:id', authMiddleware, getOrderById);

// // Admin routes
// router.get('/', authMiddleware, isAdmin, getAllOrders);
// router.put('/:id', authMiddleware, isAdmin, updateOrderStatus);
// router.delete('/:id', authMiddleware, isAdmin, deleteOrder);

module.exports = router;
