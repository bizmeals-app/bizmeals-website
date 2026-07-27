'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedSection, { SectionBadge } from './animated-section'

const testimonials = [
  {
    name: 'Vikram M.',
    role: 'CEO, Manufacturing Company',
    quote:
      "BizMeals didn't just run our ads — they transformed how we think about growth. In 6 months, our digital revenue went from zero to ₹45 lakhs. That's not marketing. That's a business transformation.",
    rating: 5,
    accent: 'orange' as const,
  },
  {
    name: 'Sneha K.',
    role: 'Founder, EdTech Startup',
    quote:
      "We were burning cash on agencies with nothing to show. BizMeals came in with a clear plan, executed it, and we had our first 50 paying customers in 3 months. They're not vendors. They're partners.",
    rating: 5,
    accent: 'teal' as const,
  },
  {
    name: 'Arjun R.',
    role: 'Director, HR Consultancy',
    quote:
      'The BizMeals model just makes sense. They brought in the right experts for each task instead of a one-size-fits-all team. Our inbound leads increased 120% in 4 months.',
    rating: 5,
    accent: 'orange' as const,
  },
  {
    name: 'Meera S.',
    role: 'Co-founder, D2C Brand',
    quote:
      "As a bootstrapped brand, every rupee matters. BizMeals understood that and delivered 2.8x ROAS when we were barely breaking even before. They fight for your growth like it's their own.",
    rating: 4,
    accent: 'teal' as const,
  },
  {
    name: 'Rajesh P.',
    role: 'Owner, Retail Chain',
    quote:
      "We didn't even know what digital marketing could do for a local retail business. BizMeals showed us — 200+ online orders a month and a 4.8 Google rating. Our foot traffic also went up 25%.",
    rating: 5,
    accent: 'orange' as const,
  },
  {
    name: 'Anita D.',
    role: 'Solo Entrepreneur',
    quote:
      "I couldn't afford a full agency. BizMeals' starter plan gave me professional growth support at a price I could manage. My business grew 3x in revenue in just 5 months.",
    rating: 4,
    accent: 'teal' as const,
  },
]

function StarRating({ rating, accent }: { rating: number; accent: 'orange' | 'teal' }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-5 ${
            i < rating
              ? accent === 'orange'
                ? 'fill-biz-amber text-biz-amber'
                : 'fill-biz-teal text-biz-teal'
              : 'fill-muted/30 text-muted/30'
          }`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [isPaused, goNext])

  const t = testimonials[current]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <AnimatedSection id="testimonials" className="py-20 md:py-28 relative mesh-gradient-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <SectionBadge variant="orange">TESTIMONIALS</SectionBadge>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mt-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">What Our Partners Say</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real results from real businesses. No fluff, no vanity metrics.
          </motion.p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl min-h-[340px] md:min-h-[380px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="glass-card-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                {/* Left border gradient */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl ${
                    t.accent === 'orange' ? 'gradient-orange' : 'gradient-teal'
                  }`}
                />

                {/* HUGE quotation mark watermark */}
                <Quote
                  className={`absolute -top-4 -right-2 md:top-2 md:right-6 size-32 md:size-44 opacity-[0.04] rotate-6 ${
                    t.accent === 'orange' ? 'text-biz-orange' : 'text-biz-teal'
                  }`}
                  strokeWidth={0.8}
                />

                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer pointer-events-none rounded-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="mb-6">
                    <StarRating rating={t.rating} accent={t.accent} />
                  </div>

                  {/* Quote text */}
                  <p className="text-lg md:text-xl italic leading-relaxed text-foreground/90 mb-8 max-w-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                        t.accent === 'orange'
                          ? 'gradient-orange text-white'
                          : 'gradient-teal text-white'
                      }`}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{t.name}</p>
                      <p className="text-muted-foreground text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>

                {/* Subtle glow */}
                <div
                  className={`absolute -bottom-20 -left-20 size-60 rounded-full blur-3xl pointer-events-none ${
                    t.accent === 'orange' ? 'bg-biz-orange/5' : 'bg-biz-teal/5'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full glass-card flex items-center justify-center border border-border/50 hover:border-biz-orange/40 transition-colors group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5 text-muted-foreground group-hover:text-biz-orange transition-colors" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full glass-card flex items-center justify-center border border-border/50 hover:border-biz-orange/40 transition-colors group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5 text-muted-foreground group-hover:text-biz-orange transition-colors" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-3 gradient-orange'
                  : 'w-3 h-3 bg-muted/40 hover:bg-muted/60'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Auto-rotate indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <motion.div
            className="size-1.5 rounded-full bg-biz-orange"
            animate={{ opacity: isPaused ? 0.3 : [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: isPaused ? 0 : Infinity, ease: 'easeInOut' }}
          />
          <span className="text-xs text-muted-foreground">
            {isPaused ? 'Paused — hover to pause auto-rotate' : 'Auto-rotating every 5s'}
          </span>
        </div>
      </div>
    </AnimatedSection>
  )
}
