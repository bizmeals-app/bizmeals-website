import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fallbackBlogs, isDatabaseAvailable } from '@/lib/fallback-data'

// GET /api/blogs - Return published blogs with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category') || 'All'

    // If database is not available, return fallback data
    if (!isDatabaseAvailable()) {
      let blogs = fallbackBlogs.filter(b => b.published)
      if (category !== 'All') {
        blogs = blogs.filter(b => b.category === category)
      }
      blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      const skip = (page - 1) * limit
      const paginated = blogs.slice(skip, skip + limit)
      return NextResponse.json({
        blogs: paginated,
        pagination: {
          page,
          limit,
          total: blogs.length,
          totalPages: Math.ceil(blogs.length / limit),
        },
      })
    }

    const skip = (page - 1) * limit

    const where = {
      published: true,
      ...(category !== 'All' ? { category } : {}),
    }

    const [blogs, total] = await Promise.all([
      db.blog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          tags: true,
          image: true,
          authorName: true,
          published: true,
          featured: true,
          readTime: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.blog.count({ where }),
    ])

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get public blogs error:', error)
    // Final fallback - return fallback data on any error
    const page = parseInt(new URL(request.url).searchParams.get('page') || '1')
    const limit = parseInt(new URL(request.url).searchParams.get('limit') || '10')
    const category = new URL(request.url).searchParams.get('category') || 'All'
    let blogs = fallbackBlogs.filter(b => b.published)
    if (category !== 'All') {
      blogs = blogs.filter(b => b.category === category)
    }
    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const skip = (page - 1) * limit
    const paginated = blogs.slice(skip, skip + limit)
    return NextResponse.json({
      blogs: paginated,
      pagination: {
        page,
        limit,
        total: blogs.length,
        totalPages: Math.ceil(blogs.length / limit),
      },
    })
  }
}
