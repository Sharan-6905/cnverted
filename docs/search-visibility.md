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
