# SEO, AEO and GEO audit — 11 October 2026

## Scope and evidence

All 29 canonical public pages in the sitemap, plus robots.txt, social metadata, JSON-LD, internal links, image alt attributes, legacy redirects, crawler responses, and four missing-page routes. OG preview remains noindex. Forms/API endpoints are not landing pages and are excluded from the sitemap.

Search Console was inspected in the existing verified property. Its performance chart covered 30 July–9 October 2026: 297 clicks, 735 impressions, 40.4% CTR, average position 8.9. The top query was `cnvrted` (246 clicks / 376 impressions). `ai go-to-market` had 2 impressions and no clicks. These are property observations, not keyword search-volume estimates. Query totals can omit anonymised searches.

The Page Indexing report displayed 13 indexed and 16 not indexed: 13 discovered/currently not indexed, 3 crawled/currently not indexed. The latter were `/product`, `/learn/signal-to-outreach`, and `/join-slack`. These categories describe Google's selection, not proof of a technical block. The sitemap already showed Success, 29 discovered pages, last read 7 October. These are lagging report snapshots, not immediate post-release results.

## Findings and changes

- Strengthened generic titles/descriptions for the commercial, support, community, company, and legal pages. Each public URL has its own canonical, description, social preview, and keyword intent. Kept already useful guide metadata rather than rewriting it for its own sake.
- Gave blog articles and case studies descriptive search titles separate from their editorial headlines. All blog social metadata now uses the shared helper and canonical image URLs.
- Separated the learning hub's template/how-to intent from the blog's editorial/comparison intent. Updated visible headings and introductions while retaining the illustrated theme.
- Restored homepage links to the GTM strategy, ICP, and buying-signal guides; the redesign had removed these direct topic links.
- Added server-rendered page entities connected to the same WebSite and Organization. Blog, careers, and case-study collection entities list the actual linked entries. Article and visible FAQ schemas were retained and validated.
- Removed paid offers from homepage structured data because those prices are not visible there. Pricing retains the actual visible plans; no invented ratings, reviews, results, or rich-result promises.
- Updated the structured-data organization logo to the supplied brand image, replacing the old logo reference.
- Clarified the interactive outreach page's heading and definition. Added a readable three-step method (fit, evidence, relevant question) and explicit limits, so the explanation is available without running the interactive example.
- Added role/location intent to career snippets. Did not fabricate posting dates or applicant-location requirements for JobPosting markup.
- Recorded real revision dates in the sitemap. Article publication/editorial dates remain distinct from metadata revisions.
- Updated the existing validation script for current help wording and the real ICO fallback; added checks for page entities, collection links, and homepage offer consistency.

## Keyword and intent map

These are distinct, relevant target phrases based on page content and the observed search baseline. They are not claims of measured search volume or guaranteed positions. Related words belong naturally in explanations; no obsolete meta-keywords tag or repeated keyword lists were added to the website.

