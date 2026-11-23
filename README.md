# Rezostar Corporation Website

React + Vite + Tailwind CSS website ready to deploy either as a **Node.js (Express) app** or as **static files (`dist/`)** on any host (cPanel / Apache / Nginx, Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Prerequisites (Node.js)
- **Node.js**: `22+` (pinned in `.nvmrc` and `package.json` `engines`)
- **npm**: `10+` (locked dependencies in `package-lock.json`)

## Install & Build

```bash
npm install
npm run build
```

This installs all Node.js dependencies into `node_modules/` and builds a self-contained **`dist/`** folder (~4.6 MB total) using relative paths (`./`), so it works both at a root domain (`https://yourdomain.com/`) and inside a subfolder (`https://yourdomain.com/rezostar/`).

No API keys are required to run or deploy. (`VITE_GOOGLE_MAPS_API_KEY` in `.env.example` is optional — the Contact page automatically uses an embedded Google Map when unset.)

## Deploy Options

### 1. Node.js Hosting (Render, Railway, Cloud Run, VPS, cPanel Node.js)
```bash
npm ci --omit=dev   # or npm install
npm run build
npm start           # Runs server.ts with Express on PORT (default 3000)
```

### 2. Any Static Host / cPanel / FTP
1. Run `npm run build`.
2. Upload the **contents** of `dist/` to your `public_html/` (or subfolder).
   - `dist/.htaccess` is included automatically for Apache compression, caching, and fallback routing.

### 3. Netlify (Drag & Drop or Git)
- **Drag & drop**: Run `npm run build` and drop the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Git**: Connect this repo — `netlify.toml` is already configured.

### 4. Vercel
- Import this repo in Vercel or run `npx vercel --prod` — `vercel.json` is already configured.

### 5. Cloudflare Pages
- Connect this repo with:
  - **Build command**: `npm run build`
  - **Build output directory**: `dist`

### 6. Local Development & Preview
```bash
npm run dev      # Vite dev server on port 3000
npm run preview  # Preview the production dist/ build on port 3000
```

## PHP / XAMPP Version
A separate standalone PHP 7.4 + MySQL version is located in `rezostar-xampp/` (see `rezostar-xampp/README.md`).
