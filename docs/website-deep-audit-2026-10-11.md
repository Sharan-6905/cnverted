# Cnvrted website — second deep UI and content audit

**11 October 2026 · Current local website · Audit only**

The visual identity is coherent: the illustrated world, serif headings, paper textures, violet accents, and new ocean footer belong together. The main remaining problems are readability inside illustrations, inconsistent control of motion, keyboard navigation, and uncertainty about what the product includes today.

This report records **38 findings and recommendations**: 16 concerning presentation and interaction, and 22 concerning content and the buyer journey. They are not 38 confirmed software bugs. Every item identifies whether it is directly observed, established by source inspection, an editorial recommendation, or a claim needing owner confirmation. No application code or published content was changed for this audit.

## Scope and evidence

Fresh browser inspection covered the homepage and its product canvas, feature stack, prompt walkthrough, mobile menu, and footer; pricing; booking; customers; Help Center; and contact. Targeted source review also covered the motion film, workforce animations, case studies, blog copy, about, careers data, early access, privacy, terms, navigation, and shared artwork.

| Viewport | Fresh checks |
| --- | --- |
| 320 × 740 | Help Center, unsuccessful help search, contact, narrow navigation |
| 390 × 844 | Homepage hero, menu keyboard behavior, prompt walkthrough/back, pricing, feature artwork |
| 820 × 1180 | Booking embed, customers, homepage feature stack, prompt actions, anchor navigation |
| 1280 × 720 | Homepage canvas, sticky feature presentation, deep-link behavior |
| 1536 × 864 | Homepage footer, fixed navigation over the dark background |

These are CSS viewport sizes, not physical screen diagonals. Browser zoom, display scaling, and browser chrome determine the usable area on a 13-, 14-, 16-, or 17-inch laptop.

This is a second pass over the existing [website audit](website-audit-2026-10-11.md), [content audit](content-audit-2026-10-11.md), [responsive audit](responsive-audit-2026-10-11.md), and [asset audit](asset-performance-audit-2026-10-11.md). Existing issues that are still present are included rather than presented as newly introduced regressions. Earlier route/build results are not represented as tests rerun today in this pass.

**Priority:** P1 = address before the next public polish/release pass; P2 = meaningful usability or clarity improvement; P3 = editorial/detail polish. No critical outage was observed. “Confirm” means the site makes a claim whose truth this audit cannot establish; it does not mean the claim is false.

## Presentation and interaction

