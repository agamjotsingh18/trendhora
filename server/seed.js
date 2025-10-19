require('dotenv').config(); // Loads .env variables into process.env
const mongoose = require("mongoose");
const Item = require("./models/Item");
const seedProducts = require("./itemsCollection_cleaned");

// MONGO_URI should now be correctly loaded from your .env file
const MONGO_URI = process.env.MONGO_URI;

async function seedDB() {
  try {
    // Check if MONGO_URI is loaded correctly
    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI is not defined. Make sure it's set in your .env file.");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully..."); // Added connection confirmation

    console.log("Deleting existing items...");
    await Item.deleteMany();
    console.log("Existing items deleted.");

    console.log("Inserting new items...");
    await Item.insertMany(seedProducts);
    console.log("✅ Seeded successfully!");

  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    // Ensure disconnection happens only after a successful connection attempt
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Database connection closed.");
    }
  }
}

seedDB();