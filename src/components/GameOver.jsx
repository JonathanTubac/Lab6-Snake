import './GameOver.css'

export default function GameOver({ score, onRestart, onMenu }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">Game Over</h2>
        <div className="modal-score">
          <span className="modal-score-label">Puntaje final</span>
          <span className="modal-score-value">{score}</span>
        </div>
        <div className="modal-actions">
          <button className="modal-btn modal-btn--primary" onClick={onRestart}>
            Reintentar
          </button>
          <button className="modal-btn modal-btn--secondary" onClick={onMenu}>
            Menú
          </button>
        </div>
      </div>
    </div>
  )
}
