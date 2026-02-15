## 🎯 Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │        React App (Vite Dev Server)               │  │
│  │        http://localhost:5173                     │  │
│  │                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │  │
│  │  │Dashboard │  │  Home    │  │ Profile  │      │  │
│  │  └──────────┘  └──────────┘  └──────────┘      │  │
│  │                                                  │  │
│  │  axios/fetch calls to /api/*                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
          HTTP/CORS requests on port 5000
                          ↓
┌─────────────────────────────────────────────────────────┐
│            Express.js Server (Node.js)                  │
│            http://localhost:5000                        │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │        Middleware Stack                           │ │
│  │  • CORS Handler (Allow frontend requests)        │ │
│  │  • JSON Parser (Parse request bodies)            │ │
│  │  • URL Parser (Parse form data)                  │ │
│  └───────────────────────────────────────────────────┘ │
│                      ↓                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │        Route Handlers                             │ │
│  │  ┌─────────────────┐  ┌─────────────────────┐   │ │
│  │  │  /api/health    │  │  /api/users (CRUD)  │   │ │
│  │  └─────────────────┘  └─────────────────────┘   │ │
│  │                                                  │ │
│  │  ┌─────────────────────────────────────────┐   │ │
│  │  │  /api/roadmaps (CRUD)                   │   │ │
│  │  │  - GET /api/roadmaps/:userId            │   │ │
│  │  │  - POST /api/roadmaps (create)          │   │ │
│  │  │  - PUT /api/roadmaps/:id (update)       │   │ │
│  │  │  - DELETE /api/roadmaps/:id (delete)    │   │ │
│  │  └─────────────────────────────────────────┘   │ │
│  └───────────────────────────────────────────────────┘ │
│                      ↓                                  │
│  ┌───────────────────────────────────────────────────┐ │
│  │        Mongoose ORM Layer                         │ │
│  │  • Query validation                              │ │
│  │  • Schema enforcement                            │ │
│  │  • Error handling                                │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
             MongoDB Network Connection
                          ↓
┌─────────────────────────────────────────────────────────┐
│            MongoDB Database Server                      │
│            (Local or MongoDB Atlas Cloud)               │
│                                                         │
│  Collections:                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   users      │  │   roadmaps   │  │   steps    │  │
│  │              │  │              │  │            │  │
│  │ • name       │  │ • goal       │  │ • title    │  │
│  │ • email      │  │ • userId     │  │ • descr.   │  │
│  │ • role       │  │ • status     │  │ • duration │  │
│  │ • avatar     │  │ • createdAt  │  │ • notes    │  │
│  └──────────────┘  └──────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Request/Response Flow

```
FRONTEND (React)          BACKEND (Express)         DATABASE (MongoDB)
     │                          │                          │
     │  1. User submits form    │                          │
     │────────────────────────→ │                          │
     │                          │ 2. Parse request        │
     │                          │                          │
     │                    POST /api/users                  │
     │                          │ 3. Validate data        │
     │                          │                          │
     │                          │ 4. Call Mongoose        │
     │                          ├─────────────────────→  │
     │                          │                 db.collection
     │                          │                 .insertOne(data)
     │                          │                          │
     │                          │ 5. Return result       │
     │                          │ ←─────────────────────  │
     │  6. Send JSON response   │                          │
     │ ←────────────────────────┤                          │
     │                          │                          │
     │ 7. Update React state    │                          │
     │    & re-render UI        │                          │
     │                          │                          │
```

### Data Models

```
┌─────────────────────────────────────────────────────────┐
│                    USER Model                           │
├─────────────────────────────────────────────────────────┤
│ _id:        ObjectId (auto-generated)                  │
│ name:       String (required)                          │
│ email:      String (required, unique)                  │
│ role:       String (e.g., "developer")                 │
│ avatar:     String (emoji or URL)                      │
│ signature:  String (optional)                          │
│ createdAt:  Date (auto-generated)                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  ROADMAP Model                          │
├─────────────────────────────────────────────────────────┤
│ _id:        ObjectId (auto-generated)                  │
│ goal:       String (learning goal)                     │
│ userId:     String (reference to User)                 │
│ steps:      Array of STEP objects                      │
│ status:     Enum: Draft|In Progress|Completed         │
│ createdAt:  Date (auto-generated)                      │
│                                                        │
│ steps: [                                               │
│   {                                                    │
│     title:       String                                │
│     description: String                                │
│     duration:    String (e.g., "2 weeks")              │
│     milestone:   String (achievement goal)             │
│     completed:   Boolean                               │
│     notes:       String (optional)                     │
│   }                                                    │
│ ]                                                      │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

```
Frontend Layer:
├── React 19             (UI framework)
├── TypeScript           (Type safety)
├── Vite                 (Module bundler)
├── Tailwind CSS         (Styling)
└── Axios/Fetch          (HTTP client)
                             ↓
Network Layer (HTTP/REST):
├── CORS                 (Cross-origin requests)
├── JSON                 (Data format)
└── REST APIs            (Resource-based endpoints)
                             ↓
Backend Layer:
├── Node.js              (JavaScript runtime)
├── Express.js           (Web framework)
├── TypeScript           (Type safety)
├── Mongoose             (ORM/ODM)
└── Nodemon              (Development auto-reload)
                             ↓
Database Layer:
├── MongoDB              (NoSQL database)
├── Collections          (Tables equivalent)
├── Documents            (JSON-like records)
└── Schemas              (Data validation)
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Development                            │
│                                                         │
│  Local Machine                                          │
│  ├── localhost:5173 (Frontend - Vite dev server)       │
│  ├── localhost:5000 (Backend - Express + ts-node)      │
│  └── localhost:27017 (Database - MongoDB local)        │
└─────────────────────────────────────────────────────────┘

                        ↓ (npm run build)

┌─────────────────────────────────────────────────────────┐
│                   Production                            │
│                                                         │
│  Frontend (Static Files)                                │
│  ├── Vercel / Netlify                                  │
│  ├── AWS S3 + CloudFront                               │
│  └── dist/ folder (minified HTML/CSS/JS)               │
│                                                         │
│  Backend (Node.js Server)                               │
│  ├── Heroku / Railway / Render                         │
│  ├── AWS EC2 / Lambda                                  │
│  └── Docker container                                  │
│                                                         │
│  Database                                               │
│  ├── MongoDB Atlas (Cloud)                             │
│  └── AWS DocumentDB                                    │
└─────────────────────────────────────────────────────────┘
```

### API Endpoint Structure

```
Health Check
  GET /api/health
    → { status: "Server is running", timestamp: "..." }

Users API
  GET    /api/users                  → Get all users
  GET    /api/users/:id              → Get single user
  POST   /api/users                  → Create user
  PUT    /api/users/:id              → Update user
  DELETE /api/users/:id              → Delete user

Roadmaps API
  GET    /api/roadmaps/:userId       → Get user's roadmaps
  GET    /api/roadmaps/detail/:id    → Get single roadmap
  POST   /api/roadmaps               → Create roadmap
  PUT    /api/roadmaps/:id           → Update roadmap
  DELETE /api/roadmaps/:id           → Delete roadmap
```

### Environment Variables Map

```
┌─────────────────────┐
│   .env.local        │
├─────────────────────┤
│ Frontend:           │
│  VITE_API_URL       → Points to backend
│                       ↓
│ Backend:            │
│  MONGODB_URI        → DB connection
│  PORT               → Server port
│  NODE_ENV           → dev/prod
│                       ↓
│ External APIs:      │
│  GEMINI_API_KEY     → AI service
│  API_KEY (backup)   │
└─────────────────────┘
```

### Error Handling Flow

```
Request from Frontend
        ↓
Express Middleware
        ↓
Route Handler
        ↓
Mongoose Query
        ↓
    ┌─────────────────────┐
    │  Operation Result   │
    └─────────────────────┘
      ↙                   ↖
   Success              Error
     ↓                    ↓
  Return Data    Catch Block
     ↓                    ↓
  200-201            400-500
  Status            Status
     ↓                    ↓
  JSON               Error JSON
Response            Response
     ↓                    ↓
Frontend          Frontend
Updates UI      Shows Error
```

### Development Workflow

```
Start:
┌──────────────────────────────────────────┐
│  npm run dev:all                         │
│  Runs:                                   │
│  • Vite dev server (HMR enabled)         │
│  • Express server (nodemon watching)     │
│  • TypeScript compilation                │
└──────────────────────────────────────────┘
        ↓
Save File
        ↓
┌──────────────────────────────────────────┐
│  Automatic Reload:                       │
│  • .tsx file → React HMR updates UI     │
│  • .ts file → TypeScript recompiles     │
│  • server/* → Express restarts via      │
│     nodemon                              │
└──────────────────────────────────────────┘
        ↓
Browser Shows
Updated Page
```

---

**Complete system with multiple layers working in harmony! 🎯⚓**
