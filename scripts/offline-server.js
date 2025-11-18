#!/usr/bin/env node
import http from 'http';
import { readFile, stat } from 'fs/promises';
import path from 'path';

const PORT = process.env.PORT || 4173;
const ROOT = process.env.STATIC_ROOT || path.resolve(process.cwd(), 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  if (!req.url) return;
  const safePath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(ROOT, safePath);

  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      const html = await readFile(path.join(filePath, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
    const data = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (error) {
    const fallback = path.join(ROOT, 'index.html');
    try {
      const html = await readFile(fallback);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (fallbackError) {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Offline server running on http://localhost:${PORT}`);
  console.log(`Serving static files from ${ROOT}`);
});
