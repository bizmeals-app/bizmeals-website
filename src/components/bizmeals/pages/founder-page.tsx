'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  Sparkles,
  Home,
  ChevronRight,
  Target,
  TrendingUp,
  Zap,
  Users,
  Network,
  Building2,
  HandshakeIcon,
  Lightbulb,
  Eye,
  Hammer,
  UserPlus,
  Rocket,
  Quote,
  Calendar,
  Linkedin,
  Phone,
  Mail,
  Code,
  Megaphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'
import { siteConfig } from '@/lib/site-config'

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

const leaders = [
  {
    name: siteConfig.founder.name,
    role: siteConfig.founder.role,
    initials: siteConfig.founder.initials,
    linkedin: siteConfig.founder.linkedin,
    accent: 'biz-amber',
    blurb:
      "Started in digital marketing (2019), built startups, founded BizMeals — on a 10-year mission to become one of India's top entrepreneurs.",
  },
  {
    name: siteConfig.coFounder.name,
    role: siteConfig.coFounder.role,
    initials: siteConfig.coFounder.initials,
    linkedin: siteConfig.coFounder.linkedin,
    accent: 'biz-teal',
    blurb:
      'Co-Founder at BizMeals, working alongside Manjunatha to build a 360° business growth partner.',
  },
]

/* ── In-house teams (no individual names — just the functions that exist) ── */
const teamDepartments = [
  {
    icon: Users,
    title: 'HR & People',
    accent: 'biz-purple',
    description:
      'Talent acquisition, onboarding, and culture — the team that builds and supports the people behind BizMeals.',
  },
  {
    icon: HandshakeIcon,
    title: 'Business Development (BDEs)',
    accent: 'biz-teal',
    description:
      'Client acquisition, partnerships, and market expansion — opening doors and building long-term relationships.',
  },
  {
    icon: Code,
    title: 'Developers',
    accent: 'biz-amber',
    description:
      'Web and product builders — websites, apps, and technical builds that are fast, reliable, and conversion-focused.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    accent: 'biz-violet',
    description:
      'SEO, paid media, social, and content — the growth engine behind every client campaign we run.',
  },
  {
    icon: TrendingUp,
    title: 'Sales',
    accent: 'biz-cyan',
    description:
      'Lead conversion, deal closure, and account growth — turning qualified opportunities into real revenue.',
  },
]

const communityStats = [
  {
    icon: Users,
    value: `${siteConfig.community.freelancers}+`,
    label: 'Freelancers',
    accent: 'biz-purple',
    description:
      'A community of skilled freelancers across digital marketing, design, development, sales, BPO, and more — working with us across industries.',
  },
  {
    icon: Building2,
    value: `${siteConfig.community.founders}+`,
    label: 'Founders & Business Owners',
    accent: 'biz-teal',
    description:
      'A network of founders and business owners across manufacturing, real estate, tech, retail, finance, education, and many more sectors.',
  },
  {
    icon: HandshakeIcon,
    value: 'Multiple',
    label: 'Partner Companies',
    accent: 'biz-amber',
    description:
      'We collaborate with partner companies who work alongside our freelancer team to deliver 360° growth for every client.',
  },
]

const skills = [
  { icon: Target, label: 'Marketing Strategy', accent: 'biz-purple' },
  { icon: TrendingUp, label: 'Business Growth', accent: 'biz-teal' },
  { icon: Zap, label: 'Execution Excellence', accent: 'biz-amber' },
  { icon: Users, label: 'Team Building', accent: 'biz-violet' },
  { icon: HandshakeIcon, label: 'Client Relations', accent: 'biz-cyan' },
  { icon: Lightbulb, label: 'Innovation', accent: 'biz-orange' },
]

const timeline = [
  { year: '2019', text: 'Started career in digital marketing — learning the craft of growth, leads, and online brand-building from the ground up' },
  { year: '2021', text: 'Stepped into entrepreneurship — built and tested his own startup ideas, learning firsthand what it takes to launch and run a business' },
  { year: '2022', text: 'Founded BizMeals as a Business Growth Execution Partner — turning hard-won lessons into a repeatable system for other business owners' },
  { year: '2023', text: 'Helped business owners across Bangalore implement growth strategies and started building a network of specialists' },
  { year: '2024', text: 'Grew BizMeals into a trusted growth partner — expanding service lines and the expert network to serve more businesses' },
  { year: '2025', text: 'Today: growing a successful business while helping other business owners do the same — with a clear 10-year vision to become one of India\'s top entrepreneurs' },
]

