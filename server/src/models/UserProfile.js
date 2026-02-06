import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    opponent: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      enum: ['win', 'loss', 'draw'],
      required: true,
    },
    event: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    grade: {
      type: String,
      enum: ['9', '10', '11', '12'],
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    wins: {
      type: Number,
      default: 0,
      min: 0,
    },
    losses: {
      type: Number,
      default: 0,
      min: 0,
    },
    draws: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 1200,
      min: 0,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    matchHistory: [matchSchema],
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Computed field for total games
userProfileSchema.virtual('totalGames').get(function () {
  return this.wins + this.losses + this.draws;
});

// Computed field for win rate
userProfileSchema.virtual('winRate').get(function () {
  const total = this.totalGames;
  return total === 0 ? 0 : ((this.wins / total) * 100).toFixed(2);
});

userProfileSchema.set('toJSON', { virtuals: true });

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);
