import { useRef } from 'react';

interface PhotoCaptureProps {
  onCapture: (value: string) => void;
}

export function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      onCapture(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-200">Upload or snap a selfie</p>
      <div className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-4 text-center">
        <p className="text-xs text-slate-400">Portrait photos work best. Max 4 MB.</p>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:border-festiveGold"
          >
            Upload / Take Photo
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="sr-only"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
