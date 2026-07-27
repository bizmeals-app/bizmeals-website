'use client'

import { motion } from 'framer-motion'
import {
  Drone,
  Truck,
  ShieldCheck,
  Car,
  Home,
  Rocket,
  Beaker,
  ArrowRight,
  Zap,
  Activity,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AnimatedSection, { SectionBadge, StaggerContainer, StaggerItem } from './animated-section'

type LucideIcon = React.ComponentType<{ className?: string }>

interface FutureProject {
  id: number
  name: string
  icon: LucideIcon
  problem: string
  solution: string
  workflowSteps: string[]
  futureVision: string
  status: 'Planning' | 'In Progress'
}

const futureProjects: FutureProject[] = [
  {
    id: 1,
    name: 'Drone Delivery System',
    icon: Drone,
    problem:
      'Last-mile delivery in congested Indian cities is slow, expensive, and unreliable.',
    solution:
      'Autonomous drone delivery network for urban areas, starting with medical supplies and urgent packages',
    workflowSteps: [
      'Order Placed',
      'Route Optimized',
      'Drone Dispatched',
      'GPS-Tracked Delivery',
      'Confirmation',
    ],
    futureVision:
      'City-wide drone delivery network reducing delivery times from hours to minutes',
    status: 'Planning',
  },
  {
    id: 2,
    name: 'DashSeva — Delivery Workforce Platform',
    icon: Truck,
    problem:
      'Delivery workers face inconsistent income, no benefits, and no career growth path.',
    solution:
      'A platform that connects, upskills, and empowers delivery workforce with fair pay, training, and benefits',
    workflowSteps: [
      'Worker Onboarding',
      'Skill Assessment',
      'Gig Matching',
      'Performance Tracking',
      'Career Progression',
    ],
    futureVision:
      "India's most trusted delivery workforce ecosystem with 100K+ empowered workers",
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Food Safety Device',
    icon: ShieldCheck,
    problem:
      'Food adulteration is rampant. Consumers have no way to verify food safety at point of purchase.',
    solution:
      'Portable IoT device that instantly detects common adulterants in food items',
    workflowSteps: [
      'Sample Collection',
      'Sensor Analysis',
      'AI-Powered Detection',
      'Safety Report',
      'Alert System',
    ],
    futureVision:
      'Every household equipped with food safety verification, making adulteration unprofitable',
    status: 'Planning',
  },
  {
    id: 4,
    name: 'Vehicle Safety Device',
    icon: Car,
    problem:
      'Road accidents claim 1.5L+ lives annually in India. Most are preventable with early warning.',
    solution:
      'Smart vehicle safety device with collision prediction, driver fatigue detection, and emergency response',
    workflowSteps: [
      'Sensor Monitoring',
      'Pattern Analysis',
      'Risk Assessment',
      'Alert Generation',
      'Emergency Response',
    ],
    futureVision:
      'Mandatory safety standard for all vehicles, reducing accident fatalities by 60%',
    status: 'Planning',
  },
  {
    id: 5,
    name: 'StayEg — PG / Co-living Platform',
    icon: Home,
    problem:
      'Finding reliable, affordable PG accommodation is a nightmare for students and young professionals.',
    solution:
      'Verified PG/co-living marketplace with virtual tours, real reviews, and digital rental agreements',
    workflowSteps: [
      'Property Verification',
      'Virtual Tour Creation',
      'Tenant Matching',
      'Digital Agreement',
      'Stay Management',
    ],
    futureVision:
      "India's largest verified co-living network with 50K+ properties across 20 cities",
    status: 'In Progress',
  },
]

function ProjectCard({ project }: { project: FutureProject }) {
  const Icon = project.icon
  const isInProgress = project.status === 'In Progress'
  const accentColor = isInProgress ? '#14b8a6' : '#f97316'
  const iconGradient = isInProgress ? 'gradient-teal' : 'gradient-orange'
  const glowClass = isInProgress ? 'hover:glow-teal' : 'hover:glow-orange'

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`glass-card rounded-2xl relative overflow-hidden group ${glowClass} transition-shadow duration-300`}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer pointer-events-none rounded-2xl z-0" />

        {/* LARGE gradient icon area */}
        <div className={`relative ${iconGradient} p-6 md:p-8 flex items-center gap-5`}>
          <div className="size-16 md:size-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Icon className="size-8 md:size-10 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.name}</h3>
            <Badge
              className={
                isInProgress
                  ? 'bg-white/15 text-white border-white/20 backdrop-blur-sm'
                  : 'bg-white/15 text-white border-white/20 backdrop-blur-sm'
              }
            >
              {isInProgress ? (
                <Activity className="size-3 mr-1" />
              ) : (
                <Zap className="size-3 mr-1" />
              )}
              {project.status}
            </Badge>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-white/5" />
          <div className="absolute -right-2 -bottom-4 size-16 rounded-full bg-white/5" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 relative z-10">
          {/* Problem / Solution side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Beaker className="size-4 text-destructive/70" />
                <span className="text-sm font-bold text-foreground">Problem</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
            <div
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: `${accentColor}08`,
                borderColor: `${accentColor}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="size-4" style={{ color: accentColor }} />
                <span className="text-sm font-bold text-foreground">Solution</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Workflow — Horizontal flow with numbered circles + lines */}
          <div className="mb-8">
            <span className="text-sm font-bold text-foreground mb-4 block">Workflow</span>
            <div className="flex items-start overflow-x-auto pb-2 gap-0">
              {project.workflowSteps.map((step, i) => (
                <div key={i} className="flex items-start shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="size-9 rounded-full flex items-center justify-center text-sm font-bold border-2"
                      style={{
                        borderColor: accentColor,
                        color: accentColor,
                        backgroundColor: `${accentColor}15`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[11px] text-muted-foreground text-center max-w-[80px] leading-tight">
                      {step}
                    </span>
                  </div>
                  {i < project.workflowSteps.length - 1 && (
                    <div className="flex items-center shrink-0 mt-4">
                      <div
                        className="w-6 md:w-10 h-0.5 mx-1"
                        style={{ backgroundColor: `${accentColor}30` }}
                      />
                      <ArrowRight
                        className="size-3 shrink-0"
                        style={{ color: `${accentColor}50` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Future Vision highlighted box */}
          <div
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentColor}12 0%, ${accentColor}05 100%)`,
              border: `1px solid ${accentColor}20`,
            }}
          >
            <div className="relative z-10 flex items-start gap-3">
              <ArrowRight
                className="size-4 mt-0.5 shrink-0"
                style={{ color: accentColor }}
              />
              <div>
                <span
                  className="text-sm font-bold block mb-1"
                  style={{ color: accentColor }}
                >
                  Future Vision
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.futureVision}
                </p>
              </div>
            </div>
            {/* Subtle glow inside vision box */}
            <div
              className="absolute -bottom-10 -right-10 size-32 rounded-full blur-2xl pointer-events-none"
              style={{ backgroundColor: `${accentColor}10` }}
            />
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  )
}

export default function FutureProjects() {
  return (
    <AnimatedSection id="future-projects" className="py-20 md:py-28 relative">
      {/* Section divider angle at top */}
      <div className="section-divider-angle" />

      {/* Background: dot-pattern overlay + morphing blob */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-20 right-10 size-72 rounded-full bg-biz-teal/5 blur-3xl morph-blob pointer-events-none" />
      <div className="absolute bottom-20 left-10 size-60 rounded-full bg-biz-orange/5 blur-3xl morph-blob pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <SectionBadge variant="teal">INNOVATION LAB</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Innovation Lab</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Visionary projects we&apos;re building for the future
          </motion.p>
        </div>

        {/* Project Cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" staggerDelay={0.1}>
          {futureProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </StaggerContainer>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="gradient-orange text-white border-0 hover:opacity-90 transition-opacity text-base px-8 py-6 rounded-xl shadow-lg shadow-biz-orange/20"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Partner With Us on Innovation
            <ArrowRight className="size-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
