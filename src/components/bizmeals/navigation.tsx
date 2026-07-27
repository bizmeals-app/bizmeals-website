'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage, type PageName } from './page-context'
import Logo from './logo'

const navItems: { label: string; page: PageName }[] = [
  { label: 'Home', page: 'home' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Services', page: 'services' },
  { label: 'Portfolio', page: 'portfolio' },
  { label: 'Innovation Lab', page: 'innovation-lab' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'Training', page: 'training' },
  { label: 'Career', page: 'career' },
  { label: 'Blog', page: 'blog' },
  { label: 'About', page: 'about' },
  { label: 'Founder', page: 'founder' },
  { label: 'Contact', page: 'contact' },
]

const primaryNavItems = navItems.filter(i =>
  ['home', 'how-it-works', 'services', 'portfolio', 'training', 'about', 'contact'].includes(i.page)
)
const moreNavItems = navItems.filter(i => !primaryNavItems.includes(i))

export default function Navigation() {
  const { currentPage, setCurrentPage } = usePage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const lastScrollY = useRef(0)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setIsScrolled(y > 50)
        if (y > 200) {
          if (y > lastScrollY.current + 8) setIsHidden(true)
          else if (y < lastScrollY.current - 8) setIsHidden(false)
        } else {
          setIsHidden(false)
        }
        lastScrollY.current = y
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsMobileOpen(false); setShowMore(false) }
    }
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setShowMore(false)
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('mousedown', handleClick)
    return () => { window.removeEventListener('keydown', handleKey); window.removeEventListener('mousedown', handleClick) }
  }, [])

  const navigate = (page: PageName) => {
    setCurrentPage(page)
    setIsMobileOpen(false)
    setShowMore(false)
  }

  const isActive = (page: PageName) => currentPage === page
  const isMoreActive = moreNavItems.some(i => i.page === currentPage)

  return (
    <>
      <ScrollProgress />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-[#E5E9F0] shadow-sm shadow-[#0F2557]/5'
            : 'bg-white/60 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => navigate('home')}
              className="flex items-center group shrink-0 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="BizMeals — Home"
            >
              <Logo size="md" />
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5 bg-[#EEF2FA] rounded-full px-1 py-1 border border-[#E5E9F0]">
              {primaryNavItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`relative px-3 xl:px-3.5 py-1.5 text-[12px] font-semibold transition-colors rounded-full cursor-pointer ${
                    isActive(item.page)
                      ? 'text-white'
                      : 'text-[#5A6478] hover:text-[#0F2557]'
                  }`}
                >
                  {isActive(item.page) && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
              {/* More dropdown */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`relative px-3 py-1.5 text-[12px] font-semibold transition-colors rounded-full cursor-pointer flex items-center gap-0.5 ${
                    isMoreActive ? 'text-white' : 'text-[#5A6478] hover:text-[#0F2557]'
                  }`}
                >
                  {isMoreActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">More</span>
                  <ChevronDown className={`w-3 h-3 relative z-10 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-[#E5E9F0] py-1.5 min-w-[170px] shadow-xl shadow-[#0F2557]/10"
                    >
                      {moreNavItems.map((item) => (
                        <button
                          key={item.page}
                          onClick={() => navigate(item.page)}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                            isActive(item.page)
                              ? 'text-[#0F2557] bg-[#EEF2FA]'
                              : 'text-[#5A6478] hover:text-[#0F2557] hover:bg-[#F5F7FA]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop CTA — amber accent button */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Button
                size="sm"
                onClick={() => navigate('contact')}
                className="btn-cta border-0 hover:opacity-95 transition-opacity cursor-pointer font-bold text-xs px-5 py-2.5 h-auto"
              >
                Get Free Growth Plan
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#EEF2FA] transition-colors relative z-50 cursor-pointer text-[#0F2557]"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[#0F2557]/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white overflow-y-auto shadow-2xl"
            >
              <div className="p-5 pt-18 border-b border-[#E5E9F0]">
                <Logo size="sm" />
                <p className="text-[10px] text-[#5A6478] mt-2 tracking-wide font-semibold">
                  Not an Agency. A Growth Partner.
                </p>
              </div>
              <div className="p-3">
                <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
                  {navItems.map((item, i) => {
                    const active = isActive(item.page)
                    return (
                      <motion.button
                        key={item.page}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 + i * 0.03, duration: 0.25 }}
                        onClick={() => navigate(item.page)}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          active
                            ? 'text-white shadow-md shadow-[#0F2557]/20'
                            : 'text-[#5A6478] hover:text-[#0F2557] hover:bg-[#EEF2FA]'
                        }`}
                        style={active ? { background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' } : undefined}
                      >
                        {item.label}
                        {active && <ArrowRight className="w-3.5 h-3.5" />}
                      </motion.button>
                    )
                  })}
                </nav>
                <div className="mt-4 pt-4 border-t border-[#E5E9F0]">
                  <Button
                    className="w-full btn-cta border-0 py-5 text-sm font-bold cursor-pointer h-auto"
                    onClick={() => navigate('contact')}
                  >
                    Get Free Growth Plan
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Scroll Progress ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  )
}
