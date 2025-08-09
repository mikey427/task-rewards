# 🏠 ChoresRfun

> A time-based chore management system that gamifies household tasks to motivate adults

ChoresRfun is a full-stack web application designed to help adults stay motivated with household tasks by rewarding completion with "time" currency that can be spent in a virtual shop. While originally designed for adult motivation, it can also be useful for parents managing family chores. Built with a modern tech stack featuring Go backend and React frontend.

## ✨ Features

### Core Functionality

- **🔐 User Authentication** - Secure JWT-based login system with HTTP-only cookies
- **📋 Chore Management** - Create, edit, delete, and complete chores with time rewards
- **🏪 Virtual Shop** - Redeem earned time for rewards and privileges
- **💰 Time Wallet** - Track time balance and spending history
- **📈 Activity History** - View completed chores and purchases over time
- **📱 Responsive UI** - Modern interface built with shadcn/ui components

### Current Status

**MVP Progress: ~85% Complete**

✅ **Completed Features:**

- User authentication and authorization
- Full chore CRUD operations with frontend integration
- Shop system with item management and redemption
- Time wallet with balance tracking
- Transaction history logging
- Responsive UI with confirmation modals

🔄 **In Progress:**

- Dashboard balance display integration
- Final MVP polish and testing

## 🛠️ Tech Stack

### Backend

- **Language:** Go 1.24.5
- **Framework:** Gin web framework
- **Database:** PostgreSQL with GORM ORM
- **Authentication:** JWT tokens with HTTP-only cookies
- **Key Packages:**
  - `gin-gonic/gin` - Web framework
  - `gorm.io/gorm` - Database ORM
  - `golang-jwt/jwt` - JWT handling
  - `joho/godotenv` - Environment configuration

### Frontend

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Routing:** React Router v7
- **State Management:** React Context
- **Key Dependencies:**
  - `react` & `react-dom` v19
  - `tailwindcss` v4
  - `lucide-react` - Icons
  - `sonner` - Toast notifications

## 🚀 Getting Started

### Prerequisites

- **Go** 1.24+ installed
- **Node.js** 18+ and npm
- **PostgreSQL** database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ChoresRfun.git
   cd ChoresRfun
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   
   # Install dependencies
   go mod download
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Run the server
   go run main.go
   ```
   
   Backend runs on `http://localhost:8080`

3. **Frontend Setup**

   ```bash
   cd Frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```
   
   Frontend runs on `http://localhost:5173`

### Environment Variables

Create a `.env` file in the Backend directory:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=choresrfun
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
```

## 📁 Project Structure

```
ChoresRfun/
├── Backend/                    # Go backend application
│   ├── internal/
│   │   ├── controllers/        # HTTP request handlers
│   │   ├── models/             # Database models
│   │   ├── middleware/         # Authentication middleware
│   │   ├── database/           # Database connection & sync
│   │   └── config/             # Configuration management
│   ├── pkg/                    # Public packages
│   ├── utils/                  # Utility functions
│   └── main.go                 # Application entry point
│
├── Frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   └── lib/                # Utilities
│   ├── public/                 # Static assets
│   └── package.json
│
├── CLAUDE.md                   # Development instructions
└── MVP_PROGRESS.md             # Feature tracking
```

## 🔄 Development Workflow

### Backend Development

```bash
# Run with auto-reload (if CompileDaemon is available)
CompileDaemon.exe -directory=./

# Or standard go run
go run main.go

# Build executable
go build -o Backend.exe .
```

### Frontend Development

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run build

# Linting
npm run lint

# Production preview
npm run preview
```
