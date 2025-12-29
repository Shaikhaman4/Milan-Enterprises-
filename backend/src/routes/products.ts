import express from 'express';
import { body, param, query } from 'express-validator';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { uploadProductImage } from '../config/upload';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts,
  getRelatedProducts,
} from '../controllers/productController';

const router = express.Router();

// Validation rules
const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('slug').notEmpty().withMessage('Product slug is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('categoryId').isUUID().withMessage('Valid category ID is required'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('stockQuantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
];

const updateProductValidation = [
  param('id').isUUID().withMessage('Invalid product ID'),
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('slug').optional().notEmpty().withMessage('Product slug cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('categoryId').optional().isUUID().withMessage('Valid category ID is required'),
  body('stockQuantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be non-negative'),
];

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', optionalAuth, getProductById);
router.get('/slug/:slug', optionalAuth, getProductBySlug);
router.get('/:id/related', getRelatedProducts);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadProductImage.array('images', 5),
  validate(createProductValidation),
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadProductImage.array('images', 5),
  validate(updateProductValidation),
  updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  deleteProduct
);

export default router;