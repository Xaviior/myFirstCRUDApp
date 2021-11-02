const mongoose = require("mongoose");
const mongoPort = 27017;
const Product = require("./models/product");
mongoose
  .connect(`mongodb://localhost:${mongoPort}/firstCrud`)
  .then(() => {
    console.log("Mongoose port open");
  })
  .catch((err) => {
    console.log("Mongo Error");
    console.log(err);
  });

/* const p = new Product({
  name: "Ruby Grapefruit",
  price: 1.99,
  category: "fruite",
});

p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(e);
  }); */
