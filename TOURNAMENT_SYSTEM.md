# 🏆 Tournament System Documentation

## Overview
Complete tournament management system with automatic bracket generation, random matchup creation, and round progression from qualifiers through semifinals to finals.

## Features

### 1. **Tournament Page** (`/tournaments`)
Users can:
- View all tournaments (Registration, In Progress, Completed)
- Filter tournaments by status
- View tournament details including bracket
- See participants, prizes, and schedule
- View champion for completed tournaments

### 2. **Admin Tournament Management** (`/admin` → "Manage Tournaments" Tab)
Admins can:
- Create new tournaments
- Start tournaments (automatically generates bracket)
- View tournament status
- Manage participants
- View tournament brackets with match results

### 3. **Automatic Features**
✅ **Random Bracket Generation**: Participants randomly shuffled
✅ **Automatic Round Progression**: Winners automatically advance
✅ **Bye Handling**: Odd number of players gets automatic bye
✅ **Match Recording**: Track match results and notes
✅ **Rating Updates**: Player ratings can be updated based on results
✅ **Round Names**: Round 1 → Quarterfinals → Semifinals → Finals

## Tournament Formats

### Single Elimination (Current)
- Players randomly matched
- Losers eliminated
- Winners advance to next round
- One champion emerges

### Future: Round Robin
- Every player plays every other player
- Points accumulated
- Ranked by total points

## Backend API Endpoints

### Public Endpoints
```
GET /api/v1/tournaments                    # Get all tournaments
GET /api/v1/tournaments/:tournamentId      # Get single tournament
POST /api/v1/tournaments/:tournamentId/register  # Register participant
```

### Admin Endpoints (Requires Authentication)
```
POST /api/v1/tournaments                   # Create tournament
POST /api/v1/tournaments/:tournamentId/start     # Start & generate bracket
POST /api/v1/tournaments/:tournamentId/rounds/:roundNumber/matchups/:matchupIndex
     # Record match result
POST /api/v1/tournaments/:tournamentId/next-round  # Progress to next round
PATCH /api/v1/tournaments/:tournamentId/cancel  # Cancel tournament
```

## Data Model

### Tournament Schema
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  format: 'single-elimination' | 'round-robin',
  maxParticipants: Number,
  registeredParticipants: [
    {
      userId: String,
      firstName: String,
      lastName: String,
      email: String,
      rating: Number,
      registeredAt: Date
    }
  ],
  rounds: [
    {
      roundNumber: Number,
      roundName: 'Round 1' | 'Quarterfinals' | 'Semifinals' | 'Finals',
      matchups: [
        {
          player1: { userId, name, rating },
          player2: { userId, name, rating },
          winner: { userId, name },
          status: 'pending' | 'completed',
          notes: String
        }
      ],
      status: 'pending' | 'in-progress' | 'completed'
    }
  ],
  currentRound: Number,
  winner: { userId, firstName, lastName, rating },
  status: 'registration' | 'in-progress' | 'completed' | 'cancelled',
  startDate: Date,
  endDate: Date,
  location: String,
  entryFee: Number,
  prizes: [{ place: String, reward: String }]
}
```

## Fake Tournament Data

### 3 Sample Tournaments Included

#### 1. Spring Championship 2024 ✅ COMPLETED
- 4 participants (Casey Champion won)
- 2 rounds completed (Round 1 + Finals)
- Status: Completed
- Format: Single Elimination

**Bracket:**
```
Round 1:
  Alexander Chen (1850) ➔ WINNER
  Jordan Player (1720)   

  Casey Champion (1920) ➔ WINNER
  Alexis Roth (1680)

Finals:
  Alexander Chen
  Casey Champion (1920) ➔ CHAMPION 🥇
```

#### 2. Rapid Tournament 🔄 IN PROGRESS
- 8 participants
- Round 1 completed, Semifinals in progress
- Can view bracket and record remaining match results

**Current Bracket:**
```
Round 1: COMPLETED
- Alexander Chen vs Riley Bishop ✓ Chen Won
- Casey Champion vs Samuel Wong ✓ Champion Won
- Jordan Player vs Taylor Rook ✓ Player Won
- Alexis Roth vs Morgan Knight ✓ Roth Won

Semifinals: IN PROGRESS
- Alexander Chen vs Jordan Player (Pending)
- Casey Champion vs Alexis Roth (Pending)
```

#### 3. Summer Open Championship 📋 REGISTRATION OPEN
- Max 32 participants
- Only 2 registered so far
- Future date: 15 days from now
- Entry fee: $10
- Prize pool included

## How to Use

### For Users

#### 1. View Tournaments
```
1. Go to Navbar → Tournaments
2. Browse available tournaments
3. Filter by: All, Upcoming, Ongoing, Completed
4. Click on tournament to see:
   - Participants
   - Bracket/Results
   - Prize structure
   - Location & Date
```

#### 2. View Tournament Bracket
```
1. Click "View Details" on a tournament
2. See complete bracket with:
   - All matchups
   - Player ratings
   - Match results
   - Winner highlighted
   - Match notes
```

### For Admins

#### 1. Create Tournament
```
1. Login to Admin (/admin)
2. Go to "Manage Tournaments" tab
3. Fill in:
   - Tournament Name
   - Description
   - Max Participants
   - Start Date
   - Location
   - Entry Fee (optional)
4. Click "Create Tournament"
```

#### 2. Start Tournament (Generate Bracket)
```
1. Tournament must have 2+ registered participants
2. Click "Start Tournament" button
3. System automatically:
   - Shuffles participants randomly
   - Creates matchups for Round 1
   - Sets status to "In Progress"
   - Generates bracket
