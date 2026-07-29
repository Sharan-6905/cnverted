import { Section } from "@/components/section";
import { RadarController } from "@/components/radar/radar-controller";

export function IntentRadar() {
  return (
    <Section
      centered
      eyebrow="Buying intent"
      title="We don't guess who's ready. We watch."
      description="Every dot on this radar is a real account showing intent right now — and the exact reason it's in-market."
    >
      <RadarController />
    </Section>
  );
}
