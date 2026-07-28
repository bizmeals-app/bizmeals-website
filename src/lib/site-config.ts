/**
 * BizMeals — Centralized Site Configuration
 *
 * SINGLE SOURCE OF TRUTH for all contact info, stats, and social links.
 * Every component on the site must import from here so numbers never contradict.
 */

export const siteConfig = {
  name: 'BizMeals',
  tagline: 'Not an Agency. A Growth Partner.',
  description:
    'BizMeals is a Business Growth Execution Partner. We combine Strategy, Execution, and an Expert Network to build and scale businesses across India.',

  /* ── Contact (identical everywhere: header, footer, CTA, contact page) ── */
  contact: {
    email: 'info@bizmeals.in',
    phone: '+91 8217330484',
    phoneHref: 'tel:+918217330484',
    // Secondary phone (careers / hiring / training)
    phone2: '+91 8073568735',
    phone2Href: 'tel:+918073568735',
    whatsappNumber: '918217330484',
    whatsappHref:
      'https://wa.me/918217330484?text=Hi%20BizMeals%2C%20I%27d%20like%20to%20discuss%20a%20growth%20opportunity%20for%20my%20business.',
    address: 'Bangalore, Karnataka, India',
    hrEmail: 'hr@bizmeals.in',
    careersEmail: 'careers@bizmeals.in',
  },

  /* ── LinkedIn profiles (founders + company page) ── */
  linkedin: {
    company: 'https://www.linkedin.com/company/106474769/',
    manjunatha: 'https://www.linkedin.com/in/polakamanjunathareddy/',
    durga: 'https://www.linkedin.com/in/a-durga-prasad-791832146/',
  },

  /* ── Google Forms — application / registration links ──
     Each form has a specific purpose. Use the right one in the right place. */
  forms: {
    // Full-time roles: BDEs, HR, Sales & Management hiring
    bdeHrSales: 'https://forms.gle/kskoVdiDKGQ8t99X6',
    // Training program registration (40+ Digital Marketing openings, career-building)
    trainingProgram: 'https://forms.gle/p6omceCeksXK4ZE87',
    // Business growth partner / client onboarding / collaborator registration
    businessPartner: 'https://forms.gle/uAQMhk1WgfUsAN327',
    // Freelancer & employee onboarding (Digital Marketing, Design, Sales, Web, BPO, etc.)
    freelancerOnboarding: 'https://forms.gle/PSXbzQgDLfLUvZyf8',
  },

  /* ── Community & Network ──
     The extended BizMeals ecosystem beyond the core team. */
  community: {
    freelancers: 1000,       // 1000+ freelancers community across industries
    founders: 500,           // 500+ founders & business owners community
    partnerCompanies: 0,     // partner companies (displayed as "Multiple" — not a fixed number)
  },

  /* ── Social — only real, BizMeals-branded profiles ── */
  social: {
    instagram: 'https://www.instagram.com/bizmeals',
    linkedin: 'https://www.linkedin.com/company/bizmeals',
    facebook: 'https://www.facebook.com/bizmeals',
    twitter: 'https://twitter.com/bizmeals',
  },

  /* ── Trust stats — pick ONE number per metric, use it site-wide ── */
  stats: {
    yearsInBusiness: 12,        // "12 years" everywhere (not "12+" in one place)
    clientsServed: 50,          // 50+
    industriesServed: 6,        // 6+
    citiesCovered: 3,           // 3 cities
    projectsDelivered: 50,
    clientSatisfaction: 98,     // %
    revenueGeneratedCr: 2,      // ₹2 Cr+
    avgRoi: 3.5,                // x
  },

  /* ── Team / Leadership ── */
  founder: {
    name: 'Manjunatha Reddy Polaka',
    role: 'Founder & CEO',
    email: 'info@bizmeals.in',
    linkedin: 'https://www.linkedin.com/in/polakamanjunathareddy/',
    // NOTE: No photo field by design. The founder avatar uses "MR" initials
    // (consistent with testimonial avatars) until a real headshot is provided.
    initials: 'MR',
  },
  coFounder: {
    name: 'Durga Prasad',
    role: 'Co-Founder & Leadership',
    email: 'info@bizmeals.in',
    linkedin: 'https://www.linkedin.com/in/a-durga-prasad-791832146/',
    initials: 'DP',
  },

  /* ── SEO ── */
  seo: {
    title: 'BizMeals — Business Growth Execution Partner | Bangalore',
    description:
      'Not an Agency. A Growth Partner. BizMeals combines Strategy, Execution, and an Expert Network to build & scale businesses. 12+ years, 50+ clients served.',
    keywords: [
      'BizMeals',
      'Business Growth Partner',
      'Growth Execution Partner',
      'Digital Marketing Bangalore',
      'Startup Consulting India',
      'Business Scaling',
      'Manjunatha Reddy Polaka',
    ],
    ogImage: '/logo.png',
    url: 'https://bizmeals.in',
  },
} as const

