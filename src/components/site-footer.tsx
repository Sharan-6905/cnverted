import Link from "next/link";
import { Logo } from "@/components/logo";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Finding leads", href: "/#product" },
      { label: "Web scraping", href: "/#product" },
      { label: "Dashboard", href: "/#product" },
      { label: "CoPilot", href: "/#product" },
      { label: "Deal intelligence", href: "/#product" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Sales Development Reps", href: "/#teams" },
      { label: "Account Executives", href: "/#teams" },
      { label: "RevOps", href: "/#teams" },
      { label: "GTM Leaders", href: "/#teams" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Us", href: "/about" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-on-dark/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-on-dark">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-dark/60 smooth-transition transition-colors hover:text-on-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-on-dark/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-tight text-on-dark">Cnvrted</span>
          </div>

          <nav className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-on-dark/60 smooth-transition transition-colors hover:text-on-dark"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-on-dark/50">
            © {new Date().getFullYear()} Cnvrted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
