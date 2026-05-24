import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from '../controllers/entryController.js';

const router = express.Router();

// All routes protected — must be logged in
router.post('/', protect, createEntry);
router.get('/', protect, getEntries);
router.get('/:id', protect, getEntryById);
router.put('/:id', protect, updateEntry);
router.delete('/:id', protect, deleteEntry);

export default router;