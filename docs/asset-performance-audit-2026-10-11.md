# Asset and loading audit — 11 October 2026

This is a local source and file-weight audit, with two image-optimizer response measurements. It is not a production Lighthouse or Core Web Vitals result. Local development timing is not representative of hosting performance.

## Findings

The `public` directory contains 398 files totalling **243.6 MiB**. This is storage/deployment footprint, **not** the page's transferred size. Many assets are unused by the current homepage or appear only on other routes.

Largest source files:

| File | Source weight |
| --- | ---: |
| `public/videos/home-hero-detail-4k.mp4` | 18.17 MiB |
| `public/videos/home-hero-loop-4k.mp4` | 14.86 MiB |
| `public/videos/home-hero-detail-4k-hevc.mp4` | 11.47 MiB |
| `public/figma/not-found/landscape.png` | 10.28 MiB |
| `public/figma/help-hands.png` | 9.55 MiB |
| `public/figma/careers-imgImage60.png` | 8.28 MiB |
| `public/figma/privacy-landscape.png` | 8.15 MiB |
| `public/figma/blogListing-imgImage61.png` | 7.91 MiB |
| `public/figma/contact/dhruv.png` | 6.22 MiB |
| `public/figma/home-imgImage39.png` | 6.16 MiB |

The current redesigned homepage does **not** render the older `HomeHeroVideo` component. Do not attribute its 4K video files to the current homepage's initial load. In the older component, the video has `preload="none"`, starts after page load, uses smaller mobile/1080p sources, respects reduced motion/save-data and pauses offscreen.

Current homepage source assets:

| Asset | Source weight | Loading notes |
| --- | ---: | --- |
| Bridge hero PNG | 3003.5 KiB | Next Image, priority, responsive optimizer. |
| Paper texture WebP | 168.8 KiB | CSS background reused across several sections; browser caches the same URL. |
| Market-paper WebP | 231.0 KiB | Next Image with lazy default, `sizes="100vw"`. |
| Left bird PNG | 704.1 KiB | Next Image, responsive sizes. |
| Right bird PNG | 661.0 KiB | Next Image, responsive sizes. |
| Footer ocean PNG | 2217.3 KiB | Next Image; two layers share the same source so duplicate layers do not imply two independent source downloads. |

Direct local optimizer checks, `Accept: image/webp`, quality 75:
- Bridge at width 1920: HTTP 200, **204,320 bytes (199.5 KiB)**.
- Bridge at width 3840: HTTP 200, **218,062 bytes (212.9 KiB)**.

The image optimizer already makes the bridge substantially smaller than its source. Its mobile `sizes` value is 1462px to serve an intentionally oversized/cropped illustration, not a normal viewport-sized photograph. Review a separately art-directed phone crop before reducing that number; changing only `sizes` could degrade sharpness.

## Existing good loading behavior

- Original GTM canvas loads through a dynamic import when within 600px of the viewport; fallback content and retry are present.
- The coded GTM motion film is dynamically imported when within 600px of its frame. It has no MP4 download.
- The feature stack loads GSAP/ScrollTrigger only near the feature section.
- Main motion pauses while offscreen or when the document is hidden.
- Most decorative images use Next Image; many raw SVGs/portraits explicitly use lazy loading.
- Fraunces and Google Sans Flex are the primary preloaded design fonts. Secondary font configurations explicitly disable preloading.

## Actionable recommendations

1. **Run the production build through a throttled network audit before making loading claims.** Measure LCP, CLS, INP and actual transferred resource sizes on the deployed site. The present audit establishes no production score.
2. **Create optimized derivatives of the large PNGs without deleting original design sources.** Route-specific landscapes and contact portraits are the first candidates. Preserve transparency and inspect visual differences before switching references.
3. **Audit references and deduplicate identical large files.** SHA-256 checks found these exact duplicate groups:
   - 1803 KiB each: `public/radar-scan.png`, `public/banners/careers-bg.png`, `public/story/story-03.png`.
   - 2955 KiB each: `public/figma/redesign/499-1227-imgImage101.png`, `public/figma/redesign/499-651-imgImage101.png`.
   - 1850 KiB each: `public/figma/redesign/pages/terms-imgImage119.png`, `public/figma/redesign/pages/help-imgImage119.png`.
   - 2558 KiB each: `public/figma/redesign/pages/role-imgImage113.png`, `public/figma/redesign/pages/careers-imgImage114.png`.
   Deduplication reduces repository/deployment size; it improves page transfer only where different duplicate URLs are requested together.
4. **Consider consolidating secondary fonts after a visual pass.** The root config defines Raleway/Merriweather; the illustrated shell adds Fraunces, Google Sans Flex, Open Sans, Inter and League Spartan. Not every configured font is necessarily downloaded on a page, but this increases styling and font-loading complexity. The approved primary pair should remain.
5. **Consider lazy-loading the optional Copy Prompt walkthrough.** It is statically imported by the section although it is only shown after the visitor chooses an assistant. Separate its small provider metadata from the component and dynamically import the walkthrough to remove optional interactive code from the initial route. Measure the bundle first to establish the benefit.
6. **Keep unused older videos out of the critical path.** Their storage weight alone is not a homepage speed bug; removal requires a reference audit across routes and any externally linked URLs.

No assets were recompressed, removed or replaced during this audit.
