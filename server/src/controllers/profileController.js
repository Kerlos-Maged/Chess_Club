import { UserProfile } from '../models/UserProfile.js';
import { memberApplicationSchema, updateProfileSchema } from '../validators/schemas.js';

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const profile = await UserProfile.findOne({ userId }).select('-__v');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Get all profiles (admin)
export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await UserProfile.find().select('-__v').sort('-updatedAt');

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};

// Create user profile (from approved member application)
export const createUserProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, grade, experience } = req.body;

    // Generate unique userId
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const profile = new UserProfile({
      userId,
      firstName,
      lastName,
      email,
      grade,
      experience,
      bio: '',
      achievements: [],
    });

    await profile.save();

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, grade, experience, bio } = req.body;

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    // Update allowed fields
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (grade) profile.grade = grade;
    if (experience) profile.experience = experience;
    if (bio) profile.bio = bio;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Add match to history (admin)
export const addMatchResult = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { opponent, result, event, notes } = req.body;

    // Validate result
    if (!['win', 'loss', 'draw'].includes(result)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid result. Must be win, loss, or draw',
      });
    }

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    // Add match to history
    profile.matchHistory.push({
      opponent,
      result,
      event,
      notes,
    });

    // Update win/loss/draw count
    if (result === 'win') {
      profile.wins += 1;
      // Update rating on win
      profile.rating += 5;
    } else if (result === 'loss') {
      profile.losses += 1;
      // Update rating on loss
      profile.rating = Math.max(profile.rating - 5, 0);
    } else if (result === 'draw') {
      profile.draws += 1;
    }

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Match result added successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Update match statistics (admin) - bulk update wins/losses
export const updateStats = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { wins, losses, draws, rating } = req.body;

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    if (wins !== undefined) profile.wins = Math.max(wins, 0);
    if (losses !== undefined) profile.losses = Math.max(losses, 0);
    if (draws !== undefined) profile.draws = Math.max(draws, 0);
    if (rating !== undefined) profile.rating = Math.max(rating, 0);

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Statistics updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Add achievement (admin)
export const addAchievement = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { achievement } = req.body;

    if (!achievement || typeof achievement !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Achievement text is required',
      });
    }

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    if (!profile.achievements.includes(achievement)) {
      profile.achievements.push(achievement);
    }

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Achievement added successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res, next) => {
  try {
    const { sortBy = 'rating', limit = 50 } = req.query;

    let sortObj = {};
    if (sortBy === 'wins') sortObj = { wins: -1 };
    else if (sortBy === 'rating') sortObj = { rating: -1 };
    else sortObj = { rating: -1 };

    const leaderboard = await UserProfile.find()
      .sort(sortObj)
      .limit(parseInt(limit))
      .select('-__v');

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    next(error);
  }
};
