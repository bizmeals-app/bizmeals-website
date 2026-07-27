'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Home,
  Lightbulb,
  Wrench,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Target,
  Rocket,
  BarChart3,
  Sparkles,
  Clock,
  Shield,
  TrendingUp,
  Compass,
  FileText,
  Calendar,
  Handshake,
  Zap,
  Layers,
  Award,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'
import { siteConfig } from '@/lib/site-config'

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const pillars = [
  {
    icon: Compass,
    title: 'Strategy',
    tagline: 'Direction before action',
    description:
      'Data-driven roadmaps crafted by senior operators — not junior account managers. Every engagement starts with a deep-dive into your business, market, and unit economics, ending with clear milestones and KPIs.',
    points: ['Market & competitor analysis', 'Revenue & unit-economics audit', '90-day milestone roadmap', 'Defined KPIs per channel'],
  },
  {
    icon: Wrench,
    title: 'Execution',
    tagline: 'We do the work, end-to-end',
    description:
      'Hands-on implementation across every channel — ads, SEO, content, web, ops, support. We do not hand you a strategy deck and disappear. The same team that plans the work also ships it, so nothing is lost in translation.',
    points: ['Full-stack delivery team', 'Weekly execution sprints', 'Shared dashboard access', 'Monthly review & reporting'],
  },
  {
    icon: Users,
    title: 'Expert Network',
    tagline: 'Specialists deployed on demand',
    description:
      '30+ specialists across marketing, engineering, design, finance, and operations — deployed into your account as needed. You get senior talent without the senior salary, and without hiring delays.',
    points: ['Senior specialists, not juniors', 'Deployed within 5-7 days', 'No hiring or onboarding cost', 'Scale up or down monthly'],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Understand',
    duration: 'Week 1',
    icon: Search,
    summary: 'Deep-dive into your business, market, competitors, and goals.',
    deliverables: [
      'Business & revenue model audit',
      'Competitor & market landscape',
      'Customer & channel analysis',
      'Goal-setting workshop with founder/CXO',
    ],
    outcome: 'A shared understanding of where you are and where you want to go — documented.',
  },
  {
    number: '02',
    title: 'Strategy',
    duration: 'Week 2',
    icon: Target,
    summary: 'A custom growth roadmap with clear milestones and KPIs.',
    deliverables: [
      'Channel & service mix recommendation',
      '90-day milestone roadmap',
      'KPI framework per channel',
      'Budget & resource allocation plan',
    ],
    outcome: 'A written strategy document you can take to any vendor — or execute with us.',
  },
  {
    number: '03',
    title: 'Execution',
    duration: 'Week 3 onwards',
    icon: Rocket,
    summary: 'Our expert team implements across all channels — end-to-end.',
    deliverables: [
      'Weekly execution sprints',
      'Live dashboard (ads, analytics, ops)',
      'Bi-weekly standup with your team',
      'Monthly performance review',
    ],
    outcome: 'Real work shipped every week — campaigns live, pages built, processes run.',
  },
  {
    number: '04',
    title: 'Optimization',
    duration: 'Ongoing',
    icon: BarChart3,
    summary: 'Continuous refinement for maximum ROI and scale.',
    deliverables: [
      'A/B testing across funnels & creatives',
      'Channel-level ROI optimization',
      'Quarterly strategy refresh',
      'Scale-up or scale-down recommendations',
    ],
    outcome: 'Compounding returns — what works gets more budget, what does not gets cut.',
  },
]

const comparisonData = [
  { feature: 'Approach', agency: 'Strategy only, execution outsourced', bizmeals: 'Strategy + execution under one roof' },
  { feature: 'Talent', agency: 'Junior account managers', bizmeals: 'Senior specialists & operators' },
  { feature: 'Solutions', agency: 'One-size-fits-all templates', bizmeals: 'Custom playbook per business' },
  { feature: 'Accountability', agency: 'Reports & retainer, no skin in game', bizmeals: 'Results-owned, performance options' },
  { feature: 'Reporting', agency: 'Vanity metrics (likes, impressions)', bizmeals: 'Revenue, leads, cost — tied to business' },
  { feature: 'Vendors', agency: 'Juggle 3-6 vendors per project', bizmeals: 'One team owns the whole stack' },
  { feature: 'Onboarding', agency: '4-8 weeks to first delivery', bizmeals: '5-7 days to first execution cycle' },
  { feature: 'Flexibility', agency: 'Locked annual contracts', bizmeals: '3-month retainers, project or hybrid' },
]

