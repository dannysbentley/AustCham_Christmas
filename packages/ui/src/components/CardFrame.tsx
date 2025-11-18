interface CardFrameProps {
  image?: string;
  name: string;
  message: string;
  styleLabel: string;
  frame: string;
}

const FRAME_GRADIENTS: Record<string, string> = {
  winter: 'from-sky-500/80 to-indigo-900/80',
  tropical: 'from-emerald-400/80 to-lime-500/80',
  bangkok: 'from-pink-500/80 to-amber-500/80',
  classic: 'from-red-600/80 to-yellow-400/80'
};

export function CardFrame({ image, name, message, styleLabel, frame }: CardFrameProps) {
  const gradient = FRAME_GRADIENTS[frame] ?? FRAME_GRADIENTS.classic;

  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br ${gradient} p-6 shadow-2xl min-h-[360px]`}>
      <div className="absolute inset-2 rounded-[28px] border border-white/30 pointer-events-none" />
      <div className="relative flex flex-col gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/10">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-white/60 text-sm">Photo preview</div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-lg font-display tracking-wide">{name}</p>
          <p className="text-sm text-white/90">{message}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{styleLabel}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>AustCham · Dec 2024</span>
          <span>{frame}</span>
        </div>
      </div>
    </div>
  );
}
