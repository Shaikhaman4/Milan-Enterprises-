import express from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController';

const router = express.Router();

// Validation rules
const createOrderValidation = [
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
];

const updateOrderStatusValidation = [
  param('id').isUUID().withMessage('Valid order ID is required'),
  body('status').isIn(['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).withMessage('Invalid status'),
];

// All routes require authentication
router.use(authenticate);

// Customer routes
router.post('/', validate(createOrderValidation), createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.put('/:id/status', authorize('ADMIN', 'SUPER_ADMIN'), validate(updateOrderStatusValidation), updateOrderStatus);

export default router;