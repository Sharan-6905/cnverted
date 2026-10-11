# GTM motion audit — 10 October 2026

Scope: the ten-scene “Squeeze market in minutes” motion film. Preserve the existing story, site palette and autoplay loop.

## Findings and fixes

- Opening composition: oversized wrapping at tablet width made the business card much taller than the ICP card. Shortened the headline, reduced its tablet size, aligned both cards and their footer notes.
- Vertical rhythm: fixed caption-height deductions did not account for wrapping. Scenes now use a content-sized caption row and a flexible composition row with an explicit gap.
- Mobile clearance: several cards reached or overlapped the simulation footnote. Reserved a footer zone and corrected portrait frame heights, including 320px screens.
- Breakpoints: overlapping wrapper height rules disagreed with the film’s usable-width breakpoint. Consolidated them and checked both sides of each boundary.
- Branding: blended the Cnvrted mark into the paper background; replaced the font-dependent Bloomcart symbol with a consistent vector flower. Real platform marks remain unchanged.
- Type and contrast: raised 7–8px helper text to 9px where practical, darkened secondary labels, and kept the established editorial and sans-serif font families. The out-of-ICP row remains readable when de-emphasised.
- Pipeline: the deal ticket previously used approximate offsets and could miss its lane. It now lives inside the lane track and moves by measured lane offsets. Long buyer roles truncate, and the mobile won status replaces the amount cleanly.
- Resize continuity: rebuilding the responsive geometry now preserves playback time rather than restarting the film.

## Verification

- Inspected all ten settled scenes at widths 320, 390, 623, 624, 647, 648, 768, 1024 and 1280px, plus the original 682px view.
- Checked scene cards against captions, footer and frame edges; checked internal width overflow and missing images. Fixed the remaining long role at the 624px breakpoint.
- Visually reviewed opening, ICP, targets, signals, contacts, outreach, replies, meeting, deal and CRM compositions across phone, tablet and desktop sizes.
- Verified a complete timeline wrap (cycle 0 → 1), keyboard pause/play and scene preservation when resizing.
- Reduced-motion static summary retained and given responsive side gutters (CSS review).
- TypeScript check: `npx tsc --noEmit` passes.

Development only: `?motion-review=1#market-title` reveals a scene selector for deterministic visual QA. It is absent from ordinary preview URLs and production builds.
