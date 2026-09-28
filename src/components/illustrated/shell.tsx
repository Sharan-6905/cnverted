import type { ReactNode } from "react";
import {
  Fraunces,
  Google_Sans_Flex,
  Open_Sans,
  Inter,
  League_Spartan,
} from "next/font/google";
import { IllustratedHeader } from "./header";
import { IllustratedFooter } from "./footer";
import { FAQ, type FAQItem } from "./faq";
import "./illustrated.css";

const editorial = Fraunces({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
});
const sans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-design-sans",
  weight: ["400", "500"],
  adjustFontFallback: false,
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});
const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
  weight: "400",
});

export function IllustratedShell({
  children,
  className = "",
  faqItems,
}: {
  children: ReactNode;
  className?: string;
  faqItems?: readonly FAQItem[];
}) {
  return (
    <div
      className={`figma-site ${editorial.variable} ${sans.variable} ${openSans.variable} ${inter.variable} ${spartan.variable} ${className}`}
    >
      <IllustratedHeader />
      <main id="main-content">
        {children}
        <FAQ items={faqItems} />
      </main>
      <IllustratedFooter />
    </div>
  );
}
