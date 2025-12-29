import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Placeholder for coupon routes
router.use(authenticate);

export default router;