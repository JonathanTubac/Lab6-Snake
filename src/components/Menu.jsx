import './Menu.css'

const DIFFICULTIES = [
  { key: 'easy',   label: 'Fácil',    desc: 'Para calentar motores',         color: '#4caf50' },
  { key: 'normal', label: 'Normal',   desc: 'El clásico equilibrado',         color: '#ff9800' },
  { key: 'hard',   label: 'Difícil',  desc: 'Sin piedad',                    color: '#f44336' },
  { key: 'auto',   label: 'Auto',     desc: 'La velocidad sube con el score', color: '#9c27b0' },
]

export default function Menu({ onStart }) {
  return (
    <div className="menu">
      <h1 className="menu-title">Snake Game</h1>
      <p className="menu-subtitle">Elige la dificultad</p>
      <div className="menu-options">
        {DIFFICULTIES.map(d => (
          <button
            key={d.key}
            className="menu-btn"
            style={{ '--accent': d.color }}
            onClick={() => onStart(d.key)}
          >
            <span className="menu-btn-label">{d.label}</span>
            <span className="menu-btn-desc">{d.desc}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
