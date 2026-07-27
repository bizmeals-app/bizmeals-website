'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Mail, MapPin, Phone, Award } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'
import { usePage, type PageName } from './page-context'
import { siteConfig } from '@/lib/site-config'
import Logo from './logo'

const footerLinks: Record<string, { label: string; page: PageName }[]> = {
  Services: [
    { label: 'Digital Marketing', page: 'services' },
    { label: 'BPO Services', page: 'services' },
    { label: 'Consultancy', page: 'services' },
    { label: 'Event Management', page: 'services' },
    { label: 'Website Development', page: 'portfolio' },
  ],
  Company: [
    { label: 'About Us', page: 'about' },
    { label: 'Our Founder', page: 'founder' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Careers', page: 'career' },
  ],
  Resources: [
    { label: 'Training Programs', page: 'training' },
    { label: 'Blog & Insights', page: 'blog' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Free Consultation', page: 'contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', page: 'privacy-policy' },
    { label: 'Terms & Conditions', page: 'terms-of-service' },
    { label: 'Refund Policy', page: 'refund-policy' },
    { label: 'Cookie Policy', page: 'cookie-policy' },
    { label: 'Disclaimer', page: 'disclaimer' },
  ],
}

/* Social links — only real BizMeals-branded profiles */
const socialLinks = [
  {
    name: 'Facebook',
    href: siteConfig.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: siteConfig.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: siteConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { setCurrentPage } = usePage()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const navigateTo = useCallback((page: PageName) => {
    setCurrentPage(page)
  }, [setCurrentPage])

  return (
    <footer className="relative bg-[#0F2557] text-white overflow-hidden">
      {/* Top amber accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F5A623] via-[#E0941A] to-[#F5A623]" />

      {/* Subtle background glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] rounded-full bg-[#1E3A8A]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-[#F5A623]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo size="md" variant="light" />
            <p className="text-[11px] text-white/70 mt-1.5 font-semibold uppercase tracking-[0.15em]">
              Business Growth Execution Partner
            </p>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm mt-4 mb-5">
              A Business Growth Execution Partner powered by a network of experts.
              We handle Strategy, Execution, and Project Management to build &amp; scale
              your business.
            </p>

            {/* Trust badge — consistent 12+ years */}
            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/25 max-w-fit">
              <Award className="w-4 h-4 text-[#F5A623]" />
              <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-wider">
                {siteConfig.stats.yearsInBusiness}+ Years Experience
              </span>
            </div>

            {/* Contact Info — consistent with site-config */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-[12px] text-white/80 group">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-white/80 group">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-white/80 group">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Follow Us — only real BizMeals-branded profiles */}
            <div className="mt-5">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.12em] block mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-[#0F2557] hover:bg-[#F5A623] hover:border-[#F5A623] transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: colIndex * 0.1 }}
            >
              <h4 className="text-[11px] font-bold text-white mb-5 uppercase tracking-[0.12em]">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-[12px] text-white/70 hover:text-[#F5A623] transition-colors text-left group flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/0 group-hover:bg-[#F5A623] transition-all duration-300 group-hover:scale-150" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-white/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/60">
              &copy; {new Date().getFullYear()} BizMeals. All rights reserved.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                onClick={() => navigateTo('privacy-policy')}
                className="text-[11px] text-white/60 hover:text-[#F5A623] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => navigateTo('terms-of-service')}
                className="text-[11px] text-white/60 hover:text-[#F5A623] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => navigateTo('refund-policy')}
                className="text-[11px] text-white/60 hover:text-[#F5A623] transition-colors cursor-pointer"
              >
                Refund Policy
              </button>
              <span className="text-white/20">|</span>
              <span className="text-[11px] text-white/50">
                Headquartered in Bangalore, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full btn-cta flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-[#1A1A1A]" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
