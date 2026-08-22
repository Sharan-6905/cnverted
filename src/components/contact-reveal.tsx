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
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
        <div
          className="relative w-full overflow-hidden rounded-3xl shadow-float"
          style={{ aspectRatio: "1536 / 1024" }}
        >
          <Image
            src="/banners/target-list.png"
            alt="A cnvrted target list of 96 accounts, each row showing the company, why it matches the ICP, the LinkedIn contact, their designation, and a verified work email."
            fill
            className="object-contain"
          />
        </div>
        <div
          className="relative w-full overflow-hidden rounded-3xl shadow-float"
          style={{ aspectRatio: "1672 / 941" }}
        >
          <Image
            src="/banners/generated-email.png"
            alt="An outreach email cnvrted generated for that contact, opening with the prospect's recent funding round and tying it to the product."
            fill
            className="object-contain"
          />
        </div>
      </div>
    </Section>
  );
}
