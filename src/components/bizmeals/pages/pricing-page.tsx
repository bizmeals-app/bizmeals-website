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

/* ───────────────────────── data ───────────────────────── */

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
    bestFor: 'Startups and small businesses getting started',
    features: [
      { text: 'Social Media Management (2 platforms)', included: true },
      { text: 'Basic SEO Setup', included: true },
      { text: 'Google Ads Management (up to ₹50K spend)', included: true },
      { text: 'Monthly Performance Report', included: true },
      { text: 'Email Support', included: true },
      { text: 'BPO Services', included: false },
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

interface AddOn {
  icon: React.ElementType
  name: string
  price: string
  description: string
  accent: string
}

const addOns: AddOn[] = [
  {
    icon: Headphones,
    name: 'BPO Support',
    price: 'Starting ₹15,000/mo',
    description: 'Dedicated support team for customer service, data entry & back-office operations.',
    accent: 'biz-teal',
  },
  {
    icon: PartyPopper,
    name: 'Event Management',
    price: 'Starting ₹50,000/event',
    description: 'End-to-end event planning, coordination & execution for corporate & brand events.',
    accent: 'biz-orange',
  },
  {
    icon: Lightbulb,
    name: 'Consultancy Session',
    price: 'Starting ₹5,000/session',
    description: 'Expert one-on-one sessions covering strategy, growth frameworks & process optimization.',
    accent: 'biz-amber',
  },
  {
    icon: Package,
    name: 'Custom Package',
    price: "Let's Talk",
    description: 'Bespoke solutions tailored to your unique business needs and growth objectives.',
    accent: 'biz-violet',
  },
]

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What's included in the free growth plan?",
    answer:
      'A comprehensive analysis of your current marketing, operations, and growth potential with a custom roadmap.',
  },
  {
    question: 'Can I switch plans anytime?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'Monthly plans have no minimum commitment. Quarterly plans are billed upfront with a 3-month commitment.',
  },
  {
    question: 'Do you work with businesses outside India?',
    answer:
      "Yes! While we're based in Bangalore, we serve clients globally through our digital-first approach.",
  },
  {
    question: 'What makes BizMeals different from agencies?',
    answer:
      "We don't just create strategies — we execute them. Our team becomes an extension of yours, delivering measurable results.",
  },
  {
    question: 'How quickly can I expect results?',
    answer:
      'Most clients see initial results within 30 days and significant growth within 90 days of engagement.',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   PRICING PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function PricingPage() {
  const { setCurrentPage } = usePage()
  const [isQuarterly, setIsQuarterly] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  /* ─── Section refs ─── */
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const tiersRef = useRef<HTMLDivElement>(null)
  const tiersInView = useInView(tiersRef, { once: true, margin: '-80px' })

  const addonsRef = useRef<HTMLDivElement>(null)
  const addonsInView = useInView(addonsRef, { once: true, margin: '-80px' })

  const faqRef = useRef<HTMLDivElement>(null)
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' })

  const guaranteeRef = useRef<HTMLDivElement>(null)
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. PAGE HERO
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
          <span className="text-white font-medium">Pricing</span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="float-animation mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 border border-white/20">
            <Zap className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white">
              PRICING
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6"
        >
          <span className="block text-white">Transparent Pricing,</span>
          <span className="block text-[#F5A623] mt-1.5">Real Results</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl"
        >
          No hidden fees. No vanity metrics. Just growth.
        </motion.p>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. PRICING TOGGLE
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

  /* ═══════════════════════════════════════════════════════
     3. PRICING TIERS
     ═══════════════════════════════════════════════════════ */

  const renderPricingTiers = () => (
    <section ref={tiersRef} className="relative py-10 sm:py-16 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
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
      </div>
    </section>
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

  /* ═══════════════════════════════════════════════════════
     4. SERVICE ADD-ONS
     ═══════════════════════════════════════════════════════ */

  const renderAddOns = () => (
    <section ref={addonsRef} className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={addonsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Package className="w-3.5 h-3.5 text-biz-purple" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Add-Ons</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Service <span className="gradient-text">Add-Ons</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Enhance any plan with these optional services. Mix and match to build your perfect growth stack.
          </motion.p>
        </motion.div>

        {/* Add-on cards */}
        <motion.div
          initial="hidden"
          animate={addonsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {addOns.map((addon, i) => (
            <motion.div
              key={addon.name}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-5 sm:p-6 card-hover flex items-start gap-4 sm:gap-5 overflow-hidden relative"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at 50% 50%, ${
                    addon.accent === 'biz-teal' ? 'rgba(20,184,166,0.08)' :
                    addon.accent === 'biz-orange' ? 'rgba(249,115,22,0.08)' :
                    addon.accent === 'biz-amber' ? 'rgba(245,158,11,0.08)' :
                    'rgba(139,92,246,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex items-start gap-4 sm:gap-5 w-full">
                {/* Icon */}
                <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-${addon.accent}/10 flex items-center justify-center`}>
                  <addon.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${addon.accent}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-sm sm:text-base">{addon.name}</h3>
                    <span className={`text-xs sm:text-sm font-semibold text-${addon.accent} whitespace-nowrap`}>
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                    {addon.description}
                  </p>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className={`inline-flex items-center gap-1 text-xs font-semibold text-${addon.accent} hover:opacity-80 transition-opacity duration-200 group/link`}
                  >
                    Add to Plan
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. FAQ SECTION
     ═══════════════════════════════════════════════════════ */

  const renderFAQ = () => (
    <section ref={faqRef} className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden section-glow">
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
            Frequently Asked <span className="gradient-text">Questions</span>
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
     6. MONEY-BACK GUARANTEE
     ═══════════════════════════════════════════════════════ */

  const renderGuarantee = () => (
    <section ref={guaranteeRef} className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
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
              If you don&apos;t see measurable progress in the first 30 days, we&apos;ll work for free until you do.
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
     7. CTA SECTION
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section ref={ctaRef} className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden section-glow">
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
          <Sparkles className="w-3.5 h-3.5 text-biz-purple" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Let&apos;s Talk Growth
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Ready to Invest<br />
          <span className="gradient-text">in Growth?</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
          Get a free, no-obligation growth plan tailored to your business. Our experts will analyze your current position and map a clear path to scale.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button
            onClick={() => setCurrentPage('contact')}
            className="gradient-purple glow-purple text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl h-auto shadow-lg hover:shadow-xl hover:shadow-biz-purple/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Get Your Free Growth Plan
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Trust signal */}
        <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-muted-foreground/50">
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
      {renderPricingTiers()}
      {renderAddOns()}
      {renderFAQ()}
      {renderGuarantee()}
      {renderCTA()}
    </>
  )
}
