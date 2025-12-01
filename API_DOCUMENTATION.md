# API Documentation

Base URL: `http://localhost:3000/api` (development)

## Authentication

Most endpoints don't require authentication for MVP. For user-specific features, include JWT token:

```
Authorization: Bearer <token>
```

## Endpoints

### Health Check

**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Problems

### Solve Problem

**POST** `/problems/solve`

Solve a problem using AI.

**Request Body:**
```json
{
  "problem": "What is the derivative of x^2?",
  "subject": "Mathematics",
  "topic": "Calculus",
  "difficulty": "medium",
  "userId": "optional-user-id"
}
```

**Parameters:**
- `problem` (required): The problem text
- `subject` (required): Subject category
- `topic` (optional): Specific topic
- `difficulty` (optional): "easy", "medium", or "hard" (default: "medium")
- `userId` (optional): User identifier

**Response:**
```json
{
  "success": true,
  "problemId": "507f1f77bcf86cd799439011",
  "solutionId": "507f1f77bcf86cd799439012",
  "solution": "The derivative of x^2 is 2x...",
  "explanation": "Simple explanation for easy difficulty...",
  "steps": [
    "Step 1: Apply power rule",
    "Step 2: Bring down the exponent",
    "Step 3: Reduce exponent by 1"
  ],
  "diagram": {
    "url": "https://quickchart.io/chart?...",
    "type": "image"
  },
  "keywords": ["derivative", "power rule", "calculus"]
}
```

### Get Problem History

**GET** `/problems/history/:userId`

Get user's problem-solving history.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `subject` (optional): Filter by subject
- `topic` (optional): Filter by topic

**Response:**
```json
{
  "problems": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 100
}
```

### Get Specific Problem

**GET** `/problems/:problemId`

Get problem details with solution.

**Response:**
```json
{
  "problem": {
    "_id": "507f1f77bcf86cd799439011",
    "text": "What is 2+2?",
    "subject": "Mathematics",
    "topic": "Arithmetic",
    "difficulty": "easy",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "solution": {
    "_id": "507f1f77bcf86cd799439012",
    "solution": "2+2 equals 4...",
    "steps": [...]
  }
}
```

### Generate Practice Problems

**POST** `/problems/practice`

Generate practice problems for a subject/topic.

**Request Body:**
```json
{
  "subject": "Physics",
  "topic": "Mechanics",
  "count": 3
}
```

**Response:**
```json
{
  "success": true,
  "problems": "1. Calculate the force...\n2. Find the acceleration...\n3. Determine the velocity..."
}
```

### Search Problems

**GET** `/problems/search`

Search for problems.

**Query Parameters:**
- `query` (required): Search query
- `subject` (optional): Filter by subject
- `topic` (optional): Filter by topic
- `difficulty` (optional): Filter by difficulty

**Response:**
```json
{
  "problems": [...]
}
```

---

## Subjects

### Get All Subjects

**GET** `/subjects`

Get complete subject taxonomy.

**Response:**
```json
{
  "success": true,
  "subjects": {
    "STEM": {
      "Mathematics": {
        "topics": ["Algebra", "Geometry", ...]
      },
      ...
    },
    ...
  }
}
```

### Get Subjects by Category

**GET** `/subjects/category/:category`

Get subjects in a specific category.

**Example:** `/subjects/category/STEM`

**Response:**
```json
{
  "success": true,
  "category": "STEM",
  "subjects": {
    "Mathematics": {...},
    "Physics": {...},
    ...
  }
}
```

### Get Topics for Subject

**GET** `/subjects/:category/:subject`

Get topics for a specific subject.

**Example:** `/subjects/STEM/Mathematics`

**Response:**
```json
{
  "success": true,
  "category": "STEM",
  "subject": "Mathematics",
  "topics": [
    "Algebra",
    "Geometry",
    "Calculus",
    ...
  ]
}
```

### Search Subjects

**GET** `/subjects/search`

Search subjects and topics.

**Query Parameters:**
- `query` (required): Search term

**Response:**
```json
{
  "success": true,
  "query": "calc",
  "results": [
    {
      "category": "STEM",
      "subject": "Mathematics",
      "topics": ["Calculus"],
      "match": "topic"
    }
  ],
  "count": 1
}
```

### Get Subject Statistics

**GET** `/subjects/stats`

