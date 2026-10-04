import { JsonLd } from "@/components/json-ld";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cnvrted",
  url: SITE_URL,
  logo: `${SITE_URL}/cnvrted-logo.png`,
  description: SITE_DESCRIPTION,
  founder: [
    {
      "@type": "Person",
      name: "Dhruv Pradeep",
      url: "https://www.linkedin.com/in/dhruvprad/",
      sameAs: ["https://x.com/dhruvprad"],
    },
    {
      "@type": "Person",
      name: "Kailas S",
      url: "https://www.linkedin.com/in/kailas-krsna-s-a7855334a/",
      sameAs: ["https://x.com/kailaskrsna"],
    },
    {
      "@type": "Person",
      name: "Sharan S",
      url: "https://www.linkedin.com/in/sharan-s-6278b3360/",
      sameAs: ["https://x.com/Sharan6905"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/cnvrted",
    "https://x.com/cnvrted",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@cnvrted.com",
    contactType: "customer support",
    url: `${SITE_URL}/contact`,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  inLanguage: "en",
  name: "Cnvrted",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  name: "Cnvrted",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
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
      url: `${SITE_URL}/pricing`,
      description:
        "Surge costs $119 per month. Contact the team to confirm the monthly credit allowance.",
    },
  ],
};

export function StructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationSchema, websiteSchema],
      }}
    />
  );
}

// Product offers belong on product/pricing pages, not every article or error page.
export function SoftwareSchema() {
  return <JsonLd data={softwareSchema} />;
}
