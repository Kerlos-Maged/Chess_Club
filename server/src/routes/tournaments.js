import express from 'express';
import {
  createTournament,
  getAllTournaments,
  getTournament,
  registerParticipant,
  startTournament,
  recordMatchResult,
  progressToNextRound,
  cancelTournament,
} from '../controllers/tournamentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllTournaments);
router.get('/:tournamentId', getTournament);

// Public registration
router.post('/:tournamentId/register', registerParticipant);

// Admin only routes
router.post('/', verifyToken, createTournament);
router.post('/:tournamentId/start', verifyToken, startTournament);
router.post('/:tournamentId/rounds/:roundNumber/matchups/:matchupIndex', verifyToken, recordMatchResult);
router.post('/:tournamentId/next-round', verifyToken, progressToNextRound);
router.patch('/:tournamentId/cancel', verifyToken, cancelTournament);

export default router;
