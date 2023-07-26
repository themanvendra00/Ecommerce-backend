const express = require('express');
const { getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProduct);
router.get('/:categoryId', getProductsByCategory);
router.get('/productdetail/:productId', getProductById);
router.post('/create', addProduct);
router.patch('/update/:id', updateProduct);
router.delete('/remove/:id', deleteProduct);

module.exports = router;
