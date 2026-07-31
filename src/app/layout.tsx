import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://www.cnvrted.com";
const TITLE = "Cnvrted — Reach buyers the moment they're in-market";
const DESCRIPTION =
  "Cnvrted monitors the dark funnel — LinkedIn, Reddit, X, and the open web — for real-time buying signals, then scores accounts by intent so your team engages at exactly the right time.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/favicon.png" },
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
      className={`${inter.variable} ${bricolage.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
