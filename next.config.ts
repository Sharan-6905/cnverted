import type { NextConfig } from "next";

/**
 * Sent on every response. No CSP here yet: the app ships inline styles and
 * Next's own inline bootstrap, so a policy strict enough to be worth having
 * needs a nonce pass through the layout — tracked separately rather than
 * shipped as a permissive `unsafe-inline` rule that would only look like
 * protection.
 */
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // form endpoints should never sit in a shared or browser cache
        source: "/api/:path*",
        headers: [
          ...SECURITY_HEADERS,
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
