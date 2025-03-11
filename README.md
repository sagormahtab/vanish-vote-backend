# VanishVote Backend

Backend API service for VanishVote - A platform for creating anonymous polls that disappear after a set time.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- SQLite

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory and add:

```bash
DATABASE_URL="file:./dev.db"
PORT=4200
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## API Endpoints

### Polls

- `GET /api/polls` - Get all public polls
- `POST /api/polls` - Create a new poll
- `GET /api/polls/:id` - Get a specific poll
- `POST /api/polls/:id/vote` - Vote on a poll
- `POST /api/polls/:id/reactions` - Add reaction to a poll

### Comments

- `GET /api/polls/:id/comments` - Get comments for a poll
- `POST /api/polls/:id/comments` - Add a comment to a poll

## Features

- Create polls with multiple options
- Automatic poll expiration
- Anonymous voting system
- Real-time vote counting
- Poll reactions (trending/like)
- Anonymous commenting
- Private polls support
- Result hiding capability

## Tech Stack

- Express.js
- TypeScript
- Prisma
- SQLite
- Zod for validation
