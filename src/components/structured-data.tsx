import { getNonce } from "@/lib/nonce";

const SITE_URL = "https://www.cnvrted.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cnvrted",
  url: SITE_URL,
  logo: `${SITE_URL}/cnvrted-logo.png`,
  description:
    "Cnvrted monitors the open web for real-time buying signals, scores accounts by intent, and helps sales teams reach buyers before the competition.",
  foundingDate: "2025",
  founders: [
    { "@type": "Person", name: "Dhruv Pradeep" },
    { "@type": "Person", name: "Kailas S" },
    { "@type": "Person", name: "Sharan S" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/cnvrted",
    "https://x.com/cnvrted",
    "https://discord.gg/xChmhfQx4",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@cnvrted.com",
    contactType: "sales",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cnvrted",
  url: SITE_URL,
  description:
    "Real-time buying signal intelligence for B2B sales teams. Monitor LinkedIn, Reddit, X, job boards, and funding news for intent signals.",
  publisher: { "@type": "Organization", name: "Cnvrted" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cnvrted",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "B2B intent data platform that monitors the dark funnel for buying signals and scores accounts by purchase readiness.",
  offers: [
    {
      "@type": "Offer",
      name: "Spark",
      price: "0",
      priceCurrency: "USD",
      description: "Free Spark access with 40 credits.",
    },
    {
      "@type": "Offer",
      name: "Surge",
      price: "119",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "For scaling teams that need deeper signals and automation.",
    },
  ],
};

export async function StructuredData() {
  const nonce = await getNonce();

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
