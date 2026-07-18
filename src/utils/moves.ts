import type { Board, Position } from '../types/game'

const DIRECTIONS = [
    { row: -1, col: -1 }, // nord-ouest
    { row: -1, col: +1 }, // nord-est
    { row: 0,  col: -2 }, // ouest
    { row: 0,  col: +2 }, // est
    { row: +1, col: -1 }, // sud-ouest
    { row: +1, col: +1 }, // sud-est
]

export function getSimpleMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = []
    
    DIRECTIONS.forEach(dir => {
        const newRow = position.row + dir.row
        const newCol = position.col + dir.col
        
        if (newRow >= 0 && newRow < 17 && newCol >= 0 && newCol < 25) {
            if (board[newRow][newCol] === 0) {
                moves.push({ row: newRow, col: newCol })
            }
        }
    })
    
    return moves
}

export function getJumpMoves(
    board: Board, 
    position: Position, 
    visited: Set<string> = new Set()
    ): Position[] {
    const moves: Position[] = []
    
    // Marquer la position actuelle comme visitée
    visited.add(`${position.row}-${position.col}`)
    
    DIRECTIONS.forEach(dir => {
    const midRow = position.row + dir.row
    const midCol = position.col + dir.col
    const jumpRow = position.row + dir.row * 2
    const jumpCol = position.col + dir.col * 2
    
    // Vérifier que les deux cases sont dans le plateau
    if (jumpRow < 0 || jumpRow >= 17 || jumpCol < 0 || jumpCol >= 25) return
    if (board[midRow][midCol] === null) return
    
    // Case du milieu occupée ET case de destination vide ET pas déjà visitée
    if (board[midRow][midCol] !== null && board[midRow][midCol] !== 0 
        && board[jumpRow][jumpCol] === 0 
        && !visited.has(`${jumpRow}-${jumpCol}`)) {
        
        moves.push({ row: jumpRow, col: jumpCol })
        
        // Récursion — on continue depuis la nouvelle position
        const moreMoves = getJumpMoves(board, { row: jumpRow, col: jumpCol }, visited)
        moreMoves.forEach(m => moves.push(m))
        }
    })
    
    return moves
}

export function getAllMoves(board: Board, position: Position): Position[] {
    const simpleMoves = getSimpleMoves(board, position)
    const jumpMoves = getJumpMoves(board, position)
    return [...simpleMoves, ...jumpMoves]
}