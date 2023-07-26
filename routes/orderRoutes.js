const express = require('express');
const { placeOrder, getOrderHistory, getOrderDetails } = require('../controllers/orderController');
const {authenticateToken} = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/:orderId',authenticateToken, getOrderDetails)
router.post('/place',authenticateToken, placeOrder);
router.get('/history',authenticateToken, getOrderHistory)

module.exports = router;