import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Menu } from './Menu.tsx'
import { Wordle } from './Wordle.tsx'
import { WordleDuel } from './WordleDuel.tsx'

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
        path: 'duel',
        element: <WordleDuel />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
