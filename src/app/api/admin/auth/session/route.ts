import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('admin_session')?.value

    if (!sessionId) {
      return NextResponse.json({ authenticated: false })
    }

    const admin = await db.adminUser.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true, role: true },
    })

    if (!admin) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      user: admin,
    })
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json({ authenticated: false })
  }
}
