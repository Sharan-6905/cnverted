# Search visibility

## SEO and answer-engine update — 3 October 2026

- Page-specific search, Open Graph and X metadata share one helper in `src/lib/seo.ts`. Each public page uses its own canonical URL. Error pages do not inherit the homepage canonical.
- Organization, website and product entities have stable IDs. Product/offer markup appears only on the homepage and pricing page. No review scores or unsupported founding dates are added.
- Blogs have person authors, public profile links, visible publication dates and BlogPosting markup. Case studies have Article markup, cover images and breadcrumbs. JSON-LD preserves the CSP nonce and escapes HTML-sensitive characters.
- The homepage explains what Cnvrted is in plain language. Its FAQ markup comes from the same answer text as the visible FAQ. Help Center markup describes the existing help answers; paginated answers remain in server HTML and are accessible through the existing controls.
- Header menus remain in server HTML while closed, with `hidden` controlling visibility. Footer links include Pricing and Learn.
- Indexed legacy URLs `/about.html` and `/why-cnvrted` permanently redirect to `/about` and `/`, respectively, instead of returning 404.
- The sitemap lists 23 canonical public pages. It omits error/preview URLs and no longer substitutes build time or publication date for the last meaningful content modification date.
- Existing robots rules permit Googlebot, Bingbot, OAI-SearchBot and ChatGPT-User. No special AI-only pages, invented testimonials, keyword stuffing or training-access changes are used.

## Verification

Run `npm run build -- --webpack`, start the site, then run:

```sh
python3 scripts/verify-seo.py http://localhost:3020
python3 scripts/verify-seo.py https://www.cnvrted.com
```

The audit checks every sitemap route, unique titles, canonical and social URLs, JSON-LD parsing, article/breadcrumb types, crawlable navigation, help content, representative crawler responses, and four missing-page routes returning 404 with noindex.

## Search Console

Use the existing URL-prefix property `https://www.cnvrted.com/`. Submit `sitemap.xml` after deployment. Prioritise URL Inspection requests for `/`, `/pricing`, `/about`, `/customers`, `/case-studies` and `/blogs`; the sitemap covers the remaining pages. Do not submit `/404`.

At the start of this audit, the Page Indexing report (last updated 21 September 2026) showed six indexed pages and no excluded pages. The Sitemaps report had no submitted sitemaps. These are report snapshots, not a count of all currently live pages.

Google selects rankings and sitelinks automatically. Sitemap submission and an accepted indexing request do not mean a page has been indexed, and neither guarantees four or five branded results. FAQ markup describes content; this commercial site should not expect Google's government/health FAQ rich-result eligibility.

