'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Factory, Rocket, Store, GraduationCap, Stethoscope, Wrench, ArrowRight } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem, SectionBadge } from './animated-section'

interface Industry {
  icon: typeof Factory
  name: string
  description: string
  gradient: string
  gradientStart: string
  gradientEnd: string
  glowClass: string
  accent: 'orange' | 'teal'
  pattern: string
}

const industries: Industry[] = [
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Digitize operations, generate B2B leads, and build industry authority online.',
    gradient: 'from-orange-500 via-amber-500 to-orange-600',
    gradientStart: '#f97316',
    gradientEnd: '#f59e0b',
    glowClass: 'glow-orange',
    accent: 'orange',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(249,115,22,0.12) 0%, transparent 50%)',
  },
  {
    icon: Rocket,
    name: 'Startups',
    description: 'From idea validation to scale. We execute your go-to-market and growth loops.',
    gradient: 'from-teal-400 via-cyan-400 to-teal-500',
    gradientStart: '#14b8a6',
    gradientEnd: '#06b6d4',
    glowClass: 'glow-teal',
    accent: 'teal',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(20,184,166,0.12) 0%, transparent 50%)',
  },
  {
    icon: Store,
    name: 'Local Businesses',
    description: 'Dominate your local market with hyperlocal SEO, social media, and online ordering.',
    gradient: 'from-amber-400 via-orange-500 to-amber-500',
    gradientStart: '#f59e0b',
    gradientEnd: '#f97316',
    glowClass: 'glow-orange',
    accent: 'orange',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(245,158,11,0.12) 0%, transparent 50%)',
  },
  {
    icon: GraduationCap,
    name: 'Education & EdTech',
    description: 'Student acquisition, content strategies, and platform growth for education brands.',
    gradient: 'from-cyan-400 via-teal-400 to-cyan-500',
    gradientStart: '#06b6d4',
    gradientEnd: '#14b8a6',
    glowClass: 'glow-teal',
    accent: 'teal',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(6,182,212,0.12) 0%, transparent 50%)',
  },
  {
    icon: Stethoscope,
    name: 'Healthcare & Wellness',
    description: 'Build patient trust, manage reputation, and grow your practice digitally.',
    gradient: 'from-orange-400 via-amber-400 to-orange-500',
    gradientStart: '#fb923c',
    gradientEnd: '#f59e0b',
    glowClass: 'glow-orange',
    accent: 'orange',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(251,146,60,0.12) 0%, transparent 50%)',
  },
  {
    icon: Wrench,
    name: 'Professional Services',
    description: 'HR, legal, consulting firms — establish authority and generate qualified leads.',
    gradient: 'from-teal-500 via-emerald-400 to-teal-400',
    gradientStart: '#14b8a6',
    gradientEnd: '#10b981',
    glowClass: 'glow-teal',
    accent: 'teal',
    pattern: 'radial-gradient(circle at 30% 40%, rgba(16,185,129,0.12) 0%, transparent 50%)',
  },
]

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt tracking
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const Icon = industry.icon

  return (
    <StaggerItem>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group cursor-default"
      >
        <motion.div
          className="relative rounded-2xl overflow-hidden h-[380px] md:h-[420px]"
          animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Card base */}
          <div className="absolute inset-0 glass-card rounded-2xl" />

          {/* Cross-hatch pattern on card */}
          <div className="absolute inset-0 opacity-30 cross-hatch rounded-2xl" />

          {/* Color wash that bleeds on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${industry.gradientStart}40 0%, transparent 70%)`,
            }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Full bleed gradient wash on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(180deg, ${industry.gradientStart}25 0%, ${industry.gradientEnd}10 50%, transparent 100%)`,
            }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          />

          {/* Spotlight sweep */}
          <div className="absolute inset-0 spotlight rounded-2xl z-20" />

          {/* Top gradient icon area — the main visual feature */}
          <div className="relative z-10">
            <motion.div
              className={`relative mx-6 mt-6 rounded-2xl bg-gradient-to-br ${industry.gradient} overflow-hidden`}
              style={{ height: '140px' }}
              animate={isHovered ? { height: '150px' } : { height: '140px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Icon pattern background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 right-3 w-20 h-20 rounded-full border-2 border-white/30" />
                <div className="absolute bottom-2 left-3 w-16 h-16 rounded-full border-2 border-white/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10" />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer" />

              {/* Large icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Icon className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                </motion.div>
              </div>

              {/* Floating decorative particles */}
              <motion.div
                className="absolute top-3 left-4 w-2 h-2 rounded-full bg-white/40"
                animate={isHovered ? { y: -4, opacity: 0.8 } : { y: 0, opacity: 0.4 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.div
                className="absolute bottom-4 right-5 w-1.5 h-1.5 rounded-full bg-white/30"
                animate={isHovered ? { y: -3, opacity: 0.7 } : { y: 0, opacity: 0.3 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
              />
              <motion.div
                className="absolute top-6 right-8 w-1 h-1 rounded-full bg-white/50"
                animate={isHovered ? { y: -5, opacity: 0.9 } : { y: 0, opacity: 0.5 }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse', delay: 0.4 }}
              />
            </motion.div>
          </div>

          {/* Content area */}
          <div className="relative z-10 px-6 pt-5 pb-6">
            {/* Industry name — LARGE bold */}
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              style={{ transform: 'translateZ(30px)' }}
            >
              {industry.name}
            </motion.h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {industry.description}
            </p>

            {/* Hover CTA indicator */}
            <motion.div
              className="flex items-center gap-2"
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`text-sm font-semibold ${industry.accent === 'orange' ? 'text-biz-orange' : 'text-biz-teal'}`}>
                Explore Solutions
              </span>
              <ArrowRight className={`w-4 h-4 ${industry.accent === 'orange' ? 'text-biz-orange' : 'text-biz-teal'}`} />
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${industry.gradient}`}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Corner glow on hover */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-3xl"
            style={{ background: industry.gradientStart }}
            animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </StaggerItem>
  )
}

export default function Industries() {
  return (
    <AnimatedSection id="industries" className="py-20 md:py-28 relative">
      {/* Cross-hatch background pattern */}
      <div className="absolute inset-0 cross-hatch opacity-20 pointer-events-none" />
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SectionBadge variant="muted">INDUSTRIES</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Industries We <span className="gradient-text">Transform</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From legacy manufacturing to cutting-edge startups — we bring growth expertise to every sector.
          </motion.p>
        </div>

        {/* Industry cards grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.name} industry={industry} index={index} />
          ))}
        </StaggerContainer>
      </div>

      {/* Section divider */}
      <div className="section-divider-wave" />
    </AnimatedSection>
  )
}
