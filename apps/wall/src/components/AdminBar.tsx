import type { PublishedCard } from '@austcham/data';

interface AdminBarProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onShuffle: () => void;
  onRemoveCard: (id: string) => Promise<void>;
}

export function AdminBar({ isPaused, onTogglePause, onShuffle, onRemoveCard }: AdminBarProps) {
  const handleRemoveLatest = () => {
    const latestId = prompt('Enter card ID to remove (shown in QR link)');
    if (latestId) {
      onRemoveCard(latestId);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-black/60 backdrop-blur border-t border-white/10 p-3 flex flex-wrap gap-3 justify-center text-sm">
      <button className="rounded-full bg-white/10 px-4 py-2" onClick={onTogglePause}>
        {isPaused ? 'Resume flow' : 'Pause flow'}
      </button>
      <button className="rounded-full bg-white/10 px-4 py-2" onClick={onShuffle}>
        Shuffle cards
      </button>
      <button className="rounded-full bg-white/10 px-4 py-2" onClick={handleRemoveLatest}>
        Remove card
      </button>
      <span className="text-xs text-white/70">Grid burst auto-triggers every 60s.</span>
    </div>
  );
}
