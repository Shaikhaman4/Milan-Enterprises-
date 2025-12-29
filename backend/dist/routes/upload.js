"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../config/upload");
const router = express_1.default.Router();
router.post('/product-images', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), upload_1.uploadProductImage.array('images', 5), (req, res) => {
    try {
        const files = req.files;
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
        res.json({
            success: true,
            data: uploadedFiles,
            message: 'Files uploaded successfully',
        });
    }
    catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading files',
        });
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map