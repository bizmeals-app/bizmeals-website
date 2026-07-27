'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Briefcase,
  Factory,
  Building2,
  ShoppingCart,
  Rocket,
  Heart,
  GraduationCap,
  ClipboardCheck,
  MonitorSmartphone,
  MessagesSquare,
  Palette,
  Users,
  Presentation,
  Search,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  Target,
  Layers,
  Globe,
  Zap,
  Headphones,
  Handshake,
  Award,
  Stethoscope,
  Hotel,
  UtensilsCrossed,
  Store,
  Shirt,
  Gem,
  Banknote,
  Cpu,
  Car,
  Plane,
  HeartHandshake,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { usePage } from '@/components/bizmeals/page-context'
import { siteConfig } from '@/lib/site-config'

/* ════════════════════════════════════════════════════════════════════════
   DATA — all portfolio content lives locally (no site-config changes)
   ════════════════════════════════════════════════════════════════════════ */

type ServiceCategory =
  | 'Digital Marketing'
  | 'Website Development'
  | 'Branding & Design'
  | 'Business Consulting'
  | 'HR & Recruitment'
  | 'Corporate Training'
  | 'Business Audit'

interface CaseStudy {
  id: string
  title: string
  industry: string
  category: ServiceCategory
  icon: LucideIcon
  /** One-line business goal */
  goal: string
  problem: string
  solution: string
  services: string[]
  metrics: { label: string; value: string }[]
  tech?: string[]
  /** Featured stories get a full-detail modal */
  featured?: boolean
  challenges?: string
  outcome?: string
  testimonial?: { quote: string; name: string; role: string; company: string }
  gradientFromTo: string
}

