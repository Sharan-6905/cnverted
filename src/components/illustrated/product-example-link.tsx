import Link from "next/link";
import { PRODUCT_EXAMPLE_PATH } from "@/lib/product-example";
import "./product-example-link.css";

export function ProductExampleLink() {
  return (
    <section className="example-preview design-container" aria-labelledby="example-preview-title">
      <div className="example-preview-intro">
        <span className="marketing-eyebrow">Try it for your kind of business</span>
        <h2 id="example-preview-title">What would you actually say?</h2>
        <p>Choose a design studio, RevOps consultancy, or recruiting agency. Explore the fit, the signal, and a first message with a reason behind it.</p>
        <Link className="marketing-text-link" href={PRODUCT_EXAMPLE_PATH}>Try the interactive example <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="example-preview-note">
        <span className="example-sample-label">Sample data · AsterOps</span>
        <ol>
          <li><span>01 / Signal</span><p>Hiring an activation designer. Launching a self-serve beta.</p></li>
          <li><span>02 / Fit</span><p>An 84-person B2B software team, within the studio’s target market.</p></li>
          <li><span>03 / Outreach</span><p>“Is onboarding something you want outside help with while you hire?”</p></li>
        </ol>
      </div>
    </section>
  );
}
