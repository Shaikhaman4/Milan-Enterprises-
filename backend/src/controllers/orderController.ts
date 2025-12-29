import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Create new order
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { shippingAddress, billingAddress, paymentMethod, items, couponCode } = req.body;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
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

    // Calculate shipping (free over $50)
    const shipping = subtotal >= 50 ? 0 : 5.99;

    // Apply coupon if provided
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      });

      if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
        if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * parseFloat(coupon.value.toString())) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, parseFloat(coupon.maxDiscount.toString()));
          }
        } else if (coupon.type === 'FIXED_AMOUNT') {
          discount = parseFloat(coupon.value.toString());
        } else if (coupon.type === 'FREE_SHIPPING') {
          discount = shipping;
        }
      }
    }

    // Calculate tax (8%)
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal + shipping + tax - discount;

    // Generate order number
    const orderNumber = `CC-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Create shipping address
    const shippingAddr = await prisma.address.create({
      data: {
        userId: req.user!.id,
        type: 'shipping',
        ...shippingAddress,
      },
    });

    // Create billing address if different
    let billingAddr = shippingAddr;
    if (billingAddress && billingAddress !== shippingAddress) {
      billingAddr = await prisma.address.create({
        data: {
          userId: req.user!.id,
          type: 'billing',
          ...billingAddress,
        },
      });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,
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

    // Update product stock quantities
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Update coupon usage if applied
    if (couponCode && discount > 0) {
      await prisma.coupon.update({
        where: { code: couponCode },
        data: {
          usedCount: { increment: 1 },
        },
      });

      await prisma.orderCoupon.create({
        data: {
          orderId: order.id,
          couponId: (await prisma.coupon.findUnique({ where: { code: couponCode } }))!.id,
          discount,
        },
      });
    }

    // Clear user's cart
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id },
    });

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
    });
  }
};

// Get user's orders
export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = { userId: req.user!.id };
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
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
        take: parseInt(limit as string),
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    });
  }
};

// Get order by ID
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user!.id,
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
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
    });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const updateData: any = { status };

    if (status === 'SHIPPED' && trackingNumber) {
      updateData.trackingNumber = trackingNumber;
      updateData.shippedAt = new Date();
    }

    if (status === 'DELIVERED') {
      updateData.deliveredAt = new Date();
    }

    const order = await prisma.order.update({
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
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
    });
  }
};

// Cancel order
export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user!.id,
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

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    // Restore product stock
    for (const item of order.items) {
      await prisma.product.update({
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
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
    });
  }
};