import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export async function getAdminUser() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('admin_session')?.value

    if (!sessionId) return null

    const admin = await db.adminUser.findUnique({
      where: { id: sessionId },
      select: { id: true, email: true, name: true, role: true },
    })

    return admin
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const admin = await getAdminUser()
  if (!admin) return null
  return admin
}
