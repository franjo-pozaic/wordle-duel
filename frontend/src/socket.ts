import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000/duel';


export const getSocket = (gameId: string) => io(URL, {
    query: {
        gameId
    }
});