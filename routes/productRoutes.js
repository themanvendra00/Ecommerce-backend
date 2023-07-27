const express = require('express');
const { getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - description
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: Product title
 *         price:
 *           type: number
 *           description: Product price
 *         description:
 *           type: string
 *           description: Product description
 *         category:
 *           type: string
 *           description: Product category
 *       example:
 *         title: Smartphone
 *         price: 499.99
 *         description: A high-end smartphone with advanced features.
 *         category: Electronics
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/', getProduct);

/**
 * @swagger
 * /products/{categoryId}:
 *   get:
 *     summary: Get a list of products by category ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to filter products by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/:categoryId', getProductsByCategory);

/**
 * @swagger
 * /products/productdetail/:{productId}:
 *   get:
 *     summary: Get detailed information of a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get('/productdetail/:productId', getProductById);
router.post('/create', addProduct);
router.patch('/update/:id', updateProduct);
router.delete('/remove/:id', deleteProduct);

module.exports = router;
