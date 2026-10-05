import type { NextConfig } from "next";

/**
 * Sent on every response. The Content-Security-Policy is not here — it carries
 * a per-request nonce, so it is built in middleware where the request exists.
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
  async redirects() {
    return [
      // Legacy URLs still present in Google's index.
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/favicon.ico", destination: "/favicon.png", permanent: true },
      { source: "/favicon.svg", destination: "/favicon.png", permanent: true },
      { source: "/why-cnvrted", destination: "/", permanent: true },
    ];
  },
  images: {
    qualities: [60, 75, 95],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        source: "/indexnow-key.txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/downloads/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
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
