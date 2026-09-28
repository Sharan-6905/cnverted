import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHelpCenter } from "@/components/illustrated/help-center";
import type { FAQItem } from "@/components/illustrated/faq";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Help Center — Cnvrted",
  description: "Find answers about Cnvrted’s buying signals, AI qualification, ICP, plans, and credits. Search by topic or contact our team.",
};

const helpFAQs: FAQItem[] = [
  { question: "How do I get started?", answer: <>Visit the <a href="https://beta.cnvrted.com">Cnvrted beta</a> or <a href={BOOKING_URL}>book a call</a> with our team.</> },
  { question: "Can I try Cnvrted for free?", answer: "Yes. Spark includes 40 free credits to explore Cnvrted." },
  { question: "How do credit plans work?", answer: <>Start with Spark, choose Surge as you grow, or discuss custom credits with Dominion. See our <Link href="/pricing">pricing page</Link> for plan details.</> },
  { question: "Can Cnvrted fit my existing workflow?", answer: <>Tell us about your CRM and the tools your team uses. <a href={BOOKING_URL}>Book a call</a> to discuss the right setup.</> },
  { question: "Where can I learn about data privacy?", answer: <>Read our <Link href="/privacy">Privacy Policy</Link> for information about data collection, use, and your choices.</> },
  { question: "What if I can’t find the answer I need?", answer: <>Email <a href="mailto:work@cnvrted.com">work@cnvrted.com</a> or visit our <Link href="/contact">contact page</Link>. We read every message.</> },
];

export default function HelpCenterPage() {
  return (
    <IllustratedShell className="design-help-page" faqItems={helpFAQs}>
      <BreadcrumbSchema trail={[{ name: "Help Center" }]} />
      <IllustratedHelpCenter />
    </IllustratedShell>
  );
}
