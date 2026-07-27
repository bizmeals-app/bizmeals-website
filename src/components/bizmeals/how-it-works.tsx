'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  MessageCircle,
  Target,
  Zap,
  TrendingUp,
  Check,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection, { SectionBadge } from './animated-section'

/* ─── Step Data ─── */

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'Free 30-minute call to understand your business, goals, and challenges.',
    icon: MessageCircle,
    gradientClass: 'gradient-orange',
    gradientFromTo: 'from-biz-orange to-biz-amber',
    textColor: 'text-biz-orange',
    bgColor: 'bg-biz-orange/10',
    borderColor: 'border-biz-orange/30',
  },
  {
    number: '02',
    title: 'Growth Strategy',
    description: 'Custom roadmap with clear milestones, KPIs, and execution timeline.',
    icon: Target,
    gradientClass: 'from-biz-amber to-biz-orange',
    gradientFromTo: 'from-biz-amber to-biz-orange',
    textColor: 'text-biz-amber',
    bgColor: 'bg-biz-amber/10',
    borderColor: 'border-biz-amber/30',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Our expert team implements the strategy with weekly progress reports.',
    icon: Zap,
    gradientClass: 'gradient-teal',
    gradientFromTo: 'from-biz-teal to-biz-cyan',
    textColor: 'text-biz-teal',
    bgColor: 'bg-biz-teal/10',
    borderColor: 'border-biz-teal/30',
  },
  {
    number: '04',
    title: 'Scale & Optimize',
    description: 'Continuous optimization based on data to maximize your growth trajectory.',
    icon: TrendingUp,
    gradientClass: 'from-biz-emerald to-biz-teal',
    gradientFromTo: 'from-biz-emerald to-biz-teal',
    textColor: 'text-biz-emerald',
    bgColor: 'bg-biz-emerald/10',
    borderColor: 'border-biz-emerald/30',
  },
]

/* ─── Comparison Data ─── */

const comparisonData = [
  { aspect: 'Approach', traditional: 'One-size-fits-all', bizmeals: 'Custom Growth Plan' },
  { aspect: 'Execution', traditional: 'You do it', bizmeals: 'We execute with you' },
  { aspect: 'Pricing', traditional: 'Fixed retainers', bizmeals: 'Flexible models' },
  { aspect: 'Results', traditional: 'Vague reports', bizmeals: 'Data-driven KPIs' },
  { aspect: 'Team', traditional: 'Junior staff', bizmeals: 'Expert network' },
]

/* ─── Beam Connector (Desktop) ─── */
function BeamConnector() {
  return (
    <div className="hidden lg:flex items-center flex-1 px-2 relative h-[2px]">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-biz-orange/30 via-biz-amber/20 to-biz-teal/30 rounded-full" />
      {/* Beam animation */}
      <motion.div
        className="absolute top-0 left-0 h-full w-8 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: ['-100%', '400%'] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1,
        }}
      />
    </div>
  )
}

/* ─── Step Card ─── */
function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = step.icon

  return (
    <>
      {/* Desktop Step */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex flex-col items-center flex-1 relative group"
      >
        <div className="relative glass-card rounded-2xl p-6 w-full overflow-hidden group-hover:border-white/15 transition-all duration-500">
          {/* Gradient top border */}
          <div
            className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${step.gradientFromTo} opacity-60 group-hover:opacity-100 transition-opacity z-20`}
          />

          {/* Background glow on hover */}
          <div
            className={`absolute -top-16 -right-16 w-32 h-32 rounded-full ${step.bgColor} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`}
          />

          {/* Step number - large outlined */}
          <span className="absolute -top-4 -right-2 text-7xl font-black text-outline leading-none pointer-events-none select-none">
            {step.number}
          </span>

          <div className="relative z-10">
            {/* Icon in gradient circle */}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradientFromTo} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold ${step.textColor} mb-2`}>
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mobile Step */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="lg:hidden flex gap-4"
      >
        {/* Timeline node + connector */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradientFromTo} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {index < steps.length - 1 && (
            <div className="relative w-[2px] flex-1 min-h-[40px]">
              {/* Base line */}
              <div className="absolute inset-0 bg-gradient-to-b from-biz-orange/30 via-biz-amber/20 to-biz-teal/20" />
              {/* Beam animation */}
              <motion.div
                className="absolute left-0 w-full h-6 rounded-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
                animate={{ y: ['-100%', '400%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1.5,
                }}
              />
            </div>
          )}
        </div>

        {/* Card */}
        <div className="relative glass-card rounded-2xl p-5 flex-1 mb-4 overflow-hidden group">
          {/* Gradient top border */}
          <div
            className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${step.gradientFromTo} opacity-60 group-hover:opacity-100 transition-opacity z-20`}
          />

          {/* Step number watermark */}
          <span className="absolute -top-3 -right-1 text-5xl font-black text-outline leading-none pointer-events-none select-none opacity-30">
            {step.number}
          </span>

          <div className="relative z-10">
            <h3 className={`text-base font-bold ${step.textColor} mb-1`}>
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* ─── Main Component ─── */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <SectionBadge variant="orange">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            OUR PROCESS
          </SectionBadge>
          <h2 className="text-4xl md:text-6xl font-black mt-4 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step process to transform your business growth
          </p>
        </AnimatedSection>

        {/* Steps - Desktop Horizontal / Mobile Vertical */}
        <div className="mb-20 md:mb-28">
          {/* Desktop: horizontal with connectors */}
          <div className="hidden lg:flex items-start gap-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start flex-1">
                <StepCard step={step} index={index} />
                {index < steps.length - 1 && <BeamConnector />}
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* ─── Comparison Table ─── */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              Agency vs <span className="gradient-text">BizMeals</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how we compare to the traditional agency model
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-muted/30 via-transparent to-biz-teal/5 border-b border-border/40">
              <div className="p-4 md:p-5 text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Feature
              </div>
              <div className="p-4 md:p-5 text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider text-center">
                Traditional Agency
              </div>
              <div className="p-4 md:p-5 text-center">
                <span className="text-xs md:text-sm font-bold gradient-text-teal uppercase tracking-wider">BizMeals</span>
              </div>
            </div>

            {/* Data Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.aspect}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 items-center p-4 md:p-5 border-b border-border/20 last:border-b-0 ${
                  index % 2 === 0 ? 'bg-secondary/5' : 'bg-transparent'
                } hover:bg-secondary/15 transition-colors duration-300`}
              >
                {/* Feature name */}
                <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-biz-orange/60" />
                  {row.aspect}
                </div>

                {/* Traditional Agency - Mobile */}
                <div className="md:hidden flex items-center gap-2 mt-1">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">{row.traditional}</span>
                </div>

                {/* Traditional Agency - Desktop */}
                <div className="hidden md:flex items-center gap-2 justify-center">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">{row.traditional}</span>
                </div>

                {/* BizMeals - Mobile */}
                <div className="md:hidden flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-xs text-foreground font-medium">{row.bizmeals}</span>
                </div>

                {/* BizMeals - Desktop */}
                <div className="hidden md:flex items-center gap-2 justify-center">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{row.bizmeals}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <Button
            size="lg"
            className="gradient-orange text-white border-0 hover:opacity-90 transition-opacity text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-biz-orange/20 transition-shadow"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Growth Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
