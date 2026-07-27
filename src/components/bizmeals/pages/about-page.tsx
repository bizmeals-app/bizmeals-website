'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  BookOpen,
  Target,
  Users,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Zap,
  ArrowRight,
  Sparkles,
  Eye,
  Rocket,
  Heart,
  Gem,
  Trophy,
  Linkedin,
  Home,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'

/* ═════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

/* ═════════════════════════════════════════════════════════════════════════
   DATA
   ═════════════════════════════════════════════════════════════════════════ */

interface DifferentiatorData {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  accentText: string
  glowClass: string
}

const differentiators: DifferentiatorData[] = [
  {
    icon: Zap,
    title: 'Execution, Not Just Advice',
    description:
      "We don't hand you a PDF and disappear. We roll up our sleeves and execute every strategy alongside you, ensuring nothing stays on paper.",
    gradient: 'from-purple-500 to-indigo-500',
    accentText: 'text-purple-400',
    glowClass: 'bg-purple-500/8 group-hover:bg-purple-500/15',
  },
  {
    icon: Users,
    title: 'Expert Network, Not One Person',
    description:
      'Access a curated network of specialists across marketing, operations, and growth — not a single generalist trying to do it all.',
    gradient: 'from-blue-500 to-cyan-500',
    accentText: 'text-blue-400',
    glowClass: 'bg-blue-500/8 group-hover:bg-blue-500/15',
  },
  {
    icon: ShieldCheck,
    title: 'Results Guaranteed, Not Promised',
    description:
      'We tie our success to yours. Every action is measured, every strategy is optimized for ROI, and we guarantee outcomes — not just efforts.',
    gradient: 'from-cyan-500 to-teal-500',
    accentText: 'text-cyan-400',
    glowClass: 'bg-cyan-500/8 group-hover:bg-cyan-500/15',
  },
  {
    icon: Rocket,
    title: 'Scalable Support, Not Fixed Packages',
    description:
      'Your business is unique and so is our support. Scale up or down as you need — no rigid packages, no wasted budget, just what works.',
    gradient: 'from-indigo-500 to-violet-500',
    accentText: 'text-indigo-400',
    glowClass: 'bg-indigo-500/8 group-hover:bg-indigo-500/15',
  },
]

interface ValueData {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  accentText: string
  glowClass: string
}

const values: ValueData[] = [
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'No hidden fees, no vague reports. You see exactly where every rupee goes and what it delivers.',
    gradient: 'from-purple-500 to-blue-500',
    accentText: 'text-purple-400',
    glowClass: 'bg-purple-500/8 group-hover:bg-purple-500/15',
  },
  {
    icon: Target,
    title: 'Accountability',
    description:
      "We own the outcomes. If a strategy doesn't work, we pivot — fast. No excuses, only results.",
    gradient: 'from-blue-500 to-cyan-500',
    accentText: 'text-blue-400',
    glowClass: 'bg-blue-500/8 group-hover:bg-blue-500/15',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We stay ahead of the curve, adopting new tools, platforms, and strategies to keep your business competitive.',
    gradient: 'from-cyan-500 to-teal-500',
    accentText: 'text-cyan-400',
    glowClass: 'bg-cyan-500/8 group-hover:bg-cyan-500/15',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description:
      "We're not vendors — we're partners. Your growth is our mission, and we treat your business like our own.",
    gradient: 'from-teal-500 to-emerald-500',
    accentText: 'text-teal-400',
    glowClass: 'bg-teal-500/8 group-hover:bg-teal-500/15',
  },
]

