# 🌟 Chinese Checkers — React + TypeScript + Zustand

A fully functional Chinese Checkers game built with React, TypeScript, Tailwind CSS and Zustand, featuring a hexagonal star-shaped board rendered in SVG.

## 🌐 Demo
[▶️ Coming soon]

---

## 🚀 Technologies

- **React 19** — UI and component architecture
- **TypeScript** — Strong typing for board, positions and game state
- **Tailwind CSS** — Styling
- **Zustand** — Global state management
- **SVG** — Board rendering with precise hexagonal positioning
- **Vite** — Build tool and dev server

---

## ✅ Features

- 🌟 Hexagonal star-shaped board (17x25 grid)
- 🎨 6 players with distinct colors
- ♟️ Single-step moves to adjacent cells
- 🦘 Chain jump moves (recursive algorithm)
- 🔄 Turn-based gameplay (6 players)
- 🏆 Winner detection
- 🔁 New game button

---

## 🧠 Technical Challenges

### 1. Hexagonal Board Representation
The star-shaped board is represented as a **17×25 array**, where only specific cells are active. Inactive cells are stored as `null`. Active cells use **offset coordinates** — only even or odd columns are used per row, creating the hexagonal offset effect.

```typescript
type Cell = null | 0 | 1 | 2 | 3 | 4 | 5 | 6
type Board = Cell[][]
// null = off-board, 0 = empty, 1-6 = player piece
```

### 2. Hexagonal Positioning Formula
Converting grid coordinates to pixel positions requires specific formulas:

```typescript
const x = colIndex * CELL_SIZE / 2
const y = rowIndex * CELL_SIZE * 0.866  // 0.866 = √3/2
```

The `/ 2` compression on x-axis accounts for the fact that adjacent cells are 2 columns apart in the array. The `0.866` factor (√3/2) is the mathematical height ratio of a regular hexagon.

### 3. Six Directions in Hexagonal Grid
Unlike a square grid (4 directions), a hexagonal grid has **6 movement directions**:

```typescript
const DIRECTIONS = [
    { row: -1, col: -1 }, // north-west
    { row: -1, col: +1 }, // north-east
    { row: 0,  col: -2 }, // west
    { row: 0,  col: +2 }, // east
    { row: +1, col: -1 }, // south-west
    { row: +1, col: +1 }, // south-east
]
```

Note: east/west movements use `±2` columns because adjacent cells are always 2 columns apart.

### 4. Recursive Chain Jumps
A player can chain multiple jumps in a single turn. This requires a **recursive algorithm** with a `visited` set to prevent infinite loops:

```typescript
function getJumpMoves(board, position, visited = new Set()) {
    visited.add(`${position.row}-${position.col}`)
    // For each direction: if middle cell is occupied and landing is empty
    // → add jump, then recurse from landing position
}
```

### 5. Winner Detection
A player wins when all 10 of their pieces have reached the opposite corner. The target zone mirrors the starting zone of the opposite player.

---

## 🏗️ Project Structure

```
src/
├── components/
│   └── Board.tsx        # SVG board rendering with click handling
├── store/
│   └── gameStore.ts     # Zustand store — full game state & actions
├── types/
│   └── game.ts          # TypeScript interfaces (Cell, Board, Position, Player)
└── utils/
    ├── initialBoard.ts  # Creates the 17x25 star-shaped board
    └── moves.ts         # Movement logic (simple moves, jump moves, winner check)
```

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/debeaune/chinese-checkers.git
cd chinese-checkers

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 🔮 Future Improvements

- [ ] Chain jump UI (highlight path)
- [ ] AI opponent
- [ ] Mobile responsive design
- [ ] Online multiplayer
- [ ] Rule: pieces cannot stay in opponent's corner zones

---

*Built by Marie Laure Debeaune*
