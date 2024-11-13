# Wordle Duel

A two-player Wordle game built with a Nest.js backend and React frontend. Players compete in real time, with the first to guess the word winning the game.

Features
* Two-Player Competition: Players join a unique game room and compete to guess the word.
* Real-Time Updates: Game state is synced across players using Socket.IO.
* Unique Game Rooms: Each game generates a sharable URL to invite a friend.

## Tech Stack
Backend: Nest.js, Socket.IO
Frontend: React, TypeScript

## Getting Started

Clone and Install:

```bash
git clone https://github.com/franjo-pozaic/wordle.git
cd wordle
cd frontend
npm install

cd ../backend
npm install
```

# Backend
```bash
cd backend
npm run start:dev
```

# Frontend
```bash
cd ../frontend
npm run dev
```

Play the Game: Open http://localhost:5173 to start or join a game.
