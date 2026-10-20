import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IllustratedLegalPage } from "@/components/illustrated/legal-page";
import { Clause, Bullets, Mail } from "@/components/legal";

export const metadata: Metadata = pageMetadata({
  title: "Cnvrted Data Deletion Instructions",
  description: "Request deletion of your Cnvrted account or connected WhatsApp data. Learn how verification, disconnection and retention work.",
  path: "/data-deletion",
});

export default function DataDeletionPage() {
  return (
    <IllustratedLegalPage variant="privacy" title="Data deletion"
      lastUpdated="20 October 2026"
      description="How to request deletion of your account or connected-service data."
      intro={<p>Cnvrted Pvt Ltd handles deletion requests through our support team.
        You do not need to use Facebook Login or find a delete-account button to request deletion.</p>}>
      <Clause n={1} title="Send your request">
        <p>Email <Mail address="work@cnvrted.com" /> with the subject
          {" "}<strong>Cnvrted data deletion request</strong>, preferably from the email
          address registered to your Cnvrted account.</p>
        <Bullets items={[
          "Include your registered account email and say whether you want your entire account deleted or only data from a connected service.",
          "For WhatsApp data, include the linked phone number with country code and request WhatsApp data deletion. If you messaged us without linking an account, include that phone number instead.",
          "If you cannot access the registered email, tell us so we can arrange another way to verify your authority.",
        ]} />
        <p>Do not send passwords, access tokens, Aadhaar, PAN or other identity documents
          with the initial request. We ask only for information needed to verify ownership.</p>
      </Clause>
      <Clause n={2} title="Choose what to delete">
        <p><strong>WhatsApp only:</strong> we disconnect the number and remove associated
          connection records, link challenges, stored message and reply records, delivery
          records and action approvals held by Cnvrted. Your Cnvrted account, profiles and
          leads remain unless you also request their deletion.</p>
        <p><strong>Entire Cnvrted account:</strong> we verify the account and your authority,
          stop its activity and review its associated profiles, customer content, uploaded
          files and connected-service data for deletion. We explain any shared organisation
          records or retention exceptions before confirming completion.</p>
        <p><strong>Business information removal:</strong> if your details appear in our
          intelligence database without a user account, include the business email or
          profile URL that identifies the record you want removed.</p>
      </Clause>
      <Clause n={3} title="Disconnecting is different from deleting">
        <p>Send STOP to our WhatsApp business number to disconnect a linked account,
          or ask our team to disconnect it. This stops account-linked commands; it
          does not erase stored history. Use the email request above to delete that data.</p>
        <p>Deleting a conversation on your phone does not delete Cnvrted&apos;s records.
          We cannot delete copies held independently by Meta/WhatsApp or on someone
          else&apos;s device. Their privacy controls and policies apply to those copies.</p>
      </Clause>
      <Clause n={4} title="Timing and confirmation">
        <p>We respond within 30 days, verify the request and confirm what has been deleted.
          If we need more information, or a lawful extension applies, we explain what is
          needed and the expected timing. You can follow up in the same email thread.</p>
        <p>We may retain records required for legal, tax, fraud-prevention or dispute purposes,
          and a minimal record of the request. Backups and security logs may retain copies
          until their retention period ends; deletion from active records does not mean
          every backup copy is immediately erased. We explain applicable exceptions in
          our response and do not use retained copies to resume the deleted integration.</p>
        <p>See our <a href="/privacy">Privacy Policy</a> for retention and your rights,
          and our <a href="/terms">Terms &amp; Conditions</a> for account closure.</p>
      </Clause>
    </IllustratedLegalPage>
  );
}
