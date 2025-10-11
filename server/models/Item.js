/* Schema for the Item document */

const mongoose = require("mongoose")

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        size: {
            type: Array,
            required: true
        },
        highlights: {
            type: Array,
            required: true
        },
        detail: {
            type: String
        },
        image: {
            type: Array,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        lowStockThreshold: {
            type: Number,
            default: 5,
            min: 0
        }
    },
    {
        timestamps: true
    }
)

// Virtual field for stock status
itemSchema.virtual('stockStatus').get(function() {
    if (this.stock === 0) {
        return 'out_of_stock';
    } else if (this.stock <= this.lowStockThreshold) {
        return 'low_stock';
    } else {
        return 'in_stock';
    }
});

// Ensure virtuals are included when converting to JSON
itemSchema.set('toJSON', { virtuals: true });
itemSchema.set('toObject', { virtuals: true });

// Method to decrease stock
itemSchema.methods.decreaseStock = async function(quantity) {
    if (this.stock < quantity) {
        throw new Error(`Insufficient stock. Available: ${this.stock}, Requested: ${quantity}`);
    }
    this.stock -= quantity;
    return await this.save();
};

// Method to increase stock
itemSchema.methods.increaseStock = async function(quantity) {
    this.stock += quantity;
    return await this.save();
};

// Method to check stock availability
itemSchema.methods.checkStockAvailability = function(quantity) {
    return this.stock >= quantity;
};

// Static method to get low stock items
itemSchema.statics.getLowStockItems = async function() {
    return await this.find({
        $expr: { $lte: ['$stock', '$lowStockThreshold'] }
    }).sort({ stock: 1 });
};

module.exports = mongoose.model("Item", itemSchema)