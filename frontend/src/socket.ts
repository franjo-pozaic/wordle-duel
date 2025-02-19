import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : '/api';

export const getSocket = (gameId: string) => io(`/duel`, {
    query: {
        gameId
    }
});