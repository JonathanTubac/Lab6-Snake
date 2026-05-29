import './Snake.css'

const getAngle = (from, to) => {
    if (to.x > from.x) return 0
    if (to.x < from.x) return 180
    if (to.y > from.y) return 90
    if (to.y < from.y) return 270
    return 0
}

export default function Snake({ segments, cell }) {
    return segments.map((seg, i) => {
        let tipo = 'body'
        if (i === 0) tipo = 'head'
        if (i === segments.length - 1) tipo = 'tail'

        const angle = i === 0
            ? getAngle(segments[1], segments[0])
            : getAngle(segments[i], segments[i - 1])

        return (
            <div
                key={i}
                className={`snake ${tipo}`}
                style={{
                    left: seg.x * cell,
                    top: seg.y * cell,
                    width: cell,
                    height: cell,
                    transform: `rotate(${angle}deg)`,
                }}
            />
        )
    })
}
