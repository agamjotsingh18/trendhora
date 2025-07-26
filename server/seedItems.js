const mongoose = require('mongoose');
const Item = require('./models/Item');
const itemsCollection = require('./itemsCollection');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trendhora';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Item.deleteMany({});
    await Item.insertMany(itemsCollection);
    console.log('Database seeded!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }); 