const trustStats = [
  { value: '12+', label: 'Years in Business', icon: Clock },
  { value: '500+', label: 'Projects Delivered', icon: Rocket },
  { value: '30+', label: 'Expert Specialists', icon: Users },
  { value: '3.2x', label: 'Average Client ROI', icon: TrendingUp },
]

const engagementModels = [
  {
    icon: Calendar,
    title: 'Monthly Retainer',
    bestFor: 'Ongoing growth services',
    description:
      'A fixed monthly fee for a defined scope of work across marketing, ops, or development. Best for services that need continuous execution — ads, SEO, support, store management.',
    includes: ['Defined monthly deliverables', 'Dedicated account lead', 'Live dashboard access', 'Monthly review call'],
    accent: 'navy',
  },
  {
    icon: FileText,
    title: 'Project-Based',
    bestFor: 'One-time builds & launches',
    description:
      'A scoped engagement with a fixed timeline and fixed price. Best for website builds, product launches, events, audits, and one-off strategy engagements.',
    includes: ['Fixed scope & timeline', 'Milestone-based billing', 'Staging/review checkpoints', 'Launch & handover'],
    accent: 'amber',
  },
  {
    icon: Layers,
    title: 'Hybrid / Performance',
    bestFor: 'Qualified accounts post-baseline',
    description:
      'A base retainer plus a performance component tied to leads, revenue, or cost savings. Available after a 90-day baseline so both sides have real data to align on.',
    includes: ['Lower base retainer', 'Performance bonus on results', 'Shared risk & reward', 'Quarterly target reset'],
    accent: 'navy',
  },
]

