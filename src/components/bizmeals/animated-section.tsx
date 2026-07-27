'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
  amount?: 'some' | 'all' | number
  noPadding?: boolean
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
  once = true,
  amount = 'some',
  noPadding = false,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  }

  const { x, y } = directionMap[direction]

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  )
}

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.08 }: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax section wrapper
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
  speed?: number
}

export function ParallaxSection({ children, className = '', id, speed = 0.2 }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100])

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  )
}

// Scale-on-scroll wrapper
interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
}

export function ScaleOnScroll({ children, className = '' }: ScaleOnScrollProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

// Horizontal scroll text
interface HorizontalScrollTextProps {
  text: string
  className?: string
  speed?: number
  reverse?: boolean
}

export function HorizontalScrollText({ text, className = '', speed = 0.5, reverse = false }: HorizontalScrollTextProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-30 * speed * 100, 0] : [0, -30 * speed * 100]
  )

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className={`whitespace-nowrap ${className}`}>
        {text}
      </motion.div>
    </div>
  )
}

// Section badge component
interface SectionBadgeProps {
  children: ReactNode
  variant?: 'orange' | 'teal' | 'fire' | 'muted'
}

export function SectionBadge({ children, variant = 'orange' }: SectionBadgeProps) {
  const variants = {
    orange: 'bg-biz-orange/10 text-biz-orange border-biz-orange/20',
    teal: 'bg-biz-teal/10 text-biz-teal border-biz-teal/20',
    fire: 'bg-red-500/10 text-red-400 border-red-500/20',
    muted: 'bg-secondary/50 text-muted-foreground border-border',
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase ${variants[variant]}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

// Animated counter — renders the FINAL value immediately (static fallback),
// then animates from 0 → value on scroll-into-view. NEVER shows "0" on first paint.
interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  isDecimal?: boolean
}

function formatValue(value: number, isDecimal?: boolean): string {
  if (isDecimal) {
    return value.toFixed(1)
  }
  return value.toLocaleString()
}

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  isDecimal = false,
}: AnimatedNumberProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // STATIC FALLBACK: render the real final value immediately.
  // This is what shows on first paint / if JS is disabled / before scroll.
  const [display, setDisplay] = useState(prefix + formatValue(value, isDecimal) + suffix)

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()

    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? Number((eased * value).toFixed(1))
        : Math.round(eased * value)
      setDisplay(prefix + formatValue(current, isDecimal) + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value, prefix, suffix, duration, isDecimal])

  return <span ref={ref} className={className}>{display}</span>
}


