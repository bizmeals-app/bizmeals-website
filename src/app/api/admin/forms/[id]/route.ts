import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/forms/[id] - Get a single custom form
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const form = await db.customForm.findUnique({
      where: { id },
      include: { _count: { select: { submissions: true } } },
    })

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json(form)
  } catch (error) {
    console.error('Get form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/forms/[id] - Update a custom form
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.customForm.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.customForm.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A form with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'description', 'fields',
      'published', 'submitLabel', 'successMsg', 'notifyEmail', 'order',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'fields') {
          // Always store fields as a JSON string
          const parsed = typeof body[field] === 'string'
            ? JSON.parse(body[field])
            : body[field]
          if (!Array.isArray(parsed)) {
            return NextResponse.json(
              { error: 'Fields must be a JSON array' },
              { status: 400 }
            )
          }
          updateData[field] = JSON.stringify(parsed)
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const form = await db.customForm.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(form)
  } catch (error) {
    console.error('Update form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/forms/[id] - Delete a custom form
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.customForm.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    await db.customForm.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
