import type { Board } from '../types/game'

export function createInitialBoard(): Board {
    // Plateau 17 lignes x 25 colonnes - cases vides = " ", hors plateau = null
    const board: Board = Array(17).fill(null).map(() => Array(25).fill(null))

    // Rangées 0-3 : branche du haut (joueur 1)
    let startCol = 12, endCol = 12
    for (let row = 0; row < 4; row++) {
        for (let col = startCol; col <= endCol; col += 2) {
            board[row][col] = 1  // joueur 1
        }
        startCol -= 1
        endCol += 1
    }

    // Rangées 4-8 : moitié haute de l'hexagone
    startCol = 0; endCol = 24
    for (let row = 4; row < 9; row++) {
        for (let col = startCol; col <= endCol; col += 2) {
            board[row][col] = 0  // case vide
        }
        startCol += 1
        endCol -= 1
    }

    // Rangées 9-12 : moitié basse de l'hexagone
    startCol = 3; endCol = 21
    for (let row = 9; row < 13; row++) {
        for (let col = startCol; col <= endCol; col += 2) {
            board[row][col] = 0
        }
        startCol -= 1
        endCol += 1
    }

    // Rangées 13-16 : branche du bas (joueur 4)
    startCol = 9; endCol = 15
    for (let row = 13; row < 17; row++) {
        for (let col = startCol; col <= endCol; col += 2) {
            board[row][col] = 4  // joueur 4
        }
        startCol += 1
        endCol -= 1
    }

    return board
}