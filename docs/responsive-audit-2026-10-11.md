# Homepage responsive source audit — 11 October 2026

Scope: homepage sections below the hero, excluding the original GTM canvas and shared header/navigation. This is a source and layout-constraint audit; the main audit records the separate browser verification. CSS pixels and viewport height determine responsive behavior, not a laptop's physical diagonal.

## Fixed in this pass

| Finding | Evidence | Correction |
| --- | --- | --- |
| Copy Prompt provider buttons are too tightly packed at 320px. | A 288px section minus panel padding/border leaves roughly 246px; two columns with an 8px gap are roughly 119px each. The original icon, label, arrow, two gaps and padding demand around 125px. | Allow grid items to shrink and reduce only the narrowest-screen button padding, gaps and logo size. Preserve the centered row and the full-width Copy Prompt button. |
| Show the full prompt has a small activation target. | The button had a 34px minimum height. | Increase its minimum height to 44px. |
| Walkthrough result cards are narrow on intermediate widths. | Three recipe result columns remained active from 641px upward; after section and panel gutters, cards have only around 140–210px of usable content width in this range. | From 641–900px, each recipe occupies a full row and its three short items form an internal grid. Phone results remain vertically stacked; desktop retains three cards. |
| Narrow walkthrough browser/content rows cannot safely shrink. | Address, document header and pasted-file flex items had no explicit minimum-width allowance; filenames and browser addresses can establish an oversized intrinsic width. | Add minimum-width handling, wrap the address and pasted filename, and let the toolbar wrap below 375px. |
| Workforce replay/reset controls are undersized, and desktop task selectors are small. | Replay was 32/36px, reset was 30px, task select was 36px on desktop. | Set these controls to 44px; reduce reset-row vertical padding to preserve the panel rhythm. Reserve room next to the replay control in the first field label. |
| Small workforce status/helper labels are low contrast. | Several 8–9px labels used #888 on white, around 3.5:1. | Darken these labels to #62656b, retaining the established neutral palette. |
| Long sample email or team label can constrain flex rows. | Email text and team option text lacked minimum-width allowances. | Allow these text items to shrink/wrap while preserving icon size. |

## Reviewed and preserved

- The motion film has independent container breakpoints at 600px and 900px, plus tall stacked phone frames and an extra-small frame adjustment. Its card sizing uses the actual film container, not a guessed laptop model.
- Feature panels keep the approved floating cards, moving yellow pipelines and rotating model logos.
- Stacked feature cards calculate their sticky offset from actual card height and viewport height so the full card can enter view on short laptop screens. Reduced motion disables the stacking effect.
- Recipe cards become a two-column flow layout below 768px. Desktop positioning remains intentional artwork composition.
- Integration and client-logo tracks remove desktop bird gutters on mobile. Decorations move into their own flow positions rather than overlapping moving logos.
- Workforce switches from three columns to a single centered column at 900px. Columns use minmax(0, 1fr), and the centered single-column layout is capped at 440px.
- Customer stories switch to a vertical card below 768px. Images have an aspect ratio, text content can shrink, and pagination/arrows have 44px targets.
- FAQ becomes one column on tablets and phones. Footer navigation uses three columns on tablet and two on phone, with the brand spanning the full row.
- Copy Prompt uses a wrapping centered desktop button row, a two-column phone grid, and a centered status line.

## Viewport coverage to verify in the browser

320, 390, 768, 820, 1024, 1280, 1366, 1440, 1536, 1728 and 1920 CSS pixels; include short heights such as 720 and 768px for laptop layouts. These widths cover common usable browser sizes for 13–17 inch laptops, but zoom, OS display scaling and browser sidebars can create intermediate widths.

For this pass specifically, inspect Copy Prompt at 320px; the walkthrough's final recipe at 768/820px; and the workforce setup/team picker/approval/completion states at 320 and 1024px. Check clipped inner content as well as document-wide overflow, because the site intentionally clips decorative artwork.

## Recommendations, not applied as redesigns

1. **Simplify the small-screen decorative feature illustrations.** Several original Figma labels are only 5.322px in the base artwork and become about 3px after scaling into a phone panel. They are intentionally hidden from assistive technology and the real feature description stays readable, but simplified native mobile cards would communicate better than miniature UI. Doing this well is a separate artwork redesign.
2. **Reduce stylesheet layering in a later cleanup.** Repeated `.redesign-feature-panel`, `.redesign-feature-illustration` and media-query overrides work through source order but make future spacing changes harder to predict. Consolidate only with screenshot comparisons so the approved artwork is preserved.
3. **Consider one visible shared pause control for longer ambient demonstrations.** Reduced-motion support is present. A discoverable pause control would help visitors who want to read a scene without waiting for the next loop.
4. **Validate on real Safari/iOS and Android before launch.** Viewport emulation catches geometry; it does not establish real-device safe-area, browser toolbar, font-rendering or native select behavior.

## Validation performed by this audit

- Read repository AGENTS.md and the installed Next.js CSS documentation before edits.
- Inspected source across all listed responsive breakpoints and related style layers.
- Parsed all three changed stylesheets with PostCSS successfully.
- No dependencies, TSX wording, branding assets or animation timing were changed by this pass.
- Browser screenshots and full-site runtime checks belong to the main audit, not this source-only report.

Changed files:
- `src/components/illustrated/copy-prompt-section.css`
- `src/components/illustrated/copy-prompt-walkthrough.css`
- `src/components/illustrated/automated-workforce.css`

## Follow-up: mobile illustration legibility

Implemented a compact three-step summary below each scaled strategy/brain illustration at widths up to 767px. The summaries use real 13px text in an unscaled DOM list:

- GTM Strategies: Your ICP → Buying signals → Target list.
- ICP Brain: Your brief → AI research → Qualified leads.

Desktop layout, original artwork, logos and moving yellow flows are unchanged. The new captions explain the decorative miniature UI without changing its approved appearance or covering the animation. The longer-term recommendation to simplify tiny decorative labels remains optional.

Additional files changed:
- `src/components/illustrated/redesign-feature-deck.tsx`
- `src/components/illustrated/redesign-feature-motion.css`
