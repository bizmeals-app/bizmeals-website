'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  Home,
  ChevronRight,
  ChevronDown,
  Check,
  Sparkles,
  Rocket,
  Briefcase,
  Users,
  TrendingUp,
  Target,
  Award,
  Handshake,
  Building2,
  Laptop,
  Lightbulb,
  Quote,
  Star,
  GraduationCap,
  LineChart,
  Compass,
  CheckCircle2,
  Mail,
  Phone,
  UserCheck,
  Network,
  HandHeart,
  ArrowUpRight,
  Headphones,
  Megaphone,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'
import { siteConfig } from '@/lib/site-config'

/* ═════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/* ═════════════════════════════════════════════════════════════════════════
   DATA
   ═════════════════════════════════════════════════════════════════════════ */

interface CareerPath {
  icon: React.ElementType
  label: string
  title: string
  description: string
  outcome: string
}

const careerPaths: CareerPath[] = [
  {
    icon: Briefcase,
    label: 'Path 01',
    title: 'The Hired Professional',
    description:
      'You join a company as a digital marketer, developer, or specialist — but with the mindset of someone who builds their career, not just holds a job. You negotiate better, perform better, and grow faster.',
    outcome: 'Hired within 3 weeks of program completion',
  },
  {
    icon: Laptop,
    label: 'Path 02',
    title: 'The Freelancer',
    description:
      'You build a real freelance income — profile, portfolio, proposals, clients. Within 30-90 days you have your first paying clients and a repeatable system to keep earning on your own terms.',
    outcome: 'First paying client in 3 weeks',
  },
  {
    icon: Rocket,
    label: 'Path 03',
    title: 'The Founder',
    description:
      'You validate a real idea, build a manual MVP, acquire your first 10 paying customers, and pitch to a founder panel. You leave the program not with a business plan, but with a business.',
    outcome: 'First 100 customers in 60 days',
  },
]

interface Outcome {
  metric: string
  label: string
  icon: React.ElementType
}

const outcomes: Outcome[] = [
  { metric: '90%', label: 'Job Guarantee for Eligible Graduates', icon: Award },
  { metric: '500+', label: 'Careers Built Since 2013', icon: Users },
  { metric: '3 wks', label: 'Avg. Time to First Job / Client', icon: TrendingUp },
  { metric: '12+', label: 'Years Building Careers', icon: Briefcase },
]

interface GraduateStory {
  name: string
  program: string
  role: string
  story: string
  rating: number
  outcome: string
  initials: string
  accent: string
}

const graduateStories: GraduateStory[] = [
  {
    name: 'Rahul Sharma',
    program: 'Digital Marketing Career Program',
    role: 'Performance Marketer · SaaS Startup',
    story:
      'I came in as a confused graduate with a degree and no direction. I left as a career builder. Within 18 days of finishing the program I had two job offers — I picked the one that let me own campaigns from day one. The mindset shift was the real outcome.',
    rating: 5,
    outcome: 'Hired within 18 days',
    initials: 'RS',
    accent: '#F5A623',
  },
  {
    name: 'Priya Nair',
    program: 'Startup Building Program',
    role: 'Founder · D2C Skincare Brand',
    story:
      'I had an idea for 2 years and never launched. In the program I validated it with real customers, built a manual MVP, and got my first 100 paying customers before I graduated. BizMeals did not teach me business — they made me build one.',
    rating: 5,
    outcome: '100 customers in 60 days',
    initials: 'PN',
    accent: '#0F2557',
  },
  {
    name: 'Arjun Reddy',
    program: 'Freelancing Career Program',
    role: 'Freelance Web Developer',
    story:
      'I was earning ₹0 before this program. By week 3 I had my first paying client. By month 3 I was billing more than my old salary. The trainers are real freelancers — they showed me exactly how to find clients, price work, and deliver.',
    rating: 5,
    outcome: 'First client in 3 weeks',
    initials: 'AR',
    accent: '#F5A623',
  },
  {
    name: 'Sneha Patel',
    program: 'Digital Marketing Career Program',
    role: 'SEO Specialist · E-commerce Agency',
    story:
      'I tried two other institutes before BizMeals. They gave me certificates and zero confidence. BizMeals gave me real client campaigns from week 1. By the end I had a portfolio, a network, and a job. That is the difference between training and a program.',
    rating: 5,
    outcome: 'Hired within 3 weeks',
    initials: 'SP',
    accent: '#0F2557',
  },
  {
    name: 'Karthik Verma',
    program: 'Full Stack Web Development Program',
    role: 'Junior Developer · Product Company',
    story:
      'I thought I needed to memorise syntax. The trainers made me ship real features for real users. When I walked into interviews I had deployed apps, git history, and stories — not just notes. That is why I got hired.',
    rating: 5,
    outcome: 'Hired within 5 weeks',
    initials: 'KV',
    accent: '#F5A623',
  },
  {
    name: 'Divya Krishnan',
    program: 'Freelancing Career Program',
    role: 'Freelance Content & Brand Strategist',
    story:
      'I was a stay-at-home parent who wanted to restart. The freelancing program gave me a clear path — profile, portfolio, proposals, clients. I now earn from home, on my schedule, with 4 retainer clients. I built my career, nobody handed it to me.',
    rating: 5,
    outcome: '4 retainer clients in 90 days',
    initials: 'DK',
    accent: '#0F2557',
  },
]

