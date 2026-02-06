import express from 'express';
import {
  getUserProfile,
  getAllProfiles,
  createUserProfile,
  updateUserProfile,
  addMatchResult,
  updateStats,
  addAchievement,
  getLeaderboard,
} from '../controllers/profileController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/leaderboard', getLeaderboard);
router.get('/:userId', getUserProfile);

// Admin only routes
router.get('/', verifyToken, getAllProfiles);
router.post('/', verifyToken, createUserProfile);
router.patch('/:userId', verifyToken, updateUserProfile);
router.post('/:userId/match', verifyToken, addMatchResult);
router.patch('/:userId/stats', verifyToken, updateStats);
router.post('/:userId/achievement', verifyToken, addAchievement);

export default router;
