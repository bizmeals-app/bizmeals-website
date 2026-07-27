import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/training/[id] - Return single training course
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const course = await db.trainingCourse.findUnique({ where: { id } })

    if (!course) {
      return NextResponse.json({ error: 'Training course not found' }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Get training course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/training/[id] - Update training course
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.trainingCourse.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Training course not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.trainingCourse.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A training course with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'description', 'fullDescription', 'duration',
      'skills', 'includes', 'outcome', 'icon', 'joinLink',
      'highlights', 'accent', 'order', 'published',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'skills' || field === 'includes' || field === 'highlights') {
          updateData[field] = Array.isArray(body[field]) ? body[field].join(',') : body[field]
        } else if (field === 'fullDescription') {
          updateData[field] = Array.isArray(body[field]) ? body[field].join('|') : body[field]
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const course = await db.trainingCourse.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error('Update training course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/training/[id] - Delete training course
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.trainingCourse.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Training course not found' }, { status: 404 })
    }

    await db.trainingCourse.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete training course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
