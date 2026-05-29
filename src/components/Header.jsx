import './Header.css'

const DIFFICULTY_LABELS = {
  easy:   { label: 'Fácil',   color: '#4caf50' },
  normal: { label: 'Normal',  color: '#ff9800' },
  hard:   { label: 'Difícil', color: '#f44336' },
  auto:   { label: 'Auto',    color: '#9c27b0' },
}

export default function Header({ score, difficulty }) {
  const diff = DIFFICULTY_LABELS[difficulty]

  return (
    <header className="game-header">
      <h1 className="game-title">Snake Game</h1>
      {diff && (
        <span className="game-difficulty" style={{ color: diff.color }}>
          {diff.label}
        </span>
      )}
      <div className="game-score">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>
    </header>
  )
}
