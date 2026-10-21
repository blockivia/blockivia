# BlockivIA — prerendered-media integration stage

Branch: `feat/blockivia-redesign`. This is a structural implementation for review, **not a final approved visual design**. The requested 3D renderings have not been supplied. No replacement art, primitive figures, fake media, courses or social profiles are published.

## Development and validation

Node 24 and npm 11:

```sh
npm ci
npm run build
npm run typecheck
npm run lint
npm test
npm start
```

`npm start` serves `out/` on port 3000 with Python 3. For development use `npm run dev -- --hostname 0.0.0.0 --port 3000`; the browser suite serves the static export on port 4173. Stop only your own dev process before building. Tests use the installed Chromium or `CHROMIUM_PATH`.

- Spanish Home: `/`.
- English Home: `/en/`.
- Independent Web3 interfaces: `/certificados/` and `/en/certificates/`. There are no links to them on the Home. The original contract, certificate artwork and transaction/download behavior remain separate; no transaction is sent by the tests.

## Typography and layout

`src/app/fonts.ts` uses **Roboto Mono via `next/font/google`**, weights 400 and 500, and both root layouts load the generated variable. Roboto Mono is the selected interface font, not an assertion about the logo's original typeface. Next hosts the resulting font files in the static export. The build needs Google Fonts access; the browser does not request fonts from Google.

Desktop: 1320px maximum container, at least 48px side margins, 92px header, 700px minimum hero, 96px between sections, 64px column gaps, hero columns 44%/56% of the space remaining after their gap. Hero 52px/500/1.15, section headings 36px/500, secondary headings 24px/500, paragraphs 18px/400/1.65, navigation/buttons 16px/500.

At widths up to 900px: 20px side margins, 76px header, 64px section separation, one column with visual media below text, headings 30px, paragraphs 16px/1.65, buttons 16px. Interface text is never below 16px; the supplied raster logo is kept intact rather than redrawing its embedded lettering.

Colors: background `#050807`, primary text `#F2F6F2`, secondary text `#BAC8BF`, green `#00D69C`.

## Logo and content

Only `public/logo.png` is rendered, once in the header. The original bitmap is unchanged, with its complete tricolor line and embedded tagline; no logo or tagline is repeated in the hero. Its transparent outer padding is positioned outside the layout flow without clipping the visible artwork, recoloring it or distorting its proportions. See [LOGO.md](LOGO.md) for original dimensions and checksums.

`src/content/site.ts` remains unchanged: all eight approved blocks, five capabilities and bilingual copy are preserved. No section numbers, microtext, decorative symbols, Explore action, certificate links or promotional claims are added. Contact and WhatsApp use the approved destinations. Social controls remain legible and disabled until their real URLs are supplied. The YouTube catalog remains empty; there is no invented empty-state artwork or course.

## Required media

See [public/media/README.md](../public/media/README.md) for the exact filenames and art direction. Supply:

- `hero-tunnel.mp4` — roughly 3 seconds, 16:9, looping tunnel, silent, inline playback.
- `hero-tunnel.webp` — real matching poster, including the reduced-motion view.
- `soluciones.webp`.
- `investigacion.webp`.
- `capacitacion.webp`.

`src/lib/media.ts` checks the approved filenames at build time. Missing files are omitted from component URLs; empty visual slots reserve the composition, without broken image requests or fabricated replacements. Rebuild after adding assets. The build reads no external media API or credentials.

`PrerenderedMedia` preserves real asset proportions. Videos play automatically, muted and looping only when at least 25% visible and the document is active; they pause off screen or when the tab is hidden. Inline playback is required, with fullscreen, picture-in-picture and remote playback disabled. Reduced motion renders the real poster without mounting the video. Provide the poster together with the MP4; otherwise reduced-motion users retain an empty slot.

`Reveal` observes available media at threshold 0.25 and unobserves after its first entrance. Transitions: opacity 0→1, translateY 36px→0, scale .94→1, 700ms, `cubic-bezier(.2,.8,.2,1)`. Reduced motion shows assets immediately without animation. No Three.js or CSS model remains.

Once supplied, the final assets still need codec/dimension, playback, loop, reduced-motion poster, image framing and visual approval checks. Prefer an H.264 MP4 with a widely supported pixel format and fast-start metadata. A passing build without the assets does not establish final 3D readiness.

## Static Cloudflare Pages deployment

`next.config.ts` exports static HTML with trailing slashes and unoptimized local images. Cloudflare Pages should build with `npm run build`, publish `out/`, and use Node 24. Separate root layouts supply correct initial document languages. `_headers` permits local media and self-hosted fonts; it disables fullscreen and restricts YouTube embeds to the privacy-enhanced host.

Google Fonts build destinations are `fonts.googleapis.com` and `fonts.gstatic.com`; they were added to the environment configuration draft while preserving the existing API domains. Draft saving does not itself activate network configuration or publish the site. No production deployment or merge to `main` is part of this change.

## Review status

This version can be reviewed for typography, layout, mobile behavior and empty media positioning. Final 3D visuals are pending. The Dribbble reference previously returned a proxy 403, so comparison with its actual composition and animation remains pending until it is accessible or a recording is supplied.

## Validation in this instance

- `npm run build`, `npm run typecheck`, `npm run lint`, and `git diff --check`: passed.
- Full browser suite: 8 tests passed, including both languages, accessibility, keyboard/mobile navigation, independent disconnected Web3, pending media without requests or substitute artwork, and typography checks.
- Browser measurements at 1440px: container 1320px, side margin 60px, header 92px, columns 552.625px/703.375px with a 64px gap, hero font Roboto Mono 52px/500/59.8px.
- Browser measurements at 390px: container 350px, side margins 20px, header 76px, one column, hero font Roboto Mono 30px/500. No overflowing content or DOM text below 16px was found in the landing page inspection.
- The rendered interface font chain is `Roboto Mono, monospace`, including the independent Web3 controls; proportional automatic fallbacks are excluded. Generated WOFF2 family metadata identifies Roboto Mono.
- Captures: `/workspace/scratch/blockivia-prepared-desktop-1440.png` and `/workspace/scratch/blockivia-prepared-mobile-390.png`.
- `src/content/site.ts` and `public/logo.png` remain unchanged. The missing media means actual video decoding/playback and final object artwork are still pending validation; none of these results establish final visual approval or a production deployment.
