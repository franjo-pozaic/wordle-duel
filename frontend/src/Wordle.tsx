import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import './Wordle.css'
import { Keyboard } from './Keyboard';
import { Letter as LetterModel } from './models';
import { getBoardData } from './utils/boardUtils';
import { getResult } from './utils/resultUtils';
import { getLetterModel, getUsedLetters } from './utils/letterUtils';
import { Board } from './Board';


const EndingMessage: React.FC<{ result: 'WIN' | 'LOSS' }> = ({ result }) => {
  return (<>
    <div role="ending-message" className='victory'>
      {result === 'WIN' ? 'You won!' : 'Try again!'}
    </div>
  </>
  )
}


type GuessState = {
  guess: string;
}
const initialState: GuessState = { guess: '' };
type TypingAction =
  | { type: 'new_letter', payload: string; }
  | { type: 'delete' }
  | { type: 'initialize' }

const reducer = (state: GuessState, action: TypingAction) => {
  switch (action.type) {
    case 'delete':
      return { guess: state.guess.slice(0, -1) };
    case 'new_letter':
      return { guess: state.guess + action.payload }
    case 'initialize':
      return { guess: '' }
  }
}

const initialHistory: LetterModel[][] = []

export const Wordle: React.FC<{ word: string, onBoardChange?: (board: LetterModel[][]) => void }> = ({ word, onBoardChange }) => {
  const [history, setHistory] = useState(initialHistory);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKeyboardPress = useCallback((letter: string) => {
    if (state.guess.length === 5) {
      return;
    }
    dispatch({ type: 'new_letter', payload: letter });
  }, [state.guess]);

  const handleEnterPress = useCallback(() => {
    if (state.guess.length !== 5) {
      return;
    }
    const guess = getLetterModel(state.guess, word);
    dispatch({ type: 'initialize' });
    setHistory(prev => [...prev, guess])
  }, [word, state.guess]);

  const handleDeletePress = useCallback(() => {
    dispatch({ type: 'delete' });
  }, []);

  const usedLetters = useMemo(() => getUsedLetters(history), [history]);
  const boardData = useMemo(() => getBoardData(history, state.guess), [history, state]);
  const result = useMemo(() => getResult(history, word), [history, word]);

  useEffect(() => {
    if (onBoardChange) {
      onBoardChange(boardData);
    }
  }, [boardData, onBoardChange]);

  return (
    <>
      <div className='wordle-container'>
        <Board boardData={boardData} />
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

