import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, LoaderFunctionArgs, RouterProvider } from 'react-router-dom'
import { Menu } from './Menu.tsx'
import { Wordle } from './Wordle.tsx'
import { WordleDuel } from './WordleDuel.tsx'

export async function loader({ params }: LoaderFunctionArgs) {
  return { gameId: params.gameId };
}

const router  = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Menu />
      },
      {
        path: 'single',
        element: <Wordle word='APPLE'  />
      },
      {
        path: 'duel/:gameId',
        element: <WordleDuel />,
        loader
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
