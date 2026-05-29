import './Board.css'
import Snake from './Snake'
import Food from './Food'
import GameOver from './GameOver'

const CELL = 20

export default function Board({ snake, food, gameOver, score, onRestart, onMenu }) {
    return (
        <div className="board">
            <Snake segments={snake} cell={CELL} />
            <Food position={food} cell={CELL} />
            {gameOver && (
                <GameOver score={score} onRestart={onRestart} onMenu={onMenu} />
            )}
        </div>
    )
}
