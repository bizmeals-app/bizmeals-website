/**
 * Fallback data for public APIs when database is not available.
 * This ensures the public website always works, even without a database configured.
 * When the database IS available (Turso/SQLite), the APIs will use that data instead.
 */

export interface FallbackBlog {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string
  image: string
  authorName: string
  published: boolean
  featured: boolean
  readTime: string
  createdAt: string
  updatedAt: string
}

export interface FallbackTraining {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  duration: string
  skills: string
  includes: string
  outcome: string
  icon: string
  joinLink: string
  highlights: string
  accent: string
  order: number
  createdAt: string
}

export interface FallbackJob {
  id: string
  title: string
  slug: string
  description: string
  location: string
  type: string
  department: string
  salary: string
  requirements: string
  responsibilities: string
  applyLink: string
  featured: boolean
  createdAt: string
}

export interface FallbackUpdate {
  id: string
  title: string
  slug: string
  content: string
  type: string
  image: string
  link: string
  featured: boolean
  createdAt: string
}

export interface FallbackSetting {
  key: string
  value: string
}

const now = new Date().toISOString()
const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString()

export const fallbackBlogs: FallbackBlog[] = [
  {
    id: 'fb1',
    title: 'Why Career Training Programs Matter More Than College Degrees in 2025',
    slug: 'career-training-vs-degree-2025',
    excerpt: 'The job market has shifted. Employers now prioritize skills over degrees. Here is why career training programs are the smarter investment for your future.',
    category: 'Career Training',
    tags: 'Career Training,Job Readiness,Skills vs Degrees,BizMeals Training,Employability',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: true,
    readTime: '6 min',
    createdAt: daysAgo(80),
    updatedAt: daysAgo(80),
  },
  {
    id: 'fb2',
    title: 'How BizMeals Training Program Transforms Freshers into Job-Ready Professionals',
    slug: 'bizmeals-training-transforms-freshers',
    excerpt: 'From classroom to career: A detailed look at how BizMeals takes beginners with zero experience and builds them into confident, skilled professionals ready for the job market.',
    category: 'Career Training',
    tags: 'Fresher Training,Job-Ready Skills,Live Projects,Mentorship,BizMeals Programs',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '7 min',
    createdAt: daysAgo(87),
    updatedAt: daysAgo(87),
  },
  {
    id: 'fb3',
    title: 'Digital Marketing Career: The Complete Roadmap for Beginners in 2025',
    slug: 'digital-marketing-career-roadmap-2025',
    excerpt: 'Your step-by-step guide to building a successful digital marketing career from scratch, including skills to learn, tools to master, and salaries to expect.',
    category: 'Digital Marketing',
    tags: 'Digital Marketing,Career Roadmap,SEO,SEM,AI Marketing,Salary Guide',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: true,
    readTime: '8 min',
    createdAt: daysAgo(94),
    updatedAt: daysAgo(94),
  },
  {
    id: 'fb4',
    title: 'Full Stack Development: From Zero to Hired in 120 Days',
    slug: 'full-stack-development-zero-to-hired',
    excerpt: 'A realistic timeline and framework for going from no coding experience to landing your first full stack developer job.',
    category: 'Career Training',
    tags: 'Full Stack Development,React,Node.js,Coding Bootcamp,Developer Career',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '7 min',
    createdAt: daysAgo(102),
    updatedAt: daysAgo(102),
  },
  {
    id: 'fb5',
    title: 'Freelancing in India: How to Start Earning 50K+/Month from Home',
    slug: 'freelancing-india-50k-month',
    excerpt: 'A practical, no-fluff guide to building a freelance income in India, covering platform selection, pricing strategy, client acquisition, and scaling beyond the first lakh.',
    category: 'Freelancing',
    tags: 'Freelancing,Work From Home,Client Acquisition,Pricing Strategy,Indian Freelancers',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '8 min',
    createdAt: daysAgo(107),
    updatedAt: daysAgo(107),
  },
  {
    id: 'fb6',
    title: 'Why 90% of Startups Fail -- And How BizMeals Helps You Be in the 10%',
    slug: 'why-90-percent-startups-fail',
    excerpt: 'The brutal reality of startup failure and the systematic approach BizMeals uses to help founders avoid the most common mistakes that kill businesses.',
    category: 'Startup Insights',
    tags: 'Startup Failure,Business Strategy,Market Validation,Cash Flow,BizMeals Consulting',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: true,
    readTime: '7 min',
    createdAt: daysAgo(114),
    updatedAt: daysAgo(114),
  },
  {
    id: 'fb7',
    title: 'How to Build a Business That Runs Without You: Systems and Delegation',
    slug: 'business-runs-without-you',
    excerpt: 'Most business owners are prisoners of their own company. Here is the framework for building systems, delegating effectively, and achieving true entrepreneurial freedom.',
    category: 'Business Growth',
    tags: 'Business Systems,Delegation,Entrepreneur Freedom,SOPs,Automation',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '6 min',
    createdAt: daysAgo(122),
    updatedAt: daysAgo(122),
  },
  {
    id: 'fb8',
    title: 'AI in Marketing: What is Real and What is Hype in 2025',
    slug: 'ai-in-marketing-real-vs-hype',
    excerpt: 'Cutting through the noise to identify AI marketing tools that actually deliver measurable results, and the overhyped technologies that waste your budget.',
    category: 'Digital Marketing',
    tags: 'AI Marketing,Marketing Automation,ChatGPT,Predictive Analytics,AI Tools',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '5 min',
    createdAt: daysAgo(130),
    updatedAt: daysAgo(130),
  },
  {
    id: 'fb9',
    title: '5 Growth Strategies That Will Dominate 2025',
    slug: '5-growth-strategies-2025',
    excerpt: 'From AI-powered personalization to hyper-local targeting, these five strategies are reshaping how businesses grow in the current market.',
    category: 'Business Growth',
    tags: 'Growth Strategies,AI Personalization,Short-Form Video,Community Building,Local Marketing',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: true,
    readTime: '6 min',
    createdAt: daysAgo(137),
    updatedAt: daysAgo(137),
  },
  {
    id: 'fb10',
    title: 'How We Helped a Real Estate Company Generate 2.5Cr Revenue',
    slug: 'real-estate-2.5cr-revenue',
    excerpt: 'A detailed case study of how BizMeals transformed a struggling real estate firm into a revenue-generating machine through digital marketing and lead management systems.',
    category: 'Business Growth',
    tags: 'Case Study,Real Estate,Lead Generation,CRM,Revenue Growth',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: true,
    readTime: '6 min',
    createdAt: daysAgo(144),
    updatedAt: daysAgo(144),
  },
  {
    id: 'fb11',
    title: 'From Zero Online Presence to 220% More Leads: A Manufacturing Case Study',
    slug: 'manufacturing-zero-to-220-percent-leads',
    excerpt: 'How BizMeals took a traditional manufacturing company from having no digital footprint to generating more than triple their previous lead volume.',
    category: 'Business Growth',
    tags: 'Manufacturing,B2B Marketing,Lead Generation,SEO,Digital Transformation',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '5 min',
    createdAt: daysAgo(155),
    updatedAt: daysAgo(155),
  },
  {
    id: 'fb12',
    title: 'How BizMeals Transformed an E-Commerce Store to 4x ROAS',
    slug: 'ecommerce-4x-roas',
    excerpt: 'From burning ad spend to achieving a 4x return on ad spend: the exact strategies and optimizations that turned around a struggling e-commerce business.',
    category: 'Digital Marketing',
    tags: 'E-Commerce,ROAS,Meta Ads,Retargeting,Email Marketing',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '6 min',
    createdAt: daysAgo(165),
    updatedAt: daysAgo(165),
  },
  {
    id: 'fb13',
    title: 'The Freelancer Playbook: From Zero to 1L/month',
    slug: 'freelancer-playbook-zero-to-1l',
    excerpt: 'The definitive guide to building a six-figure freelance income, covering every stage from getting your first client to scaling beyond your personal capacity.',
    category: 'Freelancing',
    tags: 'Freelancing,Freelancer Income,Client Acquisition,Retainer Pricing,Six Figure Freelance',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '9 min',
    createdAt: daysAgo(173),
    updatedAt: daysAgo(173),
  },
  {
    id: 'fb14',
    title: 'Data Science and Machine Learning: The Hottest Career Path in 2025',
    slug: 'data-science-ml-career-2025',
    excerpt: 'Why data science and ML continue to dominate career charts, what skills you actually need, and how to break into the field without a PhD.',
    category: 'Career Training',
    tags: 'Data Science,Machine Learning,Python,Career Path,ML Engineer',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '7 min',
    createdAt: daysAgo(180),
    updatedAt: daysAgo(180),
  },
  {
    id: 'fb15',
    title: 'AI Tools and Automation: Why Every Professional Needs These Skills',
    slug: 'ai-tools-automation-every-professional',
    excerpt: 'AI proficiency is no longer optional. Here is why every working professional, regardless of industry, needs to understand AI tools and automation to stay competitive.',
    category: 'Career Training',
    tags: 'AI Tools,Automation,Professional Skills,Productivity,Future of Work',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '5 min',
    createdAt: daysAgo(190),
    updatedAt: daysAgo(190),
  },
  {
    id: 'fb16',
    title: 'Why Every Business Needs a Growth Partner, Not an Agency',
    slug: 'growth-partner-not-agency',
    excerpt: 'Understanding the fundamental difference between outsourcing your marketing and having a true strategic partner invested in your business outcomes.',
    category: 'Startup Insights',
    tags: 'Growth Partner,Business Consulting,Agency vs Partner,Revenue Growth,BizMeals',
    image: '',
    authorName: 'BizMeals',
    published: true,
    featured: false,
    readTime: '5 min',
    createdAt: daysAgo(200),
    updatedAt: daysAgo(200),
  },
]