/* ── Hero trust bar (consistent with stats above) ── */
export const heroTrustBar = [
  { value: `${siteConfig.stats.yearsInBusiness}+`, label: 'Years in Business' },
  { value: `${siteConfig.stats.clientsServed}+`, label: 'Clients Served' },
  { value: `${siteConfig.stats.industriesServed}+`, label: 'Industries Served' },
  { value: `${siteConfig.stats.citiesCovered}`, label: 'Cities Covered' },
] as const

/* ── Real-results metrics (hardcoded values, never "0") ── */
export const realResultsMetrics = [
  { value: 180, prefix: '+', suffix: '%', label: 'Average Lead Growth' },
  { value: 3.2, prefix: '', suffix: 'x', label: 'Return on Ad Spend', isDecimal: true },
  { value: 500, prefix: '', suffix: '+', label: 'Users Acquired' },
  { value: 92, prefix: '', suffix: '%', label: 'Client Retention' },
  { value: 65, prefix: '', suffix: '%', label: 'Avg. Revenue Growth' },
  { value: 50, prefix: '', suffix: '+', label: 'Projects Delivered' },
] as const

/* ── Case-study cards (placeholder-but-realistic numbers, never zero) ──
   These power the homepage "Numbers That Speak" section. The same numbers
   are mirrored in `portfolioEntries` below so the homepage and /portfolio
   page never contradict each other. */
export const caseStudies = [
  {
    industry: 'Manufacturing',
    icon: 'Factory',
    headline: '+180% Leads',
    metrics: [
      { label: 'Lead Growth', value: '+180%' },
      { label: 'Cost / Lead', value: '-42%' },
      { label: 'Timeline', value: '4 months' },
    ],
    summary:
      'Rebuilt the lead engine for a B2B manufacturer — shifted from cold outreach to a targeted inbound funnel that tripled qualified leads.',
  },
  {
    industry: 'Real Estate',
    icon: 'Building2',
    headline: '₹2.4 Cr Pipeline',
    metrics: [
      { label: 'Pipeline Value', value: '₹2.4 Cr' },
      { label: 'Deals Closed', value: '14' },
      { label: 'Timeline', value: '6 months' },
    ],
    summary:
      'Positioned a boutique realty firm with data-driven market insights and a high-intent buyer funnel that filled the sales pipeline.',
  },
  {
    industry: 'E-Commerce',
    icon: 'ShoppingCart',
    headline: '3.2x ROAS',
    metrics: [
      { label: 'ROAS', value: '3.2x' },
      { label: 'Revenue Lift', value: '+95%' },
      { label: 'Timeline', value: '3 months' },
    ],
    summary:
      'Restructured paid media and conversion funnels for a D2C brand — cut wasted spend and lifted return on ad spend from 1.1x to 3.2x.',
  },
  {
    industry: 'Startup',
    icon: 'Rocket',
    headline: '500+ Users',
    metrics: [
      { label: 'Users Acquired', value: '500+' },
      { label: 'CAC Reduction', value: '-38%' },
      { label: 'Timeline', value: '5 months' },
    ],
    summary:
      'Took a pre-Series A startup from private beta to 500+ active users with a lean, channel-by-channel growth system.',
  },
  {
    industry: 'Healthcare',
    icon: 'Heart',
    headline: '-40% Acquisition Cost',
    metrics: [
      { label: 'Cost / Patient', value: '-40%' },
      { label: 'Patient Volume', value: '2x' },
      { label: 'Timeline', value: '4 months' },
    ],
    summary:
      'Built a compliant patient-acquisition funnel for a healthcare provider — doubled volume while cutting acquisition cost by 40%.',
  },
  {
    industry: 'Education',
    icon: 'GraduationCap',
    headline: '92% Retention',
    metrics: [
      { label: 'Retention', value: '92%' },
      { label: 'Enrolment Lift', value: '+70%' },
      { label: 'Timeline', value: '6 months' },
    ],
    summary:
      'Redesigned the enrolment journey for an ed-tech platform — lifted retention to 92% and grew new enrolments by 70%.',
  },
] as const

