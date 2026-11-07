# Founder profile release

Adds /team, /team/dhruv-pradeep and /team/kailas-krsna, with public professional links, Person/ProfilePage markup, linked existing article bylines and sitemap entries. Public biographies use the existing about/contact pages and the requested display names. Existing authorship is preserved.

The product page links to beta's public leads and communities pages. The learning hub links to existing hiring signals, ICP and qualification resources.

Validation: `npm run build -- --webpack`; run the production server, then `node scripts/check-founder-seo.mjs` (defaults to localhost:3131; override with SEO_BASE_URL). Desktop and 390px mobile layouts inspected. The script checks rendered metadata, identity markup, internal links, sitemap entries and unknown-profile 404.

After deploying the main-site project, verify those checks against production and submit the three new team URLs in the main-site Search Console property. Resubmit the sitemap. Do not submit preview URLs. Indexing requests do not guarantee inclusion or ranking.

Google references:
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

Organization identity references also include the user-supplied Crunchbase and Tracxn company URLs. Crunchbase search results confirm the company identity; Tracxn content could not be independently read. These are company references, not personal founder profiles or endorsements. No funding or product claims were imported.
