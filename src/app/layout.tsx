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

export const metadata: Metadata = {
  title: "Cnvrted — Reach buyers the moment they're in-market",
  description:
    "Cnvrted monitors the dark funnel — LinkedIn, Reddit, X, and the open web — for real-time buying signals, then scores accounts by intent so your team engages at exactly the right time.",
  icons: { icon: "/favicon.png" },
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
