import { NextResponse, type NextRequest } from "next/server";

/**
 * Password gate for the dev deployment (dev.cnvrted.com).
 *
 * Off unless DEV_SITE_PASSWORD is set. On Vercel it's set only for Preview
 * deploys of the `dev` branch, so production never sees it. The password lives
 * in Vercel's env vars, never in git. The username is DEV_SITE_USER (default
 * "cnvrted").
 *
 * Returns a 401 response when the request lacks valid credentials, or null when
 * it may continue.
 */
export function devGate(request: NextRequest): NextResponse | null {
  const password = process.env.DEV_SITE_PASSWORD;
  if (!password) return null;
  const user = process.env.DEV_SITE_USER || "cnvrted";

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    if (sep >= 0 && safeEqual(decoded.slice(0, sep), user) && safeEqual(decoded.slice(sep + 1), password)) {
      return null;
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="cnvrted dev", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/** Compare without exiting at the first differing character. */
function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}
