import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { Letter } from './Letter';
import { Keyboard } from './Keyboard';

export type Status = 'INITIAL' | 'WRONG' | 'PARTIAL' | 'CORRECT'

export type Letter = {
  char: string;
  status: Status;
}

const ALL_WORDS = [
  'BAWDY',
  // 'CORGY',
  // 'SPEAK',
  // 'APPLE',
  // 'DOORS',
  // 'BOXES',
  // 'COUCH'
]

const Guess: React.FC<{ word: Letter[] }> = ({ word }) => {
  return (
    <>
      {word.map((letter, index) => <Letter key={`${letter.char}${index}`} char={letter.char} status={letter.status} />)}
    </>
  )
}

const l: Letter = { char: '', status: 'INITIAL' };

const initialHistory: Letter[][] = []

function getUsedLetters(letters: Letter[][]): string[] {
  const uniqueLetters = new Set<string>();
  letters.forEach(
    word => word.forEach(
      letter => uniqueLetters.add(letter.char)
    )
  );
  return [...uniqueLetters];
}

function App() {
  const pickedWord = ALL_WORDS[0]
  const [history, setHistory] = useState(initialHistory)
  const [currentGuess, setCurrentGuess] = useState('')

  function getStatus(letter: string, index: number): Status {
    const upperCaseLetter = letter.toUpperCase();
    if (pickedWord[index] === upperCaseLetter) {
      return 'CORRECT'
    } else if (pickedWord.includes(upperCaseLetter)) {
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
      } as Letter));
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
      } as Letter));

    const filledBoard = [...history, guess];
    const missingRows = 6 - filledBoard.length
    for (let i = 0; i < missingRows; i++) {
      filledBoard.push([l, l, l, l, l])
    }
    return filledBoard;
  }, [currentGuess]);

  return (
    <>
      <div>
        <h1>
          Wordle
        </h1>
      </div>
      <div>
        <div className='wordle-container'>
          <div className='wordle-grid item'>
            {boardData.map((word, index) => <Guess
              key={word.map(l => l.char).join('') + index.toString()}
              word={word} />)}
          </div>
          <div className='item'>
            <Keyboard
              onKeyPress={handleKeyboardPress}
              usedLetters={usedLetters}
              onDelete={handleDeletePress}
              onEnter={handleEnterPress} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
