import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { CUSTOMER_TESTIMONIALS } from "@/lib/testimonials";
import "./user-testimonials.css";

export function UserTestimonials() {
  return (
    <section className="user-testimonials design-container" aria-labelledby="testimonials-title">
      <div className="design-section-heading">
        <h2 id="testimonials-title">What our customers say</h2>
        <p className="testimonials-subtitle">Better leads. Real conversations. New customers.</p>
      </div>
      <ScrollReelTestimonials testimonials={CUSTOMER_TESTIMONIALS} />
    </section>
  );
}
