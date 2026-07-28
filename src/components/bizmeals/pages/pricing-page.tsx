'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Shield,
  Sparkles,
  Headphones,
  PartyPopper,
  Lightbulb,
  Package,
  Zap,
  Home,
  ChevronRight,
  Rocket,
  Building2,
  HandshakeIcon,
  TrendingUp,
  Wallet,
  Percent,
  Layers,
  Target,
  Briefcase,
  Users,
  LineChart,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'

/* ───────────────────────── animation variants ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

/* ════════════════════════════════════════════════════════════════════════
   DATA — ENGAGEMENT MODELS (the heart of the page)
   We don't just sell packages. We sell ways of working together.
   ════════════════════════════════════════════════════════════════════════ */

interface EngagementModel {
  icon: React.ElementType
  name: string
  tagline: string
  priceHint: string
  bestFor: string
  howItWorks: string
  features: string[]
  accent: string
  glowColor: string
  isFlagship?: boolean
}

const engagementModels: EngagementModel[] = [
  {
    icon: Briefcase,
    name: 'Project-Based',
    tagline: 'Fixed scope. Fixed price. Clear deliverables.',
    priceHint: 'From ₹25,000 / project',
    bestFor: 'One-off builds — websites, campaigns, audits, launches',
    howItWorks:
      'You define the outcome, we scope it, quote a fixed price, and deliver on a timeline. No surprises, no hourly billing.',
    features: [
      'Clear scope & milestone-based delivery',
      'Fixed price agreed upfront',
      '50% advance, 50% on delivery',
      'Great for websites, launches & campaigns',
      'Optional handover & training',
    ],
    accent: 'biz-teal',
    glowColor: 'rgba(20,184,166,0.12)',
  },
  {
    icon: Layers,
    name: 'Monthly Retainer',
    tagline: 'Ongoing growth engine. Cancel anytime.',
    priceHint: '₹25k – ₹1.2L / month',
    bestFor: 'Businesses that need continuous marketing & execution',
    howItWorks:
      'A dedicated team runs your growth month after month — strategy, execution, reporting, the works. Scale the plan up or down as you grow.',
    features: [
      'Dedicated team & account manager',
      'Strategy + execution under one roof',
      'Monthly reporting & strategy calls',
      'Monthly or quarterly billing (save 20%)',
      'Flexible — upgrade / pause / cancel',
    ],
    accent: 'biz-purple',
    glowColor: 'rgba(139,92,246,0.12)',
    isFlagship: true,
  },
  {
    icon: Percent,
    name: 'Equity & Partnership',
    tagline: 'Skin in the game. We grow when you grow.',
    priceHint: 'Equity / revenue share',
    bestFor: 'Startups & founders with big vision, limited cash',
    howItWorks:
      'For founders we believe in, we trade part of our fee for equity or a revenue share. We become your growth co-pilot — invested in your long-term success, not just a monthly invoice.',
    features: [
      'Reduced or zero monthly fee in exchange for equity',
      'Revenue-share options for funded startups',
      'Long-term strategic partnership',
      'Founder-level commitment from our team',
      'Ideal for pre-Series A & bootstrapped startups',
    ],
    accent: 'biz-amber',
    glowColor: 'rgba(245,158,11,0.12)',
  },
  {
    icon: HandshakeIcon,
    name: 'Hybrid Engagement',
    tagline: 'Fee + equity. Aligned incentives.',
    priceHint: 'Custom — fee + small equity',
    bestFor: 'Startups & SMBs who want commitment + flexibility',
    howItWorks:
      'Pay a reduced monthly fee plus a small equity stake or performance bonus. You keep cash flow healthy, we stay deeply invested in your outcomes.',
    features: [
      'Reduced retainer + small equity / bonus',
      'Performance-linked milestones',
      'Budget-friendly for early-stage teams',
      'Aligned long-term incentives',
      'Tailored to your stage & runway',
    ],
    accent: 'biz-cyan',
    glowColor: 'rgba(30,58,138,0.12)',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   DATA — RETAINER PRICING TIERS (direct pricing, for SMBs & enterprises)
   ════════════════════════════════════════════════════════════════════════ */

interface PricingTier {
  name: string
  tagline: string
  monthlyPrice: string
  quarterlyPrice: string
  bestFor: string
  features: { text: string; included: boolean }[]
  cta: string
  accent: string
  borderClass: string
  glowClass: string
  isPopular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'For Early-Stage Ventures',
    monthlyPrice: '₹25,000',
    quarterlyPrice: '₹20,000',
    bestFor: 'Small businesses & solo founders finding their feet',
    features: [
      { text: 'Social Media Management (2 platforms)', included: true },
      { text: 'Basic SEO & Content Marketing', included: true },
      { text: 'Google & Meta Ads Management (up to ₹50K spend)', included: true },
      { text: 'Monthly Performance Report', included: true },
      { text: 'Website Development (1-page)', included: true },
      { text: 'Email & WhatsApp Support', included: true },
      { text: 'BPO Support', included: false },
      { text: 'Event Management', included: false },
      { text: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Get Started',
    accent: 'teal',
    borderClass: 'border-biz-teal/20 hover:border-biz-teal/40',
    glowClass: 'hover:shadow-[0_0_60px_-15px_rgba(20,184,166,0.25)]',
  },
  {
    name: 'Growth',
    tagline: 'For Scaling Businesses',
    monthlyPrice: '₹55,000',
    quarterlyPrice: '₹44,000',
    bestFor: 'Growing businesses ready to accelerate',
    features: [
      { text: 'Social Media Management (4 platforms)', included: true },
      { text: 'Advanced SEO & Content Marketing', included: true },
      { text: 'Google & Meta Ads Management (up to ₹2L spend)', included: true },
      { text: 'Weekly Performance Reports', included: true },
      { text: 'BPO Support (Part-time)', included: true },
      { text: 'Event Planning & Execution', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Strategy Call (Bi-weekly)', included: true },
    ],
    cta: 'Start Growing',
    accent: 'orange',
    borderClass: '',
    glowClass: 'hover:shadow-[0_0_80px_-15px_rgba(249,115,22,0.35)]',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For Market Leaders',
    monthlyPrice: '₹1,20,000',
    quarterlyPrice: '₹96,000',
    bestFor: 'Established companies seeking dominance',
    features: [
      { text: 'Full-Stack Digital Marketing', included: true },
      { text: 'Advanced SEO & Content Engine', included: true },
      { text: 'Unlimited Ad Spend Management', included: true },
      { text: 'Real-Time Dashboard & Reports', included: true },
      { text: 'Dedicated BPO Team', included: true },
      { text: 'Full Event Management', included: true },
      { text: 'Senior Account Manager', included: true },
      { text: 'Weekly Strategy Sessions', included: true },
      { text: 'Priority Support (24/7)', included: true },
      { text: 'Custom Integrations', included: true },
    ],
    cta: 'Contact Sales',
    accent: 'violet',
    borderClass: 'border-biz-violet/20 hover:border-biz-violet/40',
    glowClass: 'hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.25)]',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   DATA — WHO WE WORK WITH (audience matcher: pricing differs by client)
   ════════════════════════════════════════════════════════════════════════ */

interface AudienceCard {
  icon: React.ElementType
  audience: string
  who: string
  recommendedModel: string
  priceRange: string
  whatYouGet: string
  accent: string
  glowColor: string
}

const audiences: AudienceCard[] = [
  {
    icon: Rocket,
    audience: 'Startups & Founders',
    who: 'Pre-Series A, bootstrapped, or early-stage teams building something new.',
    recommendedModel: 'Equity / Partnership or Hybrid',
    priceRange: 'Reduced fee + equity, or revenue share',
    whatYouGet:
      'Founder-level commitment, product-market-fit sprints, growth builds, investor-ready metrics, and a partner who wins only when you do.',
    accent: 'biz-amber',
    glowColor: 'rgba(245,158,11,0.10)',
  },
  {
    icon: Building2,
    audience: 'Small & Medium Businesses',
    who: 'Local businesses, D2C brands, service companies, and family-run enterprises.',
    recommendedModel: 'Monthly Retainer or Project-Based',
    priceRange: '₹25,000 – ₹1,20,000 / month',
    whatYouGet:
      'A full growth team at a fraction of an agency hire — marketing, ads, content, websites, and BPO, all under one roof and one predictable invoice.',
    accent: 'biz-teal',
    glowColor: 'rgba(20,184,166,0.10)',
  },
  {
    icon: Briefcase,
    audience: 'Enterprises & Big Companies',
    who: 'Established brands, mid-to-large companies, and funded scale-ups.',
    recommendedModel: 'Enterprise Retainer or Strategic Partnership',
    priceRange: '₹1,20,000+ / month or custom',
    whatYouGet:
      'Dedicated pods, senior strategists, unlimited ad-spend management, real-time dashboards, BPO teams, and weekly executive-level strategy sessions.',
    accent: 'biz-violet',
    glowColor: 'rgba(139,92,246,0.10)',
  },
  {
    icon: Target,
    audience: 'Project Clients',
    who: 'Anyone with a specific build in mind — a website, a launch, an audit, a campaign.',
    recommendedModel: 'Project-Based (fixed scope)',
    priceRange: 'From ₹25,000 / project',
    whatYouGet:
      'A clear scope, a fixed price, and on-time delivery. Perfect when you need one thing done right without committing to a monthly plan.',
    accent: 'biz-cyan',
    glowColor: 'rgba(30,58,138,0.10)',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   DATA — STRATEGIC ADD-ONS (indirect services & consultancy)
   ════════════════════════════════════════════════════════════════════════ */

interface AddOn {
  icon: React.ElementType
  name: string
  price: string
  description: string
  accent: string
}

const addOns: AddOn[] = [
  {
    icon: Lightbulb,
    name: 'Strategy & Consultancy',
    price: 'From ₹5,000 / session',
    description:
      '1-on-1 sessions with senior strategists — growth frameworks, go-to-market, positioning, and process optimisation.',
    accent: 'biz-amber',
  },
  {
    icon: Rocket,
    name: 'Startup Building',
    price: 'Custom (fee + equity)',
    description:
      'End-to-end startup support — from idea validation and MVP to first 10 paying customers and investor pitch prep.',
    accent: 'biz-purple',
  },
  {
    icon: LineChart,
    name: 'Investment Strategy Advisory',
    price: 'From ₹15,000 / month',
    description:
      'Fundraising readiness, pitch deck reviews, investor connects, financial modelling, and valuation guidance.',
    accent: 'biz-teal',
  },
  {
    icon: Headphones,
    name: 'BPO & Back-Office',
    price: 'From ₹15,000 / month',
    description:
      'Dedicated support team for customer service, data entry, lead qualification, and back-office operations.',
    accent: 'biz-cyan',
  },
  {
    icon: PartyPopper,
    name: 'Event Management',
    price: 'From ₹50,000 / event',
    description:
      'End-to-end event planning, coordination & execution for corporate, brand, and product-launch events.',
    accent: 'biz-orange',
  },
  {
    icon: Package,
    name: 'Custom Build / Scope',
    price: "Let's talk",
    description:
      'Bespoke solutions tailored to your unique business — end-to-end business builds, integrations, and special projects.',
    accent: 'biz-violet',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   DATA — FAQ (rewritten around collaboration, equity, budgets)
   ════════════════════════════════════════════════════════════════════════ */

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Do you really work on equity or partnership instead of cash?',
    answer:
      'Yes — for startups and founders we genuinely believe in, we trade part (or all) of our fee for equity or a revenue share. We become a long-term growth partner, not just a vendor. This is decided case-by-case after an initial conversation about your stage, vision, and runway.',
  },
  {
    question: 'What if I have a limited budget — can we still work together?',
    answer:
      'Absolutely. We work with your budget. The Hybrid model lets you combine a reduced monthly fee with a small equity stake or performance bonus, keeping your cash flow healthy while keeping us deeply invested in your outcomes. Tell us your budget and we will design a plan around it.',
  },
  {
    question: 'What is the difference between Project-Based and Retainer?',
    answer:
      'Project-Based is a one-off engagement with a fixed scope and fixed price (a website, a launch, an audit). A Retainer is an ongoing monthly partnership where we run your growth continuously — strategy, execution, and reporting — and you can pause, upgrade, or cancel anytime.',
  },
  {
    question: 'Can you build my startup end-to-end?',
    answer:
      'Yes. Our Startup Building add-on covers everything from idea validation and MVP to acquiring your first 10 paying customers and preparing for investors. For early-stage founders, this is often structured as fee + equity so incentives stay aligned.',
  },
  {
    question: 'Do you help with fundraising and investment strategy?',
    answer:
      'Yes. Our Investment Strategy Advisory covers fundraising readiness, pitch-deck reviews, investor connects, financial modelling, and valuation guidance. We have a network of 500+ founders and business owners across industries.',
  },
  {
    question: 'Is there a minimum commitment or contract lock-in?',
    answer:
      'Monthly retainers have no lock-in — cancel anytime. Quarterly plans are billed upfront with a 3-month commitment (and save you 20%). Project-Based engagements are scoped per project. Equity / Partnership engagements are longer-term by nature and structured around milestones.',
  },
  {
    question: 'How do you price differently for startups vs enterprises?',
    answer:
      'Startups often work with us on equity, revenue share, or a reduced hybrid fee. SMBs typically choose a Starter or Growth retainer (₹25k–₹55k/month). Enterprises choose the Enterprise retainer (₹1.2L+/month) or a custom strategic partnership. The model flexes to your stage, size, and ambition.',
  },
  {
    question: 'What is included in the free growth plan?',
    answer:
      'A comprehensive analysis of your current marketing, operations, and growth potential, plus a custom roadmap. It is free, no-obligation, and the fastest way to figure out which engagement model fits you best.',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   PRICING PAGE COMPONENT
   ════════════════════════════════════════════════════════════════════════ */

export default function PricingPage() {
  const { setCurrentPage } = usePage()
  const [isQuarterly, setIsQuarterly] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  /* ─── Section refs ─── */
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const modelsRef = useRef<HTMLDivElement>(null)
  const modelsInView = useInView(modelsRef, { once: true, margin: '-80px' })

  const tiersRef = useRef<HTMLDivElement>(null)
  const tiersInView = useInView(tiersRef, { once: true, margin: '-80px' })

  const audienceRef = useRef<HTMLDivElement>(null)
  const audienceInView = useInView(audienceRef, { once: true, margin: '-80px' })

  const addonsRef = useRef<HTMLDivElement>(null)
  const addonsInView = useInView(addonsRef, { once: true, margin: '-80px' })

  const budgetRef = useRef<HTMLDivElement>(null)
  const budgetInView = useInView(budgetRef, { once: true, margin: '-80px' })

  const faqRef = useRef<HTMLDivElement>(null)
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' })

  const guaranteeRef = useRef<HTMLDivElement>(null)
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. PAGE HERO — reframed around "ways to work with us"
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-navy-section"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#F5A623]/8 morph-blob blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#1E3A8A]/20 morph-blob blur-3xl" style={{ animationDelay: '-3s' }} />
        <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#F5A623]/6 morph-blob blur-3xl" style={{ animationDelay: '-5s' }} />
      </div>
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20" />

      <motion.div
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        {/* Breadcrumb */}
        <motion.div variants={fadeUp} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="hover:text-[#F5A623] transition-colors duration-200 flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-white/40" />
          <span className="text-white font-medium">Pricing & Partnerships</span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="float-animation mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 border border-white/20">
            <HandshakeIcon className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white">
              Ways to Work With Us
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6"
        >
          <span className="block text-white">Not Just Pricing.</span>
          <span className="block text-[#F5A623] mt-1.5">Partnerships That Fit.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl"
        >
          Fixed projects, monthly retainers, equity-based partnerships, or hybrid deals — we work the way your business needs. We build end-to-end, we invest in founders, and we flex to your budget.
        </motion.p>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. ENGAGEMENT MODELS — the core collaboration section
     ═══════════════════════════════════════════════════════ */

  const renderEngagementModels = () => (
    <section ref={modelsRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={modelsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Layers className="w-3.5 h-3.5 text-biz-purple" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Collaboration Models</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Four Ways to <span className="gradient-text">Work With Us</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Some clients pay cash. Some give equity. Some do both. Pick the model that matches your stage — or talk to us and we will design a custom one.
          </motion.p>
        </motion.div>

        {/* Model cards */}
        <motion.div
          initial="hidden"
          animate={modelsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch"
        >
          {engagementModels.map((model, i) => (
            <motion.div
              key={model.name}
              variants={scaleIn}
              custom={i}
              className={`relative group glass-card rounded-2xl p-6 sm:p-8 card-hover overflow-hidden ${
                model.isFlagship ? 'border border-[#F5A623]/30' : 'border border-border/50'
              }`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(320px circle at 50% 0%, ${model.glowColor}, transparent 60%)` }}
              />

              {/* Flagship badge */}
              {model.isFlagship && (
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <div className="gradient-purple text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-lg">
                    MOST CHOSEN
                  </div>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-${model.accent}/10 flex items-center justify-center`}>
                    <model.icon className={`w-6 h-6 text-${model.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{model.name}</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">{model.priceHint}</p>
                  </div>
                </div>

                {/* Tagline */}
                <p className={`text-xs sm:text-sm font-semibold mb-3 text-${model.accent}`}>{model.tagline}</p>

                {/* How it works */}
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-4">
                  {model.howItWorks}
                </p>

                {/* Best for */}
                <div className="glass-card rounded-lg px-3 py-2 mb-4 inline-flex items-center gap-2">
                  <Sparkles className={`w-3.5 h-3.5 text-${model.accent}`} />
                  <span className="text-[11px] sm:text-xs font-medium text-muted-foreground">{model.bestFor}</span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <div className={`shrink-0 w-4 h-4 rounded-full bg-${model.accent}/15 flex items-center justify-center mt-0.5`}>
                        <Check className={`w-2.5 h-2.5 text-${model.accent}`} />
                      </div>
                      <span className="text-[11px] sm:text-xs text-foreground/85 leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-${model.accent} hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/cta w-full justify-center`}
                  style={{
                    background: model.accent === 'biz-teal' ? 'linear-gradient(135deg,#1E3A8A,#0F2557)'
                      : model.accent === 'biz-purple' ? 'linear-gradient(135deg,#0F2557,#1E3A8A)'
                      : model.accent === 'biz-amber' ? 'linear-gradient(135deg,#F5A623,#f97316)'
                      : 'linear-gradient(135deg,#1E3A8A,#0F2557)',
                  }}
                >
                  Explore {model.name}
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. PRICING TOGGLE + RETAINER TIERS (direct pricing)
     ═══════════════════════════════════════════════════════ */

  const renderToggle = () => (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
      <span
        className={`text-sm font-semibold transition-colors duration-300 ${
          !isQuarterly ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Monthly
      </span>

      {/* Pill toggle */}
      <button
        onClick={() => setIsQuarterly(!isQuarterly)}
        className="relative w-14 h-7 sm:w-16 sm:h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-biz-orange/40 focus:ring-offset-2 focus:ring-offset-background"
        style={{
          background: isQuarterly
            ? 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)'
            : 'oklch(0.16 0.01 270)',
        }}
        aria-label={`Switch to ${isQuarterly ? 'monthly' : 'quarterly'} billing`}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-md"
          animate={{ x: isQuarterly ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>

      <span
        className={`text-sm font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
          isQuarterly ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        Quarterly
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-biz-purple/15 text-biz-purple border border-biz-orange/20">
          Save 20%
        </span>
      </span>
    </div>
  )

  const renderTierCard = (tier: PricingTier, isGrowth: boolean) => {
    const price = isQuarterly ? tier.quarterlyPrice : tier.monthlyPrice
    const period = isQuarterly ? '/mo (billed quarterly)' : '/mo'

    const accentColorMap: Record<string, string> = {
      teal: 'text-biz-teal',
      orange: 'text-biz-purple',
      violet: 'text-biz-violet',
    }
    const accentBgMap: Record<string, string> = {
      teal: 'bg-biz-teal/10',
      orange: 'bg-biz-purple/10',
      violet: 'bg-biz-violet/10',
    }
    const ctaGradientMap: Record<string, string> = {
      teal: 'gradient-teal',
      orange: 'gradient-purple',
      violet: 'gradient-violet',
    }
    const ctaGlowMap: Record<string, string> = {
      teal: 'glow-teal',
      orange: 'glow-purple',
      violet: 'glow-violet',
    }

    return (
      <>
        {/* Popular badge */}
        {isGrowth && (
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
            <div className="gradient-purple text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-lg">
              MOST POPULAR
            </div>
          </div>
        )}

        {/* Tier accent dot */}
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className={`w-2.5 h-2.5 rounded-full ${accentBgMap[tier.accent]}`} style={{
            boxShadow: `0 0 8px ${tier.accent === 'teal' ? 'rgba(20,184,166,0.4)' : tier.accent === 'orange' ? 'rgba(249,115,22,0.4)' : 'rgba(139,92,246,0.4)'}`
          }} />
          <span className={`text-xs font-bold tracking-widest uppercase ${accentColorMap[tier.accent]}`}>
            {tier.name}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground mb-5 sm:mb-6">{tier.tagline}</p>

        {/* Price */}
        <div className="mb-5 sm:mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isQuarterly ? 'quarterly' : 'monthly'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{price}</span>
            </motion.div>
          </AnimatePresence>
          <span className="text-sm text-muted-foreground">{period}</span>
          {isQuarterly && (
            <div className="mt-1.5">
              <span className="text-xs font-medium text-biz-emerald bg-biz-emerald/10 border border-biz-emerald/20 px-2 py-0.5 rounded-full">
                Save 20% with quarterly billing
              </span>
            </div>
          )}
        </div>

        {/* Best for */}
        <div className={`glass-card rounded-lg px-3 py-2 mb-5 sm:mb-6 inline-flex items-center gap-2`}>
          <Sparkles className={`w-3.5 h-3.5 ${accentColorMap[tier.accent]}`} />
          <span className="text-xs font-medium text-muted-foreground">Best for: {tier.bestFor}</span>
        </div>

        {/* Features */}
        <div className="flex-1 mb-6 sm:mb-8">
          <ul className="space-y-3">
            {tier.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-3">
                {feature.included ? (
                  <div className="shrink-0 w-5 h-5 rounded-full bg-biz-emerald/15 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-biz-emerald" />
                  </div>
                ) : (
                  <div className="shrink-0 w-5 h-5 rounded-full bg-muted/30 flex items-center justify-center mt-0.5">
                    <X className="w-3 h-3 text-muted-foreground/40" />
                  </div>
                )}
                <span
                  className={`text-xs leading-snug ${
                    feature.included ? 'text-foreground/85' : 'text-muted-foreground/40 line-through'
                  }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Button
          onClick={() => setCurrentPage('contact')}
          className={`w-full ${ctaGradientMap[tier.accent]} ${ctaGlowMap[tier.accent]} text-white font-semibold py-5 sm:py-6 text-sm sm:text-base rounded-xl h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group`}
        >
          {tier.cta}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </>
    )
  }

  const renderPricingTiers = () => (
    <section ref={tiersRef} className="relative py-10 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={tiersInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Wallet className="w-3.5 h-3.5 text-biz-amber" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Retainer Pricing</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Monthly <span className="gradient-text">Retainer Plans</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            For businesses that want continuous growth. Pick a tier, scale up or down anytime — or ask us to build a custom plan around your budget.
          </motion.p>
        </motion.div>

        {/* Toggle */}
        {renderToggle()}

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={tiersInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {pricingTiers.map((tier, i) => {
            const isGrowth = tier.isPopular

            return (
              <motion.div
                key={tier.name}
                variants={scaleIn}
                custom={i}
                className={`relative group ${isGrowth ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Animated border wrapper for Growth tier */}
                {isGrowth ? (
                  <div className="animated-border h-full">
                    <div className="relative glass-card-strong rounded-2xl p-6 sm:p-8 h-full flex flex-col card-hover overflow-hidden transition-shadow duration-500">
                      {renderTierCard(tier, isGrowth)}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col card-hover overflow-hidden border ${tier.borderClass} transition-all duration-500 ${tier.glowClass}`}
                  >
                    {renderTierCard(tier, false)}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Equity note under tiers */}
        <motion.p
          initial="hidden"
          animate={tiersInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-8 sm:mt-10 max-w-2xl mx-auto"
        >
          <span className="text-foreground font-semibold">Cash-tight startup?</span>{' '}
          These prices are for the retainer model. Startups & founders can also work with us on{' '}
          <span className="text-biz-amber font-semibold">equity, revenue share, or a hybrid deal</span> — scroll up to the collaboration models above.
        </motion.p>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. WHO WE WORK WITH — audience matcher
     ═══════════════════════════════════════════════════════ */

  const renderAudience = () => (
    <section ref={audienceRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={audienceInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Users className="w-3.5 h-3.5 text-biz-teal" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Who We Work With</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Built for Every <span className="gradient-text-teal">Stage & Size</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From bootstrapped founders to funded startups to established enterprises — the model and price flex to where you are.
          </motion.p>
        </motion.div>

        {/* Audience cards */}
        <motion.div
          initial="hidden"
          animate={audienceInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {audiences.map((a, i) => (
            <motion.div
              key={a.audience}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-6 sm:p-7 card-hover relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(300px circle at 50% 50%, ${a.glowColor}, transparent 60%)` }}
              />

              <div className="relative z-10">
                {/* Icon + audience */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`shrink-0 w-11 h-11 rounded-xl bg-${a.accent}/10 flex items-center justify-center`}>
                    <a.icon className={`w-5 h-5 text-${a.accent}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{a.audience}</h3>
                </div>

                {/* Who */}
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-4">{a.who}</p>

                {/* Recommended model + price */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mt-0.5 w-16 shrink-0">Model</span>
                    <span className={`text-xs font-semibold text-${a.accent}`}>{a.recommendedModel}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mt-0.5 w-16 shrink-0">Price</span>
                    <span className="text-xs font-medium text-foreground/85">{a.priceRange}</span>
                  </div>
                </div>

                {/* What you get */}
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-4">{a.whatYouGet}</p>

                {/* CTA */}
                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold text-${a.accent} hover:opacity-80 transition-opacity duration-200 group/link`}
                >
                  Talk to us about your stage
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. STRATEGIC ADD-ONS (indirect services & consultancy)
     ═══════════════════════════════════════════════════════ */

  const renderAddOns = () => (
    <section ref={addonsRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={addonsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-biz-purple" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Indirect Services</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Strategic <span className="gradient-text">Add-Ons & Consultancy</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Beyond direct marketing retainers — advisory, startup building, investment strategy, and back-office support. Add these to any plan or engage standalone.
          </motion.p>
        </motion.div>

        {/* Add-on cards */}
        <motion.div
          initial="hidden"
          animate={addonsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {addOns.map((addon, i) => (
            <motion.div
              key={addon.name}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-5 sm:p-6 card-hover overflow-hidden relative"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at 50% 50%, ${
                    addon.accent === 'biz-teal' ? 'rgba(20,184,166,0.08)' :
                    addon.accent === 'biz-orange' ? 'rgba(249,115,22,0.08)' :
                    addon.accent === 'biz-amber' ? 'rgba(245,158,11,0.08)' :
                    addon.accent === 'biz-purple' ? 'rgba(139,92,246,0.08)' :
                    addon.accent === 'biz-cyan' ? 'rgba(30,58,138,0.08)' :
                    'rgba(139,92,246,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-${addon.accent}/10 flex items-center justify-center mb-4`}>
                  <addon.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${addon.accent}`} />
                </div>

                {/* Name + price */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-foreground text-sm sm:text-base">{addon.name}</h3>
                </div>
                <span className={`inline-block text-xs sm:text-sm font-semibold text-${addon.accent} mb-3`}>
                  {addon.price}
                </span>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  {addon.description}
                </p>

                {/* CTA */}
                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`inline-flex items-center gap-1 text-xs font-semibold text-${addon.accent} hover:opacity-80 transition-opacity duration-200 group/link`}
                >
                  Add to Plan
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. BUDGET & ENGAGEMENT FLEXIBILITY
     ═══════════════════════════════════════════════════════ */

  const renderBudgetFlex = () => (
    <section ref={budgetRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={budgetInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="glass-card-strong rounded-2xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-biz-purple/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-biz-teal/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
              <motion.div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
                <Wallet className="w-3.5 h-3.5 text-biz-amber" />
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Budget Flexibility</span>
              </motion.div>
              <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                We Work With <span className="gradient-text">Your Budget</span>
              </motion.h2>
              <motion.p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                No two businesses are the same — and neither are our engagements. Here is how we keep working together flexible, fair, and outcome-aligned.
              </motion.p>
            </motion.div>

            {/* Flex points */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {[
                { icon: HandshakeIcon, title: 'We work together', text: 'You are not buying a package — you are partnering with a team. We co-design scope, milestones, and pricing around what actually moves your business.', accent: 'biz-purple' },
                { icon: Wallet, title: 'Budget-aligned', text: 'Tell us your budget. We will design the most impactful engagement within it — and tell you honestly what is and is not possible for that number.', accent: 'biz-amber' },
                { icon: Layers, title: 'End-to-end builds', text: 'From idea to launch to scale — strategy, product, marketing, ops, and fundraising under one roof. One partner, every lever, full accountability.', accent: 'biz-teal' },
                { icon: Percent, title: 'Equity & partnership', text: 'For founders we believe in, we trade fee for equity or revenue share. Aligned incentives mean we only win when you do.', accent: 'biz-cyan' },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} custom={i} className="flex items-start gap-4">
                  <div className={`shrink-0 w-11 h-11 rounded-xl bg-${item.accent}/10 flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 text-${item.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-purple glow-purple hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Get a Custom Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. FAQ SECTION (rewritten)
     ═══════════════════════════════════════════════════════ */

  const renderFAQ = () => (
    <section ref={faqRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={faqInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Lightbulb className="w-3.5 h-3.5 text-biz-amber" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">FAQ</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Pricing & Partnership <span className="gradient-text">Questions</span>
          </motion.h2>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          initial="hidden"
          animate={faqInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-3 sm:space-y-4"
        >
          {faqItems.map((faq, i) => {
            const isOpen = activeFaq === i

            return (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-xl overflow-hidden card-hover"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-biz-orange/30 focus:ring-inset rounded-xl transition-colors duration-200 hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-foreground pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-3 sm:mb-4" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     8. MONEY-BACK GUARANTEE
     ═══════════════════════════════════════════════════════ */

  const renderGuarantee = () => (
    <section ref={guaranteeRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />

      <motion.div
        initial="hidden"
        animate={guaranteeInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.div
          variants={scaleIn}
          className="glass-card-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden card-hover"
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-biz-purple/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-biz-teal/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 shimmer pointer-events-none opacity-30" />

          <div className="relative z-10">
            {/* Shield icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-purple mb-6 sm:mb-8 shadow-lg" style={{
              boxShadow: '0 0 60px -10px rgba(249,115,22,0.3), 0 0 30px -5px rgba(245,158,11,0.2)',
            }}>
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              30-Day Satisfaction <span className="gradient-text">Guarantee</span>
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8">
              If you don&apos;t see measurable progress in the first 30 days, we&apos;ll work for free until you do. Equity & partnership engagements carry the same commitment — we only win when you do.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-muted-foreground/60">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-biz-emerald" />
                <span className="text-xs font-medium">No Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-biz-emerald" />
                <span className="text-xs font-medium">Full Transparency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-biz-emerald" />
                <span className="text-xs font-medium">Results-Driven</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     9. CTA SECTION (with contact buttons)
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section ref={ctaRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      {/* Floating blobs */}
      <div className="absolute top-10 -left-20 w-[300px] h-[300px] rounded-full bg-biz-purple/8 morph-blob blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-20 w-[400px] h-[400px] rounded-full bg-biz-teal/6 morph-blob blur-3xl pointer-events-none" style={{ animationDelay: '-4s' }} />

      <motion.div
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6 sm:mb-8">
          <HandshakeIcon className="w-3.5 h-3.5 text-biz-purple" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Let&apos;s Build Together
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Not Sure Which Model<br />
          <span className="gradient-text">Fits You?</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
          Tell us your stage, your budget, and your goal. We will recommend the right engagement — retainer, project, equity, or hybrid — in a free, no-obligation call.
        </motion.p>

        {/* Contact buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="gradient-purple glow-purple text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl h-auto shadow-lg hover:shadow-xl hover:shadow-biz-purple/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Get Your Free Growth Plan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <a
            href="https://wa.me/918217330484"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl font-semibold border border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Quick call links */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <a
            href="tel:+918217330484"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-biz-teal transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 8217330484
          </a>
          <span className="text-muted-foreground/20">•</span>
          <a
            href="tel:+918073568735"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-biz-amber transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 8073568735
          </a>
        </motion.div>

        {/* Trust signal */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-muted-foreground/50">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-biz-emerald" />
            <span className="text-xs font-medium">No setup fees</span>
          </div>
          <span className="text-muted-foreground/20">•</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-biz-emerald" />
            <span className="text-xs font-medium">Cancel anytime</span>
          </div>
          <span className="text-muted-foreground/20">•</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-biz-emerald" />
            <span className="text-xs font-medium">30-day guarantee</span>
          </div>
          <span className="text-muted-foreground/20">•</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-biz-emerald" />
            <span className="text-xs font-medium">Equity-friendly</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <>
      {renderHero()}
      {renderEngagementModels()}
      {renderPricingTiers()}
      {renderAudience()}
      {renderAddOns()}
      {renderBudgetFlex()}
      {renderFAQ()}
      {renderGuarantee()}
      {renderCTA()}
    </>
  )
}
