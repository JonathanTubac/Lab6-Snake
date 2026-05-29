import './GameOver.css'

export default function GameOver({ score, onRestart }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Game Over</h2>
        <p>Puntaje: {score}</p>
        <button onClick={onRestart}>Reintentar</button>
      </div>
    </div>
  )
}