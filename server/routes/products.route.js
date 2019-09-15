const express = require("express");
const router = express.Router();

const ProductController = require('../controllers/products.controller.js');

router.post('/',ProductController.addProduct);
router.get('/',ProductController.listProducts);
router.get('/:id',ProductController.productDetails);
router.put('/:id',ProductController.updateProduct);
router.delete('/:id',ProductController.deleteProduct);

module.exports = router