interface SupportItem {
  icon: React.ElementType
  title: string
  description: string
}

const careerSupport: SupportItem[] = [
  {
    icon: UserCheck,
    title: 'Placement Support',
    description:
      'We do not just forward your resume. We introduce you to our hiring partner network, prep you for the exact interview, and follow up until you are placed. Support continues until you land a role.',
  },
  {
    icon: Handshake,
    title: 'In-House Hiring',
    description:
      'BizMeals hires its own graduates first. When we have open roles in marketing, development, BPO, or operations, our career program alumni get priority — you already know how we work.',
  },
  {
    icon: Network,
    title: 'Career Builder Community',
    description:
      'Graduates join a private alumni network of founders, freelancers, and professionals. You get referrals, gig opportunities, co-founder matches, and advice from people 2-3 steps ahead of you.',
  },
  {
    icon: Compass,
    title: 'Career Mapping',
    description:
      'Before you finish the program, we map your next 12 months — role targets, salary bands, skill gaps, and milestones. You leave with a plan, not just a certificate.',
  },
  {
    icon: Lightbulb,
    title: 'Founder Mentoring',
    description:
      'If you choose the founder path, you get 90 days of post-program mentoring — weekly check-ins with a working founder to keep you accountable as you build your business.',
  },
  {
    icon: HandHeart,
    title: 'Lifetime Access',
    description:
      'Once a career builder, always a career builder. You keep access to updated curriculum, live trainer Q&A sessions, and the community — for life, no renewal fees.',
  },
]

interface OpenRole {
  title: string
  type: string
  location: string
  description: string
  icon: React.ElementType
}

const openRoles: OpenRole[] = [
  {
    title: 'Digital Marketing Executive',
    type: 'Full-time',
    location: 'Bangalore / Remote',
    description:
      'Run real campaigns for real clients — SEO, Meta Ads, Google Ads, content. We hire our career program graduates first.',
    icon: Target,
  },
  {
    title: 'Business Development Associate',
    type: 'Full-time',
    location: 'Bangalore',
    description:
      'Onboard candidates into career programs and clients into growth services. Perfect for graduates who understand the product.',
    icon: Users,
  },
  {
    title: 'Full Stack Developer',
    type: 'Full-time',
    location: 'Remote',
    description:
      'Build and scale client web apps with React, Node.js, MongoDB. Strong portfolio from the program required.',
    icon: Laptop,
  },
  {
    title: 'BPO Executive',
    type: 'Full-time',
    location: 'Bangalore',
    description:
      'Customer support and process execution for our clients. Communication skills and CRM familiarity preferred.',
    icon: Headphones,
  },
]

/* ── Job Descriptions (detailed JDs for currently-hiring roles) ── */
interface JobDescription {
  icon: React.ElementType
  title: string
  type: string
  location: string
  experience: string
  responsibilities: string[]
  requirements: string[]
  whatYouWillDo: string
  applyHref: string
  applyLabel: string
}

