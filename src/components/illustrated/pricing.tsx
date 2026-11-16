import Image from "next/image";
import Link from "next/link";
import { DEMO_PATH } from "@/lib/booking";
import { HeroDots } from "@/components/crockedglass/hero-dots";
import type { FAQItem } from "./faq";
import "./pricing.css";

// Desktop shows Free · Starter · Pro; under 900px the CSS `order` puts Starter, then Pro, then Free.
const plans = [
  {
    id: "free",
    name: "Free",
    tagline: "Perfect for small teams",
    // no price line: the body is a single prompt above the button
    pitch: "Get started with building your profile",
    price: "",
    period: "",
    credits: "",
    cta: "Start Free Trial",
    href: "https://beta.cnvrted.com",
    image: { src: "/figma/pricing-card-free.png", width: 1671, height: 941 },
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "AI tools for scaling teams.",
    price: "$49",
    period: "per month",
    credits: "1,750 credits per paid month",
    cta: "Get Started",
    href: "https://beta.cnvrted.com/?view=pricing",
    badge: "Most Popular",
    image: { src: "/figma/pricing-card-starter.png", width: 1672, height: 941 },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "AI tools for scaling teams.",
    price: "$199",
    period: "per month",
    credits: "7,250 credits per paid month",
    cta: "Get Started",
    href: "https://beta.cnvrted.com/?view=pricing",
    image: { src: "/figma/pricing-card-pro.png", width: 1671, height: 941 },
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
        <HeroDots />
        <div className="pricing-hero-copy">
          <h1 id="pricing-title">Choose the right plan for you</h1>
          <p>
            Start with 400 free credits.
            <br />
            Grow at your own pace.
          </p>
        </div>
      </section>

      <section className="pricing-plans design-container" aria-label="Pricing plans">
        {plans.map((plan) => (
          <article
            className={`pricing-plan pricing-plan-${plan.id}`}
            key={plan.id}
            aria-labelledby={`plan-${plan.id}`}
          >
            <div className="pricing-plan-art" aria-hidden="true">
              <Image
                src={plan.image.src}
                width={plan.image.width}
                height={plan.image.height}
                sizes="1680px"
                loading="eager"
                quality={75}
                alt=""
              />
            </div>
            <div className="pricing-plan-head">
              <div className="pricing-plan-title">
                <h2 id={`plan-${plan.id}`}>{plan.name}</h2>
                {"badge" in plan && <span className="pricing-plan-badge">{plan.badge}</span>}
              </div>
              <p>{plan.tagline}</p>
            </div>
            <div className="pricing-plan-body">
              {"pitch" in plan ? (
                <p className="pricing-plan-pitch">{plan.pitch}</p>
              ) : (
                <>
                  <p className="pricing-plan-price">
                    <span>{plan.price}</span>
                    {plan.period ? <small>{plan.period}</small> : null}
                  </p>
                  <p className="pricing-plan-credits">{plan.credits}</p>
                </>
              )}
              <Link
                href={plan.href}
                className={plan.id === "free" ? "pricing-plan-cta-outline" : "cv-cta pricing-plan-cta"}
                aria-label={`${plan.cta} with ${plan.name}`}
              >
                {plan.cta}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="pricing-credit-guide design-container" aria-labelledby="credit-guide-title">
        <h2 id="credit-guide-title">A plan for your usage.</h2>
        <div>
          <p>
            Credits cover research, contact enrichment and Orka. Top up with 550 credits for $15,
            in multiples of $15, valid for three calendar months. Usage depends on the work an action needs;
            credit counts are not guaranteed lead counts.
          </p>
          <p>USD plans renew monthly until cancellation or the end of the authorised mandate. Indian monthly payments require a fresh INR quote and approval each month. Monthly plan credits expire 30 days after their paid cycle ends.</p>
        </div>
      </section>

      <section className="pricing-sales design-container" aria-labelledby="pricing-sales-title">
        <div>
          <h2 id="pricing-sales-title">Contact Sales</h2>
          <p>Purchases are non-refundable except where required by law. Read the <Link href="/terms">Terms</Link>, <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
        </div>
        <Link href="/contact" className="cv-cta pricing-plan-cta">Contact Us</Link>
      </section>
    </>
  );
}
