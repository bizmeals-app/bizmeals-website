import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fallbackUpdates, isDatabaseAvailable } from '@/lib/fallback-data'

// GET /api/updates - Return published updates
export async function GET() {
  try {
    // If database is not available, return fallback data
    if (!isDatabaseAvailable()) {
      const sorted = [...fallbackUpdates].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      return NextResponse.json(sorted)
    }

    const updates = await db.businessUpdate.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        type: true,
        image: true,
        link: true,
        featured: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updates)
  } catch (error) {
    console.error('Get public updates error:', error)
    const sorted = [...fallbackUpdates].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return NextResponse.json(sorted)
  }
}
