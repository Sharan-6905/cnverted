import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Cnvrted",
  description:
    "Insights on outbound, buying intent, and go-to-market from the Cnvrted team.",
};

export default function BlogsPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="bg-grid-page pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Blog"
          title="Insights on outbound, intent, and GTM."
          description="Buying signals, pipeline strategy, and the plays that turn one into the other."
        >
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-hairline bg-surface-soft smooth-transition transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-muted-soft/50 hover:shadow-float md:grid-cols-[minmax(0,0.9fr)_1fr]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.cover}
                alt={featured.title}
                className="aspect-[16/10] w-full border-b border-hairline bg-surface-dark object-cover md:h-full md:border-b-0 md:border-r"
              />
              <div className="flex flex-col justify-center p-7 md:p-9">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <span className="rounded-full bg-canvas px-3 py-1 text-body-strong">
                    {featured.category}
                  </span>
                  <span className="text-muted-soft">Latest</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-ink md:text-[28px]">
                  {featured.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted">
                  <span>{formatPostDate(featured.date)}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readingMinutes} min read
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-medium text-ink">
                    Read post
                    <ArrowUpRight className="h-4 w-4 smooth-transition transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-hairline bg-canvas smooth-transition transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-muted-soft/50 hover:shadow-soft"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="aspect-[16/9] w-full border-b border-hairline bg-surface-dark object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {post.category}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                      <span>{formatPostDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingMinutes} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
