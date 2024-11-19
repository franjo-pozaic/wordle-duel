import './styles/global.css';
import './WordleDuel.css';
import { Wordle } from './Wordle';
import { getSocket } from './socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Letter } from './models';
import { useLoaderData } from 'react-router-dom';
import { Board } from './Board';
import { getBoardData } from './utils/boardUtils';

export type GameData = {
    word: string;
    id: string;
}

export const WordleDuel: React.FC = () => {
    const { gameId } = useLoaderData() as { gameId: string };
    const [gameData, setGameData] = useState<GameData>();
    const socketRef = useRef<Socket | null>(null);
    const initialBoardData = getBoardData([[]], '')
    const [boardData, setBoardData] = useState<Letter[][]>(initialBoardData);
    const [ready, setReady] = useState<boolean>(false);

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
    }, [gameId]);

    useEffect(() => {
        function onBoardData(value: Letter[][]) {
            console.log(value);
            setBoardData(value);
        }

        function onReadySignal() {
            console.log('Ready signal received!');
            
            setReady(true);
        }
        if (gameData) {
            console.log('getSocket effect');
            socketRef.current = getSocket(gameData.id);
            socketRef.current.on('connect', () => {
                console.log('Connected');
                
            });
            socketRef.current?.on('move', onBoardData);
            socketRef.current?.on('ready', onReadySignal);
        }
    }, [gameData]);

    const handleBoardChange = useCallback((board: Letter[][]) => {
        console.log('Board change!');
        
        socketRef.current?.emit('move', board);
    }, []);

    return (
        <>
            {gameData && <p>{`http://localhost:5173/duel/${gameData.id}`}</p>}
            {<p>Is game ready?: {ready.toString()}</p>}
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

