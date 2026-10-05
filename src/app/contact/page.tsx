import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedContact } from "@/components/illustrated/contact";
import type { FAQItem } from "@/components/illustrated/faq";
import { DEMO_PATH } from "@/lib/booking";

export const metadata: Metadata = pageMetadata({
  title: "Contact Cnvrted | Support & Founding Team",
  description: "Get product support at info@cnvrted.com, discuss a partnership, or contact Cnvrted’s founding team directly. Find the right person for your question.",
  path: "/contact",
});

const contactFAQs: FAQItem[] = [
  { question: "What can we discuss on a call?", answer: "Tell us about your business, ideal customers, and GTM goals. We’ll walk through how buying signals, AI qualification, and Cnvrted could fit your workflow." },
  { question: "How long is the call?", answer: "The call is 30 minutes over Google Meet. Calendly sends the meeting details once your booking is confirmed." },
  { question: "What should I prepare?", answer: "Bring your company website and a little context about your team, customers, and current challenges. You can share preparation notes when booking." },
  { question: "Can we talk about plans and pricing?", answer: <>Absolutely. See our <Link href="/pricing">pricing page</Link> or <Link href={DEMO_PATH}>book a call with Cnvrted</Link> to discuss your team’s needs.</> },
  { question: "How do I get product support?", answer: <>Browse the <Link href="/help-center">Help Center</Link> or email <a href="mailto:info@cnvrted.com">info@cnvrted.com</a> with your question.</> },
  { question: "Can I contact the team directly?", answer: "Yes. Use the email links above to reach Dhruv, Kailas, Sharan, or Anupam directly." },
];

export default async function ContactPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <IllustratedShell className="design-contact-page" faqItems={contactFAQs}>
      <BreadcrumbSchema trail={[{ name: "Contact" }]} />
      <IllustratedContact nonce={nonce} />
    </IllustratedShell>
  );
}
