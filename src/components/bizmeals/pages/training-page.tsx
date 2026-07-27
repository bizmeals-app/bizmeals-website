'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  ArrowRight,
  GraduationCap,
  Clock,
  Check,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Users,
  Award,
  Rocket,
  Home,
  ChevronRight,
  Target,
  Medal,
  Globe,
  BarChart3,
  Bot,
  ChevronDown,
  Star,
  Quote,
  ShieldCheck,
  Brain,
  Code2,
  Monitor,
  X,
  UserCheck,
  TrendingUp,
  Handshake,
  Building2,
  Trophy,
  Lock,
  Wifi,
  FileBadge,
  Laptop,
  Calendar,
  User,
  Search,
  Megaphone,
  Lightbulb,
  UserCog,
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

/* ───────────────────────── program data ───────────────────────── */

interface Program {
  id: string
  title: string
  tagline: string
  description: string
  duration: string
  format: string
  badge?: string
  flagship?: boolean
  icon: React.ElementType
  overview: string[]
  curriculum: { module: string; topics: string[] }[]
  skills: string[]
  outcomes: string[]
  includes: string[]
  idealFor: string[]
  certification: string
  seats: string
}

const programs: Program[] = [
  /* ═══════ FLAGSHIP 1: Digital Marketing Career Program ═══════ */
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Career Program',
    tagline: 'Become a job-ready digital marketer in 90 days — with real campaigns, real clients, and a 90% job guarantee.',
    description:
      'The most complete digital marketing career program in Bangalore. You do not just learn — you execute real campaigns for real clients, build a live portfolio, earn an industry certification, complete a paid internship, and walk into a job with our 90% placement guarantee.',
    duration: '90 Days',
    format: 'Online + Live Mentorship',
    badge: 'Most Popular',
    flagship: true,
    icon: Megaphone,
    overview: [
      'This is not a course that hands you a PDF and disappears. From week one, you are executing real digital marketing campaigns for real businesses — SEO audits, Meta Ads, Google Ads, content calendars, email flows, WhatsApp automations, and analytics dashboards. Every module is live, project-based, and led by industry practitioners who run campaigns for paying clients every day.',
      'Our trainers are not full-time teachers. They are working digital marketing professionals, agency founders, and growth leads who bring their live client work into the classroom. You learn the tools, the strategies, and the judgement that only comes from running real budgets — not textbook theory.',
      'The program is selective. We accept only candidates who clear an aptitude round and a mindset interview. This is not because we are elitist — it is because we back our programs with a 90% job guarantee, and we only make that promise to candidates we believe in. If you are selected, you are joining a cohort of serious career-builders, not a classroom of seat-fillers.',
      'By graduation, you will have a live portfolio of 8-12 real campaigns, an industry certification, a completed internship, a polished LinkedIn profile, a ready-to-send resume, and interview preparation with hiring managers. Most importantly, you will have the mindset of a career-builder — someone who creates their own opportunities instead of waiting for them.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Foundations (Week 1-2)',
        topics: [
          'How the digital marketing industry actually works',
          'Career paths: agency, in-house, freelancer, founder',
          'Buyer psychology and the marketing funnel',
          'Setting up your professional presence (LinkedIn, portfolio)',
        ],
      },
      {
        module: 'Module 2 — SEO & Content (Week 3-4)',
        topics: [
          'On-page, off-page, and technical SEO',
          'Keyword research with real tools (Ahrefs, SEMrush, GSC)',
          'Content strategy and SEO-driven blogging',
          'Live project: rank a real client page',
        ],
      },
      {
        module: 'Module 3 — Paid Advertising (Week 5-6)',
        topics: [
          'Google Search, Display, Shopping, and PMax',
          'Meta Ads (Facebook + Instagram) Advantage+',
          'Budgeting, bidding, and creative testing',
          'Live project: run a Rs 5,000 ad campaign end-to-end',
        ],
      },
      {
        module: 'Module 4 — Social, Email & WhatsApp (Week 7-8)',
        topics: [
          'Organic social strategy and content calendars',
          'Email marketing automation flows',
          'WhatsApp Business API and broadcast campaigns',
          'Live project: build a 7-flow WhatsApp nurture sequence',
        ],
      },
      {
        module: 'Module 5 — Analytics & Reporting (Week 9)',
        topics: [
          'GA4, GTM, Looker Studio dashboards',
          'Attribution models and ROAS calculation',
          'Client reporting that wins renewals',
          'Live project: build a client performance dashboard',
        ],
      },
      {
        module: 'Module 6 — Internship & Placement (Week 10-12)',
        topics: [
          'Paid internship on live client accounts',
          'Resume, portfolio, and LinkedIn optimization',
          'Mock interviews with hiring managers',
          'Placement drives and in-house hiring opportunities',
        ],
      },
    ],
    skills: [
      'SEO (On-page, Off-page, Technical)',
      'Google Ads & Meta Ads',
      'Social Media Marketing',
      'Content Strategy & Copywriting',
      'Email & WhatsApp Automation',
      'GA4, GTM & Looker Studio',
      'AI Tools for Marketing',
      'Client Reporting & Pitching',
    ],
    outcomes: [
      '8-12 live campaign pieces in your portfolio',
      'Industry-recognised BizMeals certification',
      'Completed paid internship certificate',
      '90% job guarantee — eligible for placement support',
      'In-house hiring consideration at BizMeals',
      'Freelance-ready profile for independent income',
    ],
    includes: [
      'Live online classes (evening + weekend batches)',
      'Lifetime access to class recordings',
      'Real client project execution from week 1',
      'Paid internship in weeks 10-12',
      '1-on-1 mentorship with industry professionals',
      'Industry certification + internship certificate',
      'LinkedIn, resume, and interview preparation',
      'Placement drives and in-house hiring pool',
    ],
    idealFor: [
      'Final-year students and fresh graduates',
      'Career switchers entering digital marketing',
      'Working professionals upgrading skills',
      'Aspiring freelancers and agency founders',
    ],
    certification: 'BizMeals Certified Digital Marketing Professional + Internship Certificate',
    seats: '12 seats per cohort',
  },

  /* ═══════ FLAGSHIP 2: Startup Building Program ═══════ */
  {
    id: 'startup-building',
    title: 'Startup Building Program',
    tagline: 'Learn to build, launch, and scale a real business — taught by founders who have actually done it.',
    description:
      'A 60-day founder-track program for aspiring entrepreneurs. You do not just learn startup theory — you validate a real idea, build a real MVP, find real first customers, and pitch to real mentors. Taught exclusively by working founders, not professors.',
    duration: '60 Days',
    format: 'Online + Live Founder Mentorship',
    badge: 'Founder Track',
    flagship: true,
    icon: Rocket,
    overview: [
      'Most startup courses teach you to write a business plan and make a pitch deck. That is theatre. Real founders know that building a startup is about talking to 50 customers before writing a line of code, charging for a manual version before automating, and surviving year one on discipline rather than fundraising. This program is built by founders, for founders — and taught exclusively by people who have built and run real businesses.',
      'Over 60 days, you will take a real idea (or find one with us) through the complete founder journey: customer discovery interviews, problem validation, manual-first MVP, first 10 paying customers, pricing strategy, unit economics, go-to-market, and a pitch to a panel of working founders. Every week, you present progress and get direct, honest feedback from people who have been in your seat.',
      'This program is selective because building a startup is hard, and we only accept candidates who demonstrate the mindset to see it through — resilience, coachability, and a bias toward action. If you are looking for a comfortable course where you sit back and absorb theory, this is not it. If you are ready to actually build something, we will give you the framework, the mentors, and the accountability to do it.',
      'By graduation, you will have a validated idea, a live MVP, your first paying customers (or a clear path to them), a founder network, and the operating discipline to keep building. Some graduates go on to raise capital; most bootstrap to profitability. All of them leave with the mindset and the tools of a real builder — not a student.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Founder Mindset & Idea Discovery (Week 1-2)',
        topics: [
          'What real founders actually do (versus what courses teach)',
          'Finding problems worth solving — from your own life, work, and market',
          'Customer discovery interviews — how to run 20 in a week',
          'Validating the problem before building anything',
        ],
      },
      {
        module: 'Module 2 — Manual MVP & First 10 Customers (Week 3-4)',
        topics: [
          'Building the manual version of your product first',
          'Pricing for credibility, not for closure',
          'Selling to your first 10 paying customers',
          'Learning from every yes and every no',
        ],
      },
      {
        module: 'Module 3 — Unit Economics & Business Model (Week 5)',
        topics: [
          'CAC, AOV, LTV, contribution margin — the real numbers',
          'Choosing the right business model for your idea',
          'Avoiding the 5 mistakes that kill startups in year one',
          'Building a financial model you can actually trust',
        ],
      },
      {
        module: 'Module 4 — Go-To-Market & First Scale (Week 6)',
        topics: [
          'Choosing your first channel (and ignoring the rest)',
          'Building a repeatable acquisition motion',
          'Founder-led sales and marketing',
          'Pitching to a panel of working founders',
        ],
      },
    ],
    skills: [
      'Customer discovery & validation',
      'Manual MVP building',
      'First-customer sales',
      'Pricing strategy',
      'Unit economics & financial modelling',
      'Go-to-market planning',
      'Founder-led marketing',
      'Investor & mentor pitching',
    ],
    outcomes: [
      'A validated business idea with real customer interviews',
      'A live MVP with your first paying customers (or a clear path)',
      'A founder-grade financial model and unit economics',
      'A working founder network and mentor relationships',
      'A pitch tested by a panel of real founders',
      'The operating discipline of a career-builder',
    ],
    includes: [
      'Live online sessions with working founders',
      'Weekly progress reviews and honest feedback',
      '1-on-1 mentorship with a matched founder',
      'Customer discovery interview frameworks',
      'MVP and pricing strategy templates',
      'Founder network access (alumni + mentors)',
      'Final pitch to a panel of working founders',
      'Post-program accountability check-ins',
    ],
    idealFor: [
      'Aspiring founders with an idea (or looking for one)',
      'Working professionals planning to start up',
      'Recent graduates choosing entrepreneurship over jobs',
      'Side-project builders ready to go full-time',
    ],
    certification: 'BizMeals Startup Builder Certificate + Founder Network Access',
    seats: '8 seats per cohort',
  },

  /* ═══════ FLAGSHIP 3: Freelancing Career Program ═══════ */
  {
    id: 'freelancing',
    title: 'Freelancing Career Program',
    tagline: 'Build a real freelance income in 30 days — profile, portfolio, proposals, and your first paying clients.',
    description:
      'A 30-day intensive program that takes you from zero to your first paying freelance clients. Learn profile optimisation, portfolio building, proposal writing, pricing, client communication, and project execution — with real platforms and real clients.',
    duration: '30 Days',
    format: 'Online + Live Mentorship',
    badge: 'Fastest to Income',
    flagship: true,
    icon: Briefcase,
    overview: [
      'Freelancing is the fastest path to independent income — but most people who try it fail in the first 60 days. Not because they lack skills, but because they lack a system. They set up a generic profile, write weak proposals, underprice, overpromise, and burn out. This program fixes all of that in 30 days.',
      'You will learn the exact system our freelancers use to win clients on Upwork, Fiverr, LinkedIn, and direct outreach. Profile optimisation that gets you found. Portfolio building that closes deals. Proposal templates that win. Pricing that signals value without losing the client. Client communication that earns five-star reviews and repeat work. Every module includes a live action — you do not just learn, you execute.',
      'This program is selective because we want you to actually earn, not just feel good. We accept candidates who have a baseline skill (writing, design, marketing, coding, admin — anything billable) and are ready to treat freelancing like a real business, not a side hobby. If you have no billable skill yet, we will point you to a skill program first.',
      'By graduation, you will have a live freelancer profile on two platforms, a completed portfolio, 5-10 proposals sent, and (for most graduates) your first paying client. More importantly, you will have the system to repeat that win every month — turning freelancing from a gamble into a reliable income stream you control.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Foundation (Week 1)',
        topics: [
          'Choosing your freelance niche and service',
          'Optimising your Upwork and Fiverr profiles',
          'Building a portfolio from scratch (even with no past clients)',
          'Setting your pricing without undercharging',
        ],
      },
      {
        module: 'Module 2 — Winning Clients (Week 2)',
        topics: [
          'Proposal templates that win (with real examples)',
          'Direct outreach on LinkedIn and email',
          'Handling the first client call with confidence',
          'Negotiation that protects your rate',
        ],
      },
      {
        module: 'Module 3 — Delivery & Reviews (Week 3)',
        topics: [
          'Project execution and scope management',
          'Client communication that earns trust',
          'Handling revisions without losing money',
          'Turning one project into repeat work + referrals',
        ],
      },
      {
        module: 'Module 4 — Income & Scale (Week 4)',
        topics: [
          'Building a predictable pipeline of clients',
          'Raising your rates without losing clients',
          'Time, finance, and tax basics for freelancers',
          'Your 90-day freelance income plan',
        ],
      },
    ],
    skills: [
      'Freelance profile optimisation',
      'Portfolio building from scratch',
      'Proposal writing & winning',
      'Pricing & negotiation',
      'Client communication',
      'Project execution & scope management',
      'Direct outreach & lead generation',
      'Freelance finance & tax basics',
    ],
    outcomes: [
      'Live freelancer profiles on 2 platforms',
      'A completed, client-ready portfolio',
      '5-10 proposals sent with proven templates',
      'Your first paying client (for most graduates)',
      'A repeatable system for winning clients monthly',
      'A 90-day income plan to scale your freelance business',
    ],
    includes: [
      'Live online sessions with working freelancers',
      'Profile and portfolio reviews by mentors',
      'Proven proposal templates (that actually win)',
      'Pricing calculator for your niche',
      'Direct outreach scripts and templates',
      '1-on-1 mentorship and accountability',
      'Client communication frameworks',
      '90-day income scaling plan',
    ],
    idealFor: [
      'Anyone with a billable skill (writing, design, marketing, coding, admin)',
      'Students and freshers building side income',
      'Working professionals seeking financial independence',
      'Career switchers testing self-employment',
    ],
    certification: 'BizMeals Certified Freelance Professional + Portfolio Review',
    seats: '15 seats per cohort',
  },

  /* ═══════ REMAINING PROGRAMS ═══════ */

  {
    id: 'full-stack-web-dev',
    title: 'Full Stack Web Development Program',
    tagline: 'Build and deploy real web apps with React, Node.js, and MongoDB — graduate with a GitHub portfolio that gets you hired.',
    description:
      'A 120-day career program that takes you from zero to job-ready Full Stack Developer. You build 5+ real deployed projects, get weekly code reviews from senior developers, and graduate with the confidence and portfolio to crack technical interviews.',
    duration: '120 Days',
    format: 'Online + Live Mentorship',
    icon: Code2,
    overview: [
      'This is not a tutorial playlist. It is a structured 120-day career program where you build real applications from scratch, get weekly code reviews from senior developers, and graduate with a deployed portfolio that hiring managers actually respect. Every concept is taught through a project — you learn React by building React, Node by building Node, and deployment by deploying.',
      'Our trainers are working developers and tech founders who write production code every day. They bring their real engineering standards into the classroom — clean code, version control, testing, code review culture, and deployment discipline. You do not just learn to make things work; you learn to make them production-grade.',
      'The program is selective because we back it with placement support and in-house hiring consideration. We accept candidates who demonstrate logical thinking and a willingness to put in the hours. Building software is hard. We make sure you are ready for that reality before you commit.',
      'By graduation, you will have 5+ deployed projects on a professional GitHub profile, a polished resume, mock interview experience with hiring managers, and the confidence to walk into any junior developer role. Placement support and in-house hiring opportunities are included.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Frontend Foundations (Week 1-4)',
        topics: ['HTML5, CSS3, Flexbox & Grid', 'JavaScript ES6+', 'DOM manipulation & events', 'Responsive design & accessibility'],
      },
      {
        module: 'Module 2 — React & Modern Frontend (Week 5-8)',
        topics: ['React components & hooks', 'State management (Context, Zustand)', 'API integration & fetching', 'Project: build a real SPA'],
      },
      {
        module: 'Module 3 — Backend & Databases (Week 9-12)',
        topics: ['Node.js & Express.js', 'MongoDB & Mongoose', 'REST API design', 'Authentication & authorization'],
      },
      {
        module: 'Module 4 — Deployment & Career (Week 13-16)',
        topics: ['Git, GitHub & code review culture', 'Deployment (Vercel, Render, Railway)', 'Testing & debugging', 'Resume, portfolio & interview prep'],
      },
    ],
    skills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Node.js & Express.js', 'MongoDB & Mongoose', 'Git & GitHub', 'REST API Development', 'Deployment & DevOps Basics'],
    outcomes: [
      '5+ deployed projects on GitHub',
      'Industry-recognised certification',
      'Mock interview experience',
      'Placement support & in-house hiring pool',
    ],
    includes: [
      'Live online classes with senior developers',
      'Weekly code reviews',
      '5+ real project builds',
      'GitHub portfolio preparation',
      '1-on-1 mentorship',
      'Interview preparation & placement drives',
    ],
    idealFor: [
      'Students and freshers aiming for software jobs',
      'Career switchers into web development',
      'Freelancers adding development skills',
    ],
    certification: 'BizMeals Certified Full Stack Developer + Project Portfolio',
    seats: '12 seats per cohort',
  },

  {
    id: 'data-science-ml',
    title: 'Data Science & Machine Learning Program',
    tagline: 'Master Python, data analysis, and ML — with real datasets, real models, and a portfolio that opens doors.',
    description:
      'A 120-day career program that gives you a complete foundation in data science, statistics, and machine learning — with real-world datasets, real model building, and career support for Data Analyst and Data Scientist roles.',
    duration: '120 Days',
    format: 'Online + Live Mentorship',
    icon: BarChart3,
    overview: [
      'Data science is one of the highest-demand and highest-paying careers in India today — but most courses teach you libraries without teaching you judgement. This program is built around real datasets, real business problems, and real model building. You do not just learn Pandas; you learn what questions to ask of data before you ever open Pandas.',
      'Our trainers are working data professionals who analyse real business data every day. They bring real datasets into the classroom (anonymised), real problem statements, and the messy reality of data cleaning, feature engineering, and model evaluation that textbooks skip.',
      'The program is selective because data science requires a baseline of logical and numerical thinking. We accept candidates who clear an aptitude round and show the persistence to work through ambiguous problems. If you are selected, you join a cohort of serious career-builders.',
      'By graduation, you will have a portfolio of 4-6 real data projects, an industry certification, a polished resume, and interview preparation with hiring managers. Placement support and in-house hiring opportunities are included.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Python & Data Foundations (Week 1-4)',
        topics: ['Python for data science', 'NumPy & Pandas', 'Data cleaning & preprocessing', 'Exploratory data analysis'],
      },
      {
        module: 'Module 2 — Statistics & Visualisation (Week 5-8)',
        topics: ['Statistics & probability', 'Hypothesis testing', 'Matplotlib, Seaborn & Plotly', 'Project: real dataset analysis'],
      },
      {
        module: 'Module 3 — Machine Learning (Week 9-12)',
        topics: ['Linear & logistic regression', 'Decision trees & random forests', 'Model evaluation & tuning', 'Project: build & deploy an ML model'],
      },
      {
        module: 'Module 4 — Career & Capstone (Week 13-16)',
        topics: ['AI tools for analytics', 'Capstone project with real data', 'Resume & portfolio preparation', 'Interview prep & placement drives'],
      },
    ],
    skills: ['Python for Data Science', 'NumPy & Pandas', 'Data Cleaning & Preprocessing', 'Data Visualisation', 'Statistics & Probability', 'Machine Learning Algorithms', 'AI Tools for Analytics', 'Model Evaluation & Deployment'],
    outcomes: [
      '4-6 real data projects in your portfolio',
      'Industry-recognised certification',
      'Capstone project with real business data',
      'Placement support & in-house hiring pool',
    ],
    includes: [
      'Live online classes with data professionals',
      'Real datasets and business problem statements',
      'Capstone project mentorship',
      '1-on-1 career guidance',
      'Resume & portfolio preparation',
      'Interview prep & placement drives',
    ],
    idealFor: [
      'Tech learners entering the data industry',
      'Working professionals upgrading to data roles',
      'Analysts formalising their data skills',
    ],
    certification: 'BizMeals Certified Data Science Professional + Capstone Project',
    seats: '10 seats per cohort',
  },

  {
    id: 'it-software-skills',
    title: 'IT & Software Skills Program',
    tagline: 'Master Power BI, Excel, CRM, and project management — the exact skills corporate IT roles actually hire for.',
    description:
      'A 60-day program designed for those seeking office-based IT and operations roles. You master the practical tools — Power BI, Advanced Excel, CRM systems, project management — that companies actually look for, with hands-on projects and placement support.',
    duration: '60 Days',
    format: 'Online + Live Mentorship',
    icon: Monitor,
    overview: [
      'Most corporate IT and operations roles do not require you to code. They require you to be excellent with the tools businesses run on — Power BI for dashboards, Excel for analysis, CRM for customer management, and project management tools for execution. This program makes you corporate-ready in 60 days.',
      'Our trainers come from corporate backgrounds and share the practical workflows, shortcuts, and communication skills that separate a great corporate professional from a struggling one. Every module is hands-on with real business scenarios — you build dashboards, manage data, handle CRM workflows, and present reports just like you would in a real job.',
      'The program is selective because we back it with placement support. We accept candidates who demonstrate communication ability and a willingness to learn corporate-grade tools and workflows.',
      'By graduation, you will have hands-on project experience with all the core tools, an industry certification, a polished resume, and interview preparation. Placement support and corporate hiring partner access are included.',
    ],
    curriculum: [
      {
        module: 'Module 1 — Excel & Data Analysis (Week 1-2)',
        topics: ['Advanced Excel & formulas', 'Pivot tables & Power Query', 'VBA macros basics', 'Real business data exercises'],
      },
      {
        module: 'Module 2 — Power BI & Dashboards (Week 3-4)',
        topics: ['Power BI Desktop & Service', 'DAX formulas & calculations', 'Building executive dashboards', 'Project: real business dashboard'],
      },
      {
        module: 'Module 3 — CRM & Project Management (Week 5)',
        topics: ['CRM systems (Salesforce basics)', 'Project management tools (Jira, Asana)', 'Corporate communication', 'Workflow automation basics'],
      },
      {
        module: 'Module 4 — Career & Placement (Week 6)',
        topics: ['Resume & LinkedIn optimisation', 'Corporate interview preparation', 'Placement drives', 'In-house hiring consideration'],
      },
    ],
    skills: ['Power BI & Dashboards', 'Advanced Excel & VBA', 'CRM Systems (Salesforce Basics)', 'Project Management Tools', 'Business Automation', 'Data Analysis & Reporting', 'Corporate Communication', 'Workflow Optimisation'],
    outcomes: [
      'Hands-on Power BI dashboard portfolio',
      'Industry-recognised certification',
      'Corporate-ready resume and LinkedIn',
      'Placement support & corporate hiring partner access',
    ],
    includes: [
      'Live online classes with corporate professionals',
      'Hands-on tool training',
      'Real business scenario projects',
      '1-on-1 mentorship',
      'Resume & LinkedIn optimisation',
      'Interview prep & placement drives',
    ],
    idealFor: [
      'Those seeking office-based IT and operations roles',
      'Freshers entering corporate jobs',
      'Career switchers into corporate IT',
    ],
    certification: 'BizMeals Certified Corporate IT Professional + Dashboard Portfolio',
    seats: '15 seats per cohort',
  },

  {
    id: 'ai-tools-automation',
    title: 'AI Tools & Automation Program',
    tagline: 'Become the person who knows how to use AI — across content, coding, analytics, design, and automation.',
    description:
      'A 45-day program that makes you AI-proficient across every work domain. Master 15+ practical AI tools, build automation workflows, and become the most productive person in any team you join. The fastest career multiplier in 2025.',
    duration: '45 Days',
    format: 'Online + Live Mentorship',
    icon: Bot,
    overview: [
      'AI proficiency is no longer optional. In every industry — marketing, development, design, operations, HR — the people who know how to use AI effectively are 5-10x more productive than those who do not. This program makes you that person in 45 days.',
      'You will master 15+ practical AI tools across content creation (ChatGPT, Gemini, Claude), coding assistance (Copilot, Cursor), analytics (AI-powered dashboards), design (Midjourney, Canva AI), and automation (Zapier, Make, custom workflows). Every module is project-based — you do not just learn what the tools do, you build real workflows that save real hours.',
      'Our trainers are working professionals who use AI in their daily work — not theoreticians. They share the prompts, the workflows, and the judgement that separates a casual AI user from a power user.',
      'By graduation, you will have a portfolio of AI-powered workflows, an industry certification, and the confidence to bring AI into any role or freelance project. This is the single fastest career multiplier available in 2025.',
    ],
    curriculum: [
      {
        module: 'Module 1 — AI Foundations (Week 1)',
        topics: ['How AI tools actually work', 'Prompt engineering fundamentals', 'Choosing the right tool for the job', 'AI ethics and responsible use'],
      },
      {
        module: 'Module 2 — Content & Communication (Week 2)',
        topics: ['ChatGPT, Gemini & Claude for content', 'AI for email, copywriting & blogs', 'AI for research & summarisation', 'Project: build a content engine'],
      },
      {
        module: 'Module 3 — Coding, Analytics & Design (Week 3)',
        topics: ['AI coding assistants (Copilot, Cursor)', 'AI for data analysis & dashboards', 'AI design tools (Midjourney, Canva AI)', 'Project: build an AI-powered workflow'],
      },
      {
        module: 'Module 4 — Automation & Career (Week 4-5)',
        topics: ['Zapier, Make & workflow automation', 'Building AI-powered pipelines', 'AI in your career & freelance work', 'Capstone + portfolio + placement prep'],
      },
    ],
    skills: ['AI Content Creation (ChatGPT, Gemini, Claude)', 'AI Coding Assistants (Copilot, Cursor)', 'AI for Analytics & Insights', 'AI Design Tools (Midjourney, Canva AI)', 'Workflow Automation (Zapier, Make)', 'Prompt Engineering', 'AI Integration Strategies', 'AI for Productivity'],
    outcomes: [
      'Portfolio of AI-powered workflows',
      'Industry-recognised certification',
      '15+ practical AI tools mastered',
      'Career multiplier for any role or freelance work',
    ],
    includes: [
      'Live online classes with AI power users',
      'Hands-on projects with 15+ AI tools',
      'Prompt library & workflow templates',
      '1-on-1 mentorship',
      'Capstone project',
      'Portfolio & career preparation',
    ],
    idealFor: [
      'Anyone who wants to 10x their productivity',
      'Students and professionals future-proofing their careers',
      'Freelancers adding AI skills to their service offerings',
      'Teams and leaders bringing AI into their organisations',
    ],
    certification: 'BizMeals Certified AI Tools Professional + Workflow Portfolio',
    seats: '15 seats per cohort',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   DIFFERENTIATORS: Why we are NOT a regular training institute
   ═════════════════════════════════════════════════════════════════════════ */

const differentiators = [
  {
    icon: UserCheck,
    title: 'Selective Admission',
    description: 'Only candidates who clear an aptitude round and a mindset interview join our cohorts. We back our programs with a 90% job guarantee — so we choose carefully.',
  },
  {
    icon: Building2,
    title: 'Trainers Are Founders & Professionals',
    description: 'Our trainers are not full-time teachers. They are working industry professionals, agency founders, and business leaders who bring real client work into every session.',
  },
  {
    icon: ShieldCheck,
    title: '90% Job Guarantee',
    description: 'For eligible candidates in the flagship programs, we provide a 90% job guarantee — placement support, in-house hiring consideration, and hiring partner drives.',
  },
  {
    icon: FileBadge,
    title: 'Online Certification + Internship',
    description: 'Complete online certification with a paid internship. You graduate with a real certificate, real project experience, and a portfolio — not just a PDF.',
  },
  {
    icon: Handshake,
    title: 'In-House Hiring & Career Support',
    description: 'Top performers get in-house hiring consideration at BizMeals and our partner network. Career support continues after graduation — not just during the program.',
  },
  {
    icon: Brain,
    title: 'Career Builders, Not Students',
    description: 'We do not train you to pass exams. We build career-builders who create their own opportunities — as employees, freelancers, or founders. The mindset shift is the real outcome.',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   COMPARISON: BizMeals Programs vs Regular Training Institutes
   ═════════════════════════════════════════════════════════════════════════ */

const comparison = [
  { feature: 'Admission', bizmeals: 'Selective — aptitude + mindset interview', others: 'Open to anyone who pays the fee' },
  { feature: 'Trainers', bizmeals: 'Working founders & industry professionals', others: 'Full-time teachers, often no industry work' },
  { feature: 'Projects', bizmeals: 'Real client campaigns from week 1', others: 'Simulated exercises and toy projects' },
  { feature: 'Internship', bizmeals: 'Paid internship included in flagship programs', others: 'Not included or unpaid' },
  { feature: 'Job Guarantee', bizmeals: '90% job guarantee for eligible candidates', others: 'No guarantee, "placement assistance" only' },
  { feature: 'In-House Hiring', bizmeals: 'Top performers hired at BizMeals & partners', others: 'No in-house hiring path' },
  { feature: 'Mindset', bizmeals: 'Builds career-builders, not certificate-holders', others: 'Focus on completing the syllabus' },
  { feature: 'Class Size', bizmeals: '8-15 seats per cohort (personal attention)', others: '30-60+ students per batch' },
  { feature: 'Certification', bizmeals: 'Industry-recognised + internship certificate', others: 'Institute certificate only' },
  { feature: 'Career Support', bizmeals: 'Ongoing after graduation', others: 'Ends when the course ends' },
]

/* ═════════════════════════════════════════════════════════════════════════
   TESTIMONIALS from program graduates
   ═════════════════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    quote:
      'I joined the Digital Marketing Program right out of college with zero experience. By week 6 I was running real Meta Ads for a real client. By graduation I had a job offer. The 90% job guarantee is real — I was in the 90%.',
    name: 'Pooja S',
    role: 'Digital Marketing Executive, Bangalore',
    program: 'Digital Marketing Career Program',
    rating: 5,
    outcome: 'Hired within 3 weeks of graduation',
  },
  {
    quote:
      'I had a business idea for two years and did nothing with it. The Startup Building Program forced me to talk to 30 customers in two weeks, build a manual MVP, and find my first paying customer before the program ended. That is what real founder training looks like.',
    name: 'Karthik R',
    role: 'Founder, D2C skincare brand',
    program: 'Startup Building Program',
    rating: 5,
    outcome: 'Launched brand, first 100 customers in 60 days',
  },
  {
    quote:
      'I was a stay-at-home parent looking for income I could control. The Freelancing Program gave me the exact system — profile, proposals, pricing. I landed my first client in week 3 and have not looked back. I now earn more than my previous full-time job.',
    name: 'Lakshmi N',
    role: 'Freelance Content Writer',
    program: 'Freelancing Career Program',
    rating: 5,
    outcome: 'First client in 3 weeks, now fully freelance',
  },
  {
    quote:
      'The selective admission process felt tough at first, but it is why the cohort was so strong. Everyone around me was serious. The trainers are real founders — they told me things about unit economics no institute teacher ever would. I avoided at least three expensive mistakes.',
    name: 'Arjun M',
    role: 'Co-Founder, B2B SaaS startup',
    program: 'Startup Building Program',
    rating: 5,
    outcome: 'Co-founded startup, bootstrapped to revenue',
  },
  {
    quote:
      'I tried two other digital marketing courses before this one. They gave me PDFs and theory. BizMeals gave me real client work from week one. That is the difference. I am now a performance marketer at an agency and I run my own freelance clients on the side.',
    name: 'Sneha K',
    role: 'Performance Marketer + Freelancer',
    program: 'Digital Marketing Career Program',
    rating: 5,
    outcome: 'Agency job + freelance income within 4 months',
  },
  {
    quote:
      'The in-house hiring consideration is what made me choose BizMeals over three other institutes. I performed well in the internship and got hired at BizMeals itself. No other institute offers that path.',
    name: 'Rahul V',
    role: 'Junior Web Developer, BizMeals',
    program: 'Full Stack Web Development Program',
    rating: 5,
    outcome: 'Hired in-house after internship',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   Q&A SECTION — easy to pitch, easy to understand
   ═════════════════════════════════════════════════════════════════════════ */

const qaItems = [
  {
    question: 'What exactly is a "Career Program" — and how is it different from a regular training course?',
    answer:
      'A regular training course teaches you a syllabus and hands you a certificate. A Career Program teaches you the skill, gives you real project experience, includes a paid internship, prepares your resume and LinkedIn, and places you in a job — all in one structured journey. We do not train students; we build career-builders who create their own opportunities as employees, freelancers, or founders.',
  },
  {
    question: 'What does "selective candidates only" mean?',
    answer:
      'Every applicant goes through a short aptitude round and a mindset interview. We accept only candidates who demonstrate logical thinking, willingness to put in the work, and the right attitude for a career-building journey. This is not elitism — it is because we back our flagship programs with a 90% job guarantee, and we only make that promise to candidates we believe in. If you are selected, you join a cohort of serious career-builders, not a classroom of seat-fillers.',
  },
  {
    question: 'Who are the trainers?',
    answer:
      'Our trainers are not full-time teachers. They are working industry professionals, agency founders, business leaders, and senior developers who run real client work every day. They bring their live projects, real budgets, real datasets, and real engineering standards into every session. You learn from people who actually do the work — not people who only teach it.',
  },
  {
    question: 'Is the 90% job guarantee real? How does it work?',
    answer:
      'Yes. For eligible candidates in our flagship programs (Digital Marketing, Startup Building, Freelancing, Full Stack Web Development, Data Science), we provide a 90% job guarantee. This means: if you complete the program, meet the attendance and project requirements, and participate in placement activities, we guarantee placement support until you are placed — including in-house hiring consideration at BizMeals, hiring partner drives, and ongoing career support. The remaining 10% typically choose freelancing or entrepreneurship instead of employment.',
  },
  {
    question: 'Is this completely online? Do I need to come to Bangalore?',
    answer:
      'The programs are completely online. You can join from anywhere in India (or anywhere in the world). Live classes are held in evening and weekend slots so working professionals and students can attend. All sessions are recorded and available for lifetime access. You do not need to relocate to Bangalore — though in-house hiring consideration at BizMeals may involve relocation if you are selected for a Bangalore-based role.',
  },
  {
    question: 'What certification do I get? Is it recognised?',
    answer:
      'You receive the BizMeals Career Program Certification, recognised by our hiring partner network of agencies, startups, and companies across Bangalore and India. Flagship program graduates also receive a separate Internship Certificate (for the paid internship component). These are industry certifications backed by real project work — not attendance certificates. Hiring managers care about what you can do, and our certification proves you have done real work.',
  },
  {
    question: 'What is the internship? Is it paid?',
    answer:
      'The internship is part of the flagship programs (Digital Marketing, Full Stack Web Development, Data Science). In the final weeks of the program, you work on live client accounts, real codebases, or real datasets — supervised by senior mentors. The internship is paid (stipend varies by program and performance) and gives you the real-world experience that hiring managers look for. Many interns are also considered for in-house hiring at BizMeals based on performance.',
  },
  {
    question: 'What is in-house hiring? Do you hire your own graduates?',
    answer:
      'Yes. BizMeals is a growing Business Growth Execution Partner — we run digital marketing, web development, BPO, and consultancy services for real clients. Top-performing program graduates are considered for in-house roles at BizMeals itself, in addition to our hiring partner network. This is a career path no regular training institute can offer — because they do not run real client work. We do.',
  },
  {
    question: 'How is BizMeals different from other training institutes in Bangalore?',
    answer:
      'Six core differences: (1) Selective admission — we choose candidates carefully because we guarantee outcomes. (2) Trainers are working founders and professionals, not full-time teachers. (3) Real client projects from week 1, not toy exercises. (4) Paid internship included, not optional. (5) 90% job guarantee with in-house hiring consideration. (6) We build career-builders with a founder mindset, not certificate-holders. Most institutes sell you a course. We build your career.',
  },
  {
    question: 'What if I cannot find a job after the program?',
    answer:
      'For eligible candidates in flagship programs, our 90% job guarantee means we continue placement support until you are placed — through hiring partner drives, in-house hiring consideration, interview preparation, and ongoing career guidance. The remaining 10% typically choose freelancing or entrepreneurship (which our programs also prepare you for). If you are genuinely committed and meet the program requirements, you will not be left without options.',
  },
  {
    question: 'Do I need prior experience to join?',
    answer:
      'No prior experience is required for most programs — we start from fundamentals and build you up. What we do require is the right mindset, willingness to put in the work, and the ability to clear our aptitude round and mindset interview. The Startup Building Program is best suited for those with some work or life experience; the Freelancing Program requires a baseline billable skill (which we can help you identify).',
  },
  {
    question: 'How do I apply? What is the selection process?',
    answer:
      'Click "Apply Now" on any program, fill out the short application form, and our admissions team will contact you within 24 hours. The selection process has three steps: (1) a short aptitude round (online, 30 minutes), (2) a mindset interview (video call, 20 minutes), and (3) an offer letter if you are selected. Cohorts fill up fast — we recommend applying early to secure your seat.',
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   BLOGS & INSERTS about the program (for BDEs and candidates)
   ═════════════════════════════════════════════════════════════════════════ */

const blogInserts = [
  {
    type: 'Blog',
    title: 'Why a Career Program Beats a Training Course Every Time',
    excerpt:
      'A training course teaches you a syllabus. A Career Program builds your career — skills, experience, internship, certification, and a job. Here is why the difference matters more than ever in 2025.',
    icon: Lightbulb,
  },
  {
    type: 'Insert',
    title: 'The 90% Job Guarantee — How We Back Our Promise',
    excerpt:
      'We do not say "90% job guarantee" lightly. Here is exactly how it works, who qualifies, and what happens if you are in the 10% — a transparent breakdown for candidates and BDEs.',
    icon: ShieldCheck,
  },
  {
    type: 'Blog',
    title: 'Selective Admission: Why We Say No to Some Candidates',
    excerpt:
      'We reject applicants who are not the right fit — and that is exactly why our graduates succeed. A transparent look at our aptitude round and mindset interview process.',
    icon: UserCheck,
  },
  {
    type: 'Insert',
    title: 'Meet the Trainers — Founders, Not Professors',
    excerpt:
      'Our trainers run real businesses, real campaigns, and real codebases every day. Here is why learning from working professionals beats learning from full-time teachers.',
    icon: Users,
  },
  {
    type: 'Blog',
    title: 'From Student to Career Builder: The Mindset Shift',
    excerpt:
      'The biggest outcome of our programs is not the certificate — it is the mindset shift from waiting for opportunities to creating them. Here is how we engineer that shift.',
    icon: Rocket,
  },
  {
    type: 'Insert',
    title: 'In-House Hiring: The Career Path No Institute Offers',
    excerpt:
      'BizMeals is not just a training company — we run real client work. That means top graduates get hired by us. Here is how the in-house hiring path works.',
    icon: Building2,
  },
]

/* ═════════════════════════════════════════════════════════════════════════
   STATS
   ═════════════════════════════════════════════════════════════════════════ */

const heroStats = [
  { value: '90%', label: 'Job Guarantee', icon: ShieldCheck },
  { value: '7', label: 'Career Programs', icon: GraduationCap },
  { value: '12+', label: 'Years Industry Experience', icon: Award },
  { value: '500+', label: 'Careers Built', icon: TrendingUp },
]

/* ═════════════════════════════════════════════════════════════════════════
   COURSE DETAIL MODAL
   ═════════════════════════════════════════════════════════════════════════ */

function ProgramDetailModal({
  program,
  onClose,
  onApply,
}: {
  program: Program
  onClose: () => void
  onApply: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose()
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-start justify-center px-3 py-6 sm:py-10"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={program.title}
    >
      <div className="absolute inset-0 bg-[#0F2557]/70 backdrop-blur-sm" />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl shadow-[#0F2557]/30 border border-[#E5E9F0] overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0F2557 0%, #1E3A8A 50%, #F5A623 100%)' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F5F7FA] hover:bg-[#EEF2FA] flex items-center justify-center text-[#5A6478] hover:text-[#0F2557] transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center">
                <program.icon className="w-7 h-7 text-[#F5A623]" />
              </div>
              <div className="flex-1 min-w-0">
                {program.flagship && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30 mb-2">
                    <Sparkles className="w-3 h-3 text-[#F5A623]" />
                    <span className="text-[10px] font-bold text-[#B8770E] uppercase tracking-wider">Flagship Program</span>
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F2557] leading-tight mb-1">{program.title}</h2>
                <p className="text-sm text-[#5A6478] leading-relaxed">{program.tagline}</p>
              </div>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-[#E5E9F0]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF2FA] border border-[#E5E9F0]">
                <Clock className="w-3.5 h-3.5 text-[#0F2557]" />
                <span className="text-xs font-semibold text-[#0F2557]">{program.duration}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF2FA] border border-[#E5E9F0]">
                <Wifi className="w-3.5 h-3.5 text-[#0F2557]" />
                <span className="text-xs font-semibold text-[#0F2557]">{program.format}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30">
                <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-xs font-semibold text-[#B8770E]">{program.seats}</span>
              </span>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#0F2557] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#F5A623]" />
                Program Overview
              </h3>
              <div className="space-y-3">
                {program.overview.map((p, i) => (
                  <p key={i} className="text-sm text-[#3A4252] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#0F2557] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#F5A623]" />
                Curriculum
              </h3>
              <div className="space-y-3">
                {program.curriculum.map((c, i) => (
                  <div key={i} className="rounded-xl border border-[#E5E9F0] overflow-hidden">
                    <div className="px-4 py-2.5 bg-[#F5F7FA]">
                      <span className="text-xs font-bold text-[#0F2557]">{c.module}</span>
                    </div>
                    <div className="px-4 py-3">
                      <ul className="space-y-1.5">
                        {c.topics.map((t, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#3A4252]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] mt-0.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills + Outcomes */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-bold text-[#0F2557] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#F5A623]" />
                  Skills You Build
                </h3>
                <div className="space-y-1.5">
                  {program.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0F2557] shrink-0" />
                      <span className="text-xs text-[#3A4252]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F2557] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#F5A623]" />
                  Outcomes
                </h3>
                <div className="space-y-1.5">
                  {program.outcomes.map((o, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] mt-0.5 shrink-0" />
                      <span className="text-xs text-[#3A4252]">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#0F2557] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                What is Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {program.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F7FA] border border-[#E5E9F0]">
                    <Check className="w-3.5 h-3.5 text-[#0F2557] shrink-0" />
                    <span className="text-xs text-[#3A4252] font-medium">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal for + certification */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#EEF2FA] border border-[#E5E9F0]">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-4 h-4 text-[#0F2557]" />
                  <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Ideal For</span>
                </div>
                <ul className="space-y-1">
                  {program.idealFor.map((f, i) => (
                    <li key={i} className="text-xs text-[#3A4252] flex items-start gap-1.5">
                      <span className="text-[#F5A623] mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#FDF7EC] border border-[#F5A623]/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileBadge className="w-4 h-4 text-[#F5A623]" />
                  <span className="text-xs font-bold text-[#B8770E] uppercase tracking-wider">Certification</span>
                </div>
                <p className="text-xs text-[#3A4252] leading-relaxed">{program.certification}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-6 border border-[#E5E9F0] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F5A623]/15 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-base font-bold text-white mb-2">Ready to build your career?</h3>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  Cohorts fill up fast. Apply today, clear the selection round, and secure your seat.
                </p>
                <Button
                  onClick={onApply}
                  className="btn-cta border-0 font-bold px-6 py-3 text-sm rounded-xl h-auto cursor-pointer"
                >
                  Apply Now — Selected Candidates Only
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   MAIN TRAINING PAGE COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */

export default function TrainingPage() {
  const { setCurrentPage } = usePage()
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [openQA, setOpenQA] = useState<number | null>(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const flagshipPrograms = programs.filter(p => p.flagship)
  const otherPrograms = programs.filter(p => !p.flagship)

  const handleApply = useCallback(() => {
    setSelectedProgram(null)
    setCurrentPage('contact')
  }, [setCurrentPage])

  /* ═══════════════════════════════════════════════════════
     1. HERO
     ═══════════════════════════════════════════════════════ */

  const renderHero = () => (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F2557 0%, #1E3A8A 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-[#F5A623]/10 blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 sm:w-[400px] sm:h-[400px] rounded-full bg-[#1E3A8A]/40 blur-3xl" />
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
            <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              <Home className="w-3 h-3" />
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white font-semibold">Career Programs</span>
          </motion.div>

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Lock className="w-4 h-4 text-[#F5A623]" />
              <span className="text-xs font-bold tracking-widest uppercase text-white">
                Selective Admission · 90% Job Guarantee
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5 text-white"
          >
            Not a Training Course.
            <span className="block text-[#F5A623] mt-1">A Career Program.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed mb-8"
          >
            We do not train students to pass exams. We build <span className="text-white font-semibold">career-builders</span> who create their own opportunities — as employees, freelancers, or founders. Taught by working founders and industry professionals. Backed by a 90% job guarantee. Open to selected candidates only.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Button
              onClick={() => setCurrentPage('contact')}
              className="btn-cta border-0 font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              onClick={() => {
                const el = document.getElementById('programs')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
            >
              Explore Programs
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 text-[#F5A623] mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[11px] sm:text-xs text-white/70 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     2. WHAT IS A CAREER PROGRAM (the mindset shift)
     ═══════════════════════════════════════════════════════ */

  const renderWhatIsCareerProgram = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FA] border border-[#E5E9F0] mb-4">
            <Lightbulb className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">The Difference</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-4 leading-tight">
            This is not a training course.
            <span className="block text-[#F5A623]">This is a career program.</span>
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            A training course hands you a syllabus and a certificate. A Career Program builds your career — skills, real project experience, paid internship, industry certification, in-house hiring consideration, and a 90% job guarantee. The difference is not semantic. The difference is your career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* What we are NOT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5E9F0]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#5A6478]/10 flex items-center justify-center">
                <X className="w-5 h-5 text-[#5A6478]" />
              </div>
              <h3 className="text-lg font-bold text-[#5A6478]">What we are NOT</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                'A regular training institute with 40-60 students per batch',
                'A course that hands you a PDF and disappears',
                'Teachers who have never run real client work',
                'Simulated exercises and toy projects',
                'A certificate that says you attended',
                '"Placement assistance" with no real guarantee',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#5A6478]">
                  <X className="w-4 h-4 mt-0.5 shrink-0 text-[#5A6478]/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What we ARE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-[#F5A623]/30"
            style={{ background: 'linear-gradient(135deg, #0F2557 0%, #1E3A8A 100%)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center">
                <Check className="w-5 h-5 text-[#0F2557]" />
              </div>
              <h3 className="text-lg font-bold text-white">What we ARE</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                'Selective cohorts of 8-15 career-builders',
                'Real client projects from week 1 — not toy exercises',
                'Trainers who are working founders & professionals',
                'Paid internship included in flagship programs',
                'Industry certification backed by real project work',
                '90% job guarantee with in-house hiring consideration',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#F5A623]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mindset shift callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FDF7EC] border border-[#F5A623]/30 text-center"
        >
          <Rocket className="w-8 h-8 text-[#F5A623] mx-auto mb-3" />
          <p className="text-base sm:text-lg font-bold text-[#0F2557] mb-2">
            The biggest outcome is not the certificate. It is the mindset shift.
          </p>
          <p className="text-sm text-[#5A6478] max-w-2xl mx-auto leading-relaxed">
            You arrive as a student looking for a course. You leave as a career-builder who creates your own opportunities — as an employee, a freelancer, or a founder. That shift is what no regular training institute can give you. It is the real value of a BizMeals Career Program.
          </p>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     3. FLAGSHIP PROGRAMS
     ═══════════════════════════════════════════════════════ */

  const renderFlagshipPrograms = () => (
    <section id="programs" className="py-14 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold text-[#B8770E] uppercase tracking-wider">Flagship Career Programs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Start Here. Build Your Career.
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            Our three flagship programs — for future digital marketers, founders, and freelancers. Selective admission. 90% job guarantee. Taught by working professionals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {flagshipPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProgram(program)}
              className="group bg-white rounded-2xl border border-[#E5E9F0] overflow-hidden cursor-pointer transition-shadow hover:shadow-xl hover:shadow-[#0F2557]/10 hover:border-[#0F2557]/20 flex flex-col"
            >
              {/* Top gradient strip */}
              <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #0F2557 0%, #1E3A8A 50%, #F5A623 100%)' }} />

              <div className="p-6 flex flex-col flex-grow">
                {/* Badge + icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center">
                    <program.icon className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  {program.badge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF7EC] border border-[#F5A623]/30">
                      <Sparkles className="w-3 h-3 text-[#F5A623]" />
                      <span className="text-[10px] font-bold text-[#B8770E]">{program.badge}</span>
                    </span>
                  )}
                </div>

                {/* Title + tagline */}
                <h3 className="text-lg font-bold text-[#0F2557] mb-2 group-hover:text-[#1E3A8A] transition-colors">
                  {program.title}
                </h3>
                <p className="text-xs text-[#5A6478] leading-relaxed mb-4 flex-grow">{program.tagline}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF2FA] text-[#0F2557] text-[11px] font-semibold">
                    <Clock className="w-3 h-3" />
                    {program.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EEF2FA] text-[#0F2557] text-[11px] font-semibold">
                    <Wifi className="w-3 h-3" />
                    Online
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FDF7EC] text-[#B8770E] text-[11px] font-semibold">
                    <Lock className="w-3 h-3" />
                    {program.seats}
                  </span>
                </div>

                {/* Key outcome */}
                <div className="mb-4 p-3 rounded-xl bg-[#F5F7FA] border border-[#E5E9F0]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span className="text-[10px] font-bold text-[#0F2557] uppercase tracking-wider">Key Outcome</span>
                  </div>
                  <p className="text-xs text-[#3A4252] font-medium">{program.outcomes[0]}</p>
                </div>

                {/* CTA */}
                <button className="mt-auto w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0F2557] text-white text-sm font-bold hover:bg-[#1E3A8A] transition-colors group-hover:bg-[#F5A623] group-hover:text-[#0F2557]">
                  View Program Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     4. OTHER PROGRAMS
     ═══════════════════════════════════════════════════════ */

  const renderOtherPrograms = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FA] border border-[#E5E9F0] mb-4">
            <GraduationCap className="w-4 h-4 text-[#0F2557]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Specialist Career Programs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Build Specialist Careers
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            Deeper specialist programs for those who want to build careers in development, data science, corporate IT, or AI. Same selective admission. Same industry trainers. Same career-building mindset.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {otherPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedProgram(program)}
              className="group bg-[#F5F7FA] rounded-2xl border border-[#E5E9F0] p-5 cursor-pointer transition-all hover:border-[#0F2557]/20 hover:bg-white hover:shadow-lg hover:shadow-[#0F2557]/5 flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-[#E5E9F0] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#0F2557] group-hover:to-[#1E3A8A] transition-all">
                <program.icon className="w-6 h-6 text-[#0F2557] group-hover:text-[#F5A623] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#0F2557] group-hover:text-[#1E3A8A] transition-colors">{program.title}</h3>
                </div>
                <p className="text-xs text-[#5A6478] leading-relaxed mb-2 line-clamp-2">{program.tagline}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F2557]">
                    <Clock className="w-3 h-3" />
                    {program.duration}
                  </span>
                  <span className="text-[#E5E9F0]">|</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F2557]">
                    <Lock className="w-3 h-3" />
                    {program.seats}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#0F2557] group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all self-center shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     5. DIFFERENTIATORS
     ═══════════════════════════════════════════════════════ */

  const renderDifferentiators = () => (
    <section className="py-14 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#0F2557]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Why BizMeals Career Programs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Six reasons we are not a regular institute
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            Every difference below is why our graduates build real careers — and why regular training institutes cannot match our outcomes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-5 rounded-2xl bg-white border border-[#E5E9F0] hover:border-[#F5A623]/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center mb-3">
                <d.icon className="w-5 h-5 text-[#F5A623]" />
              </div>
              <h3 className="text-base font-bold text-[#0F2557] mb-2">{d.title}</h3>
              <p className="text-sm text-[#5A6478] leading-relaxed">{d.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     6. COMPARISON TABLE
     ═══════════════════════════════════════════════════════ */

  const renderComparison = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FA] border border-[#E5E9F0] mb-4">
            <BarChart3 className="w-4 h-4 text-[#0F2557]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Side-by-Side Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            BizMeals Career Programs vs Regular Institutes
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            The honest comparison. Show this to any candidate deciding between us and a regular training institute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#E5E9F0] overflow-hidden shadow-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#0F2557] text-white">
            <div className="p-4 text-xs font-bold uppercase tracking-wider">Feature</div>
            <div className="p-4 text-xs font-bold uppercase tracking-wider bg-[#F5A623] text-[#0F2557]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                BizMeals Career Programs
              </div>
            </div>
            <div className="p-4 text-xs font-bold uppercase tracking-wider text-white/70">
              Regular Training Institutes
            </div>
          </div>

          {/* Rows */}
          <div className="bg-white">
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]'} border-t border-[#E5E9F0]`}
              >
                <div className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-[#0F2557]">{row.feature}</div>
                <div className="p-3 sm:p-4 text-xs sm:text-sm text-[#3A4252] bg-[#FDF7EC]/40 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] mt-0.5 shrink-0" />
                  <span>{row.bizmeals}</span>
                </div>
                <div className="p-3 sm:p-4 text-xs sm:text-sm text-[#5A6478] flex items-start gap-1.5">
                  <X className="w-3.5 h-3.5 text-[#5A6478]/40 mt-0.5 shrink-0" />
                  <span>{row.others}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     7. TESTIMONIALS
     ═══════════════════════════════════════════════════════ */

  const renderTestimonials = () => (
    <section className="py-14 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <Quote className="w-4 h-4 text-[#0F2557]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Career Program Graduates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Real graduates. Real careers.
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            These are real outcomes from real BizMeals Career Program graduates. No actors. No fake testimonials. The 90% job guarantee is real — and so are these stories.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-5 rounded-2xl bg-white border border-[#E5E9F0] flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-3.5 h-3.5 ${idx < Math.floor(t.rating) ? 'text-[#F5A623] fill-[#F5A623]' : 'text-[#E5E9F0]'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#3A4252] leading-relaxed mb-4 flex-grow italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Outcome badge */}
              <div className="mb-4 p-2.5 rounded-lg bg-[#FDF7EC] border border-[#F5A623]/30">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span className="text-[11px] font-bold text-[#B8770E]">{t.outcome}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E9F0]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0F2557] to-[#1E3A8A] flex items-center justify-center text-white text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#0F2557]">{t.name}</div>
                  <div className="text-[11px] text-[#5A6478]">{t.role}</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-[#5A6478]/70 font-medium">{t.program}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     8. Q&A SECTION
     ═══════════════════════════════════════════════════════ */

  const renderQA = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FA] border border-[#E5E9F0] mb-4">
            <Bot className="w-4 h-4 text-[#0F2557]" />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Questions & Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Everything you need to know
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            Clear, honest answers — written so candidates understand us and so BDEs can pitch us without confusion.
          </p>
        </motion.div>

        <div className="space-y-3">
          {qaItems.map((qa, i) => {
            const isOpen = openQA === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="rounded-xl border border-[#E5E9F0] overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenQA(isOpen ? null : i)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-[#F5F7FA] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0F2557] pr-2">{qa.question}</span>
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#F5A623] rotate-180' : 'bg-[#EEF2FA]'}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#0F2557]' : 'text-[#0F2557]'}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5">
                        <div className="pl-0 sm:pl-4 sm:border-l-2 sm:border-[#F5A623]/40">
                          <p className="text-sm text-[#3A4252] leading-relaxed">{qa.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     9. BLOGS & INSERTS
     ═══════════════════════════════════════════════════════ */

  const renderBlogInserts = () => (
    <section className="py-14 sm:py-16 bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E9F0] mb-4">
            <BookOpenIcon />
            <span className="text-xs font-bold text-[#0F2557] uppercase tracking-wider">Blogs & Inserts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            Read more about the program
          </h2>
          <p className="text-base text-[#5A6478] max-w-2xl mx-auto">
            Short reads and deep dives about our Career Programs — for candidates who want to understand us better and for BDEs who want to pitch us cleanly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogInserts.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => setCurrentPage('blog')}
              className="group p-5 rounded-2xl bg-white border border-[#E5E9F0] cursor-pointer hover:border-[#0F2557]/20 hover:shadow-lg hover:shadow-[#0F2557]/5 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  b.type === 'Blog'
                    ? 'bg-[#EEF2FA] text-[#0F2557]'
                    : 'bg-[#FDF7EC] text-[#B8770E]'
                }`}>
                  {b.type === 'Blog' ? <Lightbulb className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  {b.type}
                </span>
                <b.icon className="w-5 h-5 text-[#0F2557] group-hover:text-[#F5A623] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0F2557] mb-2 group-hover:text-[#1E3A8A] transition-colors leading-snug">
                {b.title}
              </h3>
              <p className="text-xs text-[#5A6478] leading-relaxed flex-grow">{b.excerpt}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#0F2557] group-hover:text-[#F5A623] transition-colors">
                Read more
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  /* ═══════════════════════════════════════════════════════
     10. FINAL CTA
     ═══════════════════════════════════════════════════════ */

  const renderFinalCTA = () => (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Rocket className="w-7 h-7 text-[#0F2557]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to build your career?
              <span className="block text-[#F5A623]">Apply for a Career Program today.</span>
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Cohorts fill up fast. Apply today, clear the selection round, and join a cohort of serious career-builders. Selective admission. 90% job guarantee. Real career outcomes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => setCurrentPage('contact')}
                className="btn-cta border-0 font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
              >
                Apply Now — Selected Candidates Only
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                onClick={() => setCurrentPage('blog')}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white font-bold px-7 py-3.5 text-sm rounded-xl h-auto cursor-pointer"
              >
                Read Program Stories
              </Button>
            </div>
            <p className="text-[11px] text-white/50 mt-5">
              Selection involves a short aptitude round and a mindset interview. Not everyone is selected — and that is exactly why our graduates succeed.
            </p>
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
      {renderWhatIsCareerProgram()}
      {renderFlagshipPrograms()}
      {renderOtherPrograms()}
      {renderDifferentiators()}
      {renderComparison()}
      {renderTestimonials()}
      {renderQA()}
      {renderBlogInserts()}
      {renderFinalCTA()}

      <AnimatePresence>
        {selectedProgram && (
          <ProgramDetailModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
            onApply={handleApply}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* small inline icon component to avoid name clash with BookOpen from lucide */
function BookOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F2557]">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
