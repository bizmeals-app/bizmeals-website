import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fallbackJobs, isDatabaseAvailable } from '@/lib/fallback-data'

// GET /api/jobs - Return open jobs only
export async function GET() {
  try {
    // If database is not available, return fallback data
    if (!isDatabaseAvailable()) {
      return NextResponse.json(fallbackJobs)
    }

    const jobs = await db.job.findMany({
      where: { status: 'open' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        location: true,
        type: true,
        department: true,
        salary: true,
        requirements: true,
        responsibilities: true,
        applyLink: true,
        featured: true,
        createdAt: true,
      },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Get public jobs error:', error)
    return NextResponse.json(fallbackJobs)
  }
}
