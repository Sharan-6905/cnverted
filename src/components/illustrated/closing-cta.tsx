import { BOOKING_URL } from "@/lib/booking";
import { DesignLink } from "./hero";

export function ClosingCTA() {
  return (
    <section
      className="design-closing-cta design-container"
      aria-labelledby="closing-cta-title"
    >
      <span className="marketing-eyebrow">
        Your next conversation starts here
      </span>
      <h2 id="closing-cta-title">Find a reason to reach out.</h2>
      <p>
        Start with 40 free credits, or walk through your workflow with our team.
      </p>
      <div className="design-closing-actions">
        <DesignLink href="https://beta.cnvrted.com" arrow>
          Start free
        </DesignLink>
        <DesignLink href={BOOKING_URL} secondary>
          Book a demo
        </DesignLink>
      </div>
    </section>
  );
}
