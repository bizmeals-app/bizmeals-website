import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fallbackTraining, isDatabaseAvailable } from '@/lib/fallback-data'

// GET /api/training - Return published training courses ordered by `order`
export async function GET() {
  try {
    // If database is not available, return fallback data
    if (!isDatabaseAvailable()) {
      const sorted = [...fallbackTraining].sort((a, b) => a.order - b.order)
      return NextResponse.json(sorted)
    }

    const courses = await db.trainingCourse.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        fullDescription: true,
        duration: true,
        skills: true,
        includes: true,
        outcome: true,
        icon: true,
        joinLink: true,
        highlights: true,
        accent: true,
        order: true,
        createdAt: true,
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Get public training error:', error)
    const sorted = [...fallbackTraining].sort((a, b) => a.order - b.order)
    return NextResponse.json(sorted)
  }
}
