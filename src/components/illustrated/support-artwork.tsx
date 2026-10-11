import { ScaledArtwork } from "./scaled-artwork";
import { HelpPageArtwork, ContactPageArtwork, TermsPageArtwork, StoryPageArtwork } from "./redesign-page-artwork";
import "./support-pages.css";

type Variant = "help" | "slack" | "contact" | "terms" | "privacy" | "article" | "case-study";
const scenes = { help: HelpPageArtwork, slack: HelpPageArtwork, contact: ContactPageArtwork, terms: TermsPageArtwork, privacy: TermsPageArtwork, article: StoryPageArtwork, "case-study": StoryPageArtwork };

/** Decorative Figma canvas; text, forms, and controls reflow independently. */
export function SupportArtwork({ variant }: { variant: Variant }) {
  const Scene = scenes[variant];
  return <div className={`design-hero-landscape support-artwork-frame redesign-page-scene support-artwork-${variant}`} aria-hidden="true">
    <ScaledArtwork width={1440} height={641}><Scene /></ScaledArtwork>
  </div>;
}
