import './Board.css'

export default function Board({ snake, food }) {
    const CELL = 28 //size of each cell of the board


    return (
        <div className="board">
            {snake.map((seg, i) => (
                <div key={i} className="cell snake" style={{
                    left: seg.y * CELL,
                    top: seg.x * CELL,
                    width: CELL,
                    height: CELL
                }} />
            ))}
        </div>
    )
}