"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
const addToCartValidation = [
    (0, express_validator_1.body)('productId').isUUID().withMessage('Valid product ID is required'),
    (0, express_validator_1.body)('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    (0, express_validator_1.body)('variant').optional().isString(),
];
const updateCartValidation = [
    (0, express_validator_1.param)('itemId').isUUID().withMessage('Valid item ID is required'),
    (0, express_validator_1.body)('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];
router.use(auth_1.authenticate);
router.get('/', cartController_1.getCart);
router.post('/add', (0, validation_1.validate)(addToCartValidation), cartController_1.addToCart);
router.put('/item/:itemId', (0, validation_1.validate)(updateCartValidation), cartController_1.updateCartItem);
router.delete('/item/:itemId', cartController_1.removeFromCart);
router.delete('/clear', cartController_1.clearCart);
exports.default = router;
//# sourceMappingURL=cart.js.map