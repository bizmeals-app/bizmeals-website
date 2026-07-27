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

// GET /api/admin/portfolios - Return all portfolios ordered by order then createdAt desc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolios = await db.portfolio.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(portfolios)
  } catch (error) {
    console.error('Get portfolios error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/portfolios - Create a new portfolio
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
      description,
      category,
      image,
      results,
      technologies,
      duration,
      testimonial,
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
    const existing = await db.portfolio.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A portfolio with this slug already exists' },
        { status: 409 }
      )
    }

    const portfolio = await db.portfolio.create({
      data: {
        title,
        slug,
        client: client || '',
        description: description || '',
        category: category || 'Digital Marketing',
        image: image || '',
        results: Array.isArray(results) ? results.join(',') : (results || ''),
        technologies: Array.isArray(technologies) ? technologies.join(',') : (technologies || ''),
        duration: duration || '',
        testimonial: testimonial || '',
        featured: featured ?? false,
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(portfolio, { status: 201 })
  } catch (error) {
    console.error('Create portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
