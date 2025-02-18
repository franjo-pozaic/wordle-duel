import './styles/global.css';
import './WordleDuel.css';
import { Wordle } from './Wordle';
import { getSocket } from './socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Letter } from './models';
import { useLoaderData } from 'react-router-dom';
import { Board } from './Board';
import { getBoard } from './utils/boardUtils';

export type GameData = {
    word: string;
    id: string;
}

export const WordleDuel: React.FC = () => {
    const { gameId } = useLoaderData() as { gameId: string };
    const [gameData, setGameData] = useState<GameData>();
    const socketRef = useRef<Socket | null>(null);
    const initialBoardData = getBoard([], '', '')
    const [boardData, setBoardData] = useState<Letter[][]>(initialBoardData);
    const [ready, setReady] = useState<boolean>(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (ready == true && countdown > 0) {
            setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);            
        }
    }, [ready, countdown]);

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
        if (gameData) {
            console.log('getSocket effect');
            socketRef.current = getSocket(gameData.id);
            socketRef.current.on('connect', () => {
                console.log('Connected');

            });
            socketRef.current?.on('move', (value: Letter[][]) => {
                setBoardData(value);
            });
            socketRef.current?.on('ready', () => {
                setReady(true);
            });
        }
    }, [gameData]);

    const handleBoardChange = useCallback((board: Letter[][]) => {
        console.log('Board change!');

        socketRef.current?.emit('move', board);
    }, []);

    return (
        <>
            {gameData && <p>{`http://localhost:5173/duel/${gameData.id}`}</p>}
            <div className='duel-board-container'>
                <div className='my-board'>
                    <div className={!ready || countdown > 0 ? 'blurred unclickable' : ''}>
                        {
                            gameData && 
                            <Wordle word={gameData.word} onBoardChange={handleBoardChange} />
                        }
                    </div>
                    <div className='text-overlay'>
                        <p>
                            {
                                ready === false ? 
                                <p>Waiting for opponent</p> :
                                <p>{countdown > 0 ? countdown : ''}</p>}
                        </p>
                    
                    </div>
                </div>
                <div className='opponent-board'>
                    {gameData && <Board boardData={boardData} />}
                </div>
            </div>
        </>
    )
}

