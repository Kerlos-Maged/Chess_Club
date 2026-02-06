import express from 'express';
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
} from '../controllers/memberController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/join', submitApplication);

// Admin routes (protected)
router.get('/applications', verifyToken, getAllApplications);
router.put('/applications/:id', verifyToken, updateApplicationStatus);

export default router;