| ID / priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| UI-01 · P1 | **Feature artwork becomes unreadable on phones and tablets. Observed + source; unresolved from the earlier audit.** The ICP Brain table contains 5.322px source text and is scaled down further. At 390px, some text boxes were only about 3.8px high. Strategy labels are similarly tiny. The added three-step summaries help, but do not convey the details inside the illustration. | Build a simpler mobile composition with one readable account/result at a time. Keep essential explanatory text at normal reading sizes. Treat the tiny desktop table as decorative, or offer an explicit full-size view. Do not solve this by scaling the whole desktop drawing down again. |
| UI-02 · P1 | **The interactive canvas is too dense for short laptop viewports. Observed + source.** At 1280 × 720, the canvas occupied roughly 1112 × 753px, starting about 120px below the top. Its bottom was outside the viewport. Outreach labels and message text include 8–10px styles. This is a readability and nested-scrolling problem, not horizontal overflow. | Give the homepage a compact presentation mode with larger text and fewer simultaneous controls. Offer a larger interactive view for detailed exploration. Review short-height laptop layouts independently of width breakpoints. |
| UI-03 · P1 | **White copy loses contrast on the lavender feature panel. Observed.** ICP Brain uses white/pale text over a light, varying paper texture. The description is noticeably weaker than the adjacent black-on-white artwork. The green panel has lighter patches too. | Use dark ink on the lavender panel, or darken the text area with a restrained overlay. Test contrast against the brightest texture patches, not just the CSS base color. This audit did not calculate a pixel-by-pixel contrast compliance result. |
| UI-04 · P2 | **The glass navigation does not retain consistent contrast over dark sections. Observed.** At the footer on a 1536px viewport, dark navigation text and the dark wordmark sit over a gray translucent surface; the wordmark becomes particularly weak. | Give the fixed navigation a stable light surface or a deliberate dark-section variant. Preserve the approved ocean fade; the problem is the navigation layered above it. |
| UI-05 · P1 | **Mobile menu can leave keyboard focus hidden behind the open panel. Reproduced.** At 390px, open the menu, focus its final Contact link, then press Tab. Focus moves to the hero’s Sign In link while the menu remains open and covers it. | Close the disclosure when focus leaves it, or implement an intentional modal navigation pattern with its corresponding focus behavior. Also provide consistent outside-click dismissal. Verify both forward and reverse tab order. |
| UI-06 · P2 | **Leaving the AI walkthrough loses the keyboard position. Reproduced.** Selecting ChatGPT correctly focuses its heading. Selecting “Choose another AI” returns to the chooser but leaves `document.activeElement` at BODY instead of the initiating button. | Restore focus to the assistant button that opened the walkthrough. Apply the same restoration to Replay, which also exits to the chooser. |
| UI-07 · P1 | **Feature deep links do not reliably land on their target. Observed more than once; cause not established.** Navigation to `/#feature-title-brain` left the visitor above the feature on laptop and tablet. After settling, the tablet heading was still about 2462px below the viewport top. | Reproduce in a production build on direct load and same-page navigation. Coordinate hash scrolling with deferred layout and sticky-card initialization, and reserve the header offset. Record the actual cause before changing scroll behavior. |
| UI-08 · P1 | **The GTM motion film has a pause control that pointer and touch users cannot discover or use normally. Source-confirmed.** `.gm-pause` has `opacity: 0` and `pointer-events: none`; it becomes visible only on `:focus-visible`. Keyboard access exists, so it would be incorrect to say there is no pause control. | Keep a small, quiet pause/play control visible to every input type, or reveal it on hover and tap as well as focus. Do not restore the large progress strip that was deliberately removed. Preserve looping playback. |
| UI-09 · P2 | **Integration and client marquees lack a local pause affordance. Source-confirmed.** Their `autoScroll` mode explicitly bypasses hover/focus pausing in `AnimatedCard`. Reduced-motion support exists, but it does not help a visitor who simply wants time to inspect a logo. | Allow pause on hover/focus and provide a compact touch-accessible pause option. Retain the requested animated appearance. |
| UI-10 · P2 | **Workforce autoplay can repeatedly announce simulated statuses to assistive technology. Source-confirmed risk; not tested with a screen reader.** Sales Journey loops through approval and completion while a live `role="status"` changes on those phases. | Keep automatic visual loops out of live announcements; announce user-triggered actions once. Verify with VoiceOver or NVDA before calling this an accessibility pass. |
| UI-11 · P2 | **Decorative controls resemble functioning controls. Observed + source.** Feature artwork contains “Add New Node,” a send button shape, table links, and selectors, although the illustration is marked `aria-hidden` and is not the interactive product canvas. | Make the illustration’s status obvious with a subtle “Example workflow” label, reduce button-like emphasis, or wire only deliberately interactive actions. Avoid making visual affordances promise a click that does nothing. |
| UI-12 · P2 | **AI chooser arrows imply an external destination, but open an on-page animation. Observed + source.** ChatGPT, Claude, Gemini, and Grok buttons show an up-right arrow; their accessible names correctly describe a walkthrough. The clarifying text appears below the choices. | Use a play icon or visible “Try demo” label, and put the explanation before the row. Keep a separate, clearly labeled route for users who want to use the copied prompt themselves. |
| UI-13 · P3 | **Slack is included twice in the base integration list. Source-confirmed.** This is separate from the deliberate duplicated tracks used to create a seamless marquee. | Remove the duplicate base entry or replace it with a genuinely supported integration. Keep the animation’s implementation clones hidden from accessibility. |
| UI-14 · P3 | **The deferred canvas loading state is not explicit enough. Source-confirmed.** Once requested, its poster control is disabled and says “Product canvas,” which does not explain whether it is loading. Retry behavior is already present. | Use a short “Loading canvas…” status and a visible busy indicator while loading; retain the readable poster and retry fallback. |
| UI-15 · P2 | **Tablet hero copy competes with the bridge artwork. Observed at 820px.** The headline and gray subtitle sit across more detailed scenery than on the phone layout, where the white fade is stronger. The subtitle is the weaker element. | Tune the fade and text position for the tablet crop. Keep the approved artwork and heading, but give the copy a quieter background. |
| UI-16 · P2 | **The homepage asks visitors to absorb many demonstrations before reaching customer proof. Editorial/layout recommendation.** The canvas, full-cycle film, three feature panels, integrations, prompt walkthrough, and workforce preview all precede the customer section. The page was roughly 10,380px tall at 1280px width in one inspected state. | Move a compact, factual proof strip higher and tighten repeated explanations. Keep the approved sections, but give each a distinct role: product overview, workflow evidence, setup help, and future capabilities. Validate changes with actual visitor behavior rather than assuming a shorter page always converts better. |

