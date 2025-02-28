// Importing necessary libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize dotenv
dotenv.config();

// Create the Express app
const app = express();

// Use CORS to allow cross-origin requests (from React frontend)
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Define a Schema and Model for Products
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  imageUrl: String,
  description: String, // Add additional fields as needed
});

const Product = mongoose.model("Product", productSchema);

// Route to get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products); // Send products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Route to get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    // Fetch the product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product); // Send product as JSON response
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// Root route for the server
app.get("/", (req, res) => {
  res.send("Welcome to the Snail E-Commerce API!");
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
