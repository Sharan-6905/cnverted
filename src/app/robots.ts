import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/og-preview"],
      },
    ],
    sitemap: "https://www.cnvrted.com/sitemap.xml",
  };
}
