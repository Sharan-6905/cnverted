import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog-posts";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero } from "@/components/illustrated/hero";
import { assets } from "@/components/illustrated/assets";

export const metadata: Metadata = {
  title: "Blog — Cnvrted",
  description:
    "Insights on outbound, buying intent, and go-to-market from the Cnvrted team.",
  alternates: { canonical: "/blogs" },
};
export default function BlogsPage() {
  return (
    <IllustratedShell className="design-blog-page">
      <BreadcrumbSchema trail={[{ name: "Blog" }]} />
      <IllustratedHero
        kind="blogs"
        title="Cnvrted Blogs"
        description="Stay updated with all the latest news articles and founder’s notes from social media."
      />
      <section
        className="design-blog-list design-container"
        aria-labelledby="blogs-title"
      >
        <div className="design-section-heading">
          <h2 id="blogs-title">Read Blogs</h2>
          <p>Read how Cnvrted helps businesses grow</p>
        </div>
        <div className="design-blog-cards">
          {BLOG_POSTS.map((post) => (
            <Link
              className="design-blog-card"
              href={`/blogs/${post.slug}`}
              key={post.slug}
            >
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="design-blog-card-author">By {post.author.name}</div>
              <div className="design-blog-card-meta">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span>
                  <Image
                    src={assets.blogListing.imgIcon5}
                    alt=""
                    width={12}
                    height={12}
                  />
                  {post.readingMinutes} min
                </span>
                <span>
                  Read
                  <Image
                    src={assets.blogListing.imgIcon6}
                    alt=""
                    width={14}
                    height={14}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </IllustratedShell>
  );
}
