import './styles/global.css';
import { Wordle } from './Wordle';
import { getSocket, socket } from './socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Letter } from './models';

export type GameData = {
    word: string;
    id: string;
}

export const WordleDuel: React.FC<any> = () => {
    const [gameData, setGameData] = useState<GameData>();
    const socketRef = useRef<Socket | null>(null);
 
    useEffect(() => {
        fetch('http://localhost:3000/game', { 
            method: 'POST',
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => setGameData(data))
    }, []);

    useEffect(() => {
        if (gameData) {
            socketRef.current = getSocket(gameData.id)
        }
    }, [gameData, getSocket])

    const handleBoardChange = useCallback((board: Letter[][]) => {
        socketRef.current?.emit('move', [board]);
    }, [])

    return (
        <>
            {gameData && <Wordle 
                word={gameData.word} 
                onBoardChange={handleBoardChange} />}
        </>
    )
}
