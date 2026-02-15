# Express.js Backend Setup & Guide

## 🎯 Overview

This document covers the complete backend setup for the Captain's Quest AI Roadmap Generator.

- **Server**: Express.js on Node.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful endpoints with CORS support
- **Language**: TypeScript

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

Dependencies installed:

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **typescript**: Type safety
- **ts-node**: Run TypeScript directly
- **nodemon**: Auto-reload on file changes

### 2. Environment Setup

Create `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/captain-quest
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_key_here
API_KEY=your_backup_key_here
```

### 3. MongoDB Setup

**Local Installation:**

```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install -y mongodb

# Start MongoDB
mongod
```

**MongoDB Atlas (Cloud):**

1. Visit https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/db-name`
5. Add to `.env.local` as `MONGODB_URI`

## 🚀 Running the Server

### Development Mode

```bash
npm run server:dev
```

Runs with hot-reload using nodemon. Server at `http://localhost:5000`

### Production Mode

```bash
npm run server
```

Runs with node directly (no hot-reload)

### With Frontend (Full Stack)

```bash
npm run dev:all
```

Runs both frontend (Vite) and backend (ts-node) concurrently

## 📁 Backend Structure

```
server/
├── config/
│   └── database.ts          # MongoDB connection logic
├── models/
│   └── schemas.ts           # Mongoose schemas (User, Roadmap, Step)
├── routes/
│   ├── users.ts             # User CRUD endpoints
│   └── roadmaps.ts          # Roadmap CRUD endpoints
└── index.ts                 # Express app setup & server start
```

## 🔗 API Endpoints

### Health Check

```
GET /api/health
Response: { status: "Server is running", timestamp: "ISO timestamp" }
```

### Users Endpoints

**Get All Users**

```bash
GET /api/users
```

**Get Single User**

```bash
GET /api/users/:id
```

**Create User**

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Pirate",
  "email": "john@example.com",
  "role": "developer",
  "avatar": "🏴‍☠️",
  "signature": "Captain"
}
```

**Update User**

```bash
PUT /api/users/:id
Content-Type: application/json

{
  "name": "New Name",
  "role": "admin"
}
```

**Delete User**

```bash
DELETE /api/users/:id
```

### Roadmaps Endpoints

**Get User's Roadmaps**

```bash
GET /api/roadmaps/:userId
```

**Get Single Roadmap**

```bash
GET /api/roadmaps/detail/:id
```

**Create Roadmap**

```bash
POST /api/roadmaps
Content-Type: application/json

{
  "goal": "Learn Web Development",
  "userId": "user_id_here",
  "steps": [
    {
      "title": "HTML & CSS",
      "description": "Master web basics",
      "duration": "2 weeks",
      "milestone": "Build static site",
      "completed": false
    }
  ],
  "status": "Draft"
}
```

**Update Roadmap**

```bash
PUT /api/roadmaps/:id
Content-Type: application/json

{
  "goal": "Learn Advanced Web Dev",
  "status": "In Progress"
}
```

**Delete Roadmap**

```bash
DELETE /api/roadmaps/:id
```

## 🗄️ Database Schemas

### User Schema

```typescript
interface IUser {
  _id: ObjectId;
  name: string; // User's full name
  email: string; // Unique email
  role: string; // User role (e.g., "developer")
  avatar: string; // Avatar URL or emoji
  signature?: string; // Optional user signature
  createdAt: Date; // Account creation date
}
```

### Roadmap Schema

```typescript
interface IRoadmap {
  _id: ObjectId;
  goal: string; // Learning goal
  userId: string; // Reference to User
  steps: IStep[]; // Array of steps
  status: "Draft" | "In Progress" | "Completed";
  createdAt: Date;
}

interface IStep {
  _id: ObjectId;
  title: string; // Step title
  description: string; // Detailed description
  duration: string; // Estimated time (e.g., "2 weeks")
  milestone: string; // What to achieve
  completed: boolean; // Completion status
  notes?: string; // Optional notes
}
```

## 🧪 Testing with curl

### Test Health

```bash
curl http://localhost:5000/api/health
```

### Create Test User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "learner",
    "avatar": "👤"
  }'
```

### Get All Users

```bash
curl http://localhost:5000/api/users
```

### Create Roadmap

