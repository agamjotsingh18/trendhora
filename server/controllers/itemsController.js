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
  const { name, category, type, color, description, price, detail } = req.body;

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

module.exports = {
  getItem,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  searchItems,
};
