# Official BlockivIA logo

`public/logo.png` is the official asset, as explicitly selected by the user. Its bytes remain unchanged.

| Property | Official `logo.png` | Reference `blockivia-logo-original.png` |
| --- | --- | --- |
| Format | PNG | PNG |
| Dimensions | 1000 × 1000 px | 500 × 500 px |
| Color mode | RGBA, with transparency | RGB, with black background |
| File size | 24,543 bytes | 40,320 bytes |
| SHA-256 | `f82b100212ac143078a8854539df77030d404d5513df8571d198efc16e42a7b0` | `0a11694979cc6bcd04345b16ea4a56e019711e303059b9e250b75bf648e77fe9` |

The reference was read from `origin/main` commit `53122054c38efd031b7c1b60b85d93e291d3c7d0` and copied intact to this branch for comparison. No merge or write to `main` was performed. The official asset on that commit is byte-identical to this branch's `public/logo.png`.

Both files decode correctly. The official has twice the canvas resolution along each axis, four times the pixel count, and transparent outer margins; the reference has a black background and different framing. They are not pixel-identical files. Pixel dimensions alone do not establish that one is an identical or higher-quality rendition of the other. The official displays clearly at the selected sizes and supplies sufficient source pixels for its maximum 500 CSS-pixel width at a 2× display density, without upscaling. No new resampling, recompression, recoloring or image generation was performed.

The landing page renders the official image once, in the hero's H1, with a localized alternative text that includes the tagline. The header uses an ordinary Home/Inicio navigation link. The tagline is not repeated as a separate visible text element; no wordmark is reconstructed using text or CSS.

The PNG's natural proportions remain 1:1. CSS positions only its transparent outer padding outside the flow; all visible artwork, including the underscore, tricolor line and embedded tagline, remains intact. Measured alpha bounds on the official canvas: `(135, 368)` to `(877, 625)`. The image has automatic proportional height and no filters, clipping, blending or geometric transforms. The source image itself is neither cropped nor edited.

The Spanish wording embedded in the official logo remains unchanged on the English page to preserve the supplied artwork. Accessible alternative text and the rest of the interface are localized.
