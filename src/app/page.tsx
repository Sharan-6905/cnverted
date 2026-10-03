import { FAQSchema } from "@/components/faq-schema";
import { HOME_FAQS } from "@/lib/home-faqs";
import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { SoftwareSchema } from "@/components/structured-data";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHome } from "@/components/illustrated/home";
import { ClosingCTA } from "@/components/illustrated/closing-cta";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <IllustratedShell closingCTA={<ClosingCTA />}>
      <SoftwareSchema />
      <FAQSchema path="/" items={HOME_FAQS} />
      <IllustratedHome />
    </IllustratedShell>
  );
}
