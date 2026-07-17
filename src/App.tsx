import { createInitialBoard } from './utils/initialBoard'
import Board  from './components/Board'

function App() {
  const board = createInitialBoard()
  console.log(board)
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Board />
    </div>
  )
}

export default App