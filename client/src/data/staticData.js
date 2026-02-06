// Static data for the Chess Club application

export const staticProfiles = [
  {
    _id: '1',
    firstName: 'Khalid',
    lastName: 'Ahmed',
    email: 'khalid@school.com',
    grade: '12',
    experience: 'advanced',
    wins: 45,
    losses: 8,
    draws: 3,
    rating: 1850,
    joinDate: '2024-01-15',
    avatar: '👑',
    puzzlesSolved: 287,
    tournamentParticipations: 12
  },
  {
    _id: '2',
    firstName: 'Fatima',
    lastName: 'Hassan',
    email: 'fatima@school.com',
    grade: '11',
    experience: 'advanced',
    wins: 42,
    losses: 10,
    draws: 5,
    rating: 1820,
    joinDate: '2024-02-01',
    avatar: '♛',
    puzzlesSolved: 315,
    tournamentParticipations: 10
  },
  {
    _id: '3',
    firstName: 'Omar',
    lastName: 'Ibrahim',
    email: 'omar@school.com',
    grade: '10',
    experience: 'intermediate',
    wins: 38,
    losses: 15,
    draws: 7,
    rating: 1750,
    joinDate: '2024-03-10',
    avatar: '♔',
    puzzlesSolved: 198,
    tournamentParticipations: 8
  },
  {
    _id: '4',
    firstName: 'Layla',
    lastName: 'Mansour',
    email: 'layla@school.com',
    grade: '12',
    experience: 'advanced',
    wins: 35,
    losses: 12,
    draws: 8,
    rating: 1720,
    joinDate: '2024-01-20',
    avatar: '♕',
    puzzlesSolved: 256,
    tournamentParticipations: 11
  },
  {
    _id: '5',
    firstName: 'Ahmed',
    lastName: 'Karim',
    email: 'ahmed@school.com',
    grade: '9',
    experience: 'beginner',
    wins: 28,
    losses: 22,
    draws: 5,
    rating: 1650,
    joinDate: '2024-04-05',
    avatar: '♖',
    puzzlesSolved: 142,
    tournamentParticipations: 5
  },
  {
    _id: '6',
    firstName: 'Noor',
    lastName: 'Saleh',
    email: 'noor@school.com',
    grade: '11',
    experience: 'intermediate',
    wins: 32,
    losses: 18,
    draws: 10,
    rating: 1700,
    joinDate: '2024-02-14',
    avatar: '♗',
    puzzlesSolved: 203,
    tournamentParticipations: 7
  },
  {
    _id: '7',
    firstName: 'Samir',
    lastName: 'Nabil',
    email: 'samir@school.com',
    grade: '10',
    experience: 'intermediate',
    wins: 29,
    losses: 20,
    draws: 6,
    rating: 1680,
    joinDate: '2024-03-25',
    avatar: '♘',
    puzzlesSolved: 175,
    tournamentParticipations: 9
  },
  {
    _id: '8',
    firstName: 'Mona',
    lastName: 'Sayed',
    email: 'mona@school.com',
    grade: '9',
    experience: 'beginner',
    wins: 18,
    losses: 28,
    draws: 4,
    rating: 1550,
    joinDate: '2024-05-01',
    avatar: '♙',
    puzzlesSolved: 89,
    tournamentParticipations: 3
  },
  {
    _id: '9',
    firstName: 'Rami',
    lastName: 'Zaki',
    email: 'rami@school.com',
    grade: '12',
    experience: 'advanced',
    wins: 40,
    losses: 11,
    draws: 4,
    rating: 1800,
    joinDate: '2024-01-28',
    avatar: '♚',
    puzzlesSolved: 291,
    tournamentParticipations: 13
  },
  {
    _id: '10',
    firstName: 'Dina',
    lastName: 'Amin',
    email: 'dina@school.com',
    grade: '10',
    experience: 'intermediate',
    wins: 25,
    losses: 25,
    draws: 5,
    rating: 1650,
    joinDate: '2024-04-12',
    avatar: '♝',
    puzzlesSolved: 165,
    tournamentParticipations: 6
  }
];

export const staticTournaments = [
  {
    _id: '1',
    name: 'Spring Championship 2026',
    description: 'Official school-wide chess championship',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    format: 'round-robin',
    maxParticipants: 64,
    participants: [],
    prizePool: 5000
  },
  {
    _id: '2',
    name: 'Rapid Tournament',
    description: 'Fast-paced rapid chess tournament',
    startDate: '2026-02-20',
    endDate: '2026-02-20',
    format: 'blitz',
    maxParticipants: 32,
    participants: [],
    prizePool: 2000
  },
  {
    _id: '3',
    name: 'Beginner Friendly',
    description: 'Perfect for players new to competitive chess',
    startDate: '2026-02-28',
    endDate: '2026-03-01',
    format: 'casual',
    maxParticipants: 24,
    participants: [],
    prizePool: 1000
  },
  {
    _id: '4',
    name: 'Grade 9 Competition',
    description: 'Exclusive tournament for Grade 9 students',
    startDate: '2026-03-08',
    endDate: '2026-03-10',
    format: 'round-robin',
    maxParticipants: 20,
    participants: [],
    prizePool: 1500
  },
  {
    _id: '5',
    name: 'Inter-School Challenge',
    description: 'Compete against other schools',
    startDate: '2026-04-05',
    endDate: '2026-04-12',
    format: 'round-robin',
    maxParticipants: 50,
    participants: [],
    prizePool: 8000
  }
];

export const staticEvents = [
  {
    _id: '1',
    title: 'Weekly Chess Club Meeting',
    date: '2026-02-10',
    time: '3:30 PM',
    location: 'Library Room 201',
    description: 'Regular club meeting for all members'
  },
  {
    _id: '2',
    title: 'Tactics Training Session',
    date: '2026-02-12',
    time: '4:00 PM',
    location: 'Computer Lab',
    description: 'Learn advanced tactics with our coaches'
  },
  {
    _id: '3',
    title: 'Simul with Master Player',
    date: '2026-02-15',
    time: '5:00 PM',
    location: 'Main Hall',
    description: 'Special simultaneous event with visiting master'
  }
];
