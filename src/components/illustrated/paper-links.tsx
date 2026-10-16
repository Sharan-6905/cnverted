import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./paper-links.css";

/** Visible, server-rendered next steps shared by the guides and team page. */
export function PaperLinks({ id, eyebrow, title, links }: {
  id: string;
  eyebrow: string;
  title: string;
  links: readonly { href: string; title: string; description: string }[];
}) {
  return (
    <nav className="paper-links" aria-labelledby={id}>
      <div className="paper-links-heading">
        <span className="marketing-eyebrow">{eyebrow}</span>
        <h2 id={id}>{title}</h2>
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <span><strong>{link.title}</strong><small>{link.description}</small></span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
