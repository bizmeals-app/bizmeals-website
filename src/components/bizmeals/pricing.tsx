'use client'

import { motion } from 'framer-motion'
import {
  Check,
  Star,
  TrendingUp,
  Handshake,
  ArrowRight,
  IndianRupee,
  Sparkles,
  Target,
  Users,
  Shield,
  Zap,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection, {
  AnimatedCard,
  SectionBadge,
  StaggerContainer,
  StaggerItem,
} from '@/components/bizmeals/animated-section'

/* ────────────────────────────── DATA ────────────────────────────── */

const fixedTiers = [
  {
    name: 'Starter',
    price: '₹10,000',
    period: '/mo',
    for: 'Solo entrepreneurs & freelancers',
    features: [
      '1 Service (SEO OR Social Media)',
      'Monthly strategy call',
      'Basic reporting',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹25,000',
    period: '/mo',
    for: 'Growing startups & SMBs',
    features: [
      '2 Services',
      'Weekly strategy calls',
      'Advanced analytics',
      'Dedicated account manager',
    ],
    cta: 'Start Growing',
    popular: true,
  },
  {
    name: 'Scale',
    price: '₹50,000+',
    period: '/mo',
    for: 'Established businesses',
    features: [
      'All Services',
      'Daily standups',
      'Custom dashboards',
      'Priority support',
      'Expert network access',
    ],
    cta: 'Contact Us',
    popular: false,
  },
]

const performancePoints = [
  { icon: IndianRupee, text: 'Minimum ₹5L project value' },
  { icon: BarChart3, text: 'Revenue-share model' },
  { icon: Target, text: 'Skin in the game' },
  { icon: Zap, text: 'Aligned incentives' },
]

const collaborationPoints = [
  { icon: Shield, text: 'Equity-based partnership' },
  { icon: Handshake, text: 'Long-term commitment' },
  { icon: Sparkles, text: 'Full-stack execution' },
  { icon: Users, text: 'Board advisory' },
]

/* ────────────────────────────── COMPONENT ────────────────────────────── */

export default function Pricing() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <AnimatedSection
      id="pricing"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Dot-pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-biz-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-biz-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-20">
          <SectionBadge variant="orange">INVESTMENT</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No hidden fees. Choose the model that works for your business.
          </motion.p>
        </div>

        {/* ══════════ MODEL 1: FIXED PROJECTS ══════════ */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Fixed Projects</h3>
            </div>
            <p className="text-muted-foreground">
              Predictable pricing, predictable results
            </p>
          </div>

          {/* 3 cards side-by-side */}
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
            staggerDelay={0.1}
          >
            {fixedTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <motion.div
                  className={`glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col ${
                    tier.popular ? 'scale-[1.02] md:scale-105 z-10' : ''
                  }`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Gradient top border */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] ${
                      tier.popular ? 'gradient-mixed' : 'gradient-orange'
                    }`}
                  />

                  {/* Animated border for popular */}
                  {tier.popular && (
                    <div className="absolute inset-0 animated-border rounded-2xl pointer-events-none" />
                  )}

                  {/* POPULAR badge */}
                  {tier.popular && (
                    <div className="flex justify-center mb-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full gradient-orange text-white text-xs font-bold shadow-lg shadow-biz-orange/30">
                        <Star className="w-3.5 h-3.5" />
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Tier name */}
                  <h4 className="text-xl font-bold text-foreground mb-1">
                    {tier.name}
                  </h4>

                  {/* Target audience */}
                  <p className="text-sm text-muted-foreground mb-5">
                    {tier.for}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl md:text-5xl font-bold gradient-text">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground text-lg">
                      {tier.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-border/30 mb-6" />

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full gradient-teal flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-foreground/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    size="lg"
                    className={`w-full text-base font-semibold ${
                      tier.popular
                        ? 'gradient-orange text-white border-0 hover:opacity-90 glow-orange shadow-lg shadow-biz-orange/20'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                    onClick={scrollToContact}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ══════════ MODEL 2 & 3: PERFORMANCE + COLLABORATION ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance-Based */}
          <AnimatedCard>
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col border-biz-teal/20">
              {/* Teal accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] gradient-teal" />

              {/* Background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-biz-teal/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center shadow-lg shadow-biz-teal/20">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    Performance-Based
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  We invest alongside you. Pay a base fee + share of results.
                </p>

                {/* Key points */}
                <div className="grid grid-cols-2 gap-3 mb-8 flex-1">
                  {performancePoints.map((point, i) => {
                    const Icon = point.icon
                    return (
                      <motion.div
                        key={point.text}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2.5 bg-biz-teal/5 border border-biz-teal/10 rounded-lg px-3 py-2.5"
                      >
                        <Icon className="w-4 h-4 text-biz-teal shrink-0" />
                        <span className="text-xs md:text-sm text-foreground/90 leading-tight">
                          {point.text}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="gradient-teal text-white border-0 hover:opacity-90 font-semibold"
                  onClick={scrollToContact}
                >
                  Discuss Partnership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </AnimatedCard>

          {/* Collaboration / Equity */}
          <AnimatedCard delay={0.1}>
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col border-biz-emerald/20">
              {/* Emerald accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-biz-emerald to-biz-cyan" />

              {/* Background glow */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-biz-emerald/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-biz-emerald to-biz-cyan flex items-center justify-center shadow-lg shadow-biz-emerald/20">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    Collaboration / Equity
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  For startups with high growth potential
                </p>

                {/* Key points */}
                <div className="grid grid-cols-2 gap-3 mb-8 flex-1">
                  {collaborationPoints.map((point, i) => {
                    const Icon = point.icon
                    return (
                      <motion.div
                        key={point.text}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-2.5 bg-biz-emerald/5 border border-biz-emerald/10 rounded-lg px-3 py-2.5"
                      >
                        <Icon className="w-4 h-4 text-biz-emerald shrink-0" />
                        <span className="text-xs md:text-sm text-foreground/90 leading-tight">
                          {point.text}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-biz-emerald to-biz-cyan text-white border-0 hover:opacity-90 font-semibold"
                  onClick={scrollToContact}
                >
                  Apply for Partnership
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </AnimatedSection>
  )
}
