import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { Clause, Bullets, Mail, Caps } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Cnvrted",
  description: "The terms that govern your use of the Cnvrted platform.",
};

const LAST_UPDATED = "26 August 2026";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbSchema trail={[{ name: "Terms" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Legal"
          title="Terms of Service"
          description={`Last updated: ${LAST_UPDATED}. These terms govern your access to and use of Cnvrted.`}
        >
          <div className="max-w-2xl space-y-10 text-[15px] leading-relaxed text-body">
            <p>
              These Terms are between you and Cnvrted Pvt Ltd, a company incorporated in India
              with its registered office at #41, VJ Infinity, 2nd Cross, Doctors Layout, B.
              Channasandra, Bengaluru, Karnataka 560043 (&ldquo;Cnvrted&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;). They cover cnvrted.com, beta.cnvrted.com and
              our APIs (together, the &ldquo;Platform&rdquo;). Using the Platform means you
              accept them. If you are acting for an organisation, you confirm you can bind it.
            </p>

            <Clause n={1} title="What Cnvrted does">
              <p>
                Cnvrted is a B2B sales intelligence platform. It collects publicly available
                business information, detects buying-intent signals, scores and ranks accounts
                against a profile you configure, and helps your team act on them. Depending on
                your plan that includes the signal feed, ICP configuration, lead and pipeline
                management, our AI assistant (ORKA), outreach sent from a Google account you
                connect, and export to Notion.
              </p>
              <p>
                Features vary by plan, and we describe integrations in Section 10. Anything
                marked beta, preview or experimental may change or be withdrawn at any time.
              </p>
            </Clause>

            <Clause n={2} title="Who can use it">
              <p>The Platform is for businesses and professionals. By using it you confirm:</p>
              <Bullets
                items={[
                  "you are at least 18 years old;",
                  "you are using it for legitimate business purposes;",
                  "you can legally enter into these Terms; and",
                  "no applicable law bars you from using it.",
                ]}
              />
              <p>It is not for personal, consumer or non-commercial use.</p>
            </Clause>

            <Clause n={3} title="Your account">
              <p>
                Give us accurate information when you register, and keep it current. You are
                responsible for your credentials and for everything done under your account.
                Tell us at <Mail address="info@cnvrted.com" /> straight away if you think
                someone else has got in. We may suspend accounts registered with false
                information.
              </p>
            </Clause>

            <Clause n={4} title="Plans, payment and refunds">
              <p>
                Plans and current prices are at{" "}
                <a href="/pricing" className="text-ink underline underline-offset-2">
                  cnvrted.com/pricing
                </a>
                . Prices are quoted in US Dollars. Spark is a one-off charge for four days of
                access; Surge is billed monthly in advance; Dominion is priced by agreement.
                Plans are currently arranged with our team rather than through self-service
                checkout, and payment terms are confirmed to you in writing before your first
                invoice.
              </p>
              <p>
                We may change plans and pricing, and will give existing subscribers reasonable
                notice before a change affects them. Where we offer a trial, its length and
                price are set out at the time and it is non-refundable.
              </p>
              <p>
                <strong className="font-semibold text-ink">Refunds.</strong> Spark is
                non-refundable once access starts. Surge is not refunded for a partial month. For
                longer commitments we may refund the unused portion at our discretion, less any
                discount you received for committing.
              </p>
              <p>
                All fees exclude taxes. You are responsible for GST, VAT, sales tax or any other
                tax your jurisdiction imposes.
              </p>
            </Clause>

            <Clause n={5} title="Acceptable use">
              <p>You agree not to:</p>
              <Bullets
                items={[
                  "use data from the Platform for spam, harassment, stalking, or any communication that breaks the law where you or the recipient are — including the DPDP Act, GDPR, CAN-SPAM and equivalent rules;",
                  "use the Platform for business-to-consumer outreach, or to contact people in a personal rather than professional capacity;",
                  "resell, sublicense, redistribute or otherwise commercially exploit data from the Platform without our written consent;",
                  "reverse-engineer, decompile or try to derive our source code, models or algorithms;",
                  "scrape or use automated tools against the Platform itself;",
                  "use the Platform to build a competing product;",
                  "work around usage limits, rate limits or access controls;",
                  "upload or transmit malware or harmful code;",
                  "impersonate anyone, or misrepresent who you are affiliated with;",
                  "do anything that damages, disables or overloads our systems; or",
                  "break any applicable law or regulation.",
                ]}
              />
            </Clause>

            <Clause n={6} title="Outreach and your connected mailbox">
              <p>
                If you connect a Google account, Cnvrted sends the emails you compose and approve
                from your own mailbox, and reads replies to those emails so they appear against
                the right conversation. We do not send anything on our own initiative.
              </p>
              <p>
                Everything sent from your account is your message, sent by you. You are
                responsible for its content, for having a lawful basis to contact the recipient,
                for honouring opt-outs and unsubscribe requests, and for complying with the
                anti-spam and electronic communication laws that apply to you and to the people
                you contact. You can disconnect at any time from your settings or from your
                Google Account permissions.
              </p>
              <p>
                Our use of data from Google APIs follows the Google API Services User Data
                Policy, including its Limited Use requirements. See our{" "}
                <a href="/privacy" className="text-ink underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                for the detail.
              </p>
            </Clause>

            <Clause n={7} title="AI features">
              <p>
                ORKA and our scoring pipeline generate suggestions: scores, summaries, research
                and draft outreach copy. They are decision support, not decisions. AI output can
                be wrong, out of date, or confidently mistaken about a company, and you should
                read and edit anything before you rely on it or send it.
              </p>
              <p>
                You are responsible for what you do with that output. Do not use the Platform to
                make decisions that produce legal or similarly significant effects on individuals
                — employment, credit, housing, insurance, education or access to essential
                services. That is a breach of these Terms.
              </p>
            </Clause>

            <Clause n={8} title="Data">
              <p>
                <strong className="font-semibold text-ink">Where our data comes from.</strong>{" "}
                Our intelligence database is built from publicly accessible sources and from
                licensed research providers. We do not break into private or password-protected
                sources to build it. The one exception is data you deliberately connect — a
                Google account, for instance — which we access only with your authorisation and
                only for the features you have switched on.
              </p>
              <p>
                <strong className="font-semibold text-ink">Accuracy.</strong> Public information
                goes stale, and inference is imperfect. We do not warrant that data on the
                Platform is accurate, complete or current, and it is provided as-is.
              </p>
              <p>
                <strong className="font-semibold text-ink">Your responsibility.</strong> Verify
                data before acting on it. Ensure your use of it complies with the data protection
                law that applies to you, obtain any consent you need before contacting someone,
                and handle removal requests you receive directly.
              </p>
              <p>
                <strong className="font-semibold text-ink">Your data stays yours.</strong>{" "}
                Anything you put into the Platform — lists, notes, pipeline records, ICP
                configuration, uploads — remains yours. We use it to provide the Platform, and we
                do not sell it or share it with other customers. We may use aggregated,
                de-identified data about Platform usage to improve our products; it will not
                identify you or your organisation.
              </p>
              <p>
                Our handling of personal information is governed by our{" "}
                <a href="/privacy" className="text-ink underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </Clause>

            <Clause n={9} title="Intellectual property">
              <p>
                The Platform — its code, models, AI agents including ORKA, interface, design,
                branding and documentation — belongs to Cnvrted. You get a limited,
                non-exclusive, non-transferable, revocable licence to use it for your own
                business purposes under these Terms.
              </p>
              <p>
                You keep ownership of what you upload or create in the Platform, and grant us a
                limited licence to use it solely to provide the Platform to you. If you send us
                feedback or ideas, we may use them freely and without obligation to you.
              </p>
            </Clause>

            <Clause n={10} title="Third-party services">
              <p>
                The Platform works with third-party services — currently Google (Gmail, if you
                connect it) and Notion (export) — and relies on providers including Anthropic,
                OpenAI, Apollo, Serper, Exa, Supabase and Resend. Your use of a third-party
                service is governed by that provider&rsquo;s own terms, and we are not
                responsible for their availability, accuracy or practices.
              </p>
            </Clause>

            <Clause n={11} title="Availability and changes">
              <p>
                We aim for reasonable uptime but do not promise uninterrupted or error-free
                service. Maintenance, updates and outages happen, and we will try to give notice
                of planned downtime. We may modify or discontinue parts of the Platform;
                material changes to functionality or pricing come with reasonable notice to
                active subscribers.
              </p>
            </Clause>

            <Clause n={12} title="Termination">
              <p>
                You can cancel at any time by contacting us at <Mail address="work@cnvrted.com" />
                . Cancellation takes effect at the end of your current billing period.
              </p>
              <p>
                We may suspend or end your access if you breach these Terms, if your use harms
                the Platform or other people, if your account sits unused for a long period, or
                if the law requires it.
              </p>
              <p>
                When access ends, you can ask us to export your data within 30 days, after which
                we may delete it. Fees already owed remain payable. Sections 9, 13, 14 and 15
                survive termination.
              </p>
            </Clause>

            <Clause n={13} title="Disclaimers">
              <Caps>
                The platform is provided on an as-is and as-available basis. To the fullest
                extent permitted by law, Cnvrted disclaims all warranties, express or implied,
                including merchantability, fitness for a particular purpose, non-infringement and
                accuracy of data. We do not warrant that the platform will meet your
                requirements, that it will be uninterrupted, timely, secure or error-free, that
                the data on it is accurate or complete, or that defects will be corrected. Your
                use of the platform and of any data obtained through it is at your own risk.
              </Caps>
            </Clause>

            <Clause n={14} title="Limitation of liability">
              <Caps>
                To the fullest extent permitted by law, Cnvrted is not liable for indirect,
                incidental, special, consequential or punitive damages, including lost profits,
                revenue, data, business opportunities, goodwill or anticipated savings, on any
                theory of liability. Our total aggregate liability arising out of or relating to
                these terms or your use of the platform will not exceed the fees you paid us in
                the twelve months before the event giving rise to the claim. We are not liable
                for business decisions you take in reliance on data or AI output from the
                platform.
              </Caps>
            </Clause>

            <Clause n={15} title="Indemnity">
              <p>
                You agree to indemnify and hold harmless Cnvrted, its founders, officers,
                employees and agents against claims, liabilities, damages, losses and reasonable
                legal costs arising from your use of the Platform, your breach of these Terms,
                your breach of any law, your infringement of anyone&rsquo;s rights, and any
                third-party claim about outreach you sent or data you used — including claims
                about unsolicited communications, data misuse or privacy.
              </p>
            </Clause>

            <Clause n={16} title="Governing law and disputes">
              <p>
                These Terms are governed by the laws of India, without regard to conflict of law
                rules, and the courts of Bengaluru, Karnataka have exclusive jurisdiction. Before
                starting proceedings, both sides agree to try to resolve the dispute in good
                faith for thirty days.
              </p>
            </Clause>

            <Clause n={17} title="Force majeure">
              <p>
                We are not liable for failure or delay caused by events beyond our reasonable
                control, including natural disasters, war, terrorism, epidemics, government
                action, power or internet failures, and third-party service outages.
              </p>
            </Clause>

            <Clause n={18} title="Changes to these Terms">
              <p>
                We may update these Terms. Material changes are announced by email or in-product
                notice at least fifteen days before they take effect, and continuing to use the
                Platform after that means you accept them.
              </p>
            </Clause>

            <Clause n={19} title="General">
              <p>
                These Terms and the Privacy Policy are the entire agreement between us about the
                Platform. If a provision is unenforceable, the rest stands. Not enforcing a right
                is not a waiver of it. You may not assign these Terms without our written
                consent; we may assign them freely.
              </p>
            </Clause>

            <Clause n={20} title="Contact">
              <p>
                Cnvrted Pvt Ltd
                <br />
                #41, VJ Infinity, 2nd Cross, Doctors Layout, B. Channasandra, Bengaluru,
                Karnataka 560043, India
              </p>
              <p>
                Security: <Mail address="info@cnvrted.com" />
                <br />
                Notices and everything else: <Mail address="work@cnvrted.com" />
              </p>
            </Clause>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
