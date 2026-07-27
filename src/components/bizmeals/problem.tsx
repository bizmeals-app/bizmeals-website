'use client'

import { motion, useInView } from 'framer-motion'
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  DollarSign,
  Users,
  XCircle,
  Flame,
  ChevronRight,
} from 'lucide-react'
import { useRef } from 'react'
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
  HorizontalScrollText,
  SectionBadge,
} from './animated-section'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'One-Size-Fits-All',
    description:
      'Agencies use template strategies. Your business is unique and deserves a custom approach.',
    number: '01',
  },
  {
    icon: TrendingDown,
    title: 'No Skin in the Game',
    description:
      "They get paid regardless of results. No accountability, no real partnership.",
    number: '02',
  },
  {
    icon: XCircle,
    title: 'Execution Gap',
    description:
      'Great strategy, poor execution. Plans die in PowerPoint presentations.',
    number: '03',
  },
  {
    icon: DollarSign,
    title: 'Hidden Costs',
    description:
      'Retainers pile up with diminishing returns. You pay for overhead, not outcomes.',
    number: '04',
  },
  {
    icon: Clock,
    title: 'Slow Turnaround',
    description:
      "Weeks to launch a campaign. By then, the market has moved on.",
    number: '05',
  },
  {
    icon: Users,
    title: 'No Growth Mindset',
    description:
      'Agencies focus on deliverables, not business growth metrics that matter.',
    number: '06',
  },
]

function PainPointRow({
  point,
  index,
}: {
  point: (typeof painPoints)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = point.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <motion.div
        className="relative flex items-start gap-5 md:gap-8 py-6 md:py-8 px-4 md:px-8 rounded-2xl cursor-default overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Hover fire glow background */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.06) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl glow-fire"
            style={{ opacity: 0.4 }}
          />
        </div>

        {/* Large watermark number */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[6rem] md:text-[10rem] font-black text-outline select-none pointer-events-none leading-none">
          {point.number}
        </div>

        {/* Red warning icon */}
        <div className="relative z-10 shrink-0 mt-1">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(249,115,22,0.1) 100%)',
              }}
            />
            <div className="absolute inset-0 rounded-xl border border-red-500/20 group-hover:border-red-500/40 transition-colors duration-300" />
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-red-300 transition-colors duration-300">
              {point.title}
            </h3>
            <ChevronRight className="w-4 h-4 text-red-500/0 group-hover:text-red-400 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {point.description}
          </p>
        </div>
      </motion.div>

      {/* Red gradient divider line */}
      {index < painPoints.length - 1 && (
        <div className="relative h-px mx-8 md:mx-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(239,68,68,0.6), rgba(249,115,22,0.6), transparent)',
            }}
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 1.2, delay: index * 0.12 + 0.4 }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Red mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(239,68,68,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(249,115,22,0.06) 0%, transparent 50%)',
          }}
        />
        {/* Pulsing red glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Horizontal scrolling text behind content */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-[0.03]">
        <HorizontalScrollText
          text="THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • "
          className="text-[12rem] md:text-[20rem] font-black text-foreground select-none"
          speed={0.3}
        />
      </div>
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-[0.02]">
        <HorizontalScrollText
          text="THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • THE PROBLEM • "
          className="text-[12rem] md:text-[20rem] font-black text-foreground select-none"
          speed={0.2}
          reverse
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge */}
        <AnimatedSection className="text-center mb-6">
          <SectionBadge variant="fire">
            <Flame className="w-3.5 h-3.5" />
            THE PROBLEM
          </SectionBadge>
        </AnimatedSection>

        {/* Dramatic Headline */}
        <AnimatedSection className="text-center mb-4" delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            The Agency{' '}
            <span className="gradient-text-fire">Problem</span>
          </h2>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection className="text-center mb-16 md:mb-20" delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Why traditional marketing agencies fail growing businesses
          </p>
        </AnimatedSection>

        {/* Pain Points - Full-width staggered list */}
        <div className="relative">
          {/* Left accent line */}
          <motion.div
            className="absolute left-0 md:left-4 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(239,68,68,0.3) 20%, rgba(249,115,22,0.3) 80%, transparent)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="space-y-0">
            {painPoints.map((point, index) => (
              <PainPointRow
                key={point.title}
                point={point}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom dramatic callout */}
        <AnimatedSection delay={0.6} className="mt-16 md:mt-20">
          <motion.div
            className="relative glass-card rounded-2xl p-8 md:p-10 text-center overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fire border effect */}
            <div className="absolute inset-0 rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl border-2 border-red-500/20"
                style={{
                  boxShadow:
                    'inset 0 0 30px rgba(239,68,68,0.05), 0 0 40px rgba(239,68,68,0.08)',
                }}
              />
            </div>

            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(239,68,68,0.06) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.1))',
                  boxShadow:
                    '0 0 30px rgba(239,68,68,0.15)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(239,68,68,0.1)',
                    '0 0 40px rgba(239,68,68,0.25)',
                    '0 0 20px rgba(239,68,68,0.1)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </motion.div>
              <p className="text-xl md:text-2xl font-bold text-foreground">
                Sound familiar?{' '}
                <span className="gradient-text-fire">There&apos;s a better way.</span>
              </p>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Stop paying for broken promises. Start growing with a real partner.
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Section divider */}
      <div className="section-divider-angle" />
    </section>
  )
}
