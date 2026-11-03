import { absoluteUrl, SITE_URL } from './seo';

// Public facts from /about and /contact; preferred names confirmed by the team.
// Keep biographical claims and authorship limited to what is actually published.
export const TEAM_PROFILES = [
  {
    slug: 'dhruv-pradeep', name: 'Dhruv Pradeep', alternateNames: [] as string[],
    focus: 'GTM strategy and partnerships',
    description: 'Dhruv Pradeep is a co-founder of Cnvrted, focused on go-to-market strategy, partnerships and helping teams get started with the product.',
    portrait: '/figma/contact/dhruv.png', email: 'dhruv@cnvrted.com',
    linkedin: 'https://www.linkedin.com/in/dhruvprad/', x: 'https://x.com/dhruvprad',
    topics: ['Go-to-market strategy', 'Buying signals', 'Partnerships'],
    links: [
      { href: '/learn/go-to-market-strategy', title: 'Build a go-to-market strategy', description: 'Define the market, offer and next conversation.' },
      { href: '/learn/buying-signals', title: 'Understand buying signals', description: 'Review the evidence before reaching out.' },
    ],
  },
  {
    slug: 'kailas-krsna', name: 'Kailas Krsna', alternateNames: ['Kailas S', 'Kailas Krsna S'],
    focus: 'Product, AI and integrations',
    description: 'Kailas Krsna is a co-founder of Cnvrted, focused on product, AI and connecting Cnvrted to the tools teams use.',
    portrait: '/figma/contact/kailas.png', email: 'kailas@cnvrted.com',
    linkedin: 'https://www.linkedin.com/in/kailas-krsna-s-a7855334a/', x: 'https://x.com/kailaskrsna',
    topics: ['Product development', 'Artificial intelligence', 'Integrations'],
    links: [
      { href: '/product', title: 'Explore the Cnvrted workflow', description: 'Connect customer fit, public signals and outreach research.' },
      { href: '/help-center', title: 'Product questions', description: 'Learn about the workflow and discuss integration availability.' },
    ],
  },
] as const;

export function findTeamProfile(slug: string) {
  return TEAM_PROFILES.find(person => person.slug === slug);
}

export function personSchema(person: (typeof TEAM_PROFILES)[number]) {
  return {
    '@type': 'Person', '@id': absoluteUrl(`/team/${person.slug}#person`),
    name: person.name, ...(person.alternateNames.length ? { alternateName: person.alternateNames } : {}),
    url: absoluteUrl(`/team/${person.slug}`), image: absoluteUrl(person.portrait),
    description: person.description, jobTitle: 'Co-founder',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    sameAs: [person.linkedin, person.x],
  };
}
