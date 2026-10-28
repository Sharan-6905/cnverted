import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageSchema } from "@/components/page-schema";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { IllustratedLegalPage } from "@/components/illustrated/legal-page";
import { Clause, Mail } from "@/components/legal";

export const metadata: Metadata = pageMetadata({title:"Cnvrted Refund & Cancellation Policy",description:"Non-refundable subscriptions and credit top-ups, cancellation, billing queries and payment support.",path:"/refund-policy"});
export default function RefundPolicyPage() {
  return <IllustratedLegalPage variant="terms" title="Refund & Cancellation Policy" lastUpdated="28 October 2026" description="For Starter, Pro and credit top-ups." intro={<p>This policy applies to purchases from Cnvrted Pvt Ltd on cnvrted.com and beta.cnvrted.com. Read it with our <a href="/terms">Terms &amp; Conditions</a>.</p>}>
    <PageSchema path="/refund-policy" metadata={metadata} type="WebPage" />
    <BreadcrumbSchema trail={[{name:"Refund & Cancellation Policy"}]} />
    <Clause n={1} title="Non-refundable purchases"><p>Starter and Pro subscription payments and all credit top-ups are non-refundable, including unused credits, partial billing periods and change-of-mind purchases, except where a refund is required by applicable law. Cancelling a subscription or deleting an account does not automatically refund a payment.</p></Clause>
    <Clause n={2} title="Cancel future renewals"><p>For USD subscriptions, open Plans &amp; credits in the app to cancel future renewals, or email <Mail address="info@cnvrted.com" /> for assistance. Wait for confirmation that the payment provider has cancelled the subscription. Credits already granted retain their existing expiry. Indian monthly purchases require your approval each month; you can stop by not approving another purchase. Top-ups are one-time purchases and do not renew.</p></Clause>
    <Clause n={3} title="Credit validity and scan credits"><p>Introductory credits are valid for 14 days. Monthly plan credits expire 30 days after the paid billing period ends. Top-ups expire three calendar months after purchase. If a scan delivers zero new leads, its held credits are returned to your balance; this is a credit adjustment, not a cash refund.</p></Clause>
    <Clause n={4} title="Billing errors and queries"><p>For a duplicate charge, an incorrect charge, missing credits or any billing question, email <Mail address="info@cnvrted.com" /> with your account email, payment reference, payment date and a description of the issue. We will investigate against the provider's payment records. Do not send full card numbers, CVVs, bank passwords or one-time passwords. If a refund is required, it will be handled through the payment provider; processing time depends on the provider and your bank.</p></Clause>
  </IllustratedLegalPage>;
}
