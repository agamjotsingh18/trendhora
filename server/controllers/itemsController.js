const Item = require("../models/Item");
const { asyncHandler } = require("../utility/asyncHandler");

/* GET request handler */
const getItem = asyncHandler(async (req, res) => {
  const items = await Item.find();
  console.log("Query:", items);
  if (items.length > 0) {
    res.status(200).json(items);
  } else {
    res.status(404).json({ message: "No items found" });
  }
});

/* GET request handler to get single item by ID */
const getItemById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  console.log("Query:", item);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "No item found" });
  }
});

/* POST Request handler */
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
  const hasImages = req.files && req.files.length > 0;

  if (isMissingField || !highlights.length || !size.length || !hasImages) {
    return res
      .status(400)
      .json({ message: "Unable to add item. All fields are required." });
  }

  const imagePaths = req.files.map((file) => file.path);

  const item = {
    name,
    category,
    type,
    color,
    description,
    price,
    image: imagePaths,
    size,
    highlights,
    detail,
  };

  await Item.create(item);

  return res.status(201).json({ message: "Items Add Success" });
});

/* PUT Request handler */
const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(updatedItem);
});

/* DELETE Request handler */
const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Item ID is required" });
  }
  const deletedItem = await Item.findByIdAndDelete(id);
  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }
  return res.status(200).json({ message: "Item deleted successfully" });
});

module.exports = {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  getItemById,
};
