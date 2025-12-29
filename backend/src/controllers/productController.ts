import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { getFileUrl } from '../config/upload';

// Get all products with filtering and pagination
export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      isEcoFriendly,
      isFeatured,
      inStock = true,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    if (isEcoFriendly === 'true') {
      where.isEcoFriendly = true;
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    if (inStock === 'true') {
      where.stockQuantity = { gt: 0 };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { description: { contains: search as string } },
        { tags: { contains: search as string } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
          reviews: {
            select: { rating: true },
          },
          ...(req.user && {
            wishlistItems: {
              where: { userId: req.user.id },
              select: { id: true },
            },
          }),
        },
        orderBy: { [sortBy as string]: sortOrder },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average ratings and format response
    const productsWithRatings = products.map(product => {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      
      return {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        isWishlisted: req.user ? product.wishlistItems.length > 0 : false,
        reviews: undefined,
        wishlistItems: undefined,
      };
    });

    res.json({
      success: true,
      data: {
        products: productsWithRatings,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
    });
  }
};

// Get product by ID
export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id, isActive: true },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        variants: true,
        reviews: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        ...(req.user && {
          wishlistItems: {
            where: { userId: req.user.id },
            select: { id: true },
          },
        }),
      },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

    const productWithRating = {
      ...product,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length,
      isWishlisted: req.user ? product.wishlistItems.length > 0 : false,
      wishlistItems: undefined,
    };

    res.json({
      success: true,
      data: productWithRating,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
    });
  }
};

// Get product by slug
export const getProductBySlug = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug, isActive: true },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        variants: true,
        reviews: {
          include: {
            user: {
              select: { firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        ...(req.user && {
          wishlistItems: {
            where: { userId: req.user.id },
            select: { id: true },
          },
        }),
      },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Calculate average rating
    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

    const productWithRating = {
      ...product,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: product.reviews.length,
      isWishlisted: req.user ? product.wishlistItems.length > 0 : false,
      wishlistItems: undefined,
    };

    res.json({
      success: true,
      data: productWithRating,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
    });
  }
};

// Create new product
export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      originalPrice,
      sku,
      barcode,
      weight,
      dimensions,
      categoryId,
      brand,
      isEcoFriendly = false,
      ecoScore = 0,
      effectiveness = 0,
      stockQuantity,
      lowStockThreshold = 10,
      tags = [],
      features = [],
      ingredients = [],
      instructions,
      warnings,
      fragrance,
      size,
      metaTitle,
      metaDescription,
    } = req.body;

    const images = req.files as Express.Multer.File[];

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      res.status(400).json({
        success: false,
        message: 'Product slug already exists',
      });
      return;
    }

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingSku) {
      res.status(400).json({
        success: false,
        message: 'SKU already exists',
      });
      return;
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        sku,
        barcode,
        weight: weight ? parseFloat(weight) : null,
        dimensions,
        categoryId,
        brand,
        isEcoFriendly: isEcoFriendly === 'true',
        ecoScore: parseInt(ecoScore),
        effectiveness: parseInt(effectiveness),
        stockQuantity: parseInt(stockQuantity),
        lowStockThreshold: parseInt(lowStockThreshold),
        tags: Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([tags].filter(Boolean)),
        features: Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([features].filter(Boolean)),
        ingredients: Array.isArray(ingredients) ? JSON.stringify(ingredients) : JSON.stringify([ingredients].filter(Boolean)),
        instructions,
        warnings,
        fragrance,
        size,
        metaTitle,
        metaDescription,
      },
      include: {
        category: true,
      },
    });

    // Create product images
    if (images && images.length > 0) {
      const imageData = images.map((image, index) => ({
        productId: product.id,
        url: getFileUrl(image.filename, 'products'),
        altText: `${product.name} - Image ${index + 1}`,
        sortOrder: index,
        isMain: index === 0,
      }));

      await prisma.productImage.createMany({
        data: imageData,
      });
    }

    // Fetch complete product with images
    const completeProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      data: completeProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
    });
  }
};

