# Captain's Quest AI Roadmap Generator

A full-stack application with React frontend and Express.js backend for generating personalized AI-powered learning roadmaps.

## Setup & Installation

### Prerequisites

- Node.js (v18+)
- npm
- MongoDB (local or Atlas cloud)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_gemini_api_key_here
API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/captain-quest
PORT=5000
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

**Option 1: Frontend only**

```bash
npm run dev
```

**Option 2: Backend only**

```bash
npm run server:dev
```

**Option 3: Both frontend and backend (recommended)**

```bash
npm run dev:all
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── src/                    # Frontend (React + TypeScript)
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── App.tsx
│   └── index.tsx
├── server/                # Backend (Express + Node.js)
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   └── index.ts           # Server entry point
└── package.json
```

## API Endpoints

### Roadmaps

- `GET /api/roadmaps/:userId` - Get all roadmaps for a user
- `GET /api/roadmaps/detail/:id` - Get a single roadmap
- `POST /api/roadmaps` - Create a new roadmap
- `PUT /api/roadmaps/:id` - Update a roadmap
- `DELETE /api/roadmaps/:id` - Delete a roadmap

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Health Check

- `GET /api/health` - Server health status

## Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: MongoDB with Mongoose
- **API**: RESTful API with CORS support
- **AI**: Google Gemini API for roadmap generation
