import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog-posts";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Cnvrted",
  description:
    "Insights on outbound, buying intent, and go-to-market from the Cnvrted team.",
};

export default function BlogsPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Ambient colour + grid behind the frosted-glass cards */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-grid-page absolute inset-0" />
        <div className="absolute -left-20 top-52 h-80 w-80 rounded-full bg-brand-teal/40 blur-[100px]" />
        <div className="absolute right-[-5rem] top-72 h-96 w-96 rounded-full bg-[#1B3A63]/40 blur-[110px]" />
        <div className="absolute bottom-16 left-[38%] h-96 w-96 rounded-full bg-[#BEF264]/35 blur-[110px]" />
        <div className="absolute bottom-40 left-[-4rem] h-72 w-72 rounded-full bg-[#7FD1B5]/35 blur-[110px]" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-400/30 blur-[100px]" />
      </div>
      <BreadcrumbSchema trail={[{ name: "Blog" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Blog"
          title="Insights on outbound, intent, and GTM."
          description="Buying signals, pipeline strategy, and the plays that turn one into the other."
        >
          <div
            className={cn(
              "grid gap-6 sm:grid-cols-2",
              // Fill rows neatly: keep it 2-up (centred) until there are enough
              // posts to justify a third column.
              BLOG_POSTS.length >= 3
                ? "lg:grid-cols-3"
                : "mx-auto max-w-4xl"
            )}
          >
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-canvas/40 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.22)] backdrop-blur-2xl smooth-transition transition-[border-color,box-shadow,transform] hover:-translate-y-1 hover:border-white/90 hover:bg-canvas/55 hover:shadow-float"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    <span>{post.category}</span>
                    {i === 0 && (
                      <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-brand-teal">
                        Latest
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-white/50 pt-4 text-xs text-muted">
                    <span>{formatPostDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingMinutes} min
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 font-medium text-ink">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5 smooth-transition transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
