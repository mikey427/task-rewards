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
- Currently in development phase with basic auth infrastructure complete