'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Clock,
  BarChart3,
  Target,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Flame,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import AnimatedSection, { AnimatedNumber, SectionBadge } from './animated-section'

interface KeyMetric {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

interface CaseStudy {
  id: number
  title: string
  industry: string
  problem: string
  strategy: string
  execution: string
  timeline: string
  results: string
  keyMetrics: KeyMetric[]
  accent: 'orange' | 'teal'
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'Manufacturing Digital Transformation',
    industry: 'Manufacturing',
    problem:
      'A 15-year-old manufacturing unit had zero digital presence. Sales depended entirely on trade shows and referrals.',
    strategy:
      'Full digital ecosystem build — website, SEO, LinkedIn authority, and B2B lead generation funnel',
    execution:
      'Website redesign, 50+ SEO articles, LinkedIn content plan, Google Ads for B2B, CRM integration',
    timeline: '6 months',
    results:
      '340% increase in qualified leads, ₹45L revenue from digital channels, Top 3 ranking for 12 industry keywords',
    keyMetrics: [
      { value: 340, prefix: '', suffix: '%', label: 'More Leads' },
      { value: 45, prefix: '₹', suffix: 'L', label: 'Revenue Generated' },
    ],
    accent: 'orange',
  },
  {
    id: 2,
    title: 'HR Consultancy Growth',
    industry: 'HR & Consultancy',
    problem:
      'A growing HR consultancy struggled to scale beyond word-of-mouth. No inbound leads, inconsistent pipeline.',
    strategy:
      'Position as thought leader + build inbound lead engine through content and automation',
    execution:
      'Brand positioning, blog strategy, LinkedIn personal branding for founders, email nurture sequences',
    timeline: '4 months',
    results:
      '120% increase in inbound queries, 15 qualified leads/month, 3 enterprise clients acquired',
    keyMetrics: [
      { value: 120, prefix: '', suffix: '%', label: 'More Queries' },
      { value: 15, prefix: '', suffix: '/mo', label: 'Qualified Leads' },
    ],
    accent: 'teal',
  },
  {
    id: 3,
    title: 'Startup Go-to-Market',
    industry: 'SaaS Startup',
    problem:
      'Early-stage SaaS startup had a product but no market traction. Zero paying customers.',
    strategy: 'Rapid GTM execution with product-led growth + targeted outreach',
    execution:
      'Landing page optimization, product demo funnel, cold outreach campaigns, community building',
    timeline: '3 months',
    results:
      'First 50 paying customers, ₹8L MRR achieved, 200+ demo bookings',
    keyMetrics: [
      { value: 8, prefix: '₹', suffix: 'L', label: 'MRR Achieved' },
      { value: 50, prefix: '', suffix: '', label: 'Paying Customers' },
    ],
    accent: 'orange',
  },
  {
    id: 4,
    title: 'Local Business Digitization',
    industry: 'Retail & Local Business',
    problem:
      'A chain of 5 retail stores had no online presence. Losing customers to competitors with digital ordering.',
    strategy:
      'Hyperlocal digital marketing + online ordering system + Google Business optimization',
    execution:
      'Google My Business setup, local SEO, social media management, WhatsApp ordering integration',
    timeline: '3 months',
    results:
      '200+ monthly online orders, 4.8 Google rating, 35% revenue increase',
    keyMetrics: [
      { value: 200, prefix: '', suffix: '+', label: 'Orders/Month' },
      { value: 48, prefix: '', suffix: '', label: 'Google Rating (4.8)' },
    ],
    accent: 'teal',
  },
  {
    id: 5,
    title: 'D2C Brand Launch',
    industry: 'D2C / E-commerce',
    problem:
      'New D2C brand in a crowded wellness market. Zero brand awareness, high customer acquisition cost.',
    strategy:
      'Influencer-led awareness + performance marketing for conversion + retention loops',
    execution:
      'Influencer partnerships, Instagram Reels strategy, Facebook/Google ads, email + WhatsApp retention',
    timeline: '5 months',
    results:
      '₹12L revenue in first quarter, 2.8x ROAS on ads, 40% repeat purchase rate',
    keyMetrics: [
      { value: 12, prefix: '₹', suffix: 'L', label: 'Revenue' },
      { value: 28, prefix: '', suffix: 'x', label: 'ROAS (2.8x)' },
    ],
    accent: 'orange',
  },
  {
    id: 6,
    title: 'EdTech Student Acquisition',
    industry: 'Education / EdTech',
    problem:
      'EdTech platform struggled to acquire students beyond initial network. High cost per acquisition.',
    strategy:
      'Content-first approach with student success stories + referral program + targeted ads',
    execution:
      'YouTube strategy, student testimonial videos, referral program, Google Ads for course keywords',
    timeline: '4 months',
    results:
      '65% reduction in CPA, 500+ student enrollments, 4.2x return on ad spend',
    keyMetrics: [
      { value: 65, prefix: '', suffix: '%', label: 'Less CPA' },
      { value: 42, prefix: '', suffix: 'x', label: 'ROAS (4.2x)' },
    ],
    accent: 'teal',
  },
]

