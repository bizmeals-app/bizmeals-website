'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Clock,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Monitor,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Rocket,
  BarChart3,
  Search,
  Megaphone,
  TrendingUp,
  Lightbulb,
  UserCheck,
  FileCheck,
  MapPin,
  IndianRupee,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AnimatedSection, {
  AnimatedCard,
  SectionBadge,
  StaggerContainer,
  StaggerItem,
} from './animated-section'

const courses = [
  {
    title: 'Digital Marketing Mastery',
    duration: '12 weeks',
    mode: 'Online + Offline',
    modeIcon: Monitor,
    curriculum: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing', 'Analytics'],
    curriculumIcons: [Search, Megaphone, BarChart3, BookOpen, TrendingUp],
    outcome: 'Ready to run campaigns independently or get hired as a digital marketer',
    includes: ['Live projects', '1-on-1 mentoring', 'Certification'],
    badge: 'Popular' as const,
    accentColor: 'orange' as const,
    gradientClass: 'gradient-orange',
    iconBg: 'bg-biz-orange/10',
    iconColor: 'text-biz-orange',
    borderAccent: 'border-biz-orange/30',
  },
  {
    title: 'Business Growth Strategy',
    duration: '8 weeks',
    mode: 'Online',
    modeIcon: BookOpen,
    curriculum: ['Market Analysis', 'Growth Frameworks', 'Revenue Optimization', 'Competitive Strategy'],
    curriculumIcons: [Search, TrendingUp, IndianRupee, BarChart3],
    outcome: 'Ability to create and execute a complete growth strategy for any business',
    includes: ['Case studies', 'Strategy templates', 'Group workshops'],
    badge: 'New' as const,
    accentColor: 'teal' as const,
    gradientClass: 'gradient-teal',
    iconBg: 'bg-biz-teal/10',
    iconColor: 'text-biz-teal',
    borderAccent: 'border-biz-teal/30',
  },
  {
    title: 'Startup Launchpad',
    duration: '6 weeks',
    mode: 'Online + Offline',
    modeIcon: Briefcase,
    curriculum: ['Idea Validation', 'MVP Building', 'GTM Strategy', 'Fundraising Basics'],
    curriculumIcons: [Lightbulb, Rocket, Megaphone, IndianRupee],
    outcome: 'Launch-ready with a validated business model and go-to-market plan',
    includes: ['Pitch deck review', 'Founder mentoring', 'Networking access'],
    badge: null,
    accentColor: 'orange' as const,
    gradientClass: 'gradient-orange',
    iconBg: 'bg-biz-orange/10',
    iconColor: 'text-biz-orange',
    borderAccent: 'border-biz-orange/30',
  },
  {
    title: 'HR & Operations Fundamentals',
    duration: '6 weeks',
    mode: 'Online',
    modeIcon: Users,
    curriculum: ['Recruitment Strategy', 'Process Design', 'Compliance', 'Team Building'],
    curriculumIcons: [UserCheck, FileCheck, FileCheck, Users],
    outcome: 'Handle HR and operations for growing businesses confidently',
    includes: ['Templates', 'Real-world projects', 'Certification'],
    badge: null,
    accentColor: 'teal' as const,
    gradientClass: 'gradient-teal',
    iconBg: 'bg-biz-teal/10',
    iconColor: 'text-biz-teal',
    borderAccent: 'border-biz-teal/30',
  },
]

