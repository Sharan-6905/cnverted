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
      <div
        className="relative w-full overflow-hidden rounded-3xl shadow-float"
        style={{ aspectRatio: "1774 / 887" }}
      >
        <Image
          src="/banners/contact-reach.png"
          alt="A cnvrted target list of 96 accounts — company, why it matches the ICP, LinkedIn contact, designation, and verified work email — beside the outreach email generated for one of those contacts."
          fill
          className="object-contain"
        />
      </div>
    </Section>
  );
}
