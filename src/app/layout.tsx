import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const SITE_URL = "https://www.cnvrted.com";
const TITLE = "Cnvrted — Reach buyers the moment they're in-market";
const DESCRIPTION =
  "Cnvrted monitors the dark funnel — LinkedIn, Reddit, X, and the open web — for real-time buying signals, then scores accounts by intent so your team engages at exactly the right time.";

// The CSP nonce is minted per request in middleware, so pages have to render
// per request for Next to stamp it onto the inline bootstrap. Prerendered
// HTML would carry a stale nonce and every script would be blocked.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "buying signals",
    "intent data",
    "B2B sales intelligence",
    "real-time intent signals",
    "dark funnel",
    "outbound sales",
    "ICP scoring",
    "sales prospecting",
    "account-based marketing",
    "buying intent",
    "B2B lead generation",
    "intent-driven outbound",
    "sales intelligence platform",
    "Cnvrted",
  ],
  authors: [{ name: "Cnvrted", url: SITE_URL }],
  creator: "Cnvrted",
  publisher: "Cnvrted",
  verification: { google: "a75IvLpxbTPDRrbkfayrxglnfwi7ukJnVAUkMWMiQ1k" },
  alternates: { canonical: SITE_URL },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    siteName: "Cnvrted",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Cnvrted — real-time buying signals radar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
