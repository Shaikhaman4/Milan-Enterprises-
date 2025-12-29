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
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
const createCategoryValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Category name is required'),
    (0, express_validator_1.body)('slug').notEmpty().withMessage('Category slug is required'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('parentId').optional().isUUID().withMessage('Invalid parent category ID'),
];
const updateCategoryValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Invalid category ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Category name cannot be empty'),
    (0, express_validator_1.body)('slug').optional().notEmpty().withMessage('Category slug cannot be empty'),
    (0, express_validator_1.body)('description').optional().isString(),
    (0, express_validator_1.body)('parentId').optional().isUUID().withMessage('Invalid parent category ID'),
];
router.get('/', categoryController_1.getCategories);
router.get('/:id', categoryController_1.getCategoryById);
router.get('/:id/products', categoryController_1.getCategoryProducts);
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), upload_1.uploadCategoryImage.single('image'), (0, validation_1.validate)(createCategoryValidation), categoryController_1.createCategory);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), upload_1.uploadCategoryImage.single('image'), (0, validation_1.validate)(updateCategoryValidation), categoryController_1.updateCategory);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.js.map