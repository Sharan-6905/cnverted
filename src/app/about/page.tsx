import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "About Us — Cnvrted",
  description:
    "Meet the three founders behind Cnvrted — building the future of outbound from Bangalore.",
};

function NameLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-ink underline decoration-hairline underline-offset-2 smooth-transition hover:text-brand-teal hover:decoration-brand-teal"
    >
      {children}
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-grid-page absolute inset-0" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-blue-500/25 blur-[100px]" />
        <div className="absolute -left-24 top-[28rem] h-80 w-80 rounded-full bg-brand-teal/20 blur-[100px]" />
        <div className="absolute bottom-16 right-1/3 h-72 w-72 rounded-full bg-brand-lavender/20 blur-[110px]" />
      </div>

      <BreadcrumbSchema trail={[{ name: "About Us" }]} />
      <SiteHeader />

      <main className="flex-1">
        <Section className="py-10 sm:py-12 md:py-14">
          {/* Hero */}
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/60 bg-canvas/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal backdrop-blur-md">
              About us
            </span>
            <h1 className="mt-4 font-display text-display-md font-semibold text-ink">
              Three Bangalore boys{" "}
              <span className="text-accent">competing with the giants</span>.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              Cnvrted started the way most things do — not with a grand plan,
              but with three people who couldn&apos;t stop talking about the same
              problem.
            </p>
          </div>

          {/* Story */}
          <Card className="mx-auto mt-10 max-w-5xl border-white/60 bg-canvas/40 p-6 shadow-[0_10px_44px_-12px_rgba(20,16,8,0.18)] backdrop-blur-2xl sm:p-8 lg:p-12">
            <div className="space-y-5 text-base leading-[1.85] text-body lg:text-[17px]">
              <p>
                <NameLink href="https://www.linkedin.com/in/dhruvprad/">Dhruv</NameLink> met{" "}
                <NameLink href="https://www.linkedin.com/in/sharan-s-6278b3360/">Sharan</NameLink> through
                a mutual friend.{" "}
                <NameLink href="https://www.linkedin.com/in/sharan-s-6278b3360/">Sharan</NameLink>&apos;s
                best friend was{" "}
                <NameLink href="https://www.linkedin.com/in/kailas-krsna-s-a7855334a/">Kailas</NameLink>.
                What started as conversations turned into late nights, then a
                project, then another project, then dozens of conversations with
                salespeople, founders, and GTM teams who all said some version of
                the same thing:{" "}
                <span className="font-medium text-ink">
                  we&apos;re paying for the same list as everyone else, and it
                  stopped working.
                </span>
              </p>
              <p>That&apos;s when Cnvrted became the thing.</p>
              <p>
                <NameLink href="https://www.linkedin.com/in/kailas-krsna-s-a7855334a/">Kailas</NameLink> is
                the one who understands models and systems — the AI brain behind
                how Cnvrted reads the internet and decides what matters.{" "}
                <NameLink href="https://www.linkedin.com/in/sharan-s-6278b3360/">Sharan</NameLink> builds
                what you actually see and touch — the database, the interface,
                the product you log into.{" "}
                <NameLink href="https://www.linkedin.com/in/dhruvprad/">Dhruv</NameLink> is the one who
                talks to customers, shapes the story, and figures out how to get
                Cnvrted in front of the people who need it. But honestly, the
                lines blur. When something needs to ship, all three of them are
                on it — titles don&apos;t matter at 3 am in an Indiranagar
                office.
              </p>
              <p>
                Two of them are final-year engineering students at RV University
                and CMRIT. One is a 19-year-old who left Manipal because the
                thing he wanted to build wasn&apos;t going to wait for a degree.
                They build from each other&apos;s houses, from shared office
                spaces on overnight shifts, and from wherever they happen to
                be — because the work doesn&apos;t stop when the location
                changes.
              </p>
              <p>
                They&apos;re not pretending to have it all figured out.
                They&apos;re building in public, shipping fast, and talking to
                every salesperson who&apos;ll give them fifteen minutes. The
                conviction isn&apos;t that they have the answers — it&apos;s
                that nobody else is asking the right question:{" "}
                <span className="font-medium text-ink">
                  why is every sales team on earth still buying a list of names
                  when what they actually need is timing?
                </span>
              </p>
              <p className="font-medium text-ink">
                That&apos;s what Cnvrted is for. And these three are going to be
                the ones who prove it.
              </p>
            </div>
          </Card>

          {/* Map — where we built Cnvrted */}
          <div className="mx-auto mt-14 max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/60 bg-canvas/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal backdrop-blur-md">
              Where we build
            </span>
            <h2 className="mt-4 font-display text-display-sm font-semibold text-ink">
              Built across{" "}
              <span className="text-accent">Bengaluru</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-body">
              From late nights in Indiranagar to early mornings in
              Kammanahalli — this is where Cnvrted came to life.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src="/bengaluru-map.png"
                alt="Hand-drawn map of Bengaluru showing Indiranagar and Kammanahalli — the neighbourhoods where Cnvrted was built"
                width={1280}
                height={960}
                className="h-auto w-full"
                priority={false}
              />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
