import { Tournament } from '../models/Tournament.js';

// Create new tournament
export const createTournament = async (req, res, next) => {
  try {
    const {
      name,
      description,
      format,
      maxParticipants,
      startDate,
      location,
      entryFee,
      prizes,
    } = req.body;

    const tournament = new Tournament({
      name,
      description,
      format,
      maxParticipants,
      startDate,
      location,
      entryFee,
      prizes,
      status: 'registration',
    });

    await tournament.save();

    res.status(201).json({
      success: true,
      message: 'Tournament created successfully',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tournaments
export const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments,
    });
  } catch (error) {
    next(error);
  }
};

// Get tournament by ID
export const getTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    res.status(200).json({
      success: true,
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Register participant
export const registerParticipant = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    const { userId, firstName, lastName, email, rating } = req.body;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    if (tournament.status !== 'registration') {
      return res.status(400).json({
        success: false,
        message: 'Tournament registration is closed',
      });
    }

    if (tournament.registeredParticipants.length >= tournament.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Tournament is full',
      });
    }

    // Check if already registered
    const alreadyRegistered = tournament.registeredParticipants.find(
      (p) => p.userId === userId
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Participant already registered',
      });
    }

    tournament.registeredParticipants.push({
      userId,
      firstName,
      lastName,
      email,
      rating,
      registeredAt: new Date(),
    });

    await tournament.save();

    res.status(200).json({
      success: true,
      message: 'Registered successfully',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Generate bracket and start tournament
export const startTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    if (tournament.registeredParticipants.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Need at least 2 participants',
      });
    }

    // Shuffle participants
    const participants = [...tournament.registeredParticipants].sort(
      () => Math.random() - 0.5
    );

    // Generate first round matchups
    const matchups = [];
    for (let i = 0; i < participants.length; i += 2) {
      if (i + 1 < participants.length) {
        matchups.push({
          player1: {
            userId: participants[i].userId,
            name: `${participants[i].firstName} ${participants[i].lastName}`,
            rating: participants[i].rating,
          },
          player2: {
            userId: participants[i + 1].userId,
            name: `${participants[i + 1].firstName} ${participants[i + 1].lastName}`,
            rating: participants[i + 1].rating,
          },
          status: 'pending',
        });
      }
    }

    // Handle bye (odd number of players)
    if (participants.length % 2 === 1) {
      matchups.push({
        player1: {
          userId: participants[participants.length - 1].userId,
          name: `${participants[participants.length - 1].firstName} ${
            participants[participants.length - 1].lastName
          }`,
          rating: participants[participants.length - 1].rating,
        },
        player2: null,
        winner: {
          userId: participants[participants.length - 1].userId,
          name: `${participants[participants.length - 1].firstName} ${
            participants[participants.length - 1].lastName
          }`,
        },
        status: 'completed',
      });
    }

    tournament.rounds = [
      {
        roundNumber: 1,
        roundName: 'Round 1',
        matchups,
        status: 'in-progress',
      },
    ];

    tournament.status = 'in-progress';
    tournament.currentRound = 1;
    tournament.startDate = new Date();

    await tournament.save();

    res.status(200).json({
      success: true,
      message: 'Tournament started',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Record match result
export const recordMatchResult = async (req, res, next) => {
  try {
    const { tournamentId, roundNumber, matchupIndex } = req.params;
    const { winnerId, winnerName, notes } = req.body;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    const round = tournament.rounds.find((r) => r.roundNumber === parseInt(roundNumber));

    if (!round) {
      return res.status(404).json({
        success: false,
        message: 'Round not found',
      });
    }

    const matchup = round.matchups[matchupIndex];

    if (!matchup) {
      return res.status(404).json({
        success: false,
        message: 'Matchup not found',
      });
    }

    matchup.winner = {
      userId: winnerId,
      name: winnerName,
    };
    matchup.status = 'completed';
    matchup.notes = notes;

    await tournament.save();

    res.status(200).json({
      success: true,
      message: 'Match result recorded',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Progress to next round
export const progressToNextRound = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    const currentRound = tournament.rounds[tournament.rounds.length - 1];

    // Check if all matches are completed
    const allCompleted = currentRound.matchups.every((m) => m.status === 'completed');

    if (!allCompleted) {
      return res.status(400).json({
        success: false,
        message: 'All matches in current round must be completed first',
      });
    }

    // Get winners
    const winners = currentRound.matchups
      .filter((m) => m.winner)
      .map((m) => m.winner);

    // If one winner left, tournament is finished
    if (winners.length === 1) {
      tournament.winner = {
        userId: winners[0].userId,
        firstName: winners[0].name.split(' ')[0],
        lastName: winners[0].name.split(' ')[1] || '',
      };
      tournament.status = 'completed';
      tournament.endDate = new Date();

      await tournament.save();

      return res.status(200).json({
        success: true,
        message: 'Tournament completed',
        data: tournament,
      });
    }

    // Generate next round matchups
    const newMatchups = [];
    const roundNames = ['Quarterfinals', 'Semifinals', 'Finals'];
    const nextRoundNumber = tournament.rounds.length + 1;
    const roundName =
      roundNames[Math.min(nextRoundNumber - 2, roundNames.length - 1)];

    for (let i = 0; i < winners.length; i += 2) {
      if (i + 1 < winners.length) {
        newMatchups.push({
          player1: {
            userId: winners[i].userId,
            name: winners[i].name,
            rating: currentRound.matchups.find(
              (m) => m.winner?.userId === winners[i].userId
            )?.player1?.rating || 0,
          },
          player2: {
            userId: winners[i + 1].userId,
            name: winners[i + 1].name,
            rating: currentRound.matchups.find(
              (m) => m.winner?.userId === winners[i + 1].userId
            )?.player2?.rating || 0,
          },
          status: 'pending',
        });
      }
    }

    // Handle bye in next round
    if (winners.length % 2 === 1) {
      newMatchups.push({
        player1: {
          userId: winners[winners.length - 1].userId,
          name: winners[winners.length - 1].name,
          rating: 0,
        },
        player2: null,
        winner: {
          userId: winners[winners.length - 1].userId,
          name: winners[winners.length - 1].name,
        },
        status: 'completed',
      });
    }

    tournament.rounds.push({
      roundNumber: nextRoundNumber,
      roundName,
      matchups: newMatchups,
      status: 'in-progress',
    });

    tournament.currentRound = nextRoundNumber;
    await tournament.save();

    res.status(200).json({
      success: true,
      message: 'Advanced to next round',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel tournament
export const cancelTournament = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      { status: 'cancelled' },
      { new: true }
    );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: 'Tournament not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tournament cancelled',
      data: tournament,
    });
  } catch (error) {
    next(error);
  }
};
