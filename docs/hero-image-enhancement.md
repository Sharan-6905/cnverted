# Hero artwork enhancement — 11 October 2026

- Original: `public/figma/redesign/568-5634-hero-bridge.png`, 2001 × 786 pixels. Preserved.
- Selected asset: `public/figma/redesign/hero-bridge-enhanced.webp`, 2003 × 785 pixels, 611,366 bytes.
- Method: built-in image generation edit using the original artwork as a reference; WebP encoding at quality 95 with Sharp.
- Prompt: faithfully restore the same panoramic low-poly landscape, composition, bridge, castle, windmill, mountains, lake, foliage and colours; recover crisp polygon edges and masonry details without added objects, text, grain or sharpening halos. Requested 3840 × 1504 output.
- Limitation: the image tool returned approximately 2000-pixel output on both attempts despite the requested size. This is an AI clarity enhancement, not a native 4K super-resolution asset. Selected the first result.
- Selected generation: `/Users/dhruvpradeep/.codex/generated_images/01a0dd3a-ddd7-7412-8b26-f8bc4940ad8a/exec-745e9d11-b054-4e4c-99ee-8293e4ee88b9.png`.
- Website: quality increased from default 75 to 95; responsive image sizes now match the minimum artwork width and desktop width cap; current Next.js preload API used.
- Validation: production build passed. At 1440px the new asset loaded with quality 95, with no page overflow. Visual evidence: `audit-fix-evidence/hero-enhanced.png`.
