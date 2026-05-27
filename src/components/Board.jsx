import './Board.css'

export default function Board({ snake, food }) {
    const CELL = 28 //size of each cell of the board


    return (
        <div className="board">
            {snake.map((seg, i) => (
                <div key={i} className="cell snake" style={{
                    gridRow: seg.y,
                    gridColumn: seg.x,
                    width: CELL,
                    height: CELL
                }} />
            ))}
        </div>
    )
}