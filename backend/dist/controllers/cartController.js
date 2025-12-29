"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const database_1 = __importDefault(require("../config/database"));
const getCart = async (req, res) => {
    try {
        const cartItems = await database_1.default.cartItem.findMany({
            where: { userId: req.user.id },
            include: {
                product: {
                    include: {
                        images: {
                            where: { isMain: true },
                            take: 1,
                        },
                        category: true,
                    },
                },
            },
            orderBy: { id: 'desc' },
        });
        const subtotal = cartItems.reduce((total, item) => {
            return total + (parseFloat(item.product.price.toString()) * item.quantity);
        }, 0);
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        res.json({
            success: true,
            data: {
                items: cartItems,
                summary: {
                    subtotal: Math.round(subtotal * 100) / 100,
                    totalItems,
                    itemCount: cartItems.length,
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
        });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const { productId, quantity, variant } = req.body;
        const product = await database_1.default.product.findUnique({
            where: { id: productId, isActive: true },
        });
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        if (product.stockQuantity < quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient stock available',
            });
            return;
        }
        const existingCartItem = await database_1.default.cartItem.findUnique({
            where: {
                userId_productId_variant: {
                    userId: req.user.id,
                    productId,
                    variant: variant || '',
                },
            },
        });
        let cartItem;
        if (existingCartItem) {
            const newQuantity = existingCartItem.quantity + quantity;
            if (product.stockQuantity < newQuantity) {
                res.status(400).json({
                    success: false,
                    message: 'Insufficient stock available',
                });
                return;
            }
            cartItem = await database_1.default.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: newQuantity },
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
            });
        }
        else {
            cartItem = await database_1.default.cartItem.create({
                data: {
                    userId: req.user.id,
                    productId,
                    quantity,
                    variant,
                },
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
            });
        }
        res.status(201).json({
            success: true,
            data: cartItem,
            message: 'Item added to cart successfully',
        });
    }
    catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding item to cart',
        });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const cartItem = await database_1.default.cartItem.findFirst({
            where: {
                id: itemId,
                userId: req.user.id,
            },
            include: { product: true },
        });
        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: 'Cart item not found',
            });
            return;
        }
        if (cartItem.product.stockQuantity < quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient stock available',
            });
            return;
        }
        const updatedCartItem = await database_1.default.cartItem.update({
            where: { id: itemId },
            data: { quantity },
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
        });
        res.json({
            success: true,
            data: updatedCartItem,
            message: 'Cart item updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item',
        });
    }
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cartItem = await database_1.default.cartItem.findFirst({
            where: {
                id: itemId,
                userId: req.user.id,
            },
        });
        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: 'Cart item not found',
            });
            return;
        }
        await database_1.default.cartItem.delete({
            where: { id: itemId },
        });
        res.json({
            success: true,
            message: 'Item removed from cart successfully',
        });
    }
    catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing item from cart',
        });
    }
};
exports.removeFromCart = removeFromCart;
const clearCart = async (req, res) => {
    try {
        await database_1.default.cartItem.deleteMany({
            where: { userId: req.user.id },
        });
        res.json({
            success: true,
            message: 'Cart cleared successfully',
        });
    }
    catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing cart',
        });
    }
};
exports.clearCart = clearCart;
//# sourceMappingURL=cartController.js.map