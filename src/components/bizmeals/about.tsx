'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Users,
  Building2,
  Calendar,
  MapPin,
  Target,
  Eye,
  Zap,
  Wallet,
  Sparkles,
} from 'lucide-react'
import AnimatedSection, {
  SectionBadge,
  StaggerContainer,
  StaggerItem,
} from '@/components/bizmeals/animated-section'

/* ─── Key Stats Data ─── */
const keyStats = [
  {
    icon: Users,
    value: '30+',
    label: 'Expert Partners',
    accent: 'orange' as const,
    iconBg: 'gradient-orange',
    glowColor: 'bg-biz-orange/10',
    glowBlur: 'group-hover:bg-biz-orange/15',
  },
  {
    icon: Building2,
    value: '6+',
    label: 'Industries',
    accent: 'teal' as const,
    iconBg: 'gradient-teal',
    glowColor: 'bg-biz-teal/10',
    glowBlur: 'group-hover:bg-biz-teal/15',
  },
  {
    icon: Calendar,
    value: '2022',
    label: 'Founded',
    accent: 'amber' as const,
    iconBg: 'gradient-orange',
    glowColor: 'bg-biz-amber/10',
    glowBlur: 'group-hover:bg-biz-amber/15',
  },
  {
    icon: MapPin,
    value: 'Bangalore',
    label: 'HQ',
    accent: 'emerald' as const,
    iconBg: 'gradient-teal',
    glowColor: 'bg-biz-emerald/10',
    glowBlur: 'group-hover:bg-biz-emerald/15',
  },
]

/* ─── Founders Data ─── */
const founders = [
  {
    name: 'Arjun Mehta',
    initials: 'AM',
    title: 'Co-Founder & CEO',
    bio: 'Serial entrepreneur with 8+ years in digital marketing and business strategy. Previously built and scaled 3 startups.',
    skills: ['Growth Strategy', 'Digital Marketing', 'Business Development'],
    gradientClass: 'from-biz-orange to-biz-amber',
    skillBg: 'bg-biz-orange/10',
    skillBorder: 'border-biz-orange/20',
    skillText: 'text-biz-orange',
    glowColor: 'bg-biz-orange/10',
    glowHover: 'group-hover:bg-biz-orange/15',
  },
  {
    name: 'Kavitha Rao',
    initials: 'KR',
    title: 'Co-Founder & COO',
    bio: 'Operations expert with deep experience in BPO and event management. Built teams that deliver 99.5% accuracy.',
    skills: ['Operations', 'BPO Management', 'Event Planning'],
    gradientClass: 'from-biz-teal to-biz-cyan',
    skillBg: 'bg-biz-teal/10',
    skillBorder: 'border-biz-teal/20',
    skillText: 'text-biz-teal',
    glowColor: 'bg-biz-teal/10',
    glowHover: 'group-hover:bg-biz-teal/15',
  },
]

/* ─── Differentiators Data ─── */
const differentiators = [
  {
    icon: Zap,
    title: 'We Execute, Not Just Advise',
    description:
      'Strategy without execution is just a PDF. We roll up our sleeves and build alongside you, turning plans into measurable outcomes.',
    accent: 'orange' as const,
    iconColor: 'text-biz-orange',
    iconBg: 'bg-biz-orange/10',
    borderColor: 'border-biz-orange/20',
    glowColor: 'bg-biz-orange/5',
  },
  {
    icon: Users,
    title: 'Expert Network, Not Just Employees',
    description:
      'Access 30+ vetted specialists across industries — the right expert for every challenge, not a one-size-fits-all team.',
    accent: 'teal' as const,
    iconColor: 'text-biz-teal',
    iconBg: 'bg-biz-teal/10',
    borderColor: 'border-biz-teal/20',
    glowColor: 'bg-biz-teal/5',
  },
  {
    icon: Wallet,
    title: 'Flexible Pricing, Not Fixed Retainers',
    description:
      'From project-based to equity partnerships, we align our pricing with your stage and goals. Pay for results, not retainers.',
    accent: 'amber' as const,
    iconColor: 'text-biz-amber',
    iconBg: 'bg-biz-amber/10',
    borderColor: 'border-biz-amber/20',
    glowColor: 'bg-biz-amber/5',
  },
]