## Content and buyer journey

| ID / priority | Finding and evidence | Recommended change |
| --- | --- | --- |
| C-01 · P1 | **Paid-plan value remains incomplete. Source + pricing UI; existing unresolved issue.** Surge shows $119/month but “Monthly credit plan” instead of an allowance. There is no useful explanation of what 40 free credits buys, action costs, seats, or the feature difference between plans. | Publish confirmed allowances and meaningful usage examples. If paid plans are negotiated, state that plainly beside the price. Do not invent quotas. |
| C-02 · P1 | **Integration logos communicate broader certainty than the supporting information. Source; existing unresolved issue.** The homepage presents CRM/outreach tools without a per-integration status, supported action, or destination for details. Terms describe a narrower set of concrete connections. | Create a small availability matrix: available, beta, planned; native versus connector-mediated; read, export, sync, or send. Keep source platforms separate from product integrations. Confirm every logo against the shipped product. |
| C-03 · P2 | **“Join the waitlist” and “start free today” lack a clear distinction. Source; existing unresolved issue.** Early access offers both but does not identify the specific capability or cohort the waitlist unlocks. | Name the waitlist’s purpose, who should join, and how it differs from the public beta. Keep both paths only if that distinction is real. |
| C-04 · P1 | **Billing descriptions disagree across pages. Source-confirmed content inconsistency.** Privacy says “If and when we begin charging,” while Terms describes monthly paid plans arranged with the team and pricing shows $119/month. | Have the owner confirm current billing operations, then align the wording. This is a consistency finding, not a legal determination or replacement policy advice. |
| C-05 · P2 | **ICP Recipe assumes ten existing customers while targeting early-stage startups. Source-confirmed expectation mismatch.** “Point us at your top 10 customers” reads as a prerequisite, but the adjacent use-case card addresses a new startup. | Explain two entry points: existing customer examples or a starting hypothesis when customer history is limited. Avoid implying the product cannot be used before ten customers. |
| C-06 · P2 | **Several use-case labels are vague or depart from the GTM promise. Editorial.** “Create infinitely” and “Find the signals behind a new beginning” do not say what users can do. “Scale social media” sounds like a different product. | Use specific, parallel outcomes such as “Find your first buyers,” “Spot buying conversations,” “Launch a new offer,” and “Explore a new market,” subject to actual capabilities. |
| C-07 · P2 | **ICP Recipe, ICP Brain, and GTM Strategies do not have sharply differentiated jobs. Editorial.** Recipe and Brain both describe customer profiling and refinement; Strategies also repeats the customer-research story inside its illustration. | Give each one input, one action, and one output. Example: customer evidence → shared traits; a brief → a working ICP; ICP + signals → a prioritized account plan. Validate those distinctions with the product. |
| C-08 · P2 | **Workforce promises proposals without showing the proposal workflow. Source-confirmed mismatch.** “Your whole marketing workflow, from research to proposals” is broader than the three workforce panels, which demonstrate setup, assignments, outreach, and follow-ups. | Narrow this section’s subtitle to what the panels demonstrate, or add a real proposal capability when confirmed. Keep “Coming Soon” prominent. |
| C-09 · P1 | **“Real time” claims need an operational definition. Confirm; existing unresolved issue.** Blog copy repeatedly says LinkedIn, Reddit, and X are read in real time. The inspected website does not establish refresh cadence, platform limits, or coverage. | Publish the actual freshness and coverage, or use wording that matches the measured behavior. Do not imply all public activity is available immediately. |
| C-10 · P1 | **Performance proof needs dates, attribution, and a defined denominator. Confirm; existing unresolved issue.** Case-study content includes 100% of the company’s pipeline and an average signal-to-first-outreach claim of under one hour. The external campaign already has a useful “reported results from one campaign” qualification. | Preserve that qualification and add the campaign period, measurement source, and relevant scope. Distinguish the company’s own operating story from independent customer evidence. Do not generalize one result into a typical guarantee. |
| C-11 · P2 | **One illustration still mixes fictional-looking people with real-looking domains. Source + visible artwork; existing unresolved issue.** ICP Brain shows Robby Montana/Naomi Bale with `techwave.com` and `livefoot.com`. Its sample status is less clear than the main film’s fictional-company disclosure. | Use reserved `.example` domains and an unobtrusive sample label, or document the source and permission for real references. Apply one provenance convention across demos. |
| C-12 · P2 | **Customer cards have uneven substance. Source; existing unresolved issue.** Curato and Bahari Services have names/logos but no description, category, or website; the other six records include those details. | Get approved descriptions and destinations. Until then, use a consistent logo-only treatment rather than visibly incomplete cards. |
| C-13 · P2 | **The Help Center mainly explains the product rather than helping people complete tasks. Browser + source.** Searching “reset password” returned no result, with a working email/clear-filters fallback. The twelve answers contain little troubleshooting for login, exhausted credits, disconnected Gmail, failed exports, or missing replies. | Add concise, verified task guides and recovery steps based on the beta’s actual behavior. Keep the existing empty-state recovery. Search itself is working; the gap is content coverage. |
| C-14 · P2 | **Contact is framed as support and partnerships but leads with the sales calendar. Browser + source.** On a 320px phone, the calendar follows the introduction before direct team contact. The first four FAQs concern sales calls. | Put a simple support/sales/partnership choice and contact information before the booking embed. Move support FAQs above call preparation questions. |
| C-15 · P2 | **The setup prompt assumes prior business context is available to the chosen assistant. Source.** It requests information from “our previous discussions.” The success helper does tell people to use a conversation that knows their business, but users see that only after copying. | Explain the prerequisite before copying: use an existing relevant conversation, or supply a business brief first. Say where the result should go in Cnvrted. Do not promise cross-chat memory or automatic account transfer. |
| C-16 · P2 | **The early-access form asks for a required phone number before the value of joining is clear. Source.** Five sections include required name, phone, email, and additional company information. | Make phone optional unless the team has a specific operational need, state the expected completion time after measuring it, and separate required access details from optional research questions. |
| C-17 · P3 | **Model and assistant names are used at different levels of specificity. Source; confirmation needed.** The canvas selector says “Opus 5.5,” “Sonnet,” and “Gemini”; Help Center calls Claude, ChatGPT, Kimi, and Gemini “models”; the provider animation shows assistant brands. | Distinguish providers, consumer assistants, and actual model identifiers. Verify shipped model names with the product owner; do not change them based on a guess about availability. |
| C-18 · P3 | **Capitalization and terminology vary. Source-confirmed editorial issue.** Orka versus ORKA; Cnvrted versus Cnvrted.AI in artwork; “Our Clients” versus “customers”; “Terms of Service” versus “Terms & Conditions”; “Bangalore” in a customer description versus “Bengaluru” elsewhere. | Set a short style sheet. Prefer Orka, Cnvrted, customers, sentence-case headings, and consistent page-link titles. Preserve a third party’s own naming where intentional. |
| C-19 · P3 | **Booking preparation copy is ambiguous. Source + UI.** “Bring the customers you want to reach” can sound like an invitation to bring people to the call. The actual Calendly description is clearer and asks for an example. | Use “Bring your website and an example of the customers you want to reach.” Keep the 30-minute duration and preparation instructions consistent. |
| C-20 · P3 | **The Partners footer link does not deliver a partnership-specific destination. Source.** It opens the general contact page, which initially emphasizes a sales demo. | Link to a partnership section or preselected contact intent, or label the link “Partnership enquiries.” |
| C-21 · P2 | **Primary CTA labels ask visitors to infer the difference between paths. Source + UI.** Get Started and Sign In share the beta URL; Book a call/Book a demo lead to the booking page. The homepage gives an existing-user action equal hero prominence without explaining free access. | Keep a clear new-user primary action and a sales secondary action. Move Sign In into navigation if appropriate. State “40 free credits” close to the free-start path only after confirming the offer. |
| C-22 · P2 | **“Live demo” is imprecise for a scripted, simulated canvas. Source + UI.** The canvas does contain sample-data and no-message disclosures, which is good, but they are much smaller and appear deeper in the experience. | Rename the badge “Interactive demo” or “Sample workflow.” Keep fictional-data disclosures readable near the first interaction. Do not remove the useful simulation labels. |

