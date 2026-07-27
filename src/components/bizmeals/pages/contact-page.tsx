'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Search,
  CalendarCheck,
  Route,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Home,
  Sparkles,
  MessageCircle,
  User,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { usePage } from '@/components/bizmeals/page-context'

/* ───────────────────────── animation variants ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

/* ───────────────────────── data ───────────────────────── */

const contactInfoCards = [
  {
    icon: MapPin,
    title: 'Location',
    detail: '3rd Street, Bangalore, Karnataka, India',
    sub: '24/7 Service Available',
    gradient: 'from-biz-orange to-biz-amber',
    iconBg: 'bg-biz-purple/10',
    iconColor: 'text-biz-purple',
    glowColor: 'rgba(249,115,22,0.15)',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'info@bizmeals.in',
    sub: 'We respond within 24 hours',
    gradient: 'from-biz-teal to-biz-cyan',
    iconBg: 'bg-biz-teal/10',
    iconColor: 'text-biz-teal',
    glowColor: 'rgba(20,184,166,0.15)',
  },
  {
    icon: Phone,
    title: 'Phone',
    detail: '+91 8217330484',
    sub: 'Mon–Fri: 9am–6pm IST',
    gradient: 'from-biz-amber to-biz-orange',
    iconBg: 'bg-biz-amber/10',
    iconColor: 'text-biz-amber',
    glowColor: 'rgba(245,158,11,0.15)',
  },
]

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/bizmeals' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bizmeals' },
  { icon: Twitter, label: 'Twitter/X', href: 'https://twitter.com/bizmeals' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/bizmeals' },
]

