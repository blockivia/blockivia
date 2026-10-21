# BlockivIA

Bilingual Next.js / React / TypeScript site, with a Three.js hero and a static export for Cloudflare Pages.

```sh
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Spanish: `/` · English: `/en/` · Web3: `/certificados/` and `/en/certificates/`.

```sh
npm run build       # emits out/ for Cloudflare Pages
npm run typecheck
npm run lint
npm test           # browser tests against the static output
npm run preview:static
```

See [review, configuration, deployment, and pending resources](docs/REDESIGN.md). Approved bilingual content, social URLs and the video catalog live in `src/content/site.ts`. No production deployment is automatic.
