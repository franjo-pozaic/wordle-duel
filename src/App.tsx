import './styles/global.css';
import { Wordle } from './Wordle';


const ALL_WORDS = [
  // 'BAWDY',
  // 'CORGY',
  // 'SPEAK',
  'APPLE',
  // 'DOORS',
  // 'BOXES',
  // 'COUCH'
]

function App() {
  const pickedWord = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
   return (
    <>
      <div>
        <h1>
          Wordle
        </h1>
      </div>
      <div>
        <Wordle word={pickedWord} />
      </div>
    </>
  )
}

export default App
