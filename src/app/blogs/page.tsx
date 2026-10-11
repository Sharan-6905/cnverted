import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog-posts";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { IllustratedHero } from "@/components/illustrated/hero";
import { assets } from "@/components/illustrated/assets";

export const metadata: Metadata = pageMetadata({
  title: "B2B Prospecting Blog | GTM Plays & Tool Comparisons",
  description: "Explore B2B prospecting articles from Cnvrted: compare Apollo and Cnvrted, and learn how to turn buying signals into an actionable GTM play.",
  path: "/blogs",
});
export default function BlogsPage() {
  return (
    <IllustratedShell faqItems={[]} className="design-blog-page">
      <PageSchema path="/blogs" metadata={metadata} type="CollectionPage" items={BLOG_POSTS.map(post => ({ name: post.title, path: `/blogs/${post.slug}` }))} />
      <BreadcrumbSchema trail={[{ name: "Blog" }]} />
      <IllustratedHero
        kind="blogs"
        title="Prospecting notes"
        description="B2B prospecting perspectives, tool comparisons, and GTM plays, written by Dhruv Pradeep."
      />
      <section
        className="design-blog-list design-container"
        aria-labelledby="blogs-title"
      >
        <div className="design-section-heading">
          <h2 id="blogs-title">Ideas for your next GTM play</h2>
          <p>Compare approaches and turn research into a focused next step.</p>
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
