import './Board.css'
import GameOver from './GameOver'

export default function Board({ snake, food, gameOver, score, onRestart, onMenu }) {
    const CELL = 20

    const getAngle = (from, to) => {
        if (to.x > from.x) return 0    // derecha
        if (to.x < from.x) return 180  // izquierda
        if (to.y > from.y) return 90   // abajo
        if (to.y < from.y) return 270  // arriba
        return 0
    }
    return (
        <div className="board">
            {snake.map((seg, i) => {
                let tipo = 'body'
                if (i === 0) tipo = 'head'
                if (i === snake.length - 1) tipo = 'tail'

                const angle = i === 0
                    ? getAngle(snake[1], snake[0])
                    : getAngle(snake[i], snake[i - 1])

                return (
                    <div
                        key={i}
                        className={`snake ${tipo}`}
                        style={{
                            left: seg.x * CELL,
                            top: seg.y * CELL,
                            width: CELL,
                            height: CELL,
                            transform: `rotate(${angle}deg)`,
                        }}
                    />
                )
            })}

            <div className="food" style={{
                left: food.x * CELL,
                top: food.y * CELL,
                width: CELL,
                height: CELL,
            }} />

            {gameOver && (
                <GameOver score={score} onRestart={onRestart} onMenu={onMenu} />
            )}
        </div>
    )
}