/* ─── Stat Card ─── */
function StatCard({ stat, index }: { stat: (typeof keyStats)[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="glass-card rounded-xl p-5 flex items-center gap-4 group relative overflow-hidden card-hover">
        {/* Background glow */}
        <div
          className={`absolute inset-0 ${stat.glowColor} opacity-0 ${stat.glowBlur} transition-opacity duration-500 rounded-xl`}
        />
        <div className="relative flex items-center gap-4 w-full">
          <div
            className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">
              {stat.label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Founder Card ─── */
function FounderCard({
  founder,
  index,
}: {
  founder: (typeof founders)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="glass-card rounded-2xl p-6 group relative overflow-hidden card-hover">
        {/* Background glow */}
        <div
          className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${founder.glowColor} blur-[60px] opacity-0 ${founder.glowHover} transition-opacity duration-500 pointer-events-none`}
        />

        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${founder.gradientClass} z-20`}
        />

        <div className="relative z-10 flex items-start gap-5">
          {/* Avatar placeholder with initials */}
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${founder.gradientClass} flex items-center justify-center flex-shrink-0 shadow-lg`}
          >
            <span className="text-xl font-black text-white">
              {founder.initials}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-foreground">
              {founder.name}
            </h4>
            <p className="text-sm text-muted-foreground font-medium mb-3">
              {founder.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {founder.bio}
            </p>
            {/* Skills pills */}
            <div className="flex flex-wrap gap-2">
              {founder.skills.map((skill) => (
                <span
                  key={skill}
                  className={`inline-flex items-center px-3 py-1 rounded-lg ${founder.skillBg} border ${founder.skillBorder} text-xs font-semibold ${founder.skillText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Differentiator Card ─── */
function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof differentiators)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="glass-card rounded-2xl p-6 group relative overflow-hidden h-full"
      >
        {/* Background glow on hover */}
        <div
          className={`absolute inset-0 ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
        />

        {/* Top border accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] ${item.borderColor} bg-gradient-to-r from-transparent via-current to-transparent opacity-40`}
          style={{
            color:
              item.accent === 'orange'
                ? '#f97316'
                : item.accent === 'teal'
                ? '#14b8a6'
                : '#f59e0b',
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
          >
            <Icon className={`w-6 h-6 ${item.iconColor}`} />
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-foreground mb-2">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-biz-orange/5 blur-[120px] morph-blob pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-biz-teal/5 blur-[100px] morph-blob float-animation pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionBadge variant="orange">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            WHO WE ARE
          </SectionBadge>
          <h2 className="text-4xl md:text-6xl font-black mt-5 mb-4">
            About <span className="gradient-text">BizMeals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Born from a simple belief — businesses deserve a partner who
            executes, not just advises
          </p>
        </AnimatedSection>

        {/* Part 1: Our Story — Left/Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: Story Text */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Our Story
              </h3>
            </div>

            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed text-base">
                BizMeals was founded with a clear mission: to help startups,
                small businesses, and entrepreneurs build profitable,
                sustainable companies. We&apos;re not a traditional agency that
                hands you a strategy deck and walks away. We&apos;re your
                Business Growth Execution Partner — we strategize, execute, and
                scale alongside you.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                Based in Bangalore, we&apos;ve built a network of 30+ expert
                partners across digital marketing, BPO, consultancy, and event
                management. Every project we take on gets the combined expertise
                of specialists who&apos;ve been there and done that.
              </p>
            </div>

            {/* Decorative quote */}
            <div className="mt-8 glass-card rounded-xl p-4 inline-flex items-center gap-3 animated-border">
              <div className="w-2 h-2 rounded-full gradient-orange flex-shrink-0" />
              <span className="text-sm text-foreground/80">
                Execution over advice. Results over reports.
              </span>
            </div>
          </AnimatedSection>

          {/* Right: Key Stats */}
          <div className="space-y-4">
            {keyStats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Part 2: Mission + Vision — Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card rounded-2xl p-7 relative overflow-hidden group hover:border-biz-orange/30 transition-all duration-500"
          >
            {/* Orange accent glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-biz-orange/10 blur-[60px] group-hover:bg-biz-orange/15 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-0 left-0 w-1 h-full gradient-orange rounded-r-full" />

            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center shrink-0 shadow-lg shadow-biz-orange/20">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Our Mission
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize business growth expertise for every entrepreneur
                  and small business in India.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="glass-card rounded-2xl p-7 relative overflow-hidden group hover:border-biz-teal/30 transition-all duration-500"
          >
            {/* Teal accent glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-biz-teal/10 blur-[60px] group-hover:bg-biz-teal/15 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-0 left-0 w-1 h-full gradient-teal rounded-r-full" />

            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center shrink-0 shadow-lg shadow-biz-teal/20">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Our Vision
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  To become India&apos;s most trusted Business Growth Execution
                  Partner by 2030.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Part 3: Founders */}
        <div className="mb-20">
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-mixed flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Meet the Founders
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder, index) => (
              <FounderCard key={founder.name} founder={founder} index={index} />
            ))}
          </div>
        </div>

        {/* Part 4: What Makes Us Different */}
        <div>
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-fire flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                What Makes Us Different
              </h3>
            </div>
          </AnimatedSection>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {differentiators.map((item) => (
              <StaggerItem key={item.title}>
                <DifferentiatorCard
                  item={item}
                  index={differentiators.indexOf(item)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
