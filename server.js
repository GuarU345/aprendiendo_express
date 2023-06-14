require("./mongo");
require("dotenv").config();

const express = require("express");
const app = express()
const cors = require("cors");
const routes = require('./routes/routes')
const ProductController = require("./controllers/ProductController");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use('/',routes)

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
