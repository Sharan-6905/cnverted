import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IllustratedShell } from '@/components/illustrated/shell';
import { PaperLinks } from '@/components/illustrated/paper-links';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { JsonLd } from '@/components/json-ld';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { TEAM_PROFILES, findTeamProfile, personSchema } from '@/lib/team';
import { absoluteUrl, pageMetadata, SITE_URL } from '@/lib/seo';
import '../team.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return TEAM_PROFILES.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props) {
  const person = findTeamProfile((await params).slug);
  if (!person) notFound();
  return pageMetadata({ title: `${person.name} | Cnvrted Co-founder`, description: person.description, path: `/team/${person.slug}`, image: person.portrait, imageAlt: person.name });
}

export default async function TeamProfilePage({ params }: Props) {
  const person = findTeamProfile((await params).slug);
  if (!person) notFound();
  const path = `/team/${person.slug}`;
  const articles = BLOG_POSTS.filter(post => post.author.name === person.name && post.author.type !== 'Organization');
  return <IllustratedShell faqItems={[]}>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': absoluteUrl(`${path}#webpage`), url: absoluteUrl(path), name: `${person.name} | Cnvrted Co-founder`, description: person.description, inLanguage: 'en', isPartOf: { '@id': `${SITE_URL}/#website` }, mainEntity: personSchema(person) }} />
    <BreadcrumbSchema trail={[{ name: 'Team', path: '/team' }, { name: person.name }]} />
    <article className="team-profile design-container">
      <Link className="marketing-text-link" href="/team">← Meet the team</Link>
      <header className="team-profile-heading">
        <div><p className="marketing-eyebrow">Cnvrted co-founder</p><h1>{person.name}</h1><p className="team-profile-focus">{person.focus}</p><p>{person.description}</p></div>
        <Image src={person.portrait} alt={person.name} width={480} height={480} sizes="(max-width: 700px) 220px, 300px" className="team-profile-portrait" />
      </header>
      <section aria-labelledby="focus-heading"><h2 id="focus-heading">At Cnvrted</h2><p>{person.name} is part of the founding team building Cnvrted, a go-to-market intelligence platform for founders and B2B sales teams. The product connects public buying signals, customer fit and research context to help teams plan relevant outreach.</p><ul className="team-profile-topics">{person.topics.map(topic => <li key={topic}>{topic}</li>)}</ul><Link href="/about" className="marketing-text-link">Read the Cnvrted story ↗</Link></section>
      <section aria-labelledby="connect-heading"><h2 id="connect-heading">Connect with {person.name}</h2><nav aria-label={`${person.name} public profiles`} className="team-profile-links"><a href={person.linkedin}>LinkedIn ↗</a><a href={person.x}>X ↗</a><a href={`mailto:${person.email}`}>{person.email}</a></nav></section>
      {articles.length > 0 && <PaperLinks id="author-articles" eyebrow="Published writing" title={`Articles by ${person.name}`} links={articles.map(post => ({ href: `/blogs/${post.slug}`, title: post.title, description: post.excerpt }))} />}
      <PaperLinks id="team-related" eyebrow="Explore the work" title="Learn more about Cnvrted" links={person.links} />
    </article>
  </IllustratedShell>;
}
