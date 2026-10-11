# Website audit fixes — 11 October 2026

Implementation follow-up to `website-deep-audit-2026-10-11.md`. The illustrated identity, serif headings, violet/green textures, animated pipelines, rotating assistant logos, looping demonstrations, and ocean footer fade are retained. This is a local implementation, not a production deployment.

## Changes against the audit

| Finding | Implementation / status |
| --- | --- |
| UI-01 | Replaced miniature strategy and ICP Brain drawings with responsive HTML cards and SVG pipelines. Mobile uses a vertical sequence; tablets get readable cards. Floating recipe cards use a two-column tablet arrangement. |
| UI-02 | Compact laptop canvas height follows available viewport height. Outreach text and targets are larger; narrow lead tables become contact cards. The detail panel has an explicit scrollable height instead of growing beyond its container. Short laptops have compact workflow navigation. The graph overview remains zoomable; detailed scenes still require internal scrolling. |
| UI-03 | Dark text on lavender; stronger green background treatment. No formal contrast certification claimed. |
| UI-04 | Stable near-white fixed navigation surface and dark wordmark. Footer blending is unchanged. |
| UI-05 | Mobile menu closes on focus exit, outside pointer interaction, or Escape. |
| UI-06 | Returning from the assistant walkthrough restores focus to its initiating assistant button. |
| UI-07 | Stable hash markers outside animated card surfaces, pre-reserved desktop stack spacing, and a bounded layout-aware anchor coordinator. Coordination stops on user input. Stacking is disabled below 1024px; card and pipeline animations remain. |
| UI-08 | Visible compact film pause/play button. Loop retained; no progress strip restored. |
| UI-09 | Marquees pause on hover/focus and have explicit touch-accessible pause/play controls. |
| UI-10 | Workforce automatic phase changes no longer feed the live status message. Manual actions can announce. Added local pause/play. Requires a later real screen-reader pass. |
| UI-11 | Native feature summaries replace decorative fake controls. Sample results are labeled. |
| UI-12 | Assistant chooser uses play icons and explains the local sample walkthrough before the buttons. |
| UI-13 | Removed duplicate Slack base entry; seamless conveyor clones remain hidden from assistive technology. |
| UI-14 | Deferred loading says “Loading walkthrough…” and retains busy, retry, and text fallback states. |
| UI-15 | Stronger tablet hero fade preserves the bridge artwork while separating copy from it. |
| UI-16 | Compact customer proof appears immediately after the interactive canvas, before the longer film and feature stack. |
| C-01 | Paid plan is labeled team-managed; buyers are told to confirm allowance, costs, seats, and included features. No unsupported quota invented. Exact plan details remain owner-dependent. |
| C-02 | Added connection-availability explanation grounded in the existing Terms, and qualified the other logos. Exact shipped integration matrix still needs product confirmation. |
| C-03 | Clarified that the beta is available now and the future-access list is separate. Exact upcoming cohort/capabilities still need owner definition. |
| C-04 | Removed hypothetical “if and when we begin charging” wording from privacy billing text. Current operational/legal details still require owner review. |
| C-05–07 | Removed ten-customer prerequisite, made use cases concrete, and differentiated Recipe, Strategies, and Brain copy. |
| C-08 | Workforce subtitle now covers research, outreach, and follow-ups; Coming Soon remains prominent. |
| C-09 | Removed unsupported immediate-monitoring wording from the affected product claims. Actual source coverage and freshness remain to be confirmed. |
| C-10 | Removed unsupported own-pipeline percentages, timing metrics, and blanket every-client claims. Existing external campaign remains qualified as one reported campaign; its supporting period/source still needs owner evidence. |
| C-11 | New feature sample uses fictional Primer/Bloomcart/Maya content without real-looking personal domains. Main film's fictional-data disclosure remains. |
| C-12 | Six complete customer records use full cards; two incomplete records use a deliberate logo-only treatment. Approved descriptions/destinations still needed. |
| C-13 | Added account access, credit usage, Gmail connection, and Notion export help with safe recovery/escalation steps. No unverified beta UI instructions. |
| C-14 | Support and partnership contacts now precede the sales calendar; support FAQs moved first. |
| C-15 | Prompt prerequisites explained before copying; explains where to put the resulting business brief. |
| C-16 | Phone is optional, including client validation. No external form submission performed. |
| C-17 | Demo selector uses assistant brand names and is labeled “Demo AI assistant.” Help distinguishes illustrative assistant choices from product entitlements. Shipped model IDs remain unverified. |
| C-18 | Normalized Orka, customers, Bengaluru, and Terms & Conditions references in affected content. Retained intentional product feature titles. |
| C-19 | Booking preparation asks for a website and an example of target customers. |
| C-20 | Partnership enquiries points to the dedicated contact section. |
| C-21 | Start free is the acquisition action; Sign in is in navigation. Existing 40-credit offer is surfaced near the hero CTA, as already stated on pricing and help pages. |
| C-22 | Scripted canvas badge is now “Interactive demo”; simulation disclosures preserved and enlarged. |

## Verification

- Production build and TypeScript compilation passed. `git diff --check` passed.
- Next emitted a non-blocking Google Sans Flex fallback-metrics warning; page font rendering was visually checked. No font redesign applied.
- Browser checks used CSS viewport sizes rather than physical laptop diagonals. Initial checks covered 390×844, 820×1180, and 1280×720. Final production checks included 320×740, 390×844, 768×1024, 1024×768, 1280×720, 1366×768, 1440×900, and 1920×1080. Sampled pages had no page-level horizontal overflow.
- Reproduced and verified menu forward-tab dismissal and prompt focus restoration. Verified feature pause, film pause, and workforce pause control state.
- Verified narrow contact and pricing rendering, optional phone field, and Help Center “reset password” search returning one answer.
- Verified production direct anchors after deferred content loads. Verified mobile outreach container is bounded to its canvas and the bottom Find contacts action is reachable by scrolling.
- No bookings, emails, account changes, or production form submissions were made. No claim of full VoiceOver/NVDA, real-device Safari, or formal WCAG certification.

## Owner-dependent completion items

Confirm paid-plan quotas/action costs/seats, a per-connection availability matrix, future-access scope, current billing operations, source freshness, external case-study attribution and period, two customer descriptions, and shipped model identifiers. The website now qualifies these gaps rather than filling them with invented facts.

## Evidence

- `audit-fix-evidence/mobile-workflow.png`: 390px responsive ICP Brain cards.
- `audit-fix-evidence/laptop-workflow.png`: 1280px strategy cards with flowing connector and preserved theme.
- `audit-fix-evidence/footer-wide.png`: 1920px footer fade and readable fixed navigation.
- Final production browser console sample contained no errors. Direct mobile feature anchor settled at approximately 100px below the viewport top; desktop canvas at approximately 124px.
- Local preview is running the verified production build on port 3020. Subsequent source edits require a rebuild/restart or switching back to the dev command.
