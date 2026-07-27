'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light'
  className?: string
  showText?: boolean
}

/**
 * BizMeals Logo — client-approved icon image (logo-icon.png, tight-cropped to
 * the mark) paired with the "BizMeals" wordmark.
 *
 *   variant="default" (light bg / navbar): "Biz" black + "Meals" orange
 *   variant="light"    (dark bg / footer): "Biz" white + "Meals" orange
 *
 * The icon asset is tight-cropped to the visible mark (no transparent padding),
 * so the rendered height equals the visible mark height — giving a clean,
 * professional lockup where the icon leads the wordmark.
 */
export default function Logo({
  size = 'md',
  variant = 'default',
  className = '',
  showText = true,
}: LogoProps) {
  const isLight = variant === 'light'

  // Icon mark aspect ratio (width / height) of the cropped asset = 629 / 426
  const ICON_ASPECT = 629 / 426

  // `h` = visible mark height in px. Width is derived from the aspect ratio so
  // the mark never distorts and dimensions are known at SSR (no layout shift).
  // Text size is tuned so the icon leads the wordmark (icon ≈ 2.4–2.7× cap height).
  const sizes = {
    sm: { h: 26, text: 'text-base', nudge: 1 }, // mobile drawer
    md: { h: 32, text: 'text-lg', nudge: 1 },   // navbar
    lg: { h: 46, text: 'text-2xl', nudge: 2 },  // hero / footer
  } as const
  const { h, text, nudge } = sizes[size]
  const w = Math.round(h * ICON_ASPECT)

  // Brand colours
  const orange = '#F37021'
  const ink = isLight ? '#FFFFFF' : '#0F0F0F'

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {/* ── Icon mark — client-approved image, tight-cropped ── */}
      <img
        src="/logo-icon.png"
        alt="BizMeals"
        width={w}
        height={h}
        className="block shrink-0"
        style={{ height: h, width: w, objectFit: 'contain' }}
        draggable={false}
      />

      {/* ── Wordmark — "Biz" + "Meals" ── */}
      {showText && (
        <span
          className={`font-black tracking-tight leading-none ${text}`}
          style={{ transform: `translateY(${nudge}px)` }}
        >
          <span style={{ color: ink }}>Biz</span>
          <span style={{ color: orange }}>Meals</span>
        </span>
      )}
    </motion.span>
  )
}
