# Website content audit — 11 October 2026

This is the editorial portion of the parallel website audit. It covers the homepage, shared navigation/footer/FAQ, product and pricing pages, About and Contact, booking, the Help Center, learning guides and interactive example, blog and case-study source content, customer directory, careers and application copy, Slack onboarding, early access, and the wording of the legal pages. The review used the local implementation; it does not verify product capabilities, customer results, current external-platform coverage, or legal compliance. Responsive/interaction findings are recorded separately by the other audit tracks.

## Corrections applied

| Finding | Correction | Source |
|---|---|---|
| Missing article in “Squeeze market in minutes”; vague subtitle about squeezing digital space | “Squeeze the market in minutes” / “Turn public signals into a focused list of buyers.” | `src/components/illustrated/redesign-home.tsx:32` |
| “Copy below prompt” is unnatural grammar; supporting line is wordy | “Copy the prompt below to set up Cnvrted” / “Give Cnvrted a clear brief about your business.” | `src/components/illustrated/copy-prompt-section.tsx:62` |
| Workforce labels omit articles or use inconsistent email wording | “Drafting emails,” “Building an intent list,” “19 high-intent leads,” “Creating your ICP,” and “Adding a booking link” | `src/components/illustrated/automated-workforce.tsx:13` |
| A table labelled “Company” contains people’s names | Renamed the illustration column “Contact” | `src/components/illustrated/redesign-feature-artwork.tsx:77` |
| LinkedIn brand incorrectly capitalised | Corrected both occurrences of “Linkedin” | `src/components/illustrated/redesign-feature-artwork.tsx:155` |
| GTM card contained job-seeker copy (“Don't miss your chance to apply!”), inconsistent with sales prospecting | Rewrote it around hiring signals and accounts that fit the offer; CTA now “21 YC companies hiring” | `src/components/illustrated/redesign-feature-artwork.tsx:315` |
| GTM strategy illustration used a sentence fragment and inflated “blueprint for success” wording | Shortened to a specific explanation of customer traits and buying signals | `src/components/illustrated/redesign-feature-artwork.tsx:282` |
| Application confirmation: “Thank you for filling the form” | Clear confirmation of application review and next steps | `src/components/career-application-form.tsx:77` |
| Help Center implied that public changes establish intent | Changed to “may indicate a relevant business need,” consistent with the homepage’s explanation that a signal is not a guaranteed buyer | `src/lib/help-center.ts:16` |
| Slack help answer could imply the invitation will arrive later | States the actual next step: choose “Join Slack” on the confirmation screen | `src/lib/help-center.ts:80` |
| Four links targeted the removed `/#strategy-title` section | About, Product, buying-signals guide and case-study detail now link to the existing `/#gtm-demo` | `src/app/about/page.tsx:80`, `src/app/product/page.tsx:62`, `src/app/learn/buying-signals/page.tsx:90`, `src/app/case-studies/[slug]/page.tsx:89` |
| Internal case study assumed every reader arrived because Cnvrted found them | Replaced the unfounded attribution with a description of the team’s workflow; also corrected “on our pipeline” and “ORKA” | `src/lib/case-studies.ts:157` |
| Careers used Bangalore while the company’s own location uses Bengaluru | Standardised the team location to Bengaluru | `src/app/careers/[slug]/page.tsx:54` |

The approved hero remains **“Reinventing GTM”** and **“Find the right buyers. Turn signals into sales.”**

## Recommended next changes — prioritised

### High priority: product clarity and evidence

1. **Publish an integration availability matrix.** The homepage displays HubSpot, Salesforce, Slack, Instantly, Outreach, HeyReach, Zapier, Microsoft Copilot and Composio under “Integrations,” while Terms section 10 describes currently connected Gmail and Notion. The FAQ appropriately says to confirm availability. A logo alone is ambiguous: identify each as available, available through a connector, or planned, and give a next step. Confirm the actual status before changing the labels. Sources: `src/components/illustrated/integrations-strip.tsx`, `src/app/terms/page.tsx`, `src/lib/home-faqs.ts`.

2. **Show what the $119 plan includes.** Surge currently says “Monthly credit plan” and asks visitors to contact the team for the allowance. Add confirmed monthly credits, per-action consumption, expiry/rollover rules, seat limits, cancellation terms and tax treatment beside the price. Do not invent amounts. Sources: `src/components/illustrated/pricing.tsx`, `src/app/terms/page.tsx`.

3. **Substantiate or qualify the internal case-study metrics.** “100% of our pipeline,” “under 1 hour,” “significantly higher than industry cold benchmarks,” and “multiple” enterprise customers lack a measurement period, sample size and evidence in the content source. Keep them only with dated supporting records, metric definitions and an appropriate comparison. The separate 11-email customer story already includes much better measurement notes; apply the same standard. Source: `src/lib/case-studies.ts`, especially the “The numbers (our own)” section.

4. **Clarify current product versus future vision.** The workforce section is correctly labelled “Coming Soon,” but includes autonomous mode, proposals and Gmail actions alongside an end-to-end film ending in CRM. A small, consistent availability label or linked product-status page would help readers distinguish the live product, a sample UI and the roadmap. Confirm what “autonomous” authorises; current Terms says sending requires approval. Sources: `src/components/illustrated/automated-workforce.tsx`, `src/components/illustrated/gtm-motion-film.tsx`, `src/app/terms/page.tsx`.

5. **Validate platform coverage and refresh-frequency promises.** Blog copy repeatedly says LinkedIn, Reddit and X are read “in real time,” and some old feature data says “the moment they appear.” Confirm actual supported sources and refresh intervals. If freshness varies, describe it precisely instead of promising universal real-time coverage. No external-platform fact check was performed in this local audit. Sources: `src/lib/blog-posts.ts`, `src/lib/product-features.ts`, `src/lib/help-center.ts`.

6. **Check whether displayed AI names describe live model integrations or illustrative demos.** The Help Center says workflows use Claude, ChatGPT, Kimi and Gemini; the canvas lists “Opus 5.5.” Confirm the current model/provider inventory and use stable family names if versions are merely decoration. The Copy Prompt assistant selectors launch local walkthroughs, not the actual providers; their helper text correctly explains this. Sources: `src/lib/help-center.ts`, `src/components/illustrated/product-canvas-data.ts`, `src/components/illustrated/copy-prompt-walkthrough.tsx`.

### Medium priority: clearer marketing and editorial consistency

7. **Explain the relationship between “ICP Recipe,” “GTM Strategies,” and “ICP Brain.”** These labels overlap. Keep the names if they are established product terms, but add distinct outcomes such as “Learn from customers,” “Plan your outreach,” and “Define who to target.” Expand “ideal customer profile” on its first prominent appearance for visitors unfamiliar with ICP. Source: `src/components/illustrated/redesign-feature-deck.tsx`.

8. **Tighten generic use-case cards.** “Early-stage startup,” “Scale social media,” “New product,” and “Create infinitely” mix audiences, actions and vague promises. Choose one structure, for example “Find your first customers,” “Spot relevant conversations,” “Launch a new product,” and “Explore a new market.” These are recommendations, not applied copy, because they change positioning. Source: `src/components/illustrated/redesign-feature-deck.tsx`.

9. **Make all sample identities visibly illustrative.** The main film and outreach demo identify fictional data well. The smaller brain illustration still shows named people beside `techwave.com` and `livefoot.com`; these are real-looking domains without clear provenance. Use reserved `.example` domains and a discreet sample-data label if the records are fictional. Confirm whether the supplied portrait assets are licensed. Source: `src/components/illustrated/redesign-feature-artwork.tsx`.

10. **Use one editorial convention.** Current copy mixes British and American spellings (“personalised”/“personalized,” “centre”/“center,” “prioritise”/“prioritize”), title case and sentence case, and “Book a call”/“Book a demo”/“Book a GTM demo.” Adopt a brief style guide; use consistent labels for actions that share a destination. Keep exact brand names unchanged. Sources: shared navigation/footer, `src/lib/blog-posts.ts`, `src/lib/career-details.ts`, product and help content.

11. **Make authored blog tone consistent with the calmer product pages.** Phrases such as “praying at scale,” “everyone…equally ignorable,” and “none…feels like a cold blast” are sweeping and stronger than the evidence-focused guides. Consider replacing blanket statements with specific failure modes. Preserve author voice while avoiding unsupported generalisations about competitors or readers. Source: `src/lib/blog-posts.ts`.

12. **Clarify the waitlist alongside the open beta.** Early Access already links to the free beta, which is helpful, but visitors may still wonder what access they are waiting for. Name the programme or upcoming capability they are joining and state how it differs from Spark. Source: `src/app/early-access/page.tsx`.

13. **Fill the two incomplete customer entries when verified material is available.** Curato and Bahari Services have no category, short description or website, unlike the other entries. Keep those fields absent until confirmed; do not fabricate them. Source: `src/lib/customers.ts`.

14. **Refresh the social share preview to the approved hero.** Shared metadata still describes the existing preview image as “Your ICP, found in real time.” Review the actual asset and replace the artwork/alt together if it should now say “Reinventing GTM.” Merely changing the alt would misdescribe the image. Source: `src/lib/seo.ts`, `public/cnvrted-link-preview.png`.

15. **Keep revision dates aligned when publishing these changes.** Several sitemap dates predate the homepage revisions. Use the actual publication date for meaningful updates and align it with article revision dates where relevant. Do not set every page’s date to the build time. Source: `src/app/sitemap.ts`.

### Lower priority: polish and conversion

16. **Shorten the form introduction/confirmation voice.** The Slack success heading has double exclamation marks; the 404 page says “Oh sheet!” and “You’ve landed on an error page...”. These are understandable but more playful than the main product copy. Optional alternatives: “You’re ready to join” and “This page has moved or no longer exists.” Sources: `src/components/illustrated/community-form.tsx`, `src/app/not-found.tsx`.

17. **Improve role clarity before applicants invest time.** Marketing Lead has experience criteria; other cards do not. Confirm salary ranges, hiring geography/time zones, seniority and interview process. The existing application form is minimal; decide whether a portfolio/CV or LinkedIn URL is required. Sources: `src/lib/careers.ts`, `src/lib/career-details.ts`, `src/components/career-application-form.tsx`.

18. **Keep the personal setup prompt separate from its fictional example.** The copied prompt correctly uses `[YOUR COMPANY NAME]` and tells the assistant not to invent facts. The walkthrough uses `falanadesigner`; retain the sample label and consider a more obvious fictional company name if visitors mistake it for their own generated result. Sources: `src/components/illustrated/copy-prompt-section.tsx`, `src/components/illustrated/copy-prompt-walkthrough.tsx`.

19. **Reduce repeated conversion choices after seeing actual user behaviour.** The homepage contains several “Book a call” entry points plus Sign In, Get Started, Copy Prompt and interactive examples. The options work for different intents, but tracking should show which distract from the primary conversion. Do not remove useful choices solely to make the page shorter.

## Content retained after review

- The hero is concise, readable and consistent with the approved positioning.
- Guides explain ICP, buying signals and GTM clearly, with useful distinctions between evidence and inference.
- The main film, company profiles, emails and booking links generally label sample or simulated data clearly.
- The 11-email case study includes denominators, time windows and limitations instead of presenting its results as universal.
- The setup prompt protects against invented business context and explains how to use the result.
- Product, Help Center and booking pages provide clear routes to pricing, support and a demo.
- Public routes use descriptive page titles and descriptions. Source-level copy review found no generic lorem-ipsum placeholder prose in the active marketing pages.

## Verification and limits

Changes are restricted to text and the four stale demo destinations. No layout CSS, animation scheduling, pricing values, legal clauses, customer identities or performance figures were changed. Checked the new strings in source and confirmed the destination `id="gtm-demo"` exists in the active homepage. The parent audit owns consolidated type-checking and responsive browser verification. The React component checklist was reviewed; these string/link edits introduce no hooks, state, network requests or rendering changes.

External links, production form delivery, CRM/AI integrations and commercial claims need their own operational evidence. Legal pages were checked for clarity and internal consistency, not rewritten or certified as legally correct.
