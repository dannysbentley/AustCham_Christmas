import { CardFrame, FloatingCard } from '@austcham/ui';
import type { PublishedCard } from '@austcham/data';

interface WallCanvasProps {
  cards: PublishedCard[];
  shuffleSeed: number;
  paused: boolean;
}

export function WallCanvas({ cards, shuffleSeed, paused }: WallCanvasProps) {
  const random = seededRandom(shuffleSeed);
  const offsets = cards.map(() => random() * 100);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,.25),_transparent_55%)]" />
      <div className="relative z-10 flex flex-wrap gap-6 p-6">
        {cards.map((card, index) => (
          <FloatingCard key={card.id} delay={index * 1200} paused={paused} offset={offsets[index] || 0}>
            <CardFrame
              image={card.thumbUrl || card.url}
              name={card.name}
              message={card.message}
              styleLabel={card.style === 'anime' ? 'Anime Glow' : 'Cartoon Pop'}
              frame={card.frame}
            />
          </FloatingCard>
        ))}
      </div>
      {!cards.length && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-300">
          <p className="text-3xl font-display">Wall is warming up…</p>
          <p>Cards appear here instantly as guests publish them.</p>
        </div>
      )}
    </div>
  );
}

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return () => {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
}
