// Install socket.io-client if you haven't yet
// npm install socket.io-client

const io = require('socket.io-client');

// Connect to the duel namespace
const socket = io('http://localhost:3000/duel', {
  query: {
    "gameId": "room1"
  }
}); 

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('move', { board: [['Hello']] });
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('move', (e) => {
  
  console.log(e)
});