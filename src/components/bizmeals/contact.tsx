'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  FileText,
  Zap,
  ArrowRight,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { SectionBadge, StaggerContainer, StaggerItem } from '@/components/bizmeals/animated-section'

/* ──────────────────── Tilt Card Wrapper ──────────────────── */

function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * 8
    const rotateY = (x - 0.5) * 8
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

/* ──────────────────── Success Checkmark ──────────────────── */

function SuccessCheckmark() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div className="w-20 h-20 rounded-full gradient-teal flex items-center justify-center glow-teal">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-biz-teal"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
      <motion.h3
        className="text-2xl font-bold text-foreground mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Thank You!
      </motion.h3>
      <motion.p
        className="text-muted-foreground max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        We&apos;ll get back to you within 24 hours with your personalized
        growth plan.
      </motion.p>
      <motion.div
        className="mt-4 flex items-center gap-2 text-biz-teal text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Zap className="w-4 h-4" />
        Expect a response soon
      </motion.div>
    </motion.div>
  )
}

/* ──────────────────── Data ──────────────────── */

const quickContacts = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Chat',
    description: 'Get instant replies during business hours',
    accent: 'emerald' as const,
    iconBg: 'bg-biz-emerald/15',
    iconColor: 'text-biz-emerald',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    btnBorder: 'border-biz-emerald/40 text-biz-emerald hover:bg-biz-emerald/10',
    btnLabel: 'Open WhatsApp',
    href: 'https://wa.me/919876543210?text=Hi%20BizMeals%2C%20I%27m%20interested%20in%20your%20growth%20services',
    external: true,
  },
  {
    icon: Calendar,
    title: 'Book Strategy Call',
    description: 'Free 30-min consultation with our growth strategist',
    accent: 'teal' as const,
    iconBg: 'bg-biz-teal/15',
    iconColor: 'text-biz-teal',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]',
    btnBorder: 'border-biz-teal/40 text-biz-teal hover:bg-biz-teal/10',
    btnLabel: 'Schedule Call',
    href: '',
    external: false,
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team',
    accent: 'orange' as const,
    iconBg: 'bg-biz-orange/15',
    iconColor: 'text-biz-orange',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]',
    btnBorder: 'border-biz-orange/40 text-biz-orange hover:bg-biz-orange/10',
    btnLabel: 'Call Now',
    href: 'tel:+919876543210',
    external: false,
    phone: '+91 98765 43210',
    hours: 'Mon–Sat, 10 AM – 7 PM IST',
  },
]

const trustBadges = [
  { icon: ShieldCheck, text: 'No spam ever' },
  { icon: CheckCircle2, text: 'Free consultation' },
  { icon: FileText, text: 'No obligation' },
  { icon: Zap, text: '24hr response' },
]

const serviceOptions = [
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'business-growth', label: 'Business Growth' },
  { value: 'bpo-services', label: 'BPO Services' },
  { value: 'consultancy', label: 'Consultancy' },
  { value: 'event-management', label: 'Event Management' },
  { value: 'training', label: 'Training' },
  { value: 'other', label: 'Other' },
]

const budgetOptions = [
  { value: 'under-10k', label: 'Under ₹10K' },
  { value: '10k-25k', label: '₹10K–₹25K' },
  { value: '25k-50k', label: '₹25K–₹50K' },
  { value: '50k-1l', label: '₹50K–₹1L' },
  { value: '1l-plus', label: '₹1L+' },
]

