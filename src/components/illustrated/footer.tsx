import Link from "next/link";
import Image from "next/image";
import { assets } from "./assets";
import { ScaledArtwork } from "./scaled-artwork";
import { FooterSpotlight } from "./footer-spotlight";
import { DEMO_PATH } from "@/lib/booking";

const columns = [
  {
    title: "About Us",
    links: [
      ["About us", "/about"],
      ["Careers", "/careers"],
      ["Partners", "/contact"],
      ["Our customers", "/customers"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Pricing", "/pricing"],
      ["Blogs", "/blogs"],
      ["Case Studies", "/case-studies"],
      ["Learn", "/learn"],
      ["Help Center", "/help-center"],
      ["Join Slack", "/join-slack"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Book a call", DEMO_PATH],
      ["Terms & Conditions", "/terms"],
      ["Privacy Policy", "/privacy"],
      ["Contact", "/contact"],
    ],
  },
];
const social = [
  { label: "X", href: "https://x.com/cnvrted", image: assets.home.imgIcon3 },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cnvrted",
    image: assets.home.imgIcon4,
  },
  {
    label: "Discord",
    href: "https://discord.gg/xChmhfQx4",
    image: assets.home.imgIcon5,
  },
];
export function IllustratedFooter() {
  return (
    <footer className="design-footer">
      <div className="design-footer-columns design-container">
        <div className="design-footer-brand">
          <Link href="/" aria-label="Cnvrted home">
            <Image
              src={assets.home.imgCnvrted}
              alt="Cnvrted"
              width={193}
              height={40}
            />
          </Link>
          <p>
            Cnvrted turns buying signals into the right conversations. Find your
            ideal customers, understand what changed, and reach out at the right
            time.
          </p>
          <div className="design-social">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("https") ? "_blank" : undefined}
                rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                aria-label={item.label}
              >
                <Image src={item.image} alt="" width={26} height={26} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="design-footer-legal design-container">
        <Link href="/" className="design-footer-signature">
          <Image
            src={assets.home.imgImageCnvrted}
            alt=""
            width={40}
            height={32}
          />
          <span>Cnvrted</span>
        </Link>
        <small>
          © {new Date().getFullYear()} Cnvrted. All rights reserved.
        </small>
      </div>
      <FooterSpotlight>
        <ScaledArtwork width={1440} height={465}>
          <Image
            src={assets.home.imgImage53}
            alt=""
            width={276}
            height={414}
            className="absolute max-w-none left-[23px] top-[0px] h-[414px] w-[276px]"
            sizes="276px"
          />
          <Image
            src={assets.home.imgImage51}
            alt=""
            width={1491}
            height={497}
            className="absolute max-w-none left-[-51px] top-[6px] h-[497px] w-[1491px]"
            sizes="100vw"
          />
          <Image
            src={assets.home.imgVector18}
            alt=""
            width={792}
            height={164}
            className="design-footer-wordmark absolute max-w-none left-[483px] top-[87px]"
          />
        </ScaledArtwork>
      </FooterSpotlight>
    </footer>
  );
}
