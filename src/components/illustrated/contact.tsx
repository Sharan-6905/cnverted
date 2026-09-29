import Image from "next/image";
import { DHRUV_PRADEEP } from "@/lib/blog-posts";
import { ContactCalendar } from "./contact-calendar";
import { ScaledArtwork } from "./scaled-artwork";
import { SupportArtwork } from "./support-artwork";
import "./contact.css";

type Founder = {
  name: string;
  role: string;
  description: string;
  email: string;
  portrait: string;
  imageSize: number;
  crop: string;
  linkedin?: string;
  x?: string;
};

const founders: readonly Founder[] = [
  {
    name: DHRUV_PRADEEP.name,
    role: "Co-founder, CEO",
    description: "Talk GTM strategy, partnerships, and getting started with Cnvrted.",
    email: "dhruv@cnvrted.com",
    portrait: "/figma/contact/dhruv.png",
    imageSize: 1600,
    crop: "dhruv",
    linkedin: DHRUV_PRADEEP.linkedin,
  },
  {
    name: "Kailas S",
    role: "Co-founder, CTO",
    description: "Talk product, AI, and connecting Cnvrted to your tools.",
    email: "kailas@cnvrted.com",
    portrait: "/figma/contact/kailas.png",
    imageSize: 1040,
    crop: "kailas",
  },
  {
    name: "Saran S",
    role: "Co-founder, COO",
    description: "Talk onboarding, operations, and scaling your team’s workflow.",
    email: "sharan@cnvrted.com",
    portrait: "/figma/contact/saran.png",
    imageSize: 1600,
    crop: "saran",
  },
];

export function IllustratedContact({ nonce }: { nonce?: string }) {
  return (
    <div className="contact-content">
      <SupportArtwork variant="contact" />
      <header className="contact-hero">
        <h1 id="contact-title">Connect with Cnvrted</h1>
        <p>Let’s talk about your go-to-market.</p>
      </header>
      <ContactCalendar nonce={nonce} />
      <section className="contact-founders" aria-labelledby="founders-title">
        <div className="contact-founders-glow" aria-hidden="true">
          <ScaledArtwork width={1440} height={438.4}>
            <Image src="/figma/contact/founder-glow.svg" alt="" width={1627.4} height={438.4} unoptimized />
          </ScaledArtwork>
        </div>
        <div className="contact-founders-heading">
          <h2 id="founders-title">Meet the founders</h2>
          <p>Get to know the people behind Cnvrted.</p>
        </div>
        <div className="contact-founder-grid design-container">
          {founders.map((founder) => (
            <article className="contact-founder" key={founder.email}>
              <div className={`contact-founder-photo contact-founder-photo-${founder.crop}`}>
                <div className="contact-founder-crop">
                  <Image src={founder.portrait} alt={founder.name} width={founder.imageSize} height={founder.imageSize} sizes="(max-width: 767px) 700px, 520px" />
                  <span className="contact-founder-photo-role" aria-hidden="true">{founder.role}</span>
                </div>
              </div>
              <div className="contact-founder-content">
                <div>
                  <h3>{founder.name}</h3>
                  <p className="contact-founder-role">{founder.role}</p>
                  <p className="contact-founder-description">{founder.description}</p>
                  <a className="contact-founder-email" href={`mailto:${founder.email}`}>{founder.email}</a>
                </div>
                <div className="contact-founder-socials">
                  {founder.linkedin ? (
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn`}>
                      <Image src="/figma/contact/linkedin.svg" width={24} height={24} alt="" unoptimized />
                    </a>
                  ) : null}
                  {founder.x ? (
                    <a href={founder.x} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on X`}>
                      <Image src="/figma/contact/x.svg" width={24} height={24} alt="" unoptimized />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
