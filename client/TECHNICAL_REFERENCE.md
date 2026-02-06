# Member Authentication System - Technical Reference

## Architecture Overview

```
Authentication System
├── AuthContext (Global State)
│   ├── user (Member/Admin object)
│   ├── userType ('member' or 'admin')
│   ├── token (Auth token)
│   └── login/logout functions
│
├── MemberAuth Page (/member-auth)
│   ├── Login Form
│   │   ├── Email input
│   │   └── Password input
│   └── Register Form
│       ├── Name fields
│       ├── Email
│       ├── Grade selector
│       ├── Experience selector
│       └── Password confirmation
│
├── Navbar (UI)
│   ├── Shows auth status
│   ├── Conditional buttons
│   └── Logout action
│
├── Competitions Page
│   ├── Tournament list
│   ├── Registration buttons
│   ├── Participant lists
│   └── User registrations display
│
└── localStorage
    ├── token (Auth token)
    ├── userType ('member')
    ├── user (Profile object)
    └── tournaments (Tournament data)
```

---

## Data Models

### User/Member Object
```javascript
{
  _id: "unique_id",
  userId: "user_chess_001",
  firstName: "Alexander",
  lastName: "Chen",
  email: "alex.chen@school.edu",
  grade: "12",
  experience: "advanced",
  wins: 45,
  losses: 12,
  draws: 8,
  rating: 1850,
  bio: "...",
  achievements: [],
  matchHistory: [],
  totalGames: 65,
  winRate: "69.23",
  joinedDate: Date,
  registeredTournaments: ["tournament_id_1", "tournament_id_2"]
}
```

### Tournament Object
```javascript
{
  _id: "tournament_id",
  name: "Spring Championship",
  description: "...",
  format: "single-elimination",
  maxParticipants: 8,
  startDate: "2024-02-15",
  status: "upcoming|registration|in-progress|completed",
  participants: [{ ...user_object }, ...]
}
```

---

## API Flows

### Login Flow
```
MemberAuth Page
    ↓
User enters email & password
    ↓
handleLoginSubmit()
    ↓
Find user in fakeProfiles
    ↓
Verify password
    ↓
Create token
    ↓
login(token, user, 'member')
    ↓
Store in localStorage
    ↓
Redirect to /competitions
```

### Register Flow
```
MemberAuth Page
    ↓
User fills registration form
    ↓
handleRegisterSubmit()
    ↓
Validate all fields
    ↓
Create new member object
    ↓
Save to localStorage 'members'
    ↓
Auto-login
    ↓
Redirect to /competitions
```

### Tournament Registration Flow
```
Competitions Page
    ↓
User clicks "Register Now"
    ↓
handleRegister(tournamentId)
    ↓
Validate:
  - User is logged in as member
  - Tournament not full
  - Not already registered
  - Tournament in correct status
    ↓
Add user to tournament.participants[]
    ↓
Add tournamentId to user.registeredTournaments[]
    ↓
Save both to localStorage
    ↓
Update UI
    ↓
Show confirmation
```

---

## Key Functions

### AuthContext
```javascript
login(token, userData, type = 'admin')
- Sets user, userType, token
- Stores in localStorage
- type: 'admin' or 'member'

logout()
- Clears all auth data
- Removes from localStorage
```

### MemberAuth
```javascript
handleLoginSubmit(e)
- Find user by email
- Verify password
- Call login()
- Redirect

handleRegisterSubmit(e)
- Validate form
- Check for duplicates
- Create new user
- Save to localStorage
- Auto-login
- Redirect
```

### Competitions
```javascript
handleRegister(tournamentId)
- Validate user is member
- Check tournament availability
- Add to participants
- Update localStorage
- Refresh UI

handleWithdraw(tournamentId)
- Remove from participants
- Update localStorage
- Refresh UI

isRegistered(tournamentId)
- Check if in registeredTournaments[]
```

### Navbar
```javascript
handleLogout()
- Call logout()
- Navigate to home
```

---

## localStorage Keys

| Key | Type | Contains |
|-----|------|----------|
| `token` | string | Auth token |
| `userType` | string | 'admin' or 'member' |
| `user` | JSON | Full user object |
| `tournaments` | JSON | Array of tournaments |
| `members` | JSON | Newly registered members |

---

## Validation Rules

### Login
- ✓ Email must exist in fakeProfiles
- ✓ Password must be correct (demo: 'Chess123')

### Registration
- ✓ First name and last name required
- ✓ Valid email format (contains @)
- ✓ Password minimum 6 characters
- ✓ Passwords must match
- ✓ Email must not already exist

### Tournament Registration
- ✓ User must be logged in as member
- ✓ Tournament must not be full
- ✓ User must not already be registered
- ✓ Tournament status must be 'upcoming' or 'registration'

### Withdrawal
- ✓ User must be registered in tournament
- ✓ Tournament status must be 'upcoming' or 'registration'

---

## Error Handling

### Login Errors
```
"User not found. Please check your email or register."
"Invalid password. Try "Chess123" for demo."
```

