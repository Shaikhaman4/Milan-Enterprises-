"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const upload_1 = require("../config/upload");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
const createProductValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Product name is required'),
    (0, express_validator_1.body)('slug').notEmpty().withMessage('Product slug is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Product description is required'),
    (0, express_validator_1.body)('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('categoryId').isUUID().withMessage('Valid category ID is required'),
    (0, express_validator_1.body)('sku').notEmpty().withMessage('SKU is required'),
    (0, express_validator_1.body)('stockQuantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
];
const updateProductValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Invalid product ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    (0, express_validator_1.body)('slug').optional().notEmpty().withMessage('Product slug cannot be empty'),
    (0, express_validator_1.body)('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('categoryId').optional().isUUID().withMessage('Valid category ID is required'),
    (0, express_validator_1.body)('stockQuantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be non-negative'),
];
router.get('/', auth_1.optionalAuth, productController_1.getProducts);
router.get('/search', productController_1.searchProducts);
router.get('/featured', productController_1.getFeaturedProducts);
router.get('/:id', auth_1.optionalAuth, productController_1.getProductById);
router.get('/slug/:slug', auth_1.optionalAuth, productController_1.getProductBySlug);
router.get('/:id/related', productController_1.getRelatedProducts);
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), upload_1.uploadProductImage.array('images', 5), (0, validation_1.validate)(createProductValidation), productController_1.createProduct);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), upload_1.uploadProductImage.array('images', 5), (0, validation_1.validate)(updateProductValidation), productController_1.updateProduct);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.js.map