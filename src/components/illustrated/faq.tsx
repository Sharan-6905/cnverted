import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import { assets } from "./assets";
import type { ReactNode } from "react";

export type FAQItem = { question: string; answer: ReactNode };

const faqs: readonly FAQItem[] = [
  {
    question: "What does Cnvrted help me do?",
    answer:
      "Find prospects that match your ideal customer profile and understand why they may be worth contacting now. Cnvrted brings together the buying signal, its source, and the context for your outreach.",
  },
  {
    question: "What counts as a buying signal?",
    answer:
      "A relevant job posting, a funding announcement, a technology change, or a public request for recommendations can be a useful signal. The important part is whether that change relates to the problem your product solves.",
  },
  {
    question: "How do I define my ideal customer?",
    answer:
      "Describe the companies and people you want to reach in plain language: their industry, size, roles, and the problems you help solve. Use that context to guide Orka’s research and review the shortlist it builds.",
  },
  {
    question: "Does a buying signal guarantee someone will buy?",
    answer:
      "No. A signal gives you a reason to investigate, not a guaranteed buyer. Review the source, check the fit, and use your judgment before reaching out.",
  },
  {
    question: "Can I try Cnvrted for free?",
    answer: (
      <>
        Yes. Start with Spark and 40 free credits in the{" "}
        <a href="https://beta.cnvrted.com">Cnvrted beta</a>. See{" "}
        <Link href="/pricing">pricing</Link> for paid plans and credit details.
      </>
    ),
  },
  {
    question: "Will it fit the tools my team already uses?",
    answer: (
      <>
        Tell us which CRM, outreach, and collaboration tools you use.{" "}
        <Link href={BOOKING_URL}>Book a demo</Link> to check integration
        availability and the setup for your workflow.
      </>
    ),
  },
];

export const careerFAQs: readonly FAQItem[] = [
  {
    question: "How do I apply?",
    answer:
      "Open a role, read its responsibilities and requirements, and use the application form on that page. Add your name, phone number, and email so the team can reach you.",
  },
  {
    question: "Where can I find the location and role details?",
    answer:
      "Each listing includes the role’s location, work arrangement, and responsibilities. Check the individual role page before applying.",
  },
  {
    question: "Who can I contact with an application question?",
    answer: (
      <>
        Email <a href="mailto:info@cnvrted.com">info@cnvrted.com</a> with the
        role title and your question.
      </>
    ),
  },
];

export function FAQ({ items = faqs }: { items?: readonly FAQItem[] }) {
  return (
    <section
      className="design-faq design-container"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title">
        Frequently
        <br className="desktop-break" /> asked questions
      </h2>
      <div className="design-faq-list">
        {items.map((faq) => (
          <details key={faq.question} name="site-faq">
            <summary>
              {faq.question}
              <Image src={assets.home.imgIcon1} alt="" width={16} height={16} />
            </summary>
            <div className="design-faq-answer">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
