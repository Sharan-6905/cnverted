import { Logo } from "@/components/logo";

const LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-tight">Cnvrted</span>
        </div>

        <nav className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted smooth-transition transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Cnvrted. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
