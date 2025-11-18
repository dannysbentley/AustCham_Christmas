# AustCham AI Christmas Cards

Zero-fuss QR-to-wall experience for the 2024 AustCham Christmas event. This monorepo contains the mobile Creator app, the TV-ready Virtual Wall, shared UI primitives, and placeholder image/data utilities so we can iterate fast online or offline.

## Monorepo layout

```
austcham-cards/
├── apps/
│   ├── creator/   # QR landing page for guests
│   └── wall/      # Fullscreen virtual wall
├── packages/
│   ├── ui/        # Shared buttons, card frames, animations
│   ├── image/     # Stylization + canvas compositor stubs
│   └── data/      # Firestore/local storage adapter
├── scripts/       # Offline HTTP server
├── tsconfig.base.json
└── .env.sample
```

Both apps are Vite + React + Tailwind projects that read from the shared packages via TypeScript path aliases.

## Getting started

> **Note:** The Codespaces/CI sandbox that generated this scaffold does not have npm registry access, so `npm install` was not executed. Run the commands below locally where you have full registry access.

```bash
# Install dependencies for every workspace
npm install

# Start the mobile creator app
npm run dev:creator

# Start the virtual wall
npm run dev:wall
```

Each app reads `VITE_RUNTIME_MODE` to decide whether to use Firebase (online) or the bundled local storage adapter (offline). The default `.env.sample` keeps you in offline mode so you can test without provisioning a backend.

## Offline build + local server

You can ship a fully offline experience on the show laptop:

```bash
npm run build:creator && npm run build:wall
node scripts/offline-server.js --root apps/creator/dist --port 4173
# In a second terminal
STATIC_ROOT=apps/wall/dist PORT=4174 node scripts/offline-server.js
```

Point your travel router captive portal at `http://router.local:4173` for the Creator app and keep the wall open at `http://localhost:4174` on the HDMI display.

## Firebase toggle

When internet is available, drop your Firebase config into `.env` and switch `VITE_RUNTIME_MODE=online`. The `@austcham/data` package is structured so you can swap the storage layer without touching the UI. Just implement the Firestore listener/publisher in `packages/data/src/index.ts` and keep the same `publishCard` / `useFeed` signatures.

## QR table tent copy

```
🎄 Scan to Create Your AI Christmas Card!
1. Scan the QR code.
2. Add your name + short message.
3. Snap or upload a selfie.
4. Pick Anime or Cartoon style.
5. Tap “Generate” – your card hits the big wall instantly!
```

Suggested footer: “Works offline · Nothing stored beyond your final card · Need help? Flag the crew.”

## Privacy & safety notice

Add this line beneath the “Generate” button in the creator app or on signage:

> **Privacy first:** Photos process locally on this device. Only the final festive card + your message are saved for the wall. Tap “Remove my card” anytime and it disappears instantly.

For the full policy, link to a simple page outlining:

- No biometric storage, no facial recognition.
- Final PNGs auto-delete 30 days after the party.
- Offensive content (NSFW keywords, skin-tone heuristics) is blocked client-side.

## Next steps

- Plug TensorFlow.js AnimeGAN weights into `packages/image` to replace the current placeholders.
- Swap the `packages/data` helpers with Firebase Storage + Firestore listeners when the project IDs are ready.
- Flesh out `<PhotoCapture />` with EXIF-aware cropping + MediaPipe selfie segmentation.
- Hook up the grid-burst animation mode on the wall every 60 seconds.
