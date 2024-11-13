import './styles/global.css';
import './WordleDuel.css';
import { Wordle } from './Wordle';
import { getSocket } from './socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Letter } from './models';
import { useLoaderData } from 'react-router-dom';
import { Board } from './Board';

export type GameData = {
    word: string;
    id: string;
}

export const WordleDuel: React.FC<any> = () => {
    const { gameId } = useLoaderData() as any;
    const [gameData, setGameData] = useState<GameData>();
    const socketRef = useRef<Socket | null>(null);
    const [boardData, setBoardData] = useState<Letter[][]>([[]]);
    const [socketId, setSocketId] = useState<any>();

    useEffect(() => {
        if (gameId === 'new') {
            fetch('http://localhost:3000/game', {
                method: 'POST',
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(data => setGameData(data));
        } else {
            fetch(`http://localhost:3000/game/${gameId}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => setGameData(data));
        }
    }, []);

    useEffect(() => {
        function onBoardData(value: Letter[][]) {
            console.log(value);
            setBoardData(value);
        }
        if (gameData) {
            console.log('getSocket effect');
            socketRef.current = getSocket(gameData.id);
            socketRef.current.on('connect', () => {
                socketRef.current?.on('move', onBoardData);
                setSocketId(socketRef.current?.id);
            })
        }
    }, [gameData, getSocket]);

    const handleBoardChange = useCallback((board: Letter[][]) => {
        console.log('Board change!');
        
        socketRef.current?.emit('move', board);
    }, []);

    return (
        <>
            {socketRef.current && <p>Socket: {socketId}</p>}
            {gameData && <p>{`http://localhost:5173/duel/${gameData.id}`}</p>}
            <div className='duel-board-container'>
                <div className='my-board'>
                    {gameData && <Wordle
                        word={gameData.word}
                        onBoardChange={handleBoardChange} />}
                </div>
                <div className='opponent-board'>
                    {gameData && <Board boardData={boardData} />}
                </div>
            </div>
        </>
    )
}

