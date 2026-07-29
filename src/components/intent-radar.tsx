import Image from "next/image";
import { Section } from "@/components/section";

export function IntentRadar() {
  return (
    <Section
      centered
      eyebrow="Buying intent"
      title="We don't guess who's ready. We watch."
      description="Every dot on this radar is a real account showing intent right now — and the exact reason it's in-market."
    >
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl"
        style={{ aspectRatio: "1536 / 884" }}
      >
        <Image
          src="/banners/intent-radar.png"
          alt="A radar of accounts showing buying intent, each paired with the specific reason they're in-market."
          fill
          className="object-contain"
        />
      </div>
    </Section>
  );
}
