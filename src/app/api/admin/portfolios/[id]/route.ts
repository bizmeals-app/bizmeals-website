import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/portfolios/[id] - Return single portfolio
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const portfolio = await db.portfolio.findUnique({ where: { id } })

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Get portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/portfolios/[id] - Update portfolio
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.portfolio.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.portfolio.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A portfolio with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'client', 'description', 'category',
      'image', 'results', 'technologies', 'duration', 'testimonial',
      'featured', 'published', 'order',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if ((field === 'results' || field === 'technologies') && Array.isArray(body[field])) {
          updateData[field] = body[field].join(',')
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const portfolio = await db.portfolio.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Update portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/portfolios/[id] - Delete portfolio
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.portfolio.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })
    }

    await db.portfolio.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
