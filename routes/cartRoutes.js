const express = require("express");
const {
  addToCart,
  viewCart,
  updateCartItemQuantity,
  removeFromCart,
} = require("../controllers/cartController");
const {authenticateToken} = require('../middleware/authMiddleware')

const router = express.Router();

router.get("/",authenticateToken, viewCart);
router.post("/addtocart",authenticateToken, addToCart);
router.post("/updatecart",authenticateToken, updateCartItemQuantity);
router.post("/removecart",authenticateToken, removeFromCart);

module.exports = router;
