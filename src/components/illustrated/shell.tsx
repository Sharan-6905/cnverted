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
import "./marketing.css";

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
  preload: false,
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  preload: false,
});
const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-spartan",
  weight: "400",
  preload: false,
});

export function IllustratedShell({
  children,
  className = "",
  faqItems,
  closingCTA,
}: {
  children: ReactNode;
  className?: string;
  faqItems?: readonly FAQItem[];
  closingCTA?: ReactNode;
}) {
  return (
    <div
      className={`figma-site ${editorial.variable} ${sans.variable} ${openSans.variable} ${inter.variable} ${spartan.variable} ${className}`}
    >
      <IllustratedHeader />
      <main id="main-content">
        {children}
        {faqItems?.length !== 0 && <FAQ items={faqItems} />}
        {closingCTA}
      </main>
      <IllustratedFooter />
    </div>
  );
}
