import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Cnvrted",
  description: "That page could not be found.",
};

/**
 * Full-bleed 404. The artwork carries the page, so there is no header or footer
 * here — just the image, and one way back. Colours are sampled from the plate so
 * the letterboxed edges disappear into it at any aspect ratio.
 */
export default function NotFound() {
  return (
    <main className="fixed inset-0 overflow-hidden bg-[#00071b]">
      <Image
        src="/404-crt.png"
        alt="A CRT monitor with a cracked screen displaying a glitching 404, beside a floppy disk labelled 404.SYS NOT FOUND and a can of ORKA."
        fill
        priority
        sizes="100vw"
        // The plate is 5:4. Cover it while the viewport is wider than that; any
        // narrower and cropping starts eating the 404 itself, so contain instead
        // and let the matching ground fill the rest.
        className="object-center object-cover [@media(max-aspect-ratio:5/4)]:object-contain"
      />

      {/* keeps the link legible where the plate is brightest */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#00071b] to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 px-6 text-center sm:bottom-14">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4e84a]/70">
          Signal lost
        </p>
        <Link
          href="/"
          className="rounded-full border border-[#d4e84a]/40 px-6 py-2.5 font-mono text-sm text-[#d4e84a] transition-colors duration-200 hover:bg-[#d4e84a]/10 hover:text-[#e8f77a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4e84a]/60"
        >
          Back to cnvrted.com
        </Link>
      </div>
    </main>
  );
}
