# Cnvrted website audit — 11 October 2026

## Result

Completed parallel reviews of responsive UI, editorial content, public routes, forms, accessibility, metadata, and asset loading. Applied concrete local fixes, preserved the approved visual theme and motion, and verified the changes in the preview. This is a local website audit, not certification of the separate beta product, live integrations, or every physical device.

## Detailed reports

- [Content and grammar: fixes plus 19 recommendations](content-audit-2026-10-11.md)
- [Responsive layout and accessibility changes](responsive-audit-2026-10-11.md)
- [Routes, forms, metadata, and operational checks](site-functionality-audit-2026-10-11.md)
- [Images, fonts, bundles, and loading](asset-performance-audit-2026-10-11.md)

These reports contain the individual findings, affected source files, and verification limits. The following is the consolidated decision list.

## Fixed

| Area | Issue | Result |
|---|---|---|
| Narrow phones | AI-provider buttons were too tight at 320px | Adjusted padding, gaps and icons; all five controls fit without horizontal overflow. |
| Copy Prompt | Expand control had a small hit area | Increased the target to 44px. |
| Tablet walkthrough | Three result cards were cramped at intermediate widths | Results now stack into readable cards at 641–900px. Tested the Gemini sample flow through its final recipe at 820px. |
| Small walkthroughs | Toolbar and file labels could crowd their containers | Added wrapping and minimum-width safeguards. |
| Workforce | Replay/reset/select controls were undersized | Enlarged the relevant hit areas to 44px. |
| Workforce | Native 16px phone select text clipped task names | At 430px and below, each selector occupies its own full-width row; the panel grows naturally. Wider selectors also improve the compact laptop layout. |
| Workforce | Some tiny labels had weak contrast | Darkened supporting labels and improved wrapping. |
| Mobile feature artwork | Original Figma labels scale too small to communicate the workflow | Added readable three-step summaries below the strategy and brain illustrations on phones. The decorative artwork, flowing lines and changing logos remain. |
| Homepage copy | Missing article and vague market subtitle | “Squeeze the market in minutes” and “Turn public signals into a focused list of buyers.” |
| Setup copy | Awkward “Copy below prompt” wording | “Copy the prompt below to set up Cnvrted,” with a shorter explanation. |
| Illustration copy | Job-application language appeared inside a prospecting workflow | Replaced it with hiring-signal/account-fit language; corrected LinkedIn spelling and the people-table heading. |
| Editorial consistency | Fragments and unclear workforce/help/application wording | Corrected the specific strings documented in the editorial report. The approved hero remains unchanged. |
| Case study wording | Overly broad visitor-attribution statement | Corrected the wording without inventing or changing customer metrics. |
| Demo navigation | Five rendered links across four source files targeted a removed section | Changed them to the existing `/#gtm-demo` destination. |
| Early access | Validation tried to focus hidden pill-selection inputs | Errors now focus a visible control; labels and error associations are explicit. |
| Forms | Rejected requests could leave a busy state; rapid repeat submits were possible | Added recovery, synchronous pending guards and accessible status/focus handling. Tested with mocked services. |
| Forms | Missing autocomplete and reduced-motion handling | Added appropriate field hints and respectful validation scrolling. |
| Framework | Deprecated middleware convention and Edge-runtime build warnings | Migrated to Next 16’s `proxy.ts` convention, preserving CSP, nonce and matcher behavior. Production build passes without those warnings. |

## Responsive coverage

Physical diagonal is not a CSS breakpoint. A 13-inch laptop at one scaling setting can have the same CSS viewport as a 16-inch laptop at another. The audit therefore checks available browser width and height rather than claiming support based only on inches.

| Category | CSS widths checked | Coverage |
|---|---|---|
| Phones | 320, 390 | Hero, navigation, AI buttons, workforce, feature summaries, forms, pricing, customers, booking; dense film outreach at 320px. |
| Tablets | 768, 820, 1024 | Homepage dimensions, navigation, pricing, product, Copy Prompt recipe, workforce and canvas. |
| Smaller laptops / scaled displays | 1280, 1366, 1440 | Homepage width/overflow, main page templates and film. |
| Larger laptop / desktop viewports | 1536, 1728, 1920 | Homepage width/overflow and capped content widths. |
| Short landscape viewport | 844 × 390 | Resources menu remains scrollable and contained. |

All eleven sampled homepage widths had document width equal to viewport width. About, Contact, Blogs, Careers, Case Studies, Help Center, Learn and Privacy also had no document-wide horizontal overflow at 320, 768 and 1366px. These measurements detect page overflow; they are not a claim that every animation frame or third-party widget was visually reviewed.

The ten film scenes were inspected through the development review selector at 390, 768 and 1440px (30 scene/viewport combinations), with no scene-level horizontal overflow. Dense signals and outreach scenes received visual checks; the normal preview has no review selector. The optional Gemini walkthrough was exercised through paste, sample answer, profile, generation and recipe. The original canvas’s draft/approval flow was spot-checked using simulated data.

## Functional and build checks

