import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserProfile } from '../models/UserProfile.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const fakeProfiles = [
  {
    userId: 'user_chess_001_alex',
    firstName: 'Alexander',
    lastName: 'Chen',
    email: 'alex.chen@school.edu',
    grade: '12',
    experience: 'advanced',
    wins: 45,
    losses: 12,
    draws: 8,
    rating: 1850,
    bio: 'Passionate chess player aiming for tournament championship. Love strategic openings and endgame mastery.',
    achievements: [
      'Tournament Champion 2024',
      'Undefeated Month (March)',
      '50 Wins Milestone',
      'Rising Star',
    ],
    matchHistory: [
      { opponent: 'Jordan Player', result: 'win', event: 'Monthly Tournament', notes: 'Dominant midgame' },
      { opponent: 'Casey Champion', result: 'loss', event: 'Regional Finals', notes: 'Tough opponent' },
      { opponent: 'Morgan Knight', result: 'draw', event: 'Club Match', notes: 'Interesting endgame' },
      { opponent: 'Riley Bishop', result: 'win', event: 'Practice Match', notes: 'Quick victory' },
      { opponent: 'Taylor Rook', result: 'win', event: 'Monthly Tournament', notes: 'Solid performance' },
    ],
  },
  {
    userId: 'user_chess_002_jordan',
    firstName: 'Jordan',
    lastName: 'Player',
    email: 'jordan.player@school.edu',
    grade: '11',
    experience: 'advanced',
    wins: 38,
    losses: 18,
    draws: 5,
    rating: 1720,
    bio: 'Competitive player with strong tactical skills. Always learning new strategies.',
    achievements: [
      'Tournament Runner-up 2024',
      'Tactical Master',
      '30 Wins Milestone',
      'Consistency King',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'loss', event: 'Monthly Tournament', notes: 'Outplayed' },
      { opponent: 'Casey Champion', result: 'win', event: 'Club Match', notes: 'Strong finish' },
      { opponent: 'Morgan Knight', result: 'win', event: 'Practice', notes: 'Good tactics' },
      { opponent: 'Riley Bishop', result: 'draw', event: 'Friendly Match', notes: 'Equal strength' },
    ],
  },
  {
    userId: 'user_chess_003_casey',
    firstName: 'Casey',
    lastName: 'Champion',
    email: 'casey.champ@school.edu',
    grade: '12',
    experience: 'advanced',
    wins: 52,
    losses: 10,
    draws: 6,
    rating: 1920,
    bio: 'National level player. Specializing in classical chess and rapid tournaments.',
    achievements: [
      'State Champion 2024',
      'Unbeaten Streak (12 games)',
      '50 Wins Milestone',
      'Grand Master in Training',
      'Tournament Champion 2024',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'win', event: 'Regional Finals', notes: 'Perfect execution' },
      { opponent: 'Jordan Player', result: 'loss', event: 'Club Match', notes: 'Tactical mistake' },
      { opponent: 'Morgan Knight', result: 'win', event: 'State Tournament', notes: 'Dominant' },
      { opponent: 'Taylor Rook', result: 'win', event: 'Monthly Tournament', notes: 'Strong opening' },
      { opponent: 'Riley Bishop', result: 'draw', event: 'Practice Match', notes: 'Even game' },
    ],
  },
  {
    userId: 'user_chess_004_morgan',
    firstName: 'Morgan',
    lastName: 'Knight',
    email: 'morgan.knight@school.edu',
    grade: '10',
    experience: 'intermediate',
    wins: 28,
    losses: 22,
    draws: 7,
    rating: 1550,
    bio: 'Intermediate player focusing on improving my game. Always up for friendly matches!',
    achievements: [
      'Most Improved Player',
      'Friendly Spirit',
      '25 Wins Milestone',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'draw', event: 'Club Match', notes: 'Close game' },
      { opponent: 'Jordan Player', result: 'loss', event: 'Practice', notes: 'Learning experience' },
      { opponent: 'Casey Champion', result: 'loss', event: 'State Tournament', notes: 'Tough opponent' },
      { opponent: 'Riley Bishop', result: 'win', event: 'Friendly', notes: 'Great game' },
      { opponent: 'Taylor Rook', result: 'win', event: 'Club Match', notes: 'Solid play' },
    ],
  },
  {
    userId: 'user_chess_005_riley',
    firstName: 'Riley',
    lastName: 'Bishop',
    email: 'riley.bishop@school.edu',
    grade: '9',
    experience: 'intermediate',
    wins: 22,
    losses: 26,
    draws: 5,
    rating: 1420,
    bio: 'Still learning the ropes but having so much fun! Love the chess community.',
    achievements: [
      'Promising Beginner',
      'Team Player',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'loss', event: 'Practice Match', notes: 'Great learnings' },
      { opponent: 'Casey Champion', result: 'draw', event: 'Practice Match', notes: 'Fair match' },
      { opponent: 'Morgan Knight', result: 'loss', event: 'Friendly', notes: 'Close one' },
      { opponent: 'Taylor Rook', result: 'win', event: 'Club Match', notes: 'Victory!' },
    ],
  },
  {
    userId: 'user_chess_006_taylor',
    firstName: 'Taylor',
    lastName: 'Rook',
    email: 'taylor.rook@school.edu',
    grade: '10',
    experience: 'beginner',
    wins: 18,
    losses: 28,
    draws: 4,
    rating: 1280,
    bio: 'New to chess but loving it! Grateful for all the coaching and support.',
    achievements: [
      'Newcomer',
      'Eager Learner',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'loss', event: 'Monthly Tournament', notes: 'Challenging' },
      { opponent: 'Casey Champion', result: 'loss', event: 'Monthly Tournament', notes: 'Tough match' },
      { opponent: 'Morgan Knight', result: 'loss', event: 'Club Match', notes: 'Keep practicing' },
      { opponent: 'Riley Bishop', result: 'loss', event: 'Club Match', notes: 'Close game' },
    ],
  },
  {
    userId: 'user_chess_007_alex',
    firstName: 'Alexis',
    lastName: 'Roth',
    email: 'alexis.roth@school.edu',
    grade: '11',
    experience: 'intermediate',
    wins: 35,
    losses: 19,
    draws: 9,
    rating: 1680,
    bio: 'Casual player who enjoys competitive matches. Always looking to improve.',
    achievements: [
      'Solid Performer',
      'Quick Thinker',
      '30 Wins Milestone',
    ],
    matchHistory: [
      { opponent: 'Alexander Chen', result: 'loss', event: 'Club Match', notes: 'Outplayed' },
      { opponent: 'Jordan Player', result: 'win', event: 'Practice', notes: 'Good tactics' },
      { opponent: 'Casey Champion', result: 'loss', event: 'Monthly Tournament', notes: 'Strong opponent' },
      { opponent: 'Morgan Knight', result: 'win', event: 'Friendly Match', notes: 'Controlled game' },
    ],
  },
  {
    userId: 'user_chess_008_sam',
    firstName: 'Samuel',
    lastName: 'Wong',
    email: 'samuel.wong@school.edu',
    grade: '9',
    experience: 'beginner',
    wins: 15,
    losses: 32,
    draws: 3,
    rating: 1180,
    bio: 'Just starting my chess journey. Excited to learn from everyone!',
    achievements: [
      'Newcomer',
      'Enthusiastic',
    ],
    matchHistory: [
      { opponent: 'Riley Bishop', result: 'loss', event: 'Club Match', notes: 'Learning' },
      { opponent: 'Taylor Rook', result: 'win', event: 'Practice', notes: 'First win!' },
      { opponent: 'Morgan Knight', result: 'loss', event: 'Friendly', notes: 'Tough' },
    ],
  },
];

const seedProfiles = async () => {
  try {
    // Clear existing profiles
    await UserProfile.deleteMany({});
    console.log('✓ Cleared existing profiles');

    // Create profiles with match history timestamps
    const now = new Date();
    const profiles = fakeProfiles.map((profile) => {
      const matchHistoryWithTimestamps = profile.matchHistory.map((match, index) => ({
        ...match,
        createdAt: new Date(now.getTime() - (profile.matchHistory.length - index) * 86400000),
      }));

      return {
        ...profile,
        matchHistory: matchHistoryWithTimestamps,
        joinedDate: new Date(now.getTime() - Math.random() * 180 * 86400000),
      };
    });

    const created = await UserProfile.insertMany(profiles);
    console.log(`✓ Created ${created.length} fake player profiles`);

    // Display summary
    console.log('\n📊 Profile Summary:');
    created.forEach((profile) => {
      console.log(
        `  • ${profile.firstName} ${profile.lastName}: ${profile.wins}W-${profile.losses}L-${profile.draws}D | Rating: ${profile.rating}`
      );
    });

    console.log('\n✓ Seeding completed successfully!');
  } catch (error) {
    console.error('✗ Seeding failed:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// Run seeding
connectDB().then(seedProfiles);
