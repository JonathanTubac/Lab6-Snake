import './Board.css'

export default function Board({ snake, food }) {
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
        </div>
    )
}