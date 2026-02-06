import express from 'express';
import {
  submitContactMessage,
  getAllMessages,
  markAsRead,
} from '../controllers/contactController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', submitContactMessage);

// Admin routes (protected)
router.get('/', verifyToken, getAllMessages);
router.put('/:id/read', verifyToken, markAsRead);

export default router;
