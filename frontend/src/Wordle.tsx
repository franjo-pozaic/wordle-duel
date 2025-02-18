import { useCallback, useMemo, useState } from 'react'
import './Wordle.css'
import { Keyboard } from './Keyboard';
import { Letter as LetterModel } from './models';
import { getBoard } from './utils/boardUtils';
import { getResult } from './utils/resultUtils';
import { getUsedLetters } from './utils/letterUtils';
import { Board } from './Board';


const EndingMessage: React.FC<{ result: 'WIN' | 'LOSS' }> = ({ result }) => {
  return (<>
    <div role="ending-message" className='victory'>
      {result === 'WIN' ? 'You won!' : 'Try again!'}
    </div>
  </>
  )
}

export const Wordle: React.FC<{ word: string, onBoardChange?: (board: LetterModel[][]) => void }> = ({ word, onBoardChange }) => {
  const [history, setHistory] = useState([] as Array<string>);
  const [guess, setGuess] = useState('');

  const handleKeyboardPress = useCallback((letter: string) => {
    if (guess.length === 5) {
      return;
    }
    
    setGuess(g => g + letter);
  }, [guess]);

  const handleEnterPress = useCallback(() => {
    if (guess.length !== 5) {
      return;
    }
    const newHistory = [...history, guess];
    setGuess('');
    setHistory(newHistory);
    if (onBoardChange) {
      const board = getBoard(newHistory, guess, word);
      onBoardChange(board);
    }
  }, [word, guess]);

  const handleDeletePress = useCallback(() => {
    if (guess.length === 0) {
      return;
    }
    setGuess(g => g.slice(0, -1));
  }, [guess]);

  const board = useMemo(() => getBoard(history, guess, word), [history, guess, word]);
  const usedLetters = useMemo(() => getUsedLetters(board), [board]);
  const result = useMemo(() => getResult(history, word), [history, word]);

  return (
    <>
      <div className='wordle-container'>
        <Board boardData={board} />
        {
          result && <EndingMessage result={result} />
        }
        <div className='item'>
          <Keyboard
            onKeyPress={handleKeyboardPress}
            usedLetters={usedLetters}
            onDelete={handleDeletePress}
            onEnter={handleEnterPress}
            disable={Boolean(result)} />
        </div>
      </div>
    </>
  )
}

