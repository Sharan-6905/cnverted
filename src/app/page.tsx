import { PageSchema } from "@/components/page-schema";
import { FAQSchema } from "@/components/faq-schema";
import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { SoftwareSchema } from "@/components/structured-data";
import { CrockedglassHome } from "@/components/crockedglass/home";
import { CG_FAQS } from "@/components/crockedglass/faq-data";

// Title/description stay the site-wide ones the old homepage ranked under; the FAQ schema follows the questions
// actually on this page.
export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <PageSchema path="/" metadata={metadata} />
      <SoftwareSchema includeOffers={false} />
      <FAQSchema path="/" items={CG_FAQS.map(([question, answer]) => ({ question, answer }))} />
      <CrockedglassHome />
    </>
  );
}
