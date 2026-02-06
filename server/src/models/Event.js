import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true, // Format: "HH:MM"
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['tournament', 'meeting', 'training', 'social'],
      default: 'meeting',
    },
    capacity: {
      type: Number,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
