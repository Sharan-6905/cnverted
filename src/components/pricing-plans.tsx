"use client";

import { useState } from "react";
import { TrendingUp, Handshake, Building2, Check, type LucideIcon } from "lucide-react";
import { BOOKING_URL } from "@/lib/booking";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  tagline: string;
  price: string;
  /** shown small, next to the price */
  period?: string;
  description: string;
  features: string[];
  Icon: LucideIcon;
  /** icon accent colour */
  accent: string;
  /** soft gradient wash behind the card */
  surface: string;
  cta: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Spark",
    tagline: "Pay-as-you-go for early teams",
    price: "$25",
    period: "4 days",
    description:
      "For early stage companies or growing sales teams (1–10 reps) who want to test the waters with us, or are ready to replace guesswork with real buying signals.",
    features: [
      "Real-time signal feed",
      "Up to 3 seats",
      "CRM integration",
      "Email support",
    ],
    Icon: TrendingUp,
    accent: "text-blue-600",
    surface: "bg-gradient-to-b from-blue-50/70 to-canvas/40",
    cta: "Select plan",
  },
  {
    name: "Surge",
    tagline: "Built for scaling teams",
    price: "$119",
    period: "Monthly",
    description:
      "For established sales organizations (5+ reps) looking to significantly widen their funnel and consistently reach buyers at the moment they enter the market.",
    features: [
      "Everything in Spark",
      "Up to 10 seats",
      "Automated outreach",
      "CoPilot AI assistant",
      "Priority support",
    ],
    Icon: Handshake,
    accent: "text-brand-teal",
    surface: "bg-gradient-to-b from-lime-50/70 to-canvas/40",
    cta: "Select plan",
    featured: true,
  },
  {
    name: "Dominion",
    tagline: "For full control & custom needs",
    price: "Talk to sales",
    description:
      "In this plan, we become a credible extension of your revenue team and guide you every step of the way, building a signal-led motion that fits your org.",
    features: [
      "Everything in Surge",
      "Unlimited seats",
      "Custom integrations",
      "Dedicated success manager",
    ],
    Icon: Building2,
    accent: "text-fuchsia-600",
    surface: "bg-gradient-to-b from-fuchsia-50/70 to-canvas/40",
    cta: "Talk to sales",
  },
];

export function PricingPlans() {
  return (
    <div className="pricing-cards-grid grid items-start gap-5 lg:grid-cols-3">
      {PLANS.map((plan) => (
        <PlanCard key={plan.name} plan={plan} />
      ))}
    </div>
  );
}

const ctaClass =
  "mt-7 flex h-12 w-full items-center justify-center rounded-xl text-sm font-medium smooth-transition transition-colors active:scale-[0.98]";

function PlanCard({ plan }: { plan: Plan }) {
  const [expanded, setExpanded] = useState(false);
  const { Icon } = plan;
  const planId = plan.name.toLowerCase();

  return (
    <article
      aria-labelledby={`plan-${planId}`}
      className={cn(
        "pricing-card flex flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-2xl smooth-transition transition-[border-color,box-shadow]",
        plan.surface,
        plan.featured
          ? "border-brand-teal/30 shadow-float"
          : "border-white/60 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.20)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Icon aria-hidden="true" className={cn("h-6 w-6", plan.accent)} strokeWidth={2} />
        {plan.featured && (
          <span className="rounded-full bg-lime-200/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-teal">
            Most popular
          </span>
        )}
      </div>

      <h2 id={`plan-${planId}`} className="pricing-card-title mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
        {plan.name}
      </h2>
      <p className="mt-1 text-sm text-body">{plan.tagline}</p>

      <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-4xl font-semibold tracking-tight text-ink">
          {plan.price}
        </span>
        {plan.period && <span className="text-sm text-body">{plan.period}</span>}
      </p>

      <p
        id={`plan-description-${planId}`}
        className={cn(
          "mt-4 text-sm leading-relaxed text-body",
          !expanded && "line-clamp-2"
        )}
      >
        {plan.description}
      </p>

      <div id={`plan-features-${planId}`} hidden={!expanded}>
        <ul className="mt-4 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-body">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`plan-description-${planId} plan-features-${planId}`}
        aria-label={`${expanded ? "See less" : "See more"} about ${plan.name}`}
        className="mt-1 min-h-11 w-fit text-sm font-medium text-ink underline-offset-4 smooth-transition hover:underline"
      >
        {expanded ? "See less" : "See more"}
      </button>

      <a
        href={BOOKING_URL}
        aria-label={`${plan.cta} — ${plan.name}`}
        className={cn(ctaClass, "bg-[#2B2B2B] text-on-dark hover:bg-ink")}
      >
        {plan.cta}
      </a>
    </article>
  );
}
