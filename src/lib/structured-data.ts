/**
 * BizMeals — Structured Data (JSON-LD)
 *
 * SINGLE SOURCE OF TRUTH for all schema.org markup.
 * Server-rendered in layout.tsx so crawlers and AI engines receive it in
 * the initial HTML — no client hydration required.
 *
 * Entity model:
 *   - Organization: BizMeals Management Solutions Pvt Ltd (brand: BizMeals)
 *   - WebSite: https://bizmeals.in
 *   - WebPage: the homepage (about the Organization)
 *   - Service: each major service BizMeals provides (provider = Organization)
 *   - FAQPage: mirrors the visible FAQ on the homepage
 *
 * Data policy: only factual, user-verified information is included.
 * No invented customers, revenue, awards, case studies, offices or employees.
 */
import { siteConfig, type PortfolioCategory } from '@/lib/site-config'

const SITE_URL = siteConfig.seo.url
const LOGO_URL = `${SITE_URL}${siteConfig.seo.ogImage}`

/* ── Organization ── */
export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: siteConfig.name,
  legalName: 'BizMeals Management Solutions Pvt Ltd',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
    caption: 'BizMeals logo',
  },
  image: LOGO_URL,
  description:
    'BizMeals is a Business Growth Execution Partner helping startups, SMEs and growing businesses plan, execute and scale growth through strategy, consulting, digital marketing, lead generation, BPO and project execution.',
  slogan: 'Not an Agency. A Growth Partner.',
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
      url: siteConfig.founder.linkedin,
    },
    {
      '@type': 'Person',
      name: siteConfig.coFounder.name,
      jobTitle: siteConfig.coFounder.role,
      url: siteConfig.coFounder.linkedin,
    },
  ],
  // sameAs — only genuine, user-verified official profiles.
  sameAs: [
    siteConfig.linkedin.company, // LinkedIn company page (verified real)
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Business Growth Strategy',
    'Digital Marketing',
    'Search Engine Optimization',
    'Lead Generation',
    'Business Consulting',
    'BPO Services',
    'Project Execution',
    'Website Development',
    'Startup Building',
  ],
}

/* ── WebSite ── */
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en',
}

/* ── WebPage (homepage) ── */
export const webpageSchema = {
  '@type': 'WebPage',
  '@id': `${SITE_URL}#webpage`,
  url: SITE_URL,
  name: siteConfig.seo.title,
  description: siteConfig.seo.description,
  isPartOf: { '@id': `${SITE_URL}#website` },
  about: { '@id': `${SITE_URL}#organization` },
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en',
  primaryImageOfPage: LOGO_URL,
}

/* ── Services ──
   Each maps to a real service BizMeals offers (visible on the homepage).
   Connected to the Organization as provider. No invented services. */
const serviceList: {
  name: string
  description: string
  category: PortfolioCategory | 'Business Consulting'
}[] = [
  {
    name: 'Digital Marketing',
    description:
      'Performance marketing, SEO, social media and paid advertising built to drive revenue and qualified leads — not vanity metrics.',
    category: 'Digital Marketing',
  },
  {
    name: 'Lead Generation',
    description:
      'Targeted inbound and outbound lead engines that route sales-ready leads to your team across industries.',
    category: 'Digital Marketing',
  },
  {
    name: 'Business Consulting',
    description:
      'Market entry, positioning, growth strategy and advisory from senior strategists who have built and scaled businesses.',
    category: 'Business Consulting',
  },
  {
    name: 'BPO Services',
    description:
      'Back-office, customer support and operations teams that reduce cost and free founders to focus on growth.',
    category: 'BPO',
  },
  {
    name: 'Project Execution',
    description:
      'End-to-end execution of growth initiatives — strategy, build, launch and scale — managed by one accountable partner.',
    category: 'Digital Marketing',
  },
  {
    name: 'Website Development',
    description:
      'Custom, conversion-focused websites for D2C, real estate, healthcare and growing businesses.',
    category: 'Website Development',
  },
]

export const serviceSchemas = serviceList.map((s) => ({
  '@type': 'Service',
  name: s.name,
  description: s.description,
  serviceType: s.name,
  provider: { '@id': `${SITE_URL}#organization` },
  areaServed: { '@type': 'Country', name: 'India' },
}))

