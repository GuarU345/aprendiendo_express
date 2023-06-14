const Product = require("../models/Product");

const getProducts = (req,res,next) => {
    Product.find({}).then((products) => {
        res.json(products);
    });
}

const getProductById = (req,res,next) => {
    const { id } = req.params;
    Product.findById(id)
      .then((result) => {
        res.json(result);
      })
      .catch(next);
}

const createProduct = (req,res) => {
    const { name, price, description } = req.body;
  
    const product = new Product({
      name: name,
      price: price,
      description: description,
    });
  
    product.save().then((savedProduct) => {
      res.json(savedProduct);
    });
}
const updateProduct = (req,res,next) => {
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
      .catch(next);
}

const deleteProduct = (req,res,next) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
      .then((result) => {
        res.status(204).end();
      })
      .catch(next);
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}