const faqItems = [
  {
    question: 'How quickly can we start after the first call?',
    answer:
      'Onboarding takes 5-7 business days from the kickoff call. That includes access handover, strategy finalisation, and the first execution cycle. For urgent launches, we can compress this to 3 days with a rush fee.',
  },
  {
    question: 'Do you replace our in-house team or work alongside it?',
    answer:
      'We work alongside it. Most clients have a small in-house team and use us to extend capacity or add specialist skills they do not want to hire full-time for. We slot in as an embedded partner with shared reporting — no turf wars.',
  },
  {
    question: 'What happens if a deliverable is delayed?',
    answer:
      'Delays are flagged in the weekly standup with a revised ETA and root cause. If we miss a committed milestone, we absorb the cost of the extra days — not you. Our SLA adherence across 2024 was 96.4%.',
  },
  {
    question: 'Can we switch engagement models mid-way?',
    answer:
      'Yes. Many clients start project-based (e.g. a website build), then move to a retainer once they see how we work. You can also switch from retainer to hybrid/performance after a 90-day baseline. We never lock you into a model that no longer fits.',
  },
  {
    question: 'Who owns the work — assets, accounts, code?',
    answer:
      'You do. All assets, ad accounts, code repositories, and data are created in your name and owned by you from day one. If we ever part ways, you walk away with everything — no hostage situations.',
  },
  {
    question: 'How do you handle reporting and communication?',
    answer:
      'A live dashboard (Meta Ads, Google Ads, GA4, ops metrics) you can check anytime, a bi-weekly standup over Zoom, a monthly written report tied to revenue/leads/cost, and a dedicated Slack/WhatsApp channel for day-to-day. No black boxes.',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function HowItWorksPage() {
  const { setCurrentPage } = usePage()
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const pillarsRef = useRef<HTMLDivElement>(null)
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-80px' })

  const processRef = useRef<HTMLDivElement>(null)
  const processInView = useInView(processRef, { once: true, margin: '-80px' })

  const compareRef = useRef<HTMLDivElement>(null)
  const compareInView = useInView(compareRef, { once: true, margin: '-80px' })

  const engagementRef = useRef<HTMLDivElement>(null)
  const engagementInView = useInView(engagementRef, { once: true, margin: '-80px' })

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const faqRef = useRef<HTMLDivElement>(null)
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
    >
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Breadcrumb */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-1.5 text-xs mb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-white/60 hover:text-[#F5A623] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3 h-3" />
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <span className="text-white font-semibold">How It Works</span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Our Model</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5 text-white"
        >
          Strategy, Execution & Expertise.
          <br />
          <span className="text-[#F5A623]">Under One Roof.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Most partners give you strategy or execution — never both. We combine a senior strategy team,
          a full-stack delivery team, and a 30+ specialist network so nothing falls through the cracks.
          One team. One roadmap. Real results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer border-0"
          >
            <Handshake className="w-4 h-4 mr-2" />
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => {
              const el = document.getElementById('process')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            variant="outline"
            className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F5A623]/50 font-semibold px-6 py-3 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer"
          >
            <Compass className="w-4 h-4 mr-2" />
            See How We Work
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. THE MODEL — 3 PILLARS
     ═══════════════════════════════════════════════════════ */

  const renderPillars = () => (
    <section ref={pillarsRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={pillarsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FA] border border-[#0F2557]/10 mb-4">
            <Layers className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">The Model</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Strategy + Execution + <span className="text-[#F5A623]">Expert Network</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Three pillars that transform how businesses grow. No silos between planning and doing —
            and no junior staff learning on your budget.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={pillarsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={scaleIn}
              custom={i}
              className="group relative bg-white rounded-2xl border border-[#E5E9F0] p-6 sm:p-7 hover:border-[#F5A623]/40 hover:shadow-xl hover:shadow-[#0F2557]/5 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F2557] to-[#F5A623] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] flex items-center justify-center group-hover:bg-[#0F2557] transition-colors duration-300 shrink-0">
                  <pillar.icon className="w-6 h-6 text-[#0F2557] group-hover:text-[#F5A623] transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F2557] leading-tight">{pillar.title}</h3>
                  <p className="text-[11px] font-semibold text-[#F5A623]">{pillar.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-[#5A6478] leading-relaxed mb-5">{pillar.description}</p>

              <ul className="space-y-2 pt-4 border-t border-[#E5E9F0]">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#3D4452] font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. OUR PROCESS — 4-STEP TIMELINE WITH DELIVERABLES
     ═══════════════════════════════════════════════════════ */

  const renderProcess = () => (
    <section ref={processRef} id="process" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <Compass className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Our Process</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            From Understanding to <span className="text-[#F5A623]">Compounding Growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            A proven 4-step process with clear deliverables at every stage — so you always know what
            is happening, what is being shipped, and what comes next.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-5 sm:space-y-6"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              custom={i}
              className={`group relative bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden hover:border-[#0F2557]/20 hover:shadow-lg hover:shadow-[#0F2557]/5 transition-all duration-300 ${
                i % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0F2557] to-[#F5A623]" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Left: number + icon + title */}
                <div className="md:col-span-4 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#E5E9F0]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                    >
                      <step.icon className="w-7 h-7 text-[#F5A623]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-[#F5A623] tracking-widest block">STEP {step.number}</span>
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {step.duration}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2557] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5A6478] leading-relaxed">{step.summary}</p>
                </div>

                {/* Right: deliverables + outcome */}
                <div className="md:col-span-8 p-6 sm:p-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-[#5A6478] mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F2557]" />
                    Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {step.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#EEF2FA] border border-[#E5E9F0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-[#0F2557]">{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl border border-[#F5A623]/30" style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(245,166,35,0.02) 100%)' }}>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-[#F5A623] mb-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Outcome
                    </div>
                    <p className="text-xs text-[#1A1A1A] font-bold leading-relaxed">{step.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. COMPARISON TABLE
     ═══════════════════════════════════════════════════════ */

  const renderComparison = () => (
    <section ref={compareRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={compareInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E6] border border-[#F5A623]/25 mb-4">
            <Award className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Comparison</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Traditional Agency vs <span className="text-[#F5A623]">BizMeals</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Eight reasons businesses switch from their old agency to a partner that actually does the work.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={compareInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-12 gap-0 border-b-2 border-[#0F2557]/10 bg-[#F5F7FA]">
            <div className="col-span-4 p-4 sm:p-5">
              <span className="text-[11px] sm:text-xs font-bold text-[#5A6478] uppercase tracking-wider">Feature</span>
            </div>
            <div className="col-span-4 p-4 sm:p-5 border-l border-[#E5E9F0]">
              <span className="text-[11px] sm:text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Typical Agency</span>
            </div>
            <div className="col-span-4 p-4 sm:p-5 border-l border-[#E5E9F0] bg-[#0F2557]">
              <span className="text-[11px] sm:text-xs font-bold text-[#F5A623] uppercase tracking-wider">BizMeals</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonData.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              animate={compareInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className={`grid grid-cols-12 gap-0 ${i < comparisonData.length - 1 ? 'border-b border-[#E5E9F0]' : ''}`}
            >
              <div className="col-span-4 p-4 sm:p-5 bg-[#FAFBFC]">
                <span className="text-[11px] sm:text-xs font-bold text-[#0F2557]">{row.feature}</span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#E5E9F0] flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-[#5A6478] leading-relaxed">{row.agency}</span>
              </div>
              <div className="col-span-4 p-4 sm:p-5 border-l border-[#E5E9F0] flex items-start gap-2 bg-[#FFF7E6]/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-[#0F2557] font-semibold leading-relaxed">{row.bizmeals}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. ENGAGEMENT MODELS
     ═══════════════════════════════════════════════════════ */

  const renderEngagement = () => (
    <section ref={engagementRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={engagementInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <Handshake className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Engagement Models</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Three Ways to <span className="text-[#F5A623]">Work With Us</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Pick the model that fits your stage. Start with one, switch later — you are never locked into
            a structure that no longer serves you.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={engagementInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {engagementModels.map((model, i) => (
            <motion.div
              key={model.title}
              variants={scaleIn}
              custom={i}
              className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 overflow-hidden ${
                model.accent === 'amber'
                  ? 'bg-[#0F2557] border border-[#0F2557]'
                  : 'bg-white border border-[#E5E9F0] hover:border-[#F5A623]/40 hover:shadow-xl hover:shadow-[#0F2557]/5'
              }`}
            >
              {model.accent === 'amber' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F5A623] to-[#E8951A]" />
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    model.accent === 'amber'
                      ? 'bg-[#F5A623]/20'
                      : 'bg-[#EEF2FA] group-hover:bg-[#0F2557]'
                  }`}
                >
                  <model.icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      model.accent === 'amber'
                        ? 'text-[#F5A623]'
                        : 'text-[#0F2557] group-hover:text-[#F5A623]'
                    }`}
                  />
                </div>
                <div>
                  <h3 className={`text-lg font-bold leading-tight ${model.accent === 'amber' ? 'text-white' : 'text-[#0F2557]'}`}>
                    {model.title}
                  </h3>
                  <p className={`text-[11px] font-semibold ${model.accent === 'amber' ? 'text-[#F5A623]' : 'text-[#F5A623]'}`}>
                    {model.bestFor}
                  </p>
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-5 ${model.accent === 'amber' ? 'text-white/70' : 'text-[#5A6478]'}`}>
                {model.description}
              </p>

              <ul className="space-y-2 pt-4 border-t border-dashed border-current/15">
                {model.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        model.accent === 'amber' ? 'text-[#F5A623]' : 'text-[#F5A623]'
                      }`}
                    />
                    <span className={`text-xs font-medium ${model.accent === 'amber' ? 'text-white/85' : 'text-[#3D4452]'}`}>
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. TRUST STATS
     ═══════════════════════════════════════════════════════ */

  const renderStats = () => (
    <section
      ref={statsRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Proven Results</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Numbers That <span className="text-[#F5A623]">Speak</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Over a decade of delivering real, measurable business outcomes — not vanity metrics.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              custom={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5A623] mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[11px] sm:text-xs text-white/60 font-medium leading-tight mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. FAQ
     ═══════════════════════════════════════════════════════ */

  const renderFAQ = () => (
    <section ref={faqRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate={faqInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FA] border border-[#0F2557]/10 mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">FAQ</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            How We Work — <span className="text-[#F5A623]">Quick Answers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-xl mx-auto leading-relaxed">
            The operational questions founders and ops leads ask before signing up.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={faqInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-3"
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden hover:border-[#0F2557]/20 transition-colors"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={openFAQ === i}
              >
                <span className="text-sm sm:text-base font-bold text-[#0F2557] pr-2 group-hover:text-[#1A3A6E] transition-colors">
                  {item.question}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${openFAQ === i ? 'bg-[#F5A623]' : 'bg-[#EEF2FA] group-hover:bg-[#0F2557]/10'}`}>
                  <ChevronDown className={`w-4 h-4 transition-all duration-300 ${openFAQ === i ? 'rotate-180 text-[#1A1A1A]' : 'text-[#0F2557]'}`} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="pl-4 border-l-2 border-[#F5A623]">
                        <p className="text-sm text-[#3D4452] leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     8. FINAL CTA
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section
      ref={ctaRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6">
          <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Start Today</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
          Ready to Work With a Partner
          <br />
          <span className="text-[#F5A623]">That Actually Does the Work?</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          Book a free 30-minute strategy call. We will analyse your business, map the right service mix,
          and tell you honestly if we are not the right fit. No strings, no pressure.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer border-0"
          >
            <Handshake className="w-4 h-4 mr-2" />
            Book a Strategy Call
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F5A623]/50 font-semibold px-6 py-3 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" />
              WhatsApp Now
            </Button>
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
          {['Free 30-min consultation', 'No commitment required', 'Custom roadmap delivered'].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="text-xs text-white/70 font-medium">{t}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-white/50">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <div className="overflow-x-hidden">
      {renderHero()}
      {renderPillars()}
      {renderProcess()}
      {renderComparison()}
      {renderEngagement()}
      {renderStats()}
      {renderFAQ()}
      {renderCTA()}
    </div>
  )
}
