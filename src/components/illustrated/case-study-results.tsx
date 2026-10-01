import type { CaseStudySummary } from "@/lib/case-studies";

export function CaseStudyResults({
  results,
  compact = false,
}: {
  results: NonNullable<CaseStudySummary["results"]>;
  compact?: boolean;
}) {
  return (
    <div className={`case-results ${compact ? "case-results-compact" : ""}`}>
      <dl>
        {results.map((result) => (
          <div key={result.label}>
            <dt>{result.label}</dt>
            <dd>{result.value}</dd>
          </div>
        ))}
      </dl>
      <p>Results from the campaign described in this story.</p>
    </div>
  );
}
