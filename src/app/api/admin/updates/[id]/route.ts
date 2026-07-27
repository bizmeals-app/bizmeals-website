import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/updates/[id] - Return single update
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const update = await db.businessUpdate.findUnique({ where: { id } })

    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }

    return NextResponse.json(update)
  } catch (error) {
    console.error('Get update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/updates/[id] - Update update
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.businessUpdate.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.businessUpdate.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'An update with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'content', 'type', 'image', 'link', 'published', 'featured',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    const update = await db.businessUpdate.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(update)
  } catch (error) {
    console.error('Update update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/updates/[id] - Delete update
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.businessUpdate.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }

    await db.businessUpdate.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