| URL | Primary target | Related language | Intent |
| --- | --- | --- | --- |
| [/](https://www.cnvrted.com/) | GTM intelligence | AI go-to-market; B2B buying signals | Commercial overview |
| [/product](https://www.cnvrted.com/product) | AI GTM platform | B2B sales research; ICP-fit accounts; contextual outreach | Product evaluation |
| [/pricing](https://www.cnvrted.com/pricing) | Cnvrted pricing | free GTM credits; GTM software plans | Plan comparison |
| [/book-demo](https://www.cnvrted.com/book-demo) | AI GTM demo | Cnvrted product demo; sales workflow walkthrough | Book a conversation |
| [/about](https://www.cnvrted.com/about) | Cnvrted founders | Cnvrted team; Bengaluru GTM startup | Brand and trust |
| [/customers](https://www.cnvrted.com/customers) | Cnvrted customers | GTM customer directory; teams using buying signals | Customer proof |
| [/case-studies](https://www.cnvrted.com/case-studies) | GTM case studies | signal-led outreach results; prospecting case studies | Evidence hub |
| [/case-studies/from-cold-emails-to-warm-conversations](https://www.cnvrted.com/case-studies/from-cold-emails-to-warm-conversations) | signal-led cold email case study | targeted email campaign; reply and demo outcomes | Reported campaign with limitations |
| [/case-studies/how-cnvrted-finds-its-customers](https://www.cnvrted.com/case-studies/how-cnvrted-finds-its-customers) | founder-led customer acquisition workflow | startup prospecting process; Cnvrted internal GTM | First-party process |
| [/blogs](https://www.cnvrted.com/blogs) | B2B prospecting blog | GTM plays; sales tool comparisons | Editorial hub |
| [/blogs/apollo-vs-cnvrted](https://www.cnvrted.com/blogs/apollo-vs-cnvrted) | Apollo vs Cnvrted | prospecting tool comparison; buying intent vs public signals | Comparison |
| [/blogs/what-is-a-gtm-play](https://www.cnvrted.com/blogs/what-is-a-gtm-play) | what is a GTM play | signal-to-outreach play; trigger segment motion outcome | Definition and method |
| [/learn](https://www.cnvrted.com/learn) | GTM guides and templates | GTM learning resources; ICP worksheet | Learning hub |
| [/learn/go-to-market-strategy](https://www.cnvrted.com/learn/go-to-market-strategy) | go-to-market strategy example | B2B GTM plan; market and channel decisions | Strategy guide |
| [/learn/ideal-customer-profile](https://www.cnvrted.com/learn/ideal-customer-profile) | ideal customer profile template | ICP examples; free ICP worksheet; B2B customer profile | Template and examples |
| [/learn/buying-signals](https://www.cnvrted.com/learn/buying-signals) | B2B buying signals examples | buying signal qualification; sales trigger examples | Definition and checklist |
| [/learn/signal-to-outreach](https://www.cnvrted.com/learn/signal-to-outreach) | signal-led outreach examples | personalised first message; interactive GTM example | Worked examples |
| [/help-center](https://www.cnvrted.com/help-center) | Cnvrted help center | ICP setup; signals help; credits and support | Product support |
| [/join-slack](https://www.cnvrted.com/join-slack) | GTM Slack community | Cnvrted community; prospecting discussion | Community invitation |
| [/careers](https://www.cnvrted.com/careers) | Cnvrted careers | AI startup jobs; GTM engineering jobs | Jobs hub |
| [/careers/marketing-lead](https://www.cnvrted.com/careers/marketing-lead) | marketing lead job Bengaluru | Cnvrted marketing role; founding marketer | Role-specific recruitment |
| [/careers/ai-ml-engineer](https://www.cnvrted.com/careers/ai-ml-engineer) | remote AI ML engineer job | LLM evaluation engineer; AI data pipelines | Role-specific recruitment |
| [/careers/gtm-engineer](https://www.cnvrted.com/careers/gtm-engineer) | remote GTM engineer job | GTM integrations engineer; sales automation role | Role-specific recruitment |
| [/careers/gtm-lead](https://www.cnvrted.com/careers/gtm-lead) | remote GTM lead job | GTM strategy role; customer discovery | Role-specific recruitment |
| [/careers/founders-office-intern](https://www.cnvrted.com/careers/founders-office-intern) | remote founders office internship | startup operations internship; GTM research | Role-specific recruitment |
| [/contact](https://www.cnvrted.com/contact) | contact Cnvrted | Cnvrted support; partnership enquiries | Contact |
| [/early-access](https://www.cnvrted.com/early-access) | Cnvrted early access | AI GTM waitlist; beta access | Waitlist |
| [/privacy](https://www.cnvrted.com/privacy) | Cnvrted privacy policy | personal data rights; connected account data | Legal and trust |
| [/terms](https://www.cnvrted.com/terms) | Cnvrted terms of service | platform terms; account responsibilities | Legal and trust |

## AI / answer discovery approach

The site exposes readable definitions, worked examples, evidence limitations, author identity, dates, linked references, visible questions and answers, and connected structured data. Public pages are server-rendered. Robots permits Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, and Claude-SearchBot through the existing wildcard rule; training preferences were not changed.

Google says the usual SEO foundations apply to AI Overviews/AI Mode and no special AI schema is needed. There is no universal submission endpoint that guarantees ChatGPT, Claude, Gemini, or Perplexity citations. No hidden instructions, fabricated endorsements, or “AI ranking” files were used.

## Validation and release

- Production build and TypeScript check passed. One existing Google Sans Flex fallback-font warning remains; it does not fail the build.
- Rendered audit: all 29 pages pass locally, including canonical/metadata uniqueness, JSON-LD, matching visible FAQs, internal links/anchors, crawler access, expected noindex/404 handling, and favicon fallback.
- Responsive visual checks: mobile 390px, tablet 820px, and desktop 1440px. No horizontal overflow in the changed layouts. The live learning hub also passed at the browser’s normal 777px viewport.
- Release `660c841` pushed to `main`; both Vercel checks succeeded. All 29 pages passed the same audit on https://www.cnvrted.com.
- IndexNow returned HTTP 200 for all 29 canonical URLs: received successfully, not a guarantee of indexing. See `seo-indexnow-receipt-2026-10-11.json`.
- Fresh Google URL Inspection reports both `/product` and `/learn/signal-to-outreach` are already indexed, despite their older exclusion-report status. This does not attribute their indexing to this release.
- Google accepted priority recrawl requests for `/product` and `/learn/signal-to-outreach` (both displayed “Indexing requested”).
- Google confirmed “Sitemap submitted successfully”. The table now shows submitted 11 October 2026, Success, 29 discovered pages; last-read date still 7 October, so processing of the new version is not yet confirmed.
- Proof screenshots are saved beside the repository: `cnvrted-sitemap-submitted.png`, `cnvrted-google-indexing-request.png`, and `cnvrted-seo-live.png`.

## Remaining work that depends on evidence over time

1. Compare non-brand impressions, clicks, and landing-page queries after Google recrawls. Do not infer improvements from a single day or aggregate position.
2. Publish additional genuinely useful worked examples only when real product/customer evidence supports them. Existing case-study limitations remain visible; obtain attributable customer permission/data before expanding claims.
3. Recheck the 16 unindexed URLs in Search Console after processing. A successful submission is not an indexing guarantee. A utility page such as the Slack form may remain unindexed despite being technically valid.
4. Track AI citations in available search-engine reports; assess cited pages and query intent rather than promising placement in every answer engine.
5. Recheck current job availability and original posting dates before adding job rich-result markup.

Sources: [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [IndexNow protocol and receipt meanings](https://www.indexnow.org/documentation), [OpenAI crawler definitions](https://developers.openai.com/api/docs/bots).
