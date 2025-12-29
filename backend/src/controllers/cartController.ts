import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Get user's cart
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
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

    // Calculate totals
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
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
    });
  }
};

// Add item to cart
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity, variant } = req.body;

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Check stock availability
    if (product.stockQuantity < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available',
      });
      return;
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId_variant: {
          userId: req.user!.id,
          productId,
          variant: variant || '',
        },
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if item exists
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (product.stockQuantity < newQuantity) {
        res.status(400).json({
          success: false,
          message: 'Insufficient stock available',
        });
        return;
      }

      cartItem = await prisma.cartItem.update({
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
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user!.id,
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
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId: req.user!.id,
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

    // Check stock availability
    if (cartItem.product.stockQuantity < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available',
      });
      return;
    }

    // Update cart item
    const updatedCartItem = await prisma.cartItem.update({
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
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { itemId } = req.params;

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        userId: req.user!.id,
      },
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
      return;
    }

    // Remove cart item
    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart',
    });
  }
};

// Clear entire cart
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id },
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
    });
  }
};