export const fallbackTraining: FallbackTraining[] = [
  {
    id: 'ft1',
    title: 'Digital Marketing Professional Program',
    slug: 'digital-marketing-professional-program',
    description: 'Master SEO, Social Media, Ads, Content, Automation, Analytics & more with real campaigns',
    fullDescription: 'Master every aspect of digital marketing from SEO to paid ads. This 90-day intensive program is designed for students, freshers, and career switchers who want to enter the fast-growing digital marketing industry with confidence and real skills.|Work on real client campaigns from week 1. You will learn to create and manage SEO strategies, run social media campaigns, set up Google Ads and Meta Ads, write compelling content, and use analytics to drive results.|Learn to use AI tools for content creation, analytics, and automation. Get certified with hands-on project experience that employers actually value.|By the end of this program, you will be ready to apply for digital marketing roles at agencies, startups, and companies, or start your own freelance marketing business.',
    duration: '90 Days',
    skills: 'SEO (On-page & Off-page),Social Media Marketing,Google Ads & Meta Ads,Content Strategy & Copywriting,Email Marketing & Automation,Analytics & Reporting,AI Tools for Marketing,Conversion Rate Optimization',
    includes: 'Live Projects,Internship,AI Tools,Mentorship,Certification',
    outcome: 'Job-ready Digital Marketer',
    icon: 'Globe',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Work on real client campaigns from week 1,AI-powered marketing tools training included,Internship with hands-on project delivery,Industry-recognized certification',
    accent: 'biz-purple',
    order: 1,
    createdAt: now,
  },
  {
    id: 'ft2',
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-development',
    description: 'HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git/GitHub, REST APIs & deployment',
    fullDescription: 'Perfect for students and freshers aiming for software development jobs. This 120-day program takes you from zero to a job-ready Full Stack Developer with hands-on project experience and real-world coding skills.|Build real-world applications from scratch. You will master both frontend and backend technologies, starting with HTML, CSS, and JavaScript, progressing through React for dynamic UIs, then diving into Node.js, Express, and MongoDB for powerful backend development.|Learn version control with Git/GitHub, build and consume REST APIs, deploy applications to the cloud, and follow industry best practices for code quality.|Graduate with a portfolio of deployed projects, a professional GitHub profile, and the confidence to crack technical interviews.',
    duration: '120 Days',
    skills: 'HTML5 & CSS3,JavaScript (ES6+),React.js,Node.js & Express.js,MongoDB & Mongoose,Git & GitHub,REST API Development,Deployment & DevOps Basics',
    includes: 'Live Projects,Code Reviews,Mentorship,Certification',
    outcome: 'Full Stack Developer',
    icon: 'Code2',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Build and deploy 5+ real projects,Weekly code reviews by senior developers,Frontend + Backend complete training,GitHub portfolio and interview prep',
    accent: 'biz-blue',
    order: 2,
    createdAt: now,
  },
  {
    id: 'ft3',
    title: 'Data Science & Machine Learning Program',
    slug: 'data-science-machine-learning-program',
    description: 'Python, NumPy, Pandas, Data Cleaning, Visualization, Statistics, ML Algorithms, AI Tools & Real-Time Data Projects',
    fullDescription: 'Designed for tech learners who want to enter the high-demand data industry. This 120-day program gives you a complete foundation in data science, statistics, and machine learning with real-world project experience.|Work on real-time data projects using Python, NumPy, Pandas, and industry-standard visualization tools.|Master machine learning algorithms from linear regression to deep learning fundamentals. Learn to build, train, and evaluate models using real datasets.|Career outcomes include Data Analyst, Data Scientist, and ML Engineer roles at top companies.',
    duration: '120 Days',
    skills: 'Python for Data Science,NumPy & Pandas,Data Cleaning & Preprocessing,Data Visualization (Matplotlib, Seaborn),Statistics & Probability,Machine Learning Algorithms,AI Tools for Analytics,Model Evaluation & Deployment',
    includes: 'Live Projects,AI Tools,Mentorship,Certification',
    outcome: 'Data Scientist / ML Engineer',
    icon: 'BarChart3',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Real-time data project experience,Industry-standard tools and workflows,ML model building from scratch,AI-powered analytics training',
    accent: 'biz-teal',
    order: 3,
    createdAt: now,
  },
  {
    id: 'ft4',
    title: 'IT & Software Skills Training',
    slug: 'it-software-skills-training',
    description: 'Power BI, Excel, CRM, Project Management & automation tools for corporate jobs',
    fullDescription: 'Learn essential tools for corporate jobs. This 60-day program is specifically designed for those who want to work in office-based IT roles.|Master data analysis with Power BI and Advanced Excel, learn CRM systems for customer management, understand project management methodologies, and get trained on automation tools.|Every module is hands-on with live projects and real business scenarios.|Perfect for those seeking office-based IT roles, this program makes you corporate-ready from day one.',
    duration: '60 Days',
    skills: 'Power BI & Dashboards,Advanced Excel & VBA,CRM Systems (Salesforce Basics),Project Management Tools,Business Automation,Data Analysis & Reporting,Corporate Communication,Workflow Optimization',
    includes: 'Hands-on Tools,Live Projects,Mentorship',
    outcome: 'Corporate-ready professional',
    icon: 'Monitor',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Corporate-focused practical training,Hands-on with real business tools,Dashboard and report creation,Direct placement assistance',
    accent: 'biz-amber',
    order: 4,
    createdAt: now,
  },
  {
    id: 'ft5',
    title: 'AI Tools & Automation Training',
    slug: 'ai-tools-automation-training',
    description: 'AI for content creation, coding assistance, analytics, design, automation, and productivity',
    fullDescription: 'Learn how to use AI for content creation, coding assistance, analytics, design, automation, and productivity. This 45-day program is the fastest way to become AI-proficient.|Master practical AI tools that enhance every digital and tech career.|Understand automation workflows that save hours of manual work.|Whether you are a student, freelancer, or working professional, AI proficiency is no longer optional.',
    duration: '45 Days',
    skills: 'AI Content Creation (ChatGPT, Gemini),AI Coding Assistants,AI for Analytics & Insights,AI Design Tools,Workflow Automation,AI for Productivity,Prompt Engineering,AI Integration Strategies',
    includes: 'Practical AI Tools,Live Projects,Mentorship',
    outcome: 'AI-proficient professional',
    icon: 'Bot',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Master 15+ practical AI tools,Automation workflows for any career,Prompt engineering expertise,Boost productivity by 10x',
    accent: 'biz-violet',
    order: 5,
    createdAt: now,
  },
  {
    id: 'ft6',
    title: 'Freelancing & Self-Employment Training',
    slug: 'freelancing-self-employment-training',
    description: 'Profile setup, portfolio building, proposal writing, pricing, client communication, real project execution',
    fullDescription: 'Build a strong freelancing career with guidance on profile setup, portfolio building, proposal writing, pricing, client communication, and real project execution. This 30-day intensive program is designed to get you earning from day one.|Learn how to set up winning profiles on platforms like Upwork, Fiverr, and Freelancer.|Get hands-on experience executing real projects with actual client requirements.|By the end of this program, you will have a live freelancer profile, a completed portfolio, and the skills to independently find, win, and deliver freelance projects.',
    duration: '30 Days',
    skills: 'Freelance Profile Optimization,Portfolio Building,Proposal Writing & Winning,Pricing Strategies,Client Communication,Project Execution,Platform Mastery (Upwork, Fiverr),Time & Finance Management',
    includes: 'Platform Training,Client Acquisition,Portfolio Building',
    outcome: 'Freelance business ready',
    icon: 'Briefcase',
    joinLink: 'https://bizmeals.in/bizmeals-training-program/',
    highlights: 'Live freelancer profile setup,Win proposals with proven templates,Execute real client projects,Start earning from day one',
    accent: 'biz-cyan',
    order: 6,
    createdAt: now,
  },
]

