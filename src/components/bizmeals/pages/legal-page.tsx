'use client'

import { motion } from 'framer-motion'
import { Home, ChevronRight, FileText, ShieldCheck, ScrollText, RotateCcw, Cookie, AlertTriangle } from 'lucide-react'
import { usePage, type PageName } from '@/components/bizmeals/page-context'
import { Button } from '@/components/ui/button'

/* Legal pages available for cross-linking in the sidebar */
export const legalPages: { slug: PageName; label: string; icon: React.ElementType; blurb: string }[] = [
  { slug: 'privacy-policy', label: 'Privacy Policy', icon: ShieldCheck, blurb: 'How we collect, use & protect your data' },
  { slug: 'terms-of-service', label: 'Terms & Conditions', icon: ScrollText, blurb: 'The rules of using BizMeals services' },
  { slug: 'refund-policy', label: 'Refund & Cancellation', icon: RotateCcw, blurb: 'Cancellations, refunds & billing' },
  { slug: 'cookie-policy', label: 'Cookie Policy', icon: Cookie, blurb: 'How cookies are used on this site' },
  { slug: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle, blurb: 'Limitations & warranties of our services' },
]

export interface LegalSection {
  id: string
  heading: string
  body: React.ReactNode
}

interface LegalPageProps {
  /** current page slug — used to highlight sidebar item + breadcrumb */
  slug: PageName
  /** badge label shown in the navy hero, e.g. "Legal" */
  badge?: string
  /** hero title */
  title: string
  /** short hero subtitle */
  subtitle?: string
  /** last updated date string, e.g. "1 January 2026" */
  lastUpdated: string
  /** intro paragraph shown before the sections */
  intro?: React.ReactNode
  /** structured content sections */
  sections: LegalSection[]
}

export default function LegalPage({
  slug,
  badge = 'Legal',
  title,
  subtitle,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  const { setCurrentPage } = usePage()
  const currentLegal = legalPages.find((p) => p.slug === slug)

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          HERO — navy banner, consistent with every other page
         ────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
      >
        {/* Decorative blurs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/10 blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-xs mb-6"
          >
            <button
              onClick={() => setCurrentPage('home')}
              className="text-white/60 hover:text-[#F5A623] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3 h-3" />
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white font-semibold">{currentLegal?.label ?? title}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6"
          >
            <FileText className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">{badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Last updated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="text-[11px] text-white/50 mt-5 uppercase tracking-[0.15em] font-semibold"
          >
            Last Updated: {lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          BODY — sidebar + content
         ────────────────────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar — other legal pages + on-this-page */}
            <aside className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 flex flex-col gap-6">
                {/* Other legal documents */}
                <div className="bg-white rounded-2xl border border-[#E5E9F0] p-4 shadow-sm">
                  <h3 className="text-[10px] font-bold text-[#0F2557] uppercase tracking-[0.15em] mb-3 px-1">
                    Legal Documents
                  </h3>
                  <nav className="flex flex-col gap-1" aria-label="Legal documents">
                    {legalPages.map((p) => {
                      const Icon = p.icon
                      const active = p.slug === slug
                      return (
                        <button
                          key={p.slug}
                          onClick={() => setCurrentPage(p.slug)}
                          className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer group ${
                            active
                              ? 'bg-[#0F2557] text-white shadow-md shadow-[#0F2557]/15'
                              : 'hover:bg-[#EEF2FA] text-[#5A6478]'
                          }`}
                          aria-current={active ? 'page' : undefined}
                        >
                          <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-[#F5A623]' : 'text-[#0F2557]/60 group-hover:text-[#0F2557]'}`} />
                          <span className="flex flex-col">
                            <span className="text-xs font-bold leading-tight">{p.label}</span>
                            <span className={`text-[10px] leading-tight mt-0.5 ${active ? 'text-white/70' : 'text-[#5A6478]/70'}`}>
                              {p.blurb}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* On this page */}
                <div className="bg-white rounded-2xl border border-[#E5E9F0] p-4 shadow-sm">
                  <h3 className="text-[10px] font-bold text-[#0F2557] uppercase tracking-[0.15em] mb-3 px-1">
                    On This Page
                  </h3>
                  <nav className="flex flex-col gap-0.5 max-h-72 overflow-y-auto pr-1" aria-label="Table of contents">
                    {sections.map((s, i) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="text-[11px] text-[#5A6478] hover:text-[#F5A623] transition-colors py-1.5 px-2 rounded-md hover:bg-[#EEF2FA] flex items-start gap-2 leading-snug"
                      >
                        <span className="text-[#0F2557]/40 font-bold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <span>{s.heading}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-[#E5E9F0] p-6 sm:p-8 lg:p-10 shadow-sm legal-prose"
              >
                {/* Intro */}
                {intro && (
                  <div className="mb-8 pb-6 border-b border-[#E5E9F0]">
                    <div className="text-[15px] text-[#3A4256] leading-relaxed">{intro}</div>
                  </div>
                )}

                {/* Sections */}
                <div className="flex flex-col gap-9">
                  {sections.map((section, i) => (
                    <section key={section.id} id={section.id} className="scroll-mt-24">
                      <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-extrabold text-[#0F2557] mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F2557] text-[#F5A623] text-xs font-black shrink-0">
                          {i + 1}
                        </span>
                        {section.heading}
                      </h2>
                      <div className="text-[14.5px] text-[#3A4256] leading-[1.75] pl-10">{section.body}</div>
                    </section>
                  ))}
                </div>

                {/* Help CTA */}
                <div className="mt-10 pt-8 border-t border-[#E5E9F0]">
                  <div className="rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
                    style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-white mb-1">Questions about this policy?</h3>
                      <p className="text-[12px] sm:text-[13px] text-white/70 leading-relaxed">
                        Our team is happy to clarify anything in this document. Reach out and we&apos;ll respond within one business day.
                      </p>
                    </div>
                    <Button
                      onClick={() => setCurrentPage('contact')}
                      className="btn-cta border-0 font-bold text-xs px-5 py-2.5 h-auto shrink-0 cursor-pointer"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Reusable building blocks for legal page bodies ── */
export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 mb-4 flex flex-col gap-2 marker:text-[#F5A623]">{children}</ul>
}

export function OL({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-5 mb-4 flex flex-col gap-2 marker:text-[#F5A623] marker:font-bold">{children}</ol>
}

export function LI({ children }: { children: React.ReactNode }) {
  return <li className="leading-[1.7] pl-1">{children}</li>
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-[#0F2557]">{children}</strong>
}

export function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  const styles =
    type === 'warning'
      ? 'bg-[#F5A623]/10 border-[#F5A623]/30 text-[#7A5A12]'
      : 'bg-[#0F2557]/5 border-[#0F2557]/15 text-[#0F2557]'
  return (
    <div className={`my-4 rounded-xl border px-4 py-3.5 text-[13px] leading-relaxed ${styles}`}>
      {children}
    </div>
  )
}
