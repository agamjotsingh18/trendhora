const Order = require("../models/Order");
const { asyncHandler } = require("../utility/asyncHandler");

// ------------------------ CREATE NEW ORDER ------------------------
exports.createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!items?.length) {
    return res.status(400).json({ message: "No order items provided" });
  }

  const order = await new Order({
    user: req.user._id,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod,
  }).save();

  await order.populate("user", "username email");

  res.status(201).json({ success: true, data: order });
});

// ------------------------ GET USER ORDERS ------------------------
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name price image")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
});

// ------------------------ GET ORDER BY ID ------------------------
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "username email")
    .populate("items.product", "name price image");

  if (!order) return res.status(404).json({ message: "Order not found" });

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to access this order" });
  }

  res.json({ success: true, data: order });
});

// ------------------------ UPDATE ORDER STATUS (ADMIN) ------------------------
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to update order status" });
  }

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status;
  order.updatedAt = Date.now();

  const updatedOrder = await order.save();
  res.json({ success: true, data: updatedOrder });
});

// ------------------------ GET ALL ORDERS (ADMIN) ------------------------
exports.getAllOrders = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to access all orders" });
  }

  const orders = await Order.find({})
    .populate("user", "username email")
    .populate("items.product", "name price image")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
});

// ------------------------ GET ORDER STATISTICS ------------------------
exports.getOrderStats = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$totalAmount" },
        averageOrderValue: { $avg: "$totalAmount" },
        statusBreakdown: { $push: "$status" },
      },
    },
  ]);

  const statusCounts = {};
  if (stats.length) {
    stats[0].statusBreakdown.forEach((status) => {
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
  }

  res.json({
    success: true,
    data: {
      totalOrders: stats[0]?.totalOrders || 0,
      totalSpent: stats[0]?.totalSpent || 0,
      averageOrderValue: stats[0]?.averageOrderValue || 0,
      statusCounts,
    },
  });
});