const caseStudies: CaseStudy[] = [
  /* ── FEATURED (6 premium, full-detail) ── */
  {
    id: 'mfg-leads',
    title: 'B2B Manufacturer — +180% Qualified Leads',
    industry: 'Manufacturing',
    category: 'Digital Marketing',
    icon: Factory,
    goal: 'Replace declining cold outreach with a predictable inbound lead engine.',
    problem:
      'Reliance on cold outreach with diminishing returns, no inbound funnel, and weak lead qualification that wasted the sales team’s time.',
    challenges:
      'Long B2B sales cycles, a niche technical audience, no content assets, and a sales team flooded with unqualified inquiries that ate into selling time.',
    solution:
      'Rebuilt the lead engine around a targeted inbound funnel — SEO-led content, LinkedIn outbound, and a qualification framework that routed only sales-ready leads to the field team.',
    outcome:
      'A steady, predictable pipeline of qualified leads that let the sales team focus on closing instead of chasing. Inbound became the primary growth channel within two quarters.',
    services: ['SEO', 'Content Marketing', 'LinkedIn Outreach', 'Lead Qualification Framework', 'CRM Setup'],
    metrics: [
      { label: 'Lead Growth', value: '+180%' },
      { label: 'Cost / Lead', value: '-42%' },
      { label: 'Timeline', value: '4 months' },
      { label: 'Qualified Lead Share', value: '+65%' },
    ],
    tech: ['HubSpot CRM', 'Google Analytics', 'LinkedIn Sales Navigator'],
    testimonial: {
      quote:
        'BizMeals didn’t just run campaigns — they rebuilt how we find and qualify business. Our sales team finally spends time closing, not chasing dead leads.',
      name: 'Operations Head',
      role: 'Plant Director',
      company: 'Industrial Components Manufacturer',
    },
    featured: true,
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'realty-pipeline',
    title: 'Boutique Realty Firm — ₹2.4 Cr Sales Pipeline',
    industry: 'Real Estate',
    category: 'Business Consulting',
    icon: Building2,
    goal: 'Build a differentiated market position and a systematic buyer pipeline.',
    problem:
      'No differentiated market positioning and no systematic buyer pipeline; relying on walk-ins and referrals alone.',
    challenges:
      'A crowded local market dominated by large developers, no brand differentiation, and no way to nurture high-intent buyers over a long purchase cycle.',
    solution:
      'Positioned the firm with data-driven market insights and built a high-intent buyer funnel combining targeted outreach and consultative selling.',
    outcome:
      'A premium brand position that competes with larger developers, and a pipeline that converts referrals and outreach into confirmed site visits and bookings.',
    services: ['Market Positioning', 'Buyer Funnel Design', 'Sales Process Consulting', 'Lead Nurturing'],
    metrics: [
      { label: 'Pipeline Value', value: '₹2.4 Cr' },
      { label: 'Deals Closed', value: '14' },
      { label: 'Timeline', value: '6 months' },
      { label: 'Site Visit → Booking', value: '+58%' },
    ],
    testimonial: {
      quote:
        'We stopped competing on price and started competing on value. The pipeline BizMeals built is the most predictable we’ve ever had.',
      name: 'Managing Director',
      role: 'Founder',
      company: 'Boutique Realty Firm',
    },
    featured: true,
    gradientFromTo: 'from-[#F5A623] to-[#D88A0E]',
  },
  {
    id: 'd2c-roas',
    title: 'D2C Beauty Brand — 3.2x Return on Ad Spend',
    industry: 'E-Commerce',
    category: 'Digital Marketing',
    icon: ShoppingCart,
    goal: 'Turn around wasted ad spend and fix a leaky conversion funnel.',
    problem: 'Wasted ad spend with ROAS stuck at 1.1x and a leaky conversion funnel losing mobile shoppers.',
    challenges:
      'Low-margin products, heavy competition from established D2C brands, and a checkout flow that lost the majority of mobile traffic.',
    solution:
      'Restructured paid media and the conversion funnel — cut wasted spend, rebuilt creatives, and lifted ROAS from 1.1x to 3.2x.',
    outcome:
      'Profitable paid acquisition at scale, a mobile checkout that converts, and a creative testing system that keeps performance climbing.',
    services: ['Paid Media (Meta + Google)', 'Conversion Rate Optimization', 'Creative Strategy', 'Funnel Rebuild'],
    metrics: [
      { label: 'ROAS', value: '3.2x' },
      { label: 'Revenue Lift', value: '+95%' },
      { label: 'Timeline', value: '3 months' },
      { label: 'Mobile Conversion', value: '+140%' },
    ],
    tech: ['Meta Ads', 'Google Ads', 'Shopify', 'Klaviyo'],
    testimonial: {
      quote:
        'We went from barely breaking even on ads to a profitable, scalable engine. BizMeals treated our ROAS like their own revenue.',
      name: 'Founder',
      role: 'CEO',
      company: 'D2C Beauty Brand',
    },
    featured: true,
    gradientFromTo: 'from-[#1E3A8A] to-[#0F2557]',
  },
  {
    id: 'healthcare-volume',
    title: 'Healthcare Chain — 2x Patient Volume at -40% Cost',
    industry: 'Healthcare',
    category: 'Digital Marketing',
    icon: Heart,
    goal: 'Reduce patient-acquisition cost and stabilise volume across service lines.',
    problem: 'High patient-acquisition cost and inconsistent patient volume across service lines.',
    challenges:
      'Strict healthcare compliance rules, multiple service lines each needing its own funnel, and heavy competition from established hospital chains.',
    solution:
      'Built a compliant patient-acquisition funnel with targeted campaigns and conversion-optimized landing pages per service line.',
    outcome:
      'Stable, compliant patient flow across all service lines, with acquisition costs low enough to scale marketing confidently.',
    services: ['Healthcare SEO', 'Local Search', 'Paid Acquisition', 'Landing Page Design', 'Appointment Funnel'],
    metrics: [
      { label: 'Cost / Patient', value: '-40%' },
      { label: 'Patient Volume', value: '2x' },
      { label: 'Timeline', value: '4 months' },
      { label: 'Appointment Show Rate', value: '+32%' },
    ],
    testimonial: {
      quote:
        'Patient volume is finally predictable. The compliance-sensitive approach gave our clinical team confidence to scale marketing.',
      name: 'Medical Director',
      role: 'Clinical Head',
      company: 'Multi-Speciality Clinic Chain',
    },
    featured: true,
    gradientFromTo: 'from-[#F5A623] to-[#0F2557]',
  },
  {
    id: 'edtech-retention',
    title: 'Ed-Tech Platform — 92% Retention, +70% Enrolment',
    industry: 'Education',
    category: 'Digital Marketing',
    icon: GraduationCap,
    goal: 'Fix enrolment drop-offs and lift learner retention.',
    problem: 'Low enrolment retention and a fragmented enrolment journey causing drop-offs.',
    challenges:
      'A long decision cycle for parents, confusing course options, and no lifecycle communication to keep enrolled learners engaged.',
    solution:
      'Redesigned the enrolment journey end-to-end with lifecycle communication and onboarding optimizations that lifted retention to 92%.',
    outcome:
      'A smooth enrolment journey that converts, and an onboarding experience that keeps learners — and their parents — engaged long term.',
    services: ['Lifecycle Marketing', 'Onboarding Design', 'Email & WhatsApp Nurturing', 'Conversion Optimization'],
    metrics: [
      { label: 'Retention', value: '92%' },
      { label: 'Enrolment Lift', value: '+70%' },
      { label: 'Timeline', value: '6 months' },
      { label: 'Drop-off Rate', value: '-54%' },
    ],
    testimonial: {
      quote:
        'Retention is the hardest metric in ed-tech. BizMeals rebuilt our entire learner journey — and the retention numbers speak for themselves.',
      name: 'Co-Founder',
      role: 'Head of Growth',
      company: 'Ed-Tech Platform',
    },
    featured: true,
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'stock-audit',
    title: 'Retail Chain — Systematic Stock Audit Across 12 Locations',
    industry: 'Retail',
    category: 'Business Audit',
    icon: ClipboardCheck,
    goal: 'Eliminate stock leakage and cut reconciliation time across all stores.',
    problem: 'Inaccurate stock records causing revenue leakage and slow reconciliation across multiple store locations.',
    challenges:
      'Inconsistent counting methods across stores, no fixed audit cadence, and variance reports that nobody acted on.',
    solution:
      'Implemented a systematic stock audit process across 12 locations with standardized counting, variance analysis, and a fixed reporting cadence.',
    outcome:
      'Clean, trustworthy stock records, a repeatable audit process, and clear accountability for variance at every store.',
    services: ['Stock Audit', 'Process Standardization', 'Variance Analysis', 'Reporting Framework'],
    metrics: [
      { label: 'Stock Discrepancy', value: '-35%' },
      { label: 'Audit Cycle Time', value: '-50%' },
      { label: 'Cost Savings', value: '₹18L / yr' },
      { label: 'Locations Audited', value: '12' },
    ],
    testimonial: {
      quote:
        'For the first time, our stock numbers actually match. The audit discipline BizMeals brought in pays for itself every month.',
      name: 'Operations Manager',
      role: 'Retail Operations Head',
      company: 'Multi-Location Retail Chain',
    },
    featured: true,
    gradientFromTo: 'from-[#1E3A8A] to-[#F5A623]',
  },

  /* ── Additional grid case studies (concise) ── */
  {
    id: 'startup-growth',
    title: 'Pre-Series A Startup — 500+ Active Users',
    industry: 'Startup',
    category: 'Digital Marketing',
    icon: Rocket,
    goal: 'Build a repeatable, profitable user-acquisition engine post-beta.',
    problem: 'Stuck in private beta with no repeatable user-acquisition engine and rising customer acquisition cost.',
    solution:
      'Built a lean, channel-by-channel growth system with measurable CAC payback, taking the product from private beta to 500+ active users.',
    services: ['Growth Strategy', 'Paid Acquisition', 'Referral Program', 'Analytics'],
    metrics: [
      { label: 'Users Acquired', value: '500+' },
      { label: 'CAC Reduction', value: '-38%' },
      { label: 'Timeline', value: '5 months' },
    ],
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'web-realty',
    title: 'Real Estate Developer — Lead-Gen Property Website',
    industry: 'Real Estate',
    category: 'Website Development',
    icon: Building2,
    goal: 'Turn a static brochure site into a lead-generation machine.',
    problem:
      'Static brochure site generating negligible enquiries, with no enquiry capture or project showcase flow.',
    solution:
      'Built a project showcase website with immersive unit visuals, enquiry capture forms, and WhatsApp lead routing straight to the sales team.',
    services: ['Website Design', 'Development', 'Lead Capture', 'WhatsApp Integration'],
    metrics: [
      { label: 'Monthly Enquiries', value: '12 → 140' },
      { label: 'Page Load', value: '2.8s → 1.1s' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
    tech: ['Next.js', 'Tailwind CSS', 'WhatsApp API'],
    gradientFromTo: 'from-[#F5A623] to-[#D88A0E]',
  },
  {
    id: 'web-d2c',
    title: 'D2C Storefront — 1.1% → 3.6% Conversion',
    industry: 'E-Commerce',
    category: 'Website Development',
    icon: MonitorSmartphone,
    goal: 'Replace a slow template store with a conversion-focused storefront.',
    problem:
      'Slow, template-based store with a 1.1% conversion rate and 3.4s load time losing mobile shoppers at checkout.',
    solution:
      'Designed and built a custom, conversion-focused storefront with optimized product pages, faster checkout, and mobile-first performance.',
    services: ['E-Commerce Design', 'Development', 'CRO', 'Performance Engineering'],
    metrics: [
      { label: 'Conversion Rate', value: '1.1% → 3.6%' },
      { label: 'Page Load', value: '3.4s → 1.2s' },
      { label: 'Leads / Month', value: '+220%' },
    ],
    tech: ['Shopify', 'Klaviyo', 'Custom Theme'],
    gradientFromTo: 'from-[#1E3A8A] to-[#0F2557]',
  },
  {
    id: 'web-corporate',
    title: 'Corporate Website — Manufacturing Firm',
    industry: 'Manufacturing',
    category: 'Website Development',
    icon: Factory,
    goal: 'Establish credibility and capture B2B enquiries for a manufacturing business.',
    problem: 'Outdated website undermining credibility and generating no enquiries from international buyers.',
    solution:
      'Built a fast, professional corporate website with product catalogues, capability sheets, and multilingual enquiry routing for global buyers.',
    services: ['Corporate Website', 'CMS', 'SEO Foundation', 'Enquiry Routing'],
    metrics: [
      { label: 'Enquiries / Mo', value: '0 → 35' },
      { label: 'Avg. Session', value: '+88%' },
      { label: 'Load Time', value: '1.3s' },
    ],
    tech: ['Next.js', 'Headless CMS'],
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'restaurant-local',
    title: 'Restaurant Chain — 3x Footfall via Local SEO + Ads',
    industry: 'Restaurants',
    category: 'Digital Marketing',
    icon: UtensilsCrossed,
    goal: 'Drive consistent footfall across multiple outlet locations.',
    problem: 'Inconsistent footfall across outlets and invisible on local “near me” searches.',
    solution:
      'Optimised Google Business Profiles for every outlet, ran hyper-local ads, and built a review-generation system that lifted local rankings.',
    services: ['Local SEO', 'Google Business Profile', 'Hyper-Local Ads', 'Review Management'],
    metrics: [
      { label: 'Footfall', value: '3x' },
      { label: '“Near Me” Calls', value: '+210%' },
      { label: 'Rating', value: '4.8★' },
    ],
    gradientFromTo: 'from-[#F5A623] to-[#0F2557]',
  },
  {
    id: 'brand-startup',
    title: 'Startup Brand Identity — Logo & Guidelines',
    industry: 'Startup',
    category: 'Branding & Design',
    icon: Palette,
    goal: 'Launch a new brand with a complete, consistent identity system.',
    problem: 'No cohesive brand identity; inconsistent logos, colours, and tone across every touchpoint.',
    solution:
      'Designed a complete brand identity — logo system, colour palette, typography, and brand guidelines — with social and stationery templates.',
    services: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Template Kit'],
    metrics: [
      { label: 'Brand Assets', value: '40+' },
      { label: 'Time to Launch', value: '-60%' },
      { label: 'Brand Consistency', value: '100%' },
    ],
    gradientFromTo: 'from-[#F5A623] to-[#D88A0E]',
  },
  {
    id: 'brand-restaurant',
    title: 'Restaurant — Menu, Brand & Social Creatives',
    industry: 'Restaurants',
    category: 'Branding & Design',
    icon: Palette,
    goal: 'Create an appetising, consistent brand across menu, in-store, and social.',
    problem: 'Amateur menu design and inconsistent social presence failing to attract a premium audience.',
    solution:
      'Redesigned the menu and brand visuals, and built a library of social creative templates the team could reuse weekly.',
    services: ['Menu Design', 'Brand Refresh', 'Social Creatives', 'Photography Direction'],
    metrics: [
      { label: 'Social Engagement', value: '+165%' },
      { label: 'Avg. Order Value', value: '+18%' },
      { label: 'Creative Output', value: '4x / week' },
    ],
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'consulting-pitchdeck',
    title: 'Startup — Pitch Deck & Investor Readiness',
    industry: 'Startup',
    category: 'Business Consulting',
    icon: Briefcase,
    goal: 'Get a startup raise-ready with a clear story and a defensible plan.',
    problem: 'No structured pitch or financial narrative that could survive investor scrutiny.',
    solution:
      'Built a pitch deck, financial model, and investor Q&A pack — and coached the founders through 12 investor meetings.',
    services: ['Pitch Deck', 'Financial Model', 'Investor Readiness', 'Founder Coaching'],
    metrics: [
      { label: 'Investor Meetings', value: '12' },
      { label: 'Term Sheets', value: '3' },
      { label: 'Timeline', value: '8 weeks' },
    ],
    gradientFromTo: 'from-[#1E3A8A] to-[#0F2557]',
  },
  {
    id: 'hr-bulk-hiring',
    title: 'Manufacturing Plant — Bulk Hiring, 40 Roles',
    industry: 'Manufacturing',
    category: 'HR & Recruitment',
    icon: Users,
    goal: 'Staff up a new production line within a tight go-live deadline.',
    problem: 'Urgent need to hire 40 verified operators and supervisors for a new line, with no recruitment process in place.',
    solution:
      'Ran a structured bulk-hiring drive — sourcing, screening, background checks, and onboarding — with a dedicated recruitment coordinator.',
    services: ['Bulk Hiring', 'Screening & Verification', 'Onboarding', 'Recruitment Process Setup'],
    metrics: [
      { label: 'Positions Filled', value: '40' },
      { label: 'Time to Hire', value: '6 weeks' },
      { label: '30-Day Retention', value: '94%' },
    ],
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'hr-core-team',
    title: 'Tech Startup — Core Team Building',
    industry: 'Startup',
    category: 'HR & Recruitment',
    icon: Users,
    goal: 'Build the founding engineering and growth team for a seed-stage startup.',
    problem: 'Slow, unstructured hiring burning runway and losing top candidates to bigger startups.',
    solution:
      'Set up a lean recruitment process with role scorecards, structured interviews, and a candidate experience that closed senior offers fast.',
    services: ['Talent Acquisition', 'HR Process Setup', 'Interview Framework', 'Offer Negotiation'],
    metrics: [
      { label: 'Core Hires', value: '8' },
      { label: 'Avg. Time to Offer', value: '18 days' },
      { label: 'Offer Acceptance', value: '88%' },
    ],
    gradientFromTo: 'from-[#F5A623] to-[#0F2557]',
  },
  {
    id: 'training-sales',
    title: 'Corporate Sales Training — B2B Field Team',
    industry: 'Professional Services',
    category: 'Corporate Training',
    icon: Presentation,
    goal: 'Lift the close rate of a 25-person B2B field sales team.',
    problem: 'Inconsistent selling skills across the team and no shared sales playbook.',
    solution:
      'Delivered a 6-week sales training program — discovery, objection handling, and closing — with role-play assessments and a reusable playbook.',
    services: ['Sales Training', 'Playbook Creation', 'Role-Play Assessment', 'Coaching'],
    metrics: [
      { label: 'Close Rate', value: '+34%' },
      { label: 'Avg. Deal Size', value: '+22%' },
      { label: 'Attendees', value: '25' },
    ],
    gradientFromTo: 'from-[#1E3A8A] to-[#F5A623]',
  },
  {
    id: 'training-digital',
    title: 'Digital Marketing Workshop — SME Founders',
    industry: 'Professional Services',
    category: 'Corporate Training',
    icon: Presentation,
    goal: 'Equip SME founders to run their own basic digital marketing.',
    problem: 'Founders dependent on external agencies with no understanding of what they were paying for.',
    solution:
      'Ran a hands-on 2-day workshop covering SEO, paid ads, and analytics — each founder left with a 30-day action plan for their business.',
    services: ['Digital Marketing Workshop', 'Hands-on Labs', 'Action Plan', 'Follow-up Q&A'],
    metrics: [
      { label: 'Founders Trained', value: '32' },
      { label: 'Avg. Rating', value: '4.9 / 5' },
      { label: 'Action Plans', value: '32' },
    ],
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
  },
  {
    id: 'audit-web-seo',
    title: 'E-Commerce — Website & SEO Audit',
    industry: 'E-Commerce',
    category: 'Business Audit',
    icon: Search,
    goal: 'Find out why a thriving store was losing organic traffic.',
    problem: 'Sudden 40% drop in organic traffic with no clear cause identified internally.',
    solution:
      'Ran a full technical SEO and website audit — found indexation issues, slow pages, and broken redirects — with a prioritised fix plan.',
    services: ['Technical SEO Audit', 'Website Audit', 'Performance Audit', 'Fix Roadmap'],
    metrics: [
      { label: 'Traffic Recovered', value: '+47%' },
      { label: 'Critical Fixes', value: '18' },
      { label: 'Page Load', value: '-45%' },
    ],
    gradientFromTo: 'from-[#F5A623] to-[#D88A0E]',
  },
]

const serviceFilters: ('All' | ServiceCategory)[] = [
  'All',
  'Digital Marketing',
  'Website Development',
  'Branding & Design',
  'Business Consulting',
  'HR & Recruitment',
  'Corporate Training',
  'Business Audit',
]

const heroStats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 18, suffix: '+', label: 'Industries Served' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const industries: { name: string; icon: LucideIcon }[] = [
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Education', icon: GraduationCap },
  { name: 'Real Estate', icon: Building2 },
  { name: 'Construction', icon: Wrench },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Hotels', icon: Hotel },
  { name: 'Restaurants', icon: UtensilsCrossed },
  { name: 'Retail', icon: Store },
  { name: 'Fashion', icon: Shirt },
  { name: 'Jewellery', icon: Gem },
  { name: 'Finance', icon: Banknote },
  { name: 'Technology', icon: Cpu },
  { name: 'Automobile', icon: Car },
  { name: 'Travel', icon: Plane },
  { name: 'NGOs', icon: HeartHandshake },
  { name: 'Startups', icon: Rocket },
  { name: 'Professional Services', icon: Briefcase },
  { name: 'E-Commerce', icon: ShoppingCart },
]

const whyChooseUs: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: 'Premium UI Design', desc: 'Pixel-perfect, brand-led interfaces that feel expensive.', icon: Palette },
  { title: 'Business-First Strategy', desc: 'Every decision tied to a business outcome — not vanity metrics.', icon: Target },
  { title: 'SEO Ready', desc: 'Built to rank from day one, not bolted on later.', icon: Search },
  { title: 'Performance Optimised', desc: 'Sub-2s loads, high scores, happy users.', icon: Zap },
  { title: 'AI Ready', desc: 'Automation and AI baked into workflows, where it counts.', icon: Cpu },
  { title: 'Business Consulting', desc: 'Strategy, planning, and execution — not just delivery.', icon: Briefcase },
  { title: 'Dedicated Support', desc: 'A real partner who picks up the phone, long after launch.', icon: Headphones },
  { title: 'Transparent Communication', desc: 'Clear scopes, honest timelines, no surprises.', icon: MessagesSquare },
  { title: 'Long-Term Partnership', desc: 'We grow with you — most clients stay for years.', icon: Handshake },
  { title: 'Scalable Solutions', desc: 'Built to grow from your first customer to your millionth.', icon: Layers },
]

