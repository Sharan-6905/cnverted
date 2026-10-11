import { FAQSchema } from "@/components/faq-schema";
import { HOME_FAQS } from "@/lib/home-faqs";
import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo";
import { SoftwareSchema } from "@/components/structured-data";
import { IllustratedShell } from "@/components/illustrated/shell";
import { RedesignHome } from "@/components/illustrated/redesign-home";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <IllustratedShell className="redesign-home" redesign>
      <SoftwareSchema />
      <FAQSchema path="/" items={HOME_FAQS} />
      <RedesignHome />
    </IllustratedShell>
  );
}
