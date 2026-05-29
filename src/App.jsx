import Board from './components/Board'
import Header from './components/Header'
import Menu from './components/Menu'
import { useEffect, useRef, useState } from 'react'
import './App.css'

const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
const INITIAL_DIR = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 5, y: 5 }

const getSpeed = (difficulty, score) => {
  if (difficulty === 'easy')   return 150
  if (difficulty === 'normal') return 100
  if (difficulty === 'hard')   return 60
  return Math.max(40, 150 - Math.floor(score / 30) * 10)
}

function App() {
  const [gameState, setGameState]   = useState('menu') // 'menu' | 'playing'
  const [difficulty, setDifficulty] = useState('normal')
  const [snake, setSnake]           = useState(INITIAL_SNAKE)
  const [direction, setDirection]   = useState(INITIAL_DIR)
  const [gameOver, setGameOver]     = useState(false)
  const [score, setScore]           = useState(0)
  const [food, setFood]             = useState(INITIAL_FOOD)

  const foodRef       = useRef(food)
  const directionRef  = useRef(direction)
  const scoreRef      = useRef(score)
  const difficultyRef = useRef(difficulty)
  const eatSound      = useRef(new Audio('/eat.wav'))
  const gameOverSound = useRef(new Audio('/game_over.wav'))

  useEffect(() => { foodRef.current = food },           [food])
  useEffect(() => { directionRef.current = direction }, [direction])
  useEffect(() => { scoreRef.current = score },         [score])
  useEffect(() => { difficultyRef.current = difficulty }, [difficulty])

  const generateFood = (currentSnake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30),
      }
    } while (currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y))
    return newFood
  }

  const handleStart = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty)
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIR)
    setScore(0)
    setFood(INITIAL_FOOD)
    setGameOver(false)
    setGameState('playing')
  }

  const handleRestart = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIR)
    setScore(0)
    setFood(INITIAL_FOOD)
    setGameOver(false)
  }

  const handleBackToMenu = () => {
    setGameOver(false)
    setGameState('menu')
  }

  // Teclas
  useEffect(() => {
    const handleKey = (e) => {
      setDirection(prev => {
        if (e.key === 'ArrowUp'    && prev.y !== 1)  return { x: 0,  y: -1 }
        if (e.key === 'ArrowDown'  && prev.y !== -1) return { x: 0,  y: 1  }
        if (e.key === 'ArrowLeft'  && prev.x !== 1)  return { x: -1, y: 0  }
        if (e.key === 'ArrowRight' && prev.x !== -1) return { x: 1,  y: 0  }
        return prev
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Game loop con setTimeout recursivo para soportar velocidad dinámica (modo auto)
  useEffect(() => {
    if (gameState !== 'playing' || gameOver) return

    let timeoutId

    const tick = () => {
      setSnake(prev => {
        const dir = directionRef.current
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y }

        if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 30) {
          gameOverSound.current.currentTime = 0
          gameOverSound.current.play()
          setGameOver(true)
          return prev
        }
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          gameOverSound.current.currentTime = 0
          gameOverSound.current.play()
          setGameOver(true)
          return prev
        }

        const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y
        if (ateFood) {
          eatSound.current.currentTime = 0
          eatSound.current.play()
          setFood(generateFood(prev))
          setScore(s => s + 10)
        }

        return ateFood ? [newHead, ...prev] : [newHead, ...prev.slice(0, -1)]
      })

      timeoutId = setTimeout(tick, getSpeed(difficultyRef.current, scoreRef.current))
    }

    timeoutId = setTimeout(tick, getSpeed(difficultyRef.current, scoreRef.current))
    return () => clearTimeout(timeoutId)
  }, [direction, gameOver, gameState])

  if (gameState === 'menu') return <Menu onStart={handleStart} />

  return (
    <div className="app">
      <Header score={score} difficulty={difficulty} />
      <Board
        snake={snake}
        food={food}
        gameOver={gameOver}
        score={score}
        onRestart={handleRestart}
        onMenu={handleBackToMenu}
      />
    </div>
  )
}

export default App
