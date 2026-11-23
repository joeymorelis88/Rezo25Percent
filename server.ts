import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distDir = path.resolve(__dirname, 'dist');

app.disable('x-powered-by');

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

if (fs.existsSync(distDir)) {
  app.use(
    express.static(distDir, {
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('*', (_req: Request, res: Response) => {
    res
      .status(503)
      .send('Production build not found. Run "npm run build" before starting the server.');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Rezostar server listening on http://0.0.0.0:${PORT}`);
});
