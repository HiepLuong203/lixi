import { useState } from 'react';
import { MobileFirstLayout } from './layouts/MobileFirstLayout';
import { LuckyMoneyGame } from './features/game/LuckyMoneyGame';

function App() {
  const [gameKey, setGameKey] = useState(0);

  const handleGameFinish = () => {
    // Reset the game to play again
    setGameKey(prev => prev + 1);
  };

  return (
    <MobileFirstLayout>
      <LuckyMoneyGame 
        key={gameKey}
        onFinish={handleGameFinish} 
      />
    </MobileFirstLayout>
  )
}

export default App
