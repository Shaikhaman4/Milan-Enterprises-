import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

// Ensure upload directories exist
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const productsDir = path.join(process.cwd(), uploadDir, 'products');
const categoriesDir = path.join(process.cwd(), uploadDir, 'categories');

// Create directories if they don't exist
fs.ensureDirSync(productsDir);
fs.ensureDirSync(categoriesDir);

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on route
    if (req.originalUrl.includes('product')) {
      cb(null, productsDir);
    } else if (req.originalUrl.includes('category')) {
      cb(null, categoriesDir);
    } else {
      cb(null, path.join(process.cwd(), uploadDir));
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter for images only
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Multer configuration for product images
export const uploadProductImage = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter,
});

// Multer configuration for category images
export const uploadCategoryImage = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter,
});

// Helper function to get file URL
export const getFileUrl = (filename: string, type: 'products' | 'categories' = 'products'): string => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'http://localhost:5000'
    : 'http://localhost:5000';
  return `${baseUrl}/uploads/${type}/${filename}`;
};

// Helper function to delete file
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.remove(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Helper function to get filename from URL
export const getFilenameFromUrl = (url: string): string => {
  return path.basename(url);
};

// Helper function to get file path from URL
export const getFilePathFromUrl = (url: string): string => {
  const urlParts = url.split('/uploads/');
  if (urlParts.length > 1) {
    return path.join(process.cwd(), uploadDir, urlParts[1]);
  }
  return '';
};