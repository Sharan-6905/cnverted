import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IllustratedShell } from "@/components/illustrated/shell";
import { SupportArtwork } from "@/components/illustrated/support-artwork";
import "@/components/illustrated/article.css";
import { RichText } from "@/components/rich-text";
import { LinkedInIcon, XIcon } from "@/components/social-icons";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import {
  BLOG_POSTS,
  getPostBySlug,
  formatPostDate,
  type Block,
} from "@/lib/blog-posts";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return {
    title: `${post.title} — Cnvrted`,
    description: post.excerpt,
    authors: [{ name: post.author.name, url: post.author.linkedin }],
    alternates: { canonical: `https://www.cnvrted.com/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://www.cnvrted.com/blogs/${post.slug}`,
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [post.author.name],
      images: [{ url: post.cover, width: 1023, height: 437, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

async function ArticleSchema({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blogs/${post.slug}#article`,
    inLanguage: "en",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.cnvrted.com${post.cover}`,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.linkedin,
      sameAs: [post.author.linkedin, post.author.x],
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
      "@type": "Organization",
      name: "Cnvrted",
      logo: { "@type": "ImageObject", url: "https://www.cnvrted.com/cnvrted-logo.png" },
    },
    mainEntityOfPage: `https://www.cnvrted.com/blogs/${post.slug}`,
  };
  return <JsonLd data={schema} />;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <IllustratedShell faqItems={[]} className="design-article-page">
      <ArticleSchema post={post} />
      <BreadcrumbSchema
        trail={[{ name: "Blog", path: "/blogs" }, { name: post.title }]}
      />
      <div className="design-article-scene">
        <SupportArtwork variant="article" />
        <article className="design-article design-container" aria-labelledby="article-title">
          <header className="design-article-heading">
            <Link href="/blogs" className="design-article-back" aria-label="Back to all blogs">
              <Image src="/figma/blogs/back-arrow.svg" alt="" width={32} height={32} unoptimized />
            </Link>
            <h1 id="article-title" className={post.category === "Comparison" ? "design-article-title-short" : undefined}>
              {post.title}
            </h1>
            <p className="design-article-dek">{post.dek}</p>
            <div className="design-article-tags">
              <span>{post.category}</span>
              <span>{post.readingMinutes} min read</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              {post.updated && <time dateTime={post.updated}>Updated {formatPostDate(post.updated)}</time>}
            </div>
            <div className="design-article-byline">
              <p>Written by <strong>{post.author.name}</strong></p>
              <div className="design-article-author-links">
                <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${post.author.name} on LinkedIn (opens in a new tab)`}>
                  <LinkedInIcon width={22} height={22} />
                </a>
                <a href={post.author.x} target="_blank" rel="noopener noreferrer" aria-label={`${post.author.name} on X (opens in a new tab)`}>
                  <XIcon width={19} height={19} />
                </a>
              </div>
            </div>
          </header>
          <div className="design-article-content">
            <Image
              className="design-article-cover"
              src={post.cover}
              alt={post.category === "Comparison" ? "Cnvrted’s illustrated windmill and buying signals alongside Apollo." : "Cnvrted go-to-market strategy canvas, with connected strategy and launch nodes."}
              width={1023}
              height={437}
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1206px) calc(100vw - 120px), 1023px"
              loading="eager"
            />
            <div className="design-article-prose">
              {post.body.map((block, i) => <BlockRenderer key={i} block={block} />)}
              <aside aria-label="Related reading">
                <h2>Keep exploring</h2>
                <p><Link href="/learn/buying-signals">Buying signals: examples and a qualification checklist</Link></p>
                <p><Link href="/case-studies/from-cold-emails-to-warm-conversations">See one signal-led outreach campaign and its results</Link></p>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </IllustratedShell>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p><RichText text={block.text} /></p>;
    case "numbered":
      return (
        <ol className="design-article-numbered">
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="design-article-number" aria-hidden="true">{i + 1}</span>
              <p><strong>{item.title}</strong>{" "}<RichText text={item.text} /></p>
            </li>
          ))}
        </ol>
      );
    case "bullets":
      return (
        <ul className="design-article-bullets">
          {block.items.map((item, i) => <li key={i}><RichText text={item} /></li>)}
        </ul>
      );
    case "callout":
      return <blockquote>{block.lines.map((line, i) => <p key={i}>{line}</p>)}</blockquote>;
    case "cta":
      return <p className="design-article-closing"><RichText text={block.text} /></p>;
  }
}
