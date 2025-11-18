import { useCallback, useMemo, useState } from 'react';
import { Button } from '@austcham/ui';
import { CardPreview } from './components/CardPreview';
import { PhotoCapture } from './components/PhotoCapture';
import { StylePicker, StyleOption } from './components/StylePicker';
import { composeCard } from '@austcham/image';
import { publishCard } from '@austcham/data';

const FRAMES: StyleOption[] = [
  { id: 'winter', label: 'Winter Blue', accent: 'from-sky-500 to-indigo-700' },
  { id: 'tropical', label: 'Tropical Noel', accent: 'from-emerald-400 to-lime-500' },
  { id: 'bangkok', label: 'Bangkok Nights', accent: 'from-pink-500 to-amber-500' }
];

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState<'anime' | 'cartoon'>('anime');
  const [frame, setFrame] = useState(FRAMES[0].id);
  const [rawImage, setRawImage] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastShareUrl, setLastShareUrl] = useState<string | null>(null);

  const isReady = useMemo(() => name.trim().length > 0 && rawImage, [name, rawImage]);

  const handleGenerate = useCallback(async () => {
    if (!isReady) return;
    setIsPublishing(true);
    try {
      const { pngBase64 } = await composeCard({
        base64Image: rawImage,
        frame,
        message,
        name,
        style
      });
      const published = await publishCard({
        image: pngBase64,
        meta: {
          name,
          message,
          frame,
          style
        }
      });
      setLastShareUrl(published.shareUrl);
    } catch (error) {
      console.error('Failed to publish card', error);
      alert('Something went wrong while saving your card. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  }, [frame, isReady, message, name, rawImage, style]);

  return (
    <div className="min-h-screen text-white px-4 py-6 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">AustCham Thailand · 2024</p>
          <h1 className="text-3xl font-display">Create your festive AI card</h1>
          <p className="text-slate-300">30 seconds · works offline · privacy friendly</p>
        </header>

        <section className="bg-white/5 rounded-3xl border border-white/10 p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-200">Your first name</label>
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-festiveGold focus:outline-none"
                placeholder="Aussie Elf"
                maxLength={32}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <label className="block text-sm font-medium text-slate-200">Holiday message (max 100 chars)</label>
              <textarea
                className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-festiveGold focus:outline-none"
                placeholder="Merry Christmas from Bangkok!"
                maxLength={100}
                value={message}
                rows={3}
                onChange={(event) => setMessage(event.target.value)}
              />

              <StylePicker value={style} onChange={setStyle} />
              <PhotoCapture onCapture={setRawImage} />

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-200">Pick a frame</p>
                <div className="grid grid-cols-3 gap-3">
                  {FRAMES.map((option) => (
                    <button
                      key={option.id}
                      className={`rounded-2xl border px-3 py-2 text-sm transition hover:scale-[1.02] ${
                        frame === option.id ? 'border-festiveGold bg-white/10' : 'border-white/10 bg-white/5'
                      }`}
                      onClick={() => setFrame(option.id)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <CardPreview
              image={rawImage}
              frame={frame}
              message={message}
              name={name}
              style={style}
              shareUrl={lastShareUrl}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button disabled={!isReady || isPublishing} onClick={handleGenerate} className="flex-1 text-lg">
              {isPublishing ? 'Publishing…' : 'Generate & Publish'}
            </Button>
            {lastShareUrl ? (
              <a
                href={lastShareUrl}
                className="text-sm text-center underline text-slate-200"
                target="_blank"
                rel="noreferrer"
              >
                Open my card QR
              </a>
            ) : (
              <p className="text-sm text-center text-slate-400">Get a QR link after publishing</p>
            )}
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          Images process locally; only final cards are stored. Need help? Flag a crew member.
        </p>
      </div>
    </div>
  );
}

export default App;
