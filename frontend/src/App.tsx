import './styles/global.css';
import { WordleDuel } from './WordleDuel';

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
   return (
    <>
      <div>
        <h1>
          Wordle
        </h1>
      </div>
      <div>
        <WordleDuel />
      </div>
    </>
  )
}

export default App