## Copy changes worth making

These are proposed edits, not applied changes. Product-dependent wording must be confirmed first.

| Current wording | Suggested direction | Reason |
| --- | --- | --- |
| “Squeeze the market in minutes” | “Find your next best-fit accounts” | Clearer outcome; avoids an unexplained metaphor and an unmeasured timing promise. |
| “Point us at your top 10 customers” | “Start with your best customers—or the buyers you want to reach.” | Makes the starting point useful for both established and early-stage teams. |
| “Find the signals behind a new beginning” | “Find the companies most likely to need your first offer.” | Says what the startup use case does. |
| “Create infinitely” | “Explore a new market” | Specific GTM task instead of an unlimited-sounding slogan. |
| “Your whole marketing workflow, from research to proposals, in one tab.” | “Build your AI team for research, outreach, and follow-ups.” | Matches the workforce panels more closely. |
| “Bring the customers you want to reach.” | “Bring your website and an example of the customers you want to reach.” | Clear call preparation. |
| “Live demo” | “Interactive demo” | More accurate label for simulated behavior. |
| “Copy Prompt” | “Bring your business context” as a section heading; “Copy prompt” on the action | Separates the benefit from the button instruction. |
| “Monthly credit plan” | Confirmed credit quantity plus a short usage example | Gives a buyer enough information to assess the price. |
| “Which AI models does Cnvrted work with?” | “Which AI providers power Cnvrted?” if that is what the answer describes | Keeps the question and answer at the same level of specificity. |

