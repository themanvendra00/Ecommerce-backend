const User = require('../models/user');
const Order = require('../models/order');

const getOrderDetails = async (req, res) => {
  const userId = req.userId;
  const { orderId } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: 'orders',
      populate: {
        path: 'items.productId',
        select: 'title price',
      },
    });

    const order = user.orders.find((order) => order._id.equals(orderId));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const placeOrder = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate('cart.productId');

    const orderItems = user.cart.map((cartItem) => ({
      productId: cartItem.productId._id,
      quantity: cartItem.quantity,
      price: cartItem.productId.price,
    }));

    const order = await Order.create({ userId, items: orderItems });
    user.cart = [];
    await user.save();
    res.json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate({
      path: 'orders',
      populate: {
        path: 'items.productId',
        select: 'title price',
      },
    });
    res.json(user.orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getOrderDetails, placeOrder, getOrderHistory };
