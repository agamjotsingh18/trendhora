const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

// Define routes
app.use("/api/items", require("./routes/items"));
app.use("/api/payment", require("./routes/payment"));

app.use("/api/auth", require("./routes/auth"));

// Add this line after other routes

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