The approved “Reinventing GTM” headline and “Find the right buyers. Turn signals into sales.” tagline are concise and do not need another rewrite. Explain GTM and ICP near their first substantive use for unfamiliar visitors rather than expanding every heading.

## What is working and should be preserved

- The phone hero, pricing cards, narrow Help Center, tablet customer grid, and wide footer fitted their inspected viewports. The sampled DOM width checks showed no page-level horizontal overflow.
- The ocean artwork now blends into the footer rather than starting at a hard white edge. The visual identity does not need a reset.
- The booking embed loaded actual available-date UI. Its initial loading state was temporary, not a failed calendar. No booking was submitted.
- Help search produced a usable no-results state with a clear-filter button and an email route.
- The prompt walkthrough focuses its initial heading correctly. Only restoration on exit was found missing.
- Reduced-motion and offscreen-pause handling exist in several motion components. The issue is inconsistent discoverability and local control, not a complete absence of motion safeguards.
- The main motion film labels fictional companies and simulated outcomes. Its intent score is explicitly illustrative. Preserve those distinctions.
- The canvas typewriter includes a screen-reader-only complete sentence and an `aria-hidden` visual typing span. A repeated string in the inspection snapshot is **not** sufficient evidence of duplicate screen-reader speech, so it is not listed as a defect.
- Next.js development controls visible in local screenshots are development tooling, not a production design flaw.

