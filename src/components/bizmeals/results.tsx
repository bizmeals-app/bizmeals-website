'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Briefcase,
  TrendingUp,
  Heart,
  BarChart3,
  Star,
  IndianRupee,
  Flame,
} from 'lucide-react'
import AnimatedSection, {
  SectionBadge,
  StaggerContainer,
  StaggerItem,
  AnimatedNumber,
} from '@/components/bizmeals/animated-section'

/* ─── Metrics Data ─── */
const metrics = [
  {
    icon: Briefcase,
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
    gradientClass: 'gradient-text-fire',
  },
  {
    icon: TrendingUp,
    value: 2,
    prefix: '₹',
    suffix: 'Cr+',
    label: 'Revenue Generated',
    gradientClass: 'gradient-text-fire',
    altIcon: IndianRupee,
  },
  {
    icon: Heart,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    gradientClass: 'gradient-text-fire',
  },
  {
    icon: BarChart3,
    value: 3.5,
    suffix: 'x',
    label: 'Average ROI',
    gradientClass: 'gradient-text-fire',
    isDecimal: true,
  },
]

/* ─── Testimonials Data ─── */
const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechCorp India',
    text: "BizMeals didn't just run our ads — they became an extension of our team. Our lead generation increased 4x in 3 months.",
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Founder, FreshMart',
    text: 'From strategy to execution, BizMeals handled everything. We went from 0 to 10K customers in 6 months.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Director, BuildRight Realty',
    text: 'Their real estate consultancy is top-notch. Clear market insights that helped us make ₹50L+ in smart investments.',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'CEO, StyleHub',
    text: 'The BPO team at BizMeals reduced our operational costs by 60%. The quality of work exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Founder, DataNest',
    text: 'BizMeals organized our product launch event that generated 200+ leads. Professional, creative, and results-driven.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    role: 'COO, MedPro Health',
    text: 'Their digital marketing team understands healthcare. Our patient acquisition cost dropped 40% while volume doubled.',
    rating: 5,
  },
]

/* ─── Accent colors for alternating testimonial glow ─── */
const glowAccents = [
  { hoverBorder: 'hover:border-biz-orange/30', glowBg: 'bg-biz-orange/8', glowHover: 'group-hover:bg-biz-orange/12' },
  { hoverBorder: 'hover:border-biz-teal/30', glowBg: 'bg-biz-teal/8', glowHover: 'group-hover:bg-biz-teal/12' },
  { hoverBorder: 'hover:border-biz-orange/30', glowBg: 'bg-biz-orange/8', glowHover: 'group-hover:bg-biz-orange/12' },
  { hoverBorder: 'hover:border-biz-teal/30', glowBg: 'bg-biz-teal/8', glowHover: 'group-hover:bg-biz-teal/12' },
  { hoverBorder: 'hover:border-biz-orange/30', glowBg: 'bg-biz-orange/8', glowHover: 'group-hover:bg-biz-orange/12' },
  { hoverBorder: 'hover:border-biz-teal/30', glowBg: 'bg-biz-teal/8', glowHover: 'group-hover:bg-biz-teal/12' },
]

/* ─── Metric Card ─── */
function MetricCard({
  metric,
  index,
}: {
  metric: (typeof metrics)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = metric.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="glass-card rounded-2xl p-6 md:p-8 text-center card-hover relative overflow-hidden group">
        {/* Background glow */}
        <div className="absolute inset-0 bg-biz-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] gradient-fire z-20" />

        <div className="relative z-10">
          {/* Number */}
          <div className="mb-3">
            <span className={`text-4xl md:text-5xl font-black ${metric.gradientClass}`}>
              <AnimatedNumber
                value={metric.value}
                prefix={metric.prefix || ''}
                suffix={metric.suffix || ''}
                duration={2}
              />
            </span>
          </div>

          {/* Icon + Label */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Icon className="w-4 h-4 text-biz-orange" />
            <span className="text-sm font-medium">{metric.label}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Testimonial Card ─── */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const accent = glowAccents[index]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        className={`glass-card rounded-2xl p-6 card-hover relative overflow-hidden group ${accent.hoverBorder} transition-all duration-500`}
      >
        {/* Subtle glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${accent.glowBg} blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`}
        />

        {/* Background quote mark decoration */}
        <div className="absolute top-2 right-4 text-8xl font-serif text-foreground/[0.03] leading-none select-none pointer-events-none">
          &ldquo;
        </div>

        {/* Top gradient accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] z-20 ${
            index % 2 === 0 ? 'gradient-orange' : 'gradient-teal'
          }`}
        />

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-biz-amber fill-biz-amber"
              />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-sm text-foreground/90 italic leading-relaxed mb-5">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          {/* Separator bar */}
          <div className="h-[2px] w-10 rounded-full gradient-mixed mb-4" />

          {/* Name & Role */}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function Results() {
  return (
    <section
      id="results"
      className="py-20 md:py-28 relative overflow-hidden section-glow"
    >
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />

      {/* Decorative morph blobs */}
      <div className="absolute top-40 left-10 w-80 h-80 rounded-full bg-biz-orange/5 blur-[120px] morph-blob pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-biz-teal/5 blur-[100px] morph-blob float-animation pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionBadge variant="fire">
            <Flame className="w-3.5 h-3.5 mr-1" />
            PROVEN RESULTS
          </SectionBadge>
          <h2 className="text-4xl md:text-6xl font-black mt-5 mb-4">
            Numbers That{' '}
            <span className="gradient-text-fire">Speak</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real businesses we&apos;ve helped grow
          </p>
        </AnimatedSection>

        {/* Part 1: Big Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Part 2: Testimonials */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.08}
        >
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.name}>
              <TestimonialCard
                testimonial={testimonial}
                index={index}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
