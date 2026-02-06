# Frontend Fake Data System

## Overview
The Chess Club frontend now runs completely with fake data - no backend API calls required. All profiles, leaderboards, and admin functions use local fake data.

## Fake Data Files
- **Location**: `client/src/data/fakeData.js`
- **Contains**:
  - `fakeProfiles`: Array of 8 test player profiles
  - `fakeAdmin`: Test admin credentials

## Test Profiles Available

### 1. Alexander Chen (user_chess_001_alex)
- Grade: 12 | Experience: Advanced
- Record: 45W-12L-8D | Rating: 1850
- Status: Top player with tournament championship

### 2. Jordan Player (user_chess_002_jordan)
- Grade: 11 | Experience: Advanced
- Record: 38W-18L-5D | Rating: 1720
- Status: Tactical master

### 3. Casey Champion (user_chess_003_casey)
- Grade: 12 | Experience: Advanced
- Record: 52W-10L-6D | Rating: 1920
- Status: State champion (highest rated)

### 4. Morgan Knight (user_chess_004_morgan)
- Grade: 10 | Experience: Intermediate
- Record: 28W-22L-7D | Rating: 1550
- Status: Most improved player

### 5. Riley Bishop (user_chess_005_riley)
- Grade: 9 | Experience: Intermediate
- Record: 22W-26L-5D | Rating: 1420
- Status: Promising beginner

### 6. Taylor Rook (user_chess_006_taylor)
- Grade: 10 | Experience: Beginner
- Record: 18W-28L-4D | Rating: 1280
- Status: New to chess

### 7. Alexis Roth (user_chess_007_alexis)
- Grade: 11 | Experience: Intermediate
- Record: 35W-19L-9D | Rating: 1680
- Status: Solid performer

### 8. Samuel Wong (user_chess_008_samuel)
- Grade: 9 | Experience: Beginner
- Record: 15W-32L-3D | Rating: 1180
- Status: Just starting

## How to Use

### 1. View Profiles (`/profile`)
1. Go to the Profile page
2. Enter a user ID from the list above (e.g., `user_chess_001_alex`)
3. View player stats, match history, and achievements

**Available User IDs**:
- user_chess_001_alex
- user_chess_002_jordan
- user_chess_003_casey
- user_chess_004_morgan
- user_chess_005_riley
- user_chess_006_taylor
- user_chess_007_alexis
- user_chess_008_samuel

### 2. View Leaderboard (`/leaderboard`)
1. Go to the Leaderboard page
2. Sort by Rating (default) or Wins
3. View top 100 players (all 8 fake players displayed)

### 3. Admin Dashboard (`/admin`)
1. Click Admin in navbar
2. Login with:
   - Email: `admin@chess.club`
   - Password: `Chess@2024`

#### Admin Features:
- **Overview Tab**: See total players and system status
- **Manage Profiles Tab**: Create new player profiles (adds to fake data)
- **Add Match Result Tab**: Add match results and update player stats

### 4. Create New Profiles (Admin)
1. Login to admin
2. Go to "Manage Profiles" tab
3. Fill in:
   - First Name
   - Last Name
   - Email
   - Grade (9, 10, 11, 12)
   - Experience (Beginner, Intermediate, Advanced)
4. Click "Create Profile"
5. New profile appears in the list

### 5. Add Match Results (Admin)
1. Login to admin
2. Go to "Add Match Result" tab
3. Select a player
4. Fill in:
   - Opponent Name
   - Result (Win/Loss/Draw)
   - Event (optional)
   - Notes (optional)
5. Click "Add Match Result"
6. Player's rating and stats update automatically:
   - **Win**: +5 rating
   - **Loss**: -5 rating (minimum 0)
   - **Draw**: No rating change

## Modifications Made

### Profile.jsx
- Replaced `profileService.getProfile()` with local `fakeProfiles` search
- Added error message with available user IDs
- Simulates 500ms API delay for realistic UX

### Leaderboard.jsx
- Replaced `profileService.getLeaderboard()` with local sorting
- Sorts by rating (default) or wins
- Simulates 500ms API delay

### Admin.jsx
- Replaced `authService.login()` with local credential check
- Replaced `profileService` calls with local state management
- New profiles and match results update local `profiles` state
- Stats automatically recalculate on match additions

### fakeData.js
- New file containing all fake profiles with complete data
- Each profile includes: stats, match history, achievements, bio
- Fake admin credentials for login

## Features Working with Fake Data

✅ Search and view player profiles
✅ View match history with dates
✅ Display achievements and badges
✅ Sort leaderboard by rating and wins
✅ Admin login and dashboard
✅ Create new player profiles
✅ Add match results and update stats
✅ Automatic rating calculations
✅ Win rate calculations
✅ Loading states and animations

## Switching to Real Backend

When ready to connect to the backend API:

1. **Profile.jsx**: Replace local search with `profileService.getProfile()`
2. **Leaderboard.jsx**: Replace local sort with `profileService.getLeaderboard()`
3. **Admin.jsx**: Replace all local handlers with `authService` and `profileService` calls
4. **Start backend server**: `npm run dev` in `/server` directory
5. **Backend must be running** on `http://localhost:5000`

## Current Limitations (Fake Data)

- Data doesn't persist after page refresh
- New profiles/matches only exist during session
- No database persistence
- All changes are in-memory only

## Next Steps

To convert to real backend:
1. Start backend server: `cd server && npm run dev`
2. Update API calls in Profile.jsx, Leaderboard.jsx, Admin.jsx
3. Database will persist all changes
4. Real authentication system activates
