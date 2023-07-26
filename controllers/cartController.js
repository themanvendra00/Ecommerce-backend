const User = require('../models/user');
const Product = require('../models/product');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const viewCart = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate('cart.productId');
    res.json(user.cart);
  } catch (error) {
    console.error('Error viewing cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();
    res.json({ message: 'Cart item quantity updated successfully' });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    const index = user.cart.findIndex((item) => item.productId.equals(productId));
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    user.cart.splice(index, 1);

    await user.save();
    res.json({ message: 'Product removed from cart successfully' });
  } catch (err) {
    console.error('Error removing product from cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart, viewCart, updateCartItemQuantity, removeFromCart };
