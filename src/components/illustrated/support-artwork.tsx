import Image from "next/image";
import { ScaledArtwork } from "./scaled-artwork";
import { assets } from "./assets";
import "./support-pages.css";

type Variant = "help" | "slack" | "contact" | "terms" | "privacy" | "article" | "case-study";

/** Figma artwork stays on a 1440px canvas; all page content reflows separately. */
export function SupportArtwork({ variant }: { variant: Variant }) {
  return (
    <div className={`design-hero-landscape support-artwork-frame support-artwork-${variant}`} aria-hidden="true">
      <ScaledArtwork width={1440} height={641}>
        <div className="support-artwork">
          {variant === "help" ? (
            <>
              <Image className="support-trees" src={assets.blogListing.imgImage61} alt="" width={1745} height={963} sizes="1745px" loading="eager" />
              <Image className="support-help-fade" src="/figma/support-fade.svg" alt="" width={4064.2} height={1018.2} unoptimized loading="eager" />
            </>
          ) : variant === "slack" || variant === "contact" ? (
            <>
              <div className="support-cloud-crop">
                <Image className="support-clouds" src={assets.blogListing.imgImage61} alt="" width={2403.9} height={1327.3} sizes="2404px" loading="eager" />
              </div>
              <Image className="support-slack-fade-bottom" src={variant === "contact" ? "/figma/contact/fade-bottom.svg" : "/figma/slack-fade-bottom.svg"} alt="" width={4339.8} height={946.8} unoptimized loading="eager" />
              <Image className="support-slack-fade-top" src={variant === "contact" ? "/figma/contact/fade-top.svg" : "/figma/slack-fade-top.svg"} alt="" width={1946.2} height={441.2} unoptimized loading="eager" />
            </>
          ) : (
            <>
              {variant === "terms" || variant === "article" || variant === "case-study" ? (
                <div className="support-terms-crop">
                  <Image className="support-terms-landscape" src={assets.careers.imgImage60} alt="" width={2691} height={1486} sizes="2691px" loading="eager" />
                </div>
              ) : (
                <Image className="support-privacy-landscape" src="/figma/privacy-landscape.png" alt="" width={2043} height={1128} sizes="2043px" loading="eager" />
              )}
              <Image className="support-legal-birds" src={assets.careers.imgObject} alt="" width={96} height={33} sizes="96px" loading="eager" />
              {variant === "privacy" ? (
                <div className="support-privacy-fade-wrap">
                  <Image src="/figma/privacy-fade-bottom.svg" alt="" width={3094.2} height={808.3} unoptimized loading="eager" />
                </div>
              ) : (
                <Image className="support-legal-fade-bottom" src={variant === "case-study" ? "/figma/side-story/fade-bottom.svg" : variant === "article" ? "/figma/blogs/fade-bottom.svg" : "/figma/legal-fade-bottom.svg"} alt="" width={3094.2} height={516.2} unoptimized loading="eager" />
              )}
              <Image className="support-legal-fade-top" src={variant === "case-study" ? "/figma/side-story/fade-top.svg" : variant === "article" ? "/figma/blogs/fade-top.svg" : "/figma/legal-fade-top.svg"} alt="" width={1976.2} height={340.2} unoptimized loading="eager" />
            </>
          )}
        </div>
      </ScaledArtwork>
    </div>
  );
}
