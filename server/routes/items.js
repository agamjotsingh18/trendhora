const express = require("express")
const router = express.Router()
const cors = require("cors")
const uploadPhoto = require("../middlewares/upload")
const { getItem, addItem, updateItem, deleteItem, getItemById, searchItems, checkStock, updateStock, getLowStockItems } = require("../controllers/itemsController")
const Item = require("../models/Item"); 
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', cors(), async (req, res) => {
    try {
        const items = await Item.find();
       
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Specific routes must come first
router.get('/search', searchItems);

// @route   GET /api/items/low-stock
// @desc    Get low stock items (Admin only)
// @access  Private/Admin
router.get('/low-stock', authMiddleware, getLowStockItems);

// @route   GET /api/items/:id/check-stock
// @desc    Check stock availability for a specific item
// @access  Public
router.get('/:id/check-stock', checkStock);

router.get('/:id', getItemById);

// @route   PUT /api/items/:id/stock
// @desc    Update stock for a specific item (Admin only)
// @access  Private/Admin
router.put('/:id/stock', authMiddleware, updateStock);




/* The post request must have a body elemnt with name images */
router.post('/', uploadPhoto.array('images'), addItem);


router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;