References: [Google sitelinks](https://developers.google.com/search/docs/appearance/sitelinks), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [OpenAI crawlers](https://developers.openai.com/api/docs/bots).

## Follow-up audit — 4 October 2026

- Added `/learn/buying-signals`: a server-rendered guide with a direct definition, four illustrative examples, qualification checklist, a worked outreach example, relevant FAQs, Article markup, and breadcrumbs. Linked it from the homepage, Learn, and both blog articles.
- Corrected the Apollo comparison using Apollo’s current buying-intent and pricing documentation. Removed the inaccurate higher-tier-only intent claim, fixed-price range, unsupported conversion multiples, and guaranteed-buyer wording. Its actual revision date appears in the article, Open Graph metadata, JSON-LD, and sitemap.
- Restored `/blog` → `/blogs` after Google URL Inspection listed the legacy route as a referring page.
- The sitemap now contains 24 canonical pages and the existing blog/case-study cover images. Recorded editorial dates are used only where known; build timestamps are never used as freshness signals.
- Allowed crawling of `/og-preview` so search engines can read its existing `noindex`. It remains excluded from the sitemap.
- Updated Organization markup to `founder`, aligned the city with the About page, and limited identity links to the company’s LinkedIn and X profiles.
- Added a public IndexNow ownership-verification file (excluded from indexing via `X-Robots-Tag`) and `scripts/submit-indexnow.py`. The script previews by default, checks the deployed key before submission, and accepts canonical paths only. It reports receipt without claiming indexing.
- Expanded `scripts/verify-seo.py` to verify unique descriptions, image alt attributes, internal anchors, discoverability of the guide, FAQ markup against actual page text, article revision dates, the preview’s noindex, and access for PerplexityBot and Claude-SearchBot as well as Google, Bing, and OpenAI search crawlers.

### External observations at the start of this follow-up

- Google URL Inspection: homepage indexed; Googlebot smartphone fetched it successfully on 3 October 2026; Google-selected canonical matched the homepage. The live test on 4 October also said the page can be indexed.
- Page Indexing report still shows six indexed pages, with a report date of 21 September; it is not a current live-page count.
- Sitemaps report still showed “Couldn’t fetch” from 3 October. Independent requests returned HTTP 200 and valid XML for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot user agents. Simulating a user agent does not establish whether an actual crawler IP is blocked.
- The connected Vercel account has no matching project or team access. Do not claim the hosting firewall/logs have been audited.
- The PageSpeed API returned HTTP 429. No fresh Lighthouse score or Core Web Vitals pass is claimed.
- Existing paid-plan credit allowance and action costs still need confirmation from the product owner. Keep the current contact-for-details copy; do not invent credit rules.

After deployment, submit changed pages once:

```sh
python3 scripts/submit-indexnow.py / /about /learn /learn/buying-signals /blogs/apollo-vs-cnvrted /blogs/what-is-a-gtm-play --submit
```

An IndexNow HTTP 200 means the URLs were received; HTTP 202 means receipt with key validation pending. Neither confirms indexing. Google requests and IndexNow submissions are separate processes.

Sources: [Apollo buying intent](https://www.apollo.io/product/buying-intent), [Apollo pricing](https://www.apollo.io/pricing), [IndexNow protocol](https://www.indexnow.org/documentation), [Google AI features](https://developers.google.com/search/docs/appearance/ai-features).

### Performance follow-up

The PageSpeed web interface worked despite the API rate limit. The initial mobile Lighthouse report on 4 October scored Performance 70, Accessibility 96, Best Practices 92, and SEO 100. Lab LCP was 7.7 s; its rolling CrUX field LCP was 3.4 s. The Search Console Core Web Vitals report separately had insufficient usage data. These are different reports, not a Core Web Vitals pass.

Targeted fixes preserve the visual design:

- Phones use the existing 1.1 MiB hero loop instead of downloading the 11–18 MiB 4K upscale. Animation loads after critical resources and pauses outside the viewport; reduced-motion and data-saving users keep the poster.
- The hero poster and client logos use responsive image optimization; unused legacy font families are no longer preloaded globally.
- Editorial dates explicitly use UTC so server and client do not disagree on calendar dates in US time zones. The date formatter was checked in UTC, America/Los_Angeles, and Asia/Kolkata.
- Improved low-contrast demo labels and stopped reducing the entire offscreen product canvas to 15% opacity. Its movement animation remains.
- Production build and the expanded 24-page SEO audit pass. Mobile preview has no horizontal overflow, plays the 720p loop, and reports no console errors.
- Search Console manual actions and security issues both report “No issues detected.”

### Post-deployment checks and submissions

- The live 24-page SEO audit passed on `https://www.cnvrted.com`. Production build passed.
- [Mobile Lighthouse retest](https://pagespeed.web.dev/analysis/https-www-cnvrted-com/o6yzs6yffe?hl=en_GB&form_factor=mobile): Performance 83 (from 70), Accessibility 96, Best Practices 96, SEO 100. Lab LCP improved from 7.7 to 3.8 s; TBT from 180 to 120 ms; CLS remained 0. This is a single lab comparison, not a claim that rolling field Core Web Vitals have passed. The prior hydration error was absent.
- Desktop in the same report scored Performance 87, SEO 100, with 0.6 s lab LCP. It still reported a failed fetch of the large 4K video. A subsequent 1.83 MiB 1080p encode serves standard laptop/desktop widths; phones use the 1.1 MiB original and displays wider than 1920 CSS pixels retain 4K.
- Resubmitted the existing `sitemap.xml` once. Google confirmed successful submission, but the separate report still displayed “Couldn’t fetch.” A fresh Google live inspection at 08:58 on 4 October fetched successfully and displayed the actual XML, including the revised dates and image entries. The successful live fetch does not prove the sitemap pipeline has processed the file.
- Indexing requests for `/learn/buying-signals` and `/blogs/apollo-vs-cnvrted` were accepted into Google's priority crawl queue. Neither was indexed at inspection time. `/about` was already indexed with one valid breadcrumb item; its reindex request encountered a transient Google submission error.
- IndexNow returned HTTP 202 for six changed URLs: homepage, About, Learn, buying-signals guide, and both blog articles. Verification was pending; indexing is not confirmed.

### Crawl diagnostics and AI visibility controls

- Google's Search generative AI control inherits **Include** from the domain default. No settings change was needed. Inclusion enables eligibility for AI Overviews and AI Mode; it does not guarantee selection or citation.
- Crawl stats (last updated 2 October) report 954 requests over 90 days, 96% HTTP 200, a 142 ms average response time, and no host problems.
- Historical 404 examples mainly included old `/favicon.ico` and `/favicon.svg` requests. Both now permanently redirect to the current 256×256 `/favicon.png`, and the audit checks these redirects. The page metadata already links the PNG directly.
- An old `/llms.txt` probe was also listed. That nonstandard file is not required for Google or OpenAI search eligibility; the visible HTML guide, crawlable links, structured data, and sitemap remain the authoritative sources.