const processSteps = [
  {
    number: '01',
    icon: Search,
    title: 'We Review Your Request',
    description: 'Our team analyzes your needs within 24 hours',
    gradient: 'from-biz-orange to-biz-amber',
    glowColor: 'rgba(249,115,22,0.2)',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Free Strategy Call',
    description: 'We schedule a call to understand your goals and challenges',
    gradient: 'from-biz-teal to-biz-cyan',
    glowColor: 'rgba(20,184,166,0.2)',
  },
  {
    number: '03',
    icon: Route,
    title: 'Custom Growth Plan',
    description: 'You receive a tailored growth roadmap — no strings attached',
    gradient: 'from-biz-amber to-biz-orange',
    glowColor: 'rgba(245,158,11,0.2)',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   CONTACT PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function ContactPage() {
  const { setCurrentPage } = usePage()
  const { toast } = useToast()

  /* ─── Form state ─── */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    comments: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  /* ─── Section refs ─── */
  const formSectionRef = useRef<HTMLDivElement>(null)
  const formSectionInView = useInView(formSectionRef, { once: true, margin: '-80px' })

  const processRef = useRef<HTMLDivElement>(null)
  const processInView = useInView(processRef, { once: true, margin: '-80px' })

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInView = useInView(mapRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  /* ─── Form handlers ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.comments) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' })
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.comments,
        }),
      })
      if (res.ok) {
        toast({ title: "Message sent! We'll get back to you within 24 hours." })
        setFormData({ firstName: '', lastName: '', email: '', subject: '', comments: '' })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        toast({ title: 'Something went wrong. Please try again.', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Network error. Please try again.', variant: 'destructive' })
    }
    setIsSubmitting(false)
  }

  /* ═══════════════════════════════════════════════════════
     1. PAGE HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
    >
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>
      {/* Grid overlay */}
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
          <span className="text-white font-semibold">Contact</span>
        </motion.nav>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Get In Touch</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5"
        >
          <span className="block text-white">Let&apos;s Build Something</span>
          <span className="block text-[#F5A623] mt-1.5">Great Together</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Your growth journey starts with a conversation.
        </motion.p>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. CONTACT FORM + INFO
     ═══════════════════════════════════════════════════════ */

  const renderFormAndInfo = () => (
    <section ref={formSectionRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-services pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ─── Left Column: Contact Form ─── */}
          <motion.div
            initial="hidden"
            animate={formSectionInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-3"
          >
            <motion.div variants={fadeUp} className="glass-card rounded-2xl overflow-hidden relative">
              {/* Gradient top border */}
              <div className="h-1 w-full gradient-mixed" />

              <div className="p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground mb-6 sm:mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {/* Success state */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl bg-biz-teal/10 border border-biz-teal/20 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-biz-teal shrink-0" />
                    <p className="text-xs sm:text-sm text-biz-teal font-medium">
                      Thank you! Your message has been sent successfully. We&apos;ll be in touch soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name + Last Name */}
                  <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs font-medium text-foreground/80">
                        First Name <span className="text-biz-purple">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-background/50 border-border/50 focus-visible:border-biz-orange/50 focus-visible:ring-biz-orange/20 h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs font-medium text-foreground/80">
                        Last Name <span className="text-biz-purple">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-background/50 border-border/50 focus-visible:border-biz-orange/50 focus-visible:ring-biz-orange/20 h-11"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Email Address */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-medium text-foreground/80">
                      Email Address <span className="text-biz-purple">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-border/50 focus-visible:border-biz-orange/50 focus-visible:ring-biz-orange/20 h-11"
                      required
                    />
                  </motion.div>

                  {/* Subject */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <Label htmlFor="subject" className="text-xs font-medium text-foreground/80">
                      Subject <span className="text-biz-purple">*</span>
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-background/50 border-border/50 focus-visible:border-biz-orange/50 focus-visible:ring-biz-orange/20 h-11"
                      required
                    />
                  </motion.div>

                  {/* Comments / Questions */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <Label htmlFor="comments" className="text-xs font-medium text-foreground/80">
                      Comments / Questions <span className="text-biz-purple">*</span>
                    </Label>
                    <Textarea
                      id="comments"
                      placeholder="Tell us about your project, goals, or how we can help..."
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="bg-background/50 border-border/50 focus-visible:border-biz-orange/50 focus-visible:ring-biz-orange/20 min-h-[120px] resize-none"
                      required
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto gradient-purple glow-purple text-white font-semibold px-6 sm:px-8 py-4 text-sm rounded-xl h-auto shadow-lg hover:shadow-xl hover:shadow-biz-purple/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right Column: Contact Info ─── */}
          <motion.div
            initial="hidden"
            animate={formSectionInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            {/* Info cards */}
            {contactInfoCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={scaleIn}
                custom={i}
                className="glass-card rounded-2xl p-5 sm:p-6 card-hover group relative overflow-hidden"
              >
                {/* Subtle hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(300px circle at 50% 50%, ${card.glowColor}, transparent 50%)`,
                  }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">{card.title}</h3>
                    <p className="text-[11px] sm:text-xs text-foreground/90 font-medium">{card.detail}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{card.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick Connect */}
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4">Quick Connect</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="glass-card w-10 h-10 rounded-xl flex items-center justify-center hover:bg-biz-purple/10 hover:border-biz-orange/30 transition-all duration-300 hover:scale-110 group/social"
                  >
                    <social.icon className="w-4 h-4 text-muted-foreground group-hover/social:text-biz-purple transition-colors duration-300" />
                  </a>
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-3">Follow us for growth tips & updates</p>
            </motion.div>

            {/* WhatsApp Quick Connect */}
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-5 sm:p-6">
              <a
                href="https://wa.me/918217330484"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/whatsapp hover:opacity-90 transition-opacity"
              >
                <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-500/10 flex items-center justify-center group-hover/whatsapp:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">WhatsApp Us</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Quick chat with our team</p>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover/whatsapp:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. WHAT HAPPENS NEXT
     ═══════════════════════════════════════════════════════ */

  const renderProcess = () => (
    <section ref={processRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-dark pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            <Route className="w-3.5 h-3.5 text-biz-teal" />
            <span className="text-[10px] tracking-[0.18em] font-semibold uppercase text-muted-foreground">The Process</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold">
            What Happens <span className="gradient-text-teal">Next?</span>
          </motion.h2>
        </motion.div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <motion.div
          initial="hidden"
          animate={processInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-1/2 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-biz-orange/30 via-biz-teal/30 to-biz-amber/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={scaleIn}
                custom={i}
                className="glass-card rounded-2xl p-5 sm:p-6 text-center card-hover group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(350px circle at 50% 50%, ${step.glowColor}, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Step number */}
                  <span className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground/50 mb-3 block">
                    STEP {step.number}
                  </span>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${step.gradient} mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. MAP / LOCATION SECTION
     ═══════════════════════════════════════════════════════ */

  const renderLocation = () => (
    <section ref={mapRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden section-glow">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={mapInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="glass-card-strong rounded-2xl overflow-hidden relative">
            {/* Decorative gradient elements instead of map */}
            <div className="relative h-[240px] sm:h-[320px] overflow-hidden">
              {/* Abstract map background */}
              <div className="absolute inset-0 bg-background/80" />
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="absolute inset-0 dot-pattern opacity-20" />

              {/* Decorative gradient blobs to represent geography */}
              <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-biz-purple/8 morph-blob blur-2xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/3 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full bg-biz-teal/6 morph-blob blur-2xl pointer-events-none" style={{ animationDelay: '-4s' }} />
              <div className="absolute top-1/2 right-1/4 w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] rounded-full bg-biz-amber/5 morph-blob blur-2xl pointer-events-none" style={{ animationDelay: '-6s' }} />

              {/* Grid lines overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="text-biz-purple/30">
                  <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Center pin indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Pulse ring */}
                <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-biz-orange/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-biz-orange/30 bg-biz-purple/5" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-purple flex items-center justify-center shadow-lg glow-purple">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Location label */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card-strong rounded-xl px-5 py-3 text-center">
                <p className="font-bold text-foreground text-xs sm:text-sm">3rd Street, Bangalore</p>
                <p className="text-[10px] text-muted-foreground">12.9716° N, 77.5946° E</p>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="p-5 sm:p-6 border-t border-border/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                    Based in Bangalore, <span className="gradient-text">Serving Globally</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">
                    We work with businesses across India and internationally. Remote-first, results-driven.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] sm:text-xs text-muted-foreground shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-biz-teal animate-pulse" />
                    Available Now
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-biz-purple" />
                    IST (UTC+5:30)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. CTA SECTION
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section ref={ctaRef} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-20" />

      {/* Floating blobs */}
      <div className="absolute top-10 -left-20 w-[300px] h-[300px] rounded-full bg-biz-teal/8 morph-blob blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-20 w-[400px] h-[400px] rounded-full bg-biz-purple/6 morph-blob blur-3xl pointer-events-none" style={{ animationDelay: '-4s' }} />

      <motion.div
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6 sm:mb-8">
          <Phone className="w-3.5 h-3.5 text-biz-purple" />
          <span className="text-[10px] tracking-[0.18em] font-semibold uppercase text-muted-foreground">Prefer a Quick Chat?</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 leading-tight">
          Book a Free<br />
          <span className="gradient-text">15-Minute Strategy Call</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-[11px] sm:text-xs text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
          Skip the form and talk directly with a growth expert. No pitch, just value.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+918217330484"
            className="inline-flex items-center border border-biz-teal/30 text-biz-teal hover:bg-biz-teal/10 hover:border-biz-teal/50 font-semibold px-6 sm:px-8 py-4 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group backdrop-blur-sm bg-transparent"
          >
            <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            +91 8217330484
          </a>
          <a
            href="https://wa.me/918217330484"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50 font-semibold px-6 sm:px-8 py-4 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group backdrop-blur-sm bg-transparent"
          >
            <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            WhatsApp Us
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-muted-foreground/50">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-biz-teal/60" />
            <span className="text-[10px] font-medium">No obligation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-biz-teal/60" />
            <span className="text-[10px] font-medium">Free consultation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-biz-teal/60" />
            <span className="text-[10px] font-medium">Expert advice</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <>
      {renderHero()}
      {renderFormAndInfo()}
      {renderProcess()}
      {renderLocation()}
      {renderCTA()}
    </>
  )
}