export const fallbackJobs: FallbackJob[] = [
  {
    id: 'fj1',
    title: 'Digital Marketing Intern',
    slug: 'digital-marketing-intern',
    description: 'Join BizMeals as a Digital Marketing Intern and gain hands-on experience in SEO, social media marketing, content creation, and paid advertising.',
    location: 'Bangalore, India',
    type: 'internship',
    department: 'Marketing',
    salary: '10,000 - 15,000/month',
    requirements: 'Basic understanding of digital marketing concepts|Familiarity with social media platforms|Good written communication skills|Eagerness to learn and adapt',
    responsibilities: 'Assist in creating social media content|Help manage SEO tasks and keyword research|Support email marketing campaigns|Analyze campaign performance metrics',
    applyLink: 'mailto:hr@bizmeals.in?subject=Application: Digital Marketing Intern',
    featured: true,
    createdAt: daysAgo(7),
  },
  {
    id: 'fj2',
    title: 'Full Stack Developer',
    slug: 'full-stack-developer',
    description: 'We are looking for a Full Stack Developer to join our growing team. You will work on building and maintaining web applications for our clients using modern technologies.',
    location: 'Bangalore, India',
    type: 'full-time',
    department: 'Engineering',
    salary: '6 - 12 LPA',
    requirements: '2+ years of experience in full stack development|Proficiency in React.js and Node.js|Experience with MongoDB or PostgreSQL|Knowledge of REST API design',
    responsibilities: 'Build and maintain web applications|Design and implement RESTful APIs|Write clean, testable, and maintainable code|Participate in code reviews',
    applyLink: 'mailto:hr@bizmeals.in?subject=Application: Full Stack Developer',
    featured: true,
    createdAt: daysAgo(14),
  },
  {
    id: 'fj3',
    title: 'Content Writer',
    slug: 'content-writer',
    description: 'BizMeals is seeking a creative Content Writer to produce engaging blog posts, social media content, and marketing copy for our clients across various industries.',
    location: 'Remote',
    type: 'remote',
    department: 'Content',
    salary: '3 - 6 LPA',
    requirements: 'Excellent English writing skills|1+ year of content writing experience|Understanding of SEO best practices|Ability to write for different tones and audiences',
    responsibilities: 'Write blog posts, articles, and website copy|Create social media content calendars|Optimize content for SEO|Research industry topics and trends',
    applyLink: 'mailto:hr@bizmeals.in?subject=Application: Content Writer',
    featured: false,
    createdAt: daysAgo(21),
  },
  {
    id: 'fj4',
    title: 'Business Development Executive',
    slug: 'business-development-executive',
    description: 'Join our business development team to identify new opportunities, build client relationships, and drive revenue growth for BizMeals.',
    location: 'Bangalore, India',
    type: 'full-time',
    department: 'Sales',
    salary: '4 - 8 LPA',
    requirements: '1-3 years of experience in business development or sales|Strong communication and negotiation skills|Understanding of digital marketing services|Self-motivated with a results-driven approach',
    responsibilities: 'Identify and pursue new business opportunities|Build and maintain client relationships|Prepare proposals and presentations|Achieve monthly and quarterly sales targets',
    applyLink: 'mailto:hr@bizmeals.in?subject=Application: Business Development Executive',
    featured: true,
    createdAt: daysAgo(30),
  },
]