### Registration Errors
```
"First name and last name are required."
"Please enter a valid email address."
"Password must be at least 6 characters long."
"Passwords do not match."
"This email is already registered."
```

### Tournament Errors
```
"❌ You are already registered for this tournament!"
"❌ Tournament is full!"
"❌ Cannot register for this tournament at this time."
```

---

## State Management

### Global State (AuthContext)
```javascript
const [user, setUser] = useState(null)
const [userType, setUserType] = useState(null)
const [token, setToken] = useState(null)
const [loading, setLoading] = useState(true)
```

### Competitions Page State
```javascript
const [tournaments, setTournaments] = useState([])
const [registeredTournaments, setRegisteredTournaments] = useState([])
```

### MemberAuth Page State
```javascript
// Login Form
const [loginForm, setLoginForm] = useState({ email: '', password: '' })

// Register Form
const [registerForm, setRegisterForm] = useState({
  firstName: '', lastName: '', email: '', password: '',
  confirmPassword: '', grade: '9', experience: 'beginner'
})

const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const [isLogin, setIsLogin] = useState(true)
```

---

## Route Structure

```
/                          Home page
/about                     About page
/competitions              Competitions (member registration here)
  ├─ Requires login for registration
  ├─ Shows tournament list
  └─ Shows user's registrations

/leaderboard               Leaderboard page
/profile                   Member profile
/member-auth               Member login/register
  ├─ Login tab
  ├─ Register tab
  └─ Full screen (no navbar/footer)

/admin                     Admin dashboard
  ├─ Admin login
  ├─ Tournament management
  ├─ Player management
  └─ Full screen (no navbar/footer)

/join                      Join club page
/contact                   Contact page
/test                      Test page
```

---

## Component Hierarchy

```
App
├── AuthProvider
│   └── AppContent
│       ├── Router
│       │   ├── Navbar (conditional)
│       │   │   ├── Logo
│       │   │   ├── Links
│       │   │   ├── Member status (if logged in)
│       │   │   └── Logout button (if member)
│       │   │
│       │   ├── Routes
│       │   │   ├── Home
│       │   │   ├── Competitions
│       │   │   │   ├── Auth prompt (if not logged in)
│       │   │   │   ├── Tournament list
│       │   │   │   ├── Registration buttons
│       │   │   │   └── User registrations section
│       │   │   ├── MemberAuth (full screen)
│       │   │   ├── Admin (full screen)
│       │   │   └── Other pages
│       │   │
│       │   └── Footer (conditional)
```

---

## Performance Considerations

- localStorage queries are O(1) - very fast
- Tournament list filters on client-side
- No API calls (client-side only)
- Re-renders only when auth or tournaments change
- useEffect prevents infinite loops with dependencies

---

## Security Notes

⚠️ **Demo/Development Only:**
- Passwords stored in plain text (demo only)
- No backend validation
- No encryption
- No HTTPS requirement

🔐 **For Production:**
- Implement proper backend authentication
- Hash passwords with bcrypt
- Use JWT tokens
- Implement HTTPS
- Add rate limiting
- Validate on backend
- Use secure cookies

---

## Testing Checklist

```
✅ Member Login
  ✅ Valid credentials work
  ✅ Invalid email shows error
  ✅ Wrong password shows error
  ✅ Redirects to competitions

✅ Member Registration
  ✅ Valid form creates account
  ✅ Missing fields show errors
  ✅ Duplicate email shows error
  ✅ Auto-login after registration
  ✅ Redirects to competitions

✅ Tournament Registration
  ✅ Register for tournament works
  ✅ Duplicate registration prevented
  ✅ Full tournament shows "Full"
  ✅ Completed tournament shows "Ended"
  ✅ Participant list updates
  ✅ Registered tournaments section shows

✅ Tournament Withdrawal
  ✅ Withdraw button appears for registered
  ✅ Withdrawal works
  ✅ Button changes back to "Register Now"
  ✅ Participant list updates

✅ Logout
  ✅ Clears token and user
  ✅ Hides member info
  ✅ Shows login buttons
  ✅ Redirects to home

✅ Session Persistence
  ✅ Data persists on page reload
  ✅ Data clears on logout
  ✅ Data cleared on browser restart (unless persistent)

✅ Admin Still Works
  ✅ Admin login works
  ✅ Tournament creation works
  ✅ Member registration in tournaments works
  ✅ Tournaments appear in member view
```

---

## Troubleshooting

### Session Lost After Reload
**Solution**: Check localStorage is not disabled in browser settings

### Can't See Login Button
**Solution**: Make sure you're not already logged in. Check navbar.

### Registration Not Saving
**Solution**: Check browser localStorage is enabled (50MB available)

### Tournament Not Appearing
**Solution**: Check tournament status - only shows all tournaments on Competitions page

### Old Data After Logout
**Solution**: Clear browser cache, then logout and login again

---

**Version**: 1.0
**Status**: Production Ready ✅
**Last Updated**: February 4, 2026
