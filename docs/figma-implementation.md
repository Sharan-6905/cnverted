# Figma website implementation

Design: [Cnvrted website](https://www.figma.com/design/OjyEeHT6HACp1iY71CWyYI/Untitled?node-id=8-318).

## Pages

- `/`: looping video hero with a single Book a call action, signal windmill, ICP features, GTM strategy cards, integrations, FAQ and footer.
- `/blogs`: Figma card layout backed by the existing articles in `src/lib/blog-posts.ts`.
- `/about`: landscape, story, gallery and Bengaluru map. The dark story media area matches the empty frame in Figma; no video was supplied.
- `/careers`: searchable roles and category filters.
- `/careers/[slug]`: role details and an application form with the selected role prefilled. Existing roles are retained alongside the Figma Marketing Lead role.
- `/help-center`: illustrated Help Center from Figma frame `120:2636`, with working search, categories, and five-answer pagination.

All five career detail pages use role-specific copy from `src/lib/career-details.ts`: an overview, two focus areas, responsibilities, and candidate requirements. AI/ML covers signal processing and model evaluation; GTM Engineering covers workflows and integrations; GTM Lead covers ICP strategy and pipeline; Marketing covers content and demand; the Founders Office internship covers research and operational projects. The generic fallback for non-marketing roles is removed. A typed role-slug map requires a full description for each listed role. Short listing summaries remain in `src/lib/careers.ts`, so the full job descriptions are not imported by the client-side search or application form. Existing locations, employment types, and the Marketing Lead experience range are preserved.

The shared presentation is in `src/components/illustrated/`. Original Figma artwork is stored in `public/figma/`; duplicate exports share files. `artwork.tsx` keeps illustration coordinates within scalable canvases. Page text, cards, navigation and forms use responsive HTML. The design's unrelated LocalCan/Recepto copy and repeated placeholder cards were replaced with Cnvrted content.

The homepage hero uses a 3840×2160 upscale of the supplied `cnvrted home page loop.mp4`, served as `public/videos/home-hero-loop-4k.mp4`. The original is 1280×720 at 24 fps; it is retained unchanged as `public/videos/home-hero-loop.mp4`. The upscale was processed locally using [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan)'s `realesr-animevideov3` model at 3×, which sharpens the illustrated lines. This is enhanced 720p material, not a native 4K master.

The enhanced file preserves all 193 frames, the 24 fps timing and the eight-second loop. It is encoded as H.264 with CRF 16, YUV 4:2:0 and fast-start metadata, with the unused audio removed. It autoplays muted and inline without playback controls. Visitors who request reduced motion see the matching high-resolution first-frame poster.

A separate poster image stays visible until playback starts and whenever playback is paused or fails. Visibility and focus events resume playback interrupted by the browser while respecting the reduced-motion preference.

The homepage headline reads “Your GTM. Powered by” with a highlighted phrase cycling through “buying signals”, “live intent”, and “better timing”. Every phrase has a 3-second turn with a gentle vertical fade inside a softly rounded, asymmetric label. A persistent background transitions between pale olive, warm ochre, and sage, with a small signal, intent, or timing icon beside the text. The previous outline oval and star are removed; the rotating text uses the site’s sans-serif alongside the editorial GTM headline. All three phrases share one grid cell to reserve the longest phrase’s dimensions, keeping the subtitle and demo button fixed. The subheading explains web signals, ICP matching, and AI ranking. This small client component uses CSS animation instead of a recurring React timer; intersection, hero coverage, and document visibility pause the loop. Hover does not interrupt playback. Incoming and outgoing phrases overlap for 360ms with matching easing, keeping their combined opacity at one instead of briefly blanking the label. The background changes on the same handoff, including the last-to-first wrap, and negative delays put all frames on the same cycle immediately. Reduced motion, printing, and the initial HTML show the first phrase, and screen readers receive one stable heading rather than repeated announcements. Desktop (1440px) and mobile (390px) previews were checked for wrapping and horizontal overflow; scrolling away pauses every phrase and returning resumes them.

The second homepage section is a continuous lead-qualification illustration in `lead-flow.tsx` / `lead-flow.css`. Three persistent source cards crossfade every four seconds through LinkedIn, X, Reddit, Product Hunt, GitHub, G2, Crunchbase, YouTube, and company websites. Trigger chips rotate through funding, hiring, expansion, launches, new tools, and leadership. The Cnvrted scoring panel cycles through Claude, ChatGPT, Kimi, and Gemini with context, intent, and scoring descriptions.

Staggered streams continuously travel through the mill. Fine SVG tracks have straight exits from their card sockets and smooth curves into the mill. Each lane carries a repeated train of crisp, fixed-length dashes with short darker heads. The playback rate is 1.2× the previous design: 160.8 SVG units/second on desktop and 216 on mobile. Six packets are spaced across each 6.667-second journey, giving a new packet every 1.111 seconds and roughly two to three packets on each wire. Paths are measured once; all inputs converge after 2.667 seconds and qualified outputs depart after a 333ms processing pause. Socket feedback follows every packet; card borders and score bars respond once per six packets, while portraits retain their calmer eight-second cadence. Source sockets briefly fill on dispatch; destination sockets, card borders, and score bars respond at the measured arrival time. The entire wire layer sits behind the tower and rotating sails. Large travelling badges, arrowheads, blurred trails, background dashes, and the dotted backdrop have been removed. A quiet branch indicates low-fit filtering. Scores are illustrative, not live customer data. The logo cycles use CSS and preload their small local SVGs, so swaps need no React timers or network requests. Existing Figma assets supply LinkedIn and the HubSpot, Slack, and Zapier workflow row; additional logo sources and licensing are listed in `public/brands/README.md`.

The tower and sails are separate transparent artwork layers derived from the original Figma illustration; the sails rotate on a 24-second loop. `mill-mechanism.tsx` adds a working cutaway: the original crown-wheel, main-wheel, and millstone face textures are projected into elliptical masks and rotate on 24-, 12-, and 6-second cycles. Clipped wood-grain highlights suggest the vertical shaft turning, and six small grain strokes fall from the hopper toward the stone. The bearings, shaft silhouette, tower, and support beams remain fixed. The original PNG is reused without modifying its pixels or adding a generated asset. Machinery uses CSS with no animation-frame loop and shares the scene’s off-screen/covered/tab pause. Reduced motion shows the original static artwork. Separate desktop and mobile arrangements keep the entire flow visible, and animations pause off screen or in a hidden tab. Reduced-motion preferences show a static version of the complete flow.

Ranked cards use six fictional ink-style character portraits from `public/avatars/lead-characters.png`. Each card alternates between two characters every eight seconds; the verification badge stays steady while the card border and score bar acknowledge that arrival. All six faces share a single optimized sprite atlas. Reduced motion keeps one stable portrait per card. Generation details and the final prompt are in `public/avatars/README.md`.

Source, scoring, ranking, and workflow cards share a frosted-glass surface with translucent gradients, backdrop blur, fine highlights, and soft shadows. Brand tiles retain native SVG colors, with a contrasting dark tile for Kimi and a full-opacity blue LinkedIn asset. Soft color washes behind the cards make the transparency visible. Logo transitions use separate 240ms exit and entry fades with 2px of travel, so changing labels do not overlap; the frosted-glass blur remains static. Mobile uses a lighter blur, and unsupported browsers receive a solid readable surface.

The ICP Brain and GTM Strategies feature illustrations use `signal-wires.tsx` to animate yellow pulses along the original wire geometry. Packets keep a fixed length and constant speed in SVG coordinates through every bend. A shared 1.653125 playback rate scales all travel, arrival, and processing times together: 132.25 units/second on the brain's approximately 2.30-second cycle, and 158.7 units/second on the strategy's approximately 2.78-second cycle. Each path is measured once with `getTotalLength()` to calculate launch times. Strategy inputs converge into the AI card; the output leaves its bottom port after the full packets arrive and an approximately 73ms processing pause, then follows the curved wire to the strategy card. Brain signals similarly move from the prompt through the AI block to results. `ScaledArtwork` pauses each illustration's shared CSS timeline off screen or in a hidden tab. Reduced motion retains stationary yellow segments. The original SVG wire assets and illustration layout remain the source of the geometry.

The feature illustrations also use `feature-motion.tsx` / `feature-motion.css`. ICP Brain cycles through Claude, Kimi, ChatGPT, and Gemini on colored glass tiles once per signal cycle, reusing the local native-color logos. Kimi uses a dark surface for contrast. Three illustrated recipe cards drift independently and crossfade between six customer/trigger recipes, alongside a floating learning badge. The workflow node reads “Cnvrted” and cycles through funding, hiring, expansion, product launches, new tools, and leadership changes. All frames and small images are available up front; CSS handles motion without React timers. These animations share each illustration's off-screen/tab pause and keep their first frame for reduced motion.

All call-booking links use `BOOKING_URL` from `src/lib/booking.ts`, pointing directly to the date-and-time picker at `https://calendly.com/cnvrted/30min`. The homepage, shared hero, About demo action, FAQ, and legacy footer use “Book a call”. Contact and pricing share a compact booking card that opens the same 30-minute Calendly event; the old Cal.com embed is no longer mounted. Signup links still lead to the beta app. The Calendly 30-minute event was verified on 2026-09-27 with Google Meet selected. Its saved public invitee form requires Name, Email, Company name, and Website, followed by optional LinkedIn profile and multiline preparation notes. These settings live in Calendly; verification stopped before submitting a booking.

## Responsive layouts

The 2026-09-27 responsive pass preserves the artwork and desktop motion while adapting the layout from 320px phones to 1920px laptops/monitors:

- The home hero uses fluid heading sizes and viewport-height spacing. Its copy, call button, and scroll cue stay separate on short laptops and compact phones. Secondary hero content can grow instead of overflowing a fixed height; large-screen top padding is capped.
- Below 1024px, the windmill uses a 480×1640 vertical composition capped at 520px wide: three readable source rows, the mill and scoring panel, then three ranked lead rows. SVG socket positions and curves match that composition. The desktop scene and its existing animation speed are retained. The tall scene scrolls fully through before the next chapter covers it.
- Below 768px, GTM strategies are three HTML cards with the existing illustrations, readable descriptions, and real links, replacing the scaled desktop board. Feature, FAQ, footer, blog metadata, and career detail layouts have tablet/phone spacing and stacking rules.
- The illustrated navigation shows the wordmark at every size, with 44px mobile controls and a scrollable menu on short screens. The secondary-page header uses its compact menu below 1024px, avoiding the tablet product-dropdown overflow. Both menus close with Escape and restore focus, and reset when changing layout. Mobile signup remains reachable. Product menus have a viewport-height scroll limit.
- Mobile inputs, selects, and textareas use 16px text; booking destinations and form submission behavior are unchanged.

Browser verification covered the homepage at 320, 375, 390, 430, 667 (landscape), 768, 820, 1024, 1280, 1366, 1440, and 1920px. Eighteen other public routes (including both blog articles and all five career details) passed layout/overflow checks at 320, 390, 768, 1024, and 1440px: 90 route/width combinations. Mobile/tablet menus, keyboard dismissal, form text sizes, the 320px pricing dialog, and the direct Calendly link were checked without submitting forms or booking events. These are browser viewport checks, not physical-device certification.

## Run locally

```sh
npm install
npm run dev
```

The development script uses port 3010. A production preview can be started with:

```sh
npm run build
npm run start -- -p 3020
```

Use the existing Supabase environment configuration for application storage. Email notifications require `RESEND_API_KEY`; the three email endpoints now return a controlled 503 when the key is absent, instead of failing during the build. The existing rate limits and validation remain in place.

## Verification

- The first two sections now form a connected scroll scene: the hero holds in place and recedes into a rounded frame, the windmill section rises over it. Progress follows native scrolling in both directions; the first frame includes a working “Follow the signals” anchor. The sticky stage and decorative motion are disabled for reduced-motion preferences. The completed handoff restores the diagram to its exact original scale and position, preserving wire alignment and animation speeds.
- The second-to-third transition holds the windmill while the feature section rises over it. The decorative curved connector between the first two sections and the branching connector above the features have been removed; section transitions and in-diagram signal animations remain. Feature cards fan out with small opposing rotations and settle flat as they enter the viewport; all movement reverses with native scrolling. On mobile, the tall diagram scrolls completely into view before holding, and card travel is reduced. Covered windmill loops pause and resume when revealed. Desktop (1440px) and mobile (390px) checks confirmed final card alignment, reverse playback, existing signal timing, and no horizontal overflow or browser errors.
- The rest of the homepage uses staggered, one-time reveals for headings, FAQs and footer columns, with gentle depth on the strategy board and integration artwork. A thin olive progress line tracks the page. Motion is disabled for reduced-motion preferences; content remains visible without JavaScript. Native scrolling is preserved.
- Production build and TypeScript passed. The latest lead-flow update was verified with `npm run build -- --webpack`; Turbopack hit a local compiler-process port permission error in this environment. No compiler configuration was changed.
- Desktop (1440px) and mobile (390px) layouts reviewed in the browser.
- Navigation, mobile menu, keyboard dismissal, FAQ expansion, career search, combined filters, empty state and reset checked.
- Role selection and required application fields checked without creating an application or sending email.
- Refined lead-flow intake, ranking, measured arrival timing, and covered-state pause checked in the browser at desktop (1440px) and mobile (390px) sizes; mobile has no horizontal overflow. Browser samples confirmed all six desktop pulses advance by the same distance in the same interval, and no browser errors were reported. Reduced-motion CSS presents the full static flow.
- Rotating platform/model logos and trigger chips reviewed at 1440px and 390px. All logo assets loaded, cards remain populated during crossfades, and the browser reported no errors.
- Production routes return 200; unknown career slugs return 404. Email validation, missing-key responses and rate limiting checked locally.

Next.js still reports its existing middleware convention deprecation and a Google Sans Flex fallback-metrics warning. These do not prevent the production build.

## Pricing page — September 28

`/pricing` keeps the Figma illustrated design: landscape hero, cream windmill cards, olive pill buttons, the green/yellow featured middle card, pricing FAQs, and illustrated footer. The latest revision replaces long descriptions and feature lists with concise credit pricing: Spark is free with 40 credits, Surge is $119 per month, and Dominion offers custom credits through sales. Surge's 1,000 credits/month is a user-authorized placeholder for this local preview, not a confirmed allowance; update it before publication. The comparison section remains removed. Metadata and FAQs match the shorter credit-based copy.

`pricing.tsx` and `pricing.css` contain the server-rendered page. Card heights follow their shorter content while preserving the original windmill artwork. The generic frosted blue/green/purple `PricingPlans` component is retained but is not rendered by this route. Spark's “Start free” link uses the existing beta app destination; Surge and Dominion use direct Calendly links. This is marketing copy only; no credit allocation, checkout, or payment integration was added.

Verified the illustrated desktop view and responsive layouts at 320, 390, 768, 1024, and 1440px with no horizontal overflow. The comparison table is absent, plan names and rates match, and TypeScript and whitespace checks pass. All changes remain local; nothing was committed, pushed, or deployed.

## Help Center — September 28

The new Help Center uses Figma frame `120:2636`: the original hands artwork and two fade layers, pill-shaped search/category controls, five rounded question cards per page, arrow pagination, shared FAQ, and illustrated footer. The off-canvas reference cards are excluded. Repeated questions and unrelated LocalCan FAQ placeholders are replaced with Cnvrted content about signals, ICP, AI, credit plans, and support. Existing header and footer components preserve the site's navigation and corrected copy.

`help-center.tsx` renders the artwork and heading; `help-search.tsx` handles client-side search, category selection, page changes, and a clearable empty state. Ten answers live in `src/lib/help-center.ts`. Search matches all entered words across the question, answer, and category, and combines with the selected category. Changing either filter resets pagination. Keyboard page changes focus the results heading, the results count is announced, and clearing filters restores search focus. FAQ links point to existing pricing, privacy, contact, beta, and Calendly destinations; support email remains `work@cnvrted.com`.

Original Figma assets are saved as `public/figma/help-*`: the 3524×1599 PNG, bottom fade (4064.2×636.2), top fade (1946.2×441.2), search and category SVGs (32×32), and pagination SVG (147×14.7279). The artwork retains its Figma coordinates inside `ScaledArtwork`; SVG root dimensions are preserved. No temporary Figma URLs are used in the app.

Verified desktop appearance against the Figma screenshot, responsive overflow at 320, 390, 768, 1024, and 1440px, image loading/geometry, combined search and category filters, pagination reset, empty results, and keyboard controls. TypeScript and whitespace checks pass. All work stays local.
