import { useCallback, useMemo, useState } from 'react'
import './Wordle.css'
import { Letter} from './Letter';
import { Keyboard } from './Keyboard';
import { Letter as LetterModel } from './models';
import { getBoardData } from './utils/boardUtils';
import { getResult } from './utils/resultUtils';
import { getLetterModel, getUsedLetters } from './utils/letterUtils';


const EndingMessage: React.FC<{ result: 'WIN' | 'LOSS' }> = ({ result }) => {
  return (<>
      <div role="ending-message" className='victory'>
        { result === 'WIN' ? 'You won!' : 'Try again!' }
      </div>
    </>
  )
}

const Guess: React.FC<{ word: LetterModel[] }> = ({ word }) => {
  return (
    <>
      {word.map((letter, index) => <Letter key={`${letter.char}${index}`} char={letter.char} status={letter.status} />)}
    </>
  )
}


const initialHistory: LetterModel[][] = []

export const Wordle: React.FC<{ word: string }> = ({ word }) => {
  const [history, setHistory] = useState(initialHistory)
  const [currentGuess, setCurrentGuess] = useState('')

  const handleKeyboardPress = useCallback((letter: string) => {
    if (currentGuess.length === 5) {
      return;
    }
    setCurrentGuess(prev => prev + letter);
  }, [currentGuess]);

  const handleEnterPress = useCallback(() => {
    if (currentGuess.length !== 5) {
      return;
    }
    setCurrentGuess('')
    const guess = getLetterModel(currentGuess, word); 
    setHistory(prev => [...prev, guess])
  }, [currentGuess]);

  const handleDeletePress = useCallback(() => {
    setCurrentGuess(currentGuess.slice(0, -1));
  }, [currentGuess]);

  const usedLetters = useMemo(() => getUsedLetters(history), [history]);
  const boardData = useMemo(() => getBoardData(history, currentGuess), [currentGuess]);
  const result = useMemo(() => getResult(history, word), [history]);

  return (
    <>
        <div className='wordle-container'>
          <div className='wordle-grid item'>
            {boardData.map((word, index) => 
            <Guess
              key={word.map(l => l.char).join('') + index.toString()}
              word={word} />)}
          </div>
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

