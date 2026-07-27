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

// GET /api/admin/case-studies - Return all case studies ordered by order then createdAt desc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const caseStudies = await db.caseStudy.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error('Get case studies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/case-studies - Create a new case study
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
      client,
      industry,
      challenge,
      solution,
      results,
      image,
      testimonial,
      testimonialAuthor,
      testimonialRole,
      category,
      featured,
      published,
      order,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(title)

    // Check for slug uniqueness
    const existing = await db.caseStudy.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A case study with this slug already exists' },
        { status: 409 }
      )
    }

    const caseStudy = await db.caseStudy.create({
      data: {
        title,
        slug,
        client: client || '',
        industry: industry || '',
        challenge: challenge || '',
        solution: solution || '',
        results: Array.isArray(results) ? results.join(',') : (results || ''),
        image: image || '',
        testimonial: testimonial || '',
        testimonialAuthor: testimonialAuthor || '',
        testimonialRole: testimonialRole || '',
        category: category || 'Digital Marketing',
        featured: featured ?? false,
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (error) {
    console.error('Create case study error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
