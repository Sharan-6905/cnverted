import { getNonce } from "@/lib/nonce";

const SITE_URL = "https://www.cnvrted.com";

interface Crumb {
  name: string;
  /** Path relative to SITE_URL, e.g. "/pricing". Omit for the current page. */
  path?: string;
}

/**
 * Emits BreadcrumbList JSON-LD so Google can read the page's place in the
 * site hierarchy — one of the stronger technical signals for sitelinks.
 * Home is implicit; pass the rest of the trail down to (but not including
 * a path for) the current page.
 */
export async function BreadcrumbSchema({ trail }: { trail: Crumb[] }) {
  const nonce = await getNonce();
  const items = [{ name: "Home", path: "/" }, ...trail];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path === "/" ? "" : item.path}` } : {}),
    })),
  };

  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
