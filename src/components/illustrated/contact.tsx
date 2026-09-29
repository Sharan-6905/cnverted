import Image from "next/image";
import { DHRUV_PRADEEP } from "@/lib/blog-posts";
import { ContactCalendar } from "./contact-calendar";
import { ScaledArtwork } from "./scaled-artwork";
import { SupportArtwork } from "./support-artwork";
import "./contact.css";

type TeamMember = {
  name: string;
  description: string;
  email: string;
  portrait: string;
  imageSize: number;
  crop: string;
  linkedin?: string;
  x?: string;
};

const foundingTeam: readonly TeamMember[] = [
  {
    name: DHRUV_PRADEEP.name,
    description: "Talk GTM strategy, partnerships, and getting started with Cnvrted.",
    email: "dhruv@cnvrted.com",
    portrait: "/figma/contact/dhruv.png",
    imageSize: 1600,
    crop: "dhruv",
    linkedin: DHRUV_PRADEEP.linkedin,
    x: "https://x.com/dhruvprad",
  },
  {
    name: "Kailas S",
    description: "Talk product, AI, and connecting Cnvrted to your tools.",
    email: "kailas@cnvrted.com",
    portrait: "/figma/contact/kailas.png",
    imageSize: 1040,
    crop: "kailas",
    linkedin: "https://www.linkedin.com/in/kailas-krsna-s-a7855334a/",
    x: "https://x.com/kailaskrsna",
  },
  {
    name: "Sharan S",
    description: "Talk onboarding, operations, and scaling your team’s workflow.",
    email: "sharan@cnvrted.com",
    portrait: "/figma/contact/saran.png",
    imageSize: 1600,
    crop: "saran",
    linkedin: "https://www.linkedin.com/in/sharan-s-6278b3360/",
    x: "https://x.com/Sharan6905",
  },
  {
    name: "Anupam Bagchi",
    description: "Talk design, user experience, and making Cnvrted easier to use.",
    email: "anupam@cnvrted.com",
    portrait: "/figma/contact/anupam.png",
    imageSize: 800,
    crop: "anupam",
    linkedin: "https://www.linkedin.com/in/anupambagchi2/",
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
          <h2 id="founders-title">Meet the Founding Team</h2>
          <p>Get to know the people behind Cnvrted.</p>
        </div>
        <div className="contact-founder-grid design-container">
          {foundingTeam.map((founder) => (
            <article className="contact-founder" key={founder.email}>
              <div className={`contact-founder-photo contact-founder-photo-${founder.crop}`}>
                <div className="contact-founder-crop">
                  <Image src={founder.portrait} alt={founder.name} width={founder.imageSize} height={founder.imageSize} sizes="(max-width: 767px) 700px, 520px" />
                </div>
              </div>
              <div className="contact-founder-content">
                <div>
                  <h3>{founder.name}</h3>
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
