import './Food.css'

export default function Food({ position, cell }) {
    return (
        <div
            className="food"
            style={{
                left: position.x * cell,
                top: position.y * cell,
                width: cell,
                height: cell,
            }}
        />
    )
}
