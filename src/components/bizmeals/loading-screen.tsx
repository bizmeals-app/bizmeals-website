'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Premium Loading Screen
 *
 * Shows on first page load — a dark navy canvas with the BizMeals logo
 * icon scaling in, the wordmark fading up, an animated progress bar,
 * and a smooth exit. Feels like a premium brand intro.
 *
 * Mounts once per session (sessionStorage guard so reloads during dev
 * don't constantly re-trigger, but a fresh tab always shows it).
 */
export default function LoadingScreen() {
  // Check session storage ONCE for initial state (no setState-in-effect)
  const alreadyLoaded = typeof window !== 'undefined' && sessionStorage.getItem('bizmeals-loaded') === 'true'
  const [isLoading, setIsLoading] = useState(!alreadyLoaded)
  const [progress, setProgress] = useState(alreadyLoaded ? 100 : 0)

  useEffect(() => {
    if (alreadyLoaded) return

    // Lock scroll while loading
    document.body.style.overflow = 'hidden'

    // Animate progress 0 → 100 over ~1.6s
    const start = Date.now()
    const duration = 1600
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        requestAnimationFrame(tick)
      } else {
        // Small pause, then fade out
        setTimeout(() => {
          setIsLoading(false)
          sessionStorage.setItem('bizmeals-loaded', 'true')
          document.body.style.overflow = ''
        }, 300)
      }
    }
    requestAnimationFrame(tick)

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
          aria-label="Loading BizMeals"
          role="status"
        >
          {/* ── Decorative background ── */}
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#F37021]/8 blur-[140px] pointer-events-none" />

          {/* ── Center logo lockup ── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Icon — scale + fade in with a subtle pulse */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Glow ring behind icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 0.8], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl bg-[#F37021]/30 blur-2xl"
              />
              <motion.img
                src="/logo-icon.png"
                alt="BizMeals"
                width={120}
                height={120}
                className="relative block"
                style={{ width: 120, height: 120, objectFit: 'contain' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                draggable={false}
              />
            </motion.div>

            {/* Wordmark — fade up after icon */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-4xl md:text-5xl font-black tracking-tight leading-none"
            >
              <span style={{ color: '#FFFFFF' }}>Biz</span>
              <span style={{ color: '#F37021' }}>Meals</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50"
            >
              Business Growth Partner
            </motion.p>

            {/* ── Progress bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 w-56 md:w-64"
            >
              <div className="h-1 w-full rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #F37021, #FF8C00)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom corner brand mark ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-white/30 tracking-wider"
          >
            © {new Date().getFullYear()} BizMeals
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
