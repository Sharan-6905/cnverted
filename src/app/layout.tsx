import type { Metadata } from "next";
import { Poppins, Tinos } from "next/font/google";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Tinos is metric-compatible with Times New Roman and ships only 400/700,
// so heading weights between the two resolve upward to 700.
const tinos = Tinos({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SITE_URL = "https://www.cnvrted.com";
const TITLE = "Cnvrted — Reach buyers the moment they're in-market";
const DESCRIPTION =
  "Cnvrted monitors the dark funnel — LinkedIn, Reddit, X, and the open web — for real-time buying signals, then scores accounts by intent so your team engages at exactly the right time.";

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
    <html
      lang="en"
      className={`${poppins.variable} ${tinos.variable} h-full`}
    >
      <body className="min-h-full">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
