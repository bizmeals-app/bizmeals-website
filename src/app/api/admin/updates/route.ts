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

// GET /api/admin/updates - Return all updates ordered by createdAt desc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await db.businessUpdate.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(updates)
  } catch (error) {
    console.error('Get updates error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/updates - Create a new business update
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
      content,
      type,
      image,
      link,
      published,
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
    const existing = await db.businessUpdate.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'An update with this slug already exists' },
        { status: 409 }
      )
    }

    const update = await db.businessUpdate.create({
      data: {
        title,
        slug,
        content: content || '',
        type: type || 'announcement',
        image: image || '',
        link: link || '',
        published: published ?? true,
        featured: featured ?? false,
      },
    })

    return NextResponse.json(update, { status: 201 })
  } catch (error) {
    console.error('Create update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
