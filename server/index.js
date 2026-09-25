import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// API endpoints
app.use('/api', apiRoutes);

// In development, serve using Vite middleware for instant live-reload
if (!isProd) {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.resolve(__dirname, '../client')
  });

  app.use(vite.middlewares);
} else {
  // In production, serve built static assets from dist/public
  const distPath = path.resolve(__dirname, '../dist/public');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 BikeCare AI server running at http://localhost:${PORT}`);
  console.log(`📡 Environment: ${isProd ? 'production' : 'development'}\n`);
});
