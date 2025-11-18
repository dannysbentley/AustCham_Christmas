import { CardFrame } from '@austcham/ui';

interface CardPreviewProps {
  image: string;
  name: string;
  message: string;
  style: 'anime' | 'cartoon';
  frame: string;
  shareUrl: string | null;
}

export function CardPreview({ image, name, message, style, frame, shareUrl }: CardPreviewProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 p-4">
      <CardFrame
        image={image}
        name={name || 'Your Name'}
        message={message || 'Type a holiday wish to preview your card!'}
        styleLabel={style === 'anime' ? 'Anime Glow' : 'Cartoon Pop'}
        frame={frame}
      />
      <div className="mt-4 rounded-2xl bg-black/40 p-4 text-sm text-slate-300 space-y-2">
        <p>Preview updates live. Tap generate to push to the wall.</p>
        {shareUrl && (
          <p className="text-xs text-emerald-300 break-all">Share QR: {shareUrl}</p>
        )}
      </div>
    </div>
  );
}
