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
    { "@type": "Person", name: "Dhruv Pradeep", jobTitle: "CEO" },
    { "@type": "Person", name: "Kailas", jobTitle: "CTO" },
    { "@type": "Person", name: "Sharan", jobTitle: "COO" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/cnvrted",
    "https://x.com/cnvrted",
    "https://www.instagram.com/cnvrted",
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
      price: "25",
      priceCurrency: "USD",
      billingIncrement: "P4D",
      description: "For teams getting started with intent-driven outbound.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Cnvrted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cnvrted is a B2B intent data platform that monitors the open web — LinkedIn, Reddit, X, job boards, and funding news — for real-time buying signals. It scores accounts by purchase readiness so sales teams can reach buyers before the competition.",
      },
    },
    {
      "@type": "Question",
      name: "How does Cnvrted detect buying signals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cnvrted continuously scans public sources across the web for signals that indicate a company is entering a purchase cycle — job postings, funding rounds, technology changes, social discussions, and more. These signals are scored and matched against your ideal customer profile.",
      },
    },
    {
      "@type": "Question",
      name: "How is Cnvrted different from Apollo or ZoomInfo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional tools like Apollo and ZoomInfo sell static contact databases — the same list everyone else has. Cnvrted focuses on timing, not lists. It tells you which accounts are actively showing intent right now, so your outbound lands when buyers are ready.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Cnvrted cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cnvrted offers three plans: Spark at $25 for four days of access, Surge at $119 per month for scaling teams, and Dominion with custom enterprise pricing. All plans include real-time intent signals and ICP scoring.",
      },
    },
    {
      "@type": "Question",
      name: "Who founded Cnvrted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cnvrted was founded in Bangalore by three young builders: Dhruv Pradeep (CEO), Kailas (CTO), and Sharan (COO). They started building after dozens of conversations with sales teams who all said the same thing — static lead lists stopped working.",
      },
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
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
