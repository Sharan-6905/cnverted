import type { Metadata } from "next";

export const SITE_URL = "https://www.cnvrted.com";
export const SITE_TITLE = "Cnvrted AI | GTM Intelligence & Buying Signals";
export const SITE_DESCRIPTION =
  "Cnvrted AI helps B2B teams find buying signals, identify companies that fit their ICP, and plan relevant outreach. Explore the AI GTM platform or book a demo.";
export const DEFAULT_SOCIAL_IMAGE = {
  url: "/cnvrted-link-preview.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Cnvrted — Your ICP, found in real time.",
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

/** Keep search snippets, canonical URLs and social previews in sync per page. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE.url,
  imageAlt = image === DEFAULT_SOCIAL_IMAGE.url ? DEFAULT_SOCIAL_IMAGE.alt : title,
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const socialImage = {
    ...(image === DEFAULT_SOCIAL_IMAGE.url ? DEFAULT_SOCIAL_IMAGE : {}),
    url: absoluteUrl(image),
    alt: imageAlt,
  };

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
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
      ...(publishedTime && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@cnvrted",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
