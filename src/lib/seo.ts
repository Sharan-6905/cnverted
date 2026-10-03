import type { Metadata } from "next";

export const SITE_URL = "https://www.cnvrted.com";
export const SITE_TITLE = "Cnvrted | Buying Signals & AI Sales Prospecting";
export const SITE_DESCRIPTION =
  "Find B2B buyers showing intent. Cnvrted matches public buying signals to your ideal customer profile and helps your team reach out with context. Start free.";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

/** Keep search snippets, canonical URLs and social previews in sync per page. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/og-cover.png",
  imageAlt = title,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: publishedTime ? "article" : "website",
      siteName: "Cnvrted",
      locale: "en_US",
      url: absoluteUrl(path),
      title,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@cnvrted",
      title,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt }],
    },
  };
}
