import Board from './components/Board'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 }) // empieza moviéndose a la derecha
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      setDirection(prev => {
        if (e.key === 'ArrowUp' && prev.y !== 1) return { x: 0, y: -1 }
        if (e.key === 'ArrowDown' && prev.y !== -1) return { x: 0, y: 1 }
        if (e.key === 'ArrowLeft' && prev.x !== 1) return { x: -1, y: 0 }
        if (e.key === 'ArrowRight' && prev.x !== -1) return { x: 1, y: 0 }
        return prev
      })
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
        if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 30) {
          setGameOver(true)
          return prev // no actualiza la serpiente
        }

        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true)
          return prev
        }
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
