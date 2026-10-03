import type { MetadataRoute } from "next";
import { BLOG_POSTS as blogPosts } from "@/lib/blog-posts";
import { CAREER_ROLES } from "@/lib/careers";
import { CASE_STUDIES } from "@/lib/case-studies";

import { SITE_URL } from "@/lib/seo";

// Omit lastModified until actual editorial modification dates are tracked.
// Build time and original publication dates are not modification timestamps.

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.9,
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
    { url: `${SITE_URL}/learn`, changeFrequency: "monthly", priority: 0.6 },
    ...CASE_STUDIES.map((story) => ({
      url: `${SITE_URL}/case-studies/${story.slug}`,
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
