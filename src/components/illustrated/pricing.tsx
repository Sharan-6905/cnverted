import Image from "next/image";
import Link from "next/link";
import { DEMO_PATH } from "@/lib/booking";
import { HelpPageArtwork } from "./redesign-page-artwork";
import { ScaledArtwork } from "./scaled-artwork";
import type { FAQItem } from "./faq";
import "./pricing.css";

const plans = [
  {
    id: "free",
    name: "Free introduction",
    credits: "400 credits · valid for 14 days",
    price: "Free",
    period: "",
    image: {
      src: "/figma/pricing-expert-windmill.png",
      width: 1338,
      height: 1176,
    },
    cta: "Start free",
    href: "https://beta.cnvrted.com",
  },
  {
    id: "starter",
    name: "Starter",
    credits: "1,750 credits per paid month",
    price: "$49",
    period: "/ month",
    image: {
      src: "/figma/pricing-pro-windmill.png",
      width: 1324,
      height: 1188,
    },
    cta: "View plan",
    href: "https://beta.cnvrted.com/pricing",
  },
  {
    id: "pro",
    name: "Pro",
    credits: "7,250 credits per paid month",
    price: "$199",
    period: "/ month",
    image: {
      src: "/figma/pricing-enterprise-windmill.png",
      width: 1312,
      height: 1199,
    },
    cta: "View plan",
    href: "https://beta.cnvrted.com/pricing",
  },
] as const;

export const pricingFAQs: FAQItem[] = [
  {
    question: "Can I start for free?",
    answer: "Yes. Verified accounts receive 400 introductory credits once, valid for 14 days.",
  },
  {
    question: "Need more credits?",
    answer:
      "Choose Starter at $49 for 1,750 monthly credits or Pro at $199 for 7,250. Add 550 credits for each $15 top-up; top-ups expire after three calendar months.",
  },
  {
    question: "How many credits does an action use?",
    answer: (
      <>
        Credit use varies with the measured cost of each action. Around 100 credits per scan is a planning benchmark, not a fixed charge. A scan that delivers zero new leads returns its held credits. Email <a href="mailto:info@cnvrted.com">info@cnvrted.com</a> with questions.
      </>
    ),
  },
  {
    question: "Is Cnvrted only for LinkedIn leads?",
    answer:
      "No. We find signals across LinkedIn, X, Reddit, Product Hunt, and the open web, then score leads against your ICP.",
  },
  {
    question: "Can you help us choose a plan?",
    answer: (
      <>
        <Link href={DEMO_PATH}>Book a demo</Link> and we’ll help you find the right
        fit.
      </>
    ),
  },
];

export function IllustratedPricing() {
  return (
    <>
      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="design-hero-landscape redesign-page-scene" aria-hidden="true">
          <ScaledArtwork width={1440} height={641}>
            <HelpPageArtwork />
          </ScaledArtwork>
        </div>
        <div className="pricing-hero-copy">
          <h1 id="pricing-title">Our Pricing</h1>
          <p>
            Start with 400 free credits.
            <br />
            Grow at your own pace.
          </p>
        </div>
      </section>

      <section
        className="pricing-plans design-container"
        aria-label="Pricing plans"
      >
        {plans.map((plan) => (
          <article
            className={`pricing-plan pricing-plan-${plan.id}`}
            key={plan.id}
          >
            <div className="pricing-plan-art" aria-hidden="true">
              <Image
                src={plan.image.src}
                width={plan.image.width}
                height={plan.image.height}
                sizes="(max-width: 900px) 140px, 250px"
                alt=""
              />
            </div>
            <div className="pricing-plan-content">
              <h2>{plan.name}</h2>
              <p className="pricing-plan-credits">{plan.credits}</p>
              <p className="pricing-plan-price">
                <span>{plan.price}</span>
                {plan.period ? <small>{plan.period}</small> : null}
              </p>
              <Link
                href={plan.href}
                className="pricing-plan-cta"
                aria-label={`${plan.cta} with ${plan.name}`}
              >
                {plan.cta}
              </Link>
              {plan.id !== "free" && (
                <p className="pricing-plan-note">
                  USD prices. View payment availability and confirm the final amount in the app.
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
      <section
        className="pricing-credit-guide design-container"
        aria-labelledby="credit-guide-title"
      >
        <h2 id="credit-guide-title">A plan for your usage.</h2>
        <p>
          Credits cover research, contact enrichment and Orka. Top up with 550 credits for $15,
          in multiples of $15, valid for three calendar months. Usage depends on the work an action needs;
          credit counts are not guaranteed lead counts.
        </p>
        <p>USD plans renew monthly until cancellation or the end of the authorised mandate. Indian monthly payments require a fresh INR quote and approval each month. Monthly plan credits expire 30 days after their paid cycle ends.</p>
        <p>Purchases are non-refundable except where required by law. Read the <Link href="/terms">Terms</Link>, <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> and <Link href="/privacy">Privacy Policy</Link>. Queries: <a href="mailto:info@cnvrted.com">info@cnvrted.com</a>.</p>
      </section>
    </>
  );
}
