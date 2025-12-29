"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryProducts = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const database_1 = __importDefault(require("../config/database"));
const upload_1 = require("../config/upload");
const getCategories = async (req, res) => {
    try {
        const { includeProducts = false, parentId } = req.query;
        const categories = await database_1.default.category.findMany({
            where: {
                isActive: true,
                ...(parentId && { parentId: parentId }),
            },
            include: {
                children: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                },
                parent: true,
                ...(includeProducts === 'true' && {
                    products: {
                        where: { isActive: true },
                        take: 5,
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            price: true,
                            images: {
                                where: { isMain: true },
                                take: 1,
                            },
                        },
                    },
                }),
                _count: {
                    select: { products: { where: { isActive: true } } },
                },
            },
            orderBy: { sortOrder: 'asc' },
        });
        res.json({
            success: true,
            data: categories,
        });
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
        });
    }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await database_1.default.category.findUnique({
            where: { id },
            include: {
                children: {
                    where: { isActive: true },
                    orderBy: { sortOrder: 'asc' },
                },
                parent: true,
                products: {
                    where: { isActive: true },
                    include: {
                        images: {
                            where: { isMain: true },
                            take: 1,
                        },
                        reviews: {
                            select: {
                                rating: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
                _count: {
                    select: { products: { where: { isActive: true } } },
                },
            },
        });
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        const productsWithRatings = category.products.map(product => {
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
            data: {
                ...category,
                products: productsWithRatings,
            },
        });
    }
    catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category',
        });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name, slug, description, parentId, sortOrder = 0 } = req.body;
        const image = req.file ? (0, upload_1.getFileUrl)(req.file.filename, 'categories') : null;
        const existingCategory = await database_1.default.category.findUnique({
            where: { slug },
        });
        if (existingCategory) {
            res.status(400).json({
                success: false,
                message: 'Category slug already exists',
            });
            return;
        }
        const category = await database_1.default.category.create({
            data: {
                name,
                slug,
                description,
                image,
                parentId,
                sortOrder: parseInt(sortOrder),
            },
            include: {
                parent: true,
                children: true,
            },
        });
        res.status(201).json({
            success: true,
            data: category,
            message: 'Category created successfully',
        });
    }
    catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating category',
        });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, parentId, sortOrder, isActive } = req.body;
        const image = req.file ? (0, upload_1.getFileUrl)(req.file.filename, 'categories') : undefined;
        const existingCategory = await database_1.default.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        if (slug && slug !== existingCategory.slug) {
            const slugExists = await database_1.default.category.findUnique({
                where: { slug },
            });
            if (slugExists) {
                res.status(400).json({
                    success: false,
                    message: 'Category slug already exists',
                });
                return;
            }
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (slug)
            updateData.slug = slug;
        if (description !== undefined)
            updateData.description = description;
        if (parentId !== undefined)
            updateData.parentId = parentId;
        if (sortOrder !== undefined)
            updateData.sortOrder = parseInt(sortOrder);
        if (isActive !== undefined)
            updateData.isActive = isActive;
        if (image)
            updateData.image = image;
        const category = await database_1.default.category.update({
            where: { id },
            data: updateData,
            include: {
                parent: true,
                children: true,
            },
        });
        res.json({
            success: true,
            data: category,
            message: 'Category updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating category',
        });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await database_1.default.category.findUnique({
            where: { id },
            include: {
                products: true,
                children: true,
            },
        });
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
            return;
        }
        if (category.products.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Cannot delete category with products. Move products to another category first.',
            });
            return;
        }
        if (category.children.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Cannot delete category with subcategories. Delete subcategories first.',
            });
            return;
        }
        await database_1.default.category.delete({
            where: { id },
        });
        res.json({
            success: true,
            message: 'Category deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
        });
    }
};
exports.deleteCategory = deleteCategory;
const getCategoryProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc', minPrice, maxPrice, isEcoFriendly, inStock = true, } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const where = {
            categoryId: id,
            isActive: true,
        };
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
        if (inStock === 'true') {
            where.stockQuantity = { gt: 0 };
        }
        const [products, total] = await Promise.all([
            database_1.default.product.findMany({
                where,
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
                reviews: undefined,
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
        console.error('Error fetching category products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category products',
        });
    }
};
exports.getCategoryProducts = getCategoryProducts;
//# sourceMappingURL=categoryController.js.map