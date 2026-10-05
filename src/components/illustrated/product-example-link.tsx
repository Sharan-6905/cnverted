import Link from "next/link";
import { PRODUCT_EXAMPLE_PATH } from "@/lib/product-example";
import "./product-example-link.css";

export function ProductExampleLink() {
  return (
    <section className="example-preview design-container" aria-labelledby="example-preview-title">
      <div className="example-preview-intro">
        <span className="marketing-eyebrow">One signal, followed through</span>
        <h2 id="example-preview-title">What would you actually say?</h2>
        <p>A hiring post is a clue. Here’s how the context behind it becomes a relevant first message.</p>
        <Link className="marketing-text-link" href={PRODUCT_EXAMPLE_PATH}>Follow the worked example <span aria-hidden="true">↗</span></Link>
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
