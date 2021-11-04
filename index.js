const express = require("express");
const app = express();
const expressPort = 3000;
const mongoPort = 27017;
const path = require("path");
const methodOverride = require("method-override");
const Product = require("./models/product");
const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:${mongoPort}/firstCrud`)
  .then(() => {
    console.log("Mongoose port open");
  })
  .catch((err) => {
    console.log("Mongo Error");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// Create a new Product
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(req.body);
  res.redirect("/products");
});

// Get by ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/showId", { product });
});

// Update Product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// Delete Product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(expressPort, () => {
  console.log("Port: 3000 Active");
});
