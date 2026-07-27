'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  CheckCircle,
  Zap,
  Target,
  ArrowRight,
  Network,
  Cpu,
  Handshake,
  XCircle,
  Sparkles,
  Users,
  ChevronRight,
} from 'lucide-react'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import AnimatedSection, {
  AnimatedCard,
  StaggerContainer,
  StaggerItem,
  SectionBadge,
} from './animated-section'

const pillars = [
  {
    icon: Target,
    title: 'Strategy',
    description:
      'We craft data-driven growth roadmaps tailored to your business goals, market position, and competitive landscape.',
    accent: 'gradient-teal',
    glowClass: 'glow-teal',
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    number: '01',
    color: '#14b8a6',
    hoverBorder: 'group-hover:border-teal-500/40',
  },
  {
    icon: Zap,
    title: 'Execution',
    description:
      'We implement through our vetted network of freelancers, agencies, and partners — the right expert for every task.',
    accent: 'gradient-orange',
    glowClass: 'glow-orange',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    number: '02',
    color: '#f97316',
    hoverBorder: 'group-hover:border-orange-500/40',
  },
  {
    icon: Cpu,
    title: 'Management',
    description:
      'We project-manage every deliverable, timeline, and outcome — so nothing falls through the cracks.',
    accent: 'gradient-mixed',
    glowClass: '',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    number: '03',
    color: '#f59e0b',
    hoverBorder: 'group-hover:border-amber-500/40',
  },
]

const traditionalItems = [
  'Fixed team',
  'Template approach',
  'Monthly retainer',
  'Limited scope',
  'Slow execution',
]

