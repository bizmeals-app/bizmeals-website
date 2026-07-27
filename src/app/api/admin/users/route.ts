import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/password'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

// GET /api/admin/users - List all admin users (super_admin only)
export async function GET() {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (admin.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only super admins can list admin users' },
        { status: 403 }
      )
    }

    const users = await db.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Get admin users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/users - Create a new admin user (super_admin only)
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (admin.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only super admins can create admin users' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password, name, role } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const validRoles = ['super_admin', 'admin', 'editor']
    const userRole = role || 'admin'
    if (!validRoles.includes(userRole)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: super_admin, admin, editor' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await db.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'An admin user with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password with SHA-256
    const hashedPwd = await hashPassword(password)

    const user = await db.adminUser.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPwd,
        name,
        role: userRole,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Create admin user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
