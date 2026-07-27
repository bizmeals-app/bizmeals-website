import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fallbackSettings, isDatabaseAvailable } from '@/lib/fallback-data'

// GET /api/settings - Return all settings as key-value pairs
export async function GET() {
  try {
    // If database is not available, return fallback settings
    if (!isDatabaseAvailable()) {
      return NextResponse.json(fallbackSettings)
    }

    const settings = await db.siteSetting.findMany({
      select: {
        key: true,
        value: true,
      },
    })

    // Convert to simple key-value object
    const settingsMap: Record<string, string> = {}
    for (const setting of settings) {
      settingsMap[setting.key] = setting.value
    }

    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Get public settings error:', error)
    return NextResponse.json(fallbackSettings)
  }
}
