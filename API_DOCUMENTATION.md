# API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication

Protected routes require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

Get token by logging in at `/admin/login`

---

## 🔓 Public Endpoints

### Events

#### List All Events
```
GET /events
```
**Response (200 OK):**
```json
[
  {
    "_id": "...",
    "title": "Weekly Practice",
    "description": "...",
    "date": "2026-02-11T00:00:00.000Z",
    "time": "16:00",
    "location": "Room 101",
    "category": "training",
    "capacity": 20,
    "imageUrl": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Get Event By ID
```
GET /events/:id
```
**Response (200 OK):** Single event object

**Response (404 Not Found):** Error

---

### Members

#### Submit Membership Application
```
POST /members/join
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "grade": "10",
  "experience": "intermediate",
  "reason": "I love chess!"
}
```

**Response (201 Created):**
```json
{
  "message": "Application submitted successfully",
  "application": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "grade": "10",
    "experience": "intermediate",
    "reason": "I love chess!",
    "status": "pending",
    "createdAt": "..."
  }
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

### Contact

#### Send Contact Message
```
POST /contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about tournaments",
  "message": "When is the next tournament?"
}
```

**Response (201 Created):**
```json
{
  "message": "Message sent successfully",
  "data": {
    "_id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Question about tournaments",
    "message": "When is the next tournament?",
    "status": "new",
    "createdAt": "..."
  }
}
```

---

## 🔒 Protected Endpoints (Admin Only)

### Authentication

#### Admin Login
```
POST /admin/login
Content-Type: application/json

{
  "email": "admin@chess.club",
  "password": "Chess@2024"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "email": "admin@chess.club",
    "name": "Chess Club Admin"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

### Events Management

#### Create Event
```
POST /events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Lightning Tournament",
  "description": "5-minute rapid fire games",
  "date": "2026-02-18T00:00:00.000Z",
  "time": "15:30",
  "location": "Auditorium",
  "category": "tournament",
  "capacity": 32,
  "imageUrl": null
}
```

**Response (201 Created):** Event object with ID

**Response (401 Unauthorized):** No token or invalid token

---

#### Update Event
```
PUT /events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "capacity": 25
}
```

**Response (200 OK):** Updated event object

**Response (404 Not Found):** Event doesn't exist

---

#### Delete Event
```
DELETE /events/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Event deleted successfully"
}
```

**Response (404 Not Found):** Event doesn't exist

---

### Member Applications

#### Get All Applications
```
GET /members/applications
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "grade": "10",
    "experience": "intermediate",
    "status": "pending",
    "createdAt": "..."
  }
]
```

---

#### Update Application Status
```
PUT /members/applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved"
}
```

Valid status values: `pending`, `approved`, `rejected`

**Response (200 OK):** Updated application object

---

### Contact Messages

#### Get All Messages
```
GET /contact
Authorization: Bearer <token>
```

**Response (200 OK):** Array of contact messages

---

#### Mark Message as Read
```
PUT /contact/:id/read
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "...",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question",
  "message": "...",
  "status": "read",
  "createdAt": "..."
}
```

---

## ✅ Validation Rules

### Member Application
- `firstName` (required): string, trimmed
- `lastName` (required): string, trimmed
- `email` (required): valid email format
- `phone` (optional): string
- `grade` (required): one of `9`, `10`, `11`, `12`
- `experience` (optional): one of `beginner`, `intermediate`, `advanced`
- `reason` (optional): string

### Event
- `title` (required): non-empty string
- `description` (required): non-empty string
- `date` (required): ISO datetime
- `time` (required): HH:MM format
- `location` (required): non-empty string
- `category` (optional): `tournament`, `meeting`, `training`, `social`
- `capacity` (optional): positive number
- `imageUrl` (optional): valid URL

### Contact Message
- `name` (required): non-empty string
- `email` (required): valid email format
- `subject` (required): non-empty string
- `message` (required): non-empty string

### Login
- `email` (required): valid email format
- `password` (required): minimum 6 characters

---

## 🚨 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - No/invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error |

---

## 📝 Example Requests (curl)

### Get all events
```bash
curl http://localhost:5000/api/v1/events
```

### Submit membership application
```bash
curl -X POST http://localhost:5000/api/v1/members/join \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "grade": "10",
    "experience": "beginner"
  }'
```

### Admin login
```bash
curl -X POST http://localhost:5000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@chess.club",
    "password": "Chess@2024"
  }'
```

### Create event (with token)
```bash
curl -X POST http://localhost:5000/api/v1/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Event",
    "description": "Event description",
    "date": "2026-02-25T00:00:00.000Z",
    "time": "18:00",
    "location": "Room 101"
  }'
```

---

## 🔍 Testing with Postman/Insomnia

1. **Import:** Set base URL to `http://localhost:5000/api/v1`
2. **Login:** Get token from `/admin/login`
3. **Add Auth:** Set Authorization header with Bearer token
4. **Test:** Try protected endpoints

---

## ⚠️ Error Responses

Generic error format:
```json
{
  "error": "Error message",
  "details": [] // Only for validation errors
}
```

Example validation error:
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": "email",
      "message": "Invalid email address"
    },
    {
      "path": "grade",
      "message": "Invalid enum value"
    }
  ]
}
```
