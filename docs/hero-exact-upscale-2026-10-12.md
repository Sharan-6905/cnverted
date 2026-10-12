# Exact-artwork hero upscale

The user requested keeping the current hero image exactly, without generative changes.

- Source: `public/figma/redesign/hero-bridge-enhanced.webp` (2003 × 785). Unmodified.
- Output: `public/figma/redesign/hero-bridge-exact-{1280,2003,4006}.{avif,webp}`.
- Largest export: 4006 × 1570 (2×). Lanczos3 interpolation only; no generated details, sharpening, recoloring or compositing.
- Rebuild: `node scripts/assets/build-hero-upscale.mjs` using the existing Sharp dependency.
- AVIF: quality 85, 4:4:4; WebP fallback: quality 95. Largest AVIF approximately 831 KB; smaller 1280-pixel export approximately 224 KB.
- Both preliminary generated alternatives were discarded and are not referenced by the website.

The picture element and preload use matching responsive width descriptors. The browser can select the appropriate asset for the rendered image width and device pixel ratio. The image retains its intrinsic aspect ratio. Smaller screens show a less enlarged bridge scene; large screens retain the existing desktop composition, with softly blended outer edges on ultrawide displays.

Checked widths: 320, 390, 430, 768, 820, 1024, 1366, 1440, 1536, 1728 and 2560 pixels, plus 844 × 390 landscape. The image loaded, intrinsic aspect ratio remained 2.5516, and no horizontal page overflow was observed. Headline and navigation remained separate.

Conventional upscaling produces a larger, smoothly interpolated file; it does not recover missing source detail or create native 4K detail.
