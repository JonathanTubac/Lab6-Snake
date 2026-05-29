# Snake Game

A classic Snake game built with React and Vite. Features a main menu with difficulty selection, smooth animated movement, sound effects, and an auto-speed mode that ramps up as your score grows.

## Tech Stack

- **React 19** — UI and game state
- **Vite 8** — dev server and bundler
- **CSS Modules** (per-component `.css` files) — scoped styling

## Features

- **Main menu** with 4 difficulty modes
- **Smooth snake movement** via CSS transitions
- **Visual grid** on the board
- **Sound effects** — eating and game over
- **Game Over modal** with final score, restart, and back-to-menu options
- **Header** displaying the title, active difficulty, and live score

## Difficulty Modes

| Mode | Speed | Behavior |
|------|-------|----------|
| Easy | 150 ms/tick | Fixed, forgiving pace |
| Normal | 100 ms/tick | Classic balanced speed |
| Hard | 60 ms/tick | Fast, no margin for error |
| Auto | 150 → 40 ms/tick | Starts slow, speeds up every 30 points |

Auto mode formula: `max(40ms, 150ms − ⌊score / 30⌋ × 10ms)`

## Controls

| Key | Action |
|-----|--------|
| `Arrow Up` | Move up |
| `Arrow Down` | Move down |
| `Arrow Left` | Move left |
| `Arrow Right` | Move right |

Reverse direction (e.g. pressing Left while moving Right) is ignored.

## Project Structure

```
src/
├── App.jsx              # Game state, loop logic, difficulty & sound
├── App.css              # Root layout
├── main.jsx
├── index.css            # Global styles
└── components/
    ├── Menu.jsx          # Main menu — difficulty picker
    ├── Menu.css
    ├── Header.jsx        # Title, difficulty badge, live score
    ├── Header.css
    ├── Board.jsx         # Grid container, composes Snake + Food + GameOver
    ├── Board.css
    ├── Snake.jsx         # Renders head / body / tail segments with rotation
    ├── Snake.css
    ├── Food.jsx          # Renders the food dot
    ├── Food.css
    ├── GameOver.jsx      # Overlay modal with score and action buttons
    └── GameOver.css

public/
├── eat.wav              # Sound played when the snake eats food
├── game_over.wav        # Sound played on collision
├── body-snake.png       # Texture for snake body segments
└── favicon.svg
```

## Component Responsibilities

**`App.jsx`**
Owns all game state (`snake`, `direction`, `food`, `score`, `gameOver`, `gameState`, `difficulty`). Runs the game loop using a recursive `setTimeout` so Auto mode can read the latest speed on every tick without restarting the interval. Uses `useRef` mirrors for `direction`, `food`, `score`, and `difficulty` to avoid stale closures inside the loop.

**`Board.jsx`**
Purely presentational. Renders the grid container and delegates snake/food/overlay rendering to child components. Defines the `CELL` constant (20 px) and passes it down as a prop.

**`Snake.jsx`**
Maps the segments array to absolutely-positioned divs. Determines `head` / `body` / `tail` class and calculates the rotation angle from each segment's direction vector so sprites face the right way.

**`Food.jsx`**
Single absolutely-positioned div styled as a circle, positioned using the `food` state coordinates.

**`Header.jsx`**
Displays the game title, a color-coded difficulty badge, and the current score.

**`Menu.jsx`**
Four buttons — one per difficulty — each with a left accent border in the mode's color. Calls `onStart(difficulty)` on click.

**`GameOver.jsx`**
Absolute overlay with backdrop blur. Shows the final score and two actions: **Retry** (same difficulty) and **Menu** (back to difficulty picker).

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview the production build locally
```

## Game Rules

- The board is **30 × 30** cells.
- The snake grows by one segment each time it eats food.
- Food spawns at a random empty cell after being eaten.
- The game ends if the snake hits a **wall** or **itself**.
- Each food item is worth **10 points**.