const howHeHelps = [
  {
    icon: Eye,
    title: 'Strategy & Vision',
    description: 'Defining clear growth roadmaps and market positioning that align with your business goals.',
    accent: 'biz-purple',
  },
  {
    icon: Hammer,
    title: 'Hands-On Execution',
    description: 'Not just advice — direct involvement in implementing strategies and driving measurable outcomes.',
    accent: 'biz-teal',
  },
  {
    icon: UserPlus,
    title: 'Team Building',
    description: 'Assembling and mentoring high-performance teams that deliver consistently.',
    accent: 'biz-amber',
  },
  {
    icon: Rocket,
    title: 'Growth Acceleration',
    description: 'Proven frameworks to scale revenue, expand markets, and achieve sustainable growth.',
    accent: 'biz-violet',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   FOUNDER PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function FounderPage() {
  const { setCurrentPage } = usePage()

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const bioRef = useRef<HTMLDivElement>(null)
  const bioInView = useInView(bioRef, { once: true, margin: '-80px' })

  const skillsRef = useRef<HTMLDivElement>(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' })

  const helpRef = useRef<HTMLDivElement>(null)
  const helpInView = useInView(helpRef, { once: true, margin: '-80px' })

  const quoteRef = useRef<HTMLDivElement>(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const leadershipRef = useRef<HTMLDivElement>(null)
  const leadershipInView = useInView(leadershipRef, { once: true, margin: '-80px' })

  const teamRef = useRef<HTMLDivElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })

  const communityRef = useRef<HTMLDivElement>(null)
  const communityInView = useInView(communityRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
      className="relative pt-20 min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-navy-section"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#F5A623]/8 morph-blob blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#1E3A8A]/20 morph-blob blur-3xl" style={{ animationDelay: '-3s' }} />
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
          <span className="text-white font-medium">Team & Leadership</span>
        </motion.div>

        {/* Avatar */}
        <motion.div variants={scaleIn} className="mb-6 sm:mb-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-lg shadow-[#F5A623]/30 relative"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)', border: '2px solid rgba(245,166,35,0.4)' }}
          >
            <span className="text-3xl sm:text-4xl font-bold text-white">MR</span>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#F5A623]/30 animate-pulse" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-3 sm:mb-4"
        >
          <span className="text-white">Manjunatha Reddy Polaka</span>
        </motion.h1>

        {/* Title */}
        <motion.p variants={fadeUp} className="text-[11px] sm:text-xs md:text-sm text-[#F5A623] font-semibold mb-4">
          CEO & Co-Founder, BizMeals
        </motion.p>

        {/* Experience badge */}
        <motion.div variants={fadeUp} className="float-animation mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs sm:text-sm font-semibold text-white">Leading the BizMeals Team</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 mt-4">
          <a
            href={siteConfig.founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/80 hover:text-[#F5A623] hover:bg-white/10 border border-white/20 transition-all duration-300"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-[11px] font-semibold">LinkedIn</span>
          </a>
          <a
            href="tel:+918217330484"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/80 hover:text-[#F5A623] hover:bg-white/10 border border-white/20 transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-[11px] font-semibold">+91 8217330484</span>
          </a>
          <a
            href={siteConfig.contact.phone2Href}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/80 hover:text-[#F5A623] hover:bg-white/10 border border-white/20 transition-all duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-[11px] font-semibold">+91 8073568735</span>
          </a>
          <a
            href="mailto:info@bizmeals.in"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/80 hover:text-[#F5A623] hover:bg-white/10 border border-white/20 transition-all duration-300"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-[11px] font-semibold">Email</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     1.5. LEADERSHIP
     ═══════════════════════════════════════════════════════ */

  const renderLeadership = () => (
    <section ref={leadershipRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={leadershipInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Users className="w-3.5 h-3.5 text-biz-purple" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Leadership</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Meet the <span className="gradient-text">Team & Leadership</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            The founders driving BizMeals&apos; mission to be a 360° business growth partner.
          </motion.p>
        </motion.div>

        {/* Leader cards */}
        <motion.div
          initial="hidden"
          animate={leadershipInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              variants={scaleIn}
              custom={i}
              className="group glass-card-strong rounded-2xl p-6 sm:p-8 card-hover relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at 50% 0%, ${
                    leader.accent === 'biz-amber' ? 'rgba(245,166,35,0.08)' : 'rgba(30,58,138,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg mb-4 relative"
                  style={{
                    background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)',
                    border: `2px solid ${leader.accent === 'biz-amber' ? 'rgba(245,166,35,0.4)' : 'rgba(30,58,138,0.4)'}`,
                  }}
                >
                  <span className="text-2xl sm:text-3xl font-bold text-white">{leader.initials}</span>
                  <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse" />
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-foreground">{leader.name}</h3>

                {/* Role */}
                <p
                  className={`text-xs sm:text-sm font-semibold mb-3 ${
                    leader.accent === 'biz-amber' ? 'text-biz-amber' : 'text-biz-teal'
                  }`}
                >
                  {leader.role}
                </p>

                {/* Blurb */}
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-5">
                  {leader.blurb}
                </p>

                {/* LinkedIn button */}
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-[#F5A623] hover:bg-white/10 border border-white/20 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-xs font-semibold">Connect on LinkedIn</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     1.6. OUR TEAM (in-house functions — no individual names)
     ═══════════════════════════════════════════════════════ */

  const renderTeam = () => (
    <section ref={teamRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Users className="w-3.5 h-3.5 text-biz-amber" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Our Team</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            The <span className="gradient-text">Teams</span> Behind BizMeals
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Beyond our founders, BizMeals is powered by dedicated in-house teams across every function — each one already in place and ready to deliver 360° growth.
          </motion.p>
        </motion.div>

        {/* Team role cards */}
        <motion.div
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {teamDepartments.map((dept, i) => (
            <motion.div
              key={dept.title}
              variants={scaleIn}
              custom={i}
              className="group glass-card rounded-2xl p-5 sm:p-6 card-hover relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(280px circle at 50% 50%, ${
                    dept.accent === 'biz-purple' ? 'rgba(168,85,247,0.08)' :
                    dept.accent === 'biz-teal' ? 'rgba(20,184,166,0.08)' :
                    dept.accent === 'biz-amber' ? 'rgba(245,158,11,0.08)' :
                    dept.accent === 'biz-violet' ? 'rgba(139,92,246,0.08)' :
                    'rgba(6,182,212,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-${dept.accent}/10 flex items-center justify-center`}>
                  <dept.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${dept.accent}`} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5">{dept.title}</h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{dept.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team contact note */}
        <motion.div
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
            Want to join the team or talk to us about a role? Reach us directly.
          </p>
          <a
            href={siteConfig.contact.phone2Href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-foreground/80 hover:text-[#F5A623] border border-border hover:border-[#F5A623]/40 hover:bg-[#F5A623]/5 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold">+91 8073568735</span>
          </a>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     1.75. COMMUNITY & NETWORK
     ═══════════════════════════════════════════════════════ */

  const renderCommunity = () => (
    <section ref={communityRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={communityInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Network className="w-3.5 h-3.5 text-biz-teal" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">The Ecosystem</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Our Community & <span className="gradient-text-teal">Network</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Beyond the core team, BizMeals is powered by an extended ecosystem — our freelancer team works with us, partner companies work with us, and together we deliver growth across any industry.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          animate={communityInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
        >
          {communityStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-6 sm:p-7 card-hover relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(280px circle at 50% 50%, ${
                    stat.accent === 'biz-purple'
                      ? 'rgba(15,37,87,0.08)'
                      : stat.accent === 'biz-teal'
                        ? 'rgba(30,58,138,0.08)'
                        : 'rgba(245,166,35,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-${stat.accent}/10 flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.accent}`} />
                </div>

                {/* Value */}
                <div className={`text-3xl sm:text-4xl font-bold mb-1 text-${stat.accent}`}>
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial="hidden"
          animate={communityInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-8 sm:mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          Our freelancer team works with us, and partner companies work with us — together we deliver{' '}
          <span className="text-foreground font-semibold">360° growth across any industry.</span>
        </motion.p>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. BIO SECTION
     ═══════════════════════════════════════════════════════ */

  const renderBio = () => (
    <section ref={bioRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <motion.div
        initial="hidden"
        animate={bioInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.div
          variants={scaleIn}
          className="glass-card-strong rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden"
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-biz-purple/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-biz-teal/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5 text-biz-purple" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">The Story</span>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Manjunatha Reddy Polaka started his career in <span className="text-foreground font-semibold">digital marketing in 2019</span>, learning the craft of growth, leads, and online brand-building from the ground up. Driven by an entrepreneurial itch, he soon stepped into building his own <span className="text-foreground font-semibold">startup and business ventures</span> — testing, failing, and learning what actually makes a business work. Those lessons became BizMeals: a Business Growth Execution Partner that helps other business owners grow with the same hands-on, execution-first approach. Today he is building a successful business, helping other business owners do the same, and working towards a clear goal — <span className="text-foreground font-semibold">becoming one of India&apos;s top entrepreneurs in the next 10 years.</span> Today, Manjunatha and co-founder <span className="text-foreground font-semibold">Durga Prasad</span> are building BizMeals with a network of <span className="text-foreground font-semibold">{siteConfig.community.freelancers}+ freelancers</span> and <span className="text-foreground font-semibold">{siteConfig.community.founders}+ founders and business owners</span> across industries.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. SKILLS / EXPERTISE
     ═══════════════════════════════════════════════════════ */

  const renderSkills = () => (
    <section ref={skillsRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={skillsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Zap className="w-3.5 h-3.5 text-biz-amber" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Expertise</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial="hidden"
          animate={skillsInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              variants={scaleIn}
              custom={i}
              className="glass-card rounded-xl p-4 sm:p-5 text-center card-hover group"
            >
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-${skill.accent}/10 flex items-center justify-center mx-auto mb-2.5`}>
                <skill.icon className={`w-5 h-5 text-${skill.accent}`} />
              </div>
              <h3 className="text-[11px] sm:text-xs font-bold text-foreground">{skill.label}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. TIMELINE
     ═══════════════════════════════════════════════════════ */

  const renderTimeline = () => (
    <section ref={timelineRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={timelineInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Calendar className="w-3.5 h-3.5 text-biz-teal" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Journey</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            The <span className="gradient-text-teal">Journey</span>
          </motion.h2>
        </motion.div>

        {/* Timeline items */}
        <motion.div
          initial="hidden"
          animate={timelineInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-biz-purple/40 via-biz-teal/40 to-biz-amber/40" />

          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={fadeUp}
                custom={i}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                {/* Dot on line */}
                <div className="relative z-10 shrink-0 w-8 sm:w-12 flex justify-center">
                  <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 mt-1 ${
                    i === 0 ? 'border-biz-purple bg-biz-purple/30' :
                    i === timeline.length - 1 ? 'border-biz-amber bg-biz-amber/30' :
                    'border-biz-teal bg-biz-teal/30'
                  }`} style={{
                    boxShadow: `0 0 12px ${
                      i === 0 ? 'rgba(168,85,247,0.3)' :
                      i === timeline.length - 1 ? 'rgba(245,158,11,0.3)' :
                      'rgba(20,184,166,0.3)'
                    }`
                  }} />
                </div>

                {/* Content */}
                <div className="glass-card rounded-xl p-4 sm:p-5 flex-1 card-hover">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs sm:text-sm font-bold ${
                      i === 0 ? 'text-biz-purple' :
                      i === timeline.length - 1 ? 'text-biz-amber' :
                      'text-biz-teal'
                    }`}>
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. HOW HE HELPS
     ═══════════════════════════════════════════════════════ */

  const renderHowHeHelps = () => (
    <section ref={helpRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={helpInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <HandshakeIcon className="w-3.5 h-3.5 text-biz-purple" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Impact</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            How He <span className="gradient-text">Helps</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={helpInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {howHeHelps.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              className="group glass-card rounded-2xl p-5 sm:p-6 card-hover overflow-hidden relative"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at 50% 50%, ${
                    item.accent === 'biz-purple' ? 'rgba(168,85,247,0.08)' :
                    item.accent === 'biz-teal' ? 'rgba(20,184,166,0.08)' :
                    item.accent === 'biz-amber' ? 'rgba(245,158,11,0.08)' :
                    'rgba(139,92,246,0.08)'
                  }, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-${item.accent}/10 flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 text-${item.accent}`} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. PERSONAL QUOTE
     ═══════════════════════════════════════════════════════ */

  const renderQuote = () => (
    <section ref={quoteRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />

      <motion.div
        initial="hidden"
        animate={quoteInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.div
          variants={scaleIn}
          className="glass-card-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-biz-purple/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-biz-teal/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-biz-purple/30 mx-auto mb-4 sm:mb-6" />
            <blockquote className="text-sm sm:text-base md:text-lg font-semibold text-foreground leading-relaxed italic">
              &ldquo;I started in digital marketing, built my own businesses, and learned what works the hard way. Now I help other business owners grow — and I&apos;m building BizMeals into one of India&apos;s most respected growth companies over the next decade.&rdquo;
            </blockquote>
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm font-bold gradient-text">Manjunatha Reddy Polaka</p>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">CEO & Co-Founder, BizMeals</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. CTA
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section ref={ctaRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />
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
            Let&apos;s Connect
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          Work With <span className="gradient-text">Manjunatha</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-[11px] sm:text-xs text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          Ready to transform your business with hands-on execution and proven strategies? Let&apos;s start the conversation.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            onClick={() => setCurrentPage('contact')}
            className="gradient-purple glow-purple text-white font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl h-auto shadow-lg hover:shadow-xl hover:shadow-biz-purple/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <HandshakeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Work With Me
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <a
            href={siteConfig.linkedin.company}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-xl font-semibold text-foreground/80 hover:text-[#F5A623] border border-border hover:border-[#F5A623]/40 hover:bg-[#F5A623]/5 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
            Follow BizMeals on LinkedIn
          </a>
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
      {renderLeadership()}
      {renderTeam()}
      {renderCommunity()}
      {renderBio()}
      {renderSkills()}
      {renderTimeline()}
      {renderHowHeHelps()}
      {renderQuote()}
      {renderCTA()}
    </>
  )
}
