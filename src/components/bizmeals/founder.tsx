'use client'

import { motion } from 'framer-motion'
import {
  Linkedin,
  Twitter,
  Quote,
  Briefcase,
  Award,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import AnimatedSection, { SectionBadge, StaggerContainer, StaggerItem } from './animated-section'

interface Founder {
  name: string
  initials: string
  title: string
  bio: string
  highlights: string[]
  skills: string[]
  quote: string
  gradient: string
  skillColor: string
  borderGradient: string
  glowClass: string
  accentColor: string
  iconBg: string
}

const founders: Founder[] = [
  {
    name: 'Rahul Sharma',
    initials: 'RS',
    title: 'Co-Founder & Growth Strategist',
    bio: "With 8+ years in digital marketing and business consulting, Rahul has helped 100+ businesses scale their revenue. Previously led marketing for a Series B startup, growing MRR from \u20B95L to \u20B950L in 18 months. He believes execution is the only strategy that matters.",
    highlights: [
      '8+ years in business growth & digital marketing',
      'Helped 100+ businesses across manufacturing, SaaS, and retail',
      'Former Head of Marketing at a Series B startup',
      'Specializes in growth strategy and performance marketing',
    ],
    skills: ['Growth Strategy', 'Digital Marketing', 'Performance Marketing', 'Business Consulting'],
    quote: "The best strategy is the one that gets executed. Everything else is just a PowerPoint.",
    gradient: 'from-orange-500 to-amber-500',
    skillColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    borderGradient: 'from-orange-500 via-amber-500 to-orange-500',
    glowClass: 'glow-orange',
    accentColor: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
  },
  {
    name: 'Priya Patel',
    initials: 'PP',
    title: 'Co-Founder & Operations Lead',
    bio: "Operations expert with 6+ years in HR consulting and project management. Priya has built and scaled teams for startups and SMEs across India. She brings structure to chaos and ensures every project delivers on time and on budget.",
    highlights: [
      '6+ years in HR consulting and operations management',
      'Scaled teams for 30+ startups and SMEs',
      'Built recruitment frameworks that reduced hiring time by 50%',
      'Specializes in operational excellence and team building',
    ],
    skills: ['Operations Management', 'HR Strategy', 'Project Management', 'Process Design'],
    quote: "Growth without structure is just chaos with a budget. Build the machine, then fuel it.",
    gradient: 'from-teal-500 to-cyan-500',
    skillColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    borderGradient: 'from-teal-500 via-cyan-500 to-teal-500',
    glowClass: 'glow-teal',
    accentColor: 'text-teal-400',
    iconBg: 'bg-teal-500/15',
  },
]

const highlightIcons = [Briefcase, Award, TrendingUp, Users]

export default function Founder() {
  return (
    <section id="founder" className="py-20 md:py-28 relative overflow-hidden">
      <div className="mesh-gradient-dark absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />

      {/* Decorative blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-orange-500/5 blur-[120px] morph-blob" />
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] morph-blob float-animation" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionBadge variant="teal">LEADERSHIP</SectionBadge>
          <h2 className="text-4xl md:text-6xl font-bold mt-5 mb-4">
            Meet the <span className="gradient-text">Founders</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The people behind BizMeals — combining decades of business growth expertise
          </p>
        </AnimatedSection>

        {/* Founder Cards - Side by Side */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.15}>
          {founders.map((founder) => (
            <StaggerItem key={founder.name}>
              <motion.div
                whileHover={{
                  rotateY: 1,
                  rotateX: -1,
                  scale: 1.01,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`glass-card rounded-3xl overflow-hidden group transition-all duration-500 hover:${founder.glowClass} relative`}
                style={{
                  borderLeft: `3px solid`,
                  borderImage: `linear-gradient(to bottom, var(--tw-gradient-stops)) 1`,
                }}
              >
                {/* Left gradient border via overlay */}
                <div className={`absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b ${founder.borderGradient}`} />

                <div className="p-7 md:p-9">
                  {/* Top: Large Avatar + Name/Title */}
                  <div className="flex flex-col sm:flex-row items-start gap-6 mb-7">
                    {/* LARGE gradient avatar area */}
                    <div className="shrink-0">
                      <div className={`w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${founder.gradient} flex items-center justify-center shadow-xl relative overflow-hidden`}>
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 dot-pattern opacity-15" />
                        <div className="absolute inset-0 shimmer" />
                        {/* HUGE initials */}
                        <span className="text-4xl md:text-5xl font-black text-white relative z-10">
                          {founder.initials}
                        </span>
                        {/* Decorative corner elements */}
                        <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-white/10 blur-xl" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        {founder.name}
                      </h3>
                      <p className={`text-base font-semibold ${founder.accentColor} mb-3`}>
                        {founder.title}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>
                  </div>

                  {/* Experience Highlights */}
                  <div className="mb-7">
                    <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Award className={`w-4 h-4 ${founder.accentColor}`} />
                      Experience
                    </h4>
                    <ul className="space-y-3">
                      {founder.highlights.map((highlight, idx) => {
                        const Icon = highlightIcons[idx] || Briefcase
                        return (
                          <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className={`mt-0.5 w-6 h-6 rounded-lg ${founder.iconBg} flex items-center justify-center shrink-0`}>
                              <Icon className={`w-3.5 h-3.5 ${founder.accentColor}`} />
                            </div>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Core Skills */}
                  <div className="mb-7">
                    <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className={`${founder.skillColor} border text-xs font-semibold px-3 py-1`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Thought Leadership Quote */}
                  <div className="relative glass-card rounded-xl p-6 overflow-hidden mb-7">
                    {/* Quote watermark */}
                    <div className="absolute top-1 right-3 opacity-[0.04]">
                      <Quote className="w-24 h-24 text-foreground" />
                    </div>
                    {/* Left accent bar */}
                    <div className={`absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b ${founder.gradient}`} />

                    <div className="relative">
                      <Quote className={`w-5 h-5 ${founder.accentColor} mb-3`} />
                      <p className="text-foreground/90 italic leading-relaxed text-base">
                        &ldquo;{founder.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground ${founder.accentColor} hover:${founder.iconBg} transition-all duration-200`}
                      aria-label={`${founder.name} LinkedIn`}
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="#"
                      className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground ${founder.accentColor} hover:${founder.iconBg} transition-all duration-200`}
                      aria-label={`${founder.name} Twitter`}
                    >
                      <Twitter className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>

                {/* Hover glow effect overlay */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  founder.gradient === 'from-orange-500 to-amber-500'
                    ? 'shadow-[inset_0_0_60px_rgba(249,115,22,0.06)]'
                    : 'shadow-[inset_0_0_60px_rgba(20,184,166,0.06)]'
                }`} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
