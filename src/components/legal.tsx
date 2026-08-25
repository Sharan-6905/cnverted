import * as React from "react";

/** Numbered clause used by the privacy policy and terms pages. */
export function Clause({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={`s${n}`}>
      <h2 className="font-display text-xl font-semibold text-ink">
        <span className="mr-2 font-mono text-sm font-normal text-muted-soft">{n}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i} className="list-disc marker:text-muted-soft">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-ink underline underline-offset-2 hover:text-[#2C456F]"
    >
      {address}
    </a>
  );
}

/** Capitalised blocks — conspicuousness convention for disclaimers and liability caps. */
export function Caps({ children }: { children: React.ReactNode }) {
  return <p className="text-[13.5px] uppercase leading-relaxed text-muted">{children}</p>;
}
