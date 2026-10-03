import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

export function FAQSchema({
  path,
  items,
}: {
  path: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": absoluteUrl(`${path}#faq`),
        mainEntity: items.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }}
    />
  );
}
