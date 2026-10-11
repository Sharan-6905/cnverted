# Loading performance fixes — 11 October 2026

## Findings and changes

| Resource | Before (bytes) | After (bytes) | Change |
| --- | ---: | ---: | --- |
| Hero image | 597,278 | 304,095 | Pre-encoded AVIF; avoids a runtime optimizer request. WebP fallback retained. |
| Shared paper texture | 172,800 | 107,544 | AVIF selected through CSS image-set, with WebP fallback. |
| Three integration logos combined | 435,692 | 11,290 | Appropriately sized WebP derivatives of the original logos. |
| Initial script payload, gzip comparison | 213,554 | 210,325 | Optional AI walkthrough dynamically imported after selection. |

The hero and paper texture save 358,439 bytes together (~350 KiB). Integration logos are lazy-loaded: their 424,402-byte saving applies when scrolling towards them, not necessarily to first paint. Script sizes are reproducible gzip comparisons of the script URLs in each initial HTML document; actual browser transfer varies with Brotli and cache state.

The hero previously depended on a client layout effect and ResizeObserver to scale the illustration. Its coordinates now use equivalent percentages and a CSS aspect ratio, so correct initial layout does not wait for JavaScript. Desktop and phone cropping, fades, birds and artwork remain intact. The AVIF is preloaded in the document head with high priority. The product canvas now begins loading within 120px rather than 600px of the viewport; manual activation still works.

## Measurements and limits

- Live HTML initially took 1.07 seconds including transfer in a Python request. A later curl request measured TTFB 0.424 seconds and total 0.526 seconds. These are connection-specific samples, not a controlled before/after server-speed comparison.
- This is a resource/implementation audit, not a Lighthouse or field Core Web Vitals result. Browser performance-entry access was unavailable in the automation environment, so no LCP, INP or speed-score improvement is asserted.
- Per-request rendering and the nonce-based Content Security Policy are preserved. No hosting region or security-policy changes.
- Existing enhanced image retained at its original 2003 × 785 dimensions; AVIF quality 70, paper quality 60. Originals and fallback assets remain available.

## Validation

- Production build and TypeScript passed.
- Confirmed AVIF hero selected and preloaded; no horizontal overflow at 390, 820 and 1440 pixels.
- Compared desktop/tablet/mobile visual output with the existing design.
- Clicked ChatGPT setup walkthrough, confirmed it loaded on demand, and returned using Choose another AI.
- No browser console errors during those checks.
