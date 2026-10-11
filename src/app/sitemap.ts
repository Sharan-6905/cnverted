import type { MetadataRoute } from "next";
import { BLOG_POSTS as blogPosts } from "@/lib/blog-posts";
import { CAREER_ROLES } from "@/lib/careers";
import { CASE_STUDIES } from "@/lib/case-studies";

import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Only use lastModified where an actual content, metadata, or structured-data
// revision is recorded. Article dates separately describe editorial revisions.
// Build time and original publication dates are not modification timestamps.

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: "2026-10-11",
    images: [absoluteUrl(post.cover)],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: "2026-10-11",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/product`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/book-demo`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`, lastModified: "2026-10-11",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs,
    { url: `${SITE_URL}/customers`, lastModified: "2026-10-11", changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/case-studies`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/learn`, lastModified: "2026-10-11", changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/learn/go-to-market-strategy`, lastModified: "2026-10-06", changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/learn/ideal-customer-profile`, lastModified: "2026-10-06", changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/learn/buying-signals`, lastModified: "2026-10-06", changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/learn/signal-to-outreach`, lastModified: "2026-10-11", changeFrequency: "monthly", priority: 0.7 },
    ...CASE_STUDIES.map((story) => ({
      url: `${SITE_URL}/case-studies/${story.slug}`,
      lastModified: "2026-10-11",
      images: [absoluteUrl(story.cover.src)],
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/help-center`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/join-slack`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${SITE_URL}/careers`, lastModified: "2026-10-11", changeFrequency: "weekly", priority: 0.7 },
    ...CAREER_ROLES.map((role) => ({
      url: `${SITE_URL}/careers/${role.slug}`,
      lastModified: "2026-10-11",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/contact`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/early-access`, lastModified: "2026-10-11",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`, lastModified: "2026-10-11",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`, lastModified: "2026-10-11",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
