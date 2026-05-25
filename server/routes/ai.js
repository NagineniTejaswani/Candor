import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { analyzeAndSave } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/analyze — create + analyze in one shot
router.post('/analyze', protect, analyzeAndSave);

export default router;