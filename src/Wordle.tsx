import { useCallback, useMemo, useState } from 'react'
import './Wordle.css'
import { Letter} from './Letter';
import { Keyboard } from './Keyboard';
import { Letter as LetterModel , Status } from './models';


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

const l: LetterModel = { char: '', status: 'INITIAL' };

const initialHistory: LetterModel[][] = []

export const Wordle: React.FC<{ word: string }> = ({ word }) => {
  const [history, setHistory] = useState(initialHistory)
  const [currentGuess, setCurrentGuess] = useState('')

  function getStatus(letter: string, index: number): Status {
    const upperCaseLetter = letter.toUpperCase();
    if (word[index] === upperCaseLetter) {
      return 'CORRECT'
    } else if (word.includes(upperCaseLetter)) {
      return 'PARTIAL'
    } else {
      return 'WRONG'
    }
  }

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
    const guess = currentGuess
      .split('')
      .map((letter, index) => ({
        char: letter,
        status: getStatus(letter, index)
      } as LetterModel));
    setHistory(prev => [...prev, guess])
  }, [currentGuess]);

  const handleDeletePress = useCallback(() => {
    setCurrentGuess(currentGuess.slice(0, -1));
  }, [currentGuess]);

  const usedLetters = useMemo(() => {
    const usedLetters = history.flatMap(letters => letters.map(l => l.char));
    return new Set(usedLetters)
  }, [history]);

  const boardData = useMemo(() => {
    const guess = currentGuess
      .padEnd(5, ' ')
      .split('')
      .map((letter) => ({
        char: letter,
        status: 'INITIAL'
      } as LetterModel));

    const filledBoard = [...history, guess];
    const missingRows = 6 - filledBoard.length
    for (let i = 0; i < missingRows; i++) {
      filledBoard.push([l, l, l, l, l])
    }
    return filledBoard;
  }, [currentGuess]);

  const result = useMemo(() => {
    if (history.length === 0) {
      return undefined;
    }
    const lastGuess = history[history.length - 1].map(l => l.char).join('');
    
    if (lastGuess === word) {
      return 'WIN'
    } else if (history.length === 6) {
      return 'LOSS';
    } else {
      return undefined;
    }

  }, [history]);

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
              onEnter={handleEnterPress} />
          </div>
        </div>
    </>
  )
}

