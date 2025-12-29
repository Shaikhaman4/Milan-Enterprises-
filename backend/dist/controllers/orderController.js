"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const uuid_1 = require("uuid");
const database_1 = __importDefault(require("../config/database"));
const createOrder = async (req, res) => {
    try {
        const { shippingAddress, billingAddress, paymentMethod, items, couponCode } = req.body;
        let subtotal = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await database_1.default.product.findUnique({
                where: { id: item.productId, isActive: true },
            });
            if (!product) {
                res.status(400).json({
                    success: false,
                    message: `Product ${item.productId} not found`,
                });
                return;
            }
            if (product.stockQuantity < item.quantity) {
                res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.name}`,
                });
                return;
            }
            const itemTotal = parseFloat(product.price.toString()) * item.quantity;
            subtotal += itemTotal;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
                variant: item.variant,
            });
        }
        const shipping = subtotal >= 50 ? 0 : 5.99;
        let discount = 0;
        if (couponCode) {
            const coupon = await database_1.default.coupon.findUnique({
                where: { code: couponCode, isActive: true },
            });
            if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
                if (coupon.type === 'PERCENTAGE') {
                    discount = (subtotal * parseFloat(coupon.value.toString())) / 100;
                    if (coupon.maxDiscount) {
                        discount = Math.min(discount, parseFloat(coupon.maxDiscount.toString()));
                    }
                }
                else if (coupon.type === 'FIXED_AMOUNT') {
                    discount = parseFloat(coupon.value.toString());
                }
                else if (coupon.type === 'FREE_SHIPPING') {
                    discount = shipping;
                }
            }
        }
        const tax = (subtotal - discount) * 0.08;
        const total = subtotal + shipping + tax - discount;
        const orderNumber = `CC-${Date.now()}-${(0, uuid_1.v4)().slice(0, 8).toUpperCase()}`;
        const shippingAddr = await database_1.default.address.create({
            data: {
                userId: req.user.id,
                type: 'shipping',
                ...shippingAddress,
            },
        });
        let billingAddr = shippingAddr;
        if (billingAddress && billingAddress !== shippingAddress) {
            billingAddr = await database_1.default.address.create({
                data: {
                    userId: req.user.id,
                    type: 'billing',
                    ...billingAddress,
                },
            });
        }
        const order = await database_1.default.order.create({
            data: {
                userId: req.user.id,
                orderNumber,
                subtotal,
                tax,
                shipping,
                discount,
                total,
                paymentMethod,
                shippingAddressId: shippingAddr.id,
                billingAddressId: billingAddr.id,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: {
                                    where: { isMain: true },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                shippingAddress: true,
            },
        });
        for (const item of items) {
            await database_1.default.product.update({
                where: { id: item.productId },
                data: {
                    stockQuantity: {
                        decrement: item.quantity,
                    },
                },
            });
        }
        if (couponCode && discount > 0) {
            await database_1.default.coupon.update({
                where: { code: couponCode },
                data: {
                    usedCount: { increment: 1 },
                },
            });
            await database_1.default.orderCoupon.create({
                data: {
                    orderId: order.id,
                    couponId: (await database_1.default.coupon.findUnique({ where: { code: couponCode } })).id,
                    discount,
                },
            });
        }
        await database_1.default.cartItem.deleteMany({
            where: { userId: req.user.id },
        });
        res.status(201).json({
            success: true,
            data: order,
            message: 'Order created successfully',
        });
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
        });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const where = { userId: req.user.id };
        if (status) {
            where.status = status;
        }
        const [orders, total] = await Promise.all([
            database_1.default.order.findMany({
                where,
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: {
                                        where: { isMain: true },
                                        take: 1,
                                    },
                                },
                            },
                        },
                    },
                    shippingAddress: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: parseInt(limit),
            }),
            database_1.default.order.count({ where }),
        ]);
        res.json({
            success: true,
            data: {
                orders,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
        });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await database_1.default.order.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: {
                                    where: { isMain: true },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                shippingAddress: true,
                coupons: {
                    include: {
                        coupon: true,
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }
        res.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
        });
    }
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, trackingNumber } = req.body;
        const updateData = { status };
        if (status === 'SHIPPED' && trackingNumber) {
            updateData.trackingNumber = trackingNumber;
            updateData.shippedAt = new Date();
        }
        if (status === 'DELIVERED') {
            updateData.deliveredAt = new Date();
        }
        const order = await database_1.default.order.update({
            where: { id },
            data: updateData,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        res.json({
            success: true,
            data: order,
            message: 'Order status updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status',
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await database_1.default.order.findFirst({
            where: {
                id,
                userId: req.user.id,
            },
            include: {
                items: true,
            },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
            return;
        }
        if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
            res.status(400).json({
                success: false,
                message: 'Order cannot be cancelled at this stage',
            });
            return;
        }
        const updatedOrder = await database_1.default.order.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
        for (const item of order.items) {
            await database_1.default.product.update({
                where: { id: item.productId },
                data: {
                    stockQuantity: {
                        increment: item.quantity,
                    },
                },
            });
        }
        res.json({
            success: true,
            data: updatedOrder,
            message: 'Order cancelled successfully',
        });
    }
    catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
        });
    }
};
exports.cancelOrder = cancelOrder;
//# sourceMappingURL=orderController.js.map