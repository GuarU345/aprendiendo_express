const express = require('express')

const router = express.Router()

const ProductController = require('../controllers/ProductController')

router.get('/api/products',ProductController.getProducts)
router.get('/api/products/:id',ProductController.getProductById)
router.post('/api/products',ProductController.createProduct)
router.put('/api/products/:id',ProductController.updateProduct)
router.delete('/api/products/:id',ProductController.deleteProduct)

module.exports = router