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

// GET /api/admin/jobs - Return all jobs ordered by createdAt desc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobs = await db.job.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Get jobs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/jobs - Create a new job
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
      location,
      type,
      department,
      salary,
      requirements,
      responsibilities,
      applyLink,
      status,
      featured,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(title)

    // Check for slug uniqueness
    const existing = await db.job.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A job with this slug already exists' },
        { status: 409 }
      )
    }

    const job = await db.job.create({
      data: {
        title,
        slug,
        description: description || '',
        location: location || 'Bangalore, India',
        type: type || 'full-time',
        department: department || 'General',
        salary: salary || '',
        requirements: requirements || '',
        responsibilities: responsibilities || '',
        applyLink: applyLink || '',
        status: status || 'open',
        featured: featured ?? false,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Create job error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
