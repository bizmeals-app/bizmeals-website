'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Megaphone,
  Headphones,
  TrendingUp,
  PartyPopper,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedSection, {
  AnimatedCard,
  SectionBadge,
  StaggerContainer,
  StaggerItem,
} from './animated-section'

/* ─── Service Data ─── */

const services = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: Megaphone,
    description:
      'Data-driven digital marketing with measurable ROI across every channel — we turn your marketing spend into a predictable growth engine.',
    subServices: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Performance Marketing'],
    outcome: '3-5x ROAS, 40% increase in qualified leads',
    accent: 'orange' as const,
    gradientClass: 'gradient-orange',
    gradientFromTo: 'from-biz-orange to-biz-amber',
    textColor: 'text-biz-orange',
    bgColor: 'bg-biz-orange/10',
    borderColor: 'border-biz-orange/20',
    pillBg: 'bg-biz-orange/8',
    pillBorder: 'border-biz-orange/15',
    pillText: 'text-biz-orange',
    glowColor: 'bg-biz-orange',
    iconSize: 'w-20 h-20',
    iconInner: 'w-10 h-10',
    colSpan: 'lg:col-span-2',
    featured: true,
  },
  {
    id: 'bpo',
    title: 'BPO Services',
    icon: Headphones,
    description:
      'Streamline operations with our expert BPO solutions. From customer support to back-office processing, we handle it all.',
    subServices: ['Customer Support', 'Data Entry', 'Back Office', 'Lead Generation', 'Technical Support'],
    outcome: '60% cost reduction, 99.5% accuracy rate',
    accent: 'teal' as const,
    gradientClass: 'gradient-teal',
    gradientFromTo: 'from-biz-teal to-biz-cyan',
    textColor: 'text-biz-teal',
    bgColor: 'bg-biz-teal/10',
    borderColor: 'border-biz-teal/20',
    pillBg: 'bg-biz-teal/8',
    pillBorder: 'border-biz-teal/15',
    pillText: 'text-biz-teal',
    glowColor: 'bg-biz-teal',
    iconSize: 'w-14 h-14',
    iconInner: 'w-7 h-7',
    colSpan: 'lg:col-span-1',
    featured: false,
  },
  {
    id: 'consultancy',
    title: 'Consultancy',
    icon: TrendingUp,
    description:
      'Expert guidance across Real Estate, Stock Market, and Coaching & Training domains. Strategic insights that drive results.',
    subServices: ['Real Estate Advisory', 'Stock Market Analysis', 'Business Coaching', 'Leadership Training'],
    outcome: 'Clear roadmap, defined KPIs, measurable growth',
    accent: 'amber' as const,
    gradientClass: 'from-biz-amber to-biz-orange',
    gradientFromTo: 'from-biz-amber to-biz-orange',
    textColor: 'text-biz-amber',
    bgColor: 'bg-biz-amber/10',
    borderColor: 'border-biz-amber/20',
    pillBg: 'bg-biz-amber/8',
    pillBorder: 'border-biz-amber/15',
    pillText: 'text-biz-amber',
    glowColor: 'bg-biz-amber',
    iconSize: 'w-14 h-14',
    iconInner: 'w-7 h-7',
    colSpan: 'lg:col-span-1',
    featured: false,
  },
  {
    id: 'event-management',
    title: 'Event Management',
    icon: PartyPopper,
    description:
      'From corporate events to brand launches, we create experiences that leave lasting impressions and drive business outcomes.',
    subServices: ['Corporate Events', 'Product Launches', 'Brand Activations', 'Conferences', 'Team Building'],
    outcome: '200+ events delivered, 98% client satisfaction',
    accent: 'rose' as const,
    gradientClass: 'from-biz-rose to-biz-orange',
    gradientFromTo: 'from-biz-rose to-biz-orange',
    textColor: 'text-biz-rose',
    bgColor: 'bg-biz-rose/10',
    borderColor: 'border-biz-rose/20',
    pillBg: 'bg-biz-rose/8',
    pillBorder: 'border-biz-rose/15',
    pillText: 'text-biz-rose',
    glowColor: 'bg-biz-rose',
    iconSize: 'w-14 h-14',
    iconInner: 'w-7 h-7',
    colSpan: 'lg:col-span-2',
    featured: false,
  },
]

