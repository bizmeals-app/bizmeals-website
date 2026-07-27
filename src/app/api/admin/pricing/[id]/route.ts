import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/pricing/[id] - Return single pricing plan
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const plan = await db.pricingPlan.findUnique({ where: { id } })

    if (!plan) {
      return NextResponse.json(
        { error: 'Pricing plan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Get pricing plan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/pricing/[id] - Update pricing plan
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.pricingPlan.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pricing plan not found' },
        { status: 404 }
      )
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.pricingPlan.findUnique({
        where: { slug: body.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A pricing plan with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'name', 'slug', 'description', 'price', 'period',
      'features', 'highlight', 'category', 'ctaText', 'ctaLink',
      'order', 'published',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'features' && Array.isArray(body[field])) {
          updateData[field] = body[field].join(',')
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const plan = await db.pricingPlan.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Update pricing plan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/pricing/[id] - Delete pricing plan
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.pricingPlan.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pricing plan not found' },
        { status: 404 }
      )
    }

    await db.pricingPlan.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete pricing plan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
