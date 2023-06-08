require('./mongo')
require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const Product = require('./models/Product')


app.use(cors())
app.use(express.json());
const PORT = process.env.PORT



app.get('/', (req, res) => {
    res.send('<h1>Products</h1>');
});

app.get('/api/products', (req, res) => {
    Product.find({})
    .then(products => {
        res.json(products)
    })
});

app.get('/api/products/:id', (req, res) => {
    const product_id = Number(req.params.id)
    const product = PRODUCTS.find(product => product.id === product_id);

    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
})

app.post('/api/products', (req, res) => {
    const { name, price, description } = req.body;
    const ids = PRODUCTS.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = {
        "id": maxId + 1,
        "name": name,
        "price": price,
        "description": description
    }

    PRODUCTS = [...PRODUCTS, newProduct];
    res.json(PRODUCTS)
})

app.delete('/api/products/:id', (req, res) => {
    const product_id = Number(req.params.id)
    PRODUCTS = PRODUCTS.filter(product => product.id !== product_id)
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});