"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedProducts = exports.getFeaturedProducts = exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProductById = exports.getProducts = void 0;
const database_1 = __importDefault(require("../config/database"));
const upload_1 = require("../config/upload");
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 12, category, minPrice, maxPrice, isEcoFriendly, isFeatured, inStock = true, sortBy = 'createdAt', sortOrder = 'desc', search, } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const where = {
            isActive: true,
        };
        if (category) {
            where.category = {
                slug: category,
            };
        }
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice)
                where.price.gte = parseFloat(minPrice);
            if (maxPrice)
                where.price.lte = parseFloat(maxPrice);
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
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { tags: { has: search } },
            ];
        }
        const [products, total] = await Promise.all([
            database_1.default.product.findMany({
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
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: parseInt(limit),
            }),
            database_1.default.product.count({ where }),
        ]);
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
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
        });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await database_1.default.product.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
        });
    }
};
exports.getProductById = getProductById;
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await database_1.default.product.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
        });
    }
};
exports.getProductBySlug = getProductBySlug;
const createProduct = async (req, res) => {
    try {
        const { name, slug, description, shortDescription, price, originalPrice, sku, barcode, weight, dimensions, categoryId, brand, isEcoFriendly = false, ecoScore = 0, effectiveness = 0, stockQuantity, lowStockThreshold = 10, tags = [], features = [], ingredients = [], instructions, warnings, fragrance, size, metaTitle, metaDescription, } = req.body;
        const images = req.files;
        const existingProduct = await database_1.default.product.findUnique({
            where: { slug },
        });
        if (existingProduct) {
            res.status(400).json({
                success: false,
                message: 'Product slug already exists',
            });
            return;
        }
        const existingSku = await database_1.default.product.findUnique({
            where: { sku },
        });
        if (existingSku) {
            res.status(400).json({
                success: false,
                message: 'SKU already exists',
            });
            return;
        }
        const product = await database_1.default.product.create({
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
                tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
                features: Array.isArray(features) ? features : [features].filter(Boolean),
                ingredients: Array.isArray(ingredients) ? ingredients : [ingredients].filter(Boolean),
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
        if (images && images.length > 0) {
            const imageData = images.map((image, index) => ({
                productId: product.id,
                url: (0, upload_1.getFileUrl)(image.filename, 'products'),
                altText: `${product.name} - Image ${index + 1}`,
                sortOrder: index,
                isMain: index === 0,
            }));
            await database_1.default.productImage.createMany({
                data: imageData,
            });
        }
        const completeProduct = await database_1.default.product.findUnique({
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
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
        });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const images = req.files;
        const existingProduct = await database_1.default.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        if (updateData.price)
            updateData.price = parseFloat(updateData.price);
        if (updateData.originalPrice)
            updateData.originalPrice = parseFloat(updateData.originalPrice);
        if (updateData.weight)
            updateData.weight = parseFloat(updateData.weight);
        if (updateData.ecoScore)
            updateData.ecoScore = parseInt(updateData.ecoScore);
        if (updateData.effectiveness)
            updateData.effectiveness = parseInt(updateData.effectiveness);
        if (updateData.stockQuantity)
            updateData.stockQuantity = parseInt(updateData.stockQuantity);
        if (updateData.lowStockThreshold)
            updateData.lowStockThreshold = parseInt(updateData.lowStockThreshold);
        if (updateData.isEcoFriendly)
            updateData.isEcoFriendly = updateData.isEcoFriendly === 'true';
        if (updateData.tags && !Array.isArray(updateData.tags)) {
            updateData.tags = [updateData.tags].filter(Boolean);
        }
        if (updateData.features && !Array.isArray(updateData.features)) {
            updateData.features = [updateData.features].filter(Boolean);
        }
        if (updateData.ingredients && !Array.isArray(updateData.ingredients)) {
            updateData.ingredients = [updateData.ingredients].filter(Boolean);
        }
        const product = await database_1.default.product.update({
            where: { id },
            data: updateData,
            include: {
                images: {
                    orderBy: { sortOrder: 'asc' },
                },
                category: true,
            },
        });
        if (images && images.length > 0) {
            const existingImagesCount = await database_1.default.productImage.count({
                where: { productId: id },
            });
            const imageData = images.map((image, index) => ({
                productId: id,
                url: (0, upload_1.getFileUrl)(image.filename, 'products'),
                altText: `${product.name} - Image ${existingImagesCount + index + 1}`,
                sortOrder: existingImagesCount + index,
                isMain: existingImagesCount === 0 && index === 0,
            }));
            await database_1.default.productImage.createMany({
                data: imageData,
            });
        }
        const updatedProduct = await database_1.default.product.findUnique({
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
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await database_1.default.product.findUnique({
            where: { id },
        });
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        await database_1.default.product.update({
            where: { id },
            data: { isActive: false },
        });
        res.json({
            success: true,
            message: 'Product deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
        });
    }
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        if (!q) {
            res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
            return;
        }
        const products = await database_1.default.product.findMany({
            where: {
                isActive: true,
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                    { tags: { has: q } },
                ],
            },
            include: {
                images: {
                    where: { isMain: true },
                    take: 1,
                },
                category: true,
            },
            take: parseInt(limit),
        });
        res.json({
            success: true,
            data: products,
        });
    }
    catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching products',
        });
    }
};
exports.searchProducts = searchProducts;
const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 8 } = req.query;
        const products = await database_1.default.product.findMany({
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
            take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
        });
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
    }
    catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured products',
        });
    }
};
exports.getFeaturedProducts = getFeaturedProducts;
const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit = 4 } = req.query;
        const currentProduct = await database_1.default.product.findUnique({
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
        const products = await database_1.default.product.findMany({
            where: {
                isActive: true,
                id: { not: id },
                OR: [
                    { categoryId: currentProduct.categoryId },
                    { tags: { hasSome: currentProduct.tags } },
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
            take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
        });
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
    }
    catch (error) {
        console.error('Error fetching related products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching related products',
        });
    }
};
exports.getRelatedProducts = getRelatedProducts;
//# sourceMappingURL=productController.js.map