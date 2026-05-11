const express = require('express');

const router = express.Router();

const { authenticateJWT} = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/orderController');
router.post('/', authenticateJWT, createOrder);
router.get('/myorders', authenticateJWT, getUserOrders);
router.get('/', authenticateJWT, authorizeRoles('admin'), getAllOrders);
module.exports = router;