'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Sparkles, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, useCallback, useEffect, useState } from 'react'
import { SectionBadge, AnimatedNumber } from './animated-section'

// Sparkle particle component
function Sparkle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Star
        className="text-biz-amber"
        style={{ width: size, height: size }}
      />
    </motion.div>
  )
}

// Floating particles around CTA area
function ParticleField() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 6 + Math.random() * 12,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <Sparkle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}
    </div>
  )
}

// Animated morph blobs for background
function CTAMorphBlobs() {
  return (
    <>
      {/* Large orange blob - top left */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] w-[700px] h-[700px] morph-blob opacity-20 blur-[140px] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)' }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Large teal blob - bottom right */}
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] morph-blob opacity-15 blur-[120px] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mixed center blob */}
      <motion.div
        className="absolute top-[30%] left-[35%] w-[500px] h-[500px] morph-blob opacity-10 blur-[100px] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #f97316, #14b8a6)' }}
        animate={{
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Amber accent blob */}
      <motion.div
        className="absolute top-[15%] right-[20%] w-[300px] h-[300px] morph-blob opacity-[0.08] blur-[80px] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
        animate={{
          y: [0, -35, 25, 0],
          x: [0, 25, -15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

// Magnetic button wrapper
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    setPosition({ x, y })
  }, [])

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

export default function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden mesh-gradient-hero section-divider-wave"
    >
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Animated morph blobs */}
      <CTAMorphBlobs />

      {/* Sparkle particles */}
      <ParticleField />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.15] pointer-events-none z-[1]" />

      {/* Main content - full width, centered text */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Badge with pulse-glow */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <SectionBadge variant="orange">
              <Zap className="w-3.5 h-3.5" />
              We Accept 5 New Partners Per Month
            </SectionBadge>
            <motion.div
              className="mt-2 mx-auto w-24 h-1 rounded-full gradient-orange pulse-glow"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* HUGE headline */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Ready to{' '}
            <span className="gradient-text">Build &amp; Scale</span>
            <br />
            Your Business?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get a free growth plan tailored to your business. No obligations, no spam — just a clear roadmap to your next revenue milestone.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <MagneticButton>
              <Button
                size="lg"
                className="gradient-orange text-white border-0 hover:opacity-90 transition-all px-12 py-7 text-lg font-bold glow-orange rounded-xl group"
                onClick={scrollToContact}
              >
                Get Free Growth Plan
                <ArrowRight className="w-5 h-5 ml-2.5 transition-transform group-hover:translate-x-1.5" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                className="px-12 py-7 text-lg font-bold border-border hover:border-biz-orange/50 hover:bg-biz-orange/5 hover:text-biz-orange transition-all rounded-xl group"
                onClick={scrollToContact}
              >
                <Phone className="w-5 h-5 mr-2.5 transition-transform group-hover:scale-110" />
                Book Strategy Call
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-10 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex -space-x-2">
              {[
                'from-biz-orange to-biz-amber',
                'from-biz-teal to-biz-cyan',
                'from-biz-amber to-biz-orange',
                'from-biz-emerald to-biz-teal',
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-background flex items-center justify-center`}
                >
                  <span className="text-[10px] font-bold text-white">
                    {['AK', 'RS', 'NP', 'DM'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                Join <span className="gradient-text"><AnimatedNumber value={50} suffix="+" duration={2} /></span> businesses
              </p>
              <p className="text-xs text-muted-foreground">that chose execution over excuses</p>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            className="mt-16 w-32 h-px bg-gradient-to-r from-transparent via-biz-orange/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
      </div>
    </section>
  )
}
