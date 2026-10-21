# BlockivIA: redesign review

Working branch: `feat/blockivia-redesign`. No production deployment or merge is part of this task.

## Local development and preview

Validated with Node.js 24 / npm 11. Install from the committed lockfile:

```sh
cd /workspace/blockivia
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Open port **3000** using the host application's preview controls, if available. The responsive site is the same app on desktop and mobile.

- `/`: Spanish landing page.
- `/en/`: English landing page; the selector preserves section anchors.
- `/certificados/`: original Sepolia certificate workflow, isolated from the landing page.
- `/en/certificates/`: English certificate interface.

## Validation

```sh
npm run build
npm run typecheck
npm run lint
npm test
```

Browser tests run against the actual `out/` static export, using Python 3 on port 4173 and Chromium. Set `CHROMIUM_PATH` if the browser is elsewhere; the cloud machine provides `/usr/bin/chromium`. Tests exercise keyboard and mobile navigation, language switching, page language, accessibility via axe, reduced motion, WebGL fallback, content and the disconnected wallet state. They do not send blockchain transactions.

## Content and destinations

`src/content/site.ts` contains the approved Spanish text and the paired English translation, the five approved capabilities, WhatsApp and social destinations, and the empty YouTube catalog.

- All eight blocks follow the approved order. No university logos or fabricated courses/videos/profiles are included.
- WhatsApp uses the approved channel URL.
- Contact uses `mailto:info@blockivia.xyz`.
- Social URLs are deliberately `null`; their controls are disabled until real destinations are configured.
- Add approved videos to `academyVideos` using their actual 11-character YouTube IDs and bilingual titles. Players load only after an explicit selection, using `youtube-nocookie.com`. Closing the modal removes the player.
- The original certificate SVG, contract address, ABI, and claim/download behavior remain. Its existing artwork remains in Spanish; the English route translates the interface, not the certificate artwork.

## Visual implementation

Three.js is dynamically imported near the hero viewport. It draws solid bevelled portals, a layered metallic core, lights, an orbit, and small articulated agents at work. No remote textures, models, fonts, or generated brand assets are required. Pixel ratio and frame rate are capped; rendering pauses out of view or when the document is hidden. Reduced motion draws a stationary frame; CSS geometry remains if WebGL cannot initialize. Other sections use solid CSS geometry with low-cost transforms.

The user has selected `public/logo.png` as the official logo. Its bytes are unchanged. It appears once, in the hero, including its embedded tagline; the header contains only ordinary navigation. The comparison with the newly uploaded `blockivia-logo-original.png`, dimensions, checksums and display constraints are documented in [LOGO.md](LOGO.md). No wordmark is reconstructed with text or CSS.

The supplied Dribbble URL returned `CONNECT tunnel failed, response 403` in this environment. Its actual composition/animation could not be inspected. The current design follows the written visual direction and must be compared with the reference once accessible; it is not presented as an inspected reproduction.

## Cloudflare Pages: static output, not a server deployment

`next.config.ts` uses `output: 'export'`, `trailingSlash: true`, and unoptimized local images. `npm run build` emits all four routes into `out/`. No Next.js server, API routes, or server actions are required. Separate root layouts produce correct Spanish and English document languages without relying on hydration; the documented `globalNotFound` option supplies the shared static 404 for those layouts. Client-side Web3 functionality remains compatible with the export.

Cloudflare Pages settings:

- Framework preset: Next.js **Static HTML Export**, or None with the settings below.
- Build command: `npm run build`.
- Build output directory: `out`.
- Node version: `24`.
- Root directory: repository root.

`npm start` serves the export locally on port 3000 using Python 3; `npm run preview:static` serves it on port 4173. `next start` is not compatible with static exports. These servers are for local review; Cloudflare Pages serves `out/` directly.

`public/_headers` exports headers supported by Cloudflare Pages. Its CSP allows the configured Sepolia HTTPS RPC and YouTube's privacy-enhanced embed host. New RPC, wallet connectors, or embedded services may require deliberate CSP changes. Existing wallet connection uses an injected browser provider; private credentials are not stored by the site. A real wallet on Sepolia and test ETH are required for an actual claim. No transaction has been sent during review.

## External resources still pending

1. Accessible Dribbble reference or a screenshot/recording to compare its composition and motion.
2. Real social-profile URLs.
3. Approved YouTube videos, if the academy should show videos immediately.
4. Optional manual review with a browser wallet and a Sepolia claim, separately authorized.

The first item limits comparison with the visual reference. The remaining items do not prevent local design review. Publication to Cloudflare and merging into `main` require the user's approval and have not been performed.

## Results in this cloud instance

- Static build, TypeScript, ESLint and `git diff --check`: passed.
- Full browser suite: 8 tests passed (Spanish/English accessibility, bilingual navigation, 320/390/768px mobile behavior, reduced motion, disconnected Web3 and WebGL/fallback).
- After the final language-link change: all 3 affected navigation/accessibility tests passed again.
- The static review server on port 3000 returned HTTP 200 with expected content for both landing pages, both certificate routes and the original SVG.
- The legacy certificate generator was converted to ESM to satisfy ESLint. Original and updated generators produced identical output with writes intercepted; the repository's certificate SVG was not regenerated.
- No Cloudflare deployment, production publication, merge, or actual blockchain transaction was performed. No integrated-preview-opening tool is available in this session; a running local server does not by itself confirm that the host UI exposes a preview panel.
