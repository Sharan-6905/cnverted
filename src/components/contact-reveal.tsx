import Image from "next/image";
import { Section } from "@/components/section";

export function ContactReveal() {
  return (
    <Section
      centered
      eyebrow="Full contact reach"
      title={
        <>
          Not just a name —{" "}
          <span className="text-accent">the whole contact</span>.
        </>
      }
      description="LinkedIn, verified work email, role, and a message that's already warm — every account arrives ready to reach."
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-center">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-float lg:w-[38%]"
          style={{ aspectRatio: "1402 / 1102" }}
        >
          <Image
            src="/banners/email-followup.png"
            alt="A personalized follow-up email cnvrted drafted, referencing the prospect's context and a booking link."
            fill
            className="object-contain"
          />
        </div>
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl lg:w-[62%]"
          style={{ aspectRatio: "1672 / 941" }}
        >
          <Image
            src="/banners/contact-reveal.png"
            alt="We have access to the whole web — cnvrted surfaces verified LinkedIn and email contact details for every account."
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Section>
  );
}
