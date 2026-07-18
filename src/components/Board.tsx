import React from 'react'
import { createInitialBoard } from '../utils/initialBoard'

const CELL_SIZE = 20

function getPlayerColor(cell: number): string {
    switch(cell) {
        case 1: return '#FF0000'  // rouge
        case 2: return '#0000FF'  // bleu
        case 3: return '#00AA00'  // vert
        case 4: return '#FFD700'  // jaune
        case 5: return '#FF8C00'  // orange
        case 6: return '#8B00FF'  // violet
        default: return '#555'    // gris (vide)
    }
}

function Board() {
    const board = createInitialBoard()
    
    const circles: React.ReactElement[] = []
    
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === null) return
            
            const x = colIndex * CELL_SIZE / 2
            const y = rowIndex * CELL_SIZE * 0.866
            
            circles.push(
                <circle
                    key={`${rowIndex}-${colIndex}`}
                    cx={x}
                    cy={y}
                    r={CELL_SIZE / 2 - 2}
                    fill={getPlayerColor(cell)}
                />
            )
        })
    })
    
    return (
        <svg width={300} height={320} className="bg-gray-800">
            <g transform="translate(20, 21)">
                {circles}
            </g>
        </svg>
    )
}

export default Board