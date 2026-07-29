import Image from "next/image";
import { Section } from "@/components/section";

export function CalendarProof() {
  return (
    <Section
      centered
      eyebrow="Outcome"
      title="Your calendar, not your prospecting list."
      description="Every account we surface turns into a meeting on your calendar — not another lead you have to chase."
    >
      <div
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl shadow-float"
        style={{ aspectRatio: "1728 / 910" }}
      >
        <Image
          src="/banners/calendar-booked.png"
          alt="A sales rep's calendar fully booked with back-to-back meetings — Product Discovery, Use Case Demo, Lead Qualification, Solution Overview — all booked with in-market accounts."
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          quality={95}
          className="object-contain"
        />
      </div>
    </Section>
  );
}
