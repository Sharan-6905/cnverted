import type { Metadata } from "next";
import { CrockedglassHome } from "@/components/crockedglass/home";
import { FAQSchema } from "@/components/faq-schema";
import { CG_FAQS } from "@/components/crockedglass/faq-data";

// Preview of the Crockedglass 2026 homepage. Kept out of search until it replaces "/".
export const metadata: Metadata = {
  title: "Cnvrted AI | Find buyers with context",
  description: "Orka finds buyers that fit your ICP, reads their buying signals and books meetings across email, LinkedIn and WhatsApp.",
  robots: { index: false, follow: false },
};

export default function NewHome() {
  return <>
    <FAQSchema path="/new-home" items={CG_FAQS.map(([question, answer]) => ({ question, answer }))} />
    <CrockedglassHome />
  </>;
}
