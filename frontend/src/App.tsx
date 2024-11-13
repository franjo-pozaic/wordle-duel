import { Outlet } from 'react-router-dom';
import './styles/global.css';

function App() {
   return (
    <>
      <div>
        <h1>
          Wordle
        </h1>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
