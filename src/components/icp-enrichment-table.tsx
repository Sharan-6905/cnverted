"use client";

import Image from "next/image";
import { Search, Menu } from "lucide-react";
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

function maskEmail(domain: string) {
  return `contact@${domain}`;
}

function CompanyMark({ row }: { row: Row }) {
  if (row.logo) {
    return (
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas p-1.5">
        <Image src={row.logo} alt={row.company} fill className="object-contain p-1.5" />
      </span>
    );
  }
  return (
    <span className="flex h-7 items-center rounded-lg px-2 text-xs font-bold tracking-tight text-ink">
      {row.company}
    </span>
  );
}

export function IcpEnrichmentTable() {
  return (
    <Section
      id="signals"
      eyebrow="Live enrichment"
      title="Watch Orka find your ICP."
      description="A sample of what enrichment looks like as it runs — every row is a company scored and matched against your ideal customer profile."
    >
      <div className="overflow-hidden rounded-3xl border border-hairline bg-canvas shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline text-xs font-semibold uppercase tracking-[0.08em] text-muted-soft">
                <th className="w-10 px-6 py-3">
                  <Menu className="h-4 w-4" />
                </th>
                <th className="px-3 py-3">Company</th>
                <th className="px-3 py-3">Why in-ICP</th>
                <th className="px-3 py-3">Designation</th>
                <th className="px-3 py-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.company} className="border-b border-hairline last:border-0">
                  <td className="px-6 py-4" />
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2.5">
                      <CompanyMark row={row} />
                      {row.logo && <span className="font-medium text-ink">{row.company}</span>}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-body">{row.whyIcp}</td>
                  <td className="px-3 py-4 text-body">{row.designation}</td>
                  <td className="px-3 py-4 text-body">{maskEmail(row.domain)}</td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4" />
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas p-1.5">
                      <Image
                        src="/logos/companies/linear.svg"
                        alt="Linear"
                        fill
                        className="object-contain p-1.5"
                      />
                    </span>
                    <span className="font-medium text-ink">Linear</span>
                  </div>
                </td>
                {[0, 1, 2].map((i) => (
                  <td key={i} className="px-3 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-brand-teal")}>
                      <Search className="h-3.5 w-3.5 animate-pulse" />
                      searching&hellip;
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
