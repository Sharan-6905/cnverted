import { Bricolage_Grotesque } from "next/font/google";

// The display face for the whole marketing site: the homepage (.cg) and every page built on IllustratedShell put
// `bricolage.variable` on their root, which defines --font-bricolage for the header wordmark and the headings.
// One shared instance, so every page references the same font files.
export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["400", "500"] });
