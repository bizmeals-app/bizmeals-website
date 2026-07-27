'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  ArrowRight,
  BookOpen,
  Clock,
  Home,
  ChevronRight,
  Mail,
  Send,
  TrendingUp,
  Lightbulb,
  Rocket,
  X,
  Tag,
  BarChart3,
  Globe,
  Target,
  Building2,
  ShoppingBag,
  Sparkles,
  Heart,
  Factory,
  UtensilsCrossed,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Quote,
  Calendar,
  User,
  Search,
  Megaphone,
  LineChart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePage } from '@/components/bizmeals/page-context'

/* ───────────────────────── animation variants ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/* ───────────────────────── types & config ───────────────────────── */

type Category =
  | 'All'
  | 'Digital Marketing'
  | 'Case Studies'
  | 'Startup Building'
  | 'Industry Insights'
  | 'Tips & How-Tos'
  | 'BizMeals Experience'

type ContentType = 'All' | 'Deep Dive' | 'Quick Insight'

interface BlogPost {
  id: string
  slug: string
  title: string
  category: Category
  contentType: 'Deep Dive' | 'Quick Insight'
  readTime: string
  date: string
  author: string
  industry?: string
  summary: string        // SEO meta description (150-160 chars)
  keywords: string[]     // SEO keywords
  fullContent: string[]
  tags: string[]
  featured?: boolean
}

const categories: Category[] = [
  'All',
  'Digital Marketing',
  'Case Studies',
  'Startup Building',
  'Industry Insights',
  'Tips & How-Tos',
  'BizMeals Experience',
]

const contentTypes: ContentType[] = ['All', 'Deep Dive', 'Quick Insight']

const categoryIconMap: Record<string, any> = {
  'Digital Marketing': Megaphone,
  'Case Studies': BarChart3,
  'Startup Building': Rocket,
  'Industry Insights': Lightbulb,
  'Tips & How-Tos': Target,
  'BizMeals Experience': Building2,
}

/* ───────────────────────── blog posts data ───────────────────────── */

