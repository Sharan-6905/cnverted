import { NextResponse, type NextRequest } from "next/server";

/**
 * Per-request nonce CSP.
 *
 * The nonce is handed to Next through the *request* headers so the framework
 * stamps it onto its own inline bootstrap during render, and echoed on the
 * response so the browser enforces it. `strict-dynamic` then lets those trusted
 * scripts pull in the rest — the route chunks, and the cal.com embed loader that
 * CalEmbed appends at runtime — without keeping a host allowlist in step.
 *
 * `style-src` still needs 'unsafe-inline': nonces do not apply to inline style
 * *attributes*, and the app sets `style={{ ... }}` on layout-critical elements
 * (aspect ratios, offsets) that would collapse without it. Styles are a far
 * weaker sink than scripts, which is where the nonce is doing real work.
 */
function buildCsp(nonce: string, isDev: boolean) {
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  return [
    `default-src 'self'`,
    // dev needs eval for the HMR runtime; production never gets it
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https://api.producthunt.com https://cal.com https://app.cal.com`,
    `font-src 'self' data:`,
    // fonts are local or system, so the only third parties here are supabase + cal
    `connect-src 'self' ${supabase} https://cal.com https://app.cal.com${isDev ? " ws: http://localhost:*" : ""}`,
    `frame-src 'self' https://cal.com https://app.cal.com`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ");
}

export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce, process.env.NODE_ENV === "development");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Documents only. Static assets and the image optimizer are immutable and
     * cached, and a per-request nonce on them would only defeat that caching.
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|webmanifest)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
