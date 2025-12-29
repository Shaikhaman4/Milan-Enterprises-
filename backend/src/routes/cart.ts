import express from 'express';
import { body, param } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController';

const router = express.Router();

// Validation rules
const addToCartValidation = [
  body('productId').isUUID().withMessage('Valid product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('variant').optional().isString(),
];

const updateCartValidation = [
  param('itemId').isUUID().withMessage('Valid item ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

// All cart routes require authentication
router.use(authenticate);

router.get('/', getCart);
router.post('/add', validate(addToCartValidation), addToCart);
router.put('/item/:itemId', validate(updateCartValidation), updateCartItem);
router.delete('/item/:itemId', removeFromCart);
router.delete('/clear', clearCart);

export default router;