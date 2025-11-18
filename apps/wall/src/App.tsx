import { useMemo, useState } from 'react';
import { useFeed } from '@austcham/data';
import { WallCanvas } from './components/WallCanvas';
import { AdminBar } from './components/AdminBar';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now());
  const { cards, removeCard } = useFeed({ paused: isPaused });

  const sortedCards = useMemo(() => {
    return [...cards].sort((a, b) => a.createdAt - b.createdAt);
  }, [cards]);

  const handleShuffle = () => {
    setShuffleSeed(Date.now());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <WallCanvas cards={sortedCards} shuffleSeed={shuffleSeed} paused={isPaused} />
      <AdminBar
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((state) => !state)}
        onShuffle={handleShuffle}
        onRemoveCard={removeCard}
      />
    </div>
  );
}

export default App;
