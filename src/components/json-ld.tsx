import { getNonce } from "@/lib/nonce";

export async function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      nonce={await getNonce()}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