const testimonials: {
  initials: string
  name: string
  role: string
  company: string
  industry: string
  rating: number
  review: string
}[] = [
  {
    initials: 'DR',
    name: 'Dr. Ramesh K.',
    role: 'Medical Director',
    company: 'Multi-Speciality Clinic',
    industry: 'Healthcare',
    rating: 5,
    review:
      'BizMeals rebuilt our patient-acquisition funnel end to end. We doubled patient volume while cutting acquisition cost by 40% — all fully compliant. They act like a growth partner, not a vendor.',
  },
  {
    initials: 'RS',
    name: 'Ravi S.',
    role: 'Owner',
    company: 'Restaurant Chain',
    industry: 'Restaurants',
    rating: 5,
    review:
      'Footfall tripled across our outlets after the local SEO and ads work. Our Google rating is now 4.8 and “near me” calls just keep growing. Genuine, hardworking team.',
  },
  {
    initials: 'AP',
    name: 'Anita P.',
    role: 'Managing Director',
    company: 'Realty Firm',
    industry: 'Real Estate',
    rating: 5,
    review:
      'We finally have a premium brand position and a predictable sales pipeline. BizMeals built the entire buyer journey — from positioning to closing. Worth every rupee.',
  },
  {
    initials: 'MK',
    name: 'Mohan K.',
    role: 'Plant Head',
    company: 'Industrial Components',
    industry: 'Manufacturing',
    rating: 5,
    review:
      'Qualified leads up 180%, cost per lead down 42%. The sales team finally sells instead of chasing dead leads. They also staffed our new line in 6 weeks. Outstanding.',
  },
  {
    initials: 'SJ',
    name: 'Sneha J.',
    role: 'Co-Founder',
    company: 'D2C Beauty Brand',
    industry: 'E-Commerce',
    rating: 5,
    review:
      'We went from 1.1x to 3.2x ROAS in one quarter. The new storefront converts beautifully on mobile. BizMeals treats our numbers like their own revenue.',
  },
  {
    initials: 'VG',
    name: 'Vikram G.',
    role: 'Founder',
    company: 'Ed-Tech Platform',
    industry: 'Education',
    rating: 5,
    review:
      'Retention is the hardest metric in ed-tech. BizMeals rebuilt our learner journey and took retention to 92%. Enrolments up 70%. Could not recommend them more.',
  },
]


