const Order = require('../models/Order');
const { asyncHandler } = require('../utility/asyncHandler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res) => {
    const {
        items,
        totalAmount,
        shippingAddress,
        paymentMethod
    } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No order items provided' });
    }

    const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod
    });

    const createdOrder = await order.save();
    await createdOrder.populate('user', 'username email');

    res.status(201).json({
        success: true,
        data: createdOrder
    });
});

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate('items.product', 'name price image')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'username email')
        .populate('items.product', 'name price image');

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to access this order' });
    }

    res.json({
        success: true,
        data: order
    });
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update order status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    const updatedOrder = await order.save();

    res.json({
        success: true,
        data: updatedOrder
    });
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to access all orders' });
    }

    const orders = await Order.find({})
        .populate('user', 'username email')
        .populate('items.product', 'name price image')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get order statistics for user
// @route   GET /api/orders/stats
// @access  Private
exports.getOrderStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const stats = await Order.aggregate([
        { $match: { user: userId } },
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalSpent: { $sum: '$totalAmount' },
                averageOrderValue: { $avg: '$totalAmount' },
                statusBreakdown: {
                    $push: '$status'
                }
            }
        }
    ]);

    const statusCounts = {};
    if (stats.length > 0) {
        stats[0].statusBreakdown.forEach(status => {
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
    }

    res.json({
        success: true,
        data: {
            totalOrders: stats.length > 0 ? stats[0].totalOrders : 0,
            totalSpent: stats.length > 0 ? stats[0].totalSpent : 0,
            averageOrderValue: stats.length > 0 ? stats[0].averageOrderValue : 0,
            statusCounts
        }
    });
});