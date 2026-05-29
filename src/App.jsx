import Board from './components/Board'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 }) // empieza moviéndose a la derecha

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key == 'ArrowUp') setDirection({ x: 0, y: -1 })
      if (e.key == 'ArrowDown') setDirection({ x: 0, y: 1 })
      if (e.key == 'ArrowLeft') setDirection({ x: -1, y: 0 })
      if (e.key == 'ArrowRight') setDirection({ x: 1, y: 0 })
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        }
        // nueva serpiente: nueva cabeza + todo menos el último segmento
        return [newHead, ...prev.slice(0, -1)]
      })
    }, 200)

    return () => clearInterval(interval)
  }, [direction]) // se reinicia cada vez que cambia la dirección
  return (
    <>
      <h1>Snake game</h1>
      <Board snake={snake} />

    </>
  )
}

export default App