```

#### 3. Record Match Results
```
1. View tournament bracket
2. For each completed match:
   - Record winner
   - Add match notes (optional)
3. Match marked as completed
```

#### 4. Progress to Next Round
```
1. After all current round matches completed
2. Click "Progress to Next Round"
3. System automatically:
   - Creates new matchups with winners
   - Generates next round name (Quarterfinals, Semifinals, Finals)
   - Handles bye for odd number of winners
   - Updates bracket
```

#### 5. Tournament Completion
```
1. Finals match completed
2. One champion remains
3. Tournament status = "Completed"
4. Champion displayed with rating
```

## Test Scenarios

### Scenario 1: View Completed Tournament
```
Step 1: Go to /tournaments
Step 2: Filter "Completed" tournaments
Step 3: Click "Spring Championship 2024"
Step 4: View final bracket with Casey Champion as winner
```

### Scenario 2: Track In-Progress Tournament
```
Step 1: Go to /tournaments
Step 2: Filter "Ongoing" tournaments
Step 3: See Rapid Tournament Semifinals in progress
Step 4: Click to see bracket with pending matches
```

### Scenario 3: Create & Start Tournament (Admin)
```
Step 1: Login to /admin (admin@chess.club / Chess@2024)
Step 2: Go to "Manage Tournaments" tab
Step 3: Create tournament with random name
Step 4: Need 2+ participants (add from fake profiles)
Step 5: Click "Start Tournament" to generate bracket
Step 6: View auto-generated bracket
```

## Bracket Visualization

Tournament bracket displayed in hierarchical format:

```
ROUND 1                ROUND 2 (Finals)           CHAMPION
─────────────          ──────────────             ────────

Player A  ────────┐
          ├────→  Winner AB  ────────┐
Player B  ────────┘                  ├────→  CHAMPION 🥇
                                      ┤
Player C  ────────┐                  │
          ├────→  Winner CD  ────────┘
Player D  ────────┘
```

## Automatic Features

### 1. Random Matchup Generation
- On "Start Tournament":
  - Shuffles all registered participants
  - Creates matchups (Player 1 vs Player 2, etc.)
  - Handles odd number with bye to next round

### 2. Round Naming
- Round 1: Initial round
- Round 2: Quarterfinals (16 → 8, 8 → 4)
- Round 3: Semifinals (4 → 2)
- Round 4: Finals (2 → 1)

### 3. Automatic Bye Handling
```
If 5 players:
Match 1: Player A vs Player B
Match 2: Player C vs Player D
Match 3: Player E (BYE - auto-advance to next round)

Result: 3 winners advance to next round
```

### 4. Winner Progression
- After Round 1 completes
- Admin clicks "Progress to Next Round"
- System automatically:
  - Takes all winners
  - Shuffles them
  - Creates new matchups
  - Handles bye if needed
  - Updates tournament status

## Status Flow

```
Created Tournament
        ↓
  Registration Phase
        ↓
  Start Tournament (generate bracket)
        ↓
  In Progress (matches being played)
        ↓
  Record Match Results
        ↓
  All Matches Complete?
    ├─ NO: Continue recording
    └─ YES: Progress to Next Round
        ↓
  More Rounds?
    ├─ YES: Go back to record matches
    └─ NO: Tournament Complete
        ↓
  Display Champion
```

## Future Enhancements

1. **Participant Registration UI**: Allow users to self-register
2. **Match Result Recording**: Players/admins record results in real-time
3. **Notifications**: Email/push notifications for match assignments
4. **Seeding**: Seed top-rated players to avoid early matchups
5. **Round Robin Format**: Support multiple tournament formats
6. **Live Scoring**: Real-time bracket updates
7. **Statistics**: Track tournament history and stats
8. **Integrations**: Connect with external rating systems
9. **Streaming**: Link to livestream matches
10. **Schedule Generation**: Auto-generate match times and locations

## Performance Notes

- Single-elimination with 8 players = 3 rounds (7 matches total)
- Single-elimination with 16 players = 4 rounds (15 matches total)
- Single-elimination with 32 players = 5 rounds (31 matches total)

Bracket generation is instant with O(n) complexity.

## Known Limitations (Fake Data Version)

- Tournament data only persists during session
- No database persistence
- Random shuffling uses JavaScript Math.random()
- No email notifications
- Manual match recording only
- No participant self-registration

## Migration to Backend

When connecting to MongoDB backend:

1. Uncomment backend API calls in:
   - `Tournaments.jsx`
   - `Admin.jsx` (tournament tab)

2. Remove fake data imports

3. Use `tournamentService` endpoints

4. Database will persist all tournament data

5. Add authentication checks

## Example Tournament Journey

```
Mon: Tournament Created (Spring Championship)
    └─ Status: Registration, 0/8 participants

Tue-Thu: Registration Phase
    └─ 8 players register

Fri 10am: Admin clicks "Start Tournament"
    └─ Random bracket generated
    └─ Status: In Progress
    └─ Round 1 ready

Fri 2-5pm: Round 1 Matches Played
    └─ 4 matches recorded
    └─ 4 winners emerge
    └─ Round 1: Complete

Fri 6pm: Admin clicks "Progress to Next Round"
    └─ Winners shuffled
    └─ Finals matchup created
    └─ Round 2 (Finals) ready

Fri 7-8pm: Finals Match Played
    └─ Winner recorded
    └─ Champion crowned

Fri 8:01pm: Tournament Complete ✅
    └─ Status: Completed
    └─ Champion: Casey Champion
    └─ Bracket saved for history
```

---

**Status**: 🟢 **FULLY FUNCTIONAL WITH FAKE DATA** including 3 sample tournaments ready to explore!
