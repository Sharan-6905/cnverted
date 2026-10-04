import "./live-headline.css";

/** Keep the complete tagline readable in HTML, including without JavaScript. */
export function LiveHeadline() {
  return (
    <span className="hero-live-title">
      <span className="hero-live-lead">Your next GTM move</span>{" "}
      <span className="hero-live-finish">
        starts with{" "}
        <span className="hero-live-signal">
          <span className="hero-live-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 17V12M12 19V5M19 17V9" />
            </svg>
          </span>
          a signal.
        </span>
      </span>
    </span>
  );
}