/* ── FAQPage ──
   Mirrors the visible FAQ section on the homepage (homepage-faq).
   Keep this in sync with the FAQ rendered in home-page.tsx. */
export const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is BizMeals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BizMeals is a Business Growth Execution Partner. We help startups, SMEs and growing businesses plan, execute and scale growth by combining strategy, consulting, digital marketing, lead generation, BPO and project execution under one roof — supported by a network of trained professionals, freelancers and specialist partners.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is BizMeals a digital marketing agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. BizMeals is not just a digital marketing agency. Digital marketing is one of the services we provide, but our core positioning is a Business Growth Execution Partner — we cover strategy, consulting, execution, operations and project management, not only marketing campaigns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who does BizMeals help?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BizMeals works with startups, small and medium businesses, growing companies and founders who need both strategy and execution support. We also work with established enterprises that need a dedicated execution partner.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does BizMeals provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BizMeals provides business growth strategy and consulting, digital marketing (SEO, social media, paid ads), lead generation, BPO and back-office services, project execution, and website development — all managed under one accountable partner.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does BizMeals work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BizMeals works in six steps: 1) understand the business, 2) define strategy and goals, 3) assign the right experts, 4) execute the project, 5) measure results, and 6) optimize and scale. One team owns strategy through execution so nothing falls through the cracks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is BizMeals different from a traditional agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional agencies typically hand over a strategy deck and silo execution. BizMeals combines strategy and execution in one team, brings an on-demand expert network, manages projects end-to-end, and ties success to revenue rather than vanity metrics. Founders get one accountable partner instead of multiple uncoordinated vendors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can BizMeals help a startup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For startups, BizMeals acts as a growth co-pilot — helping validate the market, build the product go-to-market, acquire the first customers, set up marketing and operations, and prepare for fundraising. Founders can also engage on equity or hybrid models so incentives stay aligned.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can BizMeals help a small business grow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For small and medium businesses, BizMeals runs continuous growth — digital marketing, lead generation, SEO, website optimization and back-office support — under a monthly retainer, so owners get a full growth team without hiring in-house.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is BizMeals located and which areas does it serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BizMeals is based in Bangalore, Karnataka, India and serves clients across India through a digital-first, remote-friendly delivery model.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact BizMeals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `You can contact BizMeals by phone at ${siteConfig.contact.phone} or ${siteConfig.contact.phone2}, by email at ${siteConfig.contact.email}, or through the contact form on the website. WhatsApp is also available for quick conversations.`,
      },
    },
  ],
}

/* ── BreadcrumbList ──
   The homepage is the root of the site hierarchy. A single-item breadcrumb
   (Home) is valid and helps search engines understand site structure. */
export const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ],
}

/* ── HowTo ──
   Mirrors the visible 6-step "How BizMeals works" section on the homepage.
   Keep in sync with the steps rendered in home-page.tsx. */
export const howToSchema = {
  '@type': 'HowTo',
  '@id': `${SITE_URL}#howto`,
  name: 'How BizMeals works',
  description:
    'BizMeals works in six steps: understand the business, define strategy and goals, assign the right experts, execute the project, measure results, and optimize and scale.',
  totalTime: 'P0D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Understand the business',
      text: 'We deep-dive into your business, market and goals. No templates — a custom growth map built for your reality.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Define strategy and goals',
      text: 'We translate your reality into a clear strategy with measurable goals — positioning, channels, milestones and success metrics.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Assign the right experts',
      text: 'We assemble the right execution team from our expert network — strategy, design, ads, content, tech, ops — per project, not forced onto you.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Execute the project',
      text: 'We don\u2019t hand you a plan and leave. We run the playbooks, manage the vendors and ship the work — end to end.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Measure results',
      text: 'Every initiative is tracked against revenue and lead KPIs — not vanity metrics. You always know what is working and what is not.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Optimize and scale',
      text: 'Once the system works, we optimize it and scale — more channels, more geography, more revenue, predictably.',
    },
  ],
}

/* ── Combined @graph ──
   Rendered as a single JSON-LD script tag in layout.tsx. */
export const bizmealsStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    webpageSchema,
    breadcrumbSchema,
    howToSchema,
    ...serviceSchemas,
    faqSchema,
  ],
}