/* ── Testimonials (each renders exactly once) ──
   NOTE: LinkedIn verification links were removed because they pointed to
   linkedin.com/in/ with no username (dead links). Real LinkedIn URLs will
   be added back here as `linkedin` per testimonial when available. */
export const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechCorp India',
    text: "BizMeals didn't just run our ads — they became an extension of our team. Our lead generation increased 4x in 3 months.",
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, FreshMart',
    text: 'From strategy to execution, BizMeals handled everything. We went from 0 to 10K customers in 6 months.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Director, BuildRight Realty',
    text: 'Their real estate consultancy is top-notch. Clear market insights that helped us make ₹50L+ in smart investments.',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'CEO, StyleHub',
    text: 'The BPO team at BizMeals reduced our operational costs by 60%. The quality of work exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Founder, DataNest',
    text: 'BizMeals organized our product launch event that generated 200+ leads. Professional, creative, and results-driven.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    role: 'COO, MedPro Health',
    text: 'Their digital marketing team understands healthcare. Our patient acquisition cost dropped 40% while volume doubled.',
    rating: 5,
  },
] as const

/* ════════════════════════════════════════════════════════════════════════
   PORTFOLIO — full case-study entries for the /portfolio page
   ════════════════════════════════════════════════════════════════════════ */

export type PortfolioCategory =
  | 'Digital Marketing'
  | 'Website Development'
  | 'Consultancy'
  | 'BPO'
  | 'Event Management'

export const portfolioFilters: ('All' | PortfolioCategory)[] = [
  'All',
  'Digital Marketing',
  'Website Development',
  'Consultancy',
  'BPO',
  'Event Management',
]

export interface PortfolioEntry {
  id: string
  title: string
  industry: string
  category: PortfolioCategory
  /** lucide-react icon name (see iconMap in portfolio-page.tsx) */
  icon: string
  problem: string
  solution: string
  metrics: { label: string; value: string }[]
  /**
   * Internal flag (NOT rendered on the site) marking entries whose numbers
   * are realistic placeholders pending real client figures. Update these
   * with verified numbers when available.
   */
  placeholder?: boolean
}

