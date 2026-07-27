import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import { getAdminUser } from '@/lib/admin-auth'

// POST /api/admin/seed - Seed the database with default data
// Requires authentication OR empty database (first-time setup)
export async function POST() {
  try {
    // Check if already seeded
    const adminCount = await db.adminUser.count()
    if (adminCount > 0) {
      // If admins exist, require authentication
      const admin = await getAdminUser()
      if (!admin || admin.role !== 'super_admin') {
        return NextResponse.json({ error: 'Unauthorized. Super admin required.' }, { status: 403 })
      }
      return NextResponse.json({ message: 'Database already seeded', skipped: true })
    }

    // 1. Create default admin user (secure PBKDF2 hash)
    const hashedPassword = await hashPassword('BizMeals@2025')
    await db.adminUser.create({
      data: {
        email: 'admin@bizmeals.in',
        password: hashedPassword,
        name: 'Admin',
        role: 'super_admin',
      },
    })

    // 2. Create default site settings
    const settings = [
      { key: 'site_name', value: 'BizMeals', type: 'text', label: 'Site Name', group: 'general' },
      { key: 'site_tagline', value: 'Empowering Businesses. Building Careers.', type: 'text', label: 'Site Tagline', group: 'general' },
      { key: 'site_description', value: 'BizMeals - Business Growth Services, Career Training Programs, and Digital Marketing Solutions', type: 'text', label: 'Site Description', group: 'general' },
      { key: 'contact_email', value: 'info@bizmeals.in', type: 'text', label: 'Contact Email', group: 'contact' },
      { key: 'contact_phone', value: '+91 8217330484', type: 'text', label: 'Contact Phone', group: 'contact' },
      { key: 'contact_address', value: 'Bangalore, India', type: 'text', label: 'Contact Address', group: 'contact' },
      { key: 'hr_email', value: 'hr@bizmeals.in', type: 'text', label: 'HR Email', group: 'contact' },
      { key: 'social_linkedin', value: 'https://www.linkedin.com/company/bizmeals', type: 'text', label: 'LinkedIn URL', group: 'social' },
      { key: 'social_instagram', value: 'https://www.instagram.com/bizmeals', type: 'text', label: 'Instagram URL', group: 'social' },
      { key: 'social_facebook', value: 'https://www.facebook.com/bizmeals', type: 'text', label: 'Facebook URL', group: 'social' },
      { key: 'social_twitter', value: 'https://twitter.com/bizmeals', type: 'text', label: 'Twitter URL', group: 'social' },
      { key: 'social_youtube', value: '', type: 'text', label: 'YouTube URL', group: 'social' },
      { key: 'whatsapp_number', value: '+918217330484', type: 'text', label: 'WhatsApp Number', group: 'social' },
      { key: 'seo_title', value: 'BizMeals - Business Growth & Career Training', type: 'text', label: 'SEO Title', group: 'seo' },
      { key: 'seo_description', value: 'BizMeals helps businesses grow with digital marketing, career training programs, and business consulting services.', type: 'text', label: 'SEO Description', group: 'seo' },
      { key: 'seo_keywords', value: 'business growth, career training, digital marketing, BizMeals, freelancing, startup consulting', type: 'text', label: 'SEO Keywords', group: 'seo' },
    ]

    await db.siteSetting.createMany({ data: settings })

    // 3. Create all 16 blog posts from the hardcoded data in blog-page.tsx
    const blogs = [
      {
        title: 'Why Career Training Programs Matter More Than College Degrees in 2025',
        slug: 'career-training-vs-degree-2025',
        excerpt: 'The job market has shifted. Employers now prioritize skills over degrees. Here is why career training programs are the smarter investment for your future.',
        content: 'The landscape of employment has undergone a seismic shift. According to a 2024 LinkedIn report, 72% of hiring managers now consider skills-first hiring over degree requirements. This is not a trend that will reverse. The reasons are structural: technology evolves faster than university curricula, and employers need professionals who can deliver results from day one, not graduates who need six months of on-the-job training to become productive.\n\nCareer training programs, like those offered by BizMeals, are designed with one objective: to make you employable. Unlike traditional degrees that spend semesters on theoretical foundations, career training focuses on practical, industry-relevant skills. Our Digital Marketing Professional Program, for example, covers SEO, social media marketing, paid advertising, content strategy, and AI-powered analytics in 90 days with live client projects. A university marketing degree rarely touches these tools in four years.\n\nThe financial argument is equally compelling. A four-year engineering or business degree in India costs anywhere from 8 to 20 lakh rupees, not including opportunity cost. BizMeals training programs cost a fraction of that and deliver a direct return on investment. Most of our graduates start earning within 30 days of completing their program, either through freelancing projects or full-time placements. When you calculate ROI, career training wins by a significant margin.\n\nThe data supports this shift. A NASSCOM study found that only 47% of Indian engineering graduates are employable, while structured training programs report 85%+ placement rates. The gap is not in intelligence or potential; it is in preparation. Career training bridges that gap by teaching exactly what the industry demands: hands-on tool proficiency, project execution, client communication, and professional accountability.\n\nIf you are a fresher, a career switcher, or someone who feels their degree has not delivered the career they expected, it is time to rethink your approach. Explore BizMeals Training Programs to find a path that leads directly to real opportunities, not just a certificate on a wall.',
        category: 'Career Training',
        tags: 'Career Training,Job Readiness,Skills vs Degrees,BizMeals Training,Employability',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: true,
        readTime: '6 min',
      },
      {
        title: 'How BizMeals Training Program Transforms Freshers into Job-Ready Professionals',
        slug: 'bizmeals-training-transforms-freshers',
        excerpt: 'From classroom to career: A detailed look at how BizMeals takes beginners with zero experience and builds them into confident, skilled professionals ready for the job market.',
        content: 'Every year, over 1.5 million engineering and management graduates enter the Indian job market. Yet, according to the India Skills Report, less than half are considered employable by industry standards. The problem is not a lack of talent; it is a lack of practical exposure. BizMeals was founded to solve this exact gap, and our training methodology is built around one principle: learn by doing real work.\n\nThe BizMeals training journey starts with foundational skills but quickly moves into live project execution. In our Full Stack Web Development program, for instance, students do not just watch tutorials on React and Node.js. Within the first two weeks, they are building actual web applications. By week eight, they are deploying full-stack projects with databases, authentication, and payment integration. By the end of the 120-day program, each student has a portfolio of four to six production-ready projects that demonstrate competence to any hiring manager.\n\nMentorship is the differentiator that most training programs lack. At BizMeals, every learner is paired with an industry mentor who has a minimum of five years of professional experience. These mentors do not just review code or campaigns; they simulate real workplace dynamics: deadlines, client feedback loops, team collaboration, and stakeholder communication.\n\nThe results speak for themselves. Over 85% of BizMeals graduates report career progression within 90 days of program completion. Whether it is landing a full-time role at a digital agency, winning freelance contracts on platforms like Upwork and Fiverr, or building their own service-based business, our alumni are proof that the right training methodology works.\n\nOur placement support does not end with interview preparation. We maintain an active hiring partner network, provide direct introductions to companies, and offer ongoing career guidance for up to six months after graduation.',
        category: 'Career Training',
        tags: 'Fresher Training,Job-Ready Skills,Live Projects,Mentorship,BizMeals Programs',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '7 min',
      },
      {
        title: 'Digital Marketing Career: The Complete Roadmap for Beginners in 2025',
        slug: 'digital-marketing-career-roadmap-2025',
        excerpt: 'Your step-by-step guide to building a successful digital marketing career from scratch, including skills to learn, tools to master, and salaries to expect.',
        content: 'Digital marketing is no longer an optional skill for businesses; it is the primary engine of growth. In 2025, global digital ad spending is projected to surpass $740 billion, and India alone accounts for over $12 billion of that figure. This means the demand for skilled digital marketers has never been higher.\n\nThe roadmap begins with understanding the core pillars: Search Engine Optimization (SEO), Search Engine Marketing (SEM), Social Media Marketing (SMM), Content Marketing, and Email Marketing. Each of these disciplines has its own tools and techniques. Our Digital Marketing Professional Program at BizMeals covers all of these in a structured 90-day curriculum with hands-on projects.\n\nThe second phase of your career roadmap is specialization. Generalists get started, but specialists advance. Choose one or two areas to go deep: performance marketing (paid ads with measurable ROI), technical SEO, marketing automation, or AI-driven content strategy. The most in-demand skill in 2025 is the ability to use AI tools for marketing efficiency. Professionals who can leverage ChatGPT for content ideation, Midjourney for creative assets, and automation platforms for workflow optimization command 30-40% higher salaries than their peers.\n\nSalary expectations in India reflect this demand. Entry-level digital marketers earn between 3 to 5 LPA. Mid-level professionals with 3-5 years of experience earn 8 to 15 LPA. Senior specialists and team leads command 18 to 35 LPA. Freelancers with strong portfolios can earn 50,000 to 2 lakh rupees per month depending on their client base.\n\nIf you want to follow this roadmap with expert guidance, live projects, and a community of peers, explore the BizMeals Digital Marketing Training Program.',
        category: 'Digital Marketing',
        tags: 'Digital Marketing,Career Roadmap,SEO,SEM,AI Marketing,Salary Guide',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: true,
        readTime: '8 min',
      },
      {
        title: 'Full Stack Development: From Zero to Hired in 120 Days',
        slug: 'full-stack-development-zero-to-hired',
        excerpt: 'A realistic timeline and framework for going from no coding experience to landing your first full stack developer job, based on how BizMeals structures its training program.',
        content: 'Full stack development remains one of the most sought-after skills in the technology job market. The Indian IT industry alone creates over 200,000 new developer positions annually, and the demand consistently outpaces supply. But the question every beginner asks is: how long does it actually take to become employable? The honest answer, based on our experience at BizMeals training over 500 developers, is 120 days if you follow a structured, project-based learning path.\n\nThe first 30 days focus on foundations: HTML, CSS, and JavaScript. This is not the glamorous part, but it is non-negotiable. You need to understand how the browser renders content, how the DOM works, and how JavaScript handles asynchronous operations.\n\nDays 31 through 70 cover the front-end and back-end frameworks that employers actually use. On the front end, that means React.js with hooks, state management, and component architecture. On the back end, it means Node.js with Express, REST API design, and MongoDB for data persistence.\n\nThe final 50 days are dedicated to advanced topics and portfolio building. This includes Git version control, deployment on Vercel and AWS, database optimization, and writing clean, maintainable code. The capstone project is a full-stack application of the student\'s choice, deployed and presented to a panel of industry mentors.\n\nOur graduates have been placed at companies ranging from early-stage startups to established IT firms, with starting salaries between 4 to 8 LPA.',
        category: 'Career Training',
        tags: 'Full Stack Development,React,Node.js,Coding Bootcamp,Developer Career',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '7 min',
      },
      {
        title: 'Freelancing in India: How to Start Earning 50K+/Month from Home',
        slug: 'freelancing-india-50k-month',
        excerpt: 'A practical, no-fluff guide to building a freelance income in India, covering platform selection, pricing strategy, client acquisition, and scaling beyond the first lakh.',
        content: 'Freelancing in India has moved beyond a side hustle. With platforms like Upwork, Fiverr, Freelancer, and direct outreach via LinkedIn, Indian freelancers are earning between 50,000 to 5 lakh rupees per month from their homes. The key is not talent alone; it is strategy.\n\nStep one is choosing a service that has proven demand. The highest-paying freelance categories in India right now are web development, digital marketing, content writing, graphic design, and data analysis. Within each of these, you should niche down further.\n\nStep two is building a portfolio that sells. Clients do not hire based on qualifications; they hire based on proof. Every project in the BizMeals training program doubles as a portfolio piece, so by the time you start pitching clients, you already have proof of competence.\n\nStep three is pricing for profitability. The biggest mistake new freelancers make is underpricing to win projects. Calculate your minimum acceptable rate based on your monthly income target divided by available working hours, then add a 30% margin.\n\nStep four is client acquisition. Do not rely solely on freelance platforms where you compete on price. Build a direct outreach pipeline: optimize your LinkedIn profile, publish content in your niche, and send personalized proposals to 10 potential clients per week.',
        category: 'Freelancing',
        tags: 'Freelancing,Work From Home,Client Acquisition,Pricing Strategy,Indian Freelancers',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '8 min',
      },
      {
        title: 'Why 90% of Startups Fail -- And How BizMeals Helps You Be in the 10%',
        slug: 'why-90-percent-startups-fail',
        excerpt: 'The brutal reality of startup failure and the systematic approach BizMeals uses to help founders avoid the most common mistakes that kill businesses.',
        content: 'The statistic is well-known but worth repeating: 90% of startups fail. Of those, 42% fail because there is no market need for their product, 29% run out of cash, 23% have the wrong team, and 19% get outcompeted. These are not random events; they are predictable outcomes of avoidable mistakes.\n\nThe first and most critical factor is market validation. Most founders build first and ask questions later. BizMeals flips this sequence. Before any business invests in product development, we run market validation sprints: landing page tests, social media ad campaigns, and customer interviews that generate real data on demand.\n\nThe second factor is cash flow management. Running out of cash is not a liquidity problem; it is a planning problem. BizMeals helps founders build financial models that account for worst-case scenarios, establish clear milestones for funding rounds, and prioritize revenue-generating activities over vanity metrics.\n\nThe third factor is team composition. Solo founders are 2.5 times more likely to fail than founding teams, but the wrong team is worse than no team. BizMeals connects founders with complementary skill sets through our network and advises on equity distribution, role clarity, and conflict resolution frameworks.\n\nBeing in the 10% is not about luck. It is about making data-driven decisions, managing resources ruthlessly, and having the right partners at every stage. BizMeals exists to be that partner.',
        category: 'Startup Insights',
        tags: 'Startup Failure,Business Strategy,Market Validation,Cash Flow,BizMeals Consulting',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: true,
        readTime: '7 min',
      },
      {
        title: 'How to Build a Business That Runs Without You: Systems and Delegation',
        slug: 'business-runs-without-you',
        excerpt: 'Most business owners are prisoners of their own company. Here is the framework for building systems, delegating effectively, and achieving true entrepreneurial freedom.',
        content: 'If your business cannot operate without you for two weeks, you do not own a business; you own a job. This is the uncomfortable truth that most entrepreneurs avoid. The difference between a business owner and a self-employed worker is systems.\n\nThe first step is identifying the activities that only you can do versus the activities that you currently do but someone else could. Most business owners spend 80% of their time on the latter: responding to routine emails, posting on social media, following up with leads, managing basic finances, and handling customer inquiries.\n\nDelegation is not abdication. It requires three elements: clear documentation of the process, defined quality standards and checkpoints, and accountability mechanisms. At BizMeals, we help businesses build these systems from scratch.\n\nTechnology is the great multiplier. Tools like Zapier, Make, and AI-powered chatbots can automate workflows that previously required full-time employees. CRM systems like HubSpot or Zoho can manage your entire sales pipeline with minimal manual intervention.\n\nThe ultimate goal is what we call the "freedom metric": can you take a two-week vacation without your revenue dropping? If the answer is no, you have work to do. BizMeals helps business owners build toward this metric through our growth consulting services.',
        category: 'Business Growth',
        tags: 'Business Systems,Delegation,Entrepreneur Freedom,SOPs,Automation',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '6 min',
      },
      {
        title: 'AI in Marketing: What is Real and What is Hype in 2025',
        slug: 'ai-in-marketing-real-vs-hype',
        excerpt: 'Cutting through the noise to identify AI marketing tools that actually deliver measurable results, and the overhyped technologies that waste your budget.',
        content: 'Every marketing conference in 2025 has "AI" in its title, and every SaaS platform claims to be "AI-powered." But when you strip away the buzzwords and look at actual campaign performance data, the landscape is more nuanced.\n\nThe real wins are in content acceleration, predictive analytics, and personalization at scale. Tools like ChatGPT and Claude for content ideation reduce first-draft time by 60-70%. Predictive analytics platforms like 6sense and Clearbit help B2B marketers identify accounts that are actively in-market, improving advertising efficiency by 3-5x.\n\nThe hype is in fully autonomous AI marketing agents that claim to replace your entire marketing team. No current AI tool can independently develop brand strategy, understand cultural nuance, or make judgment calls on sensitive brand positioning. The winning formula is AI-augmented human expertise, not AI replacement.\n\nFor small and medium businesses, the most practical AI investments in 2025 are: AI copywriting tools for social media and email (saves 10+ hours per week), chatbots for customer support (handles 60-70% of routine inquiries), and AI-powered ad optimization platforms (improves ROAS by 20-40% with the same budget).\n\nThe businesses that will win the AI race are not the ones that adopt every new tool, but the ones that strategically integrate AI into their existing workflows.',
        category: 'Digital Marketing',
        tags: 'AI Marketing,Marketing Automation,ChatGPT,Predictive Analytics,AI Tools',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '5 min',
      },
      {
        title: '5 Growth Strategies That Will Dominate 2025',
        slug: '5-growth-strategies-2025',
        excerpt: 'From AI-powered personalization to hyper-local targeting, these five strategies are reshaping how businesses grow in the current market.',
        content: 'Growth in 2025 looks fundamentally different from growth in 2020. The strategies that worked during the pandemic boom, broad digital advertising and aggressive discounting, are yielding diminishing returns. Customer acquisition costs have risen 60% across major platforms since 2021.\n\nStrategy one: AI-driven personalization at scale. Businesses that deliver personalized experiences across email, web, and social media see 40% higher conversion rates than those using generic messaging.\n\nStrategy two: Short-form video as the primary content format. Instagram Reels, YouTube Shorts, and LinkedIn video content generate 2-3x more engagement than static posts.\n\nStrategy three: Community-led growth. Building an engaged community around your brand creates a moat that competitors cannot easily replicate. Community members have 3-5x higher lifetime value than one-time customers.\n\nStrategy four: Hyper-local marketing. For businesses serving specific geographic areas, hyper-local targeting produces conversion rates 2-3x higher than broad campaigns.\n\nStrategy five: Revenue operations (RevOps) alignment. Companies that align marketing, sales, and customer success under a unified data and process framework grow 3x faster than those operating in silos.',
        category: 'Business Growth',
        tags: 'Growth Strategies,AI Personalization,Short-Form Video,Community Building,Local Marketing',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: true,
        readTime: '6 min',
      },
      {
        title: 'How We Helped a Real Estate Company Generate 2.5Cr Revenue',
        slug: 'real-estate-2.5cr-revenue',
        excerpt: 'A detailed case study of how BizMeals transformed a struggling real estate firm into a revenue-generating machine through digital marketing and lead management systems.',
        content: 'When a mid-sized real estate development company in Hyderabad approached BizMeals, they had a familiar problem: strong projects, weak sales. Revenue had plateaued at 80 lakhs per quarter.\n\nBizMeals diagnosed the problem in the first week: there was no lead generation engine, no lead nurturing process, and no data-driven decision making. We implemented a three-phase transformation. Phase one was building a digital presence: a conversion-optimized website, Google Business Profile setup, and active social media profiles.\n\nPhase two was lead management automation. We implemented a CRM system that captured every lead from every source, assigned lead scores based on engagement, and triggered automated follow-up sequences via email and WhatsApp. This single change increased their sales team efficiency by 45%.\n\nPhase three was scaling what worked. After 60 days of data collection, we identified the top-performing channels, ad formats, and audience segments. We doubled the budget on winning campaigns and cut the losers. We also launched a referral program.\n\nThe result: within six months, quarterly revenue increased from 80 lakhs to over 2.5 crores. This transformation was not magic. It was the systematic application of digital marketing fundamentals, automation, and data-driven optimization.',
        category: 'Business Growth',
        tags: 'Case Study,Real Estate,Lead Generation,CRM,Revenue Growth',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: true,
        readTime: '6 min',
      },
      {
        title: 'From Zero Online Presence to 220% More Leads: A Manufacturing Case Study',
        slug: 'manufacturing-zero-to-220-percent-leads',
        excerpt: 'How BizMeals took a traditional manufacturing company from having no digital footprint to generating more than triple their previous lead volume.',
        content: 'Manufacturing companies in India have traditionally relied on trade shows, distributor networks, and direct sales calls to generate business. But the buying behavior has changed. 70% of B2B buyers now research suppliers online before making contact.\n\nThe company that came to BizMeals was a precision engineering manufacturer based in Pune. They had a website built in 2015 that had not been updated since, no social media presence, and zero content marketing.\n\nBizMeals built a comprehensive digital growth engine in four phases. First, we redesigned their website with conversion-focused landing pages. Second, we launched a content marketing program. Third, we implemented SEO optimization targeting industry-specific keywords. Fourth, we set up LinkedIn advertising campaigns.\n\nThe results were transformative. Within 90 days, organic website traffic increased by 340%. Lead volume increased by 220%, and more importantly, lead quality improved significantly. The sales cycle shortened by 30%.\n\nThis case study demonstrates that digital transformation for manufacturing is not about becoming a tech company. It is about making your existing expertise, quality, and credibility discoverable to the people who are already looking for what you offer.',
        category: 'Business Growth',
        tags: 'Manufacturing,B2B Marketing,Lead Generation,SEO,Digital Transformation',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '5 min',
      },
      {
        title: 'How BizMeals Transformed an E-Commerce Store to 4x ROAS',
        slug: 'ecommerce-4x-roas',
        excerpt: 'From burning ad spend to achieving a 4x return on ad spend: the exact strategies and optimizations that turned around a struggling e-commerce business.',
        content: 'Return on ad spend (ROAS) is the lifeblood metric of e-commerce. When an e-commerce brand specializing in organic skincare products approached BizMeals, their ROAS was 0.8. For every 100 rupees they spent on Meta and Google Ads, they were getting back only 80 rupees in revenue.\n\nThe diagnosis was straightforward: they were running broad targeting with generic ad creatives to cold audiences, with no retargeting strategy, no email marketing, and no customer segmentation.\n\nThe turnaround strategy had four components. First, audience segmentation: we identified three high-value segments. Second, creative optimization: we replaced generic product photos with lifestyle imagery, video testimonials, and before-and-after content. Click-through rates improved by 85% within two weeks.\n\nThird, we implemented a full-funnel retargeting strategy. Fourth, we launched an email marketing program with automated flows. Email revenue went from zero to 18% of total revenue within 60 days. Combined, these changes took their ROAS from 0.8 to 4.2. Monthly revenue increased from 5 lakhs to 22 lakhs.\n\nE-commerce success is not about spending more on ads; it is about making every rupee work harder.',
        category: 'Digital Marketing',
        tags: 'E-Commerce,ROAS,Meta Ads,Retargeting,Email Marketing',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '6 min',
      },
      {
        title: 'The Freelancer Playbook: From Zero to 1L/month',
        slug: 'freelancer-playbook-zero-to-1l',
        excerpt: 'The definitive guide to building a six-figure freelance income, covering every stage from getting your first client to scaling beyond your personal capacity.',
        content: 'Earning one lakh rupees per month as a freelancer in India is not a distant dream; it is an achievable milestone. The path is systematic, not mysterious.\n\nStage one (Month 1-2): Foundation and first clients. Your goal is to land your first three paying clients. Apply to 15-20 relevant projects per day on freelance platforms, and send five direct outreach messages per day to businesses on LinkedIn.\n\nStage two (Month 3-4): Raising rates and building recurring revenue. Your goal is to convert one-time projects into monthly retainers and raise your rates by 50%. Your target at this stage is 40,000-60,000 per month in recurring revenue.\n\nStage three (Month 5-6): Scaling through specialization and referrals. Double down on your most profitable niche. Launch a referral program. Start creating content on LinkedIn that demonstrates your expertise. Your target at this stage is 80,000-1,20,000 per month.\n\nStage four (Month 7+): Beyond one lakh. You have two options: increase your rates further (a 30% rate increase typically loses only 10% of clients), or hire junior freelancers to handle execution while you focus on client management and quality control.\n\nThe difference between freelancers who reach one lakh per month and those who do not is not talent. It is consistency, systems, and the willingness to treat freelancing as a business rather than a gig.',
        category: 'Freelancing',
        tags: 'Freelancing,Freelancer Income,Client Acquisition,Retainer Pricing,Six Figure Freelance',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '9 min',
      },
      {
        title: 'Data Science and Machine Learning: The Hottest Career Path in 2025',
        slug: 'data-science-ml-career-2025',
        excerpt: 'Why data science and ML continue to dominate career charts, what skills you actually need, and how to break into the field without a PhD.',
        content: 'Data science and machine learning have held the top spot on LinkedIn\'s "Emerging Jobs Report" for five consecutive years. With average salaries ranging from 8 to 25 LPA for mid-level roles and 35+ LPA for senior positions, this career path offers some of the highest returns on investment in the technology sector.\n\nBut the field has evolved. In 2025, employers expect a broader skill set: proficiency in SQL and database management, experience with cloud platforms (AWS, GCP, or Azure), understanding of MLOps and model deployment, and the ability to translate business problems into analytical frameworks.\n\nThe BizMeals Data Science and Machine Learning Program is structured around this evolved reality. The 120-day curriculum covers Python programming, data manipulation with Pandas and NumPy, data visualization, statistical analysis, and core ML algorithms. But it also covers what most programs miss: SQL for data extraction, cloud deployment on AWS, and real-time data projects using live datasets.\n\nA common misconception is that you need a PhD to enter data science. While deep mathematical understanding helps for research roles, the vast majority of industry positions require practical proficiency, not theoretical depth.\n\nThe career paths within data science are diverse: data analyst (3-6 LPA entry), data scientist (8-20 LPA mid), ML engineer (12-30 LPA mid), and data engineering (10-25 LPA mid).',
        category: 'Career Training',
        tags: 'Data Science,Machine Learning,Python,Career Path,ML Engineer',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '7 min',
      },
      {
        title: 'AI Tools and Automation: Why Every Professional Needs These Skills',
        slug: 'ai-tools-automation-every-professional',
        excerpt: 'AI proficiency is no longer optional. Here is why every working professional, regardless of industry, needs to understand AI tools and automation to stay competitive.',
        content: 'The World Economic Forum estimates that 85% of organizations will have adopted AI technology by 2026. AI is not replacing professionals; it is replacing professionals who do not use AI. The productivity gap between an AI-augmented worker and a non-AI worker is already 40-60% in knowledge work tasks.\n\nThe essential AI skills for 2025 fall into three categories. First, generative AI for content creation: using tools like ChatGPT, Claude, and Gemini for writing, brainstorming, research, and communication.\n\nSecond, AI for data analysis and decision making: using tools like Power BI with Copilot, Google Sheets with AI functions, and Python libraries for automated data processing.\n\nThird, automation for workflow optimization: using tools like Zapier, Make, and n8n to connect applications and automate repetitive processes. These automations save 10-15 hours per week for the average professional.\n\nThe professionals who thrive in the next decade will be those who treat AI as a collaborator, not a threat. BizMeals offers a focused 45-day AI Tools and Automation Training program that takes you from AI-curious to AI-proficient with hands-on projects.',
        category: 'Career Training',
        tags: 'AI Tools,Automation,Professional Skills,Productivity,Future of Work',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '5 min',
      },
      {
        title: 'Why Every Business Needs a Growth Partner, Not an Agency',
        slug: 'growth-partner-not-agency',
        excerpt: 'Understanding the fundamental difference between outsourcing your marketing and having a true strategic partner invested in your business outcomes.',
        content: 'The traditional agency model is broken for most businesses. You hire an agency, they deliver campaigns, you measure impressions and clicks, and at the end of the month you wonder whether any of this is actually growing your business. The agency gets paid regardless of results.\n\nA growth partner operates on a completely different premise. Instead of selling you services, a growth partner takes ownership of your business results. At BizMeals, we structure our engagements around revenue targets, not deliverable counts.\n\nThe difference shows up in decision-making. An agency will ask what kind of campaigns you want to run. A growth partner will tell you what campaigns will produce the highest ROI based on market data and experience.\n\nThe depth of engagement also differs. Agencies typically work with 20-30 clients simultaneously. A growth partner works with a smaller portfolio and embeds themselves more deeply in your business. BizMeals maintains a client roster that allows for weekly strategy calls, real-time campaign adjustments, and proactive identification of growth opportunities.\n\nChoosing between an agency and a growth partner is ultimately a choice between paying for activity and investing in results.',
        category: 'Startup Insights',
        tags: 'Growth Partner,Business Consulting,Agency vs Partner,Revenue Growth,BizMeals',
        image: '',
        authorName: 'BizMeals',
        published: true,
        featured: false,
        readTime: '5 min',
      },
    ]

    await db.blog.createMany({ data: blogs })

    // 4. Create all 6 training courses from the hardcoded data in training-page.tsx
    const trainingCourses = [
      {
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
        published: true,
      },
      {
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
        published: true,
      },
      {
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
        published: true,
      },
      {
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
        published: true,
      },
      {
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
        published: true,
      },
      {
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
        published: true,
      },
    ]

    await db.trainingCourse.createMany({ data: trainingCourses })

    // 5. Create sample job openings
    const jobs = [
      {
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
        status: 'open',
        featured: true,
      },
      {
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
        status: 'open',
        featured: true,
      },
      {
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
        status: 'open',
        featured: false,
      },
      {
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
        status: 'open',
        featured: true,
      },
    ]

    await db.job.createMany({ data: jobs })

    // 6. Create sample business updates
    const updates = [
      {
        title: 'BizMeals Training Program Launches New AI Tools Course',
        slug: 'bizmeals-launches-ai-tools-course',
        content: 'BizMeals is excited to announce the launch of our new AI Tools & Automation Training program. This 45-day intensive course is designed to help professionals master practical AI tools for content creation, coding, analytics, design, and workflow automation.',
        type: 'announcement',
        image: '',
        link: '',
        published: true,
        featured: true,
      },
      {
        title: 'BizMeals Crosses 500+ Trained Professionals Milestone',
        slug: 'bizmeals-500-trained-professionals',
        content: 'We are proud to announce that BizMeals has successfully trained over 500 professionals across our Digital Marketing, Full Stack Development, Data Science, and Freelancing programs. With an 85%+ placement rate, our graduates are making their mark at companies across India and beyond.',
        type: 'milestone',
        image: '',
        link: '',
        published: true,
        featured: true,
      },
      {
        title: 'New Partnership with Leading Bangalore Tech Companies',
        slug: 'bizmeals-bangalore-tech-partnership',
        content: 'BizMeals has entered into strategic partnerships with several leading technology companies in Bangalore to provide direct placement opportunities for our training program graduates.',
        type: 'news',
        image: '',
        link: '',
        published: true,
        featured: false,
      },
      {
        title: 'BizMeals Real Estate Client Generates 2.5 Crore Revenue',
        slug: 'real-estate-client-2-5cr-revenue',
        content: 'Our business growth consulting services helped a mid-sized real estate company in Hyderabad increase their quarterly revenue from 80 lakhs to over 2.5 crores within six months.',
        type: 'achievement',
        image: '',
        link: '',
        published: true,
        featured: false,
      },
      {
        title: 'Manufacturing Client Achieves 220% Lead Increase',
        slug: 'manufacturing-client-220-percent-leads',
        content: 'BizMeals helped a precision engineering manufacturer in Pune increase their lead volume by 220% and organic website traffic by 340% within 90 days.',
        type: 'achievement',
        image: '',
        link: '',
        published: true,
        featured: false,
      },
      {
        title: 'EMI Options Now Available for All Training Programs',
        slug: 'emi-options-available-training',
        content: 'To make quality education accessible to everyone, BizMeals now offers affordable EMI (Equated Monthly Installment) options for all training programs. Students can enroll in any program and pay in convenient monthly installments.',
        type: 'update',
        image: '',
        link: '',
        published: true,
        featured: false,
      },
    ]

    await db.businessUpdate.createMany({ data: updates })

    // 8. Create demo portfolios
    const portfolios = [
      { title: 'Real Estate Digital Transformation', slug: 'real-estate-digital-transformation', client: 'Sri Lakshmi Developers', description: 'Complete digital marketing overhaul for a leading real estate developer in Hyderabad, resulting in 3x revenue growth.', category: 'Digital Marketing', results: 'Revenue grew from 80L to 2.5Cr per quarter,Lead generation increased by 340%,Sales team efficiency improved by 45%', technologies: 'Google Ads,Meta Ads,HubSpot CRM,WordPress,SEMrush', duration: '6 months', testimonial: 'BizMeals transformed our business. We went from struggling to find leads to having more qualified prospects than we could handle.', featured: true, published: true, order: 1 },
      { title: 'E-Commerce ROAS Optimization', slug: 'ecommerce-roas-optimization', client: 'NaturGlow Organics', description: 'Turned around a failing e-commerce ad strategy, achieving 4x return on ad spend from a baseline of 0.8x.', category: 'Digital Marketing', results: 'ROAS improved from 0.8x to 4.2x,Monthly revenue increased from 5L to 22L,Email channel generated 18% of total revenue', technologies: 'Meta Ads,Google Ads,Klaviyo,Shopify,Google Analytics', duration: '3 months', testimonial: 'We were burning money on ads. BizMeals showed us how to make every rupee work harder.', featured: true, published: true, order: 2 },
      { title: 'Manufacturing B2B Lead Engine', slug: 'manufacturing-b2b-lead-engine', client: 'PrecisionTech Engineering', description: 'Built a digital presence from scratch for a traditional manufacturing company, generating 220% more qualified leads.', category: 'Consultancy', results: 'Organic traffic increased by 340%,Lead volume grew by 220%,Sales cycle shortened by 30%', technologies: 'WordPress,LinkedIn Ads,HubSpot,Google Search Console,Semrush', duration: '4 months', testimonial: 'We never thought digital marketing could work for manufacturing. BizMeals proved us wrong.', featured: false, published: true, order: 3 },
      { title: 'Startup Growth Acceleration', slug: 'startup-growth-acceleration', client: 'TechBridge Solutions', description: 'Helped a SaaS startup achieve product-market fit and scale from 10 to 100+ paying customers in 6 months.', category: 'Consultancy', results: 'Customer base grew 10x,MRR increased from 2L to 15L,Churn rate reduced from 12% to 3%', technologies: 'Intercom,Stripe,Google Analytics,Mixpanel,Webflow', duration: '6 months', testimonial: 'BizMeals did not just consult, they embedded themselves in our business and owned the results.', featured: true, published: true, order: 4 },
      { title: 'Restaurant Chain Social Media', slug: 'restaurant-chain-social-media', client: 'SpiceRoute Restaurants', description: 'Built a social media presence that drove foot traffic and online orders for a 12-location restaurant chain.', category: 'Digital Marketing', results: 'Social media following grew 500%,Online orders increased by 180%,Foot traffic improved by 45%', technologies: 'Instagram,Facebook,TikTok,Zomato,Canva', duration: '4 months', testimonial: 'Our restaurants are now the most talked about in the city, all thanks to BizMeals social media strategy.', featured: false, published: true, order: 5 },
    ]
    await db.portfolio.createMany({ data: portfolios })

    // 9. Create demo pricing plans
    const pricingPlans = [
      { name: 'Starter', slug: 'marketing-starter', description: 'Perfect for small businesses getting started with digital marketing.', price: '₹9,999', period: '/month', features: 'Social Media Management (2 platforms),Basic SEO Optimization,Monthly Analytics Report,Content Calendar,Email Support', highlight: false, category: 'marketing', ctaText: 'Get Started', ctaLink: '/contact', order: 1, published: true },
      { name: 'Growth', slug: 'marketing-growth', description: 'Comprehensive digital marketing for growing businesses that want to dominate their market.', price: '₹24,999', period: '/month', features: 'Social Media Management (5 platforms),Advanced SEO & Content Strategy,Google & Meta Ads Management,Weekly Analytics & Reports,Dedicated Account Manager,Competitor Analysis,A/B Testing', highlight: true, category: 'marketing', ctaText: 'Start Growing', ctaLink: '/contact', order: 2, published: true },
      { name: 'Enterprise', slug: 'marketing-enterprise', description: 'Full-scale digital marketing engine for established businesses ready to dominate.', price: 'Custom', period: '', features: 'Full Digital Marketing Suite,Multi-channel Campaign Management,Marketing Automation Setup,Conversion Rate Optimization,Priority Support,Custom Integrations,Quarterly Strategy Reviews', highlight: false, category: 'marketing', ctaText: 'Contact Us', ctaLink: '/contact', order: 3, published: true },
      { name: 'Consultation', slug: 'consultancy-session', description: 'One-on-one business consultation with our growth experts.', price: '₹4,999', period: '/session', features: '60-minute Strategy Session,Business Growth Audit,Custom Action Plan,Follow-up Email Summary,Priority Booking', highlight: false, category: 'consultancy', ctaText: 'Book Session', ctaLink: '/contact', order: 4, published: true },
    ]
    await db.pricingPlan.createMany({ data: pricingPlans })

    // 10. Create demo case studies
    const caseStudies = [
      { title: 'How a Real Estate Company 3x Their Revenue with Digital Marketing', slug: 'real-estate-3x-revenue', client: 'Sri Lakshmi Developers', industry: 'Real Estate', challenge: 'Strong projects but weak sales. Revenue plateaued at 80 lakhs per quarter with no lead generation engine, no nurturing process, and no data-driven decision making.', solution: 'Implemented a three-phase digital transformation: built a conversion-optimized digital presence, automated lead management with CRM and WhatsApp integration, and scaled winning campaigns using data-driven optimization.', results: 'Revenue grew from 80L to 2.5Cr per quarter,Lead generation increased by 340%,Sales team efficiency improved by 45%', image: '', testimonial: 'BizMeals transformed our business completely. We went from struggling to find leads to having more qualified prospects than we could handle. The ROI has been incredible.', testimonialAuthor: 'Rajesh Kumar', testimonialRole: 'Managing Director', category: 'Digital Marketing', featured: true, published: true, order: 1 },
      { title: 'From Burning Ad Spend to 4x ROAS: E-Commerce Turnaround', slug: 'ecommerce-4x-roas-case-study', client: 'NaturGlow Organics', industry: 'E-Commerce / Beauty', challenge: 'ROAS of 0.8x - for every 100 rupees spent on Meta and Google Ads, only 80 rupees came back. Broad targeting, generic creatives, no retargeting, and no email marketing.', solution: 'Audience segmentation to identify high-value segments, creative optimization with lifestyle content, full-funnel retargeting strategy, and automated email marketing flows.', results: 'ROAS improved from 0.8x to 4.2x,Monthly revenue increased from 5L to 22L,Email generated 18% of total revenue', image: '', testimonial: 'We were skeptical at first, but the results speak for themselves. BizMeals made our ad budget work 5x harder.', testimonialAuthor: 'Priya Sharma', testimonialRole: 'Founder & CEO', category: 'Digital Marketing', featured: true, published: true, order: 2 },
      { title: 'Manufacturing Company Goes Digital: 220% More B2B Leads', slug: 'manufacturing-digital-transformation', client: 'PrecisionTech Engineering', industry: 'Manufacturing / B2B', challenge: 'Outdated website from 2015, no social media presence, zero content marketing, and complete reliance on trade shows for lead generation.', solution: 'Website redesign with conversion-focused landing pages, content marketing program, SEO optimization for industry keywords, and LinkedIn advertising campaigns targeting decision-makers.', results: 'Organic traffic increased by 340%,Lead volume grew by 220%,Sales cycle shortened by 30%', image: '', testimonial: 'We never believed digital marketing could work for manufacturing. BizMeals proved that every industry benefits from being found online.', testimonialAuthor: 'Vikram Patel', testimonialRole: 'VP of Sales', category: 'Consultancy', featured: false, published: true, order: 3 },
    ]
    await db.caseStudy.createMany({ data: caseStudies })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        admin: 1,
        settings: settings.length,
        blogs: blogs.length,
        trainingCourses: trainingCourses.length,
        jobs: jobs.length,
        updates: updates.length,
      },
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