const blogPosts: BlogPost[] = [
  /* ══════════════ 1. FEATURED — Digital Marketing for Healthcare ══════════════ */
  {
    id: 'digital-marketing-healthcare-2025',
    slug: 'digital-marketing-for-healthcare-industry-2025',
    title: 'Digital Marketing for Healthcare: How Clinics & Hospitals Win Patients in 2025',
    category: 'Digital Marketing',
    contentType: 'Deep Dive',
    readTime: '9 min',
    date: 'Nov 18, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Healthcare',
    summary:
      'A complete digital marketing playbook for healthcare, clinics, and hospitals in India — covering local SEO, Google Ads, patient reviews, and WhatsApp conversion. Learn how BizMeals helps healthcare brands grow patient footfall.',
    keywords: [
      'digital marketing for healthcare',
      'hospital marketing India',
      'clinic SEO Bangalore',
      'healthcare lead generation',
      'medical practice marketing',
      'patient acquisition',
    ],
    tags: ['Healthcare', 'Local SEO', 'Google Ads', 'WhatsApp Marketing', 'Patient Trust'],
    featured: true,
    fullContent: [
      'Healthcare is one of the most trust-sensitive industries in India. A patient does not choose a clinic the way they choose a pair of shoes. They search, they read reviews, they ask family, they compare, and only then do they book an appointment. This makes digital marketing for healthcare fundamentally different from marketing for retail or entertainment. The goal is not noise — it is credibility, discoverability, and conversion. At BizMeals, we have spent over a decade helping healthcare brands across Bangalore build patient pipelines that are measurable, repeatable, and compliant with medical advertising norms.',
      'The first pillar of healthcare digital marketing is local SEO. When someone searches "best dermatologist near me" or "pediatrician in Indiranagar", Google shows the three most relevant, review-rich, location-accurate practices in the Local Pack. If your clinic is not in that pack, you are invisible to 68% of searchers who never scroll past it. We optimise your Google Business Profile with accurate specialty categories, working hours, doctor credentials, service lists, geo-tagged photos, and a steady stream of patient reviews. A single well-optimised GBP can drive 40-60 inbound appointment calls per month for a mid-sized clinic — without spending a rupee on ads.',
      'The second pillar is paid acquisition through Google Ads and Meta Ads. For hospitals and multi-speciality clinics, Google Search Ads targeting high-intent keywords ("knee replacement surgeon Bangalore", "IVF clinic cost") deliver the most qualified traffic. Cost per click is higher, but so is intent — a click on "knee replacement surgeon" is a patient, not a browser. For Meta, we use awareness-to-booking funnels: educational reels about a condition, retargeting with a free consultation offer, and a WhatsApp CTA that converts in under three messages. We have run these funnels for dental clinics, fertility centres, and physiotherapy chains, consistently bringing new-patient acquisition costs down to Rs 180-450 depending on speciality.',
      'The third pillar — and the one most agencies ignore — is patient reviews and reputation management. In healthcare, reviews are the new word-of-mouth. A clinic with 4.8 stars and 220 reviews will out-convert a clinic with 4.1 stars and 40 reviews every single time, even if the latter is clinically better. We build review pipelines that ask happy patients for feedback within 24 hours of their visit, route unhappy patients to a private feedback channel, and surface the best reviews on your website and Google profile. This single system, run consistently, compounds your conversion rate month after month.',
      'The fourth pillar is WhatsApp marketing. India runs on WhatsApp, and healthcare is no exception. Appointment reminders, post-visit care instructions, prescription follow-ups, and seasonal health check-up offers all live in WhatsApp. We build automated WhatsApp flows that reduce no-shows by 35%, improve patient retention by 22%, and turn your existing patient base into a referral engine. For a chain of dental clinics in Bangalore, this approach alone added 1,200+ booked appointments in a single quarter.',
      'Finally, measurement. Healthcare marketing without analytics is guesswork. We track every call, every form fill, every WhatsApp chat, and every booked appointment back to its source channel. You see exactly which campaign brought in which patient, what it cost, and what lifetime value that patient represents. This is the BizMeals difference — we are not an agency that reports impressions; we report patients walked in, revenue booked, and ROI delivered. If you run a clinic, hospital, or healthcare practice and want a partner who understands the regulatory, emotional, and operational reality of your industry, let us build your growth plan.',
    ],
  },

  /* ══════════════ 2. Digital Marketing for Real Estate ══════════════ */
  {
    id: 'digital-marketing-real-estate',
    slug: 'digital-marketing-for-real-estate-developers-india',
    title: 'Digital Marketing for Real Estate: Filling Sales Pipelines for Developers & Brokers',
    category: 'Digital Marketing',
    contentType: 'Deep Dive',
    readTime: '8 min',
    date: 'Nov 14, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Real Estate',
    summary:
      'Learn how real estate developers and brokers in India use digital marketing — Meta lead ads, property portal SEO, virtual tours, and broker CRMs — to fill sales pipelines. Real numbers from BizMeals campaigns.',
    keywords: [
      'real estate digital marketing India',
      'property marketing Bangalore',
      'real estate lead generation',
      'Meta ads for real estate',
      'property SEO',
      'real estate CRM',
    ],
    tags: ['Real Estate', 'Meta Ads', 'Lead Generation', 'Virtual Tours', 'CRM'],
    fullContent: [
      'Real estate is a high-ticket, high-consideration, high-trust purchase. A buyer does not impulse-buy a 1.2 crore apartment. They research for weeks, compare 8-12 properties, visit 4-6 sites, involve their family, and only then sign. This means real estate digital marketing is not about the immediate sale — it is about building a nurture pipeline that keeps your project top-of-mind for the entire 60-180 day consideration window. At BizMeals, we have run digital campaigns for real estate developers and brokers across Bangalore, Hyderabad, and Chennai, and the playbook below is what consistently works.',
      'The foundation is a high-conversion landing page for each project. A generic "contact us" page converts at 1-2%. A dedicated project landing page with location advantages, floor plans, price range, RERA details, walkthrough video, and a single "Book Site Visit" CTA converts at 6-11%. We build these pages fast, host them on your domain, and connect them directly to your CRM so every lead is auto-assigned to a sales rep within 90 seconds. Speed-to-lead is the single biggest lever in real estate conversion — a lead called within 5 minutes is 21x more likely to convert than one called after 30 minutes.',
      'The second lever is Meta Ads (Facebook + Instagram). For under-construction and ready-to-move projects, Meta lead-form ads with carousel images of interiors, amenities, and floor plans consistently deliver leads at Rs 220-480 per lead depending on micro-location and price band. The key is targeting: we layer interest targeting (luxury real estate, interior design, home loan), behaviour targeting (recent movers, newly engaged), and lookalike audiences built from your past buyers. For premium projects above 2 crore, we narrow to income-tiered audiences and exclude tire-kickers using custom exclusions.',
      'The third lever is Google Search Ads for intent capture. When someone searches "3BHK apartments in Whitefield under 1.5 crore", they are not browsing — they are ready to act. We bid on these hyper-specific long-tail keywords and route them to the matching project page. Cost per click is Rs 18-55, but conversion rate is 3-5x higher than Meta. We also run Performance Max campaigns for inventory that needs faster liquidation, with dynamic creatives that adapt to each user.',
      'The fourth lever is SEO and content. Real estate SEO is a long game but a compounding one. We create location pages for every micro-market you operate in ("apartments in Sarjapur Road", "villas in Devanahalli"), project comparison pages, neighbourhood guides, and price-trend articles. Over 6-12 months these pages start ranking and bring in organic leads at near-zero marginal cost. For one Bangalore developer, organic SEO now delivers 38% of their monthly inbound leads — leads that cost nothing to acquire.',
      'The fifth lever is virtual tours and video. Post-COVID, buyers shortlist online before they visit offline. A project with a 360-degree virtual tour, drone video of the locality, and testimonial reels from existing residents gets 2.4x more site-visit bookings than a project with static images alone. We produce this content as part of every real estate engagement. Combined with retargeting ads that follow interested buyers across Instagram, YouTube, and the web, the same project stays in front of the buyer for the full consideration window.',
      'Finally, everything plugs into a CRM. Without a CRM, leads die in spreadsheets. We help real estate teams implement and operate CRMs that auto-distribute leads, send WhatsApp follow-ups, track every call, and report which channel produced which booking. This is how a Bangalore developer we worked with went from 3.2x more leads in 90 days — and, more importantly, from a 4% lead-to-site-visit ratio to a 12% ratio. That is the real win: not more leads, but more qualified leads that actually convert. If you are a developer, broker, or real estate marketing head, talk to us about a growth plan tailored to your inventory and micro-markets.',
    ],
  },

  /* ══════════════ 3. Digital Marketing for E-Commerce & D2C ══════════════ */
  {
    id: 'digital-marketing-d2c-ecommerce',
    slug: 'digital-marketing-for-d2c-ecommerce-brands-india',
    title: 'Digital Marketing for D2C & E-Commerce Brands: From First Order to Profitable Scale',
    category: 'Digital Marketing',
    contentType: 'Deep Dive',
    readTime: '10 min',
    date: 'Nov 9, 2025',
    author: 'BizMeals Growth Team',
    industry: 'E-Commerce & D2C',
    summary:
      'The complete D2C and e-commerce digital marketing playbook for Indian brands — performance marketing, Meta Ads, Google Shopping, marketplace ads, retention, and unit economics. Includes real campaign numbers.',
    keywords: [
      'D2C marketing India',
      'e-commerce digital marketing',
      'Meta ads for D2C',
      'Google Shopping ads',
      'D2C brand growth',
      'e-commerce retention',
    ],
    tags: ['D2C', 'E-Commerce', 'Performance Marketing', 'Retention', 'Unit Economics'],
    fullContent: [
      'Building a D2C brand in India in 2025 is both easier and harder than ever. Easier because the infrastructure — Shopify, payment gateways, logistics, ad platforms — is mature and affordable. Harder because customer acquisition costs have risen 40-70% in the last three years, and a brand that does not understand unit economics will burn cash and die. The brands that win are not the ones with the biggest ad budget. They are the ones with the sharpest funnel, the strongest retention, and the clearest understanding of what it costs to acquire a customer and what that customer is worth over 12 months. This is the playbook we use at BizMeals to take D2C brands from their first 100 orders to their first 10,000.',
      'Phase one is foundation. Before a single rupee goes into ads, we ensure the store is built to convert. Fast load time (under 2.5 seconds), mobile-first design, high-quality product imagery, social proof on every product page (reviews, UGC, ratings), clear shipping and returns policy, and a frictionless checkout withUPI, COD, and prepaid discount. A store that converts at 1.8% will lose money on ads. The same store, optimised to convert at 3.5%, becomes profitable on the same ad spend. We have lifted D2C conversion rates from 1.4% to 3.8% purely through CRO work — no extra ad spend required.',
      'Phase two is performance acquisition. Meta Ads (Facebook + Instagram) is the workhorse for D2C discovery. We run Advantage+ Shopping campaigns for broad audience learning, manual catalog sales campaigns for retargeting, and Reels ads for top-of-funnel reach. Creative is 80% of D2C ad performance — we produce 15-30 ad creatives per month per brand, test them rigorously, and scale the winners. Google Ads captures intent: Shopping ads for product searches, Search ads for brand and category keywords, and YouTube ads for awareness. A typical healthy D2C blend is 55% Meta, 25% Google, 15% marketplace, 5% influencer.',
      'Phase three is marketplace ops. For most Indian D2C brands, Amazon and Flipkart account for 30-60% of revenue. We manage marketplace advertising (Sponsored Products, Sponsored Brands, Sponsored Display), optimise listings with keyword-rich titles and A+ content, manage inventory and pricing, and run festival and Big Billion Days / Great Indian Festival campaigns that often deliver 4-8x a brand\'s average daily revenue in a single week.',
      'Phase four — and the one that separates winners from losers — is retention. Acquiring a new customer in D2C costs Rs 800-2,500 depending on category. A repeat order from an existing customer costs Rs 50-150. The maths is brutal and clear: brands that retain win. We build retention engines using WhatsApp marketing (abandoned cart recovery, post-purchase care, replenishment reminders), email marketing (welcome series, educational content, win-back flows), and loyalty programs. For a skincare D2C brand we work with, retention now accounts for 42% of monthly revenue — revenue that costs almost nothing to acquire.',
      'Phase five is measurement and unit economics. We track CAC (customer acquisition cost), AOV (average order value), contribution margin, repeat rate, and LTV (lifetime value) for every brand we run. The rule we live by: LTV:CAC must be at least 3:1 for the brand to be sustainable. If it is 1:1, the brand is bleeding. If it is 2:1, the brand is barely surviving. At 4:1 or above, the brand can scale aggressively. We have taken brands from 1.2:1 to 3.6:1 in six months by raising AOV through bundling, lifting repeat rate through retention flows, and cutting wasted ad spend through creative testing.',
      'Finally, brand. Performance marketing without brand building is a treadmill — you stop spending, you stop selling. We layer in influencer marketing (micro and nano influencers for authentic reach), content marketing (YouTube, Instagram), PR, and community building so the brand compounds in value over time. A D2C brand that invests in brand alongside performance sees CAC drop 20-35% over 12 months as organic and direct traffic grow. This is how we built a Bangalore D2C brand from zero to 500+ orders per month — and then to a profitable, defensible business. If you are a D2C founder or e-commerce head, let us audit your funnel and build a growth plan that respects your unit economics.',
    ],
  },

  /* ══════════════ 4. Digital Marketing for Manufacturing & B2B ══════════════ */
  {
    id: 'digital-marketing-manufacturing-b2b',
    slug: 'digital-marketing-for-manufacturing-and-b2b-companies-india',
    title: 'Digital Marketing for Manufacturing & B2B: Winning Industrial Buyers Online',
    category: 'Digital Marketing',
    contentType: 'Deep Dive',
    readTime: '8 min',
    date: 'Nov 5, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Manufacturing & B2B',
    summary:
      'Why manufacturers and B2B companies in India can no longer ignore digital marketing — LinkedIn ads, technical SEO, IndiaMART/TradeIndia optimisation, and account-based marketing for industrial sales.',
    keywords: [
      'B2B digital marketing India',
      'manufacturing marketing',
      'industrial SEO',
      'LinkedIn ads B2B',
      'IndiaMART optimisation',
      'account based marketing',
    ],
    tags: ['Manufacturing', 'B2B', 'LinkedIn', 'SEO', 'Lead Generation'],
    fullContent: [
      'For decades, manufacturing and B2B companies in India grew on relationships, trade shows, distributor networks, and word-of-mouth. Digital marketing was something "consumer brands did". That world is gone. Today, 71% of B2B buyers start their research online, 60% of the buying journey is complete before a buyer ever speaks to a sales rep, and the average B2B deal involves 6-10 decision makers — all of whom Google your company before taking a meeting. A manufacturer without a strong digital presence is invisible to the next generation of procurement managers. At BizMeals, we help manufacturing and B2B companies across Karnataka and Tamil Nadu build digital pipelines that feed their sales teams with qualified industrial leads.',
      'The first lever is a website that does not look like it was built in 2008. Your website is the first impression for every procurement manager, every distributor, every OEM buyer. It must clearly state what you make, who you serve, what certifications you hold (ISO, ISI, CE), your production capacity, your client logos, and an easy way to request a quote or sample. We rebuild manufacturer websites with technical product catalogues, downloadable spec sheets, case studies of past projects, and a clean RFQ (request-for-quote) flow that routes enquiries directly to your sales team. A good B2B website is not a brochure — it is a 24/7 sales development rep.',
      'The second lever is technical SEO. B2B buyers search in specific, technical ways: "stainless steel 316L pipe manufacturer Bangalore", "CNC machining job work Peenya", "electrical panel board supplier Karnataka". We create product pages and location pages optimised for these exact searches, build out a blog that answers the technical questions your buyers ask, and earn backlinks from industry directories and associations. Over 9-12 months, this compounds into a steady stream of organic enquiries that cost nothing to acquire. For a Peenya-based CNC machining shop, organic SEO now delivers 25+ qualified RFQs per month.',
      'The third lever is IndiaMART, TradeIndia, and Google Business Profile optimisation. These platforms are where Indian B2B buyers actually search. We optimise your listings with the right product categories, accurate specifications, competitive pricing, high-quality product photos, prompt response times, and verified-buyer targeting. A well-run IndiaMART presence can deliver 40-80 enquiries per month for a mid-sized manufacturer — but most companies leave their listings half-complete and lose those enquiries to better-optimised competitors.',
      'The fourth lever is LinkedIn Ads and account-based marketing (ABM). For manufacturers selling to other businesses (OEMs, large contractors, government tenders), LinkedIn is the most precise B2B ad platform on earth. We run ABM campaigns that target specific companies (by name), specific job titles (Procurement Manager, Plant Head, Sourcing Lead), and specific industries. Ads appear in their LinkedIn feed, drive them to a tailored landing page, and follow them with retargeting across the web. For a manufacturer of industrial valves, this approach delivered meetings with 14 target accounts in 60 days — accounts that traditional cold-calling had failed to crack for two years.',
      'The fifth lever is content and trust building. B2B buyers need proof. We produce case studies of past projects, client testimonials, factory walkthrough videos, certification showcases, and technical comparison guides. A buyer who downloads your "Stainless Steel Grade Selection Guide" is a buyer in research mode — we capture their email, nurture them with relevant content, and route them to sales when they show buying intent. This is how industrial marketing works in 2025: it is helpful, technical, patient, and measurable.',
      'Finally, CRM and measurement. Every enquiry — from your website, IndiaMART, phone, email, WhatsApp — flows into one CRM. You see which source produced which RFQ, which RFQ became a quote, which quote became an order, and what revenue each channel generated. No more guessing whether your marketing is working. For a Bangalore industrial automation manufacturer we work with, this clarity helped them shift budget from a low-performing trade show (Rs 4 lakh spend, 2 orders) into LinkedIn ABM (Rs 4 lakh spend, 11 orders). That is what data-driven B2B marketing delivers. If you run a manufacturing or B2B business, talk to us about building your digital sales pipeline.',
    ],
  },

  /* ══════════════ 5. Digital Marketing for Restaurants (Quick Insight) ══════════════ */
  {
    id: 'digital-marketing-restaurants',
    slug: 'digital-marketing-for-restaurants-and-cloud-kitchens',
    title: 'Digital Marketing for Restaurants & Cloud Kitchens: Butts in Seats and Orders on Apps',
    category: 'Digital Marketing',
    contentType: 'Quick Insight',
    readTime: '4 min',
    date: 'Oct 30, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Restaurants & Hospitality',
    summary:
      'A fast, practical guide to restaurant and cloud kitchen marketing in India — Instagram Reels, Zomato/Swiggy optimisation, Google Business Profile, and local influencer marketing that fills tables.',
    keywords: [
      'restaurant marketing India',
      'cloud kitchen marketing',
      'Zomato Swiggy optimisation',
      'restaurant Instagram',
      'food business marketing',
    ],
    tags: ['Restaurants', 'Instagram', 'Zomato', 'Swiggy', 'Local SEO'],
    fullContent: [
      'Restaurants live and die on two things: footfall (for dine-in) and order volume (for delivery). Both are driven by visibility. A great restaurant that nobody can find is a restaurant that closes in 8 months. Here is the compact playbook we use at BizMeals for restaurants and cloud kitchens across Bangalore.',
      'One: Google Business Profile. When someone searches "biryani near me" or "best cafe in Koramangala", Google shows three results. If you are not one of them, you lose 60% of nearby diners. Optimise your GBP with accurate cuisine categories, photos of your top 10 dishes, full menu PDF, working hours, and a steady drip of customer reviews. Reply to every review — positive and negative — within 24 hours. This alone can lift dine-in enquiries by 30-50% in 60 days.',
      'Two: Instagram Reels. Food is visual. We produce 12-20 Reels per month per restaurant — behind-the-kitchen footage, dish close-ups, chef stories, customer reactions, and limited-time offers. Reels reach 5-40x more accounts than static posts and are the single fastest way to build a local food brand. One cloud kitchen we work with went from 800 to 11,000 Instagram followers in 90 days using this approach.',
      'Three: Zomato and Swiggy optimisation. For cloud kitchens, the aggregator is your storefront. Optimise your menu titles with search keywords ("Hyderabadi Chicken Dum Biryani" not just "Chicken Biryani"), use high-quality dish photos, run in-app ads during peak hours, and maintain a 4.0+ rating by handling negative reviews fast. Aggregator ads typically deliver Rs 6-12 in revenue for every Rs 1 spent when run correctly.',
      'Four: local influencer marketing. Pay 5-10 micro food bloggers (5k-50k followers) per quarter to review your restaurant. Their content reaches the exact local audience you want and lives on their profile for months. Cost: Rs 1,500-8,000 per blogger — far cheaper than a single newspaper ad and 20x more targeted.',
      'Five: WhatsApp offers to existing customers. Build a WhatsApp list of every diner who has visited. Send them a weekly offer — "Wednesday wings at 50% off", "Weekend family combo Rs 599". Existing customers reorder 3-5x more than new ones. This is the cheapest revenue you will ever generate. If you run a restaurant, cafe, or cloud kitchen, talk to us about a 30-day growth sprint.',
    ],
  },

  /* ══════════════ 6. Digital Marketing for Education & EdTech (Quick Insight) ══════════════ */
  {
    id: 'digital-marketing-education-edtech',
    slug: 'digital-marketing-for-education-and-edtech-brands',
    title: 'Digital Marketing for Education & EdTech: Filling Classrooms and Course Seats',
    category: 'Digital Marketing',
    contentType: 'Quick Insight',
    readTime: '5 min',
    date: 'Oct 24, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Education & EdTech',
    summary:
      'A practical guide to education marketing in India — Meta lead ads for admissions, YouTube for trust building, SEO for course discovery, and WhatsApp nurturing that converts enquiries into enrolled students.',
    keywords: [
      'education marketing India',
      'EdTech marketing',
      'school admissions marketing',
      'course lead generation',
      'education SEO',
    ],
    tags: ['Education', 'EdTech', 'YouTube', 'Lead Generation', 'WhatsApp'],
    fullContent: [
      'Education is a high-trust, high-consideration purchase — whether it is a parent choosing a school for their child or a working professional choosing an upskilling course. The decision cycle is long, the stakes are high, and the buyer needs proof at every step. At BizMeals, we help schools, coaching centres, colleges, and EdTech brands build digital pipelines that turn enquiries into enrolled students.',
      'One: Meta Lead Ads for admissions. During admission season, we run Meta lead-form ads targeted at parents (for K-12) or professionals (for upskilling) in your city. Lead forms on Facebook and Instagram convert at 12-25% — far higher than landing pages — because they auto-fill user details and reduce friction. Cost per lead: Rs 35-150 depending on course fee and audience. For a Bangalore playschool chain, this delivered 480 admission enquiries in 45 days.',
      'Two: YouTube for trust building. Education buyers watch before they buy. We produce YouTube videos — campus tours, faculty interviews, student success stories, sample classes, and "day in the life" content — that build trust over the consideration window. A prospective parent who watches 3-5 of your videos is 4x more likely to book a school visit than one who only sees an ad.',
      'Three: SEO for course discovery. "Best digital marketing course in Bangalore", "CBSE schools near HSR Layout", "UPSC coaching in Jayanagar" — these are high-intent searches that, when captured, deliver enrolled students at near-zero acquisition cost. We build location pages, course pages, comparison pages, and an education blog that answers the questions your prospective students are Googling.',
      'Four: WhatsApp nurturing. Most education leads do not convert on the first contact. They need 5-8 touchpoints. We build WhatsApp nurture flows that send prospectives a brochure, a video tour, a fee structure, a scholarship offer, a deadline reminder, and a final "last few seats" push over 14-21 days. This lifts conversion from enquiry to enrolment by 30-60% versus single-touch follow-up.',
      'Five: retargeting. 96% of website visitors do not convert on the first visit. We retarget them across Meta, Google Display, and YouTube with testimonials, success stories, and limited-time admission offers. Retargeting is the cheapest way to recover lost enrolments — typically Rs 2-4 per click versus Rs 30-80 for cold acquisition. If you run an education institution or EdTech brand, talk to us about an admissions growth plan.',
    ],
  },

  /* ══════════════ 7. CASE STUDY — Real Estate 3.2x Leads ══════════════ */
  {
    id: 'case-study-realestate-3x-leads',
    slug: 'case-study-how-we-scaled-bangalore-real-estate-developer-3-2x-leads',
    title: 'Case Study: How We Scaled a Bangalore Real Estate Developer to 3.2x Leads in 90 Days',
    category: 'Case Studies',
    contentType: 'Deep Dive',
    readTime: '7 min',
    date: 'Oct 18, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Real Estate',
    summary:
      'A real Bangalore real estate developer case study — how BizMeals rebuilt their lead pipeline with Meta ads, project landing pages, and a CRM-driven sales process, taking them from 120 to 380+ qualified leads per month.',
    keywords: [
      'real estate case study Bangalore',
      'property lead generation case study',
      'real estate marketing ROI',
      'developer marketing India',
      'BizMeals case study',
    ],
    tags: ['Case Study', 'Real Estate', 'Meta Ads', 'CRM', 'Lead Generation'],
    fullContent: [
      'This is a real case study from our portfolio. The client is a mid-sized real estate developer in North Bangalore with two under-construction residential projects — a 1.2-1.8 crore 3BHK tower and a 65-lakh-1.2 crore 2BHK gated community. When they came to BizMeals in early 2024, they were spending Rs 3.5 lakh per month on digital ads but getting only 120-140 leads, of which 70% were unqualified. Their cost per qualified lead was Rs 2,800 — far too high for their price band. They were frustrated, distrustful of agencies, and considering going back to traditional brokers.',
      'The diagnosis was clear. They had three problems: a single generic landing page for both projects (which confused buyers and tanked conversion), unstructured ad targeting (one campaign targeting all of Bangalore with 12 ad sets competing for the same budget), and no CRM (leads lived in a WhatsApp group and an Excel sheet — half were never called). Any one of these would sink a real estate campaign. All three together explained the 2,800-rupee cost per qualified lead.',
      'Our first move was rebuilding the foundation. We created two dedicated project landing pages — one per project — each with floor plans, location advantages, RERA details, a 90-second walkthrough video, an interactive price calculator, and a single "Book Site Visit" CTA. We connected both pages to a shared CRM with auto-lead-distribution: every new lead was assigned to a sales rep within 90 seconds and triggered an automated WhatsApp message confirming the booking. Speed-to-lead is the single biggest lever in real estate conversion, and we built the system to enforce it.',
      'Second, we restructured the ad account. We killed the 12 competing ad sets and replaced them with 3 focused campaigns: a Meta lead-form campaign targeting premium audiences (income-tiered, interest in luxury real estate, age 32-55), a Google Search campaign bidding on hyper-specific project-and-location keywords, and a Meta retargeting campaign that followed website visitors across Instagram and Facebook with site-visit offers. We produced 22 fresh ad creatives in the first 30 days — carousel images, reels of the project site, testimonial videos from early buyers, and floor-plan graphics — and tested them rigorously.',
      'Third, we built a lead qualification layer. Every lead form included 4 questions (budget, location preference, possession timeline, current residence). Leads that matched the project profile were marked "hot" and called within 5 minutes. Leads that did not match were routed to a separate nurture flow and re-targeted for the lower-priced project. This single change cut wasted sales calls by 60% and freed the sales team to focus on leads that could actually buy.',
      'The results came fast. In the first 30 days, qualified leads rose from 120 to 240 per month. By day 60, they were at 310. By day 90, the developer was receiving 380+ qualified leads per month — a 3.2x increase — at a cost per qualified lead of Rs 940 (down from Rs 2,800). Site-visit bookings rose from 18 per month to 64 per month. And bookings? They went from 4 per month to 11 per month in the same 90-day window. The developer\'s sales team, which had been demoralised, was energised — and the developer expanded the engagement to cover their next two upcoming projects.',
      'The lesson from this case study is not that Meta ads are magic. It is that real estate marketing wins when the entire system works together — landing pages, ad structure, lead qualification, CRM, speed-to-lead, and creative testing. Most agencies fix one piece and leave the rest broken. BizMeals fixes the whole system, measures it end-to-end, and reports results in revenue, not impressions. If you are a real estate developer or broker and want this kind of system built for your projects, talk to us about a growth plan.',
    ],
  },

  /* ══════════════ 8. CASE STUDY — D2C 500+ Orders ══════════════ */
  {
    id: 'case-study-d2c-500-orders',
    slug: 'case-study-from-zero-to-500-orders-d2c-brand',
    title: 'Case Study: From Zero to 500+ Orders/Month — How We Built a Profitable D2C Brand',
    category: 'Case Studies',
    contentType: 'Deep Dive',
    readTime: '8 min',
    date: 'Oct 12, 2025',
    author: 'BizMeals Growth Team',
    industry: 'E-Commerce & D2C',
    summary:
      'A real D2C case study — how BizMeals took a Bangalore skincare brand from launch to 500+ orders per month with a 3.6:1 LTV:CAC ratio, performance marketing, and a WhatsApp retention engine.',
    keywords: [
      'D2C case study India',
      'skincare brand marketing',
      'D2C growth case study',
      'e-commerce scaling India',
      'D2C unit economics',
    ],
    tags: ['Case Study', 'D2C', 'Performance Marketing', 'Retention', 'Skincare'],
    fullContent: [
      'This is a real D2C brand case study from our portfolio. The client launched a clean-ingredient skincare brand in Bangalore in mid-2023 with an initial investment of Rs 18 lakh and a Shopify store. They approached BizMeals three months after launch — they had done 92 orders total, all from friends and family and a single influencer post. Their Meta ads were burning Rs 1,200 per order. They were about to run out of cash. Here is what we did over the next seven months.',
      'Month one was diagnosis and foundation. We audited their store and found three conversion killers: product pages loaded in 4.2 seconds (mobile users were bouncing), no reviews on any product, and a 4-step checkout that lost 38% of users. We rebuilt the store with a faster theme (1.8-second load time), added a review app and seeded it with their early customer reviews, simplified checkout to a single page with UPI and COD, and added a prepaid 5% discount to nudge users away from COD (which has 25% RTO — return to origin — rate). Store conversion rate jumped from 1.1% to 2.6% in 21 days, before any new ad spend.',
      'Month two was creative production and ad account restructuring. We shot 18 ad creatives in two days — founder-voice UGC, ingredient close-ups, before/after testimonials, application demos, and myth-busting reels. We restructured the Meta ad account into three campaigns: Advantage+ Shopping for broad learning, retargeting for website visitors, and a prospecting campaign with 4 distinct audiences. We also launched Google Shopping ads for their brand and category keywords. By the end of month two, they were at 145 orders with CAC down to Rs 640.',
      'Months three and four were scale and retention. We scaled winning creatives, killed losers, and produced 8-12 new creatives per week to combat creative fatigue. Critically, we built the retention engine: a 7-flow WhatsApp sequence (welcome, abandoned cart, post-purchase care, replenishment reminder at day 25, cross-sell, win-back at day 60, and birthday offer) plus an email welcome series. By month four, repeat orders accounted for 28% of monthly revenue — revenue that cost nearly nothing to acquire.',
      'Months five and six were marketplace and brand. We launched them on Amazon with optimised listings, A+ content, and Sponsored Products ads. Amazon now contributes 22% of monthly revenue. We also ran a micro-influencer campaign — 12 nano-influencers (5k-30k followers) paid in product plus a small fee — that produced 38 pieces of UGC, drove 2,800 sessions to the store, and delivered 64 orders directly attributable to influencer content. More importantly, the UGC fed back into our paid ad creative library, lowering CAC further.',
      'Month seven was where it all compounded. The brand hit 500+ orders per month (538 to be exact), with a blended CAC of Rs 480, an AOV of Rs 1,150, and a repeat rate of 38%. The LTV:CAC ratio stood at 3.6:1 — healthy, scalable, and profitable. The founder was no longer anxious about cash; she was planning the next product line. The brand had moved from survival to compounding growth.',
      'The lesson: D2C success is not about a single tactic. It is about the whole system — a fast, conversion-optimised store; a rigorous creative testing engine; a balanced paid channel mix; a marketplace strategy; and, most importantly, a retention engine that turns one-time buyers into repeat customers. Skip any one of these and the unit economics collapse. Build them all and the brand compounds. If you are a D2C founder — whether pre-launch or post-launch and stuck — talk to us about a growth plan that respects your unit economics.',
    ],
  },

  /* ══════════════ 9. Startup Building Mistakes ══════════════ */
  {
    id: 'startup-building-mistakes-year-one',
    slug: '5-startup-building-mistakes-that-kill-growth-in-year-one',
    title: '5 Startup Building Mistakes That Kill Growth in Year One',
    category: 'Startup Building',
    contentType: 'Deep Dive',
    readTime: '7 min',
    date: 'Oct 6, 2025',
    author: 'Manjunatha Reddy Polaka',
    industry: 'Startups',
    summary:
      'After 12 years of building and advising startups, here are the 5 mistakes we see founders make in year one that kill growth — and how to avoid them. Real examples from the BizMeals portfolio.',
    keywords: [
      'startup mistakes India',
      'startup building Bangalore',
      'founder mistakes year one',
      'startup growth strategy',
      'BizMeals startup advice',
    ],
    tags: ['Startups', 'Founders', 'Strategy', 'Lessons Learned'],
    fullContent: [
      'I have spent 12 years building businesses and advising founders across Bangalore. In that time, I have seen the same five mistakes repeat themselves in year one — mistakes that quietly kill growth, drain cash, and break founder morale. None of them are about the product. All of them are about how the founder thinks, decides, and spends. If you are in your first year of building a startup, read this carefully. Avoiding even one of these can be the difference between surviving year one and closing shop.',
      'Mistake one: building before validating. Too many founders spend 6-9 months and 8-15 lakh rupees building a product before they have spoken to 50 paying customers. They fall in love with the solution before proving the problem. The right sequence is the opposite — talk to 50 potential customers first, charge 5-10 of them for a manual version of the product, and only then build. At BizMeals, when we incubate a new service line, we sell it manually to 5 clients before we systemise it. If 5 people will not pay for it manually, 5,000 will not pay for it automated.',
      'Mistake two: optimising for fundraising instead of revenue. Some founders build pitch-deck-first companies — every decision is filtered through "will investors like this?". The result is a business that looks good on slides but does not have real customers paying real money. Investors are not fools; they can smell the difference between revenue and theatre. Build a business that customers love first. Fundraising becomes far easier when you have real numbers — and if you never fundraise, you still have a real business. We have bootstrapped service lines at BizMeals to profitability before ever considering external capital.',
      'Mistake three: hiring too fast, especially in sales and marketing. Year-one founders often hire a "marketing head" or "sales head" at Rs 80,000-1,50,000 per month expecting them to bring in customers. The reality: a senior hire without a proven go-to-market motion will burn 3-6 months of salary before producing anything. The founder should be the first salesperson and the first marketer. Only hire when the founder has personally cracked the go-to-market and the hire is to scale a proven motion, not to figure it out. We have seen founders burn 18 months of runway on premature sales hires.',
      'Mistake four: spending on the wrong things. Year-one spending should go into three buckets: building the product, getting customers, and serving those customers well. Instead, founders spend on office space, fancy branding, premature team building, conferences, and "tools". A co-working desk, a clean logo, and a focused team of 2-3 is enough to get to your first 100 customers. Everything else is theatre. At BizMeals, our early years were lean — every rupee went into client work and the next client. That discipline is what let us survive and grow for 12 years.',
      'Mistake five: ignoring unit economics. The most fatal mistake. Founders track revenue and forget cost. They celebrate 100 orders without knowing what each order cost to acquire and what it earned over 90 days. A D2C brand selling a Rs 800 product at Rs 600 CAC and 35% margin is losing Rs 320 per order — and the more they scale, the more they lose. We have seen D2C brands burn Rs 50 lakh before realising their unit economics were upside-down. From day one, track CAC, AOV, contribution margin, repeat rate, and LTV. If the maths does not work, fix the maths before scaling. Scaling broken unit economics just makes you go broke faster.',
      'The thread connecting all five mistakes is this: year one is not about scaling. It is about proving. Proving the problem is real, proving customers will pay, proving the go-to-market works, proving the unit economics work, proving you (the founder) can sell and deliver. Once those are proven, scaling is execution. Skip the proving and you will scale a broken business into a bigger broken business. At BizMeals, we work with early-stage founders through our startup building consultancy — helping them avoid these mistakes, prove their model fast, and build a foundation that compounds. If you are a founder in year one, talk to us before you make any of these mistakes.',
    ],
  },

  /* ══════════════ 10. Founder's Playbook (Quick Insight) ══════════════ */
  {
    id: 'founders-playbook-brand-from-bangalore',
    slug: 'founders-playbook-building-a-brand-from-bangalore',
    title: "The Founder's Playbook: Building a Brand from Bangalore",
    category: 'Startup Building',
    contentType: 'Quick Insight',
    readTime: '4 min',
    date: 'Sep 30, 2025',
    author: 'Manjunatha Reddy Polaka',
    industry: 'Startups',
    summary:
      'A tactical playbook for building a brand from Bangalore — choosing your first 10 customers, pricing for credibility, and the discipline of saying no. From the founder of BizMeals.',
    keywords: [
      'founder playbook Bangalore',
      'building a brand India',
      'startup pricing strategy',
      'first 10 customers',
      'BizMeals founder',
    ],
    tags: ['Founders', 'Branding', 'Pricing', 'Strategy'],
    fullContent: [
      'I founded BizMeals in Bangalore over a decade ago. In that time, I have learned that building a brand is less about marketing and more about a series of small, disciplined decisions. Here is the playbook I wish I had on day one.',
      'Choose your first 10 customers carefully. They will define your brand more than any logo or ad campaign. If your first 10 customers are low-paying, high-maintenance clients who haggle on every invoice, your brand becomes a low-cost, high-effort brand — and you will struggle to escape that gravity. If your first 10 customers are quality clients who pay fairly, refer peers, and let you do your best work, your brand becomes a premium brand organically. We turned down early clients at BizMeals that did not fit. That discipline, painful at the time, is why we are still here.',
      'Price for credibility, not for closure. New founders underprice because they are afraid of losing the deal. The result: they close bad-fit clients who would not have paid more anyway, and they signal to good-fit clients that they are junior. Price 20-30% above what feels comfortable. You will lose some deals. You will win better ones. And your brand will read as premium from day one. At BizMeals, our pricing reflects the value we deliver, not the hours we spend. That single shift changed the kind of clients who walked through our door.',
      'Say no publicly. A brand that says yes to everyone stands for nothing. We publish what we do and what we do not do. We do not do cheap SEO packages. We do not do "viral" campaigns with no strategy. We do not take on clients whose products we do not believe in. Saying no publicly attracts the right clients and repels the wrong ones — which is exactly what a brand is supposed to do.',
      'Be visible, consistently. A founder who posts on LinkedIn twice a week for 12 months builds more brand equity than a founder who runs one Rs 5-lakh ad campaign. Share what you learn. Share what you believe. Share your clients\' wins (with permission). Visibility compounds — slowly at first, then suddenly. Most of our inbound leads today come from founder content published months or years ago.',
      'Deliver more than you promise. The single most powerful brand-building tool is a client who tells three other people about you. That only happens when you deliver more than they expected. Over-deliver on the first project, and you will not need to spend on ads for the second client — they will come to you. This is the slowest and most durable form of marketing, and it is how BizMeals became a 12-year business. If you are building a brand from Bangalore, talk to us — we help founders build brands that last.',
    ],
  },

  /* ══════════════ 11. SEO in 2025 (Quick Insight) ══════════════ */
  {
    id: 'seo-2025-what-still-works',
    slug: 'seo-in-2025-what-still-works-after-google-ai-overviews',
    title: "SEO in 2025: What Still Works After Google's AI Overviews",
    category: 'Tips & How-Tos',
    contentType: 'Quick Insight',
    readTime: '5 min',
    date: 'Sep 24, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Digital Marketing',
    summary:
      'Google AI Overviews changed SEO in 2024. Here is what still works in 2025 — topical authority, E-E-A-T, schema, original data, and hyper-local SEO — and what to stop wasting time on.',
    keywords: [
      'SEO 2025 India',
      'Google AI Overviews SEO',
      'E-E-A-T SEO',
      'local SEO strategy',
      'modern SEO tips',
    ],
    tags: ['SEO', 'Google', 'Content Strategy', 'Local SEO'],
    fullContent: [
      'Google AI Overviews rolled out across India in 2024, and the panic was immediate: "SEO is dead!" It is not. But it has changed more in the last 18 months than in the previous 8 years. Here is what still works in 2025 — and what to stop wasting your time on.',
      'What still works: topical authority. Google rewards sites that comprehensively cover a topic, not sites that publish one keyword-stuffed article per keyword. Build a topic cluster: one pillar page ("Digital Marketing for Real Estate") and 8-15 supporting articles ("Meta Ads for Real Estate", "Real Estate SEO", "Property Landing Page Best Practices") that all interlink. This signals depth. Depth wins in the AI Overviews era.',
      'What still works: E-E-A-T (Experience, Expertise, Authoritativeness, Trust). Google now explicitly rewards content with first-hand experience. A doctor writing about a medical procedure outranks a content mill writing about the same procedure. Author bios, real credentials, original photos, and signed articles all matter. At BizMeals, every article we publish is attributed to a real team member with real experience. That is why our content ranks.',
      'What still works: original data and research. AI Overviews cannot generate data that does not exist online. If you publish original survey data, original case study numbers, or original industry benchmarks, you become a primary source — and primary sources get cited, linked to, and ranked. Our case studies with real metrics (3.2x leads, 500+ orders, Rs 940 cost per lead) are some of our most-linked-to content.',
      'What still works: schema markup and technical SEO. Structured data (Article, FAQ, HowTo, Product, LocalBusiness schema) helps Google understand your content and feature it in rich results. Page speed, mobile-friendliness, clean site architecture, and proper indexing remain foundational. Ignore these and no amount of content will save you.',
      'What still works: hyper-local SEO. "Near me" searches have grown 3x in India since 2022. Google Business Profile optimisation, location-specific landing pages, local citations, and local reviews are the highest-ROI SEO work for any business serving a city or region. For our Bangalore clients, local SEO consistently delivers the cheapest leads of any channel.',
      'What to stop doing: keyword-stuffed content, bulk-published AI content without human review, low-quality directory links, PBN (private blog network) links, and chasing domain authority scores. These tactics either no longer work or actively harm you. SEO in 2025 rewards depth, authenticity, and usefulness. Write for humans first, structure for Google second, and you will be fine. If you want a 2025-ready SEO strategy for your business, talk to us.',
    ],
  },

  /* ══════════════ 12. Inside BizMeals — 12 Years (Deep Dive) ══════════════ */
  {
    id: 'inside-bizmeals-12-years-growth-partnering',
    slug: 'inside-bizmeals-12-years-of-growth-partnering',
    title: 'Inside BizMeals: 12 Years of Growth Partnering — What We Learned, What We Changed',
    category: 'BizMeals Experience',
    contentType: 'Deep Dive',
    readTime: '9 min',
    date: 'Sep 18, 2025',
    author: 'Manjunatha Reddy Polaka',
    industry: 'Agency',
    summary:
      'A transparent, behind-the-scenes look at 12 years of running BizMeals in Bangalore — the services that worked, the ones we killed, the lessons that shaped how we partner with clients today.',
    keywords: [
      'BizMeals story',
      'growth partner Bangalore',
      'agency lessons learned',
      'Manjunatha Reddy Polaka',
      'business growth partner India',
    ],
    tags: ['BizMeals', 'Agency', 'Lessons', 'Experience', 'Bangalore'],
    fullContent: [
      'BizMeals is 12 years old this year. That is a long time for any business, and an eternity for a marketing and growth agency in India, where most agencies die in their first 3 years. As we hit this milestone, I want to share — transparently — what we have learned, what we got wrong, what we changed, and what we believe today. This is not a marketing piece. It is a working document of lessons, written for the founders and business owners we serve.',
      'Year one to three: survival. Like most agencies, we started as a generalist shop. We said yes to everything — a logo here, a brochure there, a Facebook post pack, a website. We were busy and broke. The lesson: saying yes to everything means you become excellent at nothing. We were a generic agency competing with thousands of other generic agencies on price. By year three, we were exhausted and our margins were terrible. We made a decision that saved the company: we would specialise.',
      'Year four to six: specialisation. We picked three things to be genuinely excellent at: digital marketing, website development, and business growth consulting. We stopped saying yes to everything else. We referred design-only work to design studios. We referred pure-print work to print partners. We focused. The result was counterintuitive: by saying no to more work, we made more money. Specialist pricing is 3-5x generalist pricing. And specialist outcomes are better — which meant happier clients, more referrals, and a brand that started to mean something.',
      'Year seven to nine: becoming a partner, not a vendor. The next shift was cultural. Vendors deliver work and disappear. Partners sit with you, understand your business, and share risk in the outcome. We started offering retainers instead of one-off projects. We started reporting on revenue and pipeline, not impressions and clicks. We started pushing back on client ideas we knew would not work, even when it cost us the project. This shift was uncomfortable — it meant turning down clients who wanted a vendor, not a partner. But the clients who stayed became our best advocates, and our average client relationship length went from 4 months to 2.5 years.',
      'Year ten to twelve: building the full-stack growth partner. Today, BizMeals is what we call a "Business Growth Execution Partner". We do digital marketing (SEO, ads, social, content, email, WhatsApp). We do website design and development (D2C, real estate, healthcare, startups). We do D2C and e-commerce business management (marketplace ops, retention, unit economics). We do BPO services (stock auditing, payroll, financial accounting). We do consultancy (stock market advisory, startup building, real estate advisory, new project strategy). And we do community and event management. One partner. Six services. Full-stack growth.',
      'Why full-stack? Because we learned that fragmented growth fails. A client with a great website, no ads, no SEO, and no CRM gets nowhere. A client with great ads, a slow website, and no retention engine burns cash. The brands that win have all the pieces working together — and the cheapest, most reliable way to make all the pieces work together is to have one accountable partner, not six unaccountable vendors. That is the bet BizMeals is built on, and 12 years of client outcomes have proven it right.',
      'What we got wrong along the way: we underpriced our early years (and lost good team members to better-paying competitors). We said yes to a few large clients whose values did not match ours (and the relationships ended painfully). We tried to scale a service line before the system was ready (and delivered a worse experience to early clients of that line). Each mistake cost us — but each one also taught us a discipline we now apply to every new engagement. We do not take on clients whose products we do not believe in. We do not scale a service until the system can deliver it at quality. We do not underprice. These are not just policies; they are scar tissue.',
      'What we believe today: that growth is a system, not a campaign. That measurement is non-negotiable. That the right partner for a business is one who cares about the outcome more than the invoice. That Bangalore is one of the best cities in the world to build a growth business — and we are proud to be part of its story. That 12 years is a beginning, not an end. If you are a business owner in Bangalore (or anywhere in India) looking for a growth partner — not a vendor — we would like to meet you. This is what we do. This is who we are.',
    ],
  },

  /* ══════════════ 13. WhatsApp Marketing (Quick Insight) ══════════════ */
  {
    id: 'whatsapp-marketing-indian-smbs',
    slug: 'whatsapp-marketing-the-underrated-channel-for-indian-smbs',
    title: 'WhatsApp Marketing: The Underrated Growth Channel for Indian SMBs',
    category: 'Industry Insights',
    contentType: 'Quick Insight',
    readTime: '5 min',
    date: 'Sep 12, 2025',
    author: 'BizMeals Growth Team',
    industry: 'Cross-Industry',
    summary:
      'WhatsApp is where Indian customers actually live. Here is how SMBs use WhatsApp Business, broadcast lists, automated flows, and Click-to-WhatsApp ads to drive sales — with real numbers.',
    keywords: [
      'WhatsApp marketing India',
      'WhatsApp Business SMB',
      'Click to WhatsApp ads',
      'WhatsApp automation',
      'Indian small business marketing',
    ],
    tags: ['WhatsApp', 'SMBs', 'Automation', 'Marketing'],
    fullContent: [
      'India has over 500 million WhatsApp users — more than any other country on earth. For an Indian small business, WhatsApp is not a "channel". It is the channel. Yet most SMBs use WhatsApp reactively — answering customer messages one at a time — instead of as a proactive growth engine. Here is how we set up WhatsApp marketing for our SMB clients at BizMeals.',
      'One: WhatsApp Business setup done right. The free WhatsApp Business app gives you a business profile, catalogue, away messages, quick replies, and labels. Most SMBs install it and stop there. We set up the full profile (logo, description, hours, address), build the catalogue with all products and prices, configure greeting and away messages, and train the team to use labels (New, Pending, Paid, Closed) for pipeline tracking. This alone makes a small business look 10x more professional.',
      'Two: WhatsApp Business API for scale. Once a business is doing 50+ WhatsApp conversations a day, the free app breaks down. We migrate them to the WhatsApp Business API (via partners like Interakt, WATI, or AiSensy) which unlocks automated flows, broadcast campaigns, template messages, multi-agent inbox, and analytics. Cost: Rs 1,500-5,000 per month plus per-message fees. ROI: typically 5-15x within 60 days.',
      'Three: automated flows. We build flows for the highest-leverage moments: abandoned cart recovery (D2C), appointment reminders (healthcare, salons), order status updates (e-commerce), post-purchase care (all industries), replenishment reminders (consumables), and review requests (all industries). For a Bangalore salon chain, the appointment reminder flow alone reduced no-shows by 35% — recovering Rs 2.4 lakh per month in lost revenue.',
      'Four: broadcast campaigns. With the API, you can broadcast promotional messages to opted-in customers — a new product launch, a festival offer, a flash sale. Open rates on WhatsApp broadcast are 80-95% (versus 18-22% for email). Click-through rates are 15-40%. For a Bangalore restaurant, a single Wednesday broadcast ("50% off wings today") delivers 80-140 orders in a single afternoon. Cost per broadcast: Rs 200-800. Revenue per broadcast: Rs 15,000-40,000.',
      'Five: Click-to-WhatsApp ads on Meta. Instead of sending ad clicks to a landing page, send them straight to a WhatsApp chat. Conversion rates are 3-5x higher because the user is already in the conversation app they live in. For high-consideration purchases (real estate, education, healthcare, B2B services), Click-to-WhatsApp ads are the single best Meta ad format in India today. Lead cost: Rs 35-120 depending on industry. If you run an Indian SMB and are not using WhatsApp as a growth channel, you are leaving 30-50% of your potential revenue on the table. Talk to us about a WhatsApp marketing setup.',
    ],
  },

  /* ══════════════ 14. Why Most Agencies Fail Bangalore Businesses (Quick Insight) ══════════════ */
  {
    id: 'why-most-agencies-fail-bangalore',
    slug: 'why-most-agencies-fail-bangalore-businesses',
    title: 'Why Most Agencies Fail Bangalore Businesses (And How to Pick One That Will Not)',
    category: 'BizMeals Experience',
    contentType: 'Quick Insight',
    readTime: '5 min',
    date: 'Sep 6, 2025',
    author: 'Manjunatha Reddy Polaka',
    industry: 'Agency',
    summary:
      'After 12 years in Bangalore, here is why most marketing agencies fail local businesses — and the 5 questions to ask before you hire one. Written by the founder of BizMeals.',
    keywords: [
      'marketing agency Bangalore',
      'how to hire an agency India',
      'agency mistakes',
      'BizMeals founder advice',
      'choose a growth partner',
    ],
    tags: ['Agencies', 'Bangalore', 'Advice', 'Selection'],
    fullContent: [
      'Bangalore has over 4,000 marketing agencies. Most of them will fail your business. Not because they are dishonest — most are not — but because the agency model is structurally broken for most small and mid-sized businesses. After 12 years of running an agency in Bangalore, here is why most fail, and how to pick one that will not.',
      'Reason one: they sell deliverables, not outcomes. Most agencies price by the deliverable — 12 social posts, 4 ad campaigns, 1 website. The deliverable gets done. The outcome (revenue, leads, orders) does not. And the agency is not accountable for the outcome because they were never paid for it. Pick an agency that talks about outcomes first and deliverables second. If they cannot tell you what revenue their work produced for past clients, walk away.',
      'Reason two: they are generalists pretending to be specialists. An agency that claims to do "everything for everyone" usually does nothing well. Ask them: who is your ideal client? What industries do you turn down? What services do you not offer? A real specialist can answer all three instantly. A generalist will hedge. At BizMeals, we are clear: we work with Bangalore and India-based growth-stage businesses across six service lines, and we turn down one-off design work and pure-print work.',
      'Reason three: they do not measure. Ask an agency for past campaign numbers — cost per lead, conversion rate, ROAS, revenue influenced. If they give you impressions, reach, and engagement, they are not measuring what matters. Measurement is the single most reliable signal of agency quality. Agencies that measure care about outcomes. Agencies that report impressions care about invoices.',
      'Reason four: they rotate account managers. You meet the senior team in the pitch. A junior account manager shows up on day one. Three months later, a different junior. Your account knowledge never compounds. Ask the agency: who specifically will work on my account, how many accounts do they handle, and what is the average tenure of your account managers? At BizMeals, account continuity is a non-negotiable — the team that pitches is the team that delivers.',
      'Reason five: they cannot explain their work in plain language. If an agency hides behind jargon ("omni-channel synergy", "AI-driven optimisation", "synergistic content matrix"), they either do not understand their own work or are trying to confuse you. A real expert explains complex things simply. Ask them to explain their strategy for your business in 5 sentences. If they cannot, they do not have a strategy.',
      'The five questions to ask before hiring an agency: (1) Show me three clients you have grown — with revenue numbers, not impressions. (2) Who specifically will work on my account, and what is their tenure? (3) What is your measurement and reporting cadence — and can I see a sample report? (4) What industries and service types do you turn down? (5) If we part ways in 6 months, what do I walk away with — assets, data, learnings? If an agency answers all five clearly, they are worth a serious conversation. If they hedge on any, walk away. At BizMeals, we answer all five on the first call — because we believe that is what a real growth partner does. If you are evaluating agencies, talk to us. Even if we are not the right fit, we will tell you what to look for.',
    ],
  },
]

