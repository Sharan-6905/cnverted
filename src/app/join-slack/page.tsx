import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedShell } from "@/components/illustrated/shell";
import { SupportArtwork } from "@/components/illustrated/support-artwork";
import { CommunityForm } from "@/components/illustrated/community-form";
import "@/components/illustrated/community.css";

export const metadata: Metadata = {
  title: "Join our Slack community — Cnvrted",
  description: "Connect with the Cnvrted community on Slack. Tell us a little about yourself to get started.",
};

export default function JoinSlackPage() {
  return (
    <IllustratedShell className="design-community-page">
      <BreadcrumbSchema trail={[{ name: "Join Slack" }]} />
      <div className="community-content">
        <SupportArtwork variant="slack" />
        <header className="community-heading">
          <h1>Cnvrted at Slack</h1>
          <p>Before joining our Slack community, we’d like to ask a few questions.</p>
        </header>
        <CommunityForm />
      </div>
    </IllustratedShell>
  );
}