## Evidence captures

The screenshots are viewport captures of a moving page, so individual animation phases can vary. They support the observed layout issues; source inspection supports behavior not visible in a still image.

- [Laptop canvas density](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/laptop-canvas.png)
- [Laptop feature presentation](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/laptop-feature.png)
- [Tablet feature text and contrast](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/tablet-features.png)
- [Phone feature artwork](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/mobile-features.png)
- [Mobile menu after focus moves behind it](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/mobile-menu-hidden-focus.png)
- [Navigation over the dark footer](/Users/dhruvpradeep/Downloads/Documents/cnvrted-review/deep-audit/laptop-footer-navigation.png)

## Implementation pointers

| Area | Main source locations |
| --- | --- |
| Navigation and focus | `src/components/illustrated/header.tsx`, `copy-prompt-section.tsx`, `copy-prompt-walkthrough.tsx` |
| Feature readability and anchors | `redesign-feature-deck.tsx`, `redesign-feature-artwork.tsx`, `redesign-home.css`, `src/components/ui/glass-cards.tsx` |
| Canvas sizing and copy | `product-canvas-demo.tsx`, `product-canvas-outreach.css`, `product-canvas-chat.tsx`, `deferred-visual.tsx` |
| Motion control | `gtm-motion-film.tsx`, `gtm-motion-film.css`, `automated-workforce.tsx`, `src/components/ui/feature-block-animated-card.tsx` |
| Integration and provider labels | `integrations-strip.tsx`, `redesign-feature-motion.tsx`, `src/lib/help-center.ts` |
| Commercial copy | `pricing.tsx`, `src/app/early-access/page.tsx`, `src/components/early-access-form.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Proof and editorial content | `src/lib/customers.ts`, `src/lib/case-studies.ts`, `src/lib/blog-posts.ts`, `src/lib/careers.ts` |
| Contact and booking | `contact.tsx`, `src/app/contact/page.tsx`, `src/app/book-demo/page.tsx`, `footer.tsx` |

Unless prefixed otherwise, component filenames in this table are under `src/components/illustrated/`.

## Recommended order for the rework

1. Fix the mobile menu and walkthrough focus restoration; reproduce and repair anchor landing.
2. Replace tiny mobile artwork with readable compositions; simplify the laptop canvas; strengthen textured-panel and navigation contrast.
3. Make pause controls available to pointer and touch users while preserving the requested loops and avoiding the removed progress bar.
4. Resolve pricing, integration availability, and billing wording with the owner. Then align the surrounding copy.
5. Tighten use-case names, distinguish the three feature concepts, clarify demo labels, and improve support/customer content.
6. Check the resulting design with keyboard navigation, reduced motion, text zoom, real touch devices, and a production build.

## Remaining verification boundaries

- This pass did not submit leads, emails, applications, community forms, or bookings. The prior audit’s production-delivery concerns remain open; local rendering does not prove delivery.
- Production performance, LCP/CLS/INP, constrained-network behavior, and low-end-device animation cost were not measured. The earlier asset-size report remains a useful optimization backlog, but file storage size is not page-transfer size. Its footer asset inventory predates the new island wordmark.
- This is not a full accessibility certification. Real screen-reader behavior, 200%/400% zoom, browser-specific layout, and every animation phase at every width still need a dedicated verification pass.
- Current pricing entitlements, shipped integrations, model versions, customer results, open-role details, and asset permissions need owner/source confirmation. No external claims were declared false without evidence.
- The earlier audit’s OG-image freshness, publication-date checks, career-detail completeness, and large route-specific asset recommendations were not all revalidated here. Keep them open rather than treating this report as evidence they were resolved.
- Saved screenshots live in the adjacent `cnvrted-review/deep-audit` directory; preserve that folder with this report if sharing the audit outside this workspace.