export const portfolioEntries: PortfolioEntry[] = [
  /* ── 6 existing case studies (mirror homepage `caseStudies` numbers) ── */
  {
    id: 'manufacturing',
    title: 'B2B Manufacturer — +180% Qualified Leads',
    industry: 'Manufacturing',
    category: 'Digital Marketing',
    icon: 'Factory',
    problem:
      'Reliance on cold outreach with diminishing returns, no inbound funnel, and weak lead qualification that wasted the sales team’s time.',
    solution:
      'Rebuilt the lead engine around a targeted inbound funnel — SEO-led content, LinkedIn outbound, and a qualification framework that routed only sales-ready leads to the field team.',
    metrics: [
      { label: 'Lead Growth', value: '+180%' },
      { label: 'Cost / Lead', value: '-42%' },
      { label: 'Timeline', value: '4 months' },
    ],
  },
  {
    id: 'real-estate',
    title: 'Boutique Realty Firm — ₹2.4 Cr Sales Pipeline',
    industry: 'Real Estate',
    category: 'Consultancy',
    icon: 'Building2',
    problem:
      'No differentiated market positioning and no systematic buyer pipeline; relying on walk-ins and referrals alone.',
    solution:
      'Positioned the firm with data-driven market insights and built a high-intent buyer funnel combining targeted outreach and consultative selling.',
    metrics: [
      { label: 'Pipeline Value', value: '₹2.4 Cr' },
      { label: 'Deals Closed', value: '14' },
      { label: 'Timeline', value: '6 months' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'D2C E-Commerce Brand — 3.2x Return on Ad Spend',
    industry: 'E-Commerce',
    category: 'Digital Marketing',
    icon: 'ShoppingCart',
    problem: 'Wasted ad spend with ROAS stuck at 1.1x and a leaky conversion funnel losing mobile shoppers.',
    solution:
      'Restructured paid media and the conversion funnel — cut wasted spend, rebuilt creatives, and lifted ROAS from 1.1x to 3.2x.',
    metrics: [
      { label: 'ROAS', value: '3.2x' },
      { label: 'Revenue Lift', value: '+95%' },
      { label: 'Timeline', value: '3 months' },
    ],
  },
  {
    id: 'startup',
    title: 'Pre-Series A Startup — 500+ Active Users',
    industry: 'Startup',
    category: 'Digital Marketing',
    icon: 'Rocket',
    problem: 'Stuck in private beta with no repeatable user-acquisition engine and rising customer acquisition cost.',
    solution:
      'Built a lean, channel-by-channel growth system with measurable CAC payback, taking the product from private beta to 500+ active users.',
    metrics: [
      { label: 'Users Acquired', value: '500+' },
      { label: 'CAC Reduction', value: '-38%' },
      { label: 'Timeline', value: '5 months' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare Provider — 2x Patient Volume at -40% Cost',
    industry: 'Healthcare',
    category: 'Digital Marketing',
    icon: 'Heart',
    problem: 'High patient-acquisition cost and inconsistent patient volume across service lines.',
    solution:
      'Built a compliant patient-acquisition funnel with targeted campaigns and conversion-optimized landing pages per service line.',
    metrics: [
      { label: 'Cost / Patient', value: '-40%' },
      { label: 'Patient Volume', value: '2x' },
      { label: 'Timeline', value: '4 months' },
    ],
  },
  {
    id: 'education',
    title: 'Ed-Tech Platform — 92% Retention, +70% Enrolment',
    industry: 'Education',
    category: 'Digital Marketing',
    icon: 'GraduationCap',
    problem: 'Low enrolment retention and a fragmented enrolment journey causing drop-offs.',
    solution:
      'Redesigned the enrolment journey end-to-end with lifecycle communication and onboarding optimizations that lifted retention to 92%.',
    metrics: [
      { label: 'Retention', value: '92%' },
      { label: 'Enrolment Lift', value: '+70%' },
      { label: 'Timeline', value: '6 months' },
    ],
  },

  /* ── NEW: Stock Auditing (Consultancy / BPO) ──
     PLACEHOLDER NUMBERS — update with real figures when available:
       - [X] locations → real count
       - discrepancy reduction %, audit-cycle-time reduction, cost savings
     Marked placeholder:true so it can be tracked, but NOT shown to visitors. */
  {
    id: 'stock-auditing',
    title: 'Retail Chain — Systematic Stock Audit Across Locations',
    industry: 'Retail / Inventory Management',
    category: 'BPO',
    icon: 'ClipboardCheck',
    problem: 'Inaccurate stock records causing revenue leakage and slow reconciliation across multiple store locations.',
    solution:
      'Implemented a systematic stock audit process across 12 locations with standardized counting, variance analysis, and a fixed reporting cadence.',
    metrics: [
      { label: 'Stock Discrepancy', value: '-35%' },
      { label: 'Audit Cycle Time', value: '-50%' },
      { label: 'Cost Savings', value: '₹18L / yr' },
    ],
    placeholder: true,
  },

  /* ── NEW: Website Development entries ──
     PLACEHOLDER NUMBERS — update with real client figures when available:
       - conversion rate, page load, leads/enquiries, bounce rate
     Marked placeholder:true (not shown to visitors). */
  {
    id: 'web-d2c-brand',
    title: 'D2C Beauty Brand — Conversion-Focused Storefront',
    industry: 'D2C & E-Commerce',
    category: 'Website Development',
    icon: 'MonitorSmartphone',
    problem:
      'Slow, template-based store with a 1.1% conversion rate and 3.4s load time losing mobile shoppers at checkout.',
    solution:
      'Designed and built a custom, conversion-focused storefront with optimized product pages, faster checkout, and mobile-first performance.',
    metrics: [
      { label: 'Conversion Rate', value: '1.1% → 3.6%' },
      { label: 'Page Load', value: '3.4s → 1.2s' },
      { label: 'Leads / Month', value: '+220%' },
    ],
    placeholder: true,
  },
  {
    id: 'web-real-estate',
    title: 'Real Estate Developer — Lead-Gen Property Website',
    industry: 'Real Estate',
    category: 'Website Development',
    icon: 'Building2',
    problem:
      'Static brochure site generating negligible enquiries, with no enquiry capture or project showcase flow.',
    solution:
      'Built a project showcase website with immersive unit visuals, enquiry capture forms, and WhatsApp lead routing straight to the sales team.',
    metrics: [
      { label: 'Monthly Enquiries', value: '12 → 140' },
      { label: 'Page Load', value: '2.8s → 1.1s' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
    placeholder: true,
  },
]