const bizmealsItems = [
  'Expert network',
  'Custom strategy',
  'Performance-linked',
  'Full-stack growth',
  'Agile execution',
]

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const Icon = pillar.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group"
    >
      <motion.div
        className={`relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden border ${pillar.borderColor} ${pillar.hoverBorder} transition-colors duration-500`}
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${pillar.accent}`} />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${pillar.color}10 0%, transparent 70%)`,
          }}
        />

        {/* HUGE watermark number */}
        <div className="absolute -right-4 -top-8 text-[10rem] md:text-[14rem] font-black text-outline select-none pointer-events-none leading-none opacity-60">
          {pillar.number}
        </div>

        {/* Icon */}
        <div className="relative z-10">
          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border ${pillar.borderColor}`}
          >
            <Icon className={`w-8 h-8 md:w-10 md:h-10 ${pillar.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {pillar.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
            {pillar.description}
          </p>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${pillar.accent}`}
          initial={{ width: '0%' }}
          whileInView={{ width: '40%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

function FlowConnector({ index }: { index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  if (index >= pillars.length - 1) return null

  const colors = [
    'linear-gradient(90deg, #14b8a6, #f97316)',
    'linear-gradient(90deg, #f97316, #f59e0b)',
  ]

  return (
    <div
      ref={ref}
      className="hidden lg:flex items-center justify-center w-16 relative shrink-0"
    >
      {/* Connector line */}
      <motion.div
        className="absolute h-[2px] w-full"
        style={{ background: colors[index] }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
      />
      {/* Flowing dot */}
      <motion.div
        className="w-2.5 h-2.5 rounded-full shrink-0 z-10"
        style={{
          background: colors[index],
          boxShadow: `0 0 10px ${index === 0 ? '#14b8a6' : '#f97316'}80`,
        }}
        animate={{ x: [-12, 12, -12] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3 + 1,
        }}
      />
    </div>
  )
}

function ComparisonItem({
  text,
  type,
  index,
}: {
  text: string
  type: 'traditional' | 'bizmeals'
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: type === 'traditional' ? -20 : 20 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: type === 'traditional' ? -20 : 20 }
      }
      transition={{
        duration: 0.4,
        delay: index * 0.1 + 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex items-center gap-4 py-4 px-5 md:px-6 rounded-xl group/item"
    >
      {type === 'traditional' ? (
        <>
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/10">
            <XCircle className="w-4 h-4 text-red-400/60" />
          </div>
          <span className="text-sm md:text-base text-muted-foreground/70 line-through decoration-red-500/30 decoration-1">
            {text}
          </span>
        </>
      ) : (
        <>
          <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm md:text-base text-foreground font-semibold">
            {text}
          </span>
        </>
      )}
    </motion.div>
  )
}

export default function Solution() {
  const sectionRef = useRef(null)

  return (
    <section
      id="solution"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background: mesh-gradient-dark with teal glow */}
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Badge */}
        <AnimatedSection className="text-center mb-6">
          <SectionBadge variant="teal">
            <Sparkles className="w-3.5 h-3.5" />
            THE SOLUTION
          </SectionBadge>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection className="text-center mb-4" delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            The <span className="gradient-text">BizMeals Model</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16 md:mb-20" delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A Business Growth Execution Partner powered by a network of experts
          </p>
        </AnimatedSection>

        {/* Three Pillars - Horizontal Flow */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 mb-24 md:mb-32">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="flex items-stretch flex-1">
              <div className="flex-1">
                <PillarCard pillar={pillar} index={i} />
              </div>
              <FlowConnector index={i} />
            </div>
          ))}
        </div>

        {/* Comparison Section - Split Screen */}
        <AnimatedSection className="mb-10">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl font-bold">
              How We&apos;re{' '}
              <span className="gradient-text-teal">Different</span>
            </h3>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">
              The old way vs. the <span className="text-teal-400 font-semibold">BizMeals way</span>
            </p>
          </div>
        </AnimatedSection>

        <div className="relative max-w-5xl mx-auto">
          {/* Split screen comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {/* Vertical divider - only on md+ */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20">
              <motion.div
                className="w-px h-full"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, rgba(20,184,166,0.3) 20%, rgba(249,115,22,0.3) 80%, transparent)',
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
              {/* Center VS badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xs tracking-wider"
                  style={{
                    background: 'oklch(0.10 0.012 270 / 90%)',
                    border: '2px solid rgba(20,184,166,0.3)',
                    boxShadow:
                      '0 0 20px rgba(20,184,166,0.15), 0 0 40px rgba(249,115,22,0.1)',
                  }}
                >
                  <span className="gradient-text">VS</span>
                </div>
              </motion.div>
            </div>

            {/* Traditional Agency - Dark, Oppressive */}
            <div className="relative">
              <div
                className="glass-card rounded-2xl md:rounded-r-none md:rounded-l-2xl p-6 md:p-8 border border-red-500/10 h-full relative overflow-hidden"
              >
                {/* Oppressive dark overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(239,68,68,0.03) 0%, rgba(0,0,0,0.2) 100%)',
                  }}
                />

                {/* Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/10">
                      <XCircle className="w-5 h-5 text-red-400/60" />
                    </div>
                    <h4 className="text-lg font-bold text-red-300/70">
                      Traditional Agency
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground/50 ml-[52px]">
                    The broken model
                  </p>
                </div>

                {/* Items */}
                <div className="relative z-10 space-y-1">
                  {traditionalItems.map((text, i) => (
                    <ComparisonItem
                      key={text}
                      text={text}
                      type="traditional"
                      index={i}
                    />
                  ))}
                </div>

                {/* Bottom oppressive gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,0.15), transparent)',
                  }}
                />
              </div>
            </div>

            {/* BizMeals - Bright, Liberating */}
            <div className="relative">
              <div
                className="glass-card rounded-2xl md:rounded-l-none md:rounded-r-2xl p-6 md:p-8 border border-teal-500/20 h-full relative overflow-hidden glow-teal"
              >
                {/* Bright teal overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(20,184,166,0.04) 0%, transparent 50%)',
                  }}
                />

                {/* Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-teal-300">
                      BizMeals
                    </h4>
                  </div>
                  <p className="text-xs text-teal-400/60 ml-[52px]">
                    The growth partner model
                  </p>
                </div>

                {/* Items */}
                <div className="relative z-10 space-y-1">
                  {bizmealsItems.map((text, i) => (
                    <ComparisonItem
                      key={text}
                      text={text}
                      type="bizmeals"
                      index={i}
                    />
                  ))}
                </div>

                {/* Bottom bright gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(20,184,166,0.04), transparent)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={0.4} className="mt-14 md:mt-20 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              size="lg"
              className="gradient-orange text-white border-0 hover:opacity-90 transition-all px-10 py-7 text-base font-semibold glow-orange rounded-xl"
              onClick={() =>
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See How It Works
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
