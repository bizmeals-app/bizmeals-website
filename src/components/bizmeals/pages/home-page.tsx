'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, type ElementType } from 'react'
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  Building2,
  Search,
  Layers,
  Rocket,
  ShieldCheck,
  AlertTriangle,
  Factory,
  ShoppingCart,
  Heart,
  GraduationCap,
  Star,
  Quote,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Zap,
  ChevronRight,
  Award,
  Briefcase,
  Globe,
  Check,
  X,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'
import { AnimatedNumber } from '@/components/bizmeals/animated-section'
import {
  siteConfig,
  heroTrustBar,
  realResultsMetrics,
  caseStudies,
  testimonials,
} from '@/lib/site-config'

/* ════════════════════════════════════════════════════════════════════════
   SHARED TEXT ANIMATIONS — simple, premium, attention-grabbing
   ════════════════════════════════════════════════════════════════════════ */

/** Rotating word — cycles through words with a smooth vertical slide. */
function RotatingWord({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="relative inline-block align-baseline" style={{ minWidth: '4.5ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '0.55em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.55em', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-block ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Word-by-word stagger heading — premium first-load reveal. */
function StaggerHeading({
  words,
  className = '',
  baseDelay = 0.15,
}: {
  words: string[]
  className?: string
  baseDelay?: number
}) {
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: baseDelay + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}

/** Standard animated section heading — badge + title + accent + subtitle. */
function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  title,
  accent,
  subtitle,
  tone = 'light',
}: {
  badge: string
  badgeIcon?: ElementType
  title: string
  accent?: string
  subtitle?: string
  tone?: 'light' | 'dark'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isDark = tone === 'dark'
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-14"
    >
      <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase mb-5 ${
          isDark
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-[#EEF2FA] border-[#D5DEEE] text-[#0F2557]'
        }`}
      >
        {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#F5A623]" />}
        {badge}
      </span>
      <h2
        className={`text-3xl md:text-5xl font-black leading-tight ${
          isDark ? 'text-white' : 'text-[#0F2557]'
        }`}
      >
        {title} {accent && <span className="text-[#F5A623]">{accent}</span>}
      </h2>
      {subtitle && (
        <p className={`text-lg mt-4 ${isDark ? 'text-white/70' : 'text-[#5A6478]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   HERO SECTION — premium, tagline + animated heading + rotating word
   "Not an Agency. A Growth Partner." is now a TAGLINE, not the H1.
   ════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const { setCurrentPage } = usePage()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-navy-section"
      aria-label="BizMeals — Business Growth Execution Partner"
    >
      {/* Background grid + decorative blobs */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-[#1E3A8A]/20 blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            BUSINESS GROWTH EXECUTION PARTNER
          </motion.div>

          {/* H1 — entity-clear, aligns with the title tag (same core topic, not a duplicate) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
            <span className="block">
              <StaggerHeading words={['BizMeals:']} baseDelay={0.15} />
            </span>
            <span className="block mt-1">
              <StaggerHeading words={['Business', 'Growth']} baseDelay={0.35} />
              <span className="text-[#F5A623]"> Execution Partner.</span>
            </span>
          </h1>

          {/* Rotating brand line (preserved animation) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mt-4"
          >
            We engineer{' '}
            <RotatingWord
              words={['growth.', 'revenue.', 'scale.', 'impact.']}
              className="text-[#F5A623]"
            />
          </motion.p>

          {/* Top summary answer — concise bottom-line for AI extraction */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base md:text-lg text-white/70 mt-6 max-w-2xl leading-relaxed"
          >
            BizMeals is a Business Growth Execution Partner for startups, SMEs and founders.
            We combine strategy, execution and an expert network to plan, execute and scale
            growth — under one roof.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Button
              onClick={() => setCurrentPage('contact')}
              className="btn-cta border-0 cursor-pointer font-bold text-sm px-6 py-6 h-auto"
            >
              Get Free Growth Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => setCurrentPage('contact')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-[#0F2557] cursor-pointer font-bold text-sm px-6 py-6 h-auto bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Book Strategy Call
            </Button>
          </motion.div>

          {/* WhatsApp quick link */}
          <motion.a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white/70 hover:text-white transition-colors group cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
            or WhatsApp us now — {siteConfig.contact.phone}
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Trust bar — consistent numbers, matches footer & about */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15 max-w-2xl"
          >
            {heroTrustBar.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-white/60 font-semibold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40"
        aria-hidden="true"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   INDUSTRIES MARQUEE — slow, premium, attention-grabbing text scroll
   ════════════════════════════════════════════════════════════════════════ */
function ClientLogosSection() {
  const industries = [
    'Manufacturing',
    'Real Estate',
    'E-Commerce',
    'Healthcare',
    'Education',
    'Retail',
    'Startups',
    'Hospitality',
    'Food & Beverage',
    'Construction',
    'Technology',
    'Professional Services',
  ]
  const loop = [...industries, ...industries]
  return (
    <section
      id="industries"
      className="py-10 md:py-14 border-y border-[#E5E9F0] bg-white overflow-hidden"
      aria-label="Industries we serve"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[#5A6478]">
          Trusted across industries
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex gap-x-10 gap-y-3 whitespace-nowrap w-max"
        >
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-base md:text-lg font-bold text-[#0F2557]/60 hover:text-[#0F2557] transition-colors"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   SERVICES OVERVIEW — moved up so visitors see what we do early
   ════════════════════════════════════════════════════════════════════════ */
const services = [
  { icon: TrendingUp, title: 'Digital Marketing', desc: 'Performance ads, SEO, social — built to drive revenue, not likes.', tags: [] as string[] },
  { icon: Briefcase, title: 'BPO Services', desc: 'Back-office, support, and operations — so you focus on growth.', tags: [] as string[] },
  { icon: Building2, title: 'Consultancy', desc: 'Market entry, real estate, and strategy advisory from experts.', tags: [] as string[] },
  { icon: Users, title: 'Event Management', desc: 'Launches, expos, and experiences that generate real leads.', tags: [] as string[] },
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Custom, conversion-focused websites for D2C & E-commerce brands, real estate developers, hospitals & healthcare providers, and growing businesses across industries.',
    tags: ['D2C & E-Commerce', 'Real Estate', 'Healthcare & Hospitals', 'Startups & Local Businesses'],
  },
]

function ServicesSection() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="our-services" className="py-20 md:py-28 relative" aria-label="Our services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Do"
          badgeIcon={Layers}
          title="One Partner."
          accent="Every Growth Lever."
          subtitle="Stop juggling vendors. Get strategy, execution, and management under one roof."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FA] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0F2557]" />
                </div>
                <h3 className="text-base font-bold text-[#0F2557] mb-2">{s.title}</h3>
                <p className="text-sm text-[#5A6478] leading-relaxed">{s.desc}</p>
                {s.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#D5DEEE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Descriptive internal link — anchor text describes the destination */}
                <button
                  type="button"
                  onClick={() => setCurrentPage('services')}
                  className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-[#0F2557] hover:text-[#F5A623] transition-colors"
                >
                  Explore our {s.title.toLowerCase()} services
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )
          })}

          {/* 6th cell — navy CTA card (fills the grid cleanly) */}
          <motion.button
            type="button"
            onClick={() => setCurrentPage('services')}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: services.length * 0.1 }}
            className="rounded-2xl p-6 text-left card-hover cursor-pointer relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
            aria-label="Explore all services"
          >
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <ArrowRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Explore All Services</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                From websites to branding, training to audits — see the full toolkit we use to grow businesses.
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   "WHY MOST AGENCIES FAIL"
   ════════════════════════════════════════════════════════════════════════ */
const agencyFailures = [
  {
    icon: Target,
    title: 'Strategy Without Execution',
    desc: 'Most agencies hand you a 50-page deck and disappear. Strategy is useless without someone to execute it.',
  },
  {
    icon: Layers,
    title: 'Fragmented Vendors',
    desc: 'Designer, ads guy, content writer, developer — nobody talks to each other. You become the project manager.',
  },
  {
    icon: AlertTriangle,
    title: 'Vanity Metrics',
    desc: 'Impressions and reach look good in reports. But they don\'t pay the bills. Revenue does.',
  },
  {
    icon: ShieldCheck,
    title: 'No Skin in the Game',
    desc: 'Agencies get paid regardless of outcome. We tie our success to yours — execution partners, not vendors.',
  },
]

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-20 md:py-28 bg-[#F5F7FA] relative overflow-hidden" aria-label="Why most agencies fail">
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="The Growth Gap"
          badgeIcon={AlertTriangle}
          title="Why Most Agencies"
          accent="Fail to Deliver"
          subtitle="Businesses don't fail because of bad ideas. They fail because the gap between strategy and execution never gets closed."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {agencyFailures.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-base font-bold text-[#0F2557] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5A6478] leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   HOW IT WORKS — 6 steps (AEO-optimised, mirrors the FAQ answer)
   ════════════════════════════════════════════════════════════════════════ */
const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Understand the Business',
    desc: 'We deep-dive into your business, market and goals. No templates — a custom growth map built for your reality.',
  },
  {
    num: '02',
    icon: Target,
    title: 'Define Strategy & Goals',
    desc: 'We translate your reality into a clear strategy with measurable goals — positioning, channels, milestones and success metrics.',
  },
  {
    num: '03',
    icon: Users,
    title: 'Assign the Right Experts',
    desc: 'We assemble the right execution team from our expert network — strategy, design, ads, content, tech, ops — per project, not forced onto you.',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Execute the Project',
    desc: 'We don\u2019t hand you a plan and leave. We run the playbooks, manage the vendors and ship the work — end to end.',
  },
  {
    num: '05',
    icon: ShieldCheck,
    title: 'Measure Results',
    desc: 'Every initiative is tracked against revenue and lead KPIs — not vanity metrics. You always know what is working and what is not.',
  },
  {
    num: '06',
    icon: TrendingUp,
    title: 'Optimize & Scale',
    desc: 'Once the system works, we optimize it and scale — more channels, more geography, more revenue, predictably.',
  },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative" aria-label="How BizMeals works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          badgeIcon={Sparkles}
          title="From Strategy to"
          accent="Scale in 6 Steps"
          subtitle="A clear, accountable path — no mystery, no jargon, no hand-offs that fall through the cracks."
        />

        <ol ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative list-none m-0 p-0">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#0F2557]/10 via-[#0F2557]/20 to-[#0F2557]/10 pointer-events-none" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-6 card-hover h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-[#0F2557]/15"
                      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-black text-[#0F2557]/10">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2557] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5A6478] leading-relaxed">{step.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   WHY CHOOSE BIZMEALS — differentiators (premium split layout)
   ════════════════════════════════════════════════════════════════════════ */
const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Execution, Not Decks',
    desc: 'We don\'t hand you a strategy PDF and vanish. We run the playbooks, manage the vendors, and ship the work — end to end.',
  },
  {
    icon: Users,
    title: 'Expert Network On-Demand',
    desc: 'A curated network of specialists — designers, media buyers, developers, copywriters — assembled per project, not forced onto you.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Is The Only KPI',
    desc: 'Impressions don\'t pay salaries. We tie our success to your revenue growth, not vanity metrics that look good in slides.',
  },
  {
    icon: Zap,
    title: 'One Partner, Every Lever',
    desc: 'Stop juggling 5 vendors who never talk to each other. Strategy, creative, ads, tech, ops — under one roof, one point of contact.',
  },
]

function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Why choose BizMeals">
      {/* Navy split background — left panel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[42%] bg-navy-section" />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[42%] grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute left-1/4 top-1/3 w-72 h-72 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — heading on navy */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              Why BizMeals
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black leading-tight text-white"
            >
              We&apos;re Not Another <span className="text-[#F5A623]">Agency.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-white/70 mt-5 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Most agencies sell deliverables. We sell outcomes. Here&apos;s what makes us
              fundamentally different — and why founders stay with us for years, not months.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['R', 'P', 'A', 'S'].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#0F2557] flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: `linear-gradient(135deg, ${i % 2 ? '#1E3A8A' : '#0F2557'}, ${i % 2 ? '#0F2557' : '#1E3A8A'})` }}
                    aria-hidden="true"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/70 font-semibold">
                50+ founders trust BizMeals
              </span>
            </motion.div>
          </div>

          {/* Right — differentiator cards on light bg */}
          <div ref={ref} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden group"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                  >
                    <Icon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F2557] mb-2">{d.title}</h3>
                  <p className="text-sm text-[#5A6478] leading-relaxed">{d.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   REAL RESULTS — stat counters + case study cards
   ════════════════════════════════════════════════════════════════════════ */
const caseStudyIcons: Record<string, React.ElementType> = {
  Factory, Building2, ShoppingCart, Rocket, Heart, GraduationCap,
}

function ResultsSection() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-20 md:py-28 bg-[#F5F7FA] relative overflow-hidden" aria-label="Real results">
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      {/* Decorative amber glow */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#F5A623]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full bg-[#1E3A8A]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Proven Results"
          badgeIcon={Award}
          title="Numbers That"
          accent="Speak"
          subtitle="Real outcomes from real businesses we've helped grow — not vanity metrics, just revenue."
        />

        {/* ── Stat counters — premium cards with gradient accents ── */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {realResultsMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center card-hover relative overflow-hidden group"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F2557] via-[#1E3A8A] to-[#F5A623]" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/0 to-[#F5A623]/0 group-hover:from-[#F5A623]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="relative">
                <div className="text-4xl md:text-5xl font-black text-[#0F2557] mb-2 leading-none">
                  <AnimatedNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    isDecimal={'isDecimal' in metric ? (metric as { isDecimal?: boolean }).isDecimal : false}
                  />
                </div>
                <div className="w-8 h-0.5 bg-[#F5A623] mx-auto my-3 rounded-full" />
                <div className="text-sm font-semibold text-[#5A6478]">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Case study cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => {
            const Icon = caseStudyIcons[cs.icon] || Briefcase
            return (
              <motion.div
                key={cs.industry}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F2557] to-[#1E3A8A] opacity-80" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2FA] flex items-center justify-center group-hover:bg-[#0F2557] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#0F2557] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-[#5A6478]">
                    {cs.industry}
                  </span>
                </div>
                <div className="text-2xl font-black text-[#0F2557] mb-4">{cs.headline}</div>
                <div className="flex flex-wrap gap-4 mb-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-sm font-bold text-[#1E3A8A]">{m.value}</div>
                      <div className="text-[10px] text-[#5A6478] uppercase tracking-wide">{m.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#5A6478] leading-relaxed">{cs.summary}</p>
              </motion.div>
            )
          })}
        </div>

        <p className="text-center text-xs text-[#5A6478]/70 mt-8 italic">
          * Results are representative of typical client outcomes. Individual results vary.
        </p>

        <div className="text-center mt-8">
          <Button
            onClick={() => setCurrentPage('portfolio')}
            variant="outline"
            className="border-[#0F2557] text-[#0F2557] hover:bg-[#0F2557] hover:text-white cursor-pointer font-bold text-sm bg-transparent"
          >
            View Full Case Studies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-20 md:py-28 relative" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Client Voices"
          badgeIcon={Star}
          title="What Founders Say"
          accent="About Us"
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 card-hover relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F2557] to-[#1E3A8A]" />
              <Quote className="w-8 h-8 text-[#0F2557]/10 mb-3" />

              <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                ))}
              </div>

              <p className="text-sm text-[#1A1A1A] leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E9F0]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                  aria-hidden="true"
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F2557]">{t.name}</div>
                  <div className="text-xs text-[#5A6478]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   FOUNDER SECTION
   ════════════════════════════════════════════════════════════════════════ */
function FounderSection() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Founder">
      <div className="absolute inset-0 bg-navy-section" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
        >
          {/* Founder avatar — initials (replace with real headshot when available) */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-[#F5A623]/20 blur-2xl" />
              <div
                className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl flex items-center justify-center border-4 border-white/10 shadow-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                role="img"
                aria-label={`${siteConfig.founder.name} avatar — initials MR`}
              >
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
                <span className="relative text-7xl md:text-8xl font-black text-white tracking-tight">
                  {siteConfig.founder.initials}
                </span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <Quote className="w-10 h-10 text-[#F5A623] mb-4 mx-auto lg:mx-0" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
              &ldquo;We didn&apos;t build BizMeals to be another agency. We built it to be
              the growth partner we wished we had — one that owns execution end-to-end
              and treats your revenue as the only metric that matters.&rdquo;
            </blockquote>
            <div className="mt-6">
              <div className="text-lg font-bold text-white">{siteConfig.founder.name}</div>
              <div className="text-sm text-[#F5A623] font-semibold">{siteConfig.founder.role}, BizMeals</div>
            </div>

            <Button
              onClick={() => setCurrentPage('founder')}
              variant="outline"
              className="mt-6 border-white/30 text-white hover:bg-white hover:text-[#0F2557] cursor-pointer font-bold text-sm bg-transparent"
            >
              Read Founder Story
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════════════════════════════════════ */
function FinalCTASection() {
  const { setCurrentPage } = usePage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Get started">
      <div className="absolute inset-0 bg-navy-section" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          Let&apos;s Build Together
        </motion.span>

        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Ready to Build Something That <span className="text-[#F5A623]">Lasts?</span>
        </h2>
        <p className="text-lg text-white/70 mt-4 max-w-2xl mx-auto">
          Get a free, no-obligation growth plan tailored to your business. No fluff, no
          pressure — just a clear path forward.
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

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/70">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {siteConfig.contact.address}
          </span>
        </div>
      </motion.div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   WHAT IS BIZMEALS — top-of-page AI answer + GEO summary
   Directly answers "What is BizMeals?" for humans, search engines and LLMs.
   Factual. No invented stats.
   ════════════════════════════════════════════════════════════════════════ */
function WhatIsBizMealsSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-white border-b border-[#E5E9F0]" aria-label="What is BizMeals">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FA] border border-[#D5DEEE] text-[#0F2557] text-xs font-bold tracking-wide uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            What is BizMeals?
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#0F2557] leading-tight mb-5 max-w-3xl mx-auto">
            BizMeals is a Business Growth Execution Partner.
          </h2>
          <p className="text-base md:text-lg text-[#5A6478] leading-relaxed max-w-3xl mx-auto">
            BizMeals helps startups, SMEs and growing businesses plan, execute and scale
            growth. We combine strategy, consulting, digital marketing, lead generation,
            BPO and project execution under one roof — supported by a network of trained
            professionals, freelancers and specialist partners. Instead of handing you a
            strategy deck, we run the work end to end.
          </p>
        </motion.div>

        {/* GEO / AI summary — structured, machine- and human-readable */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
        >
          {[
            { label: 'Who', value: 'BizMeals (BizMeals Management Solutions Pvt Ltd)' },
            { label: 'What', value: 'Business Growth Execution Partner' },
            { label: 'Serves', value: 'Startups, SMEs, growing businesses & founders' },
            { label: 'Where', value: 'Bangalore, India — serving clients across India' },
          ].map((item) => (
            <div key={item.label} className="glass-card rounded-xl p-5 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623] mb-2">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-[#0F2557] leading-snug">{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* What makes the model different — concise bullets */}
        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 list-none p-0 m-0"
        >
          {[
            'Strategy + execution in one accountable team — not a deck and a hand-off',
            'An on-demand expert network assembled per project, not forced onto you',
            'Revenue and leads as the only KPIs — no vanity metrics',
          ].map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-[#5A6478]">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#0F2557]/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-[#0F2557]" />
              </span>
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </motion.ul>

        {/* Internal links — descriptive anchor text to in-page sections */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-[#5A6478] mt-8"
        >
          Learn{' '}
          <a href="#how-it-works" className="font-semibold text-[#0F2557] hover:text-[#F5A623] underline underline-offset-2">
            how BizMeals works
          </a>
          , see{' '}
          <a href="#who-we-serve" className="font-semibold text-[#0F2557] hover:text-[#F5A623] underline underline-offset-2">
            who BizMeals is for
          </a>
          , or explore our{' '}
          <a href="#our-services" className="font-semibold text-[#0F2557] hover:text-[#F5A623] underline underline-offset-2">
            business growth services
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   WHO BIZMEALS IS FOR — audience clarity
   Each audience + the business problem BizMeals solves for them.
   ════════════════════════════════════════════════════════════════════════ */
const audiences = [
  {
    icon: Rocket,
    title: 'Startups & Founders',
    problem: 'Need strategy, product go-to-market, first customers and fundraising support — without hiring a full team upfront.',
    solution: 'BizMeals acts as your growth co-pilot: validate the market, build go-to-market, acquire customers and prepare for investors.',
  },
  {
    icon: Building2,
    title: 'Small & Medium Businesses',
    problem: 'Need continuous marketing, leads and operations support without the overhead of multiple vendors or in-house hires.',
    solution: 'A dedicated growth team under a monthly retainer — ads, SEO, content, website and back-office, all under one roof.',
  },
  {
    icon: TrendingUp,
    title: 'Growing Companies',
    problem: 'Need to scale across channels and regions while keeping execution quality and accountability high.',
    solution: 'End-to-end project execution with senior strategists, real-time reporting and a single point of contact.',
  },
  {
    icon: Briefcase,
    title: 'Businesses Needing Strategy + Execution',
    problem: 'Have a goal but no clear path — and no one to run the work after the plan is made.',
    solution: 'One partner that defines the strategy and then executes it end to end, so the gap between plan and results closes.',
  },
]

function WhoBizMealsIsForSection() {
  const { setCurrentPage } = usePage()
  return (
    <section id="who-we-serve" className="py-20 md:py-28 bg-[#F5F7FA] relative overflow-hidden" aria-label="Who BizMeals is for">
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Who BizMeals Is For"
          badgeIcon={Users}
          title="Built for the people who"
          accent="actually run businesses"
          subtitle="Whether you are just starting out or scaling fast, BizMeals plugs in as the growth partner you do not have to manage."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {audiences.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FA] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0F2557]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F2557] mb-2">{a.title}</h3>
                <p className="text-sm text-[#5A6478] leading-relaxed mb-3">
                  <span className="font-semibold text-[#0F2557]">The problem:</span> {a.problem}
                </p>
                <p className="text-sm text-[#5A6478] leading-relaxed">
                  <span className="font-semibold text-[#0F2557]">How BizMeals helps:</span> {a.solution}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Use-case clarity — when to use BizMeals, which use cases, which industries */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-[#5A6478] max-w-3xl mx-auto mt-10 leading-relaxed"
        >
          <span className="font-semibold text-[#0F2557]">When to use BizMeals:</span> when you need both
          strategy and execution — for launching a startup, scaling an SME, entering a new market, or
          running continuous growth across industries including{' '}
          <span className="font-semibold text-[#0F2557]">manufacturing, real estate, e-commerce, healthcare, education and more</span>.
        </motion.p>

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setCurrentPage('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
          >
            Talk to BizMeals about your business
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   BIZMEALS vs TRADITIONAL AGENCIES — factual comparison
   Defensible, no unsupported superiority claims.
   ════════════════════════════════════════════════════════════════════════ */
const comparisonRows = [
  { factor: 'Strategy', bizmeals: 'Defined with you and executed by the same team', agency: 'Often a deck handed over separately from execution' },
  { factor: 'Execution', bizmeals: 'Hands-on, end to end — playbooks, vendors, shipping', agency: 'Usually siloed across departments or outsourced' },
  { factor: 'Expert Network', bizmeals: 'On-demand specialists assembled per project', agency: 'Fixed in-house team, often generalist' },
  { factor: 'Project Management', bizmeals: 'One accountable partner owns delivery', agency: 'Client often becomes the project manager' },
  { factor: 'Capabilities', bizmeals: 'Marketing, consulting, BPO, web, events in one', agency: 'Typically marketing-only' },
  { factor: 'Startup Support', bizmeals: 'Equity, hybrid and founder-friendly models', agency: 'Fixed retainers, rarely equity-friendly' },
  { factor: 'Scalability', bizmeals: 'Scale up or down per project and stage', agency: 'Tied to retainer tiers and headcount' },
  { factor: 'Engagement Model', bizmeals: 'Project, retainer, equity or hybrid', agency: 'Mostly monthly retainers' },
]

function BizMealsVsAgenciesSection() {
  return (
    <section id="bizmeals-vs-agencies" className="py-20 md:py-28 bg-white relative overflow-hidden" aria-label="BizMeals vs traditional agencies">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="The Difference"
          badgeIcon={ShieldCheck}
          title="BizMeals vs"
          accent="Traditional Agencies"
          subtitle="A factual comparison of how the two models actually work — no unsupported claims."
        />

        <motion.table
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full glass-card rounded-2xl overflow-hidden border border-[#E5E9F0] border-collapse"
        >
          <caption className="sr-only">
            Comparison of BizMeals (Business Growth Execution Partner) vs a traditional agency
            across strategy, execution, expert network, project management, capabilities,
            startup support, scalability and engagement model.
          </caption>
          <thead className="bg-[#0F2557] text-white">
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-bold uppercase tracking-wider text-white/70">Factor</th>
              <th scope="col" className="p-4 text-left text-xs font-bold uppercase tracking-wider text-[#F5A623]">BizMeals</th>
              <th scope="col" className="p-4 text-left text-xs font-bold uppercase tracking-wider text-white/70">Traditional Agency</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'}>
                <th scope="row" className="p-4 text-left text-sm font-semibold text-[#0F2557] align-top">{row.factor}</th>
                <td className="p-4 text-sm text-[#5A6478] leading-snug align-top">
                  <span className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0F2557] shrink-0 mt-0.5" />
                    <span>{row.bizmeals}</span>
                  </span>
                </td>
                <td className="p-4 text-sm text-[#5A6478] leading-snug align-top">
                  <span className="flex items-start gap-2">
                    <X className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                    <span>{row.agency}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   HOMEPAGE FAQ — question-based headings (AEO) + answers.
   Mirrors the FAQPage JSON-LD in src/lib/structured-data.ts.
   ════════════════════════════════════════════════════════════════════════ */
const homepageFaqs = [
  {
    q: 'What is BizMeals?',
    a: 'BizMeals is a Business Growth Execution Partner. We help startups, SMEs and growing businesses plan, execute and scale growth by combining strategy, consulting, digital marketing, lead generation, BPO and project execution under one roof — supported by a network of trained professionals, freelancers and specialist partners.',
  },
  {
    q: 'Is BizMeals a digital marketing agency?',
    a: 'No. Digital marketing is one of the services we provide, but BizMeals is positioned as a Business Growth Execution Partner. We cover strategy, consulting, execution, operations and project management — not only marketing campaigns.',
  },
  {
    q: 'Who does BizMeals help?',
    a: 'BizMeals works with startups, small and medium businesses, growing companies and founders who need both strategy and execution support. We also work with established enterprises that need a dedicated execution partner.',
  },
  {
    q: 'What services does BizMeals provide?',
    a: 'BizMeals provides business growth strategy and consulting, digital marketing (SEO, social media, paid ads), lead generation, BPO and back-office services, project execution, and website development — all managed under one accountable partner.',
  },
  {
    q: 'How does BizMeals work?',
    a: 'BizMeals works in six steps: (1) understand the business, (2) define strategy and goals, (3) assign the right experts, (4) execute the project, (5) measure results, and (6) optimize and scale. One team owns strategy through execution so nothing falls through the cracks.',
  },
  {
    q: 'How is BizMeals different from a traditional agency?',
    a: 'Traditional agencies typically hand over a strategy deck and silo execution. BizMeals combines strategy and execution in one team, brings an on-demand expert network, manages projects end to end, and ties success to revenue rather than vanity metrics. Founders get one accountable partner instead of multiple uncoordinated vendors.',
  },
  {
    q: 'How can BizMeals help a startup?',
    a: 'For startups, BizMeals acts as a growth co-pilot — helping validate the market, build the go-to-market, acquire the first customers, set up marketing and operations, and prepare for fundraising. Founders can also engage on equity or hybrid models so incentives stay aligned.',
  },
  {
    q: 'How can BizMeals help a small business grow?',
    a: 'For small and medium businesses, BizMeals runs continuous growth — digital marketing, lead generation, SEO, website optimization and back-office support — under a monthly retainer, so owners get a full growth team without hiring in-house.',
  },
  {
    q: 'Where is BizMeals located and which areas does it serve?',
    a: 'BizMeals is based in Bangalore, Karnataka, India and serves clients across India through a digital-first, remote-friendly delivery model.',
  },
  {
    q: 'How can I contact BizMeals?',
    a: `You can contact BizMeals by phone at ${siteConfig.contact.phone} or ${siteConfig.contact.phone2}, by email at ${siteConfig.contact.email}, or through the contact form on the website. WhatsApp is also available for quick conversations.`,
  },
]

function HomepageFAQSection() {
  const { setCurrentPage } = usePage()
  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F5F7FA] relative overflow-hidden" aria-label="BizMeals frequently asked questions">
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Questions & Answers"
          badgeIcon={Lightbulb}
          title="Common questions about"
          accent="BizMeals"
          subtitle="Direct answers to what founders and business owners usually ask before reaching out."
        />

        {/* Always-visible Q&A — each question heading is immediately followed
            by its answer paragraph so search engines and AI answer engines
            can extract the answer from the initial HTML. */}
        <div className="space-y-4">
          {homepageFaqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="glass-card rounded-xl border border-[#E5E9F0] p-4 sm:p-5"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#0F2557] mb-2">{faq.q}</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setCurrentPage('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
          >
            Contact BizMeals
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <WhatIsBizMealsSection />
      <ServicesSection />
      <WhoBizMealsIsForSection />
      <ProblemSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <BizMealsVsAgenciesSection />
      <ResultsSection />
      <TestimonialsSection />
      <FounderSection />
      <HomepageFAQSection />
      <FinalCTASection />
    </>
  )
}
