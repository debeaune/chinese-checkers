import React from 'react'
import { createInitialBoard } from '../utils/initialBoard'

const CELL_SIZE = 20

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
                    fill={cell === 0 ? '#555' : cell === 1 ? 'red' : 'blue'}
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