Get platform-wide subject statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "categories": 7,
    "subjects": 50,
    "topics": 500,
    "categoryList": ["STEM", "Engineering", ...]
  }
}
```

---

## Solutions

### Get Solution

**GET** `/solutions/:solutionId`

Get specific solution details.

**Response:**
```json
{
  "success": true,
  "solution": {
    "_id": "507f1f77bcf86cd799439012",
    "problemId": "507f1f77bcf86cd799439011",
    "solution": "...",
    "explanation": "...",
    "steps": [...],
    "diagram": {...},
    "keywords": [...]
  }
}
```

### Rate Solution

**POST** `/solutions/:solutionId/rate`

Rate a solution as helpful or not helpful.

**Request Body:**
```json
{
  "helpful": true
}
```

**Response:**
```json
{
  "success": true,
  "helpful": 42,
  "notHelpful": 3
}
```

### Get Popular Solutions

**GET** `/solutions/popular`

Get most helpful solutions.

**Query Parameters:**
- `subject` (optional): Filter by subject
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "solutions": [...]
}
```

---

## Diagrams

### Generate Diagram

**POST** `/diagrams/generate`

Generate a diagram.

**Request Body:**
```json
{
  "type": "flowchart",
  "data": {
    "steps": ["Start", "Process", "End"]
  },
  "subject": "Computer Science"
}
```

**Types:** `flowchart`, `graph`, `chart`, `molecular`, `circuit`, `anatomical`

**Response:**
```json
{
  "success": true,
  "diagram": {
    "url": "https://kroki.io/mermaid/svg/...",
    "type": "svg",
    "code": "graph TD..."
  }
}
```

### Generate Math Visualization

**POST** `/diagrams/math`

Generate LaTeX math visualization.

**Request Body:**
```json
{
  "equation": "\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
}
```

**Response:**
```json
{
  "success": true,
  "diagram": {
    "url": "https://latex.codecogs.com/png.latex?...",
    "type": "image"
  }
}
```

### Generate Timeline

**POST** `/diagrams/timeline`

Generate timeline diagram.

**Request Body:**
```json
{
  "events": {
    "title": "World War II",
    "items": [
      {
        "category": "Europe",
        "name": "War Begins",
        "start": "1939-09-01",
        "duration": "1d"
      }
    ]
  }
}
```

### Generate Mind Map

**POST** `/diagrams/mindmap`

Generate mind map diagram.

**Request Body:**
```json
{
  "data": {
    "central": "Machine Learning",
    "branches": [
      {
        "name": "Supervised Learning",
        "items": ["Classification", "Regression"]
      }
    ]
  }
}
```

---

## Users

### Register

**POST** `/users/register`

Register new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login

**POST** `/users/login`

Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Get Profile

**GET** `/users/profile/:userId`

Get user profile.

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "preferences": {...},
    "stats": {...}
  }
}
```

### Update Profile

**PUT** `/users/profile/:userId`

Update user profile.

**Request Body:**
```json
{
  "name": "John Smith",
  "preferences": {
    "defaultDifficulty": "hard",
    "favoriteSubjects": ["Mathematics", "Physics"]
  }
}
```

### Get User Statistics

**GET** `/users/stats/:userId`

Get user's learning statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalProblems": 150,
    "totalSolutions": 150,
    "subjectStats": [...],
    "difficultyStats": [...]
  }
}
```

---

## Analytics

### Platform Statistics

**GET** `/analytics/platform`

Get platform-wide statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 10000,
    "totalProblems": 50000,
    "totalSolutions": 50000,
    "activeUsers": 5000,
    "popularSubjects": [...],
    "topSolutions": [...],
    "dailyProblems": [...]
  }
}
```

### Subject Analytics

**GET** `/analytics/subject/:subject`

Get analytics for specific subject.

### Trending Topics

**GET** `/analytics/trending`

Get trending topics.

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 7)

### Engagement Metrics

**GET** `/analytics/engagement`

Get user engagement metrics.

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "error": "Problem and subject are required"
}
```

**404 Not Found:**
```json
{
  "error": "Problem not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to solve problem",
  "message": "Detailed error message (development only)"
}
```

---

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applies to `/api/*` endpoints
- Returns 429 Too Many Requests when exceeded

---

## CORS

Allowed origins configured in `.env`:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081
```

---

## Testing with cURL

```bash
# Solve a problem
curl -X POST http://localhost:3000/api/problems/solve \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "What is the capital of France?",
    "subject": "Geography",
    "difficulty": "easy"
  }'

# Get subjects
curl http://localhost:3000/api/subjects

# Search subjects
curl "http://localhost:3000/api/subjects/search?query=physics"
```

---

For more examples, see the [Postman Collection](postman_collection.json) (coming soon).