function FlowColumn({
  icon: Icon,
  label,
  content,
  accent,
  index,
}: {
  icon: typeof Target
  label: string
  content: string
  accent: 'orange' | 'teal'
  index: number
}) {
  const isOrange = accent === 'orange'

  return (
    <motion.div
      className="relative flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      {/* Column header */}
      <div className="flex flex-col items-center text-center mb-4">
        <motion.div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
            isOrange
              ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30'
              : 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <Icon className={`w-5 h-5 ${isOrange ? 'text-biz-orange' : 'text-biz-teal'}`} />
        </motion.div>
        <span className={`text-sm font-bold uppercase tracking-wider ${isOrange ? 'text-biz-orange' : 'text-biz-teal'}`}>
          {label}
        </span>
      </div>

      {/* Content card */}
      <div className="glass-card rounded-xl p-4 h-[calc(100%-80px)]">
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </div>

      {/* Connecting arrow (between columns) */}
      {index < 2 && (
        <div className="absolute top-10 -right-3 md:-right-4 z-10 hidden md:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.15 }}
          >
            <ArrowRight className={`w-6 h-6 ${isOrange ? 'text-biz-orange/60' : 'text-biz-teal/60'}`} />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

function CaseStudyShowcase({ study }: { study: CaseStudy }) {
  const isOrange = study.accent === 'orange'

  return (
    <motion.div
      key={study.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-8"
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Badge
          className={`px-4 py-1.5 text-sm font-semibold ${
            isOrange
              ? 'bg-biz-orange/15 text-biz-orange border-biz-orange/25'
              : 'bg-biz-teal/15 text-biz-teal border-biz-teal/25'
          }`}
        >
          <Briefcase className="w-4 h-4 mr-1.5" />
          {study.industry}
        </Badge>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{study.timeline}</span>
        </div>
      </div>

      {/* Title */}
      <motion.h3
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {study.title}
      </motion.h3>

      {/* Problem → Strategy → Execution flow */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          <FlowColumn
            icon={Target}
            label="Problem"
            content={study.problem}
            accent={study.accent}
            index={0}
          />
          <FlowColumn
            icon={TrendingUp}
            label="Strategy"
            content={study.strategy}
            accent={study.accent}
            index={1}
          />
          <FlowColumn
            icon={BarChart3}
            label="Execution"
            content={study.execution}
            accent={study.accent}
            index={2}
          />
        </div>
      </div>

      {/* Key Metrics — LARGE animated numbers with glow */}
      <div className="grid grid-cols-2 gap-6">
        {study.keyMetrics.map((metric, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl p-6 md:p-8 text-center overflow-hidden ${
              isOrange ? 'glow-orange' : 'glow-teal'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 ${
              isOrange
                ? 'bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent'
                : 'bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent'
            }`} />
            <div className="absolute inset-0 glass-card rounded-2xl" />

            {/* Animated glow ring */}
            <motion.div
              className={`absolute inset-0 rounded-2xl border ${
                isOrange ? 'border-orange-500/20' : 'border-teal-500/20'
              }`}
              animate={{
                borderColor: isOrange
                  ? ['rgba(249,115,22,0.2)', 'rgba(249,115,22,0.5)', 'rgba(249,115,22,0.2)']
                  : ['rgba(20,184,166,0.2)', 'rgba(20,184,166,0.5)', 'rgba(20,184,166,0.2)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              {/* Large animated number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <span className={isOrange ? 'gradient-text' : 'gradient-text-teal'}>
                  <AnimatedNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {metric.label}
              </p>
            </div>

            {/* Corner decoration */}
            <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl ${
              isOrange ? 'bg-biz-orange/10' : 'bg-biz-teal/10'
            }`} />
          </motion.div>
        ))}
      </div>

      {/* Results section */}
      <motion.div
        className={`relative rounded-2xl p-6 overflow-hidden ${
          isOrange ? 'glow-orange' : 'glow-teal'
        }`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={`absolute inset-0 ${
          isOrange
            ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/5'
            : 'bg-gradient-to-r from-teal-500/10 to-cyan-500/5'
        }`} />
        <div className="absolute inset-0 glass-card rounded-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className={`w-5 h-5 ${isOrange ? 'text-biz-orange' : 'text-biz-teal'}`} />
            <span className="text-sm font-bold uppercase tracking-wider text-foreground">Results</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {study.results.split(', ').map((result, i) => (
              <motion.span
                key={i}
                className="text-foreground font-medium flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Flame className={`w-3.5 h-3.5 ${isOrange ? 'text-biz-orange' : 'text-biz-teal'}`} />
                {result}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToSlide = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex])

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % caseStudies.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }, [])

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 8000)
    return () => clearInterval(timer)
  }, [goNext])

  const currentStudy = caseStudies[activeIndex]
  const isOrange = currentStudy.accent === 'orange'

  return (
    <AnimatedSection id="portfolio" className="py-20 md:py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <SectionBadge variant="orange">OUR WORK</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Real Results</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real results from real partnerships. Here&apos;s what execution looks like.
          </motion.p>
        </div>

        {/* Interactive showcase */}
        <div className="relative">
          {/* Main display area */}
          <div className="glass-card rounded-3xl p-6 md:p-10 min-h-[500px] md:min-h-[600px] overflow-hidden relative">
            {/* Ambient glow that changes with active study */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: isOrange
                  ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 60%)'
                  : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 60%)',
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card-strong flex items-center justify-center hover:bg-secondary/50 transition-colors"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass-card-strong flex items-center justify-center hover:bg-secondary/50 transition-colors"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Case study content */}
            <AnimatePresence mode="wait" custom={direction}>
              <CaseStudyShowcase study={currentStudy} />
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {caseStudies.map((study, i) => (
              <button
                key={study.id}
                onClick={() => goToSlide(i)}
                className="relative group"
                aria-label={`Go to case study: ${study.title}`}
              >
                <motion.div
                  className="relative rounded-full overflow-hidden"
                  animate={{
                    width: i === activeIndex ? 48 : 12,
                    height: 12,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Dot background */}
                  <div className={`absolute inset-0 rounded-full ${
                    i === activeIndex
                      ? study.accent === 'orange'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                        : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                      : 'bg-secondary'
                  }`} />

                  {/* Active pulse */}
                  {i === activeIndex && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        study.accent === 'orange' ? 'bg-biz-orange' : 'bg-biz-teal'
                      }`}
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Hover tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-xs text-muted-foreground bg-secondary/80 px-2 py-1 rounded-md">
                    {study.industry}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground font-medium">
              {String(activeIndex + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
            </span>
          </div>

          {/* Quick-jump tabs for desktop */}
          <div className="hidden md:flex items-center justify-center gap-2 mt-6 flex-wrap">
            {caseStudies.map((study, i) => (
              <motion.button
                key={study.id}
                onClick={() => goToSlide(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === activeIndex
                    ? study.accent === 'orange'
                      ? 'bg-biz-orange/15 text-biz-orange border border-biz-orange/30'
                      : 'bg-biz-teal/15 text-biz-teal border border-biz-teal/30'
                    : 'bg-secondary/30 text-muted-foreground border border-transparent hover:bg-secondary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1.5 text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {study.industry}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
