'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Plane,
  Users,
  ShieldCheck,
  Car,
  Home,
  Sparkles,
  CheckCircle2,
  FlaskConical,
  Soup,
  Target,
  TrendingUp,
  IndianRupee,
  Handshake,
  MapPin,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { usePage } from '@/components/bizmeals/page-context'
import AnimatedSection, {
  SectionBadge,
} from '@/components/bizmeals/animated-section'

/* ═══════════════════════════════════════════════════════════════════
   DATA — each project is a full startup pitch
   ═══════════════════════════════════════════════════════════════════ */

interface RoadmapPhase {
  phase: string
  timeline: string
  milestones: string[]
}

interface PitchProject {
  id: string
  icon: React.ElementType
  title: string
  tagline: string
  category: string
  problem: string
  solution: string
  market: string
  businessModel: string
  roadmap: RoadmapPhase[]
  ask: string
  partnerFit: string
  status: 'Concept' | 'Planning' | 'In Progress'
  vision: string
  /** Short raise tag for the card e.g. "₹40–60L Seed" */
  raiseTag: string
  /** Short seeking tag for the card e.g. "Investors & F&B Partners" */
  seekingTag: string
  featured?: boolean
  gradientFromTo: string
  iconColor: string
  iconBg: string
  borderColor: string
  statusColor: string
  statusBg: string
}

