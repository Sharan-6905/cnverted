# Homepage "understand my business" widget

A visitor pastes their website URL and gets back a short "here's what we understood about
your business" summary — a quick, personalized hook for the homepage.

## How to wire it in

1. `src/components/UnderstandWidget.tsx` is already dropped into this branch — no other
   files were touched.
2. Import it wherever it should appear on the homepage:
   ```tsx
   import UnderstandWidget from "@/components/UnderstandWidget";
   // ...
   <UnderstandWidget />
   ```
3. Restyle freely — it's plain Tailwind classes with no dependency on this repo's other
   components (didn't want to guess at your design system / `src/components/ui` conventions).
   Only the `fetch(...)` call inside needs to stay as-is.
4. That's it — no env vars, no backend setup needed on your side. It calls our API directly.

## The API it calls

**`POST https://api.cnvrted.com/public/understand-website`** — no auth, callable straight
from the browser.

Request:
```json
{ "website_url": "https://example.com" }
```

Success (200):
```json
{ "understanding": "A short 2-3 sentence summary of what the business does." }
```

Errors: `400` bad URL, `422` couldn't crawl the site, `429` rate limited, `500` retry —
`{"detail": "..."}` has a user-facing message on all of these except 429 (handled inline in
the component already).

## Things to know

- **Rate limited to 5 requests/hour per IP** — there's no login on this page, so that's the
  only cost protection. Ping Kailas if you want that number changed.
- **Deliberately light** — one page, no deep site crawl, a cheap model. It's a teaser, not
  the same depth as the real app's onboarding.
- **CORS is already open** for `www.cnvrted.com` and `cnvrted.com`. If this site is served
  from a different domain, that domain needs adding to `ALLOWED_ORIGINS` on the backend first
  or the browser will block the request — flag it if so.
- Nothing is saved anywhere (no DB row, no profile) — stateless, fine to let people retry.
