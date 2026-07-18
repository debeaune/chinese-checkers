import React from 'react'
import { useGameStore } from '../store/gameStore'

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
    const { board, selectedPosition, possibleMoves, selectPiece, movePiece } = useGameStore()
    
    const circles: React.ReactElement[] = []
    
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === null) return
            
            const x = colIndex * CELL_SIZE / 2
            const y = rowIndex * CELL_SIZE * 0.866

            const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex
            const isPossibleMove = possibleMoves.some(m => m.row === rowIndex && m.col === colIndex)
            
            circles.push(
                <circle
                    key={`${rowIndex}-${colIndex}`}
                    cx={x}
                    cy={y}
                    r={CELL_SIZE / 2 - 2}
                    fill={isSelected ? 'white' : isPossibleMove ? 'yellow' : getPlayerColor(cell)}
                        onClick={ () => { if (possibleMoves.some(m => m.row === rowIndex && m.col === colIndex)) {
                            movePiece({ row: rowIndex, col: colIndex })
                        } else {
                            selectPiece({ row: rowIndex, col: colIndex })
                        } 
                    }}
                        style={{ cursor: 'pointer' }}
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