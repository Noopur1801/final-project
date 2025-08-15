const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must be at most 5"],
    default: 4,
  },
  images: {
    type: String,
    required: [true, "Please provide product images"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    enum: {
      values: ["men", "women", "kids"],
      message: "Category must be either men, women, or kids",
    },
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
