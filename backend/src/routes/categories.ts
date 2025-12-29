import express from 'express';
import { body, param, query } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { uploadCategoryImage } from '../config/upload';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
} from '../controllers/categoryController';

const router = express.Router();

// Validation rules
const createCategoryValidation = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('slug').notEmpty().withMessage('Category slug is required'),
  body('description').optional().isString(),
  body('parentId').optional().isUUID().withMessage('Invalid parent category ID'),
];

const updateCategoryValidation = [
  param('id').isUUID().withMessage('Invalid category ID'),
  body('name').optional().notEmpty().withMessage('Category name cannot be empty'),
  body('slug').optional().notEmpty().withMessage('Category slug cannot be empty'),
  body('description').optional().isString(),
  body('parentId').optional().isUUID().withMessage('Invalid parent category ID'),
];

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/products', getCategoryProducts);

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadCategoryImage.single('image'),
  validate(createCategoryValidation),
  createCategory
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadCategoryImage.single('image'),
  validate(updateCategoryValidation),
  updateCategory
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  deleteCategory
);

export default router;