const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    alt: { type: String, default: "Product Image" },
    description: { type: String, required: true },
    specifications: {
      size: { type: String },
      material: { type: String },
      type: { type: String },
      weight: { type: String },
    },
    additionalImages: [{ type: String }],
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    inStock: { type: Boolean, default: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