const projects: PitchProject[] = [
  {
    id: 'soup-cafe',
    icon: Soup,
    title: 'Soup Cafe',
    tagline:
      "India's first dedicated soup cafe chain — serving healthy, comforting, on-the-go soups that replace India's unhealthy snacking habit.",
    category: 'F&B · QSR · Health',
    problem:
      "India's urban snack culture is dominated by deep-fried, sugary, and heavy fast food. There is no dedicated, branded, healthy soup-on-the-go option — even though soup is universally loved, affordable to produce, and naturally healthy. The gap between 'canned soup' and 'restaurant soup' is completely unbranded.",
    solution:
      'A quick-service soup cafe chain serving freshly-made, regionally-flavoured soups in a modern, takeaway-friendly format. Think of it as the "Chai point" for soup — consistent quality, 5-minute service, affordable pricing (₹79–₹149), and a menu that blends global favourites with Indian regional classics (Rasam, Dal Shorba, Tomato Shorba, Palak, sweet corn) plus international bowls.',
    market:
      "India's QSR market is projected to cross ₹70,000 Cr by 2027 (growing ~18% CAGR). The health-conscious urban consumer segment is 50M+ and expanding fast. Soup as a category is largely unorganised — no national brand exists. First-mover advantage is available right now.",
    businessModel:
      'Company-owned flagship stores in tier-1 cities + a franchise model for tier-2/3 expansion. Revenue streams: dine-in & takeaway (60%), delivery via Zomato/Swiggy (30%), subscription (daily soup plans for offices & health-conscious individuals, 10%). Gross margins of 65–70% per bowl.',
    roadmap: [
      {
        phase: 'Phase 1 — Pilot Store',
        timeline: 'Months 1–4',
        milestones: [
          'Finalise recipes & SOPs (25-SKU menu)',
          'Launch first flagship cafe in Bangalore',
          'Build brand identity & supply chain',
          'Validate unit economics (target ₹3L/month revenue)',
        ],
      },
      {
        phase: 'Phase 2 — City Expansion',
        timeline: 'Months 5–12',
        milestones: [
          'Open 4–5 stores across Bangalore',
          'Launch delivery & subscription app',
          'Central kitchen for the city',
          'Build the core operating team',
        ],
      },
      {
        phase: 'Phase 3 — Multi-City',
        timeline: 'Year 2',
        milestones: [
          'Enter 3 new tier-1 cities (Hyderabad, Pune, Chennai)',
          'Open franchise model for tier-2 cities',
          'Launch packaged soup retail line',
          'Target 30+ stores nationwide',
        ],
      },
      {
        phase: 'Phase 4 — National Brand',
        timeline: 'Year 3–5',
        milestones: [
          '150+ stores across India',
          'Series A/B fundraise',
          'Explore own D2C packaged-soup brand',
          'Position as "India\'s Soup Brand"',
        ],
      },
    ],
    ask: 'Raising ₹40–60 Lakhs seed capital for the pilot store, brand build, and first 6 months of operations. Open to angel investors, F&B mentors, and strategic partners.',
    partnerFit:
      "Food & beverage operators, real-estate partners (high-footfall locations in Bangalore), supply-chain & sourcing partners, cloud-kitchen investors, and angel investors passionate about building India's first soup brand.",
    status: 'Concept',
    vision: 'To become India\'s first and largest dedicated soup cafe brand — making healthy, comforting soup a daily habit, not a seasonal afterthought.',
    raiseTag: '₹40–60L Seed',
    seekingTag: 'Investors & F&B Partners',
    featured: true,
    gradientFromTo: 'from-[#F5A623] to-[#D88A0E]',
    iconColor: 'text-[#F5A623]',
    iconBg: 'bg-[#F5A623]/10',
    borderColor: 'border-[#F5A623]/30',
    statusColor: 'text-[#F5A623]',
    statusBg: 'bg-[#F5A623]/10 border-[#F5A623]/30',
  },
  {
    id: 'drone-delivery',
    icon: Plane,
    title: 'Drone Delivery System',
    tagline:
      'An autonomous drone network that makes urban last-mile delivery 10x faster and 60% cheaper — built for India\u2019s congested cities.',
    category: 'Logistics \u00b7 Deep Tech',
    problem:
      "Last-mile delivery is the slowest, most expensive leg of urban logistics — choked by traffic, limited by driver availability, and unable to serve time-critical needs like medicines, documents, or food. In India's metros, a 5-km delivery can take 45+ minutes and cost ₹40–60 per trip, eroding margins for every e-commerce, pharmacy, and food platform. The problem will only worsen as quick-commerce scales.",
    solution:
      'An autonomous drone delivery network with proprietary route-optimisation software, automated fleet management, and regulatory-compliant safety protocols for sub-30-minute urban deliveries. Drones handle the 0–10 km radius from a network of micro-hubs; human riders handle the last 100m. The platform integrates with existing logistics stacks via API, so pharmacies, e-commerce, and food aggregators can plug in without changing their workflows.',
    market:
      "India's logistics market is ₹12,000+ Cr for last-mile alone, and drone logistics is projected to reach ₹30,000 Cr by 2030 following the liberalised Drone Rules 2021. The combined TAM across pharmacy, e-commerce, food, and urgent-document delivery exceeds ₹45,000 Cr. First-movers who secure corridors and DGCA approvals now will own the infrastructure layer for the next decade.",
    businessModel:
      'B2B delivery-as-a-service for pharmacies, e-commerce, food aggregators, and emergency medical supplies. Per-delivery pricing (₹60–120/trip, ~40% cheaper than riders) plus monthly fleet contracts for high-volume clients. Adjacent revenue: hardware licensing to other logistics players, and a data/API layer for route intelligence. Target gross margins of 55–60% at fleet maturity.',
    roadmap: [
      {
        phase: 'Phase 1 — Prototype & Certification',
        timeline: 'Months 1–6',
        milestones: [
          'Drone hardware prototype (10kg payload, 15km range)',
          'Flight-control & collision-avoidance software',
          'DGCA Type-Certification & NPNT registration',
          'Build core engineering team (8 people)',
        ],
      },
      {
        phase: 'Phase 2 — Pilot Corridor',
        timeline: 'Months 7–12',
        milestones: [
          'First approved delivery corridor (Bangalore, 5 km)',
          'Pharmacy pilot — 50 deliveries/day',
          'Safety record + insurance partnership',
          'First 3 B2B LOIs signed',
        ],
      },
      {
        phase: 'Phase 3 — Multi-Corridor Rollout',
        timeline: 'Year 2',
        milestones: [
          'Operate 20+ drones across 4 corridors',
          'Expand to Mumbai & Hyderabad',
          '10+ enterprise B2B contracts',
          'Break-even on per-corridor unit economics',
        ],
      },
      {
        phase: 'Phase 4 — National Network',
        timeline: 'Year 3–5',
        milestones: [
          'Fleet of 200+ drones across 8 metros',
          'Series A/B fundraise',
          'Launch hardware-licensing arm',
          'Become India\u2019s default aerial-last-mile layer',
        ],
      },
    ],
    ask: 'Raising ₹1–2 Cr seed capital for prototype finalisation, DGCA certification, and the first pilot corridor. Open to deep-tech investors, drone-hardware partners, and logistics strategics.',
    partnerFit:
      'Deep-tech and drone-hardware investors, DGCA-consulting partners, pharmacy & healthcare chains (pilot customers), e-commerce & quick-commerce platforms, and insurance partners for fleet coverage.',
    status: 'Planning',
    vision: 'To build the aerial infrastructure layer for Indian logistics — making 30-minute delivery the default, not the exception.',
    raiseTag: '₹1–2 Cr Seed',
    seekingTag: 'Deep-Tech Investors & Logistics Partners',
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
    iconColor: 'text-[#0F2557]',
    iconBg: 'bg-[#0F2557]/10',
    borderColor: 'border-[#0F2557]/20',
    statusColor: 'text-[#0F2557]',
    statusBg: 'bg-[#0F2557]/10 border-[#0F2557]/20',
  },
  {
    id: 'dashseva',
    icon: Users,
    title: 'DashSeva',
    tagline:
      'A unified platform that connects India\u2019s skilled blue-collar workforce with businesses in real time — verified, rated, and paid instantly.',
    category: 'HR Tech \u00b7 Marketplace',
    problem:
      "India's blue-collar workforce is 450M+ strong but deeply fragmented — unverified, unorganised, and routed through middlemen who skim 20–30% of wages. Businesses lose time and money to no-shows, bad hires, and zero accountability. Workers lose income and dignity. There is no trusted, national layer connecting talent to opportunity with the transparency of a Swiggy or Urban Company.",
    solution:
      'A verified, location-based marketplace connecting skilled workers (delivery, retail, facility, construction, F&B) with businesses — with background checks, ratings, instant onboarding, digital payments, and a worker benefits layer (insurance, savings, upskilling). Think of it as LinkedIn + Urban Company for India\u2019s next 100M workers.',
    market:
      "India's blue-collar workforce is 450M+, and the gig economy is projected to reach 1.2 Cr jobs by 2030. The staffing & recruitment market is ₹40,000+ Cr and growing 15% annually. Less than 5% is currently tech-enabled — a massive unorganised opportunity for a category-defining platform.",
    businessModel:
      'Commission on placements (8–15%), subscription for businesses (₹2,000–10,000/month tiers), worker upskilling courses (₹500–2,000), and a financial-services layer (insurance, loans, savings) that monetises the worker base. Target contribution margin of 35%+ at scale.',
    roadmap: [
      {
        phase: 'Phase 1 — Platform Build',
        timeline: 'Months 1–4',
        milestones: [
          'MVP apps (worker + business + ops dashboard)',
          'Verification + ratings engine live',
          'Onboard 500 verified workers in Bangalore',
          'Pilot with 20 businesses',
        ],
      },
      {
        phase: 'Phase 2 — City Scale',
        timeline: 'Months 5–9',
        milestones: [
          '5,000 active workers, 200 businesses',
          'Launch instant-payments & worker insurance',
          'Master Bangalore unit economics',
          'Build out the ops & support team',
        ],
      },
      {
        phase: 'Phase 3 — Multi-City Expansion',
        timeline: 'Months 10–18',
        milestones: [
          'Expand to Mumbai, Hyderabad, Pune',
          '50,000 workers, 2,000 businesses',
          'Launch upskilling & financial-services layer',
          'Revenue-positive at city level',
        ],
      },
      {
        phase: 'Phase 4 — National Category Leader',
        timeline: 'Year 2–4',
        milestones: [
          '10 cities, 5L+ workers, 25K businesses',
          'Series A raise',
          'Worker benefits platform as a revenue line',
          'Become India\u2019s default blue-collar trust layer',
        ],
      },
    ],
    ask: 'Raising ₹50L–₹1Cr seed for product scale, city expansion, and the worker-benefits layer. Open to HR-tech investors, enterprise employers, and impact funds.',
    partnerFit:
      'HR-tech and impact investors, enterprise employers (pilot customers), training & upskilling institutes, gig-economy platforms, and financial-services partners for the worker-benefits layer.',
    status: 'In Progress',
    vision: 'To bridge the gap between talent and opportunity across India — giving every blue-collar worker a verified identity and every business a reliable hire.',
    raiseTag: '₹50L–₹1Cr Seed',
    seekingTag: 'HR-Tech Investors & Enterprise Employers',
    gradientFromTo: 'from-[#1E3A8A] to-[#0F2557]',
    iconColor: 'text-[#0F2557]',
    iconBg: 'bg-[#0F2557]/10',
    borderColor: 'border-[#0F2557]/20',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'food-safety-device',
    icon: ShieldCheck,
    title: 'Food Safety Device',
    tagline:
      'An IoT device that detects food contamination in real time — before a single customer gets sick.',
    category: 'IoT \u00b7 Health Tech',
    problem:
      'Food contamination is detected only after people fall ill — by then the damage to public health and brand reputation is already done. Restaurants, cloud kitchens, and food manufacturers rely on periodic lab tests that are slow (24–72 hours), expensive (₹500–2,000/test), and reactive. With stricter FSSAI norms and rising consumer awareness, the cost of a single contamination incident can shut down a brand.',
    solution:
      'A compact IoT sensor that continuously monitors food-quality parameters (temperature, pH, microbial-gas signatures, humidity) and sends instant alerts to a cloud dashboard with predictive AI. The device sits inside cold storage, prep stations, and delivery bags — turning food safety from a periodic audit into a 24/7 monitored system. Hardware + SaaS, sold as a single subscription.',
    market:
      "India's food-safety testing market is ₹4,000+ Cr and growing with stricter FSSAI norms, rising cloud-kitchen density, and consumer awareness. Globally the food-safety monitoring market is $20B+. The addressable Indian market across restaurants, cloud kitchens, food manufacturers, and cold-chain logistics exceeds ₹8,000 Cr.",
    businessModel:
      'Hardware device sales (₹8,000–15,000/unit, 2x markup) + SaaS subscription for the monitoring dashboard (₹1,500–5,000/month per location). Target customers: restaurant chains, cloud kitchens, food manufacturers, cold-chain logistics, and FSSAI-compliance-driven SMEs. Lifetime account value of ₹40,000+ per location.',
    roadmap: [
      {
        phase: 'Phase 1 — R&D & Prototype',
        timeline: 'Months 1–6',
        milestones: [
          'Sensor hardware design (multi-parameter)',
          'AI contamination-detection model trained',
          'Working prototype + lab validation',
          'File for 1 patent on the sensing method',
        ],
      },
      {
        phase: 'Phase 2 — Pilot Deployment',
        timeline: 'Months 7–12',
        milestones: [
          '100-unit pilot across 5 restaurant chains',
          'FSSAI alignment & certification pathway',
          'First 10 paying SaaS customers',
          'Refine hardware for manufacturing',
        ],
      },
      {
        phase: 'Phase 3 — Scale & Manufacturing',
        timeline: 'Year 2',
        milestones: [
          'Mass manufacturing partnership locked',
          '5,000+ devices deployed',
          'Cloud-kitchen & cold-chain contracts',
          'Expand to 3 metros',
        ],
      },
      {
        phase: 'Phase 4 — Category Leader',
        timeline: 'Year 3–5',
        milestones: [
          '50,000+ devices, national footprint',
          'Series A/B fundraise',
          'Launch data/API layer for insurers & regulators',
          'Become India\u2019s food-safety monitoring standard',
        ],
      },
    ],
    ask: 'Raising ₹75L–₹1.5Cr for R&D finalisation, pilot manufacturing, and the first 100-unit deployment. Open to IoT/hardware investors and food-industry strategic partners.',
    partnerFit:
      'IoT and hardware investors, restaurant & cloud-kitchen chains (pilot customers), food manufacturers, cold-chain logistics operators, FSSAI-compliance consultants, and semiconductor/sensor partners.',
    status: 'Planning',
    vision: 'To make food safety proactive, not reactive — from farm to table — and give every Indian confidence in what they eat.',
    raiseTag: '₹75L–₹1.5Cr Seed',
    seekingTag: 'IoT Investors & Food-Industry Partners',
    gradientFromTo: 'from-[#F5A623] to-[#0F2557]',
    iconColor: 'text-[#F5A623]',
    iconBg: 'bg-[#F5A623]/10',
    borderColor: 'border-[#F5A623]/30',
    statusColor: 'text-[#0F2557]',
    statusBg: 'bg-[#0F2557]/10 border-[#0F2557]/20',
  },
  {
    id: 'vehicle-safety-device',
    icon: Car,
    title: 'Vehicle Safety Device',
    tagline:
      'A smart device that watches the driver, not just the road — preventing accidents before they happen.',
    category: 'Automotive \u00b7 IoT',
    problem:
      'Road accidents from driver fatigue, distraction, and negligence cause 1.5L+ fatalities every year in India — many of them in commercial fleets where a single accident can cost a logistics company ₹10L+ in damages, downtime, and insurance. Existing dash-cams record accidents after the fact; none prevent them. There is no affordable, real-time driver-monitoring system for India\u2019s 9M+ commercial vehicles.',
    solution:
      'A smart in-cabin device that monitors driver behaviour (drowsiness, phone use, lane discipline, smoking) using computer vision and provides real-time audio alerts to the driver plus actionable reports to fleet owners. The device pairs with a fleet-analytics SaaS that scores drivers, predicts risk, and lowers insurance premiums. Hardware + SaaS, priced for Indian fleet economics.',
    market:
      "India's commercial fleet market is 9M+ vehicles, with rising insurance premiums and new safety-compliance mandates (BS6, vehicle-scrappage, fleet-tracking norms). The fleet-tech market is ₹15,000+ Cr and growing 20% annually. Adjacent opportunity in personal-car D2C is another 30M+ vehicles.",
    businessModel:
      'Device sales (₹6,000–12,000/unit) + monthly SaaS for fleet analytics (₹300–800/vehicle/month). Target: logistics fleets, taxi aggregators, school-bus operators, and personal-car owners. Insurance-partnership revenue share on premium reductions. Lifetime value of ₹20,000+ per vehicle.',
    roadmap: [
      {
        phase: 'Phase 1 — Hardware & AI Build',
        timeline: 'Months 1–6',
        milestones: [
          'Device prototype (camera + edge-AI chip)',
          'Driver-behaviour vision model trained',
          'Field testing with 3 logistics fleets',
          'File IP on the alert-logic layer',
        ],
      },
      {
        phase: 'Phase 2 — Fleet Pilot',
        timeline: 'Months 7–12',
        milestones: [
          '3 fleet pilots (300 vehicles total)',
          'Insurance partnership for premium discount',
          'AIS-140 / regulatory certification',
          'First 50 paying SaaS customers',
        ],
      },
      {
        phase: 'Phase 3 — Scale & D2C Launch',
        timeline: 'Year 2',
        milestones: [
          '10,000+ devices deployed across fleets',
          'D2C launch for personal cars',
          'Insurance co-branded product live',
          'Expand to 5 metros',
        ],
      },
      {
        phase: 'Phase 4 — National Fleet-Safety Standard',
        timeline: 'Year 3–5',
        milestones: [
          '100,000+ vehicles, national footprint',
          'Series A/B raise',
          'Fleet-risk data API for insurers',
          'Become India\u2019s default fleet-safety platform',
        ],
      },
    ],
    ask: 'Raising ₹75L–₹1.5Cr for hardware production, fleet pilots, and insurance-partnership integration. Open to auto-tech investors and insurance/fleet strategic partners.',
    partnerFit:
      'Auto-tech and IoT investors, fleet operators (logistics, taxi, school-bus), insurance companies (premium-discount partnership), semiconductor & camera partners, and automotive OEMs.',
    status: 'Planning',
    vision: 'To cut India\u2019s road-accident rate in half — one monitored driver at a time.',
    raiseTag: '₹75L–₹1.5Cr Seed',
    seekingTag: 'Auto-Tech Investors & Fleet/Insurance Partners',
    gradientFromTo: 'from-[#B91C1C] to-[#F5A623]',
    iconColor: 'text-[#B91C1C]',
    iconBg: 'bg-[#B91C1C]/10',
    borderColor: 'border-[#B91C1C]/20',
    statusColor: 'text-[#0F2557]',
    statusBg: 'bg-[#0F2557]/10 border-[#0F2557]/20',
  },
  {
    id: 'stayeg',
    icon: Home,
    title: 'StayEg',
    tagline:
      'Verified, tech-managed co-living spaces that finally bring accountability to India\u2019s rental housing market.',
    category: 'PropTech \u00b7 Real Estate',
    problem:
      "India's co-living and rental market is plagued by unverified listings, hidden charges, inconsistent quality, arbitrary deposits, and zero accountability for landlords or tenants. 10M+ migrating millennials and students navigate this chaos every year, losing time, money, and trust. Existing platforms are listing directories, not managed experiences — nobody owns the end-to-end tenant journey.",
    solution:
      'A verified co-living platform with smart property-management tech, quality standards, transparent pricing, and a community-first tenant experience. Every property is audited, every listing is real, every payment is digital, and every tenant gets a StayEg experience guarantee. The platform combines a consumer booking flow with a full property-management SaaS for owners.',
    market:
      "India's co-living market is projected to reach ₹50,000 Cr by 2025, driven by 10M+ migrating millennials and students. The broader rental market is ₹3.5L Cr. Less than 3% is currently tech-managed — a massive opportunity for a category-defining brand that owns trust in rental housing.",
    businessModel:
      'Revenue share with property owners (10–15% of rent), tenant convenience fees (₹500–1,500/month), and premium community membership (₹2,000/month for amenities + events). Adjacent: property-management SaaS for independent owners, and a financial-services layer (deposit financing, renter insurance).',
    roadmap: [
      {
        phase: 'Phase 1 — Platform Launch',
        timeline: 'Months 1–4',
        milestones: [
          'Consumer booking + owner SaaS live',
          'Onboard 5 audited properties in Bangalore',
          'First 50 tenants placed',
          'Build the property-audit playbook',
        ],
      },
      {
        phase: 'Phase 2 — City Mastery',
        timeline: 'Months 5–9',
        milestones: [
          '50 audited properties, 500 tenants',
          'Master Bangalore unit economics',
          'Launch community-membership tier',
          'Property-management SaaS opened to 3rd-party owners',
        ],
      },
      {
        phase: 'Phase 3 — Multi-City Expansion',
        timeline: 'Months 10–18',
        milestones: [
          'Expand to Hyderabad, Pune, Chennai',
          '2,000+ tenants, 200 properties',
          'Launch deposit-financing & renter insurance',
          'Profitable per-city unit economics',
        ],
      },
      {
        phase: 'Phase 4 — National PropTech Brand',
        timeline: 'Year 2–4',
        milestones: [
          '8 cities, 10,000+ tenants',
          'Series A raise',
          'Property-management SaaS as a standalone product',
          'Become India\u2019s most-trusted rental brand',
        ],
      },
    ],
    ask: 'Raising ₹50L–₹1Cr seed for platform scale, property partnerships, and the first city rollout. Open to prop-tech investors and real-estate strategic partners.',
    partnerFit:
      'Prop-tech and real-estate investors, property owners & aggregators, real-estate developers, financial-services partners (deposit financing, renter insurance), and community/experience operators.',
    status: 'In Progress',
    vision: 'To redefine co-living in India with trust, technology, and community — making rental housing as reliable as booking a hotel.',
    raiseTag: '₹50L–₹1Cr Seed',
    seekingTag: 'PropTech Investors & Real-Estate Partners',
    gradientFromTo: 'from-[#0F2557] to-[#1E3A8A]',
    iconColor: 'text-[#0F2557]',
    iconBg: 'bg-[#0F2557]/10',
    borderColor: 'border-[#0F2557]/20',
    statusColor: 'text-emerald-600',
    statusBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
]


/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Project Card (clickable → opens pitch modal) ─── */
function ProjectCard({
  project,
  delay = 0,
  onOpen,
}: {
  project: PitchProject
  delay?: number
  onOpen: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const Icon = project.icon
  const isInProgress = project.status === 'In Progress'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <button
        onClick={onOpen}
        className="relative glass-card card-hover rounded-2xl overflow-hidden group h-full w-full text-left border border-border/30 cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]/50"
        aria-label={`View startup pitch for ${project.title}`}
      >
        {/* Gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.gradientFromTo} z-20`} />
        {/* Background glow */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${project.iconBg} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
        {/* Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none z-10" />
        <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" />

        <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradientFromTo} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">{project.title}</h3>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5 font-medium">{project.category}</p>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border ${project.statusBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isInProgress ? 'bg-emerald-500' : 'bg-[#0F2557]'} ${isInProgress ? 'pulse-glow' : ''}`} />
                    <span className={project.statusColor}>{project.status}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623]">
                    <Rocket className="w-2.5 h-2.5" />
                    Startup
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline (short pitch) */}
          <p className="text-[11px] sm:text-xs text-foreground/90 leading-relaxed font-medium mb-3 flex-1">
            {project.tagline}
          </p>

          {/* Raise & Seeking strip — every card is a funded startup pitch */}
          <div className="mb-3 rounded-lg border border-[#F5A623]/25 bg-[#F5A623]/5 p-2.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-3 h-3 text-[#F5A623] shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Raising</span>
              <span className="text-[10px] sm:text-[11px] font-black text-foreground ml-auto">{project.raiseTag}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Handshake className="w-3 h-3 text-[#0F2557] shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">Seeking</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-foreground/90 ml-auto text-right">{project.seekingTag}</span>
            </div>
          </div>

          {/* Mini roadmap chips */}
          <div className="mb-3">
            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2 block">Roadmap</span>
            <div className="flex items-center gap-1 flex-wrap">
              {project.roadmap.map((phase, i) => (
                <div
                  key={phase.phase}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/40 border border-border/30 text-[10px] sm:text-[11px] font-semibold text-foreground/80"
                >
                  <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${project.gradientFromTo} flex items-center justify-center text-[8px] font-black text-white shrink-0`}>
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap">{phase.phase.split('—')[0].replace('Phase ', 'P')}</span>
                  {i < project.roadmap.length - 1 && <span className="text-muted-foreground/40">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* View pitch CTA — emphasise investors & partners */}
          <div className="pt-3 border-t border-border/20 flex items-center justify-between gap-2">
            <span className="text-[10px] text-muted-foreground/70 italic flex items-center gap-1.5 min-w-0">
              <FlaskConical className={`w-3 h-3 ${project.iconColor} shrink-0`} />
              <span className="truncate">{project.vision.slice(0, 40)}…</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F5A623] group-hover:gap-1.5 transition-all shrink-0">
              Read Pitch
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}


/* ─── Featured Soup Cafe Hero Card ─── */
function FeaturedSoupCafe({ onOpen }: { onOpen: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { setCurrentPage } = usePage()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl overflow-hidden border border-[#F5A623]/30 shadow-xl shadow-[#0F2557]/10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 60%, #0F2557 100%)' }} />
      <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[#F5A623]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-[#1E3A8A]/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-7 sm:p-10 lg:p-12">
        {/* Left — content */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5A623] text-[#1A1A1A] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Featured Pitch
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 text-[#F5A623] text-[10px] font-bold uppercase tracking-wider">
              <Soup className="w-3 h-3" />
              F&B · QSR
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-bold uppercase tracking-wider">
              Concept Stage
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.1] mb-3">
            Soup Cafe — <span className="text-[#F5A623]">India&apos;s First Soup Cafe Brand</span>
          </h3>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-5 max-w-xl">
            A quick-service soup cafe chain serving freshly-made, regionally-flavoured soups that replace
            India&apos;s unhealthy snacking habit. We&apos;re building the category that doesn&apos;t exist yet —
            and we&apos;re looking for investors and partners to build it with us.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Target, label: 'Market', value: '₹70K Cr QSR' },
              { icon: TrendingUp, label: 'Growth', value: '18% CAGR' },
              { icon: IndianRupee, label: 'Ticket', value: '₹79–149' },
              { icon: MapPin, label: 'Pilot', value: 'Bangalore' },
            ].map((s) => {
              const I = s.icon
              return (
                <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <I className="w-3.5 h-3.5 text-[#F5A623] mb-1.5" />
                  <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{s.label}</div>
                  <div className="text-xs sm:text-sm text-white font-bold mt-0.5">{s.value}</div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onOpen}
              className="btn-cta border-0 font-bold text-xs sm:text-sm px-6 py-5 h-auto cursor-pointer"
            >
              <Soup className="w-4 h-4 mr-1.5" />
              Read the Full Pitch
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              onClick={() => setCurrentPage('contact')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white font-bold text-xs sm:text-sm px-6 py-5 h-auto cursor-pointer"
            >
              <Handshake className="w-4 h-4 mr-1.5" />
              Partner With Us
            </Button>
          </div>
        </div>

        {/* Right — roadmap preview */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-4 h-4 text-[#F5A623]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Roadmap</h4>
            </div>
            <div className="flex flex-col gap-3">
              {projects[0].roadmap.map((phase, i) => (
                <div key={phase.phase} className="relative pl-6">
                  {/* Timeline dot + line */}
                  <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#F5A623] flex items-center justify-center text-[9px] font-black text-[#1A1A1A]">
                    {i + 1}
                  </span>
                  {i < projects[0].roadmap.length - 1 && (
                    <span className="absolute left-[7px] top-5 bottom-[-14px] w-px bg-white/15" />
                  )}
                  <div className="text-[11px] font-bold text-white">{phase.phase}</div>
                  <div className="text-[10px] text-[#F5A623] font-semibold mb-1">{phase.timeline}</div>
                  <div className="text-[10px] text-white/60 leading-relaxed">{phase.milestones[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


/* ─── Pitch Modal (the full startup pitch) ─── */
function PitchModal({ project, open, onOpenChange }: { project: PitchProject | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!project) return null
  const Icon = project.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        {/* Visually-hidden accessible title/description */}
        <DialogTitle className="sr-only">{project.title} — Startup Pitch</DialogTitle>
        <DialogDescription className="sr-only">{project.tagline}</DialogDescription>

        {/* Header banner */}
        <div className="relative overflow-hidden rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}>
          <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#F5A623]/12 blur-3xl pointer-events-none" />
          <div className="relative z-10 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradientFromTo} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{project.title}</h2>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${project.statusBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-emerald-500' : 'bg-[#F5A623]'}`} />
                    <span className={project.statusColor}>{project.status}</span>
                  </span>
                </div>
                <p className="text-[10px] text-[#F5A623] font-bold uppercase tracking-wider mb-2">{project.category}</p>
                <p className="text-sm text-white/80 leading-relaxed">{project.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 flex flex-col gap-6">
          {/* The Pitch */}
          <section>
            <SectionLabel icon={Sparkles} label="The Pitch" />
            <p className="text-sm text-foreground/90 leading-relaxed">{project.tagline}</p>
          </section>

          {/* Problem + Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <section>
              <SectionLabel icon={Target} label="Problem" tone="rose" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{project.problem}</p>
            </section>
            <section>
              <SectionLabel icon={CheckCircle2} label="Solution" tone="emerald" />
              <p className="text-[13px] text-foreground/90 leading-relaxed font-medium">{project.solution}</p>
            </section>
          </div>

          {/* Market + Business Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <section>
              <SectionLabel icon={TrendingUp} label="Market Opportunity" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{project.market}</p>
            </section>
            <section>
              <SectionLabel icon={IndianRupee} label="Business Model" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{project.businessModel}</p>
            </section>
          </div>

          {/* Roadmap */}
          <section>
            <SectionLabel icon={Rocket} label="Roadmap — Complete Execution Plan" />
            <div className="flex flex-col gap-3">
              {project.roadmap.map((phase, i) => (
                <div key={phase.phase} className="relative pl-8">
                  <span className={`absolute left-0 top-0 w-6 h-6 rounded-lg bg-gradient-to-br ${project.gradientFromTo} flex items-center justify-center text-[11px] font-black text-white shrink-0`}>
                    {i + 1}
                  </span>
                  <div className="rounded-xl border border-border/50 bg-muted/30 p-3.5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-[13px] font-bold text-foreground">{phase.phase}</h4>
                      <span className="text-[10px] font-bold text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded-full">{phase.timeline}</span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {phase.milestones.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-[12px] text-muted-foreground leading-relaxed">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ask + Partner Fit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <section className="rounded-xl border border-[#F5A623]/30 bg-[#F5A623]/5 p-4">
              <SectionLabel icon={IndianRupee} label="What We're Raising" />
              <p className="text-[13px] text-foreground/90 leading-relaxed font-medium">{project.ask}</p>
            </section>
            <section className="rounded-xl border border-[#0F2557]/20 bg-[#0F2557]/5 p-4">
              <SectionLabel icon={Handshake} label="Partners We're Seeking" />
              <p className="text-[13px] text-muted-foreground leading-relaxed">{project.partnerFit}</p>
            </section>
          </div>

          {/* Vision */}
          <section className="rounded-xl bg-muted/40 border border-border/50 p-4">
            <SectionLabel icon={FlaskConical} label="Vision" />
            <p className="text-[13px] text-foreground/80 italic leading-relaxed">{project.vision}</p>
          </section>

          {/* CTA */}
          <section className="rounded-xl p-5 text-center" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}>
            <Handshake className="w-7 h-7 text-[#F5A623] mx-auto mb-2" />
            <h4 className="text-base font-bold text-white mb-1">Want to build {project.title} with us?</h4>
            <p className="text-[12px] text-white/70 mb-4 max-w-md mx-auto leading-relaxed">
              We have a complete roadmap and execution plan. If you&apos;re an investor or partner who shares our passion, let&apos;s talk.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="btn-cta border-0 font-bold text-xs px-6 py-4 h-auto cursor-pointer"
            >
              <Handshake className="w-4 h-4 mr-1.5" />
              Express Interest
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* Small label helper for the modal */
function SectionLabel({ icon: Icon, label, tone = 'default' }: { icon: React.ElementType; label: string; tone?: 'default' | 'rose' | 'emerald' }) {
  const color = tone === 'rose' ? 'text-rose-500' : tone === 'emerald' ? 'text-emerald-600' : 'text-[#F5A623]'
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/70">{label}</span>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function InnovationLabPage() {
  const { setCurrentPage } = usePage()
  const [selected, setSelected] = useState<PitchProject | null>(null)

  const openPitch = (p: PitchProject) => setSelected(p)
  const soupCafe = projects[0]
  const otherProjects = projects.slice(1)
  return (
    <div className="relative">
      {/* ═══ SECTION 1: HERO (navy, consistent with other pages) ═══ */}
      <section
        className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/10 blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-1.5 text-xs mb-6"
            aria-label="Breadcrumb"
          >
            <button
              onClick={() => setCurrentPage('home')}
              className="text-white/60 hover:text-[#F5A623] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3 h-3" />
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white font-semibold">Innovation Lab</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6"
          >
            <FlaskConical className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Innovation Lab</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5"
          >
            <span className="block text-white">Building the Future,</span>
            <span className="block text-[#F5A623] mt-1.5">One Startup at a Time</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re not just solving today&apos;s problems — we&apos;re building tomorrow&apos;s companies.
            Explore our pipeline of startup concepts, each with a complete roadmap. We&apos;re actively seeking
            <span className="text-[#F5A623] font-semibold"> investors and partners</span> to build them with us.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8"
          >
            {[
              { v: `${projects.length}`, l: 'Startup Concepts' },
              { v: '1', l: 'Featured Pitch' },
              { v: '100%', l: 'Roadmap Ready' },
              { v: 'Open', l: 'For Investors' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-xl sm:text-2xl font-black text-[#F5A623]">{s.v}</div>
                <div className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider font-semibold">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ═══ SECTION 2: FEATURED — SOUP CAFE ═══ */}
      <AnimatedSection className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA] overflow-hidden" direction="up">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <SectionBadge variant="orange">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Flagship Concept
            </SectionBadge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 mb-2">
              A Category That <span className="text-[#F5A623]">Doesn&apos;t Exist Yet</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Our most active pitch — open for investors, F&amp;B partners, and operators to join.
            </p>
          </div>

          <FeaturedSoupCafe onOpen={() => openPitch(soupCafe)} />
        </div>
      </AnimatedSection>


      {/* ═══ SECTION 3: PROJECT PIPELINE GRID ═══ */}
      <AnimatedSection className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" direction="up">
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <SectionBadge variant="muted">Startup Pipeline</SectionBadge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 mb-3">
              Every Project is a <span className="text-[#0F2557]">Startup Seeking Partners</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Each concept is a complete startup — with a clear problem, solution, market, business model, and a phased roadmap.
              Every one is <span className="text-foreground font-semibold">open for investment and strategic partners</span>. Click any card to read the full pitch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.08} onOpen={() => openPitch(project)} />
            ))}
          </div>

          {/* Summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-14 glass-card rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 border border-border/30"
          >
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
                <span className="text-[11px] sm:text-xs text-muted-foreground">
                  <span className="text-foreground font-bold">{projects.filter((p) => p.status === 'In Progress').length}</span> In Progress
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0F2557]" />
                <span className="text-[11px] sm:text-xs text-muted-foreground">
                  <span className="text-foreground font-bold">{projects.filter((p) => p.status === 'Planning').length}</span> Planning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                <span className="text-[11px] sm:text-xs text-muted-foreground">
                  <span className="text-foreground font-bold">{projects.filter((p) => p.status === 'Concept').length}</span> Concept
                </span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 italic">
              More concepts in stealth mode — stay tuned.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>


      {/* ═══ SECTION 4: INVESTOR & PARTNER CTA ═══ */}
      <AnimatedSection className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden section-glow" direction="up">
        <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
        <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />
        <div className="absolute top-10 -left-20 w-[300px] h-[300px] rounded-full bg-[#F5A623]/8 morph-blob blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-20 w-[400px] h-[400px] rounded-full bg-[#0F2557]/6 morph-blob blur-3xl pointer-events-none" style={{ animationDelay: '-4s' }} />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="glass-card-strong rounded-2xl p-8 sm:p-12 relative overflow-hidden card-hover border border-[#F5A623]/20">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#F5A623]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#0F2557]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-lg shadow-[#F5A623]/20" style={{ background: 'linear-gradient(135deg, #F5A623 0%, #D88A0E 100%)' }}>
                <Handshake className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                Investors &amp; Partners — <span className="text-[#F5A623]">Let&apos;s Build Together</span>
              </h2>
              <p className="text-[12px] sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                Every project above has a complete roadmap, a clear market, and a team ready to execute.
                We&apos;re looking for <span className="font-semibold text-foreground">angel investors, venture capital, strategic partners, and operators</span> who share
                our passion for building solutions that matter. If one of these startups excites you, let&apos;s talk.
              </p>

              {/* What we offer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7 max-w-2xl mx-auto">
                {[
                  { icon: CheckCircle2, t: 'Complete Roadmaps', d: 'Phased execution plan for every concept' },
                  { icon: ShieldCheck, t: 'IP & NDA Ready', d: 'Protection and confidentiality assured' },
                  { icon: Users, t: 'Execution Team', d: 'A founder-led team that ships' },
                ].map((c) => {
                  const I = c.icon
                  return (
                    <div key={c.t} className="rounded-xl border border-border/40 bg-background/50 p-3.5 text-left">
                      <I className="w-4 h-4 text-[#F5A623] mb-1.5" />
                      <div className="text-[11px] font-bold text-foreground">{c.t}</div>
                      <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{c.d}</div>
                    </div>
                  )
                })}
              </div>

              <Button
                onClick={() => setCurrentPage('contact')}
                className="btn-cta border-0 font-bold text-xs sm:text-sm px-6 py-5 h-auto cursor-pointer group"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Trust signals */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-muted-foreground/50">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-medium">Equity Options</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-medium">NDA Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-medium">Founder Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Pitch modal */}
      <PitchModal project={selected} open={!!selected} onOpenChange={(v) => !v && setSelected(null)} />
    </div>
  )
}
