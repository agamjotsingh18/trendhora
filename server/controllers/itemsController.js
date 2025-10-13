const Item = require("../models/Item");
const { asyncHandler } = require("../utility/asyncHandler");

// ------------------------ GET ALL ITEMS ------------------------
const getItem = asyncHandler(async (req, res) => {
  const items = await Item.find();
  if (items.length) {
    return res.status(200).json(items);
  }
  return res.status(404).json({ message: "No items found" });
});

// ------------------------ GET SINGLE ITEM BY ID ------------------------
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    return res.status(200).json(item);
  }
  return res.status(404).json({ message: "No item found" });
});

// ------------------------ ADD NEW ITEM ------------------------
const addItem = asyncHandler(async (req, res) => {
  const highlights =
    req.body.highlights
      ?.split(",")
      .map((h) => h.trim())
      .filter(Boolean) || [];
  const size =
    req.body.size
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const { name, category, type, color, description, price, detail, stock, lowStockThreshold } = req.body;


  const requiredFields = [
    name,
    category,
    type,
    color,
    description,
    price,
    detail,
  ];
  const isMissingField = requiredFields.some((field) => !field);
  const hasImages = req.files?.length > 0;

  if (isMissingField || !highlights.length || !size.length || !hasImages) {
    return res
      .status(400)
      .json({ message: "Unable to add item. All fields are required." });
  }

  const item = {
    name,
    category,
    type,
    color,
    description,
    price,
    image: req.files.map((file) => file.path),
    size,
    highlights,
    detail,
    stock: stock || 0,
    lowStockThreshold: lowStockThreshold || 5,
  };

  await Item.create(item);
  return res.status(201).json({ message: "Item added successfully" });
});

// ------------------------ UPDATE ITEM ------------------------
const updateItem = asyncHandler(async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  return res.status(200).json(updatedItem);
});

// ------------------------ DELETE ITEM ------------------------
const deleteItem = asyncHandler(async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);
  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  return res.status(200).json({ message: "Item deleted successfully" });
});

// ------------------------ SEARCH ITEMS ------------------------
const searchItems = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "No search query provided." });

  const regex = new RegExp(q, "i");
  const items = await Item.find({
    $or: [{ name: regex }, { type: regex }, { category: regex }],
  });
  return res.status(200).json(items);
});

/* GET request handler to check stock for an item */
const checkStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.query;

  const item = await Item.findById(id);
  
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const requestedQuantity = parseInt(quantity) || 1;
  const isAvailable = item.checkStockAvailability(requestedQuantity);

  res.status(200).json({
    available: isAvailable,
    stock: item.stock,
    stockStatus: item.stockStatus,
    requestedQuantity: requestedQuantity
  });
});

/* PUT request handler to update stock (Admin only) */
const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock, lowStockThreshold } = req.body;

  // Check if user is admin (assumes authMiddleware sets req.user)
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  const item = await Item.findById(id);
  
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (stock !== undefined) {
    item.stock = stock;
  }
  
  if (lowStockThreshold !== undefined) {
    item.lowStockThreshold = lowStockThreshold;
  }

  await item.save();

  res.status(200).json({
    message: "Stock updated successfully",
    item: item
  });
});

/* GET request handler to get low stock items (Admin only) */
const getLowStockItems = asyncHandler(async (req, res) => {
  // Check if user is admin (assumes authMiddleware sets req.user)
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  const lowStockItems = await Item.getLowStockItems();

  res.status(200).json({
    count: lowStockItems.length,
    items: lowStockItems
  });
});

module.exports = {
  getItem,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  searchItems,
  checkStock,
  updateStock,
  getLowStockItems,
};
