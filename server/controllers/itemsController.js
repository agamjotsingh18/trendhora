const Item = require("../models/Item");

/* GET request handler */
const getItem = async (req, res) => {
    try {
        const items = await Item.find();
        console.log('Query:', items);
        if (items.length > 0) {
          res.status(200).json(items); 
        } else {
          res.status(404).json({ message: 'No items found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    };

    /* GET request handler to get single item by ID */
    const getItemById = async (req, res) => {
    
      try {
          const id=req.params.id;
          const item = await Item.findById(id);
          console.log('Query:', item);
          if (item) {
            res.status(200).json(item); 
          } else {
            res.status(404).json({ message: 'No item found' });
          }
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
    };

/* POST Request handler */
const addItem = async (req, res) => {
    const highlights = req.body.highlights.split(",")
    const size = req.body.size.split(",")

    /* The request.body must have all these values */
    const item = {
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        color: req.body.color,
        description: req.body.description,
        price: req.body.price,
        image: req.files,
        size: size,
        highlights: highlights,
        detail: req.body.detail
    }

    if(item){
        await Item.create(item)
        res.status(201).json({message: "Items Add Success"})
        res.redirect("/shop")
    } 
    else {
        res.status(400).json({message: "Unable to add item"})
    }
}

/* PUT Request handler */
const updateItem = (req, res) => {
    res.json({message: "update Item"})
}

/* DELETE Request handler */
const deleteItem = (req, res) => {
    res.json({message: "delete Item"})
}

module.exports = {
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getItemById
}