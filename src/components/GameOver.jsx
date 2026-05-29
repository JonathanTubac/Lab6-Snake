import './GameOver.css'

export default function GameOver({ score, onRestart }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">Game Over</h2>
        <div className="modal-score">
          <span className="modal-score-label">Puntaje final</span>
          <span className="modal-score-value">{score}</span>
        </div>
        <button className="modal-btn" onClick={onRestart}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  )
}
