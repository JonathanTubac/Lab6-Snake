import './Board.css'
import GameOver from './GameOver'

export default function Board({ snake, food, gameOver, score, onRestart }) {
    const CELL = 28 //size of each cell of the board


    return (
        <div className="board">
            {snake.map((seg, i) => {
                let tipo = 'body'
                if (i === 0) tipo = 'head'
                if (i === snake.length - 1) tipo = 'tail'

                return (
                    <div key={i} className={`snake ${tipo}`} style={{
                        left: seg.x * CELL,
                        top: seg.y * CELL,
                        width: CELL,
                        height: CELL
                    }} />
                )
            })}

            <div className="food" style={{
                left: food.x * CELL,
                top: food.y * CELL,
                width: CELL,
                height: CELL,
            }} />
            
            {gameOver && (
                <GameOver score={score} onRestart={onRestart} />
            )}
        </div>
    )
}