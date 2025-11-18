export interface StyleOption {
  id: string;
  label: string;
  accent: string;
}

interface StylePickerProps {
  value: 'anime' | 'cartoon';
  onChange: (value: 'anime' | 'cartoon') => void;
}

const STYLE_OPTIONS: { id: 'anime' | 'cartoon'; label: string; description: string }[] = [
  { id: 'anime', label: 'Anime Glow', description: 'Soft shading + sparkles' },
  { id: 'cartoon', label: 'Cartoon Pop', description: 'Bold outlines + warm tones' }
];

export function StylePicker({ value, onChange }: StylePickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-200">Choose a style</p>
      <div className="grid grid-cols-2 gap-3">
        {STYLE_OPTIONS.map((option) => (
          <button
            key={option.id}
            className={`rounded-2xl border p-4 text-left transition hover:scale-[1.02] ${
              value === option.id ? 'border-festiveGold bg-white/10' : 'border-white/10 bg-white/5'
            }`}
            onClick={() => onChange(option.id)}
            type="button"
          >
            <p className="font-semibold">{option.label}</p>
            <p className="text-xs text-slate-400">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
