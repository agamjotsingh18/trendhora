const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Item = require("./models/Item");
const seedProducts = require("./itemsCollection_cleaned");

const MONGO_URI = process.env.MONGO_URI;

// const seedProducts = data.default;

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    await Item.deleteMany();
    await Item.insertMany(seedProducts);
    console.log("✅ Seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();
