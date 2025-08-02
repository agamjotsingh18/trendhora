const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false); // Add this line
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trendhora");
        console.log("Mongo DB Connected: ", conn.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
