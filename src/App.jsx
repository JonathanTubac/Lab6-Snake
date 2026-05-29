import Board from './components/Board'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }])

  return (
    <>
    <h1>Snake game</h1>
      <Board snake={snake} />
      
    </>
  )
}

export default App