/* ─── Featured Card (Digital Marketing) ─── */
function FeaturedCard({ service, delay = 0 }: { service: typeof services[number]; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={service.colSpan}
    >
      <div className="relative glass-card card-hover rounded-2xl overflow-hidden group h-full">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] gradient-orange z-20" />

        {/* Background glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-biz-orange/8 blur-[100px] pointer-events-none group-hover:bg-biz-orange/15 transition-colors duration-700" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-biz-amber/5 blur-[80px] pointer-events-none" />

        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none z-10" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left: Icon + Title */}
            <div className="flex flex-col gap-4">
              <div className={`${service.iconSize} rounded-2xl gradient-orange flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <Icon className={`${service.iconInner} text-white`} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Right: Description + Pills + Outcome */}
            <div className="space-y-6">
              {/* Description */}
              <p className="text-foreground font-medium leading-relaxed text-base">
                {service.description}
              </p>

              {/* Sub-services as pills */}
              <div>
                <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider mb-3 block">
                  What We Cover
                </span>
                <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.06}>
                  {service.subServices.map((sub) => (
                    <StaggerItem key={sub}>
                      <motion.span
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`inline-flex items-center px-4 py-2 rounded-xl ${service.pillBg} border ${service.pillBorder} text-sm font-medium text-foreground hover:border-biz-orange/30 hover:bg-biz-orange/12 transition-colors cursor-default`}
                      >
                        {sub}
                      </motion.span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Expected Outcome */}
              <div className="pt-5 border-t border-border/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400/80 uppercase tracking-wider">
                      Expected Outcome
                    </span>
                    <p className="text-sm text-foreground mt-1 font-semibold leading-relaxed">
                      {service.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Compact Service Card ─── */
function ServiceCard({
  service,
  delay = 0,
}: {
  service: typeof services[number]
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const Icon = service.icon
  const isEventManagement = service.id === 'event-management'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={service.colSpan}
    >
      <div className="relative glass-card card-hover rounded-2xl overflow-hidden group h-full">
        {/* Gradient top border */}
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradientFromTo} z-20`}
        />

        {/* Background glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${service.bgColor} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`}
        />

        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none z-10" />

        <div className="relative z-10 p-6 flex flex-col h-full">
          {isEventManagement ? (
            /* Event Management: horizontal layout with floating elements feel */
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Left: Icon + Title + Description */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`${service.iconSize} rounded-xl bg-gradient-to-br ${service.gradientFromTo} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <Icon className={`${service.iconInner} text-white`} />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-black text-foreground leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right: Sub-services + Outcome */}
              <div className="sm:w-1/2 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {service.subServices.map((sub, i) => (
                    <motion.span
                      key={sub}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg ${service.pillBg} border ${service.pillBorder} text-[11px] font-semibold ${service.pillText} cursor-default`}
                    >
                      {sub}
                    </motion.span>
                  ))}
                </div>

                {/* Outcome */}
                <div className="pt-4 border-t border-border/30">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider">
                        Expected Outcome
                      </span>
                      <p className="text-xs text-foreground mt-0.5 font-semibold leading-relaxed">
                        {service.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : service.id === 'consultancy' ? (
            /* Consultancy: vertical card with connecting line between items */
            <div className="space-y-5">
              {/* Icon + Title */}
              <div className="flex items-start gap-4">
                <div
                  className={`${service.iconSize} rounded-xl bg-gradient-to-br ${service.gradientFromTo} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <Icon className={`${service.iconInner} text-white`} />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-black text-foreground leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Sub-services with connecting line */}
              <div className="relative pl-4">
                {/* Vertical connecting line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-biz-amber/40 via-biz-orange/30 to-biz-amber/10" />
                <div className="space-y-2">
                  {service.subServices.map((sub, i) => (
                    <motion.div
                      key={sub}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-biz-amber/60 shrink-0" />
                      <span className={`text-xs font-medium ${service.pillText}`}>
                        {sub}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="pt-4 border-t border-border/30 mt-auto">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider">
                      Expected Outcome
                    </span>
                    <p className="text-xs text-foreground mt-0.5 font-semibold leading-relaxed">
                      {service.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BPO: icon + title + pills layout (compact) */
            <div className="space-y-5">
              {/* Icon + Title */}
              <div className="flex items-start gap-4">
                <div
                  className={`${service.iconSize} rounded-xl bg-gradient-to-br ${service.gradientFromTo} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <Icon className={`${service.iconInner} text-white`} />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-black text-foreground leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Sub-service pills */}
              <div>
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2 block">
                  Service Areas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.subServices.map((sub, i) => (
                    <motion.span
                      key={sub}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`inline-flex items-center px-3 py-1 rounded-lg ${service.pillBg} border ${service.pillBorder} text-[11px] font-semibold ${service.pillText} cursor-default`}
                    >
                      {sub}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div className="pt-4 border-t border-border/30 mt-auto">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider">
                      Expected Outcome
                    </span>
                    <p className="text-xs text-foreground mt-0.5 font-semibold leading-relaxed">
                      {service.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionBadge variant="teal">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            WHAT WE DO
          </SectionBadge>
          <h2 className="text-4xl md:text-6xl font-black mt-4 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end business growth solutions, not just marketing
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Row 1: Digital Marketing (2 cols) + BPO (1 col) */}
          <FeaturedCard service={services[0]} delay={0} />
          <ServiceCard service={services[1]} delay={0.1} />

          {/* Row 2: Consultancy (1 col) + Event Management (2 cols) */}
          <ServiceCard service={services[2]} delay={0.2} />
          <ServiceCard service={services[3]} delay={0.3} />
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center">
          <Button
            size="lg"
            className="gradient-orange text-white border-0 hover:opacity-90 transition-opacity text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-biz-orange/20 transition-shadow"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Discuss Your Needs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
