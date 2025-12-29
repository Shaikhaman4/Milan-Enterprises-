"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
const createOrderValidation = [
    (0, express_validator_1.body)('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    (0, express_validator_1.body)('paymentMethod').notEmpty().withMessage('Payment method is required'),
    (0, express_validator_1.body)('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
];
const updateOrderStatusValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Valid order ID is required'),
    (0, express_validator_1.body)('status').isIn(['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).withMessage('Invalid status'),
];
router.use(auth_1.authenticate);
router.post('/', (0, validation_1.validate)(createOrderValidation), orderController_1.createOrder);
router.get('/', orderController_1.getOrders);
router.get('/:id', orderController_1.getOrderById);
router.put('/:id/cancel', orderController_1.cancelOrder);
router.put('/:id/status', (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), (0, validation_1.validate)(updateOrderStatusValidation), orderController_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=orders.js.map