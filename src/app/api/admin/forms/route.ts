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

// GET /api/admin/forms - List all custom forms
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const forms = await db.customForm.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { _count: { select: { submissions: true } } },
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Get forms error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/forms - Create a new custom form
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
      description,
      fields,
      published,
      submitLabel,
      successMsg,
      notifyEmail,
      order,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const slug = providedSlug || generateSlug(title)

    // Check slug uniqueness
    const existing = await db.customForm.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A form with this slug already exists' },
        { status: 409 }
      )
    }

    // Validate fields JSON structure
    let fieldsJson = '[]'
    if (fields) {
      const parsed = typeof fields === 'string' ? JSON.parse(fields) : fields
      if (!Array.isArray(parsed)) {
        return NextResponse.json(
          { error: 'Fields must be a JSON array' },
          { status: 400 }
        )
      }
      fieldsJson = JSON.stringify(parsed)
    }

    const form = await db.customForm.create({
      data: {
        title,
        slug,
        description: description || '',
        fields: fieldsJson,
        published: published ?? false,
        submitLabel: submitLabel || 'Submit',
        successMsg: successMsg || 'Thank you for your submission!',
        notifyEmail: notifyEmail || '',
        order: order ?? 0,
      },
    })

    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error('Create form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
