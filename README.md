## Seeing Stars

Static Vite-powered site for showcasing astrophotography images and videos. Ships multiple entry pages (`index.html`, `gallery.html`, `videos.html`) and uses a small Node pipeline to optimize media and generate the gallery data JSON.

### Setup
- Requirements: Node 20+, npm.
- Install: `npm install`
- Develop: `npm run dev` (opens on port 3000)
- Build: `npm run build` (outputs to `dist/`)

### Media workflow
1) Add raw images to `src/assets/images/originals/`.
2) Optimize to thumbs/full: `npm run optimize` (uses Sharp).
3) Generate/update gallery data: `npm run generate` (writes `public/data/gallery.json`).
4) For videos, place clips/posters under `src/assets/videos/{clips,poster}` and add entries to `public/data/gallery.json`.

### Scripts
- `npm run dev` — Vite dev server.
- `npm run build` — Production build.
- `npm run preview` — Preview built site.
- `npm run optimize` — Resize originals into web-friendly thumbs/full.
- `npm run generate` — Rebuild `public/data/gallery.json` from optimized images.
- `npm run sync` — Runs optimize then generate.

### Deployment
GitHub Actions workflow `.github/workflows/deploy.yaml` builds on `master`, syncs `dist/` to S3 `www.seeingstars.space`, and invalidates CloudFront. Ensure AWS credentials and distribution ID are set as repo secrets before enabling.
