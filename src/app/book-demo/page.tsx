import { headers } from "next/headers";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FAQSchema } from "@/components/faq-schema";
import { ContactCalendar } from "@/components/illustrated/contact-calendar";
import { IllustratedShell } from "@/components/illustrated/shell";
import { DEMO_PATH } from "@/lib/booking";
import { pageMetadata } from "@/lib/seo";
import "@/components/illustrated/contact.css";
import "./book-demo.css";

export const metadata = pageMetadata({
  title: "Cnvrted GTM Demo | Book a 30-Minute Walkthrough",
  description:
    "Book a 30-minute Cnvrted demo. Explore buying signals, ICP matching, and your GTM workflow with the team. Choose an available time in our live calendar.",
  path: DEMO_PATH,
});

const demoFAQs = [
  {
    question: "What happens in a Cnvrted demo?",
    answer:
      "We start with the companies you want to reach and the challenges in your current outreach. Then we walk through Cnvrted’s buying signals, ICP matching, and GTM canvas, and discuss how they could fit your workflow.",
  },
  {
    question: "How long is the demo?",
    answer:
      "The call is 30 minutes. Choose an available time in the calendar, check the displayed time zone, and enter your details. Calendly provides the online meeting details after your booking is confirmed.",
  },
  {
    question: "What should I bring to the call?",
    answer:
      "Bring your company website, an example of the kind of customer you want to reach, and any questions about your current prospecting process. There is no presentation or document to prepare.",
  },
  {
    question: "Can we discuss pricing and integrations?",
    answer:
      "Yes. Tell us which CRM, outreach, and collaboration tools you use. We can discuss plan options, clarify credit usage, and check integration availability for your setup.",
  },
] as const;

export default async function BookDemoPage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <IllustratedShell className="design-demo-page" faqItems={demoFAQs}>
      <BreadcrumbSchema trail={[{ name: "Book a demo" }]} />
      <FAQSchema path={DEMO_PATH} items={demoFAQs} />
      <header className="marketing-page-heading demo-heading design-container">
        <span className="marketing-eyebrow">30 minutes · Your GTM, in focus</span>
        <h1>Cnvrted GTM Demo</h1>
        <p>
          Bring the customers you want to reach. We’ll explore the signals,
          context, and workflow that could help you make your next move.
        </p>
      </header>

      <ContactCalendar nonce={nonce} />

      <section className="demo-agenda design-container" aria-labelledby="demo-agenda-title">
        <span className="marketing-eyebrow">A conversation about your business</span>
        <h2 id="demo-agenda-title">What we’ll cover.</h2>
        <ol>
          <li>
            <span className="demo-step" aria-hidden="true">01</span>
            <h3>Who you want to reach</h3>
            <p>Start with your ideal customers, the problem you solve, and where finding the right prospects gets difficult.</p>
          </li>
          <li>
            <span className="demo-step" aria-hidden="true">02</span>
            <h3>What makes the timing right</h3>
            <p>Explore how public buying signals and ICP fit can give your team a clearer reason to start a conversation.</p>
          </li>
          <li>
            <span className="demo-step" aria-hidden="true">03</span>
            <h3>How it fits your workflow</h3>
            <p>Walk through the product, discuss your existing tools, and ask about plans, credits, and next steps.</p>
          </li>
        </ol>
      </section>

      <aside className="demo-before design-container" aria-label="Explore before your demo">
        <p>Want a little context before we meet?</p>
        <div>
          <Link className="marketing-text-link" href="/learn/signal-to-outreach">Follow a product example <span aria-hidden="true">↗</span></Link>
          <Link className="marketing-text-link" href="/case-studies">Read the case studies <span aria-hidden="true">↗</span></Link>
          <Link className="marketing-text-link" href="/pricing">Explore pricing <span aria-hidden="true">↗</span></Link>
          <Link className="marketing-text-link" href="/contact">Meet the team <span aria-hidden="true">↗</span></Link>
        </div>
      </aside>
    </IllustratedShell>
  );
}
