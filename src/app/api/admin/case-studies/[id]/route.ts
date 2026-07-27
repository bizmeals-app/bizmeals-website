import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/case-studies/[id] - Return single case study
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const caseStudy = await db.caseStudy.findUnique({ where: { id } })

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Get case study error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/case-studies/[id] - Update case study
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.caseStudy.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.caseStudy.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'client', 'industry', 'challenge', 'solution',
      'results', 'image', 'testimonial', 'testimonialAuthor', 'testimonialRole',
      'category', 'featured', 'published', 'order',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'results' && Array.isArray(body[field])) {
          updateData[field] = body[field].join(',')
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const caseStudy = await db.caseStudy.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Update case study error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/case-studies/[id] - Delete case study
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.caseStudy.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    await db.caseStudy.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete case study error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
