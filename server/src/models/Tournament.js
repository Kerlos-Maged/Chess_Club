import mongoose from 'mongoose';

const matchupSchema = new mongoose.Schema(
  {
    player1: {
      userId: String,
      name: String,
      rating: Number,
    },
    player2: {
      userId: String,
      name: String,
      rating: Number,
    },
    winner: {
      userId: String,
      name: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    notes: String,
  },
  { timestamps: true }
);

const roundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    roundName: {
      type: String,
      enum: ['Round 1', 'Quarterfinals', 'Semifinals', 'Finals'],
      required: true,
    },
    matchups: [matchupSchema],
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    format: {
      type: String,
      enum: ['single-elimination', 'round-robin'],
      default: 'single-elimination',
    },
    maxParticipants: {
      type: Number,
      required: true,
    },
    registeredParticipants: [
      {
        userId: String,
        firstName: String,
        lastName: String,
        email: String,
        rating: Number,
        registeredAt: Date,
      },
    ],
    rounds: [roundSchema],
    currentRound: {
      type: Number,
      default: 0,
    },
    winner: {
      userId: String,
      firstName: String,
      lastName: String,
      rating: Number,
    },
    status: {
      type: String,
      enum: ['registration', 'in-progress', 'completed', 'cancelled'],
      default: 'registration',
    },
    startDate: Date,
    endDate: Date,
    location: {
      type: String,
      trim: true,
    },
    entryFee: {
      type: Number,
      default: 0,
    },
    prizes: [
      {
        place: String,
        reward: String,
      },
    ],
  },
  { timestamps: true }
);

export const Tournament = mongoose.model('Tournament', tournamentSchema);
