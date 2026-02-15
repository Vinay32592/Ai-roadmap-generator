## 🚀 Quick Start Guide

Get your full-stack app running in 5 minutes!

### Step 1: Install Dependencies (1 minute)

```bash
npm install
```

✅ All backend dependencies installed: express, mongoose, cors, dotenv, etc.

### Step 2: Set Up Environment (1 minute)

Create `.env.local` in the root directory:

```env
# Database - Choose ONE
MONGODB_URI=mongodb://localhost:27017/captain-quest

# API Keys (optional for Gemini features)
GEMINI_API_KEY=your_gemini_key
API_KEY=backup_key

# Server
PORT=5000
```

### Step 3: Start MongoDB (1 minute)

**Option A: Local MongoDB**

```bash
mongod
# Keep this running in background
```

**Option B: MongoDB Atlas (Cloud - No Setup)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Cluster → Get connection string
3. Paste in `.env.local`: `MONGODB_URI=mongodb+srv://...`

### Step 4: Run the App (1 minute)

**Frontend + Backend Together:**

```bash
npm run dev:all
```

This starts both:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

### Step 5: Test It! (1 minute)

Open a new terminal:

```bash
# Test backend health
curl http://localhost:5000/api/health

# Should see: { "status": "Server is running", "timestamp": "..." }
```

✅ **Done!** Your app is running!

---

## 📚 Available Commands

```bash
# Frontend only (Vite hot-reload)
npm run dev

# Backend only (Express + nodemon)
npm run server:dev

# Both together (recommended for development)
npm run dev:all

# Build for production
npm run build

# Run production server
npm run server

# Check TypeScript
npx tsc --noEmit
```

---

## 🔌 API Examples

### Create a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Captain Jack",
    "email": "jack@example.com",
    "role": "developer",
    "avatar": "🏴‍☠️"
  }'
```

### Create a Roadmap

```bash
curl -X POST http://localhost:5000/api/roadmaps \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Learn Web Development",
    "userId": "your_user_id",
    "steps": [
      {
        "title": "HTML & CSS Basics",
        "description": "Learn the fundamentals",
        "duration": "2 weeks",
        "milestone": "Build a static website",
        "completed": false
      }
    ]
  }'
```

### Get All Roadmaps for a User

```bash
curl http://localhost:5000/api/roadmaps/your_user_id
```

---

## 🆘 Troubleshooting

### "MongoDB connection failed"

```
✓ Is MongoDB running? (mongod in another terminal)
✓ Is MONGODB_URI correct in .env.local?
✓ For Atlas: Did you whitelist your IP?
```

### "Port 5000 already in use"

```bash
# Kill the process using port 5000
# Windows: netstat -ano | findstr :5000 → taskkill /PID <pid> /F
# Mac/Linux: lsof -i :5000 → kill -9 <pid>
```

### "CORS error in browser"

```
✓ Make sure backend is running on localhost:5000
✓ Check VITE_API_URL in frontend config
✓ Restart both frontend and backend
```

### "TypeScript errors"

```bash
npx tsc --noEmit  # Check errors
npm run build      # Full build test
```

---

## 📁 Project Files

**Backend:**

- `server/index.ts` - Main Express server
- `server/config/database.ts` - MongoDB connection
- `server/models/schemas.ts` - Data models
- `server/routes/users.ts` - User API routes
- `server/routes/roadmaps.ts` - Roadmap API routes

**Frontend:**

- `src/App.tsx` - Main React component
- `src/pages/Dashboard.tsx` - Dashboard page
- `src/geminiService.ts` - AI integration

**Config:**

- `.env.local` - Environment variables
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript config
- `vite.config.ts` - Vite config

---

## 📖 Learn More

- **SETUP.md** - Complete setup guide
- **BACKEND_GUIDE.md** - Detailed API documentation
- **IMPLEMENTATION_SUMMARY.md** - What was built

---

## 🎉 You're All Set!

Your full-stack app with:
✅ React frontend (Vite)
✅ Express.js backend
✅ MongoDB database
✅ REST APIs (CRUD operations)
✅ TypeScript type safety
✅ Hot-reload development

**Happy coding! ⚓🏴‍☠️**

For questions, check the documentation or see BACKEND_GUIDE.md for detailed API docs.
