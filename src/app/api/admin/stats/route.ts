import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      blogCount,
      blogPublishedCount,
      jobCount,
      jobOpenCount,
      trainingCount,
      trainingPublishedCount,
      updateCount,
      updatePublishedCount,
      portfolioCount,
      portfolioPublishedCount,
      pricingCount,
      pricingPublishedCount,
      caseStudyCount,
      caseStudyPublishedCount,
      formCount,
      formPublishedCount,
      submissionCount,
      unreadSubmissionCount,
      adminCount,
      recentBlogs,
      recentJobs,
      recentUpdates,
      recentPortfolios,
      recentCaseStudies,
    ] = await Promise.all([
      db.blog.count(),
      db.blog.count({ where: { published: true } }),
      db.job.count(),
      db.job.count({ where: { status: 'open' } }),
      db.trainingCourse.count(),
      db.trainingCourse.count({ where: { published: true } }),
      db.businessUpdate.count(),
      db.businessUpdate.count({ where: { published: true } }),
      db.portfolio.count(),
      db.portfolio.count({ where: { published: true } }),
      db.pricingPlan.count(),
      db.pricingPlan.count({ where: { published: true } }),
      db.caseStudy.count(),
      db.caseStudy.count({ where: { published: true } }),
      db.customForm.count(),
      db.customForm.count({ where: { published: true } }),
      db.customFormSubmission.count(),
      db.customFormSubmission.count({ where: { read: false } }),
      db.adminUser.count(),
      db.blog.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          published: true,
          createdAt: true,
        },
      }),
      db.job.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          location: true,
          type: true,
          status: true,
          department: true,
          createdAt: true,
        },
      }),
      db.businessUpdate.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          published: true,
          createdAt: true,
        },
      }),
      db.portfolio.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          client: true,
          category: true,
          published: true,
          createdAt: true,
        },
      }),
      db.caseStudy.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          client: true,
          industry: true,
          published: true,
          createdAt: true,
        },
      }),
    ])

    return NextResponse.json({
      blogCount,
      blogPublishedCount,
      jobCount,
      jobOpenCount,
      trainingCount,
      trainingPublishedCount,
      updateCount,
      updatePublishedCount,
      portfolioCount,
      portfolioPublishedCount,
      pricingCount,
      pricingPublishedCount,
      caseStudyCount,
      caseStudyPublishedCount,
      formCount,
      formPublishedCount,
      submissionCount,
      unreadSubmissionCount,
      adminCount,
      recentBlogs,
      recentJobs,
      recentUpdates,
      recentPortfolios,
      recentCaseStudies,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
