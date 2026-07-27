import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// GET /api/admin/training - Return all training courses ordered by `order` asc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courses = await db.trainingCourse.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Get training courses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/training - Create a new training course
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug: providedSlug,
      description,
      fullDescription,
      duration,
      skills,
      includes,
      outcome,
      icon,
      joinLink,
      highlights,
      accent,
      order,
      published,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(title)

    // Check for slug uniqueness
    const existing = await db.trainingCourse.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A training course with this slug already exists' },
        { status: 409 }
      )
    }

    const course = await db.trainingCourse.create({
      data: {
        title,
        slug,
        description: description || '',
        fullDescription: Array.isArray(fullDescription) ? fullDescription.join('|') : (fullDescription || ''),
        duration: duration || '90 Days',
        skills: Array.isArray(skills) ? skills.join(',') : (skills || ''),
        includes: Array.isArray(includes) ? includes.join(',') : (includes || ''),
        outcome: outcome || '',
        icon: icon || 'GraduationCap',
        joinLink: joinLink || 'https://bizmeals.in/bizmeals-training-program/',
        highlights: Array.isArray(highlights) ? highlights.join(',') : (highlights || ''),
        accent: accent || 'biz-purple',
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Create training course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