/* ───────────────────────── helpers ───────────────────────── */

const featuredPost = blogPosts.find(p => p.featured) ?? blogPosts[0]
const nonFeaturedPosts = blogPosts.filter(p => !p.featured)

/* ═════════════════════════════════════════════════════════════════════════
   BLOG DETAIL MODAL
   ═════════════════════════════════════════════════════════════════════════ */

function BlogDetailModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const { setCurrentPage } = usePage()
  const IconComp = categoryIconMap[post.category] || BookOpen
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleInternalLink = (page: string) => {
    onClose()
    setCurrentPage(page as 'services' | 'contact' | 'portfolio')
  }

  const renderContent = (text: string) => {
    const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g)
    return parts.map((part, idx) => {
      if (idx % 3 === 1) {
        return (
          <button
            key={idx}
            onClick={() => handleInternalLink(parts[idx + 1])}
            className="text-[#0F2557] hover:text-[#F5A623] underline underline-offset-2 decoration-[#0F2557]/40 hover:decoration-[#F5A623]/60 transition-colors duration-200 font-semibold"
          >
            {part}
          </button>
        )
      }
      if (idx % 3 === 2) return null
      return <span key={idx}>{part}</span>
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-start justify-center px-4 py-6 sm:py-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <div className="absolute inset-0 bg-[#0F2557]/70 backdrop-blur-sm" />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl shadow-[#0F2557]/30 border border-[#E5E9F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0F2557 0%, #1E3A8A 50%, #F5A623 100%)' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#EEF2FA] flex items-center justify-center text-[#5A6478] hover:text-[#0F2557] transition-all duration-200"
          aria-label="Close article"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable content */}
        <div className="max-h-[82vh] overflow-y-auto custom-scrollbar">
          <div className="p-6 sm:p-8 md:p-10">
            {/* Category badge + meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FA] border border-[#E5E9F0]">
                <IconComp className="w-3 h-3 text-[#0F2557]" />
                <span className="text-[11px] font-semibold text-[#0F2557]">{post.category}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30">
                <Sparkles className="w-3 h-3 text-[#F5A623]" />
                <span className="text-[11px] font-semibold text-[#B8770E]">{post.contentType}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5A6478]">
                <Clock className="w-3 h-3" />
                <span className="text-[11px] font-medium">{post.readTime}</span>
              </div>
              <span className="text-[11px] text-[#5A6478]/70">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#0F2557] leading-tight mb-4 sm:mb-5 pr-8">
              {post.title}
            </h1>

            {/* Author + industry */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-[#E5E9F0]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#0F2557]">{post.author}</span>
              </div>
              {post.industry && (
                <div className="flex items-center gap-1.5 text-[#5A6478]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{post.industry}</span>
                </div>
              )}
            </div>

            {/* Summary (SEO meta) */}
            <div className="mb-6 px-4 py-3 rounded-xl bg-[#F5F7FA] border-l-4 border-[#F5A623]">
              <p className="text-sm text-[#1A1A1A] leading-relaxed font-medium">{post.summary}</p>
            </div>

            {/* Full content */}
            <div className="space-y-4 sm:space-y-5 mb-7">
              {post.fullContent.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-[15px] text-[#3A4252] leading-relaxed">
                  {renderContent(paragraph)}
                </p>
              ))}
            </div>

            {/* SEO Keywords */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-3.5 h-3.5 text-[#0F2557]" />
                <span className="text-[11px] font-bold text-[#0F2557] uppercase tracking-wider">Related Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full bg-[#EEF2FA] text-[11px] font-medium text-[#0F2557] border border-[#E5E9F0]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-[11px] font-bold text-[#0F2557] uppercase tracking-wider">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#FDF7EC] text-[11px] font-medium text-[#B8770E] border border-[#F5A623]/30"
                  >
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA section */}
            <div className="rounded-2xl p-6 sm:p-7 border border-[#E5E9F0] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  Ready to put this into action?
                </h3>
                <p className="text-sm text-white/80 mb-5 leading-relaxed">
                  BizMeals builds growth systems for Bangalore and India-based businesses. Talk to us about a free growth plan tailored to your industry.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => handleInternalLink('contact')}
                    className="btn-cta border-0 font-bold px-5 py-3 text-sm rounded-xl h-auto cursor-pointer"
                  >
                    Get Free Growth Plan
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <Button
                    onClick={() => handleInternalLink('services')}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white font-semibold px-5 py-3 text-sm rounded-xl h-auto cursor-pointer"
                  >
                    Explore Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   BLOG PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function BlogPage() {
  const { setCurrentPage } = usePage()
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [activeType, setActiveType] = useState<ContentType>('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const postsRef = useRef<HTMLDivElement>(null)
  const postsInView = useInView(postsRef, { once: true, margin: '-80px' })

  const newsletterRef = useRef<HTMLDivElement>(null)
  const newsletterInView = useInView(newsletterRef, { once: true, margin: '-80px' })

  const filteredPosts = blogPosts.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory
    const typeMatch = activeType === 'All' || p.contentType === activeType
    return catMatch && typeMatch
  })

  const closeModal = useCallback(() => setSelectedPost(null), [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  /* ═══════════════════════════════════════════════════════
     1. HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-navy-section"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#1E3A8A]/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[350px] h-[350px] rounded-full bg-[#F5A623]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 mb-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-[#F5A623] transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3 h-3" />
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-white font-semibold">Blog &amp; Insights</span>
          </motion.div>

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <BookOpen className="w-4 h-4 text-[#F5A623]" />
              <span className="text-xs font-bold tracking-widest uppercase text-white">
                Insights · Case Studies · Growth Playbooks
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5 text-white"
          >
            Growth Insights, Straight From
            <span className="block text-[#F5A623]">the Engine Room</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-8"
          >
            Deep-dive articles, real case studies with real numbers, and tactical insights on digital marketing, startup building, and business growth — written by the BizMeals team for founders and business owners across India.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{blogPosts.length}</div>
              <div className="text-xs text-white/60 font-medium mt-1">Articles</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{categories.length - 1}</div>
              <div className="text-xs text-white/60 font-medium mt-1">Categories</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">6+</div>
              <div className="text-xs text-white/60 font-medium mt-1">Industries Covered</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">12+</div>
              <div className="text-xs text-white/60 font-medium mt-1">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. FEATURED POST
     ═══════════════════════════════════════════════════════ */

  const renderFeatured = () => {
    const IconComp = categoryIconMap[featuredPost.category] || BookOpen
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-3xl overflow-hidden border border-[#E5E9F0] shadow-xl shadow-[#0F2557]/5"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left — content */}
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623] text-[#0F2557]">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Featured</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    <IconComp className="w-3 h-3 text-white" />
                    <span className="text-[11px] font-semibold text-white">{featuredPost.category}</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>
                <div className="flex items-center gap-4 mb-6 text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{featuredPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{featuredPost.date}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="btn-cta border-0 font-bold px-6 py-3 text-sm rounded-xl h-auto w-fit cursor-pointer"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>

              {/* Right — visual */}
              <div className="relative bg-[#F5F7FA] p-7 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[300px]">
                <div className="absolute top-6 right-6 opacity-10">
                  <IconComp className="w-32 h-32 text-[#0F2557]" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E9F0] mb-4">
                    <Target className="w-3 h-3 text-[#F5A623]" />
                    <span className="text-[11px] font-bold text-[#0F2557] uppercase tracking-wider">{featuredPost.industry}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1A1A1A] font-medium">Local SEO for patient discovery</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1A1A1A] font-medium">Google & Meta Ads for appointments</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1A1A1A] font-medium">Reviews & reputation management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1A1A1A] font-medium">WhatsApp automation for retention</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#E5E9F0]">
                    <p className="text-xs text-[#5A6478] font-medium mb-1">What you will learn:</p>
                    <p className="text-sm text-[#0F2557] font-semibold">A 4-pillar playbook to grow patient footfall — backed by real campaign numbers.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  /* ═══════════════════════════════════════════════════════
     3. FILTERS + GRID
     ═══════════════════════════════════════════════════════ */

  const renderFiltersAndGrid = () => (
    <section ref={postsRef} className="py-12 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2557] mb-2">
            Browse the Library
          </h2>
          <p className="text-sm sm:text-base text-[#5A6478] max-w-xl mx-auto">
            Filter by category or content type. Every article includes real numbers, tactical takeaways, and a clear next step.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {categories.map((cat) => {
            const count = cat === 'All' ? blogPosts.length : blogPosts.filter(p => p.category === cat).length
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#0F2557] text-white border-[#0F2557] shadow-md shadow-[#0F2557]/20'
                    : 'bg-white text-[#5A6478] border-[#E5E9F0] hover:border-[#0F2557]/30 hover:text-[#0F2557]'
                }`}
              >
                {cat} <span className={`ml-1 ${active ? 'text-white/60' : 'text-[#5A6478]/50'}`}>({count})</span>
              </button>
            )
          })}
        </div>

        {/* Content type toggle */}
        <div className="flex items-center justify-center gap-1 mb-10">
          <span className="text-xs font-semibold text-[#5A6478] mr-2">Type:</span>
          {contentTypes.map((type) => {
            const active = activeType === type
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#F5A623] text-[#0F2557]'
                    : 'text-[#5A6478] hover:text-[#0F2557] hover:bg-white'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EEF2FA] mb-4">
                <BookOpen className="w-8 h-8 text-[#0F2557]/40" />
              </div>
              <p className="text-base font-semibold text-[#0F2557] mb-1">No articles in this filter yet</p>
              <p className="text-sm text-[#5A6478] mb-5">New articles are published every week. Try a different filter.</p>
              <Button
                onClick={() => { setActiveCategory('All'); setActiveType('All') }}
                variant="outline"
                className="border-[#0F2557]/30 text-[#0F2557] hover:bg-[#0F2557] hover:text-white font-semibold cursor-pointer"
              >
                Show All Articles
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeCategory}-${activeType}`}
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredPosts.map((post, i) => {
                const IconComp = categoryIconMap[post.category] || BookOpen
                return (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-white rounded-2xl border border-[#E5E9F0] p-5 cursor-pointer transition-shadow hover:shadow-xl hover:shadow-[#0F2557]/10 hover:border-[#0F2557]/20 flex flex-col"
                  >
                    {/* Top row: category + type */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF2FA]">
                        <IconComp className="w-3 h-3 text-[#0F2557]" />
                        <span className="text-[10px] font-bold text-[#0F2557]">{post.category}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.contentType === 'Deep Dive'
                          ? 'bg-[#FDF7EC] text-[#B8770E]'
                          : 'bg-[#EEFBF5] text-[#0F7B5C]'
                      }`}>
                        {post.contentType}
                      </span>
                    </div>

                    {/* Industry tag */}
                    {post.industry && (
                      <div className="mb-3">
                        <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-wider">{post.industry}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#0F2557] leading-snug mb-3 group-hover:text-[#1E3A8A] transition-colors line-clamp-3">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[#5A6478] leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {post.summary}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E9F0]">
                      <div className="flex items-center gap-3 text-[#5A6478]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-[11px] font-medium">{post.readTime}</span>
                        </span>
                        <span className="text-[11px]">{post.date}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0F2557] group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. INDUSTRY COVERAGE STRIP
     ═══════════════════════════════════════════════════════ */

  const renderIndustries = () => {
    const industries = [
      { icon: Heart, label: 'Healthcare', desc: 'Clinics & Hospitals' },
      { icon: Building2, label: 'Real Estate', desc: 'Developers & Brokers' },
      { icon: ShoppingBag, label: 'E-Commerce & D2C', desc: 'Brands & Marketplaces' },
      { icon: Factory, label: 'Manufacturing', desc: 'B2B & Industrial' },
      { icon: UtensilsCrossed, label: 'Restaurants', desc: 'Dine-in & Cloud Kitchens' },
      { icon: GraduationCap, label: 'Education', desc: 'Schools & EdTech' },
    ]
    return (
      <section className="py-12 sm:py-14 bg-white border-y border-[#E5E9F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F2557] mb-2">
              Digital Marketing Playbooks, by Industry
            </h2>
            <p className="text-sm text-[#5A6478]">We write what we know. Every industry article is backed by real client work.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F5F7FA] border border-[#E5E9F0] hover:border-[#F5A623]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#0F2557] flex items-center justify-center mb-2">
                  <ind.icon className="w-5 h-5 text-[#F5A623]" />
                </div>
                <span className="text-xs font-bold text-[#0F2557]">{ind.label}</span>
                <span className="text-[10px] text-[#5A6478] mt-0.5">{ind.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  /* ═══════════════════════════════════════════════════════
     5. NEWSLETTER
     ═══════════════════════════════════════════════════════ */

  const renderNewsletter = () => (
    <section ref={newsletterRef} className="py-14 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-[#E5E9F0]"
          style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F5A623]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl" />
          <div className="relative z-10 p-8 sm:p-10 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5A623] mb-5">
              <Mail className="w-7 h-7 text-[#0F2557]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Get the Growth Newsletter
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
              One actionable growth insight every week. Real case studies, real numbers, no fluff. Join 1,200+ founders and business owners across India.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/95 border border-white/20 text-sm text-[#0F2557] placeholder:text-[#5A6478]/60 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
              <Button
                type="submit"
                className="btn-cta border-0 font-bold px-6 py-3 text-sm rounded-xl h-auto cursor-pointer whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1.5" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            <p className="text-[11px] text-white/50 mt-4">No spam. Unsubscribe anytime. We respect your inbox.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. FINAL CTA
     ═══════════════════════════════════════════════════════ */

  const renderFinalCTA = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30 mb-5">
            <Quote className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold text-[#B8770E] uppercase tracking-wider">Not an Agency. A Growth Partner.</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 leading-tight">
            Like what you read?
            <span className="block text-[#F5A623]">Let us build your growth story.</span>
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto mb-8 leading-relaxed">
            These articles are not theory — they are the exact playbooks we use to grow our clients&apos; businesses. Get a free growth plan tailored to your industry, your numbers, and your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => setCurrentPage('contact')}
              className="btn-cta border-0 font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
            >
              Get Free Growth Plan
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              onClick={() => setCurrentPage('services')}
              variant="outline"
              className="border-[#0F2557]/30 text-[#0F2557] hover:bg-[#0F2557] hover:text-white font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
            >
              Explore All Services
            </Button>
            <Button
              onClick={() => setCurrentPage('portfolio')}
              variant="outline"
              className="border-[#0F2557]/30 text-[#0F2557] hover:bg-[#0F2557] hover:text-white font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
            >
              View Case Studies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <>
      {renderHero()}
      {renderFeatured()}
      {renderIndustries()}
      {renderFiltersAndGrid()}
      {renderNewsletter()}
      {renderFinalCTA()}

      <AnimatePresence>
        {selectedPost && <BlogDetailModal post={selectedPost} onClose={closeModal} />}
      </AnimatePresence>
    </>
  )
}
