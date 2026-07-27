import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /api/admin/blogs/[id] - Return single blog
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const blog = await db.blog.findUnique({ where: { id } })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Get blog error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/blogs/[id] - Update blog
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const existing = await db.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // If slug is being changed, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await db.blog.findUnique({ where: { slug: body.slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'A blog with this slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'excerpt', 'content', 'category',
      'tags', 'image', 'authorName', 'published', 'featured', 'readTime',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'tags' && Array.isArray(body[field])) {
          updateData[field] = body[field].join(',')
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const blog = await db.blog.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Update blog error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/blogs/[id] - Delete blog
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params

    const existing = await db.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    await db.blog.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