// Update product
export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const images = req.files as Express.Multer.File[];

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Convert string values to appropriate types
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
    if (updateData.weight) updateData.weight = parseFloat(updateData.weight);
    if (updateData.ecoScore) updateData.ecoScore = parseInt(updateData.ecoScore);
    if (updateData.effectiveness) updateData.effectiveness = parseInt(updateData.effectiveness);
    if (updateData.stockQuantity) updateData.stockQuantity = parseInt(updateData.stockQuantity);
    if (updateData.lowStockThreshold) updateData.lowStockThreshold = parseInt(updateData.lowStockThreshold);
    if (updateData.isEcoFriendly) updateData.isEcoFriendly = updateData.isEcoFriendly === 'true';

    // Handle arrays - convert to JSON strings for SQLite
    if (updateData.tags && !Array.isArray(updateData.tags)) {
      updateData.tags = JSON.stringify([updateData.tags].filter(Boolean));
    } else if (Array.isArray(updateData.tags)) {
      updateData.tags = JSON.stringify(updateData.tags);
    }
    if (updateData.features && !Array.isArray(updateData.features)) {
      updateData.features = JSON.stringify([updateData.features].filter(Boolean));
    } else if (Array.isArray(updateData.features)) {
      updateData.features = JSON.stringify(updateData.features);
    }
    if (updateData.ingredients && !Array.isArray(updateData.ingredients)) {
      updateData.ingredients = JSON.stringify([updateData.ingredients].filter(Boolean));
    } else if (Array.isArray(updateData.ingredients)) {
      updateData.ingredients = JSON.stringify(updateData.ingredients);
    }

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
      },
    });

    // Add new images if provided
    if (images && images.length > 0) {
      const existingImagesCount = await prisma.productImage.count({
        where: { productId: id },
      });

      const imageData = images.map((image, index) => ({
        productId: id,
        url: getFileUrl(image.filename, 'products'),
        altText: `${product.name} - Image ${existingImagesCount + index + 1}`,
        sortOrder: existingImagesCount + index,
        isMain: existingImagesCount === 0 && index === 0,
      }));

      await prisma.productImage.createMany({
        data: imageData,
      });
    }

    // Fetch updated product with images
    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
      },
    });

    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
    });
  }
};

// Delete product
export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    // Soft delete - set isActive to false
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
    });
  }
};

// Search products
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
      return;
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q as string } },
          { description: { contains: q as string } },
          { tags: { contains: q as string } },
        ],
      },
      include: {
        images: {
          where: { isMain: true },
          take: 1,
        },
        category: true,
      },
      take: parseInt(limit as string),
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products',
    });
  }
};

// Get featured products
export const getFeaturedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 8 } = req.query;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        images: {
          where: { isMain: true },
          take: 1,
        },
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    // Calculate average ratings
    const productsWithRatings = products.map(product => {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      
      return {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        reviews: undefined,
      };
    });

    res.json({
      success: true,
      data: productsWithRatings,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
    });
  }
};

// Get related products
export const getRelatedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;

    // Get the current product to find related products
    const currentProduct = await prisma.product.findUnique({
      where: { id },
      select: { categoryId: true, tags: true },
    });

    if (!currentProduct) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        id: { not: id },
        OR: [
          { categoryId: currentProduct.categoryId },
          { tags: { contains: currentProduct.tags || '' } },
        ],
      },
      include: {
        images: {
          where: { isMain: true },
          take: 1,
        },
        category: true,
        reviews: {
          select: { rating: true },
        },
      },
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    // Calculate average ratings
    const productsWithRatings = products.map(product => {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      
      return {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        reviews: undefined,
      };
    });

    res.json({
      success: true,
      data: productsWithRatings,
    });
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching related products',
    });
  }
};