const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  alt: { type: String, default: "Product Image" },
  description: { type: String, required: true }, // Detailed description
  specifications: {
    size: { type: String },
    material: { type: String },
    type: { type: String },
    weight: { type: String },
  }, // Product specifications as a sub-document
  additionalImages: [{ type: String }], // Array of image URLs
  reviews: [
    {
      user: { type: String },
      rating: { type: Number },
      comment: { type: String },
    },
  ], // Array of review objects
  inStock: { type: Boolean, default: true }, // Stock availability
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