export const fallbackUpdates: FallbackUpdate[] = [
  {
    id: 'fu1',
    title: 'BizMeals Training Program Launches New AI Tools Course',
    slug: 'bizmeals-launches-ai-tools-course',
    content: 'BizMeals is excited to announce the launch of our new AI Tools & Automation Training program. This 45-day intensive course is designed to help professionals master practical AI tools for content creation, coding, analytics, design, and workflow automation.',
    type: 'announcement',
    image: '',
    link: '',
    featured: true,
    createdAt: daysAgo(10),
  },
  {
    id: 'fu2',
    title: 'BizMeals Crosses 500+ Trained Professionals Milestone',
    slug: 'bizmeals-500-trained-professionals',
    content: 'We are proud to announce that BizMeals has successfully trained over 500 professionals across our Digital Marketing, Full Stack Development, Data Science, and Freelancing programs. With an 85%+ placement rate, our graduates are making their mark at companies across India and beyond.',
    type: 'milestone',
    image: '',
    link: '',
    featured: true,
    createdAt: daysAgo(25),
  },
  {
    id: 'fu3',
    title: 'New Partnership with Leading Bangalore Tech Companies',
    slug: 'bizmeals-bangalore-tech-partnership',
    content: 'BizMeals has entered into strategic partnerships with several leading technology companies in Bangalore to provide direct placement opportunities for our training program graduates.',
    type: 'news',
    image: '',
    link: '',
    featured: false,
    createdAt: daysAgo(40),
  },
  {
    id: 'fu4',
    title: 'BizMeals Real Estate Client Generates 2.5 Crore Revenue',
    slug: 'real-estate-client-2-5cr-revenue',
    content: 'Our business growth consulting services helped a mid-sized real estate company in Hyderabad increase their quarterly revenue from 80 lakhs to over 2.5 crores within six months.',
    type: 'achievement',
    image: '',
    link: '',
    featured: false,
    createdAt: daysAgo(55),
  },
  {
    id: 'fu5',
    title: 'Manufacturing Client Achieves 220% Lead Increase',
    slug: 'manufacturing-client-220-percent-leads',
    content: 'BizMeals helped a precision engineering manufacturer in Pune increase their lead volume by 220% and organic website traffic by 340% within 90 days.',
    type: 'achievement',
    image: '',
    link: '',
    featured: false,
    createdAt: daysAgo(70),
  },
  {
    id: 'fu6',
    title: 'EMI Options Now Available for All Training Programs',
    slug: 'emi-options-available-training',
    content: 'To make quality education accessible to everyone, BizMeals now offers affordable EMI (Equated Monthly Installment) options for all training programs. Students can enroll in any program and pay in convenient monthly installments.',
    type: 'update',
    image: '',
    link: '',
    featured: false,
    createdAt: daysAgo(90),
  },
]