/* ════════════════════════════════════════════════════════════════════════
   SMALL HELPERS
   ════════════════════════════════════════════════════════════════════════ */

/* Lightweight count-up that fires when scrolled into view */
function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, inView, duration])
  return val
}

function SectionBadge({ children, variant = 'orange' }: { children: React.ReactNode; variant?: 'orange' | 'muted' }) {
  const cls =
    variant === 'orange'
      ? 'bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]'
      : 'bg-[#EEF2FA] border-[#D5DEEE] text-[#0F2557]'
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-wide uppercase ${cls}`}>
      {children}
    </span>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO + ANIMATED STATISTICS
   ════════════════════════════════════════════════════════════════════════ */
function PortfolioHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden" aria-label="Portfolio">
      <div className="absolute inset-0 bg-navy-section" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#1E3A8A]/40 blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F5A623] text-xs font-bold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Portfolio
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
          Our Work, Success Stories &amp; <span className="text-[#F5A623]">Business Transformations</span>
        </h1>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Helping businesses grow through Websites, Branding, Digital Marketing, Business Consulting,
          HR Solutions, Training Programs, Business Audits, Automation, and Technology.
        </p>
      </motion.div>

      {/* Animated statistics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-10 md:mt-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {heroStats.map((s, i) => (
            <HeroStat key={s.label} target={s.value} suffix={s.suffix} label={s.label} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroStat({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const val = useCountUp(target, isInView)
  const display = Number.isInteger(target) ? Math.round(val) : val.toFixed(1)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm py-4 px-2"
    >
      <div className="text-2xl md:text-3xl font-black text-[#F5A623] leading-tight">
        {display}
        {suffix}
      </div>
      <div className="text-[10px] md:text-[11px] text-white/60 uppercase tracking-wider font-semibold mt-1">
        {label}
      </div>
    </motion.div>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 2 — FEATURED SUCCESS STORIES (rich cards → detail modal)
   ════════════════════════════════════════════════════════════════════════ */
function FeaturedStories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selected, setSelected] = useState<CaseStudy | null>(null)
  const featured = caseStudies.filter((c) => c.featured)

  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]" aria-label="Featured success stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <SectionBadge>
            <Sparkles className="w-3.5 h-3.5" />
            Featured Success Stories
          </SectionBadge>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mt-4 mb-3 leading-tight">
            Business Transformations, <span className="text-[#F5A623]">Not Just Projects</span>
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            A closer look at engagements where strategy, execution, and measurable outcomes came together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((cs, i) => (
            <FeaturedCard key={cs.id} cs={cs} delay={i * 0.07} onOpen={() => setSelected(cs)} />
          ))}
        </div>
      </div>

      <StoryModal cs={selected} open={!!selected} onOpenChange={(v) => !v && setSelected(null)} />
    </section>
  )
}

function FeaturedCard({ cs, delay, onOpen }: { cs: CaseStudy; delay: number; onOpen: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const Icon = cs.icon

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card rounded-2xl card-hover relative overflow-hidden flex flex-col"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cs.gradientFromTo}`} />

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cs.gradientFromTo} flex items-center justify-center shrink-0 shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#D5DEEE]">
            {cs.industry}
          </span>
        </div>

        <h3 className="text-base md:text-lg font-bold text-[#0F2557] mb-2 leading-snug">{cs.title}</h3>
        <p className="text-xs text-[#5A6478] uppercase tracking-wide font-semibold mb-3">{cs.category}</p>

        {/* Goal */}
        <div className="mb-3">
          <div className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-1 flex items-center gap-1">
            <Target className="w-3 h-3 text-[#F5A623]" />
            Business Goal
          </div>
          <p className="text-[13px] text-[#1A1A1A] leading-relaxed">{cs.goal}</p>
        </div>

        {/* Solution highlight */}
        <div className="mb-4 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#0F2557]" />
            Our Solution
          </div>
          <p className="text-[13px] text-[#1A1A1A] leading-relaxed line-clamp-3">{cs.solution}</p>
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E5E9F0] mb-4">
          {cs.metrics.slice(0, 4).map((m) => (
            <div key={m.label} className="rounded-lg bg-[#EEF2FA]/60 px-2.5 py-2">
              <div className="text-sm md:text-base font-black text-[#1E3A8A] leading-tight">{m.value}</div>
              <div className="text-[9px] text-[#5A6478] uppercase tracking-wide leading-tight mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onOpen}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#F5A623] hover:gap-2.5 transition-all cursor-pointer"
        >
          Read Full Story
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  )
}

function StoryModal({ cs, open, onOpenChange }: { cs: CaseStudy | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!cs) return null
  const Icon = cs.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        <DialogTitle className="sr-only">{cs.title} — Case Study</DialogTitle>
        <DialogDescription className="sr-only">{cs.goal}</DialogDescription>

        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}>
          <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#F5A623]/12 blur-3xl pointer-events-none" />
          <div className="relative z-10 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cs.gradientFromTo} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{cs.title}</h2>
                </div>
                <p className="text-[10px] text-[#F5A623] font-bold uppercase tracking-wider mb-2">{cs.category} · {cs.industry}</p>
                <p className="text-sm text-white/80 leading-relaxed">{cs.goal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 flex flex-col gap-6">
          {cs.challenges && (
            <section>
              <ModalLabel icon={Target} label="Challenges" tone="rose" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{cs.challenges}</p>
            </section>
          )}
          <section>
            <ModalLabel icon={CheckCircle2} label="Our Solution" tone="emerald" />
            <p className="text-[13px] text-foreground/90 leading-relaxed font-medium">{cs.solution}</p>
          </section>
          {cs.outcome && (
            <section>
              <ModalLabel icon={TrendingUp} label="Business Outcome" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{cs.outcome}</p>
            </section>
          )}

          {/* Services */}
          <section>
            <ModalLabel icon={Layers} label="Services Delivered" />
            <div className="flex flex-wrap gap-2">
              {cs.services.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EEF2FA] text-[#0F2557] border border-[#D5DEEE]">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Tech */}
          {cs.tech && cs.tech.length > 0 && (
            <section>
              <ModalLabel icon={Cpu} label="Technologies Used" />
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/25">
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Impact metrics */}
          <section className="grid grid-cols-2 gap-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-[#F5A623]/25 bg-[#F5A623]/5 p-3.5">
                <div className="text-lg font-black text-[#0F2557] leading-tight">{m.value}</div>
                <div className="text-[10px] text-[#5A6478] uppercase tracking-wide mt-0.5">{m.label}</div>
              </div>
            ))}
          </section>

          {/* Testimonial */}
          {cs.testimonial && (
            <section className="rounded-xl bg-muted/40 border border-border/50 p-4">
              <Quote className="w-5 h-5 text-[#F5A623] mb-2" />
              <p className="text-[13px] text-foreground/80 italic leading-relaxed mb-3">&ldquo;{cs.testimonial.quote}&rdquo;</p>
              <div className="text-[11px] font-bold text-[#0F2557]">{cs.testimonial.name}</div>
              <div className="text-[10px] text-muted-foreground">{cs.testimonial.role}, {cs.testimonial.company}</div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ModalLabel({ icon: Icon, label, tone = 'default' }: { icon: LucideIcon; label: string; tone?: 'default' | 'rose' | 'emerald' }) {
  const color = tone === 'rose' ? 'text-rose-500' : tone === 'emerald' ? 'text-emerald-600' : 'text-[#F5A623]'
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/70">{label}</span>
    </div>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 3 — SERVICE-LINE PORTFOLIO (filterable grid, no direct links)
   ════════════════════════════════════════════════════════════════════════ */
function ServicePortfolio() {
  const [filter, setFilter] = useState<'All' | ServiceCategory>('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  const filtered = useMemo(
    () => (filter === 'All' ? caseStudies : caseStudies.filter((c) => c.category === filter)),
    [filter]
  )

  return (
    <section className="py-16 md:py-24 bg-white" aria-label="Service portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <SectionBadge variant="muted">
            <Briefcase className="w-3.5 h-3.5" />
            Complete Service Portfolio
          </SectionBadge>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mt-4 mb-3 leading-tight">
            One Partner, <span className="text-[#F5A623]">Every Growth Capability</span>
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Filter by service line to see how we deliver across Technology, Marketing, Consulting,
            Branding, HR, Training, and Audits.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-14" role="tablist" aria-label="Filter by service line">
          {serviceFilters.map((f) => {
            const active = f === filter
            const count = f === 'All' ? caseStudies.length : caseStudies.filter((c) => c.category === f).length
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer border ${
                  active
                    ? 'bg-[#0F2557] text-white border-[#0F2557] shadow-md shadow-[#0F2557]/20'
                    : 'bg-white text-[#5A6478] border-[#E5E9F0] hover:border-[#0F2557]/40 hover:text-[#0F2557]'
                }`}
              >
                {f}
                <span className={`ml-1.5 text-[10px] ${active ? 'text-white/60' : 'text-[#5A6478]/60'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((cs, i) => (
              <CaseCard key={cs.id} cs={cs} delay={i * 0.05} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function CaseCard({ cs, delay }: { cs: CaseStudy; delay: number }) {
  const Icon = cs.icon
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="glass-card rounded-2xl p-5 md:p-6 card-hover relative overflow-hidden flex flex-col"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cs.gradientFromTo} opacity-80`} />

      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FA] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#0F2557]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#D5DEEE]">
          {cs.category}
        </span>
      </div>

      <h3 className="text-base font-bold text-[#0F2557] mb-1 leading-snug">{cs.title}</h3>
      <div className="text-[11px] font-semibold text-[#5A6478] uppercase tracking-wide mb-4">{cs.industry}</div>

      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
          Challenge
        </div>
        <p className="text-[13px] text-[#1A1A1A] leading-relaxed line-clamp-3">{cs.problem}</p>
      </div>

      <div className="mb-4 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-1 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#0F2557]" />
          Solution
        </div>
        <p className="text-[13px] text-[#1A1A1A] leading-relaxed line-clamp-3">{cs.solution}</p>
      </div>

      {/* Services chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cs.services.slice(0, 3).map((s) => (
          <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0F2557]/5 text-[#0F2557] border border-[#0F2557]/10">
            {s}
          </span>
        ))}
        {cs.services.length > 3 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#5A6478]">+{cs.services.length - 3}</span>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5E9F0] mt-auto">
        {cs.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <div className="text-sm md:text-base font-black text-[#1E3A8A] leading-tight">{m.value}</div>
            <div className="text-[9px] text-[#5A6478] uppercase tracking-wide leading-tight mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.article>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 4 — INDUSTRIES WE SERVE
   ════════════════════════════════════════════════════════════════════════ */
function IndustriesWeServe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA]" aria-label="Industries we serve">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <SectionBadge variant="muted">
            <Globe className="w-3.5 h-3.5" />
            Industries We Serve
          </SectionBadge>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mt-4 mb-3 leading-tight">
            Deep Experience Across <span className="text-[#F5A623]">18+ Industries</span>
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            We speak the language of your industry — its buyers, its margins, and its growth levers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="glass-card rounded-xl p-4 card-hover flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FA] flex items-center justify-center mb-2 group-hover:bg-[#F5A623]/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#0F2557] group-hover:text-[#F5A623] transition-colors" />
                </div>
                <div className="text-[12px] font-bold text-[#0F2557] leading-tight">{ind.name}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 5 — WHY BUSINESSES CHOOSE US
   ════════════════════════════════════════════════════════════════════════ */
function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Why businesses choose us">
      <div className="absolute inset-0 bg-navy-section" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-[#1E3A8A]/40 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F5A623] text-xs font-bold tracking-wide uppercase mb-6">
            <Award className="w-3.5 h-3.5" />
            Why Businesses Choose Us
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
            A Partner Built for <span className="text-[#F5A623]">Long-Term Growth</span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Not an agency that ships and disappears — a growth partner that stays accountable to your numbers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {whyChooseUs.map((w, i) => {
            const Icon = w.icon
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 5) * 0.06 }}
                className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 hover:bg-white/10 hover:border-[#F5A623]/30 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F5A623]/15 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#F5A623]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-tight">{w.title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed">{w.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 6 — CLIENT TESTIMONIALS (Google-review style)
   ════════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-16 md:py-24 bg-white" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <SectionBadge variant="muted">
            <Star className="w-3.5 h-3.5" />
            Client Testimonials
          </SectionBadge>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mt-4 mb-3 leading-tight">
            Trusted by Founders &amp; <span className="text-[#F5A623]">Business Owners</span>
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Real reviews from the people we work with — across healthcare, real estate, manufacturing, restaurants, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="glass-card rounded-2xl p-5 md:p-6 card-hover relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5A623] to-[#D88A0E]" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center text-white font-black text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F2557] leading-tight">{t.name}</div>
                    <div className="text-[11px] text-[#5A6478]">{t.role}</div>
                  </div>
                </div>
                {/* 5-star */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
                  ))}
                </div>
              </div>
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#E5E9F0]">
                <Building2 className="w-3.5 h-3.5 text-[#5A6478]" />
                <span className="text-[11px] font-semibold text-[#5A6478]">{t.company}</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#D5DEEE]">
                  {t.industry}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   SECTION 7 — FINAL CTA (kept consistent with the existing site)
   ════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Start your project">
      <div className="absolute inset-0 bg-navy-section" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F5A623]/6 blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Want your numbers here next?
        </h2>
        <p className="text-lg text-white/70 mt-4 max-w-2xl mx-auto">
          Get a free, no-obligation growth plan tailored to your business — across
          marketing, websites, branding, consulting, HR, training, or audits.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="btn-cta border-0 cursor-pointer font-bold text-sm px-7 py-6 h-auto"
          >
            Get Free Growth Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}


/* ════════════════════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ════════════════════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  return (
    <>
      <PortfolioHeader />
      <FeaturedStories />
      <ServicePortfolio />
      <IndustriesWeServe />
      <WhyChooseUs />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
