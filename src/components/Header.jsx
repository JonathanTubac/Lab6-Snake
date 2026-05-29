import './Header.css'

export default function Header({ score }) {
    return (
        <header className="game-header">
            <h1 className="game-title">Snake Game</h1>
            <div className="game-score">
                <span className="score-label">Score</span>
                <span className="score-value">{score}</span>
            </div>
        </header>
    )
}
