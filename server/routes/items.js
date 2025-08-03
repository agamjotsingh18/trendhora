const express = require("express")
const router = express.Router()
const cors = require("cors")
const uploadPhoto = require("../middlewares/upload")
const { getItem, addItem, updateItem, deleteItem, getItemById } = require("../controllers/itemsController")
const Item = require("../models/Item"); 

router.get('/', cors(), async (req, res) => {
    try {
        const items = await Item.find();
        console.log("Fetched items:", items);
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* The get request to get single item by ID*/ 
router.get('/:id',getItemById);




/* The post request must have a body elemnt with name images */
router.post('/', uploadPhoto.array('images'), addItem);


router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;