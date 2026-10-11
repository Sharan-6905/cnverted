# Functionality, route and accessibility audit — 11 October 2026

This is the parallel source/HTTP audit. Responsive screenshots and homepage fixes are recorded by the visual audit; this document does not claim visual testing of every secondary page. No applications, waitlist entries, Slack requests, bookings or emails were sent, and nothing was deployed.

## Fixed in this audit

| Severity | Finding | Change |
| --- | --- | --- |
| Medium | Early-access validation tried to focus hidden inputs for team size, previous sales-tool use and buying intent. A keyboard user could be left at the submit button with the error far above. | Validation now scrolls to and focuses the first visible option. Option groups have accessible labels and associated error messages. |
| Medium | An unexpected rejected early-access request could bypass the cleanup and leave the button saying “Sending…”. | Added catch/finally recovery, an announced error, and reset of the busy state. |
| Medium | A second submit event could arrive before React disabled the early-access or career button. | Both forms now synchronously guard pending requests. |
| Medium | Early-access field errors were not associated with their inputs; mandatory inputs were not marked required. | Added required, aria-invalid, aria-describedby, and stable error IDs. Edited fields clear stale error messages. |
| Low | Replacing either form with its success message could leave keyboard/screen-reader focus behind. | Focus now moves to the success message. Forms expose their busy state. Opening the collapsed career form focuses the name field. |
| Low | Career name, email and phone fields lacked autocomplete hints. | Added name/tel/email autocomplete and field names. |
| Low | Validation always animated scrolling, including for reduced-motion users. | Invalid early-access fields now use immediate scrolling when reduced motion is preferred. |
| Low | The production build warned that `middleware.ts` is deprecated and Next’s internal Edge bundle uses `process.cwd`. | Applied Next 16’s documented `proxy.ts`/`proxy` naming migration. CSP, fresh per-request nonce and matcher logic are unchanged; Proxy runs in the supported Node runtime. |

The content audit also corrects five links on Product, About, the buying-signals guide and both case studies that pointed at the removed `/#strategy-title` section. The current homepage destination is `/#gtm-demo`.

## Verified

- All 29 public page URLs in the sitemap return HTTP 200 locally.
- All 29 have one H1, a canonical URL and a meta description in their server-rendered HTML.
- No duplicate IDs found in those page responses.
- After the anchor corrections, no broken internal hash links remain in the 29 page responses.
- All 76 JSON-LD blocks across those pages parse successfully.
- All rendered images have an `alt` attribute. Decorative images use empty alt text; this check does not evaluate the editorial quality of every description.
- All 124 distinct local image files referenced by those responses exist in `public`.
- The three sample-business radio buttons have implicit wrapping labels; an automated `for`/ID-only check initially flagged them, and source review confirmed their labels are valid.
- `/robots.txt` and the downloadable ICP CSV return 200.
- Unknown top-level, blog, career and case-study URLs return 404.
- TypeScript passes after the form edits.
- `npm run build -- --webpack` passes after the Proxy migration, with neither the middleware deprecation nor the Edge `process.cwd` warning remaining.
- Proxy behavior checks pass for fresh request-specific nonces, matching request/response CSP, development-only eval permission and unchanged prefetch exclusions. The local homepage still returns 200 with CSP attached.
- A local isolated component harness, with every storage/email call mocked, passed: visible control focus for missing team size; rejected-request cleanup for both forms; and double-submission prevention for both forms. It wrote no remote records and sent no mail.
- Inspected Help Center search, category filters and pagination; career filters; contact booking loading/error fallback; sitemap/metadata helpers; legal contents navigation; pricing CTAs; secondary-page CSS breakpoints. Existing mobile/tablet rules are present. Actual responsive rendering is a separate browser check, not inferred from stylesheet presence.

## Remaining recommendations and verification limits

### Before relying on live lead capture

1. **Tie confirmation emails to a server-validated submission.** The career, early-access and footer confirmation endpoints accept a caller-supplied email independently of whether a database row was saved. Move the save-and-notify operation behind one validated server endpoint, with idempotency, so confirmation cannot be triggered independently. This requires backend work and controlled integration testing; it was not changed in a visual audit.
2. **Replace per-process email throttling for production scale.** `api-safety.ts` explicitly stores limits in an in-memory map. This does not enforce a shared quota across server instances. A persistent rate limiter or platform protection should cover all submission endpoints.
3. **Verify live database permissions and delivery in a staging environment.** Career and early-access forms insert directly from the browser. Verify row-level security, permitted insert fields and anti-spam limits with the project owner. The current local response CSP identifies the configured Supabase origin as `https://placeholder.supabase.co`, so this preview is not evidence of a working registration database. Local source review cannot prove the deployed database policies. Verify provider delivery, sender domain and the actual saved record with dedicated test recipients before release.
4. **Exercise slow/offline behavior with real staging services.** Rejected requests recover, but the career/early-access data requests have no explicit application timeout. A stalled connection may still take a long time to fail. Add a cancellation/timeout strategy with idempotency before enabling automatic retries.
5. **Confirm the calendar and Slack invitation still work.** The Calendly component has an accessible fallback and direct booking link; the Slack flow has an email fallback. No slot was booked and no invitation was accepted during this audit.

### Content and conversion decisions

6. **Make plan value measurable.** The $119 paid plan asks visitors to contact the team to confirm the credit allowance and action costs. Publish the allowance and an example workflow cost when confirmed; do not invent pricing details.
7. **Shorten early access if conversion is the priority.** Five sections include mandatory phone, role, location and buying intent. Consider name, work email and one workflow question first, with optional enrichment after signup. This is a product decision rather than a grammar correction.
8. **Standardize support routing.** Public pages use `info@cnvrted.com` while community flows use `work@cnvrted.com`. Verify both are monitored, and explain the distinction only if it is intentional.
9. **Confirm public claims and links with owners.** Customer outcomes, customer permission, team roles, job availability, published prices and external social/company URLs need business verification. Local HTTP checks establish local page health, not the truth or freshness of those claims.

### Accessibility, performance and launch checks

10. **Run assistive-technology checks before launch.** Source fixes improve forms but do not constitute full WCAG certification. Test screen-reader announcements, keyboard navigation across animated panels, 200% zoom and operating-system text scaling on real devices.
11. **Measure a production build.** The development server includes debug overhead. Run production Lighthouse/Core Web Vitals checks for LCP, INP and CLS before calling performance complete. Review the cost of numerous artwork assets, the animation bundles and multiple font families against the actual production waterfall.
12. **Check real Safari/iOS and Android browsers.** CSS-pixel viewport coverage matters more than a laptop’s physical diagonal: 13/14/16/17-inch screens can share the same CSS viewport because of scaling. Simulated widths cannot certify every physical device, browser chrome size or on-screen keyboard behavior.
13. **Preserve route-specific metadata as content evolves.** Current metadata/canonicals are present. Update sitemap revision dates when pages are materially revised, and review the social preview image against the current “Reinventing GTM” message.
14. **Complete a staging integration check for the whole journey.** Login on the separate beta application, form storage/email, a booking, and CRM behavior were not exercised. Homepage lead and outreach animations are illustrative UI, not proof that the external product integrations are connected.

## Files changed by this workstream

- `src/components/early-access-form.tsx`
- `src/components/career-application-form.tsx`
- `src/middleware.ts` → `src/proxy.ts` (Next 16 convention migration)
- Comment references in `src/app/layout.tsx`, `src/lib/nonce.ts`, and `next.config.ts`
- `docs/site-functionality-audit-2026-10-11.md`
