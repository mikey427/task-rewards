# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React + TypeScript + Vite)
Located in `Frontend/` directory:
- `npm run dev` - Start development server (runs on http://localhost:5173)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (Go + Gin)
Located in `Backend/` directory:
- `go run main.go` - Start development server (runs on port 8080)
- `CompileDaemon.exe -directory=./` - Auto-reload development (as noted in Backend/notes.md)
- `go build -o Backend.exe .` - Build executable

## Architecture Overview

This is a full-stack web application with authentication using a Go backend and React frontend.

### Backend Structure
- **Framework**: Gin web framework with GORM for database operations
- **Database**: PostgreSQL with GORM models
- **Authentication**: JWT-based authentication with cookie storage
- **API Endpoints**:
  - `POST /api/signup` - User registration
  - `POST /api/login` - User login
  - `GET /api/validate` - Validate authentication (protected route)
- **Key Directories**:
  - `internal/controllers/` - HTTP request handlers
  - `internal/models/` - Database models (User model with GORM)
  - `internal/middleware/` - Authentication middleware
  - `internal/database/` - Database connection and sync
  - `internal/config/` - Environment configuration

### Frontend Structure
- **Framework**: React 19 with TypeScript and Vite
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Routing**: React Router v7 with authentication-based route protection
- **State Management**: React Context for authentication state
- **Key Files**:
  - `src/contexts/AuthContext.tsx` - Authentication context and user state
  - `src/AppRoutes.tsx` - Route protection based on auth status
  - `src/components/ui/` - shadcn/ui component library
  - `src/components/app-sidebar.tsx` - Main application sidebar

### Authentication Flow
- Backend uses JWT tokens stored in HTTP-only cookies
- Frontend AuthContext manages user state and authentication status
- Routes are protected based on authentication state in AppRoutes.tsx
- API calls include credentials for cookie-based authentication

### Environment Configuration
- Backend uses environment variables loaded via godotenv
- Frontend configured for development with backend on localhost:8080
- CORS configured to allow requests from frontend (localhost:5173)

### Development Notes
- Frontend uses absolute imports with `@/` alias pointing to `src/`
- Backend follows Go project structure with internal packages
- Authentication state is checked on app initialization
- Currently in development phase with core MVP features ~75% complete

### Current Development Status
**Last Updated: August 8, 2025**

#### Completed Features ✅
- **Authentication System**: JWT-based auth with HTTP-only cookies (July 26)
- **Chore Management**: Full CRUD operations with frontend integration (August 8)
  - Create, view, edit, delete chores
  - Complete chores with reward system
  - Confirmation modals for user actions
- **Shop System Backend**: Item management and API routes (August 2025)
- **Time Wallet Backend**: Balance tracking and transaction models (August 3)
- **UI Framework**: shadcn/ui components with responsive design

#### In Progress 🔄
- Shop item redemption functionality
- Dashboard balance display
- History log frontend implementation

#### Technical Achievements
- **Backend**: Go + Gin + GORM + PostgreSQL architecture
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **State Management**: React Context for authentication and user state
- **Database Models**: Users, Chores, Shop Items, Transactions (ChoreCompletion, Purchase)
- **API Integration**: Credential-based requests with proper error handling

#### Next Priorities
1. Complete shop redemption with time deduction
2. Dashboard balance integration
3. History log display
4. Final MVP testing and polish

See `MVP_PROGRESS.md` for detailed feature tracking and development timeline.

## Claude Behavior Configuration

### Current Mode: DEVELOPMENT
<!-- Update this manually when you want to change modes -->

### Available Modes

#### DEVELOPMENT (Default)
- Full development assistance including code writing, editing, and execution
- Run commands, create files, and make changes to the codebase
- Provide implementation solutions with explanations
- Debug and troubleshoot issues actively

#### LEARNING_ONLY
- ONLY provide explanations, code analysis, and educational content
- NEVER write, edit, create files, or run commands
- When asked to implement something, explain how it would be done instead
- Focus on teaching concepts, best practices, and code understanding
- Break down complex concepts with step-by-step explanations
- Suggest alternative approaches and discuss trade-offs

#### REVIEW_ONLY
- Analyze existing code and provide feedback
- Suggest improvements and identify potential issues
- NEVER make actual changes to files
- Provide detailed code reviews with recommendations
- Explain best practices and point out areas for enhancement

### Override Instructions
You can override the current mode behavior at any time by explicitly stating:
- "Override mode and [action]" - e.g., "Override mode and write this function"
- "Ignore learning mode for this task"
- "Just show me the code for this"

When overridden, I will perform the requested action regardless of the current mode, then return to the configured mode for subsequent interactions.