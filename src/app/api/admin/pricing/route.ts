import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// GET /api/admin/pricing - Return all pricing plans ordered by order then createdAt
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const plans = await db.pricingPlan.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error('Get pricing plans error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/pricing - Create a new pricing plan
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug: providedSlug,
      description,
      price,
      period,
      features,
      highlight,
      category,
      ctaText,
      ctaLink,
      order,
      published,
    } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(name)

    // Check for slug uniqueness
    const existing = await db.pricingPlan.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A pricing plan with this slug already exists' },
        { status: 409 }
      )
    }

    const plan = await db.pricingPlan.create({
      data: {
        name,
        slug,
        description: description || '',
        price: price || '',
        period: period || '/month',
        features: Array.isArray(features) ? features.join(',') : (features || ''),
        highlight: highlight ?? false,
        category: category || 'marketing',
        ctaText: ctaText || 'Get Started',
        ctaLink: ctaLink || '/contact',
        order: order ?? 0,
        published: published ?? true,
      },
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Create pricing plan error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
