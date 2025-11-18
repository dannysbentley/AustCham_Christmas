export interface ComposeOptions {
  base64Image: string;
  frame: string;
  message: string;
  name: string;
  style: 'anime' | 'cartoon';
}

export interface ComposeResult {
  pngBase64: string;
}

export async function stylizeImage(base64Image: string, style: 'anime' | 'cartoon'): Promise<string> {
  // Placeholder implementation: in production load TensorFlow.js weights or WebGPU filters here.
  // For now we simply return the base image to unblock the UI flow.
  return Promise.resolve(base64Image);
}

export async function composeCard({ base64Image, frame, message, name, style }: ComposeOptions): Promise<ComposeResult> {
  const styled = await stylizeImage(base64Image, style);
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas not supported');
  }

  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const image = await loadImage(styled);
  const targetHeight = canvas.height * 0.7;
  const targetWidth = targetHeight * 0.75;
  const x = (canvas.width - targetWidth) / 2;
  const y = 80;
  ctx.save();
  roundRect(ctx, x, y, targetWidth, targetHeight, 48);
  ctx.clip();
  ctx.drawImage(image, x, y, targetWidth, targetHeight);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Playfair Display", serif';
  ctx.fillText(name, 120, targetHeight + 200);

  ctx.font = '24px "Inter", sans-serif';
  wrapText(ctx, message || 'Your festive greeting goes here', 120, targetHeight + 260, canvas.width - 240, 32);

  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.font = '16px "Inter", sans-serif';
  ctx.fillText(`Style: ${style}`, 120, canvas.height - 150);
  ctx.fillText(`Frame: ${frame}`, 120, canvas.height - 120);
  ctx.fillText('AustCham Christmas 2024', 120, canvas.height - 90);

  return {
    pngBase64: canvas.toDataURL('image/png')
  };
}

export type ComposeCardResponse = Awaited<ReturnType<typeof composeCard>>;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  for (const word of words) {
    const testLine = `${line}${word} `;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}
