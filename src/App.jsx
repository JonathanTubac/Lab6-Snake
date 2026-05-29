import Board from './components/Board'
import Header from './components/Header'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }])
  const [direction, setDirection] = useState({ x: 1, y: 0 }) // empieza moviéndose a la derecha
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [food, setFood] = useState({ x: 5, y: 5 })
  const foodRef = useRef(food)

  useEffect(() => { foodRef.current = food }, [food])

  const generateFood = (currentSnake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      }
    } while (currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y))

    return newFood
  }

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }])
    setDirection({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
  }

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
    if (gameOver) return

    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        }
        if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 30) {
          setGameOver(true)
          return prev
        }

        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true)
          return prev
        }

        const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y

        if (ateFood) {
          setFood(generateFood(prev))
          setScore(s => s + 10)
        }

        return ateFood
          ? [newHead, ...prev]
          : [newHead, ...prev.slice(0, -1)]
      })
    }, 100)



    return () => clearInterval(interval)
  }, [direction, gameOver])
  return (
    <div className="app">
      <Header score={score} />
      <Board
        snake={snake}
        food={food}
        gameOver={gameOver}
        score={score}
        onRestart={handleRestart}
      />

    </div>
  )
}

export default App
