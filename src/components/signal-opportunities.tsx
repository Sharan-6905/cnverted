"use client";

import { Banknote, UserPlus, MessageSquareWarning, Cpu, Target, ArrowLeftRight, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { REVEAL_DURATION, REVEAL_EASE } from "@/components/reveal";

type SignalOpportunity = {
  Icon: LucideIcon;
  title: string;
  statement: string;
  description: string;
  tags: string[];
};

const OPPORTUNITIES: SignalOpportunity[] = [
  {
    Icon: Banknote,
    title: "Funding & Expansion",
    statement: "They just got funded.",
    description:
      "Detect new funding, expansion plans, and growth announcements before the hiring surge hits.",
    tags: ["Series A", "Series B", "New market", "Expansion"],
  },
  {
    Icon: UserPlus,
    title: "Hiring & Growth",
    statement: "They're building the team.",
    description:
      "Identify companies hiring for roles that reveal new initiatives, growing teams, or upcoming spend.",
    tags: ["Hiring SDRs", "New VP", "New department"],
  },
  {
    Icon: MessageSquareWarning,
    title: "Buyer Pain",
    statement: "They're asking for a solution.",
    description:
      "Find people actively describing problems, asking for recommendations, or evaluating tools.",
    tags: ["Reddit", "X", "LinkedIn", "Communities"],
  },
  {
    Icon: Cpu,
    title: "Technology Changes",
    statement: "Their stack just changed.",
    description:
      "Detect new technologies, migrations, integrations, and infrastructure changes that create buying opportunities.",
    tags: ["New CRM", "Migration", "Integration", "Stack change"],
  },
  {
    Icon: Target,
    title: "Competitive Intent",
    statement: "They're looking for an alternative.",
    description:
      "Identify buyers comparing vendors, complaining about existing solutions, or searching for alternatives.",
    tags: ["Comparing", "Alternative", "Switching", "Competitor"],
  },
  {
    Icon: ArrowLeftRight,
    title: "Executive Changes",
    statement: "A new decision-maker just arrived.",
    description:
      "Detect new CROs, CMOs, RevOps leaders, founders, and other key decision-makers entering your ICP.",
    tags: ["New CRO", "New CMO", "New VP Sales", "Leadership"],
  },
];

export function SignalOpportunities() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="signals"
      centered
      eyebrow="Signals"
      title="Find the moments that create pipeline"
      description="Cnvrted watches the open web for the events and conversations that tell you when an account might actually be ready to buy."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPPORTUNITIES.map((o, i) => (
          <motion.article
            key={o.title}
            className="group rounded-3xl border border-hairline bg-canvas p-6 smooth-transition transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-float md:p-7"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: REVEAL_DURATION,
                    ease: REVEAL_EASE,
                    delay: (i % 3) * 0.08,
                  }
            }
          >
            <div className="flex items-center gap-2.5">
              <o.Icon className="h-[18px] w-[18px] shrink-0 text-brand-navy" strokeWidth={1.75} />
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                {o.title}
              </h3>
            </div>
            <p className="mt-1.5 text-sm font-medium text-muted-soft">{o.statement}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-body">{o.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {o.tags.map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