const jobDescriptions: JobDescription[] = [
  {
    icon: Users,
    title: 'HR Executive / HR Recruiter',
    type: 'Full-time',
    location: 'Bangalore',
    experience: '0-2 years',
    responsibilities: [
      'End-to-end recruitment (sourcing, screening, shortlisting)',
      'Coordinating interviews',
      'Onboarding new hires',
      'Maintaining HR records',
      'Employee engagement',
      'Payroll support',
    ],
    requirements: [
      'Good communication skills',
      'Familiarity with job portals (Naukri, LinkedIn, etc.)',
      'MBA / Graduation in HR or related field preferred',
      '0-2 years experience',
      'Strong organizational skills',
    ],
    whatYouWillDo:
      'Hire for our internal team AND support hiring for partner companies across IT & Non-IT domains. You will be the bridge between talent and opportunity — placing the right people in the right roles.',
    applyHref: siteConfig.forms.bdeHrSales,
    applyLabel: 'Apply Now',
  },
  {
    icon: Briefcase,
    title: 'Business Development Executive (BDE)',
    type: 'Full-time',
    location: 'Bangalore',
    experience: '0-2 years',
    responsibilities: [
      'Lead generation',
      'Client outreach & pitching',
      'Closing deals',
      'Maintaining client relationships',
      'Meeting monthly targets',
      'Market research',
    ],
    requirements: [
      'Excellent communication & presentation skills',
      'Sales mindset, goal-oriented',
      'MBA / Graduation preferred',
      '0-2 years experience',
      'Hunger to grow',
    ],
    whatYouWillDo:
      'Bring in new business clients for our 360° growth services (marketing, startup support, finance, IT, BPO) and onboard candidates for training programs. You will own the front of the funnel.',
    applyHref: siteConfig.forms.bdeHrSales,
    applyLabel: 'Apply Now',
  },
  {
    icon: Laptop,
    title: 'Freelancer / Project Associate (Multiple Domains)',
    type: 'Freelance / Full-time (flexible)',
    location: 'Remote / Bangalore',
    experience: 'Open',
    responsibilities: [
      'Digital Marketing (SEO, SMM, Ads, Content)',
      'Graphic Design & Video Editing',
      'Sales & Business Development',
      'Web Development & Tech Support',
      'BPO & Customer Support',
      'Deliver on agreed deadlines',
    ],
    requirements: [
      'Relevant skills for the chosen domain',
      'Portfolio / work samples',
      'Self-motivated, owner mindset',
      'Ability to deliver on deadlines',
      'Open to freelance or full-time',
    ],
    whatYouWillDo:
      'Work on exciting projects across industries with flexible opportunities (freelance or full-time), competitive payouts, career growth, and the chance to be part of an innovative team.',
    applyHref: siteConfig.forms.freelancerOnboarding,
    applyLabel: 'Apply as Freelancer',
  },
]

interface QAItem {
  question: string
  answer: string
}