- All 29 sitemap page URLs returned HTTP 200 locally.
- All had exactly one H1, canonical metadata and a description.
- No duplicate IDs or broken internal hash destinations remained in the server responses.
- All 124 referenced local image files exist; rendered images have alt attributes.
- All 76 JSON-LD blocks parse.
- Four missing-route categories return 404; robots and the ICP download respond successfully.
- TypeScript and production build pass.
- Mocked tests cover invalid-selection focus, failed-request recovery and double-submit prevention. Browser validation at 390px confirms focus reaches the invalid name field and errors are associated.
- No real applications, waitlist entries, email deliveries, Slack joins, or bookings were made. No deployment or repository push was performed.

## What should change next

### Priority 1 — resolve before relying on live acquisition

1. **Configure and verify the live backend.** This preview exposes a placeholder Supabase origin. Confirm the intended project, insert policies, permitted fields, spam protection, and sender configuration in staging.
2. **Make save-and-confirm one server-validated operation.** Confirmation-email routes should not operate independently of a verified submission. Add idempotency and persistent throttling; currently throttling is per process.
3. **Test timeout, slow-network and retry behavior with staging services.** Rejected requests now recover, but a hung request still needs a deliberate timeout/cancellation policy before automatic retries.
4. **Publish the paid credit allowance and action costs.** The $119 plan still requires a conversation to understand its actual allowance. Add a worked cost example once the figures are confirmed.
5. **Separate available features from examples and roadmap.** The large integration carousel, demo workflows and “Coming Soon” workforce need a consistent, factual availability story. Confirm the listed CRM/outreach tools, supported sources, refresh cadence and approval behavior.
6. **Verify public commercial claims.** Keep evidence for case-study figures, company permissions, job openings, plan prices and team details. Local UI code cannot establish their truth.

### Priority 2 — improve clarity, consistency and accessibility

7. **Clarify positioning.** B2B prospecting, social-media growth, startup launches and broad “create infinitely” language compete. Choose a primary buyer/use case and make feature-card titles parallel.
8. **Label all illustrative identities consistently.** Smaller artwork still contains real-looking domains and portraits. Confirm provenance/licensing; use reserved `.example` domains when fictional.
9. **Clarify the early-access offer.** Explain what the waitlist adds beyond the already available free beta. Consider collecting only name, work email and one workflow question initially.
10. **Standardize editorial conventions.** Agree on British or American spelling, title/sentence case, one booking CTA label, and monitored support addresses. Exact product/brand names should remain unchanged.
11. **Complete customer and careers information.** Supply verified descriptions/websites for incomplete customer entries, and location, seniority, compensation and process details for open roles.
12. **Review model/version labels.** Treat demo model names as illustrative unless they match actual selectable product models; maintain one verified model inventory.
13. **Continue accessibility testing.** Test screen readers, keyboard sequences, 200% browser zoom, OS text enlargement and touch interactions on real devices. Existing reduced-motion behavior is useful; consider one discoverable site-wide motion control without reintroducing the rejected progress bars.
14. **Keep phone diagrams readable.** New summaries explain the process, but the original tiny decorative table text is not a mobile reading surface. A future native mobile diagram can replace those details if they become essential content.
15. **Review blog and error-page tone.** Some authored posts and playful confirmation/404 copy differ from the calmer homepage voice. Editorial alternatives are in the content report.
16. **Update the social share artwork deliberately.** It still uses older positioning. Change the actual image and its description together if it should match “Reinventing GTM.”
17. **Update publication dates when shipping.** Align sitemap/article revision dates with meaningful published changes, rather than setting every page to build time.

### Priority 3 — performance and maintainability

18. **Measure deployed production performance.** Obtain LCP, CLS and INP under mobile network/CPU conditions. This audit does not invent a Lighthouse score from development behavior.
19. **Optimize large source images with reviewed derivatives.** Preserve originals; start with large route-specific PNGs and portraits. The current bridge hero is already optimized to roughly 200–213 KiB in the measured WebP responses.
20. **Deduplicate assets after a reference audit.** Public storage is 243.6 MiB, including old videos not loaded by the redesigned homepage. It is not the homepage transfer size. Exact duplicate groups are listed in the asset report.
21. **Reduce font and optional-code complexity.** Preserve the approved primary typography; assess secondary fonts and lazy-load the optional Copy Prompt walkthrough after measuring its bundle contribution.
22. **Measure conversion before removing more sections.** Repeated calls to book, get started, sign in and try examples may serve different intents. Use actual behavior to decide what deserves prominence.
23. **Run a staging end-to-end release check.** Include the separate beta login, a saved lead, confirmation email, calendar booking and actual CRM behavior with dedicated test accounts. The motion demos are illustrative, not integration tests.

## Evidence

- Desktop/tablet walkthrough: [tablet recipe screenshot](../../cnvrted-review/audit-tablet-recipe.png)
- Mobile full-width task selectors: [mobile workforce screenshot](../../cnvrted-review/audit-mobile-workforce.png)
- Final homepage desktop view: [desktop screenshot](../../cnvrted-review/audit-desktop-home.png)

The detailed workstream reports are retained so recommendations, source facts and completed fixes remain distinguishable. No claim is made that a viewport simulator replaces real Safari/iOS, Android, assistive technology, third-party integration or production-network testing.
