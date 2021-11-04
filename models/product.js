const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
  img: {
    type: String,
  },
  details: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
