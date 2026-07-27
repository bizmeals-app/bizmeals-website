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

// GET /api/admin/blogs - Return all blogs ordered by createdAt desc
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blogs = await db.blog.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Get blogs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/blogs - Create a new blog
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
      excerpt,
      content,
      category,
      tags,
      image,
      authorName,
      published,
      featured,
      readTime,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(title)

    // Check for slug uniqueness
    const existing = await db.blog.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      )
    }

    const blog = await db.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || '',
        content: content || '',
        category: category || 'General',
        tags: Array.isArray(tags) ? tags.join(',') : (tags || ''),
        image: image || '',
        authorName: authorName || 'BizMeals',
        published: published ?? false,
        featured: featured ?? false,
        readTime: readTime || '5 min',
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
