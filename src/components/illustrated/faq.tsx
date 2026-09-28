import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import { assets } from "./assets";
import type { ReactNode } from "react";

export type FAQItem = { question: string; answer: ReactNode };

const faqs = [
  {
    question: "How does Cnvrted find buying signals?",
    answer: (
      <>
        We monitor sources across the open web and social — funding news, hiring
        activity, tech changes, executive moves, and more — to find accounts
        that are ready to buy.
      </>
    ),
  },
  {
    question: "How is Cnvrted different from a lead database?",
    answer: (
      <>
        Lead databases give you static contact records. Cnvrted gives you
        timing: the moment an account becomes ready to buy, with the context
        behind the signal.
      </>
    ),
  },
  {
    question: "How does pricing work for a team?",
    answer: (
      <>
        Choose a plan for your team size and workflow. Explore our{" "}
        <Link href="/pricing">pricing plans</Link> or{" "}
        <Link href="/contact">talk to the team</Link> about your needs.
      </>
    ),
  },
  {
    question: "How does Cnvrted handle my data?",
    answer: (
      <>
        Our <Link href="/privacy">Privacy Policy</Link> explains what
        information we collect, how we use it, and the choices available to you.
        Contact <a href="mailto:info@cnvrted.com">info@cnvrted.com</a> with
        questions.
      </>
    ),
  },
  {
    question: "Can I connect Cnvrted to my existing workflow?",
    answer: (
      <>
        Cnvrted brings buying signals into your revenue workflow.{" "}
        <Link href={BOOKING_URL}>Book a call</Link> to discuss the CRM and
        integrations your team uses.
      </>
    ),
  },
  {
    question: "How can I get started?",
    answer: (
      <>
        Visit the <a href="https://beta.cnvrted.com">Cnvrted beta</a> or{" "}
        <Link href={BOOKING_URL}>book a call</Link> with our team.
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
