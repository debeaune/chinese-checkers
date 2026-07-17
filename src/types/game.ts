export type Player = 1 | 2 | 3 | 4 | 5 | 6
export type Cell = null | 0 | Player

export type Board = Cell[][]

export interface Position {
    row: number
    col: number
}

export interface GameState {
    board: Board
    currentPlayer: Player
    selectedPosition: Position | null
    possibleMoves: Position[]
}