export default function Training() {
  return (
    <AnimatedSection id="training" className="py-20 md:py-28 relative">
      {/* dot-pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.15] pointer-events-none" />

      {/* Background decorations */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-biz-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-biz-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <SectionBadge variant="teal">ACADEMY</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Training Programs</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn from practitioners, not just theorists.
          </motion.p>
        </div>

        {/* ===== Course Cards — 2x2 Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20 md:mb-28">
          {courses.map((course, index) => {
            const ModeIcon = course.modeIcon
            return (
              <AnimatedCard key={course.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass-card rounded-2xl h-full flex flex-col relative overflow-hidden tilt-card shimmer group"
                >
                  {/* Gradient top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${course.gradientClass}`} />

                  {/* Hover glow background */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      course.accentColor === 'orange'
                        ? 'bg-gradient-to-b from-biz-orange/5 to-transparent'
                        : 'bg-gradient-to-b from-biz-teal/5 to-transparent'
                    }`}
                  />

                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    {/* Badge */}
                    {course.badge && (
                      <div className="absolute top-5 right-5">
                        <Badge
                          className={`border-0 text-xs font-semibold ${
                            course.badge === 'Popular'
                              ? 'gradient-orange text-white'
                              : 'gradient-teal text-white'
                          }`}
                        >
                          {course.badge === 'Popular' && (
                            <Sparkles className="w-3 h-3 mr-1" />
                          )}
                          {course.badge === 'New' && (
                            <Zap className="w-3 h-3 mr-1" />
                          )}
                          {course.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${course.gradientClass} flex items-center justify-center`}
                        >
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold pr-16">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mb-5">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className={`w-3.5 h-3.5 ${course.iconColor}`} />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <ModeIcon className={`w-3.5 h-3.5 ${course.iconColor}`} />
                        {course.mode}
                      </div>
                    </div>

                    {/* Curriculum tags as pills */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Curriculum
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.curriculum.map((item, i) => {
                          const TagIcon = course.curriculumIcons[i]
                          return (
                            <span
                              key={item}
                              className={`text-xs px-2.5 py-1 rounded-full ${course.iconBg} ${course.iconColor} border ${course.borderAccent} font-medium flex items-center gap-1`}
                            >
                              {TagIcon && <TagIcon className="w-3 h-3" />}
                              {item}
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    {/* Outcome in highlighted box */}
                    <div
                      className={`mb-5 p-3 rounded-xl ${
                        course.accentColor === 'orange'
                          ? 'bg-biz-orange/5 border border-biz-orange/15'
                          : 'bg-biz-teal/5 border border-biz-teal/15'
                      }`}
                    >
                      <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-semibold">
                          Outcome:
                        </span>{' '}
                        {course.outcome}
                      </p>
                    </div>

                    {/* Includes with checkmarks */}
                    <div className="mb-6 flex-1">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Includes
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {course.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${course.iconColor}`}
                            />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Button
                      className={`w-full ${
                        course.accentColor === 'orange'
                          ? 'bg-secondary text-foreground hover:bg-biz-orange/10 hover:text-biz-orange border border-border/30 hover:border-biz-orange/30 transition-colors duration-300'
                          : 'bg-secondary text-foreground hover:bg-biz-teal/10 hover:text-biz-teal border border-border/30 hover:border-biz-teal/30 transition-colors duration-300'
                      }`}
                      onClick={() =>
                        document
                          .getElementById('contact')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatedCard>
            )
          })}
        </div>

        {/* ===== Internship Program — LARGE Featured Card ===== */}
        <AnimatedCard className="mb-20 md:mb-28">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Gradient teal background wash */}
            <div className="absolute inset-0 gradient-teal opacity-[0.06] pointer-events-none" />

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-biz-teal/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-biz-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-biz-teal/3 rounded-full blur-[80px] pointer-events-none" />

            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 gradient-teal" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl gradient-teal flex items-center justify-center shadow-lg shadow-biz-teal/20">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        BizMeals Internship Program
                      </h3>
                      <p className="text-biz-teal font-medium text-sm mt-0.5">
                        Real experience. Real growth.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl text-lg">
                    3-month intensive internship with real client projects. Get
                    mentored by industry experts and build a portfolio that
                    stands out.
                  </p>

                  {/* Program details */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-foreground">
                      <div className="w-8 h-8 rounded-lg bg-biz-teal/10 border border-biz-teal/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-biz-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-semibold">3 months</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <div className="w-8 h-8 rounded-lg bg-biz-orange/10 border border-biz-orange/20 flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-biz-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Stipend</p>
                        <p className="text-sm font-semibold">Performance-based</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <div className="w-8 h-8 rounded-lg bg-biz-teal/10 border border-biz-teal/20 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-biz-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-semibold">Bangalore / Remote</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <Button
                    size="lg"
                    className="gradient-teal text-white border-0 hover:opacity-90 px-10 py-6 text-base font-semibold shadow-lg shadow-biz-teal/20"
                    onClick={() =>
                      document
                        .getElementById('contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    Apply for Internship
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* ===== Enrollment CTA — Dramatic Section ===== */}
        <AnimatedCard>
          <div className="animated-border rounded-3xl">
            <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              {/* Background glows */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-biz-orange/5 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-biz-teal/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-biz-amber/3 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="w-20 h-20 rounded-2xl gradient-orange mx-auto mb-8 flex items-center justify-center shadow-lg shadow-biz-orange/20"
                >
                  <GraduationCap className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to skill up?
                </h3>
                <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10">
                  Join{' '}
                  <span className="text-foreground font-bold text-xl md:text-2xl gradient-text">
                    200+ professionals
                  </span>{' '}
                  who&apos;ve transformed their careers with BizMeals Training
                </p>

                <Button
                  size="lg"
                  className="gradient-orange text-white border-0 hover:opacity-90 px-12 py-7 text-lg font-semibold glow-orange shadow-lg shadow-biz-orange/20 hover:shadow-biz-orange/30 transition-shadow duration-300"
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </AnimatedSection>
  )
}