/* ──────────────────── Component ──────────────────── */

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceInterest: '',
    budgetRange: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsSubmitted(true)
      } else {
        const data = await res.json()
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContact = useCallback(() => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const inputClasses = (field: string) =>
    `bg-background/50 border-border/50 transition-all duration-300 ${
      focusedField === field
        ? 'border-biz-orange/60 ring-2 ring-biz-orange/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
        : ''
    }`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-biz-teal/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-biz-orange/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionBadge variant="teal">
            <Globe className="w-3.5 h-3.5" />
            GET IN TOUCH
          </SectionBadge>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Let&apos;s Talk{' '}
            <span className="gradient-text">Growth</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to transform your business? Get a free growth plan customized
            for your needs.
          </p>
        </motion.div>

        {/* ── Three Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ═══ Column 1: Contact Form ═══ */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Animated border overlay */}
              <div className="animated-border absolute inset-0 pointer-events-none rounded-2xl" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <SuccessCheckmark key="success" />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Get Your Free Growth Plan
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Fill out the form and we&apos;ll craft a custom roadmap
                      for your business.
                    </p>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="fullName"
                        className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleChange('fullName', e.target.value)
                        }
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={inputClasses('fullName')}
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={inputClasses('email')}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange('phone', e.target.value)
                          }
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={inputClasses('phone')}
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="companyName"
                        className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
                      >
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Your company"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleChange('companyName', e.target.value)
                        }
                        onFocus={() => setFocusedField('companyName')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('companyName')}
                      />
                    </div>

                    {/* Service + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                          Service Interest
                        </Label>
                        <Select
                          value={formData.serviceInterest}
                          onValueChange={(value) =>
                            handleChange('serviceInterest', value)
                          }
                          onOpenChange={(open) =>
                            setFocusedField(open ? 'service' : null)
                          }
                        >
                          <SelectTrigger
                            className={`w-full bg-background/50 border-border/50 ${
                              focusedField === 'service'
                                ? 'border-biz-orange/60 ring-2 ring-biz-orange/20'
                                : ''
                            }`}
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                          Budget Range
                        </Label>
                        <Select
                          value={formData.budgetRange}
                          onValueChange={(value) =>
                            handleChange('budgetRange', value)
                          }
                          onOpenChange={(open) =>
                            setFocusedField(open ? 'budget' : null)
                          }
                        >
                          <SelectTrigger
                            className={`w-full bg-background/50 border-border/50 ${
                              focusedField === 'budget'
                                ? 'border-biz-orange/60 ring-2 ring-biz-orange/20'
                                : ''
                            }`}
                          >
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-muted-foreground text-xs font-medium uppercase tracking-wider"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your business goals..."
                        value={formData.message}
                        onChange={(e) =>
                          handleChange('message', e.target.value)
                        }
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className={`bg-background/50 border-border/50 resize-none transition-all duration-300 ${
                          focusedField === 'message'
                            ? 'border-biz-orange/60 ring-2 ring-biz-orange/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                            : ''
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-orange text-white font-bold py-4 h-auto rounded-xl hover:opacity-90 transition-all glow-orange text-base group"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          Get Free Growth Plan
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ═══ Column 2: Quick Contact Options ═══ */}
          <motion.div
            className="lg:col-span-4 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-1">
              Quick Contact
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Prefer a different way to reach us?
            </p>

            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {quickContacts.map((contact) => (
                <StaggerItem key={contact.title}>
                  <TiltCard>
                    <div
                      className={`glass-card rounded-2xl p-5 group cursor-pointer transition-shadow duration-300 ${contact.hoverGlow}`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`size-12 rounded-xl ${contact.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                        >
                          <contact.icon
                            className={`size-5 ${contact.iconColor}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1">
                            {contact.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {contact.description}
                          </p>

                          {contact.phone && (
                            <p className="text-biz-orange font-semibold text-sm mt-1">
                              <a
                                href={contact.href}
                                className="hover:underline"
                              >
                                {contact.phone}
                              </a>
                            </p>
                          )}
                          {contact.hours && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {contact.hours}
                            </p>
                          )}

                          <Button
                            variant="outline"
                            className={`mt-3 ${contact.btnBorder} text-sm h-9`}
                            asChild={contact.external}
                            onClick={
                              !contact.external && !contact.phone
                                ? scrollToContact
                                : undefined
                            }
                          >
                            {contact.external ? (
                              <a
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <contact.icon className="w-3.5 h-3.5 mr-1.5" />
                                {contact.btnLabel}
                              </a>
                            ) : contact.phone ? (
                              <a href={contact.href}>
                                <Phone className="w-3.5 h-3.5 mr-1.5" />
                                {contact.btnLabel}
                              </a>
                            ) : (
                              <span>
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                {contact.btnLabel}
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>

          {/* ═══ Column 3: Office Info + Trust Badges ═══ */}
          <motion.div
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-1">
              Our Office
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Visit us or reach out anytime
            </p>

            {/* Office Details Card */}
            <div className="glass-card rounded-2xl p-5 space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-biz-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-biz-orange" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                    Address
                  </p>
                  <p className="text-sm text-foreground/90">
                    BizMeals HQ, Koramangala,
                  </p>
                  <p className="text-sm text-foreground/90">
                    Bangalore 560034
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-biz-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-biz-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:hello@bizmeals.in"
                    className="text-sm text-foreground/90 hover:text-biz-teal transition-colors"
                  >
                    hello@bizmeals.in
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-biz-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-biz-amber" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                    Hours
                  </p>
                  <p className="text-sm text-foreground/90">
                    Mon–Sat, 10 AM – 7 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 gradient-mixed opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center justify-center py-10 text-center">
                <motion.div
                  className="w-14 h-14 rounded-full gradient-orange flex items-center justify-center mb-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <p className="font-bold text-foreground text-sm">
                  Bangalore, India
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Koramangala Hub
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-muted-foreground text-xs bg-background/30 rounded-lg px-3 py-2.5 border border-border/20"
                >
                  <badge.icon className="w-3.5 h-3.5 text-biz-teal shrink-0" />
                  <span className="leading-tight">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
