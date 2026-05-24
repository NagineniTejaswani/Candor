import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { analyzeEntry } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/analyze
router.post('/analyze', protect, analyzeEntry);

export default router;