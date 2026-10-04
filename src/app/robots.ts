import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Let crawlers read the preview route's noindex directive.
      },
    ],
    sitemap: "https://www.cnvrted.com/sitemap.xml",
  };
}
