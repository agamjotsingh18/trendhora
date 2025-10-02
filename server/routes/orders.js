const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    getOrderStats
} = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authMiddleware, createOrder);

// @route   GET /api/orders/my-orders
// @desc    Get user's orders
// @access  Private
router.get('/my-orders', authMiddleware, getMyOrders);

// @route   GET /api/orders/stats
// @desc    Get user's order statistics
// @access  Private
router.get('/stats', authMiddleware, getOrderStats);

// @route   GET /api/orders/admin/all
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/admin/all', authMiddleware, getAllOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', authMiddleware, getOrderById);

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;