import type { Metadata } from "next";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Link preview — Cnvrted",
  robots: { index: false, follow: false },
};

/** Preview the same artwork served to social sharing crawlers. */
export default function OgPreviewPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#fff5e6]">
      {/* Serve the original asset, just as social sharing crawlers receive it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DEFAULT_SOCIAL_IMAGE.url}
        alt={DEFAULT_SOCIAL_IMAGE.alt}
        width={DEFAULT_SOCIAL_IMAGE.width}
        height={DEFAULT_SOCIAL_IMAGE.height}
        className="h-auto w-full max-w-[1200px]"
      />
    </main>
  );
}
