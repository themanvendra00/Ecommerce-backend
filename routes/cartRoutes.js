const express = require("express");
const {
  addToCart,
  viewCart,
  updateCartItemQuantity,
  removeFromCart,
} = require("../controllers/cartController");
const {authenticateToken} = require('../middleware/authMiddleware')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: ID of the product to add to the cart
 *         quantity:
 *           type: number
 *           description: Quantity of the product to add to the cart
 *       example:
 *         productId: 6150eb47c26a2753a8cf07b2
 *         quantity: 2
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: View the items in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal server error
 */


router.get("/",authenticateToken, viewCart);

/**
 * @swagger
 * /cart/addtocart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal server error
 */
router.post("/addtocart",authenticateToken, addToCart);

/**
 * @swagger
 * /cart/updatecart:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Internal server error
 */

router.post("/updatecart",authenticateToken, updateCartItemQuantity);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Internal server error
 */
router.post("/removecart",authenticateToken, removeFromCart);

module.exports = router;