interface TeamMember {
  name: string
  role: string
  initials: string
  gradient: string
  accentText: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Manjunatha Reddy Polaka',
    role: 'CEO & Co-Founder',
    initials: 'MR',
    gradient: 'from-indigo-500 to-violet-500',
    accentText: 'text-indigo-400',
    linkedin: 'https://www.linkedin.com/company/bizmeals',
  },
  {
    name: 'A. Durga Prasad',
    role: 'Co-Founder & Director',
    initials: 'ADP',
    gradient: 'from-purple-500 to-indigo-500',
    accentText: 'text-purple-400',
    linkedin: 'https://www.linkedin.com/company/bizmeals',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   ABOUT PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function AboutPage() {
  const { setCurrentPage } = usePage()

  /* ─── Section refs for scroll animations ─── */
  const storyRef = useRef<HTMLDivElement>(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' })

  const missionVisionRef = useRef<HTMLDivElement>(null)
  const missionVisionInView = useInView(missionVisionRef, { once: true, margin: '-80px' })

  const differentRef = useRef<HTMLDivElement>(null)
  const differentInView = useInView(differentRef, { once: true, margin: '-80px' })

  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })

  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. HERO SECTION
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
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

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-1.5 text-xs mb-6"
        >
          <button
            onClick={() => setCurrentPage('home')}
            className="text-white/60 hover:text-[#F5A623] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3 h-3" />
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <span className="text-white font-semibold">About</span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">About Us</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5"
        >
          <span className="block text-white">The Story Behind</span>
          <span className="block text-[#F5A623] mt-1.5">BizMeals</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          From a simple observation to a movement — discover why we exist and what drives us every day.
        </motion.p>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. OUR STORY SECTION
     ═══════════════════════════════════════════════════════ */

  const renderStory = () => (
    <section
      ref={storyRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow"
    >
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={storyInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-full mb-4 sm:mb-5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/70">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-6 sm:mb-8"
          >
            Born from a <span className="gradient-text-purple">Simple Observation</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="glass-card-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/70 via-blue-500/50 to-cyan-500/30" />

            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                BizMeals was born from a simple observation:{' '}
                <span className="text-foreground font-medium">
                  businesses were drowning in advice but starving for execution.
                </span>{' '}
                Strategy decks gathered dust. Marketing plans stayed on paper. And the agencies? They delivered reports, not results.
              </p>

              <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                We decided to be different. We don&apos;t hand you a PDF and disappear. We become your{' '}
                <span className="text-foreground font-medium">growth team</span> — strategizing, executing, and delivering measurable results.
              </p>

              <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                That&apos;s why we call ourselves a{' '}
                <span className="gradient-text-purple font-semibold">Growth Execution Partner</span>, not an agency.
              </p>
            </div>

            {/* Decorative quote mark */}
            <div className="absolute bottom-3 right-4 text-[60px] leading-none font-serif text-purple-500/8 select-none pointer-events-none">
              &ldquo;
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. MISSION & VISION
     ═══════════════════════════════════════════════════════ */

  const renderMissionVision = () => (
    <section
      ref={missionVisionRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={missionVisionInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* Mission Card */}
          <motion.div
            variants={scaleIn}
            className="group relative glass-card-strong rounded-2xl p-6 sm:p-8 card-hover overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-blue-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-purple mb-4 shadow-lg shadow-purple-500/20">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-purple-400 block mb-2">
                Our Mission
              </span>

              <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                To bridge the gap between strategy and execution by building a scalable network of experts who deliver{' '}
                <span className="text-foreground font-medium">real business results</span>.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={scaleIn}
            custom={1}
            className="group relative glass-card-strong rounded-2xl p-6 sm:p-8 card-hover overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 to-teal-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/8 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-teal mb-4 shadow-lg shadow-cyan-500/20">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-400 block mb-2">
                Our Vision
              </span>

              <p className="text-[11px] sm:text-xs text-muted-foreground/80 leading-relaxed">
                A world where every business, regardless of size, has access to{' '}
                <span className="text-foreground font-medium">world-class execution support</span>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. WHY WE'RE DIFFERENT
     ═══════════════════════════════════════════════════════ */

  const renderDifferent = () => (
    <section
      ref={differentRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow"
    >
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={differentInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-full mb-4 sm:mb-5"
          >
            <Gem className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/70">
              What Sets Us Apart
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
          >
            Why We&apos;re <span className="gradient-text-purple">Different</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={differentInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              className="group relative glass-card rounded-2xl p-5 sm:p-6 card-hover overflow-hidden"
            >
              {/* Accent glow */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-colors duration-500 pointer-events-none ${item.glowClass}`}
              />
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${item.gradient}`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 shadow-lg`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. VALUES
     ═══════════════════════════════════════════════════════ */

  const renderValues = () => (
    <section
      ref={valuesRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-full mb-4 sm:mb-5"
          >
            <Trophy className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/70">
              Core Values
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
          >
            What We <span className="gradient-text-teal">Stand For</span>
          </motion.h2>
        </motion.div>

        {/* Value cards */}
        <motion.div
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              custom={i}
              className="group relative glass-card rounded-2xl p-5 sm:p-6 card-hover overflow-hidden text-center"
            >
              {/* Accent glow */}
              <div
                className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 pointer-events-none ${value.glowClass}`}
              />
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${value.gradient}`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${value.gradient} mb-4 shadow-lg mx-auto`}
                >
                  <value.icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. TEAM SECTION
     ═══════════════════════════════════════════════════════ */

  const renderTeam = () => (
    <section
      ref={teamRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow"
    >
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-full mb-4 sm:mb-5"
          >
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/70">
              Our Team
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
          >
            The People Behind <span className="gradient-text-purple">BizMeals</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-[11px] sm:text-xs text-muted-foreground/70 max-w-xl mx-auto leading-relaxed"
          >
            A dedicated team of professionals committed to delivering growth for your business.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-2xl mx-auto"
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-5 sm:p-6 card-hover text-center relative overflow-hidden"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl bg-gradient-to-br ${member.gradient} opacity-15`} />
              </div>

              <div className="relative z-10">
                {/* Avatar */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${member.gradient} mb-3 shadow-lg mx-auto`}
                >
                  <span className="text-white font-bold text-sm sm:text-base">
                    {member.initials}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <span className={`text-[10px] sm:text-[11px] ${member.accentText} font-medium`}>
                  {member.role}
                </span>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. CTA SECTION
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section
      ref={ctaRef}
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="glass-card-strong rounded-2xl p-8 sm:p-12 relative overflow-hidden"
          >
            {/* Animated border spin */}
            <div className="absolute inset-0 rounded-2xl gradient-border-spin pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-purple mb-4 sm:mb-6 shadow-lg shadow-purple-500/20 mx-auto">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4">
                Ready to <span className="gradient-text-purple">Grow With Us?</span>
              </h2>

              <p className="text-[11px] sm:text-xs text-muted-foreground/70 max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
                Join the businesses that have transformed their growth with BizMeals. Let&apos;s build something extraordinary together.
              </p>

              <Button
                onClick={() => setCurrentPage('contact')}
                className="gradient-purple glow-purple text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm rounded-xl h-auto shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Your Growth Journey
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <main>
      {renderHero()}
      {renderStory()}
      {renderMissionVision()}
      {renderDifferent()}
      {renderValues()}
      {renderTeam()}
      {renderCTA()}
    </main>
  )
}
