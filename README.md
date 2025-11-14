# AlphaClone Systems 🚀

A fullstack vibe coding app similar to Bolt - build, run, and analyze code in real-time.

## Features

- 🎨 Modern, responsive UI built with React and TypeScript
- ⚡ Fast development with Vite
- 🔧 RESTful API backend with Express and TypeScript
- 💻 Code editor with syntax support for multiple languages
- 🚀 Code execution and analysis endpoints
- 📦 Monorepo structure with workspaces

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- CSS3 with gradient styling

### Backend
- Node.js
- Express
- TypeScript
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/masilo-dev/vibe-coding.git
cd vibe-coding
```

2. Install dependencies:
```bash
npm install
```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

Or run them separately:

**Frontend only:**
```bash
npm run dev:frontend
```

**Backend only:**
```bash
npm run dev:backend
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

### Building for Production

Build both frontend and backend:
```bash
npm run build
```

### Project Structure

```
alphaclone-systems/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── App.tsx   # Main application component
│   │   ├── App.css   # Application styles
│   │   └── main.tsx  # Entry point
│   └── package.json
├── backend/           # Express backend API
│   ├── src/
│   │   └── index.ts  # API server
│   └── package.json
└── package.json       # Root package with workspaces
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/info` - Get API information
- `POST /api/code/execute` - Execute code (placeholder)
- `POST /api/code/analyze` - Analyze code (placeholder)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
