import './styles/global.css';
import './WordleDuel.css';
import { Wordle } from './Wordle';
import { useCallback, useEffect, useState } from 'react';
import { GameSummary, Letter } from './models';
import { getSummary } from './utils/boardUtils';
import { OpponentContext } from './OpponentContext';
import { useGameSocket } from './hooks/useGameSocket';
import { useGameData, useGameId } from './hooks/useGameData';
import { CopyButton } from './CopyToClipboard';


export const WordleDuel: React.FC = () => {
    const gameId = useGameId();
    const [countdown, setCountdown] = useState(10);
    const gameData = useGameData(gameId);
    const { boardData, ready, socketRef } = useGameSocket(gameData)

    useEffect(() => {
        if (ready == true && countdown > 0) {
            setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);            
        }
    }, [ready, countdown]);

    const handleBoardChange = useCallback((board: Letter[][]) => {
        socketRef.current?.emit('move', board);
    }, []);

    const opponentSummary: GameSummary = getSummary(boardData);

    function getGameLink(id: string) {
        return `${window.origin}/duel/${id}`;
    }

    return (
        <>
            {gameData && <CopyButton text={getGameLink(gameData.id)} />}
            <div className='duel-board-container'>
                <div className='my-board'>
                    <div className={!ready || countdown > 0 ? 'blurred unclickable' : ''}>
                        {
                            gameData && 
                            <OpponentContext.Provider value={opponentSummary}>
                                <Wordle word={gameData.word} onBoardChange={handleBoardChange} />
                            </OpponentContext.Provider>
                        }
                    </div>
                    <div className='text-overlay'>
                        <div>
                            {
                                ready === false ? 
                                <p>Waiting for opponent</p> :
                                <p>{countdown > 0 ? countdown : ''}</p>}
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}
