import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

// GET /api/admin/settings - Return all settings grouped by group
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await db.siteSetting.findMany({
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    })

    // Group settings by group
    const grouped: Record<string, typeof settings> = {}
    for (const setting of settings) {
      if (!grouped[setting.group]) {
        grouped[setting.group] = []
      }
      grouped[setting.group].push(setting)
    }

    return NextResponse.json({ settings, grouped })
  } catch (error) {
    console.error('Get settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/settings - Update settings (body: array of { key, value })
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request body must be an array of { key, value } objects' },
        { status: 400 }
      )
    }

    const results = []

    for (const item of body) {
      if (!item.key || item.value === undefined) continue

      const setting = await db.siteSetting.upsert({
        where: { key: item.key },
        update: { value: String(item.value) },
        create: {
          key: item.key,
          value: String(item.value),
          type: item.type || 'text',
          label: item.label || item.key,
          group: item.group || 'general',
        },
      })

      results.push(setting)
    }

    return NextResponse.json({ success: true, updated: results })
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