```bash
curl -X POST http://localhost:5000/api/roadmaps \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Learn Python",
    "userId": "user_123",
    "steps": [
      {
        "title": "Python Basics",
        "description": "Learn syntax and fundamentals",
        "duration": "3 weeks",
        "milestone": "Write simple programs",
        "completed": false
      }
    ]
  }'
```

## 🔧 Configuration Files

### server/config/database.ts

Handles MongoDB connection:

- Reads `MONGODB_URI` from environment
- Connects on server startup
- Logs connection status
- Exits process on connection failure

### server/models/schemas.ts

Defines Mongoose schemas:

- `User` - User accounts
- `Roadmap` - Learning roadmaps
- `Step` - Individual steps within roadmaps
- Exports models for use in routes

### server/routes/users.ts

User CRUD operations:

- GET, POST, PUT, DELETE endpoints
- Error handling
- Duplicate email validation (unique constraint)

### server/routes/roadmaps.ts

Roadmap CRUD operations:

- GET all/single, POST, PUT, DELETE
- Filters by userId
- Embedded steps in roadmap

## 🔐 Security Features

1. **CORS Enabled**: Cross-origin requests from frontend
2. **Input Validation**: Mongoose schema validation
3. **Error Handling**: Try-catch blocks in all routes
4. **Environment Variables**: Sensitive data in .env
5. **Unique Constraints**: Email uniqueness in User model

## 📊 Middleware Stack

```
Request
  ↓
cors()                    # Enable cross-origin requests
  ↓
express.json()            # Parse JSON bodies
  ↓
express.urlencoded()      # Parse form data
  ↓
Routes Handler            # /api/health, /api/users, /api/roadmaps
  ↓
Error Handler             # Catch and log errors
  ↓
Response
```

## 🐛 Troubleshooting

### MongoDB Connection Failed

```
Error: MongoDB connection error
```

**Solution:**

1. Ensure MongoDB is running: `mongod`
2. Check `MONGODB_URI` in `.env.local`
3. For Atlas: Allow IP in security settings

### Port 5000 Already in Use

```bash
# Find and kill process
lsof -i :5000              # Mac/Linux
netstat -ano | findstr :5000  # Windows
kill -9 <PID>             # Mac/Linux
```

### TypeScript Errors

```bash
npx tsc --noEmit          # Check without compilation
npm run build             # Full build test
```

### CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. Check frontend URL in CORS config
2. Ensure `cors()` middleware is enabled
3. Verify `VITE_API_URL` matches backend

### Email Already Exists Error

```
Error: Email already exists (code 11000)
```

**Solution:**

- Use unique email for new users
- Or delete existing user first

## 🚢 Production Deployment

### 1. Build Frontend

```bash
npm run build
```

### 2. Set Production Variables

```bash
NODE_ENV=production
MONGODB_URI=<production_db_url>
PORT=5000
```

### 3. Deploy Options

**Heroku**

```bash
heroku create <app-name>
heroku config:set MONGODB_URI=<url>
git push heroku main
```

**Railway/Render**

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## 📈 Monitoring & Logging

Currently logs to console:

- MongoDB connection status
- API request errors
- Server startup message

## 🔄 Data Flow

```
Frontend (React)
    ↓
axios/fetch call to /api/roadmaps
    ↓
Express Route Handler
    ↓
Mongoose Query to MongoDB
    ↓
Database Operation
    ↓
JSON Response to Frontend
    ↓
React State Update
```

## 📝 Example Workflow

### 1. User Creates Account

```json
POST /api/users
{
  "name": "Captain Jack",
  "email": "jack@example.com",
  "role": "developer",
  "avatar": "👨‍💻"
}
→ Returns: { _id: "123abc", createdAt: "2024-01-01T..." }
```

### 2. Frontend Saves userId

### 3. User Creates Learning Roadmap

```json
POST /api/roadmaps
{
  "goal": "Master React",
  "userId": "123abc",
  "steps": [...]
}
→ Returns: Roadmap with _id
```

### 4. Update Progress

```json
PUT /api/roadmaps/:roadmapId
{
  "status": "In Progress",
  "steps": [...with completed=true]
}
```

## 💡 Best Practices

1. **Always use environment variables** for sensitive data
2. **Validate inputs** on backend (don't trust client)
3. **Use consistent error responses** for debugging
4. **Log important events** (connections, errors, requests)
5. **Test endpoints** before integration with frontend
6. **Keep database backups** (especially production)
7. **Use unique constraints** for important fields
8. **Implement rate limiting** for production APIs

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Ready to sail the seas of backend development! ⚓**