export const fallbackSettings: Record<string, string> = {
  site_name: 'BizMeals',
  site_tagline: 'Empowering Businesses. Building Careers.',
  site_description: 'BizMeals - Business Growth Services, Career Training Programs, and Digital Marketing Solutions',
  contact_email: 'info@bizmeals.in',
  contact_phone: '+91 8217330484',
  contact_address: 'Bangalore, India',
  hr_email: 'hr@bizmeals.in',
  social_linkedin: 'https://www.linkedin.com/company/bizmeals',
  social_instagram: 'https://www.instagram.com/bizmeals',
  social_facebook: 'https://www.facebook.com/bizmeals',
  social_twitter: 'https://twitter.com/bizmeals',
  social_youtube: '',
  whatsapp_number: '+918217330484',
  seo_title: 'BizMeals - Business Growth & Career Training',
  seo_description: 'BizMeals helps businesses grow with digital marketing, career training programs, and business consulting services.',
  seo_keywords: 'business growth, career training, digital marketing, BizMeals, freelancing, startup consulting',
}

/**
 * Check if the database is likely available (Turso URL is set and not a file path)
 */
export function isDatabaseAvailable(): boolean {
  const url = process.env.DATABASE_URL || ''
  // File-based SQLite works in development but NOT on Vercel (read-only filesystem)
  // Only libsql:// or https:// URLs work on Vercel
  if (url.startsWith('file:')) {
    return process.env.NODE_ENV !== 'production'
  }
  return url.startsWith('libsql://') || url.startsWith('https://')
}
