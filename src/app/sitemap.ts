import type { MetadataRoute } from "next";
import { BLOG_POSTS as blogPosts } from "@/lib/blog-posts";
import { CAREER_ROLES } from "@/lib/careers";
import { CASE_STUDIES } from "@/lib/case-studies";

import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Only use lastModified where an actual editorial revision date is recorded.
// Build time and original publication dates are not modification timestamps.

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    ...(post.updated ? { lastModified: post.updated } : {}),
    images: [absoluteUrl(post.cover)],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: "2026-10-05",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: "2026-10-04",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/book-demo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs,
    { url: `${SITE_URL}/customers`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/learn`, lastModified: "2026-10-04", changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/learn/buying-signals`, lastModified: "2026-10-04", changeFrequency: "monthly", priority: 0.7 },
    ...CASE_STUDIES.map((story) => ({
      url: `${SITE_URL}/case-studies/${story.slug}`,
      images: [absoluteUrl(story.cover.src)],
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/help-center`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/join-slack`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${SITE_URL}/careers`, changeFrequency: "weekly", priority: 0.7 },
    ...CAREER_ROLES.map((role) => ({
      url: `${SITE_URL}/careers/${role.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/early-access`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
