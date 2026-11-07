import { IllustratedShell } from '@/components/illustrated/shell';
import { PaperLinks } from '@/components/illustrated/paper-links';
import { FoundingTeam } from '@/components/illustrated/contact';
import { PageSchema } from '@/components/page-schema';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { TEAM_PROFILES } from '@/lib/team';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Cnvrted Team | Founders, Product & GTM', description: 'Meet the Cnvrted founding team. Explore profiles for Dhruv Pradeep and Kailas Krsna, their work at Cnvrted and their public professional profiles.', path: '/team' });
export default function TeamPage() {
  return <IllustratedShell faqItems={[]}>
    <PageSchema path="/team" metadata={metadata} type="CollectionPage" items={TEAM_PROFILES.map(person => ({ name: person.name, path: `/team/${person.slug}` }))} />
    <BreadcrumbSchema trail={[{ name: 'Team' }]} />
    <header className="marketing-page-heading design-container"><span className="marketing-eyebrow">The people behind the product</span><h1>Meet the Cnvrted team.</h1><p>Product, engineering, design and go-to-market, working together on a better reason to reach out.</p></header>
    <div className="design-container"><PaperLinks id="team-profiles" eyebrow="Founder profiles" title="Get to know Dhruv and Kailas" links={TEAM_PROFILES.map(person => ({ href: `/team/${person.slug}`, title: person.name, description: person.focus }))} /></div>
    <FoundingTeam />
  </IllustratedShell>;
}
