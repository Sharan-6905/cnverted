import { HOME_FAQS } from "@/lib/home-faqs";
import Link from "next/link";
import { DEMO_PATH } from "@/lib/booking";
import Image from "next/image";
import { assets } from "./assets";
import type { ReactNode } from "react";

export type FAQItem = { question: string; answer: ReactNode };

const faqs: readonly FAQItem[] = HOME_FAQS.map((faq) => {
  if (faq.question === "What does GTM mean?") {
    return {
      ...faq,
      answer: <>
        GTM stands for go-to-market: the choices a business makes about which customers to serve, what to offer, and how to reach and win them. Cnvrted supports the research and prospecting part of that process. Read our{" "}
        <Link href="/learn/go-to-market-strategy">go-to-market strategy guide</Link> for a practical starting point.
      </>,
    };
  }
  if (faq.question === "Can I try Cnvrted for free?") {
    return {
      ...faq,
      answer: (
        <>
          Yes. Start with Spark and 40 free credits in the{" "}
          <a href="https://beta.cnvrted.com">Cnvrted beta</a>. See{" "}
          <Link href="/pricing">pricing</Link> for paid plans and credit
          details.
        </>
      ),
    };
  }
  if (faq.question === "Will it fit the tools my team already uses?") {
    return {
      ...faq,
      answer: (
        <>
          Tell us which CRM, outreach, and collaboration tools you use.{" "}
          <Link href={DEMO_PATH}>Book a demo</Link> to check integration
          availability and the setup for your workflow.
        </>
      ),
    };
  }
  return faq;
});

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
