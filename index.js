require("./mongo");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const Product = require("./models/Product");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Products</h1>");
});

app.get("/api/products", (req, res) => {
  Product.find({}).then((products) => {
    res.json(products);
  });
});

app.get("/api/products/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;

  const product = new Product({
    name: name,
    price: price,
    description: description,
  });

  product.save().then((savedProduct) => {
    res.json(savedProduct);
  });
});

app.put("/api/products/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = {
    name: name,
    price: price,
    description: description,
  };

  Product.findByIdAndUpdate(id, product, { new: true })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => next(err));
});

app.delete("/api/products/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.use((error, request, response, next) => {
  if (error.name === "CastError") {
    response.status(400).send({ error: "id used is malformed" });
  } else {
    response.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
