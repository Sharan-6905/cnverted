import { Mail } from "lucide-react";
import { HELP_SUPPORT_EMAIL } from "@/lib/help-center";
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
      <section className="help-support design-container" aria-labelledby="help-support-title">
        <div className="help-support-card">
          <div className="help-support-copy">
            <h2 id="help-support-title">Still need help?</h2>
            <p>For account questions, product support, or anything else, email our team.</p>
          </div>
          <a className="design-button design-button-solid help-support-email" href={`mailto:${HELP_SUPPORT_EMAIL}`}>
            <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
            {HELP_SUPPORT_EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
}
