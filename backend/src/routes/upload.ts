import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { uploadProductImage } from '../config/upload';

const router = express.Router();

// Upload product images (Admin only)
router.post('/product-images', 
  authenticate, 
  authorize('ADMIN', 'SUPER_ADMIN'),
  uploadProductImage.array('images', 5),
  (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded',
        });
      }

      const uploadedFiles = files.map(file => ({
        url: `/uploads/products/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
      }));

      return res.json({
        success: true,
        data: uploadedFiles,
        message: 'Files uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      return res.status(500).json({
        success: false,
        message: 'Error uploading files',
      });
    }
  }
);

export default router;