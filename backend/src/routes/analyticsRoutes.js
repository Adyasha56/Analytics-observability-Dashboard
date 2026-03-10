import express from 'express';
import { getAnalytics, trackInteraction } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/analytics', authMiddleware, getAnalytics);
router.post('/track', authMiddleware, trackInteraction);

export default router;