const qaItems: QAItem[] = [
  {
    question: 'What is the difference between the Career page and the Training page?',
    answer:
      'The Training page is where you apply for a Career Program — Digital Marketing, Startup Building, Freelancing, and specialist tracks. This Career page is what happens after: the outcomes, the graduate stories, the career support, and the option to hire our graduates or join the BizMeals team. Programs build careers; this page shows the careers we have built.',
  },
  {
    question: 'Can my company hire BizMeals career program graduates?',
    answer:
      'Yes. We work with hiring partners who want job-ready talent — not certificate-holders. Our graduates have shipped real campaigns, real code, and real client work. Email hire@bizmeals.in with your role requirements and we will shortlist graduates who match. No placement fee for the first hire.',
  },
  {
    question: 'What career support do graduates get after the program?',
    answer:
      'Six things: (1) Placement support until hired, (2) In-house hiring priority at BizMeals, (3) Career Builder alumni community, (4) A 12-month career map, (5) Founder mentoring for the founder track, and (6) Lifetime access to updated curriculum and live trainer Q&A. We do not disappear after the certificate.',
  },
  {
    question: 'Is the 90% job guarantee real?',
    answer:
      'Yes — for eligible graduates who complete the program, attend mentoring, and meet placement criteria (which are clearly shared on day one). If an eligible graduate is not placed, placement support continues and we consider them for in-house roles. The 90% figure is our actual placement rate, not a marketing number.',
  },
  {
    question: 'Do you only hire your own graduates?',
    answer:
      'We hire the best fit for the role — but our career program graduates get priority consideration because they already know how we work, our standards, and our clients. Many of our current team members are program alumni. For external candidates, we still welcome applications and assess on merit.',
  },
  {
    question: 'What is a "Career Builder"?',
    answer:
      'A career builder is someone who treats their career as something they construct — not something they are given. They can be an employee, a freelancer, or a founder. The common thread is ownership: they build skills, build a network, build income, and build options. Our programs exist to produce career builders, not job-seekers.',
  },
  {
    question: 'How do I refer a candidate to a Career Program?',
    answer:
      'If you know someone who is serious about building a career — not just collecting a certificate — send them to the Training page to apply. Admission is selective: aptitude round + mindset interview. We reject applicants who are not the right fit, because the 90% guarantee depends on the right people in the room.',
  },
  {
    question: 'I am a BDE / consultant. Can I partner with BizMeals to onboard candidates?',
    answer:
      'Yes. We work with business development associates and consultants who refer candidates to our career programs. You earn a referral fee for every candidate who is selected and enrolled. Email partner@bizmeals.in to become a referral partner — we will share program decks, Q&A scripts, and selection criteria to help you pitch accurately.',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   CAREER BUILDERS HUB PAGE
   ═════════════════════════════════════════════════════════════════════════ */

export default function CareerPage() {
  const { setCurrentPage } = usePage()
  const [openQA, setOpenQA] = useState<number | null>(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const mindsetRef = useRef<HTMLDivElement>(null)
  const mindsetInView = useInView(mindsetRef, { once: true, margin: '-80px' })

  const storiesRef = useRef<HTMLDivElement>(null)
  const storiesInView = useInView(storiesRef, { once: true, margin: '-80px' })

  const supportRef = useRef<HTMLDivElement>(null)
  const supportInView = useInView(supportRef, { once: true, margin: '-80px' })

  const hireRef = useRef<HTMLDivElement>(null)
  const hireInView = useInView(hireRef, { once: true, margin: '-80px' })

  const rolesRef = useRef<HTMLDivElement>(null)
  const rolesInView = useInView(rolesRef, { once: true, margin: '-80px' })

  const qaRef = useRef<HTMLDivElement>(null)
  const qaInView = useInView(qaRef, { once: true, margin: '-80px' })

  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const hiringBannerRef = useRef<HTMLDivElement>(null)
  const hiringBannerInView = useInView(hiringBannerRef, { once: true, margin: '-80px' })

  const jdRef = useRef<HTMLDivElement>(null)
  const jdInView = useInView(jdRef, { once: true, margin: '-80px' })

  const trainingRef = useRef<HTMLDivElement>(null)
  const trainingInView = useInView(trainingRef, { once: true, margin: '-80px' })

  const partnerRef = useRef<HTMLDivElement>(null)
  const partnerInView = useInView(partnerRef, { once: true, margin: '-80px' })

  /* ═══════════════════════════════════════════════════════
     1. HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
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

      <motion.div
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Breadcrumb */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-1.5 text-xs mb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-white/60 hover:text-[#F5A623] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3 h-3" />
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <span className="text-white font-semibold">Career Builders Hub</span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">
            Career Builders Hub
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5 text-white"
        >
          Build Your Career.
          <br />
          <span className="text-[#F5A623]">Don&apos;t Just Find a Job.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A career is not something you get — it is something you build. Our Career Programs produce
          career builders: employees who own their growth, freelancers who earn on their terms, and
          founders who ship real businesses. This is where their careers live.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => setCurrentPage('training')}
            className="bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer border-0"
          >
            <GraduationCap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Apply for a Career Program
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => {
              const el = document.getElementById('hire-graduates')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            variant="outline"
            className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F5A623]/50 font-semibold px-6 py-3 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer"
          >
            <Handshake className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Hire Our Graduates
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 max-w-4xl mx-auto"
        >
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              variants={scaleIn}
              custom={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 text-center"
            >
              <o.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5A623] mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{o.metric}</div>
              <div className="text-[10px] sm:text-xs text-white/60 font-medium leading-tight mt-1">{o.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     1b. WE'RE HIRING NOW — HIGHLIGHT BANNER
     ═══════════════════════════════════════════════════════ */

  const renderHiringBanner = () => (
    <section
      ref={hiringBannerRef}
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E8951A 45%, #0F2557 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 right-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#0F2557]/25 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={hiringBannerInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-white/20 mb-5"
        >
          <Megaphone className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">
            🔥 We&apos;re Hiring Now
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight"
        >
          Currently Hiring: HR, BDEs &amp; Freelancers
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed mb-6"
        >
          We&apos;re actively recruiting for multiple roles across our Bangalore team and remote network.
          If you&apos;re a builder who owns your work, we want to talk.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-7"
        >
          {[
            'HR Executives',
            'Business Development Executives (BDEs)',
            'Freelancers (Multiple Domains)',
          ].map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-semibold"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#1A1A1A]" />
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={siteConfig.forms.bdeHrSales}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Briefcase className="w-4 h-4" />
            Apply for Full-time Roles (HR/BDE/Sales)
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={siteConfig.forms.freelancerOnboarding}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#0F2557] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Laptop className="w-4 h-4" />
            Join as a Freelancer
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     1c. JOB DESCRIPTIONS — DETAILED JDs
     ═══════════════════════════════════════════════════════ */

  const renderJDs = () => (
    <section ref={jdRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={jdInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E6] border border-[#F5A623]/20 mb-4"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">
              Job Descriptions
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight"
          >
            Open Roles — Detailed JDs
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed"
          >
            Clear, professional job descriptions for our currently-hiring roles. Read the responsibilities,
            requirements, and what you will actually do — then apply with one click.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={jdInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-6"
        >
          {jobDescriptions.map((jd, i) => (
            <motion.div
              key={jd.title}
              variants={fadeUp}
              custom={i}
              className="group bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden hover:border-[#F5A623]/40 hover:shadow-xl hover:shadow-[#0F2557]/5 transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF2FA] flex items-center justify-center shrink-0 group-hover:bg-[#0F2557] transition-colors duration-300">
                    <jd.icon className="w-6 h-6 text-[#0F2557] group-hover:text-[#F5A623] transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F2557] mb-2">{jd.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF7E6] text-[#0F2557] border border-[#F5A623]/20">
                        {jd.type}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#0F2557]/10">
                        {jd.location}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F5F7FA] text-[#0F2557] border border-[#E5E9F0]">
                        {jd.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2557] mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623]" />
                      Responsibilities
                    </h4>
                    <ul className="space-y-1.5">
                      {jd.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-[#5A6478] leading-relaxed"
                        >
                          <Check className="w-3 h-3 text-[#F5A623] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2557] mb-3 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#F5A623]" />
                      Requirements
                    </h4>
                    <ul className="space-y-1.5">
                      {jd.requirements.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-[#5A6478] leading-relaxed"
                        >
                          <Check className="w-3 h-3 text-[#F5A623] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2557] mb-3 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#F5A623]" />
                      What You&apos;ll Do at BizMeals
                    </h4>
                    <p className="text-xs text-[#5A6478] leading-relaxed">{jd.whatYouWillDo}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E5E9F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-[#5A6478]">
                    Ready to join? Apply via the official Google Form — opens in a new tab.
                  </p>
                  <a
                    href={jd.applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#1A3A6E] text-white font-bold px-5 py-2.5 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group/btn self-start sm:self-auto whitespace-nowrap"
                  >
                    <Mail className="w-4 h-4" />
                    {jd.applyLabel}
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. WHAT IS A CAREER BUILDER
     ═══════════════════════════════════════════════════════ */

  const renderMindset = () => (
    <section ref={mindsetRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={mindsetInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E6] border border-[#F5A623]/20 mb-4">
            <Compass className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">The Mindset</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Three Careers. One Mindset.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            A career builder does not pick a job title — they pick a path and own it. Every graduate of
            our programs leaves with the same mindset, then chooses one of three careers to build.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={mindsetInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {careerPaths.map((path, i) => (
            <motion.div
              key={path.title}
              variants={scaleIn}
              custom={i}
              className="group relative bg-white rounded-2xl border border-[#E5E9F0] p-6 sm:p-7 hover:border-[#F5A623]/40 hover:shadow-xl hover:shadow-[#0F2557]/5 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F2557] to-[#F5A623] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] flex items-center justify-center group-hover:bg-[#0F2557] transition-colors duration-300">
                  <path.icon className="w-6 h-6 text-[#0F2557] group-hover:text-[#F5A623] transition-colors duration-300" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9CA3AF]">{path.label}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0F2557] mb-3">{path.title}</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed mb-5">{path.description}</p>

              <div className="pt-4 border-t border-[#E5E9F0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span className="text-xs font-semibold text-[#0F2557]">{path.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mindset callout */}
        <motion.div
          initial="hidden"
          animate={mindsetInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mt-10 sm:mt-14"
        >
          <div
            className="rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F5A623]/10 blur-2xl" />
            <Quote className="w-8 h-8 text-[#F5A623] mx-auto mb-4 opacity-60" />
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white max-w-3xl mx-auto leading-snug">
              &ldquo;The biggest outcome of our programs is not the certificate.
              <span className="text-[#F5A623]"> It is the mindset shift.</span>
              A career builder does not wait for opportunity — they build it.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. GRADUATE STORIES
     ═══════════════════════════════════════════════════════ */

  const renderStories = () => (
    <section ref={storiesRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={storiesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <Star className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Career Outcomes</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Real Graduates. Real Careers.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            These are not actors. They are career builders who walked in with uncertainty and walked out
            with income, offers, and businesses. Every story is verifiable.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={storiesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {graduateStories.map((story, i) => (
            <motion.div
              key={story.name}
              variants={scaleIn}
              custom={i}
              className="bg-white rounded-2xl border border-[#E5E9F0] p-6 flex flex-col hover:shadow-xl hover:shadow-[#0F2557]/5 hover:border-[#F5A623]/30 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: story.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                ))}
              </div>

              {/* Story */}
              <p className="text-sm text-[#3D4452] leading-relaxed mb-5 flex-1">&ldquo;{story.story}&rdquo;</p>

              {/* Outcome badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7E6] border border-[#F5A623]/20 mb-4 w-fit">
                <TrendingUp className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-[11px] font-bold text-[#0F2557]">{story.outcome}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E9F0]">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: story.accent }}
                >
                  {story.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#0F2557] truncate">{story.name}</div>
                  <div className="text-[11px] text-[#5A6478] truncate">{story.role}</div>
                  <div className="text-[10px] text-[#9CA3AF] truncate mt-0.5">{story.program}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={storiesInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mt-10"
        >
          <Button
            onClick={() => setCurrentPage('training')}
            variant="outline"
            className="border-[#0F2557]/20 text-[#0F2557] hover:bg-[#0F2557] hover:text-white font-semibold px-6 py-3 text-sm rounded-xl h-auto transition-all duration-300 cursor-pointer group"
          >
            Read More Program Stories
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. CAREER SUPPORT
     ═══════════════════════════════════════════════════════ */

  const renderSupport = () => (
    <section ref={supportRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={supportInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FA] border border-[#0F2557]/10 mb-4">
            <HandHeart className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">After The Program</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Career Support That Does Not End
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            Most institutes hand you a certificate and disappear. We hand you a career and walk with you.
            Here is what every career builder gets after graduation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={supportInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {careerSupport.map((item, i) => (
            <motion.div
              key={item.title}
              variants={scaleIn}
              custom={i}
              className="group bg-white rounded-2xl border border-[#E5E9F0] p-6 hover:border-[#0F2557]/30 hover:shadow-lg hover:shadow-[#0F2557]/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0F2557] flex items-center justify-center mb-4 group-hover:bg-[#F5A623] transition-colors duration-300">
                <item.icon className="w-5 h-5 text-white group-hover:text-[#1A1A1A] transition-colors duration-300" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F2557] mb-2">{item.title}</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. HIRE OUR GRADUATES
     ═══════════════════════════════════════════════════════ */

  const renderHireGraduates = () => (
    <section
      ref={hireRef}
      id="hire-graduates"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={hireInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 mb-4 backdrop-blur-sm">
            <Handshake className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">For Employers</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Hire Career Builders, Not Certificate-Holders
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Our graduates have shipped real campaigns, real code, and real client work. They have been
            trained by working founders and professionals, not lecturers. If you need talent that is
            ready from day one — hire from BizMeals.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Why hire our graduates */}
          <motion.div
            initial="hidden"
            animate={hireInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
              What You Get
            </h3>
            <ul className="space-y-3">
              {[
                'Graduates with real client work in their portfolio',
                'Trained by working founders and industry professionals',
                'Mindset of ownership — they build, they do not wait',
                'Pre-vetted through selective admission and program completion',
                'No placement fee for your first hire',
                'Replacement guarantee if a hire does not work out in 60 days',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hiring process */}
          <motion.div
            initial="hidden"
            animate={hireInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#F5A623]" />
              How Hiring Works
            </h3>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Share Your Role', desc: 'Email hire@bizmeals.in with role, skills, and experience needed.' },
                { step: '02', title: 'We Shortlist', desc: 'We send you 3-5 vetted graduates who match — within 48 hours.' },
                { step: '03', title: 'You Interview', desc: 'Interview directly. Our graduates come with portfolios, not just resumes.' },
                { step: '04', title: 'Hire & Onboard', desc: 'Make an offer. We support the onboarding at no cost to you.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#1A1A1A] font-bold text-xs shrink-0">
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-bold text-white">{s.title}</div>
                    <div className="text-xs text-white/60 leading-relaxed mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setCurrentPage('contact')}
              className="w-full mt-6 bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold py-3 text-sm rounded-xl h-auto cursor-pointer border-0 group"
            >
              <Mail className="w-4 h-4 mr-2" />
              Request Graduates for Hiring
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5b. TRAINING PROGRAM — 40+ DIGITAL MARKETING OPENINGS
     ═══════════════════════════════════════════════════════ */

  const renderTrainingProgram = () => (
    <section ref={trainingRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={trainingInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-8"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 100%)' }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F5A623]/15 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#F5A623]/10 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">
                  Training Program · Career Building
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                40+ Immediate Openings in Digital Marketing
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
                BizMeals Management Solutions Pvt Ltd — a professional business growth and career-building
                company creating real job opportunities for students, freshers, working professionals, and
                career-gap candidates across IT &amp; Non-IT industries.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl border border-[#E5E9F0] p-6 sm:p-8 mb-6"
          >
            <h3 className="text-lg sm:text-xl font-bold text-[#0F2557] mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F5A623]" />
              What Makes Us Different
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'We onboard candidates only when real job opportunities exist',
                'Industry-ready training by working professionals',
                'Live projects + internship + freelancing exposure',
                'Direct job opportunities through partner companies & our projects',
              ].map((point, idx) => (
                <div
                  key={point}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F7FA] border border-[#E5E9F0]"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#1A1A1A] font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-[#3D4452] leading-relaxed font-medium pt-0.5">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-[#FFF7E6] border border-[#F5A623]/20 rounded-2xl p-5 sm:p-6 mb-4 flex items-start gap-3"
          >
            <Quote className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
            <p className="text-sm text-[#3D4452] leading-relaxed italic">
              We commit to candidates only when we have genuine vacancies. After onboarding, we train, guide,
              and place candidates into real, growth-oriented career roles.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-white border border-[#E5E9F0] rounded-2xl p-4 mb-8 flex items-start gap-3"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
            <p className="text-xs text-[#5A6478] leading-relaxed">
              <strong className="text-[#0F2557]">After registration:</strong> You will be added to the
              official WhatsApp group for demo session updates and job notifications.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <a
              href={siteConfig.forms.trainingProgram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
            >
              <GraduationCap className="w-4 h-4" />
              Register for Training Program
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5c. PARTNER WITH BIZMEALS
     ═══════════════════════════════════════════════════════ */

  const renderPartner = () => (
    <section ref={partnerRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={partnerInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FA] border border-[#0F2557]/10 mb-4"
          >
            <Handshake className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">
              Partner Network
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight"
          >
            Partner With BizMeals
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed"
          >
            Work with us as a freelancer, agency, or service provider. We bring you steady work from
            diverse industries.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={partnerInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10"
        >
          {[
            {
              icon: Briefcase,
              title: 'Get Consistent Projects',
              desc: 'Steady work from diverse industries — never a dry pipeline.',
            },
            {
              icon: TrendingUp,
              title: 'Boost Your Skills',
              desc: 'Training and expert support to level up your craft.',
            },
            {
              icon: Network,
              title: 'Expand Your Network',
              desc: 'Connect with businesses and professionals across sectors.',
            },
            {
              icon: Award,
              title: 'Earn Fair & Timely Payments',
              desc: 'We pay on time, every time — no chasing, no delays.',
            },
            {
              icon: Laptop,
              title: 'Flexible Collaboration',
              desc: 'Freelance, agency, or service provider — your way.',
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              variants={scaleIn}
              custom={i}
              className="group bg-white rounded-2xl border border-[#E5E9F0] p-5 sm:p-6 hover:border-[#F5A623]/40 hover:shadow-lg hover:shadow-[#0F2557]/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EEF2FA] flex items-center justify-center mb-4 group-hover:bg-[#0F2557] transition-colors duration-300">
                <b.icon className="w-5 h-5 text-[#0F2557] group-hover:text-[#F5A623] transition-colors duration-300" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F2557] mb-2">{b.title}</h3>
              <p className="text-xs text-[#5A6478] leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <a
            href={siteConfig.forms.businessPartner}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#1A3A6E] text-white font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#0F2557]/20 hover:shadow-xl hover:shadow-[#0F2557]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Handshake className="w-4 h-4" />
            Partner With Us
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. OPEN ROLES AT BIZMEALS
     ═══════════════════════════════════════════════════════ */

  const renderOpenRoles = () => (
    <section ref={rolesRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={rolesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#0F2557]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Join The Team</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Open Roles at BizMeals
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            We hire our own career program graduates first — but we also welcome talent from outside who
            shares our builder mindset. If you own your work, you belong here.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={rolesInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              variants={scaleIn}
              custom={i}
              className="group bg-white rounded-2xl border border-[#E5E9F0] p-5 sm:p-6 hover:border-[#F5A623]/40 hover:shadow-lg hover:shadow-[#0F2557]/5 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FA] flex items-center justify-center shrink-0 group-hover:bg-[#0F2557] transition-colors duration-300">
                <role.icon className="w-5 h-5 text-[#0F2557] group-hover:text-[#F5A623] transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#0F2557]">{role.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#F5A623] transition-colors shrink-0 mt-0.5" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF7E6] text-[#0F2557] border border-[#F5A623]/20">
                    {role.type}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FA] text-[#0F2557] border border-[#0F2557]/10">
                    {role.location}
                  </span>
                </div>
                <p className="text-xs text-[#5A6478] leading-relaxed">{role.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={rolesInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mt-10"
        >
          <p className="text-xs text-[#5A6478] mb-4">
            We review every application. Send your resume and a note on why you are a career builder to{' '}
            <a href="mailto:careers@bizmeals.in" className="text-[#0F2557] font-semibold hover:text-[#F5A623] transition-colors">
              careers@bizmeals.in
            </a>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href={siteConfig.forms.bdeHrSales}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#1A3A6E] text-white font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
            >
              <Briefcase className="w-4 h-4" />
              Apply Now (HR/BDE/Sales)
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href={siteConfig.forms.freelancerOnboarding}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F5F7FA] text-[#0F2557] font-bold px-6 py-3 text-sm rounded-xl h-auto border border-[#0F2557]/20 shadow-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
            >
              <Laptop className="w-4 h-4" />
              Apply as Freelancer
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <a
            href={siteConfig.contact.phone2Href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2557] hover:text-[#F5A623] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Or call us: {siteConfig.contact.phone2}
          </a>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. Q&A
     ═══════════════════════════════════════════════════════ */

  const renderQA = () => (
    <section ref={qaRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate={qaInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E6] border border-[#F5A623]/20 mb-4">
            <Lightbulb className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F2557]">Q&amp;A</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 tracking-tight">
            Career Questions, Answered
          </motion.h2>
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-[#5A6478] max-w-xl mx-auto leading-relaxed">
            Everything candidates, employers, and BDEs need to understand the career builder ecosystem —
            in plain language.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={qaInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-3"
        >
          {qaItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden hover:border-[#0F2557]/20 transition-colors"
            >
              <button
                onClick={() => setOpenQA(openQA === i ? null : i)}
                className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={openQA === i}
              >
                <span className="text-sm sm:text-base font-bold text-[#0F2557] pr-2 group-hover:text-[#1A3A6E] transition-colors">
                  {item.question}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${openQA === i ? 'bg-[#F5A623]' : 'bg-[#EEF2FA] group-hover:bg-[#0F2557]/10'}`}>
                  <ChevronDown className={`w-4 h-4 transition-all duration-300 ${openQA === i ? 'rotate-180 text-[#1A1A1A]' : 'text-[#0F2557]'}`} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openQA === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="pl-4 border-l-2 border-[#F5A623]">
                        <p className="text-sm text-[#3D4452] leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     8. FINAL CTA
     ═══════════════════════════════════════════════════════ */

  const renderCTA = () => (
    <section
      ref={ctaRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1A3A6E 50%, #0F2557 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F5A623]/30 backdrop-blur-sm mb-6">
          <Rocket className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5A623]">Start Building</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
          Your Career Is Not a Job Title.
          <br />
          <span className="text-[#F5A623]">It Is Something You Build.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
          Whether you want to apply for a Career Program, hire our graduates, or join the BizMeals team —
          the next step is yours. Career builders do not wait. They start.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => setCurrentPage('training')}
            className="bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer border-0"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Apply for a Career Program
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a
            href={siteConfig.forms.trainingProgram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <GraduationCap className="w-4 h-4" />
            Register for Training (40+ Openings)
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={siteConfig.forms.bdeHrSales}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E8951A] text-[#1A1A1A] font-bold px-6 py-3 text-sm rounded-xl h-auto shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
          >
            <Briefcase className="w-4 h-4" />
            Apply for Jobs (HR/BDE/Sales)
            <ExternalLink className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <Button
            onClick={() => setCurrentPage('contact')}
            variant="outline"
            className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-[#F5A623]/50 font-semibold px-6 py-3 text-sm rounded-xl h-auto transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            Talk to Our Team
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            +91 8217330484
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.contact.phone2}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            careers@bizmeals.in
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Bangalore · Online
          </span>
        </motion.div>
      </motion.div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <div className="overflow-x-hidden">
      {renderHero()}
      {renderHiringBanner()}
      {renderJDs()}
      {renderMindset()}
      {renderStories()}
      {renderSupport()}
      {renderHireGraduates()}
      {renderTrainingProgram()}
      {renderPartner()}
      {renderOpenRoles()}
      {renderQA()}
      {renderCTA()}
    </div>
  )
}
