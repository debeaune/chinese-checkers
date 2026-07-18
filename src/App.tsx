import { useGameStore } from './store/gameStore'
import Board  from './components/Board'

const PLAYER_COLORS = ['', 'red', 'blue', 'green', 'gold', 'orange', 'purple']

function App() {
  const { currentPlayer, resetGame } = useGameStore()
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4">
            <span className="text-white text-xl font-bold">
                Tour du joueur {currentPlayer}
            </span>
            <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: PLAYER_COLORS[currentPlayer] }}
            />
            <button 
                onClick={resetGame}
                className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
            >
                🔄 Nouvelle partie
            </button>
        </div>
        <Board />
    </div>
  )
}

export default App
