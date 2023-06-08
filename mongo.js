require('dotenv').config()
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_DB_URI

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err);
  });



// Product.find({}).then(result => {
//     console.log(result)
// })

// const product = new Product({
//     name: "Product 1",
//     price: 100,
//     description: "This is a product 1"
// })

// product.save().then((result) => {
//     console.log(result)
//     mongoose.connection.close()
// })
// .catch((err) => {
//     console.log(err)
// })

