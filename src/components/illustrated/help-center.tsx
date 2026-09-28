import { HelpSearch } from "./help-search";
import { SupportArtwork } from "./support-artwork";
import "./help-center.css";

export function IllustratedHelpCenter() {
  return (
    <div className="help-center-content">
      <SupportArtwork variant="help" />
      <section className="help-hero" aria-labelledby="help-title">
        <h1 id="help-title">Help Center</h1>
        <p>Look through the common questions below, or reach out directly — we read every message.</p>
      </section>
      <HelpSearch />
    </div>
  );
}
