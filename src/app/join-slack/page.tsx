import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import type { FAQItem } from "@/components/illustrated/faq";
import { SupportArtwork } from "@/components/illustrated/support-artwork";
import { CommunityForm } from "@/components/illustrated/community-form";
import "@/components/illustrated/community.css";

export const metadata: Metadata = pageMetadata({
  title: "Join our Slack community — Cnvrted",
  description: "Connect with the Cnvrted community on Slack. Tell us a little about yourself to get started.",
  path: "/join-slack",
});

const communityFaqs: readonly FAQItem[] = [
  {
    question: "Who is the Cnvrted Slack community for?",
    answer: "Founders, sales and marketing teams, and anyone building their go-to-market. Join to exchange ideas, ask questions, and learn from others working on growth.",
  },
  {
    question: "What can I discuss in the community?",
    answer: "Buying signals, ideal customers, outreach, and GTM experiments. Share what you’re learning, get another perspective on a challenge, or give feedback on Cnvrted.",
  },
  {
    question: "How do I join the Slack community?",
    answer: "Complete the five short questions above. Once your answers are sent, click “Join Slack” on the confirmation screen. The invitation opens in a new tab, where you’ll finish joining.",
  },
  {
    question: "Why do you ask for my details?",
    answer: (
      <>
        Your answers introduce you and your work to the Cnvrted team. They’re sent
        to our team when you submit the form. Read our{" "}
        <Link href="/privacy">Privacy Policy</Link> for how we handle your information.
      </>
    ),
  },
  {
    question: "Can I join without a company website?",
    answer: "Yes. The website field is optional, so you can leave it blank. If you work independently, enter “Independent” for your business name and tell us your industry or field.",
  },
  {
    question: "What if I have trouble joining?",
    answer: (
      <>
        Check any highlighted fields and try again. If the form or Slack
        invitation still isn’t working, email{" "}
        <a href="mailto:work@cnvrted.com">work@cnvrted.com</a> and tell us where you got stuck.
      </>
    ),
  },
];

export default function JoinSlackPage() {
  return (
    <IllustratedShell className="design-community-page" faqItems={communityFaqs}>
      <BreadcrumbSchema trail={[{ name: "Join Slack" }]} />
      <div className="community-content">
        <SupportArtwork variant="slack" />
        <header className="community-heading">
          <h1>Join the Cnvrted community</h1>
          <p>Before joining our Slack community, we’d like to ask a few questions.</p>
        </header>
        <CommunityForm />
      </div>
    </IllustratedShell>
  );
}
