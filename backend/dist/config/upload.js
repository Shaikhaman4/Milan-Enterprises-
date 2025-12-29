"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathFromUrl = exports.getFilenameFromUrl = exports.deleteFile = exports.getFileUrl = exports.uploadCategoryImage = exports.uploadProductImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const uuid_1 = require("uuid");
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const productsDir = path_1.default.join(process.cwd(), uploadDir, 'products');
const categoriesDir = path_1.default.join(process.cwd(), uploadDir, 'categories');
fs_extra_1.default.ensureDirSync(productsDir);
fs_extra_1.default.ensureDirSync(categoriesDir);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (req.originalUrl.includes('product')) {
            cb(null, productsDir);
        }
        else if (req.originalUrl.includes('category')) {
            cb(null, categoriesDir);
        }
        else {
            cb(null, path_1.default.join(process.cwd(), uploadDir));
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
exports.uploadProductImage = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
    },
    fileFilter,
});
exports.uploadCategoryImage = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
    },
    fileFilter,
});
const getFileUrl = (filename, type = 'products') => {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || 'http://localhost:5000'
        : 'http://localhost:5000';
    return `${baseUrl}/uploads/${type}/${filename}`;
};
exports.getFileUrl = getFileUrl;
const deleteFile = async (filePath) => {
    try {
        const fullPath = path_1.default.join(process.cwd(), filePath);
        await fs_extra_1.default.remove(fullPath);
    }
    catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};
exports.deleteFile = deleteFile;
const getFilenameFromUrl = (url) => {
    return path_1.default.basename(url);
};
exports.getFilenameFromUrl = getFilenameFromUrl;
const getFilePathFromUrl = (url) => {
    const urlParts = url.split('/uploads/');
    if (urlParts.length > 1) {
        return path_1.default.join(process.cwd(), uploadDir, urlParts[1]);
    }
    return '';
};
exports.getFilePathFromUrl = getFilePathFromUrl;
//# sourceMappingURL=upload.js.map