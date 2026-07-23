"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    description: "For teams just getting started with buying-intent signals.",
    features: ["Real-time signal feed", "Up to 3 seats", "CRM integration", "Email support"],
  },
  {
    name: "Growth",
    price: "$199",
    period: "/mo",
    description: "For teams ready to scale outreach on live intent.",
    features: [
      "Everything in Starter",
      "Up to 10 seats",
      "Automated outreach",
      "CoPilot AI assistant",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For revenue teams with custom volume, security, or workflow needs.",
    features: [
      "Everything in Growth",
      "Unlimited seats",
      "Custom integrations",
      "Dedicated success manager",
    ],
  },
];

export function PricingPlans() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {PLANS.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "flex flex-col p-7",
            plan.featured && "border-ink shadow-float"
          )}
        >
          {plan.featured && (
            <Badge variant="clay" size="sm" className="mb-3 w-fit">
              Most popular
            </Badge>
          )}
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            {plan.name}
          </h3>
          <p className="mt-1.5 min-h-[40px] text-sm leading-relaxed text-muted">
            {plan.description}
          </p>
          <p className="mt-5">
            <span className="font-display text-3xl font-semibold tracking-tight text-ink">
              {plan.price}
            </span>
            {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
          </p>

          <ul className="mt-6 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-body">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            {plan.name === "Enterprise" ? (
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setShowContact(true)}
              >
                Contact us
              </Button>
            ) : (
              <a
                href="/early-access"
                className="flex h-11 w-full items-center justify-center rounded-xl bg-ink text-sm font-medium text-on-dark smooth-transition transition-colors hover:bg-body-strong"
              >
                Get early access
              </a>
            )}
          </div>
        </Card>
      ))}

      {showContact && (
        <p className="sm:col-span-3 rounded-xl border border-hairline bg-surface-soft px-4 py-3 text-center text-sm text-body">
          For enterprise plans, reach out to{" "}
          <a href="mailto:work@cnvrted.com" className="font-medium text-ink underline underline-offset-2">
            work@cnvrted.com
          </a>{" "}
          and we&rsquo;ll get back to you.
        </p>
      )}
    </div>
  );
}
