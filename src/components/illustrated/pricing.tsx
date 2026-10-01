import Image from "next/image";
import { BOOKING_URL } from "@/lib/booking";
import { BlogLandscape } from "./artwork";
import { ScaledArtwork } from "./scaled-artwork";
import type { FAQItem } from "./faq";
import "./pricing.css";

const plans = [
  {
    id: "spark",
    name: "Spark",
    credits: "40 credits",
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
    id: "surge",
    name: "Surge",
    credits: "Monthly credit plan",
    price: "$119",
    period: "/ month",
    image: {
      src: "/figma/pricing-pro-windmill.png",
      width: 1324,
      height: 1188,
    },
    cta: "Book a demo",
    href: BOOKING_URL,
  },
  {
    id: "dominion",
    name: "Dominion",
    credits: "Custom credits",
    price: "Talk to sales",
    period: "",
    image: {
      src: "/figma/pricing-enterprise-windmill.png",
      width: 1312,
      height: 1199,
    },
    cta: "Book a demo",
    href: BOOKING_URL,
  },
] as const;

export const pricingFAQs: FAQItem[] = [
  {
    question: "Can I start for free?",
    answer: "Yes. Spark includes 40 free credits to try Cnvrted.",
  },
  {
    question: "Need more credits?",
    answer:
      "Choose Surge at $119 per month, or talk to us about a custom Dominion plan.",
  },
  {
    question: "How many credits does an action use?",
    answer: (
      <>
        Contact <a href="mailto:info@cnvrted.com">info@cnvrted.com</a> for the
        current credit costs and monthly allowance before choosing a paid plan.
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
        <a href={BOOKING_URL}>Book a demo</a> and we’ll help you find the right
        fit.
      </>
    ),
  },
];

export function IllustratedPricing() {
  return (
    <>
      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="design-hero-landscape" aria-hidden="true">
          <ScaledArtwork width={1440} height={641}>
            <BlogLandscape />
          </ScaledArtwork>
        </div>
        <div className="pricing-hero-copy">
          <h1 id="pricing-title">Our Pricing</h1>
          <p>
            Start with 40 free credits.
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
                sizes="(max-width: 767px) 200px, 250px"
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
              <a
                href={plan.href}
                className="pricing-plan-cta"
                aria-label={`${plan.cta} with ${plan.name}`}
              >
                {plan.cta}
              </a>
              {plan.id === "surge" && (
                <p className="pricing-plan-note">
                  Contact us to confirm the monthly credit allowance.
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
          Credits are your usage allowance in Cnvrted. Spark gives you 40 to get
          started. For a paid plan, <a href={BOOKING_URL}>talk to our team</a>{" "}
          to confirm what each action costs and how many credits your workflow
          needs.
        </p>
      </section>
    </>
  );
}
