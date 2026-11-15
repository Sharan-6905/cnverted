import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

// The display face for the whole marketing site: the homepage (.cg) and every page built on IllustratedShell put
// `bricolage.variable` on their root, which defines --font-bricolage for the header wordmark and the headings.
// One shared instance, so every page references the same font files.
export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["400", "500"] });

// The homepage's body and mono faces, shared with the other pages built on the .cg design (e.g. /creators).
export const inter = Inter({ subsets: ["latin"], variable: "--font-cg-inter", weight: ["400", "500", "600"] });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-cg-mono", weight: ["500", "600"], preload: false });
