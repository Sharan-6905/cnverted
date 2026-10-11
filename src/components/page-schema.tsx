import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

/** Connect each page to the same site and publisher without inventing offers or ratings. */
export function PageSchema({ path, metadata, type = "WebPage", items }: {
  path: string;
  metadata: Metadata;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  items?: readonly { name: string; path: string }[];
}) {
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name: typeof metadata.title === "string" ? metadata.title : undefined,
    description: metadata.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(items?.length ? { mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1,
        name: item.name, url: absoluteUrl(item.path),
      })),
    } } : {}),
  }} />;
}
