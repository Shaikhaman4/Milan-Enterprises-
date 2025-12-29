import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Placeholder for user routes
router.use(authenticate);

export default router;