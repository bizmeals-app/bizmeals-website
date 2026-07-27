'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Plane,
  LayoutDashboard,
  ShieldCheck,
  Car,
  Building2,
  FlaskConical,
} from 'lucide-react'
import AnimatedSection, { SectionBadge } from '@/components/bizmeals/animated-section'

/* ─── Innovation Projects Data ─── */
const projects = [
  {
    title: 'Drone Delivery Network',
    icon: Plane,
    description:
      'Last-mile delivery revolution using autonomous drone technology for faster, cheaper logistics.',
    status: 'In Development',
    accent: 'orange' as const,
    gradientClass: 'from-biz-orange to-biz-amber',
    iconBg: 'gradient-orange',
    statusBg: 'bg-biz-orange/10',
    statusText: 'text-biz-orange',
    statusBorder: 'border-biz-orange/20',
    borderAccent: 'border-biz-orange/30',
    hoverBorder: 'hover:border-biz-orange/40',
    glowColor: 'bg-biz-orange/8',
    animatedBorderColors: '#f97316, #f59e0b, #f97316',
  },
  {
    title: 'DashSeva',
    icon: LayoutDashboard,
    description:
      'An integrated dashboard for small businesses to manage everything from one place — billing, inventory, customers.',
    status: 'Beta Testing',
    accent: 'teal' as const,
    gradientClass: 'from-biz-teal to-biz-cyan',
    iconBg: 'gradient-teal',
    statusBg: 'bg-biz-teal/10',
    statusText: 'text-biz-teal',
    statusBorder: 'border-biz-teal/20',
    borderAccent: 'border-biz-teal/30',
    hoverBorder: 'hover:border-biz-teal/40',
    glowColor: 'bg-biz-teal/8',
    animatedBorderColors: '#14b8a6, #06b6d4, #14b8a6',
  },
  {
    title: 'Food Safety Platform',
    icon: ShieldCheck,
    description:
      'AI-powered food safety monitoring and compliance platform for restaurants and food businesses.',
    status: 'Research Phase',
    accent: 'emerald' as const,
    gradientClass: 'from-biz-emerald to-biz-teal',
    iconBg: 'gradient-mixed',
    statusBg: 'bg-biz-amber/10',
    statusText: 'text-biz-amber',
    statusBorder: 'border-biz-amber/20',
    borderAccent: 'border-biz-emerald/30',
    hoverBorder: 'hover:border-biz-emerald/40',
    glowColor: 'bg-biz-emerald/8',
    animatedBorderColors: '#10b981, #14b8a6, #10b981',
  },
  {
    title: 'Vehicle Safety System',
    icon: Car,
    description:
      'IoT-based vehicle safety monitoring with real-time alerts, driver behavior analysis, and predictive maintenance.',
    status: 'Concept',
    accent: 'amber' as const,
    gradientClass: 'from-biz-amber to-biz-orange',
    iconBg: 'gradient-orange',
    statusBg: 'bg-secondary/50',
    statusText: 'text-muted-foreground',
    statusBorder: 'border-border/40',
    borderAccent: 'border-biz-amber/30',
    hoverBorder: 'hover:border-biz-amber/40',
    glowColor: 'bg-biz-amber/8',
    animatedBorderColors: '#f59e0b, #f97316, #f59e0b',
  },
  {
    title: 'StayEg',
    icon: Building2,
    description:
      'Smart accommodation platform connecting travelers with verified stays, powered by AI matching and local experiences.',
    status: 'Planning',
    accent: 'rose' as const,
    gradientClass: 'from-biz-rose to-biz-orange',
    iconBg: 'gradient-fire',
    statusBg: 'bg-biz-rose/10',
    statusText: 'text-biz-rose',
    statusBorder: 'border-biz-rose/20',
    borderAccent: 'border-biz-rose/30',
    hoverBorder: 'hover:border-biz-rose/40',
    glowColor: 'bg-biz-rose/8',
    animatedBorderColors: '#f43f5e, #f97316, #f43f5e',
  },
]

/* ─── Innovation Card ─── */
function InnovationCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const Icon = project.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -5 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 40, rotateY: -5 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="snap-center flex-shrink-0 w-[280px] md:w-[300px]"
    >
      <motion.div
        whileHover={{
          rotateY: 3,
          rotateX: -2,
          scale: 1.03,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      >
        <div
          className={`glass-card rounded-2xl overflow-hidden group relative h-[400px] md:h-[420px] flex flex-col ${project.hoverBorder} transition-all duration-500`}
        >
          {/* Animated gradient border at top */}
          <div className="relative h-[3px] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${project.animatedBorderColors})`,
                animation: 'gradient-rotate-border 3s linear infinite',
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          {/* Background glow */}
          <div
            className={`absolute -top-20 -right-20 w-48 h-48 rounded-full ${project.glowColor} blur-[80px] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none`}
          />

          {/* Dot pattern overlay */}
          <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

          <div className="relative z-10 p-6 flex flex-col flex-1">
            {/* Icon in gradient circle */}
            <div className="mb-6">
              <div
                className={`w-16 h-16 rounded-2xl ${project.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Status badge at bottom */}
            <div className="mt-6">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${project.statusBg} ${project.statusText} ${project.statusBorder}`}
              >
                <span className="w-1.5 h-1.5 rounded-full mr-2 bg-current animate-pulse" />
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function Innovation() {
  return (
    <section
      id="innovation"
      className="py-20 md:py-28 relative overflow-hidden section-glow"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-[0.04]" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-biz-teal/5 blur-[120px] morph-blob pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-biz-cyan/5 blur-[100px] morph-blob float-animation pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <SectionBadge variant="teal">
            <FlaskConical className="w-3.5 h-3.5 mr-1" />
            INNOVATION LAB
          </SectionBadge>
          <h2 className="text-4xl md:text-6xl font-black mt-5 mb-4">
            Building the{' '}
            <span className="gradient-text-teal">Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re not just serving businesses today — we&apos;re building
            tomorrow&apos;s solutions
          </p>
        </AnimatedSection>

        {/* Scrollable Cards Row */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <div className="flex gap-5 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {projects.map((project, index) => (
              <InnovationCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-6 md:hidden"
        >
          <span className="text-xs text-muted-foreground/60">
            ← Swipe to explore →
          </span>
        </motion.div>
      </div>

      {/* Inline keyframes for gradient border animation */}
      <style jsx>{`
        @keyframes gradient-rotate-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  )
}
