'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Megaphone,
  MonitorSmartphone,
  ShoppingBag,
  Headphones,
  TrendingUp,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Search,
  Target,
  BarChart3,
  Lightbulb,
  Mail as MailIcon,
  ShoppingCart,
  Store,
  Truck,
  Package,
  ClipboardCheck,
  Calculator,
  Wallet,
  FileText,
  Headset,
  Keyboard,
  LineChart,
  Home,
  Rocket,
  Building2,
  GraduationCap,
  Briefcase,
  CalendarDays,
  PartyPopper,
  Handshake,
  Award,
  CheckCircle2,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'
import { siteConfig } from '@/lib/site-config'

/* ════════════════════════════════════════════════════════════════════════
   SERVICE DATA — the single source for this page
   Each service is a self-contained "pitch block" a sales exec can walk
   a client through: What it is → What's included → Who it's for → Outcome.
   ════════════════════════════════════════════════════════════════════════ */

interface SubService {
  name: string
  icon: LucideIcon
}
interface Service {
  id: string
  num: string
  title: string
  tagline: string
  icon: LucideIcon
  description: string
  subServices: SubService[]
  idealFor: string
  outcome: string
  highlight?: boolean
}

const services: Service[] = [
  {
    id: 'digital-marketing',
    num: '01',
    title: 'Digital Marketing',
    tagline: 'Turn ad spend into a predictable growth engine',
    icon: Megaphone,
    description:
      'Data-driven digital marketing with measurable ROI across every channel. We don\'t just run ads — we build a full-funnel system that turns strangers into qualified leads and paying customers, with transparent reporting on every rupee spent.',
    subServices: [
      { name: 'SEO', icon: Search },
      { name: 'Social Media Marketing', icon: Target },
      { name: 'Google & Meta Ads', icon: BarChart3 },
      { name: 'Content Marketing', icon: Lightbulb },
      { name: 'Email & WhatsApp Marketing', icon: MailIcon },
      { name: 'Performance Marketing', icon: TrendingUp },
    ],
    idealFor: 'D2C brands, real estate, healthcare, education, local businesses',
    outcome: '3.2x avg ROAS · +180% lead growth · -42% cost-per-lead',
    highlight: true,
  },
  {
    id: 'website-development',
    num: '02',
    title: 'Website Design & Development',
    tagline: 'Websites built to convert visitors into leads — not just look good',
    icon: MonitorSmartphone,
    description:
      'Custom, conversion-focused websites for D2C & E-commerce brands, real estate developers, hospitals & healthcare providers, and growing businesses across industries. Fast, mobile-first, SEO-ready, and engineered to turn visitors into enquiries and sales.',
    subServices: [
      { name: 'D2C & E-Commerce Stores', icon: ShoppingBag },
      { name: 'Real Estate Websites', icon: Building2 },
      { name: 'Healthcare & Hospital Sites', icon: Users },
      { name: 'Startup & Local Business Sites', icon: Store },
      { name: 'Landing Pages & Funnels', icon: Target },
      { name: 'Website Maintenance & Speed', icon: Rocket },
    ],
    idealFor: 'D2C brands, real estate developers, hospitals, startups, local businesses',
    outcome: '1.1% → 3.6% conversion · 3.4s → 1.2s load · +220% leads',
    highlight: true,
  },
  {
    id: 'd2c-ecommerce',
    num: '03',
    title: 'D2C & E-Commerce Business Management',
    tagline: 'Run, scale, and automate your entire D2C operation',
    icon: ShoppingBag,
    description:
      'End-to-end management for Direct-to-Consumer and E-commerce brands — from storefront and marketplace operations to fulfilment, customer experience, and performance marketing. We run the day-to-day so founders can focus on product and growth.',
    subServices: [
      { name: 'Storefront Management', icon: Store },
      { name: 'Marketplace Ops (Amazon, Flipkart)', icon: ShoppingCart },
      { name: 'Inventory & Catalog', icon: Package },
      { name: 'Fulfilment & Logistics', icon: Truck },
      { name: 'Customer Support & Retention', icon: Headset },
      { name: 'Performance Marketing for D2C', icon: BarChart3 },
    ],
    idealFor: 'D2C brands, online sellers, Shopify/WooCommerce stores scaling beyond ₹10L/month',
    outcome: '4x revenue growth · 3.2x ROAS · 92% retention',
    highlight: true,
  },
  {
    id: 'bpo-services',
    num: '04',
    title: 'BPO Services',
    tagline: 'Back-office, finance, and support — handled with accuracy',
    icon: Headphones,
    description:
      'Reliable Business Process Outsourcing that cuts operational cost and frees your team to focus on growth. From financial accounting to stock audits and customer support, we run your non-core processes with defined SLAs and transparent reporting.',
    subServices: [
      { name: 'Stock Auditing', icon: ClipboardCheck },
      { name: 'Payroll Processing', icon: Wallet },
      { name: 'Financial Accounting', icon: Calculator },
      { name: 'Data Entry & Back Office', icon: Keyboard },
      { name: 'Customer Support', icon: Headset },
      { name: 'Lead Generation', icon: Rocket },
    ],
    idealFor: 'Retail chains, manufacturers, SMBs, startups scaling operations',
    outcome: '-50% audit cycle time · 99.5% accuracy · 60% cost reduction',
  },
  {
    id: 'consultancy',
    num: '05',
    title: 'Consultancy',
    tagline: 'Strategic guidance across real estate, markets, and startups',
    icon: TrendingUp,
    description:
      'Expert advisory that helps you make confident decisions — whether you\'re entering a new market, building a startup from scratch, investing in real estate, or planning a stock-market-backed growth strategy. Clear roadmaps, defined KPIs, measurable outcomes.',
    subServices: [
      { name: 'Stock Market Advisory', icon: LineChart },
      { name: 'Startup Building', icon: Rocket },
      { name: 'Real Estate Advisory', icon: Home },
      { name: 'New Project Strategy', icon: Briefcase },
      { name: 'Business Coaching', icon: GraduationCap },
      { name: 'Market Entry & Scaling', icon: Target },
    ],
    idealFor: 'Founders, investors, real estate developers, new startups',
    outcome: '₹2.4 Cr pipeline · clear roadmap · defined KPIs',
  },
  {
    id: 'community-events',
    num: '06',
    title: 'Community & Event Management',
    tagline: 'Experiences and communities that generate real leads',
    icon: Users,
    description:
      'From corporate events and product launches to community-building programs that keep your audience engaged long after the event ends. We plan, execute, and measure every activation — so your events drive business, not just attendance.',
    subServices: [
      { name: 'Corporate Events', icon: Briefcase },
      { name: 'Product Launches', icon: Rocket },
      { name: 'Brand Activations', icon: PartyPopper },
      { name: 'Conferences & Expos', icon: CalendarDays },
      { name: 'Community Programs', icon: Users },
      { name: 'Sponsorships & Partnerships', icon: Handshake },
    ],
    idealFor: 'Brands, startups, real estate developers, industry associations',
    outcome: '200+ events delivered · 98% satisfaction · 200+ leads per launch',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   HERO HEADER
   ════════════════════════════════════════════════════════════════════════ */
function ServicesHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden" aria-label="Our services">
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
          <Award className="w-3.5 h-3.5" />
          What We Do
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
          One Partner. <span className="text-[#F5A623]">Every Growth Lever.</span>
        </h1>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Six core services under one roof — strategy, execution, and management.
          Pick one, or combine them into a complete growth system. No juggling
          vendors, no finger-pointing, just results.
        </p>

        {/* Quick nav to services (sales exec friendly) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/8 border border-white/15 text-white/80 hover:bg-[#F5A623] hover:text-[#1A1A1A] hover:border-[#F5A623] transition-all duration-200"
            >
              {s.num} · {s.title.split(' ')[0]}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   SERVICE PITCH BLOCK — one per service
   Alternating background for readability. Each block is a complete pitch:
   number, icon, title, tagline, description, what's included, who it's for,
   and the outcome a client can expect.
   ════════════════════════════════════════════════════════════════════════ */
function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const Icon = service.icon
  const isEven = index % 2 === 0

  return (
    <section
      id={service.id}
      ref={ref}
      className={`py-14 md:py-20 scroll-mt-20 ${isEven ? 'bg-white' : 'bg-[#F5F7FA]'}`}
      aria-label={service.title}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Left: number + icon + title block */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                >
                  <Icon className="w-7 h-7 text-[#F5A623]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#F5A623] tracking-widest">{service.num}</span>
                  {service.highlight && (
                    <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30">
                      Core Growth Service
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#0F2557] leading-tight">
                  {service.title}
                </h2>
                <p className="text-sm font-semibold text-[#1E3A8A] mt-1">{service.tagline}</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-[#1A1A1A] leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Right: what's included + ideal for + outcome */}
          <div className="lg:col-span-7">
            {/* What's included */}
            <div className="mb-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#5A6478] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F2557]" />
                What&apos;s Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.subServices.map((sub) => {
                  const SubIcon = sub.icon
                  return (
                    <div
                      key={sub.name}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#EEF2FA] border border-[#E5E9F0]"
                    >
                      <SubIcon className="w-4 h-4 text-[#0F2557] shrink-0" />
                      <span className="text-xs font-semibold text-[#0F2557]">{sub.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Ideal for + Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#E5E9F0]">
                <div className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-1">
                  Ideal For
                </div>
                <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">{service.idealFor}</p>
              </div>
              <div className="p-4 rounded-xl border border-[#F5A623]/30"
                style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(245,166,35,0.02) 100%)' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wide text-[#F5A623] mb-1 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Typical Outcome
                </div>
                <p className="text-xs text-[#1A1A1A] font-bold leading-relaxed">{service.outcome}</p>
              </div>
            </div>

            {/* ── Direct CTA — let interested clients connect instantly ── */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-[#0F2557]/10 bg-[#0F2557]/[0.03]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                  >
                    <Handshake className="w-4 h-4 text-[#F5A623]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F2557] leading-tight">
                      Interested in {service.title}?
                    </p>
                    <p className="text-[11px] text-[#5A6478] mt-0.5">
                      Connect with us directly — we&apos;ll discuss your goals &amp; build a plan.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {/* WhatsApp — primary, pre-filled with service name */}
                  <a
                    href={`${siteConfig.contact.whatsappHref.split('?')[0]}?text=${encodeURIComponent(`Hi BizMeals, I'm interested in your "${service.title}" service. I'd like to discuss a growth opportunity for my business.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Chat on WhatsApp about ${service.title}`}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebe5d] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-sm shadow-[#25D366]/30 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                    <span className="sm:hidden">Chat</span>
                  </a>
                  {/* Call */}
                  <a
                    href={siteConfig.contact.phoneHref}
                    aria-label={`Call BizMeals about ${service.title}`}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-[#0F2557] text-white text-xs font-bold hover:bg-[#1E3A8A] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                  {/* Email */}
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Inquiry: ${service.title} — BizMeals`)}&body=${encodeURIComponent(`Hi BizMeals,\n\nI'm interested in your "${service.title}" service.\n\nPlease share more details.\n\nThanks.`)}`}
                    aria-label={`Email BizMeals about ${service.title}`}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-white border border-[#E5E9F0] text-[#0F2557] text-xs font-bold hover:border-[#0F2557]/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   PROCESS STRIP — how we work (sales exec can reference this)
   ════════════════════════════════════════════════════════════════════════ */
function ProcessStrip() {
  const steps = [
    { num: '1', title: 'Understand', desc: 'Deep-dive into your business, market, and goals.' },
    { num: '2', title: 'Build', desc: 'A custom strategy and execution plan with clear KPIs.' },
    { num: '3', title: 'Execute', desc: 'We do the work — end-to-end, with transparent reporting.' },
    { num: '4', title: 'Scale', desc: 'Optimize what works, cut what doesn\'t, compound growth.' },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-14 md:py-20 bg-white border-y border-[#E5E9F0]" aria-label="How we work">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mb-3">
            How We Work With You
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-xl mx-auto">
            The same 4-step process applies to every service — so you always know what happens next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-5 rounded-2xl bg-[#F5F7FA] border border-[#E5E9F0]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 font-black text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
              >
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-[#0F2557] mb-1">{step.title}</h3>
              <p className="text-xs text-[#5A6478] leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F2557]/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   WHY ONE PARTNER STRIP
   ════════════════════════════════════════════════════════════════════════ */
function WhyOnePartner() {
  const points = [
    { title: 'No vendor juggling', desc: 'One team owns strategy, execution, and reporting across every service.' },
    { title: 'No finger-pointing', desc: 'If something breaks, we fix it — no &quot;that&apos;s the other agency&apos;s job.&quot;' },
    { title: 'Numbers, not vanity', desc: 'Every service reports against revenue, leads, or cost — not likes or impressions.' },
    { title: 'Scale on demand', desc: 'Start with one service, add more as you grow — the team already knows your business.' },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-14 md:py-20 bg-[#F5F7FA]" aria-label="Why one partner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mb-3">
            Why One Partner Beats Six Vendors
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-white border border-[#E5E9F0]"
            >
              <CheckCircle2 className="w-6 h-6 text-[#F5A623] mb-3" />
              <h3 className="text-sm font-bold text-[#0F2557] mb-1.5">{p.title}</h3>
              <p className="text-xs text-[#5A6478] leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Get started">
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
          Not Sure Which Service You Need?
        </h2>
        <p className="text-lg text-white/70 mt-4 max-w-2xl mx-auto">
          Book a free 30-minute consultation. We&apos;ll map your goals to the right
          service mix — and tell you honestly if we&apos;re not the right fit.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="btn-cta border-0 cursor-pointer font-bold text-sm px-7 py-6 h-auto"
          >
            Get Free Growth Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-[#0F2557] cursor-pointer font-bold text-sm px-7 py-6 h-auto bg-transparent w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" />
              WhatsApp Now
            </Button>
          </a>
        </div>

        {/* Direct contact options — all working links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/70">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   BLOGS RELATED TO OUR SERVICES — service-linked insights for clients
   ════════════════════════════════════════════════════════════════════════ */

interface ServiceBlog {
  id: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  serviceId: string
  serviceLabel: string
  type: 'Blog' | 'Insert'
  icon: LucideIcon
}

const serviceBlogs: ServiceBlog[] = [
  {
    id: 'sb-1',
    category: 'Digital Marketing',
    title: 'How We Built a 3.2x ROAS Meta Ads Funnel for a D2C Skincare Brand',
    excerpt:
      'A breakdown of the 3-tier funnel — cold audience video ads, retargeting with social proof, and abandonment recovery — that took a D2C skincare brand from ₹2.1L to ₹8.4L monthly revenue in 90 days.',
    readTime: '8 min',
    date: 'Nov 18, 2025',
    serviceId: 'digital-marketing',
    serviceLabel: 'Digital Marketing',
    type: 'Blog',
    icon: BarChart3,
  },
  {
    id: 'sb-2',
    category: 'Website Development',
    title: 'Why Your Website Loads in 3.4s (and Why It Is Killing Your Leads)',
    excerpt:
      'A real audit of a real estate developer\'s site — what we found, what we fixed (image optimisation, code splitting, CDN, lazy load), and how load time dropped from 3.4s to 1.2s and leads jumped 220%.',
    readTime: '7 min',
    date: 'Nov 14, 2025',
    serviceId: 'website-development',
    serviceLabel: 'Website Development',
    type: 'Blog',
    icon: MonitorSmartphone,
  },
  {
    id: 'sb-3',
    category: 'D2C & E-Commerce',
    title: 'The Amazon + Shopify Stack We Use to Scale D2C Brands Past ₹50L/month',
    excerpt:
      'Marketplace vs storefront is a false choice. Here is how we run both in parallel — listing optimisation, ads, inventory sync, and fulfilment — without doubling the ops overhead.',
    readTime: '9 min',
    date: 'Nov 10, 2025',
    serviceId: 'd2c-ecommerce',
    serviceLabel: 'D2C & E-Commerce',
    type: 'Blog',
    icon: ShoppingBag,
  },
  {
    id: 'sb-4',
    category: 'BPO Services',
    title: 'How Stock Auditing Cut a Retail Chain\'s Shrinkage by 38%',
    excerpt:
      'A 28-store retail chain was losing ₹14L/year to shrinkage. A structured stock audit process — cycle counts, variance reports, root-cause fixes — brought it down to ₹4.2L in 6 months.',
    readTime: '6 min',
    date: 'Nov 06, 2025',
    serviceId: 'bpo-services',
    serviceLabel: 'BPO Services',
    type: 'Insert',
    icon: ClipboardCheck,
  },
  {
    id: 'sb-5',
    category: 'Consultancy',
    title: 'Real Estate Advisory: The 5 Questions Every Developer Should Ask Before Launching',
    excerpt:
      'Before you pour capital into a new project, answer these five questions. We use them in every real estate advisory engagement — they have saved clients from ₹2Cr+ in mispriced launches.',
    readTime: '5 min',
    date: 'Nov 02, 2025',
    serviceId: 'consultancy',
    serviceLabel: 'Consultancy',
    type: 'Insert',
    icon: LineChart,
  },
  {
    id: 'sb-6',
    category: 'Events',
    title: 'A Product Launch That Generated 200+ Qualified Leads (Not Just Attendance)',
    excerpt:
      'Most product launches measure footfall. We measure pipeline. Here is the playbook we used for a SaaS product launch — pre-event nurture, on-site demo qualifier, post-event follow-up — that closed 18 deals.',
    readTime: '7 min',
    date: 'Oct 28, 2025',
    serviceId: 'community-events',
    serviceLabel: 'Community & Events',
    type: 'Blog',
    icon: CalendarDays,
  },
  {
    id: 'sb-7',
    category: 'Digital Marketing',
    title: 'SEO for Healthcare: Why Local + Trust Signals Beat Keywords',
    excerpt:
      'Healthcare SEO is not about stuffing keywords. It is about local pack rankings, Google Business Profile, patient reviews, schema markup, and trust content. Here is what actually moves the needle for clinics and hospitals.',
    readTime: '8 min',
    date: 'Oct 22, 2025',
    serviceId: 'digital-marketing',
    serviceLabel: 'Digital Marketing',
    type: 'Blog',
    icon: Search,
  },
  {
    id: 'sb-8',
    category: 'Website Development',
    title: 'Landing Page vs Full Website: Where to Spend Your First ₹50,000',
    excerpt:
      'A common question from founders. The honest answer depends on your stage, traffic source, and conversion goal. Here is the decision framework we walk every new client through.',
    readTime: '4 min',
    date: 'Oct 18, 2025',
    serviceId: 'website-development',
    serviceLabel: 'Website Development',
    type: 'Insert',
    icon: Target,
  },
]

function ServiceBlogs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const { setCurrentPage } = usePage()

  return (
    <section className="py-14 md:py-20 bg-white border-t border-[#E5E9F0]" aria-label="Blogs related to our services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E6] border border-[#F5A623]/25 text-[#0F2557] text-xs font-bold tracking-wide uppercase mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-[#F5A623]" />
            Insights &amp; Case Notes
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mb-3">
            Blogs Related to Our Services
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto">
            Real work, real numbers, real breakdowns. Each piece is tied to a service we actually deliver —
            so you can see exactly how we think and execute before you talk to us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {serviceBlogs.map((blog, i) => {
            const Icon = blog.icon
            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group flex flex-col rounded-2xl bg-[#F5F7FA] border border-[#E5E9F0] p-5 hover:border-[#F5A623]/40 hover:shadow-lg hover:shadow-[#0F2557]/5 hover:bg-white transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                  >
                    <Icon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${
                    blog.type === 'Blog'
                      ? 'bg-[#EEF2FA] text-[#0F2557] border-[#0F2557]/15'
                      : 'bg-[#FFF7E6] text-[#F5A623] border-[#F5A623]/25'
                  }`}>
                    {blog.type}
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wide text-[#F5A623] mb-1.5">
                  {blog.category}
                </div>
                <h3 className="text-sm md:text-[15px] font-bold text-[#0F2557] leading-snug mb-2 group-hover:text-[#1A3A6E] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#5A6478] leading-relaxed mb-4 flex-1">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E9F0]">
                  <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF] font-medium">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> {blog.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0F2557] group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            onClick={() => setCurrentPage('blog')}
            variant="outline"
            className="border-[#0F2557]/20 text-[#0F2557] hover:bg-[#0F2557] hover:text-white font-bold text-sm px-6 py-5 h-auto cursor-pointer group"
          >
            Read All Blogs &amp; Insights
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Q&A FOR PROFESSIONALS — founder / CXO / BDE focused
   ════════════════════════════════════════════════════════════════════════ */

interface QAItem {
  question: string
  answer: string
  audience: string
}

const qaItems: QAItem[] = [
  {
    question: 'Do you work with a single service, or do I have to buy a bundle?',
    answer:
      'Either. Most clients start with one service — usually digital marketing or website development — and add more as they see results. We never force a bundle. If you only need SEO, you only pay for SEO. If you later need a landing page or BPO support, the team already knows your business so onboarding is instant.',
    audience: 'Founders & CXOs',
  },
  {
    question: 'How do you price — retainer, project, or performance?',
    answer:
      'All three models are available depending on the service. Digital marketing and BPO are typically monthly retainers. Website development and events are project-based. Performance-based pricing (where part of our fee is tied to leads or revenue) is available for qualified accounts after a 90-day baseline. We will recommend the model that fits your stage during the free consultation.',
    audience: 'Founders & Finance',
  },
  {
    question: 'What reporting do I get? How do I know the work is being done?',
    answer:
      'Every service comes with a monthly report tied to revenue, leads, or cost — not vanity metrics. Digital marketing clients get a live dashboard (Meta Ads, Google Ads, GA4) plus a monthly review call. BPO clients get SLA adherence reports. Website clients get staging links and a launch checklist. You always know what was done and what it returned.',
    audience: 'CXOs & Marketing Heads',
  },
  {
    question: 'We already have an in-house marketing/ops team. Do you replace them or work alongside?',
    answer:
      'We work alongside them. Most of our clients have a small in-house team and use us to extend capacity or add specialist skills (SEO, performance ads, development, stock audits) that they do not want to hire full-time for. We slot in as an embedded partner, share a common reporting cadence, and never create turf wars.',
    audience: 'Founders & Team Leads',
  },
  {
    question: 'What is the minimum commitment and onboarding timeline?',
    answer:
      'Digital marketing and BPO retainers start at a 3-month commitment — long enough to show results, short enough to exit if it is not working. Website development is a scoped project with a fixed timeline (typically 3-8 weeks depending on scope). Onboarding takes 5-7 business days: kickoff, access handover, strategy, and first execution cycle.',
    audience: 'Founders & Operations',
  },
  {
    question: 'Can you white-label your services for my agency or consultancy?',
    answer:
      'Yes. We white-label digital marketing, website development, and BPO for agencies and consultants who want to offer these services without building the delivery team. You own the client relationship; we do the work under your brand. NDAs, white-labelled reports, and NDA-protected team communication are standard.',
    audience: 'Agency Owners & BDEs',
  },
  {
    question: 'I am a BDE / consultant. Can I refer clients and earn a commission?',
    answer:
      'Yes. We have a referral partner program for BDEs and consultants who introduce clients to any of our services. You earn a commission on the first 3 months of retainer revenue (or a flat fee on projects) for every client that signs. We provide pitch decks, service one-pagers, and Q&A scripts to help you close. Email partner@bizmeals.in to enroll.',
    audience: 'BDEs & Consultants',
  },
  {
    question: 'Which industries do you have the most proven experience in?',
    answer:
      'Six industries where we have repeatable, documented playbooks: D2C & e-commerce, real estate, healthcare (clinics & hospitals), education, manufacturing & B2B, and restaurants & hospitality. If your business is outside these, we will tell you honestly in the consultation — and refer you to a better-fit partner if needed.',
    audience: 'Founders & CXOs',
  },
]

function ServiceQA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-14 md:py-20 bg-[#F5F7FA] border-t border-[#E5E9F0]" aria-label="Q&A for professionals">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0F2557]/15 text-[#0F2557] text-xs font-bold tracking-wide uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#0F2557]" />
            For Professionals
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] mb-3">
            Q&amp;A for Professionals
          </h2>
          <p className="text-sm md:text-base text-[#5A6478] max-w-2xl mx-auto">
            The questions founders, CXOs, and BDEs actually ask before signing up. Clear answers,
            no sales fluff — so you can decide fast and pitch accurately.
          </p>
        </motion.div>

        <div className="space-y-3">
          {qaItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden hover:border-[#0F2557]/20 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#0F2557]/10">
                        {item.audience}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#0F2557] pr-2 group-hover:text-[#1A3A6E] transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#F5A623]' : 'bg-[#EEF2FA] group-hover:bg-[#0F2557]/10'}`}>
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#1A1A1A]' : 'text-[#0F2557]'}`} />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="pl-4 border-l-2 border-[#F5A623]">
                      <p className="text-sm text-[#3D4452] leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ════════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
      <ProcessStrip />
      <WhyOnePartner />
      <ServiceBlogs />
      <ServiceQA />
      <FinalCTA />
    </>
  )
}
