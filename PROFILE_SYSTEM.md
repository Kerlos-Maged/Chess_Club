# Profile System Documentation

## Overview
The Chess Club application now includes a complete player profile system that allows:
- Users to view their player profiles with statistics
- Admin to create and manage player profiles
- Admin to add match results and update player statistics
- Public leaderboard showing top players ranked by rating or wins

## Features

### 1. User Profile Display (`/profile`)
Users can search for any player profile by their user ID and view:
- **Player Information**: Name, email, grade, experience level
- **Statistics Tab**: 
  - Total games, wins, losses, draws
  - Win rate percentage
  - Current rating
  - Player bio
- **Match History Tab**: 
  - Chronological list of all matches
  - Opponent names, results, events, and notes
- **Achievements Tab**: 
  - Badges and accomplishments

### 2. Public Leaderboard (`/leaderboard`)
Displays top players with:
- Ranking and medals (🥇🥈🥉)
- Player name and email
- Rating (sortable)
- Win/Loss/Draw counts
- Win rate percentage
- Total games played
- Sort by Rating or Wins

### 3. Admin Dashboard (`/admin`)
After logging in (admin@chess.club / Chess@2024), admins can:

#### Overview Tab
- View logged-in admin info
- See total number of players
- Monitor system status

#### Manage Profiles Tab
- **Create New Profile**: Add a new player with:
  - First and last name
  - Email
  - Grade (9, 10, 11, 12)
  - Experience level (beginner, intermediate, advanced)
  
- **View All Profiles**: Browse all player profiles with quick stats
  - Name and email
  - Current rating
  - Win/loss/draw counts

#### Add Match Result Tab
1. Select a player
2. Fill in match details:
   - Opponent name
   - Result (Win/Loss/Draw)
   - Event (optional)
   - Notes (optional)
3. Submit to update player's:
   - Win/loss/draw count
   - Rating (±5 points based on result)
   - Match history

## Data Model

### UserProfile Schema
```javascript
{
  userId: String (unique),
  firstName: String,
  lastName: String,
  email: String (unique),
  grade: String (9|10|11|12),
  experience: String (beginner|intermediate|advanced),
  wins: Number (default: 0),
  losses: Number (default: 0),
  draws: Number (default: 0),
  rating: Number (default: 1200),
  bio: String,
  matchHistory: [
    {
      opponent: String,
      result: String (win|loss|draw),
      event: String,
      notes: String,
      createdAt: Date
    }
  ],
  achievements: [String],
  joinedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Virtual Fields
- `totalGames`: Calculated as wins + losses + draws
- `winRate`: Calculated as (wins / totalGames) * 100

## API Endpoints

### Public Endpoints
- `GET /api/v1/profiles/leaderboard` - Get top players (queryable by sortBy and limit)
- `GET /api/v1/profiles/:userId` - Get specific player profile

### Admin Endpoints (Requires Authentication)
- `GET /api/v1/profiles` - Get all profiles
- `POST /api/v1/profiles` - Create new profile
- `PATCH /api/v1/profiles/:userId` - Update profile info
- `POST /api/v1/profiles/:userId/match` - Add match result
- `PATCH /api/v1/profiles/:userId/stats` - Update statistics directly
- `POST /api/v1/profiles/:userId/achievement` - Add achievement badge

## Usage Examples

### Viewing a Profile
1. Go to `/profile`
2. Enter a user ID (format: `user_[timestamp]_[random]`)
3. Click Search to view profile details

### Creating a Player Profile
1. Login to Admin (admin@chess.club / Chess@2024)
2. Go to "Manage Profiles" tab
3. Fill in player information
4. Click "Create Profile"
5. New player ID will be generated automatically

### Adding Match Results
1. Login to Admin
2. Go to "Add Match Result" tab
3. Select a player
4. Fill in:
   - Opponent name
   - Result (Win/Loss/Draw)
   - Event name (optional)
   - Match notes (optional)
5. Click "Add Match Result"
6. Player's stats and rating update automatically

### Rating System
- **Win**: +5 rating points
- **Loss**: -5 rating points (minimum 0)
- **Draw**: No rating change
- Starting rating: 1200

## Navigation
- New navbar links: **Profile**, **Leaderboard**
- Profile page accessible from `/profile`
- Leaderboard accessible from `/leaderboard`
- Admin profile management from `/admin`

## Technical Implementation

### Frontend Components
- `Profile.jsx`: Player profile search and display
- `Leaderboard.jsx`: Top players ranking
- `Admin.jsx`: Enhanced with profile management tabs

### Backend
- Model: `UserProfile.js`
- Controller: `profileController.js`
- Routes: `profiles.js`

### API Service
`profileService` in `api.js` provides all methods:
- `getProfile(userId)`
- `getAllProfiles()`
- `createProfile(data)`
- `updateProfile(userId, data)`
- `addMatch(userId, data)`
- `updateStats(userId, data)`
- `addAchievement(userId, data)`
- `getLeaderboard(params)`

## Future Enhancements
- Email notifications for match results
- Advanced rating system (ELO)
- Tournament brackets
- Player rankings by grade level
- Performance graphs and statistics
- Player vs Player head-to-head records
- Seasonal leaderboards
