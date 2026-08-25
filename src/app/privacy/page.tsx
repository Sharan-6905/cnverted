import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Section } from "@/components/section";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Privacy Policy — Cnvrted",
  description:
    "What Cnvrted collects, why, who sees it, and how to get your information removed.",
};

const LAST_UPDATED = "25 August 2026";

function Clause({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={`s${n}`}>
      <h2 className="font-display text-xl font-semibold text-ink">
        <span className="mr-2 font-mono text-sm font-normal text-muted-soft">{n}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i} className="list-disc marker:text-muted-soft">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-ink underline underline-offset-2 hover:text-[#2C456F]"
    >
      {address}
    </a>
  );
}

const RETENTION: [string, string][] = [
  ["Account and profile data", "Life of the account, then 90 days"],
  ["Financial and tax records", "8 years, as required by Indian law"],
  ["Customer content (leads, notes, pipeline)", "Life of the account, then 30 days, or on request"],
  ["Connected Google account data", "Until you disconnect, then 30 days"],
  ["Intelligence database records", "Until removal is requested, or the record is no longer accurate"],
  ["Suppression list", "Indefinitely — that is what makes an opt-out stick"],
  ["Server and security logs", "12 months"],
  ["Waitlist and career applications", "24 months, or on request"],
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <BreadcrumbSchema trail={[{ name: "Privacy" }]} />
      <SiteHeader />
      <main className="flex-1">
        <Section
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated: ${LAST_UPDATED}. This policy explains what Cnvrted collects, why, who sees it, and how you get it removed.`}
        >
          <div className="max-w-2xl space-y-10 text-[15px] leading-relaxed text-body">
            <p>
              It applies to cnvrted.com, beta.cnvrted.com and our APIs (together, the
              &ldquo;Services&rdquo;). &ldquo;Cnvrted&rdquo;, &ldquo;we&rdquo; and
              &ldquo;us&rdquo; mean Cnvrted Pvt Ltd, a company incorporated in India with its
              registered office at #41, VJ Infinity, 2nd Cross, Doctors Layout, B.
              Channasandra, Bengaluru, Karnataka 560043. Read it alongside our{" "}
              <a href="/terms" className="text-ink underline underline-offset-2">
                Terms of Service
              </a>
              .
            </p>

            <Clause n={1} title="The short version">
              <p>Most people reading this fall into one of two groups.</p>
              <p>
                <strong className="font-semibold text-ink">
                  You are a customer or user.
                </strong>{" "}
                You signed up, you are using the dashboard, and you may have connected your
                Google account. We hold your account details, your usage data, and whatever you
                connect or upload. You control it, you can export it, you can delete it.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  You are a business professional whose information is in our system.
                </strong>{" "}
                Cnvrted collects publicly available business information — the kind of thing on
                a company website, a public professional profile, a public post, a press
                release, a job listing. We use it to help our customers work out which companies
                are likely in the market for what they sell. If you would rather not be in
                there, email <Mail address="privacy@cnvrted.com" /> and we will remove you.
              </p>
              <Bullets
                items={[
                  "We collect business information about people in their professional capacity — work email, job title, employer, public professional posts. Not personal or household information.",
                  "We do not collect or want sensitive personal data — health, finances, biometrics, caste, religion, political or trade union affiliation, sexual orientation, precise location.",
                  "We do not sell data to consumer marketers, and using Cnvrted for business-to-consumer outreach breaches our Terms.",
                  "We do not send outreach on our own initiative and we do not control what our customers send. If you received an email you did not want, the sender chose to send it — though you can still ask us to remove you so it does not happen again through us.",
                  "Our Services are for businesses. They are not for anyone under 18.",
                ]}
              />
            </Clause>

            <Clause n={2} title="Information we collect">
              <h3 className="font-semibold text-ink">2.1 From customers and users</h3>
              <Bullets
                items={[
                  <>
                    <strong className="font-semibold text-ink">Account and identity.</strong>{" "}
                    Name, work email, phone, job title, company, credentials, and any profile
                    details you add.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">
                      Onboarding and ICP configuration.
                    </strong>{" "}
                    What you tell us about your product, your buyers, your target segments and
                    your qualification criteria.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Content you put in.</strong> Lead
                    lists, target lists, notes, pipeline records, uploaded files, and anything
                    you type into the product, including into ORKA.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Usage data.</strong> Which
                    features you use, scans you run, searches, exports, session timestamps and
                    in-product actions.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Support and sales.</strong>{" "}
                    Emails, messages and anything else you send us.
                  </>,
                ]}
              />
              <p>
                If and when we begin charging for the Services, billing details will be handled
                by a third-party payment processor and we will not store full card or bank
                numbers on our systems.
              </p>

              <h3 className="pt-3 font-semibold text-ink">
                2.2 From your Google account, if you connect one
              </h3>
              <p>
                Connecting a Google account is optional and powers outreach features. When you
                connect one, we access only what the scopes you approve allow, which is what we
                need to:
              </p>
              <Bullets
                items={[
                  "send the emails you compose and approve in Cnvrted, from your own mailbox; and",
                  "detect and read replies to those emails, so the product can tell you when a prospect has responded and move the account along your pipeline.",
                ]}
              />
              <p>
                You see the exact scopes on Google&rsquo;s consent screen before you approve
                anything, and you can disconnect at any time from your integration settings in
                the product or from your Google Account security settings. Disconnecting stops
                all future access. It does not by itself delete data already synced — ask us and
                we will delete that too.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  Google API Services User Data Policy.
                </strong>{" "}
                Cnvrted&rsquo;s use and transfer of information received from Google APIs
                adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements. Specifically: we use Google user data
                only to provide the features described above; we do not transfer it to others
                except as necessary to provide those features, to comply with applicable law, or
                as part of a merger or acquisition; we do not use it for advertising; we do not
                allow humans to read it except with your explicit consent, where necessary for
                security purposes such as investigating abuse, to comply with applicable law, or
                where the data is aggregated and de-identified; and we do not use it to develop,
                improve or train generalised AI or machine learning models.
              </p>

              <h3 className="pt-3 font-semibold text-ink">
                2.3 From public and third-party sources
              </h3>
              <p>
                This is the core of what Cnvrted does. We collect business information from
                across the open internet, including publicly accessible company websites,
                careers pages and press releases; public professional profiles and public posts;
                public regulatory and corporate registry filings; and public job listings,
                funding announcements, news and industry directories. Where we license data from
                third-party providers, those providers are listed in Section 5.
              </p>
              <p>
                From this we build records that may include name, job title and department,
                employer, business email address, business phone number, professional profile
                URLs, employment history, company size, industry, location, funding stage,
                technology stack, hiring activity, and public statements made in a professional
                context.
              </p>
              <p>
                We also derive information — scores, inferences and buying-intent signals
                generated by analysing and combining the above. Derived data about you is
                personal data too, and the rights in Section 6 apply to it.
              </p>
              <p>
                <strong className="font-semibold text-ink">Our lawful basis.</strong> Where
                Indian law applies, we process publicly available personal data made public by
                the individual or under a legal obligation, as permitted under the Digital
                Personal Data Protection Act, 2023. Where the GDPR or UK GDPR applies, we rely
                on legitimate interests — operating a B2B intelligence service — limited to
                professional-context data with a straightforward opt-out. You can object at any
                time.
              </p>

              <h3 className="pt-3 font-semibold text-ink">2.4 From visitors to this website</h3>
              <Bullets
                items={[
                  "Forms. Early-access registrations, waitlist signups and career applications: the details you enter, which we store with our database provider.",
                  "Server logs. Our hosting provider records IP address, device and browser type, referring URL and timestamps as part of serving and securing the site.",
                  "Cookies. We use only cookies that are strictly necessary — keeping you signed in to the product and keeping sessions secure. We do not run advertising or analytics cookies, and there is no third-party tracking on this site. If that changes we will add a consent banner before it does.",
                ]}
              />

              <h3 className="pt-3 font-semibold text-ink">2.5 What we do not collect</h3>
              <p>
                We do not intentionally collect sensitive personal data — health data, financial
                account data, biometric or genetic data, caste or tribe, religious belief,
                political affiliation, trade union membership, sexual orientation or sex life,
                precise geolocation, or government identifiers such as Aadhaar or PAN of
                individuals in our intelligence database. If such data reaches us incidentally,
                we delete it.
              </p>
              <p>
                We do not knowingly collect data about anyone under 18. If you believe we hold
                data about a child, email <Mail address="privacy@cnvrted.com" /> and we will
                delete it.
              </p>
            </Clause>

            <Clause n={3} title="How we use information">
              <Bullets
                items={[
                  "To run the Services — create and manage accounts, authenticate users, deliver features and provide support.",
                  "To generate signals and scores — detect buying-intent signals, match them to a customer's ICP, and rank accounts and leads.",
                  "To build and maintain our data — verify accuracy, reconcile records across sources, refresh stale records, and suppress records subject to a removal request.",
                  "To secure the platform — detect and investigate fraud, abuse, credential misuse and breaches of our Terms.",
                  "To improve and develop — diagnose issues, measure feature performance and build new capability.",
                  "To communicate — service notices, security alerts, product updates, and marketing where you have opted in. Every marketing message carries an unsubscribe link.",
                  "To comply with law — respond to lawful requests, meet tax and accounting obligations, and enforce our rights.",
                ]}
              />
            </Clause>

            <Clause n={4} title="AI and automated processing">
              <p>Cnvrted is an AI product. Being specific about that:</p>
              <p>
                <strong className="font-semibold text-ink">What our AI does.</strong> ORKA and
                our underlying pipeline use AI to classify signals, infer firmographic and
                intent attributes, score and prioritise accounts, summarise research, and draft
                outreach copy for a user to review, edit and send.
              </p>
              <p>
                <strong className="font-semibold text-ink">Third-party model providers.</strong>{" "}
                We use commercial large language model providers to deliver some of these
                features, and share only what the feature needs. Those providers are listed in
                Section 5 and are contractually prohibited from using your data to train their
                models.
              </p>
              <p>
                <strong className="font-semibold text-ink">Training our own models.</strong> We
                may use aggregated, de-identified usage and signal data to improve our own
                scoring and classification. We do not train models on the contents of a
                connected Google account, and we do not train on customer-uploaded data unless a
                customer has separately opted in in writing.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  No significant automated decisions.
                </strong>{" "}
                Our scores and drafts are decision support — a human reviews and acts. We do not
                use AI to make decisions producing legal or similarly significant effects on
                individuals, such as employment, credit, housing, insurance or education, and
                our Terms prohibit customers from using Cnvrted that way.
              </p>
            </Clause>

            <Clause n={5} title="How we share information">
              <p>We share personal data with:</p>
              <Bullets
                items={[
                  <>
                    <strong className="font-semibold text-ink">
                      Service providers and subprocessors.
                    </strong>{" "}
                    Supabase (database and authentication), Vercel (website hosting), Railway
                    and Cloudflare (application and API infrastructure), Resend (transactional
                    email), and our large language model providers. Each is bound by contract to
                    process data only on our instructions.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">
                      Customers and their authorised users.
                    </strong>{" "}
                    Business contact and firmographic records, and the signals attached to them,
                    are made available to customers through the Services.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Our own team</strong>, on a
                    need-to-know basis and under confidentiality obligations.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Professional advisers</strong> —
                    lawyers, auditors and accountants, where necessary.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Acquirers</strong>, in a merger,
                    acquisition, financing or asset sale, subject to confidentiality.
                  </>,
                  <>
                    <strong className="font-semibold text-ink">Authorities</strong>, where
                    required by valid legal process or to protect the rights, safety or property
                    of Cnvrted, our customers or others. Where we are legally permitted to tell
                    you, we will.
                  </>,
                ]}
              />
              <p>
                We do not disclose customer content — your leads, notes, pipeline, or anything
                from a connected Google account — to other customers. Ever.
              </p>
              <p>
                We do not sell personal data for consumer advertising. Making business contact
                records available to customers on a subscription basis may count as a
                &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; under certain non-Indian privacy
                laws; where those apply to you, you have the right to opt out under Section 6.
              </p>
            </Clause>

            <Clause n={6} title="Your rights and choices">
              <p>Whoever and wherever you are, you can ask us to:</p>
              <Bullets
                items={[
                  "Tell you what we hold about you, where it came from, and who we have shared it with",
                  "Give you a copy of it",
                  "Correct anything inaccurate, incomplete or out of date",
                  "Delete it, and add you to our suppression list so it is not re-collected",
                  "Export it in a structured, machine-readable format",
                  "Opt you out of our intelligence database, of marketing, and of any sale or sharing",
                  "Stop processing based on legitimate interests, or pause it while a dispute is resolved",
                  "Withdraw consent at any time, where we rely on consent",
                  "Let someone you nominate exercise these rights if you die or become incapacitated — a right under the DPDP Act",
                ]}
              />
              <p>
                <strong className="font-semibold text-ink">How to exercise them.</strong> Email{" "}
                <Mail address="privacy@cnvrted.com" />. Customers can also do most of this from
                account settings. We may ask for enough information to confirm who you are, but
                no more than we need, and we respond within 30 days. If we need longer and the
                law allows it, we will tell you why before the deadline.
              </p>
              <p>
                <strong className="font-semibold text-ink">One note on deletion.</strong> After
                you ask to be removed, we keep the minimum needed in a suppression list —
                typically a hash of your email — so the request is honoured and the record is
                not re-collected from public sources. That is the only way an opt-out stays
                sticky.
              </p>
              <p>
                <strong className="font-semibold text-ink">No retaliation.</strong> We will not
                degrade your service or charge you differently for exercising any of this.
              </p>
              <p>
                <strong className="font-semibold text-ink">Grievances (India).</strong> Under the
                DPDP Act, 2023 and the Information Technology Act, 2000, you can reach our
                Grievance Officer at <Mail address="grievance@cnvrted.com" />, or by post at the
                registered office above. If we do not resolve your complaint, you may escalate
                to the Data Protection Board of India or, in the EEA, UK or Switzerland, to your
                local supervisory authority.
              </p>
            </Clause>

            <Clause n={7} title="When we are a processor, not a controller">
              <p>
                Two different roles, and it decides where you send your request. We are a{" "}
                <strong className="font-semibold text-ink">controller</strong> — we decide the
                purposes and means — for our website visitors, our marketing, our own business
                operations, and the intelligence database we build from public sources. We are a{" "}
                <strong className="font-semibold text-ink">processor</strong> — acting on a
                customer&rsquo;s instructions — for data a customer uploads or connects from
                their Google account. There, the customer is the controller and is responsible
                for having a lawful basis, giving notice and handling rights requests. If your
                data is with us only because a customer put it there, send your request to that
                customer and we will support them in fulfilling it.
              </p>
            </Clause>

            <Clause n={8} title="Security">
              <p>
                We maintain administrative, technical and physical safeguards appropriate to the
                risk, including encryption in transit and at rest, role-based access control and
                least-privilege internal access, row-level security with tenant isolation on
                customer data, multi-factor authentication for administrative access, audit
                logging and monitoring, and regular backups.
              </p>
              <p>
                No system is perfectly secure. Please help: use a strong unique password, enable
                multi-factor authentication, keep your devices patched, and tell us immediately
                at <Mail address="info@cnvrted.com" /> if you suspect unauthorised access.
              </p>
              <p>
                <strong className="font-semibold text-ink">Breach notification.</strong> If a
                personal data breach occurs, we will notify the Data Protection Board of India
                and affected individuals as the DPDP Act requires, and notify supervisory
                authorities and individuals under the GDPR, UK GDPR and other applicable laws
                within the timeframes those laws set. Customers will be told without undue delay
                so they can meet their own obligations.
              </p>
            </Clause>

            <Clause n={9} title="Retention">
              <p>We keep personal data only as long as we need it.</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-hairline text-left">
                      <th className="py-2 pr-4 font-semibold text-ink">Data</th>
                      <th className="py-2 font-semibold text-ink">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RETENTION.map(([data, period]) => (
                      <tr key={data} className="border-b border-hairline align-top">
                        <td className="py-2 pr-4">{data}</td>
                        <td className="py-2">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                When a retention period ends we delete, anonymise or de-identify the data. Where
                deletion is not technically practicable — backups, for instance — we isolate it
                and stop further use until it cycles out.
              </p>
            </Clause>

            <Clause n={10} title="International transfers">
              <p>
                Cnvrted is based in India. Our infrastructure and subprocessors may store or
                process data in India, the United States, the European Union and other
                jurisdictions. Where we transfer personal data across borders we use the
                safeguards applicable law requires, including Standard Contractual Clauses for
                transfers from the EEA and the UK. We do not transfer personal data to any
                country restricted by the Central Government under Section 16 of the DPDP Act. A
                copy of the relevant transfer mechanism is available on request from{" "}
                <Mail address="privacy@cnvrted.com" />.
              </p>
            </Clause>

            <Clause n={11} title="Third-party links">
              <p>
                The Services link to and integrate with third-party sites and tools. Their
                privacy practices are theirs, not ours. Read their policies.
              </p>
            </Clause>

            <Clause n={12} title="Changes to this policy">
              <p>
                We will update this policy as the product and the law change. Material changes
                get a notice — email to account holders or an in-product banner — at least 15
                days before they take effect. The date at the top always reflects the current
                version, and we will provide any earlier version on request.
              </p>
            </Clause>

            <Clause n={13} title="Contact">
              <p>
                Cnvrted Pvt Ltd
                <br />
                #41, VJ Infinity, 2nd Cross, Doctors Layout, B. Channasandra, Bengaluru,
                Karnataka 560043, India
              </p>
              <p>
                Privacy: <Mail address="privacy@cnvrted.com" />
                <br />
                Grievances: <Mail address="grievance@cnvrted.com" />
                <br />
                Security: <Mail address="info@cnvrted.com" />
                <br />
                General: <Mail address="work@cnvrted.com" />
              </p>
            </Clause>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
