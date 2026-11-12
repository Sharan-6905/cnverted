import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";

type T = (typeof CUSTOMER_TESTIMONIALS)[number];

function Card({ t }: { t: T }) {
  return (
    <figure>
      <div className="cg-quote-who">
        <span className="cg-quote-av">
          <img src={t.image} alt="" loading="lazy" style={t.portrait ? { transform: `scale(${t.portrait.scale})`, objectPosition: `${t.portrait.x}% ${t.portrait.y}%` } : undefined} />
        </span>
        <div>
          <p className="cg-quote-name">{t.author}</p>
          <p className="cg-quote-role">{t.role ?? "Cnvrted customer"}</p>
        </div>
      </div>
      <blockquote>{t.quote}</blockquote>
    </figure>
  );
}

/**
 * The quote column beside "From the open web to booked meetings": the site's real testimonials drifting upward
 * in a continuous loop (CSS only, home.css). The list is drawn twice and the track moves by exactly one copy, so
 * the loop has no seam; the second copy is hidden from screen readers. Hovering pauses it so a quote can be read;
 * reduced motion holds it still.
 */
export function HeroQuote() {
  return (
    <div className="cg-quote" aria-label="What customers say">
      <div className="cg-quote-track" style={{ animationDuration: `${CUSTOMER_TESTIMONIALS.length * 6}s` }}>
        <div className="cg-quote-set">{CUSTOMER_TESTIMONIALS.map((t) => <Card key={t.author} t={t} />)}</div>
        <div className="cg-quote-set" aria-hidden="true">{CUSTOMER_TESTIMONIALS.map((t) => <Card key={t.author} t={t} />)}</div>
      </div>
    </div>
  );
}
