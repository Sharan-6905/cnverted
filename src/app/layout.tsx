import type { Metadata } from "next";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { Raleway, Merriweather } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Editorial serif used for every heading site-wide.
const merriweather = Merriweather({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
});

// The CSP nonce is minted per request in middleware, so pages have to render
// per request for Next to stamp it onto the inline bootstrap. Prerendered
// HTML would carry a stale nonce and every script would be blocked.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    siteName: "Cnvrted",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${merriweather.variable} h-full`}
    >
      <body className="min-h-full">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
