'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Sparkles,
  ChevronDown,
  Zap,
  Users,
  Building2,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedNumber, SectionBadge } from '@/components/bizmeals/animated-section'
import { useCallback, useEffect, useRef, useState } from 'react'

/* ─── Stats Data ───────────────────────────────────────────────── */
const stats = [
  {
    value: 50,
    prefix: '',
    suffix: '+',
    label: 'Projects Delivered',
    icon: Zap,
  },
  {
    value: 30,
    prefix: '',
    suffix: '+',
    label: 'Expert Partners',
    icon: Users,
  },
  {
    value: 6,
    prefix: '',
    suffix: '+',
    label: 'Industries Served',
    icon: Building2,
  },
  {
    value: 2,
    prefix: '₹',
    suffix: 'Cr+',
    label: 'Revenue Generated',
    icon: TrendingUp,
  },
]

/* ─── Magnetic Button ──────────────────────────────────────────── */
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15
      setPosition({ x, y })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── MorphBlobs — large morphing gradient blobs ───────────────── */
function MorphBlobs() {
  return (
    <>
      {/* Orange blob — top left */}
      <motion.div
        className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] morph-blob opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #f97316, #f59e0b)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Teal blob — bottom right */}
      <motion.div
        className="absolute -bottom-[5%] -right-[5%] w-[500px] h-[500px] morph-blob opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mixed blob — center */}
      <motion.div
        className="absolute top-[30%] left-[40%] w-[400px] h-[400px] morph-blob opacity-10 blur-[90px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #f97316, #14b8a6)',
        }}
        animate={{
          scale: [1, 1.25, 0.95, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Small amber accent — top right */}
      <motion.div
        className="absolute top-[10%] right-[15%] w-[250px] h-[250px] morph-blob opacity-[0.08] blur-[70px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
        }}
        animate={{
          y: [0, -30, 20, 0],
          x: [0, 20, -10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

/* ─── AnimatedGridPattern — subtle grid with pulsing opacity ───── */
function AnimatedGridPattern() {
  return (
    <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─── Floating Orbs with parallax ──────────────────────────────── */
function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Orange orb — left */}
      <motion.div
        style={{ y: y1, x: x1 }}
        className="absolute top-[20%] left-[8%] w-[200px] h-[200px] rounded-full opacity-20 blur-[60px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, #f97316 0%, transparent 70%)',
          }}
        />
      </motion.div>
      {/* Teal orb — right */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] right-[10%] w-[180px] h-[180px] rounded-full opacity-15 blur-[50px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
          }}
        />
      </motion.div>
      {/* Amber orb — bottom center */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[25%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  )
}

/* ─── Hero Component ───────────────────────────────────────────── */
export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Strategy + Execution + Expert Network'
  const typingIndex = useRef(0)
  const [typingComplete, setTypingComplete] = useState(false)

  // Typing animation — starts after 1.2s delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (typingIndex.current <= fullText.length) {
          setTypedText(fullText.slice(0, typingIndex.current))
          typingIndex.current++
        } else {
          clearInterval(interval)
          setTypingComplete(true)
        }
      }, 55)
      return () => clearInterval(interval)
    }, 1200)
    return () => clearTimeout(timeout)
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToNext = useCallback(() => {
    // Scroll to the next section after hero
    const servicesSection = document.getElementById('services')
    servicesSection?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient-hero"
    >
      {/* Noise overlay — grain texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Animated grid pattern */}
      <AnimatedGridPattern />

      {/* Morphing blobs */}
      <MorphBlobs />

      {/* Floating gradient orbs with parallax */}
      <FloatingOrbs />

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Floating badge — "Not an Agency. A Growth Partner." */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-card glow-orange text-sm font-semibold tracking-wide"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4 text-biz-orange" />
            <span className="text-foreground">
              Not an Agency. A Growth Partner.
            </span>
            <Sparkles className="w-4 h-4 text-biz-amber" />
          </motion.div>
        </motion.div>

        {/* ─── Main Headline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight">
            <span className="block text-foreground">
              We Don&apos;t Just Market Businesses.
            </span>
            <span className="block gradient-text mt-2">
              We Build &amp; Scale Them.
            </span>
          </h1>
        </motion.div>

        {/* ─── Subtitle with typing animation ─── */}
        <motion.div
          className="mt-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            <span>{typedText}</span>
            {!typingComplete && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-biz-orange ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            )}
            {typingComplete && <span className="typing-cursor" />}
          </p>
        </motion.div>

        {/* ─── CTA Buttons with magnetic hover ─── */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <MagneticButton>
            <Button
              size="lg"
              className="gradient-orange text-white border-0 hover:opacity-90 transition-all px-10 py-7 text-base font-bold glow-orange rounded-xl group cursor-pointer"
              onClick={scrollToContact}
            >
              Get Free Growth Plan
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-7 text-base font-bold border-border hover:border-biz-orange/50 hover:bg-biz-orange/5 hover:text-biz-orange transition-all rounded-xl group cursor-pointer"
              onClick={scrollToContact}
            >
              <Calendar className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              Book Strategy Call
            </Button>
          </MagneticButton>
        </motion.div>

        {/* ─── Animated Stats Bar ─── */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass-card shimmer rounded-xl p-5 text-center relative overflow-hidden group card-hover"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-biz-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <Icon className="w-5 h-5 text-biz-orange mx-auto mb-2 opacity-60" />
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text">
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* ─── Bottom gradient fade for smooth section transition ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[3]" />
    </section>
  )
}
