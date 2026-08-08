"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Search, Menu, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { cn } from "@/lib/utils";

interface Row {
  company: string;
  logo?: string;
  whyIcp: string;
  designation: string;
  domain: string;
}

const ROWS: Row[] = [
  { company: "Stripe", logo: "/logos/companies/stripe.svg", whyIcp: "Fintech leader", designation: "CEO", domain: "stripe.com" },
  { company: "Datadog", logo: "/logos/companies/datadog.svg", whyIcp: "DevOps target", designation: "CTO", domain: "datadoghq.com" },
  { company: "Figma", logo: "/logos/companies/figma.svg", whyIcp: "Design-led SaaS", designation: "Head of Marketing", domain: "figma.com" },
  { company: "Notion", logo: "/logos/companies/notion.svg", whyIcp: "PLG collaboration fit", designation: "COO", domain: "makenotion.com" },
  { company: "Vercel", logo: "/logos/companies/vercel.svg", whyIcp: "Developer-first platform", designation: "Founder", domain: "vercel.com" },
  { company: "Retool", logo: "/logos/companies/retool.svg", whyIcp: "Ops tooling fit", designation: "CFO", domain: "retool.com" },
  { company: "Ramp", logo: "/logos/companies/ramp.png", whyIcp: "B2B finance fit", designation: "VP Sales", domain: "ramp.com" },
];

/** Domain stays legible; the local part is blurred out as sample data. */
function MaskedEmail({ domain }: { domain: string }) {
  return (
    <span>
      <span className="select-none blur-[3px]" aria-hidden="true">
        contact
      </span>
      @{domain}
    </span>
  );
}

function CompanyMark({ row }: { row: Row }) {
  if (row.logo) {
    return (
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-hairline bg-canvas shadow-soft">
        <Image src={row.logo} alt={row.company} fill className="object-contain p-1.5" />
      </span>
    );
  }
  return (
    <span className="flex h-8 items-center rounded-xl px-2 text-xs font-bold tracking-tight text-ink">
      {row.company}
    </span>
  );
}

function ShimmerBar({ width, delay }: { width: string; delay: number }) {
  return (
    <span
      className={cn("relative h-2 overflow-hidden rounded-full bg-[#2563FF]/10", width)}
    >
      <motion.span
        className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-[#2563FF]/40"
        animate={{ x: ["-100%", "220%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </span>
  );
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "teal" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "teal"
          ? "bg-brand-teal/10 text-brand-teal"
          : "bg-surface-soft text-body"
      )}
    >
      {children}
    </span>
  );
}

export function IcpEnrichmentTable() {
  return (
    <Section
      id="signals"
      centered
      className="pt-4 sm:pt-6 md:pt-8"
      eyebrow="Live enrichment"
      title={
        <>
          Watch{" "}
          <span className="bg-gradient-to-r from-brand-navy to-intent-high bg-clip-text text-transparent">
            Orka
          </span>{" "}
          find your ICP.
        </>
      }
      description="A sample of what enrichment looks like as it runs — every row is a company scored and matched against your ideal customer profile."
    >
      <div className="overflow-hidden rounded-3xl border border-hairline bg-canvas shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface-soft/40 text-xs font-semibold uppercase tracking-[0.08em] text-muted-soft">
                <th className="w-10 px-6 py-3.5">
                  <Menu className="h-4 w-4" />
                </th>
                <th className="px-3 py-3.5">Company</th>
                <th className="px-3 py-3.5">Why in-ICP</th>
                <th className="px-3 py-3.5">Designation</th>
                <th className="px-3 py-3.5">Email</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row.company}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group border-b border-hairline smooth-transition transition-colors last:border-0 hover:bg-surface-soft/50"
                >
                  <td className="px-6 py-4" />
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2.5">
                      <CompanyMark row={row} />
                      {row.logo && <span className="font-medium text-ink">{row.company}</span>}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <Badge tone="teal">{row.whyIcp}</Badge>
                  </td>
                  <td className="px-3 py-4">
                    <Badge>{row.designation}</Badge>
                  </td>
                  <td className="px-3 py-4">
                    <span className="inline-flex items-center gap-1.5 text-body">
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-brand-teal" />
                      <MaskedEmail domain={row.domain} />
                    </span>
                  </td>
                </motion.tr>
              ))}
              <tr>
                <td className="px-6 py-4" />
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-hairline bg-canvas shadow-soft">
                      <span className="absolute inset-0 -m-1 animate-ping rounded-2xl bg-[#2563FF]/15" />
                      <Image
                        src="/logos/companies/linear.svg"
                        alt="Linear"
                        fill
                        className="relative object-contain p-1.5"
                      />
                    </span>
                    <span className="font-medium text-ink">Linear</span>
                  </div>
                </td>
                <td className="px-3 py-4" colSpan={3}>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563FF]">
                    <Search className="h-3.5 w-3.5 animate-pulse" />
                    Scoring against your ICP&hellip;
                  </span>
                  <div className="mt-2 flex gap-2">
                    <ShimmerBar width="w-24" delay={0} />
                    <ShimmerBar width="w-16" delay={0.15} />
                    <ShimmerBar width="w-12" delay={0.3} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
