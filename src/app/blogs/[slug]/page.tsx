import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RichText } from "@/components/rich-text";
import {
  BLOG_POSTS,
  getPostBySlug,
  formatPostDate,
  type Block,
} from "@/lib/blog-posts";

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
  if (!post) return { title: "Post not found — Cnvrted" };
  return {
    title: `${post.title} — Cnvrted`,
    description: post.excerpt,
  };
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
    <div className="relative flex min-h-screen flex-col">
      <div
        className="bg-grid-page pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <SiteHeader />
      <main className="flex-1">
        <article className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            <header className="mt-8">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-surface-card px-3 py-1 text-body-strong">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingMinutes} min read
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">{post.dek}</p>
              <p className="mt-6 border-t border-hairline pt-5 text-sm text-muted">
                {formatPostDate(post.date)} · The Cnvrted team
              </p>
            </header>

            <div className="mt-10 overflow-hidden rounded-3xl border border-hairline bg-surface-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="mt-10 space-y-6">
              {post.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            <div className="mt-16 border-t border-hairline pt-8">
              <Link
                href="/early-access"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 text-[15px] font-medium text-on-dark shadow-soft smooth-transition transition-[filter,transform] hover:brightness-105 active:scale-[0.98]"
              >
                Get on the early-access list
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="pt-6 font-display text-2xl font-semibold tracking-tight text-ink md:text-[28px]">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-[17px] leading-[1.75] text-body">
          <RichText text={block.text} />
        </p>
      );
    case "numbered":
      return (
        <ol className="space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-card text-sm font-semibold text-ink">
                {i + 1}
              </span>
              <p className="text-[17px] leading-[1.7] text-body">
                <strong className="font-semibold text-ink">{item.title}</strong>{" "}
                <RichText text={item.text} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "bullets":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-peach" />
              <p className="text-[17px] leading-[1.7] text-body">
                <RichText text={item} />
              </p>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <blockquote className="rounded-3xl border border-hairline bg-surface-soft px-7 py-6">
          <div className="space-y-1.5 font-display text-lg leading-relaxed text-body-strong">
            {block.lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </blockquote>
      );
    case "cta":
      return (
        <div className="rounded-3xl bg-surface-dark px-7 py-7 text-[17px] leading-[1.7] text-on-dark/85">
          <RichTextOnDark text={block.text} />
        </div>
      );
    default:
      return null;
  }
}

// The CTA block sits on a dark surface, so links need a lighter treatment.
function RichTextOnDark({ text }: { text: string }) {
  const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(text);
  if (!linkMatch) return <RichText text={text} />;
  const before = text.slice(0, linkMatch.index);
  const [, label, href] = linkMatch;
  const after = text.slice(linkMatch.index + linkMatch[0].length);
  return (
    <>
      {before}
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-on-dark underline decoration-brand-peach decoration-2 underline-offset-4 hover:decoration-brand-mint"
      >
        {label}
      </Link>
      {after}
    </>
  );
}
