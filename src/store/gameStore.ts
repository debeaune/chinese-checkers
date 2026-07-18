import { create } from 'zustand'
import type { Board, Position, Player } from '../types/game'
import { createInitialBoard } from '../utils/initialBoard'
import { getAllMoves, checkWinner } from '../utils/moves'

interface GameState {
    board: Board
    currentPlayer: Player
    selectedPosition: Position | null
    possibleMoves: Position[]
    winner: Player | null
}

interface GameActions {
    selectPiece: (position: Position) => void
    movePiece: (to: Position) => void
    resetGame: () => void
}

export const useGameStore = create<GameState & GameActions>((set) => ({
    board: createInitialBoard(),
    currentPlayer: 1,
    selectedPosition: null,
    possibleMoves: [],
    winner: null,

    selectPiece: (position) => set((state) => {
        const cell = state.board[position.row][position.col]
    
        if (cell === null || cell === 0) return { selectedPosition: null, possibleMoves: [] }
        if (cell !== state.currentPlayer) return { selectedPosition: null, possibleMoves: [] }
    
        const moves = getAllMoves(state.board, position)
    
        return {
            selectedPosition: position,
            possibleMoves: moves
        }
    }),

    movePiece: (to) => set((state) => {
        const { board, selectedPosition, currentPlayer } = state
    
        if (!selectedPosition) return {}
    
        const newBoard = board.map(row => [...row])
        newBoard[to.row][to.col] = newBoard[selectedPosition.row][selectedPosition.col]
        newBoard[selectedPosition.row][selectedPosition.col] = 0

        const nextPlayer = (currentPlayer % 6) + 1 as Player

        const winner = checkWinner(newBoard, currentPlayer) ? currentPlayer : null

        return {
            board: newBoard,
            selectedPosition: null,
            possibleMoves: [],
            currentPlayer: nextPlayer,
            winner
        }
    }),

    resetGame: () => set({
        board: createInitialBoard(),
        currentPlayer: 1,
        selectedPosition: null,
        possibleMoves: [],
        winner : null,
    }),
}))