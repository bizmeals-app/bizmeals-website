import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/password'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// PUT /api/admin/users/[id] - Update an admin user (super_admin only)
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (admin.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only super admins can update admin users' },
        { status: 403 }
      )
    }

    const { id } = await context.params

    const existing = await db.adminUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { name, email, role, password } = body

    // Validate role if provided
    if (role !== undefined) {
      const validRoles = ['super_admin', 'admin', 'editor']
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          { error: 'Invalid role. Must be one of: super_admin, admin, editor' },
          { status: 400 }
        )
      }
    }

    // Check email uniqueness if email is being changed
    if (email && email.toLowerCase() !== existing.email) {
      const emailExists = await db.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      })
      if (emailExists) {
        return NextResponse.json(
          { error: 'An admin user with this email already exists' },
          { status: 409 }
        )
      }
    }

    // If demoting a super_admin, check they are not the last one
    if (existing.role === 'super_admin' && role && role !== 'super_admin') {
      const superAdminCount = await db.adminUser.count({
        where: { role: 'super_admin' },
      })
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot demote the last super admin' },
          { status: 400 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}

    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email.toLowerCase()
    if (role !== undefined) updateData.role = role
    if (password) {
      updateData.password = await hashPassword(password)
    }

    const user = await db.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Update admin user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/users/[id] - Delete an admin user (super_admin only)
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (admin.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only super admins can delete admin users' },
        { status: 403 }
      )
    }

    const { id } = await context.params

    // Cannot delete yourself
    if (admin.id === id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      )
    }

    const existing = await db.adminUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    // Cannot delete the last super_admin
    if (existing.role === 'super_admin') {
      const superAdminCount = await db.adminUser.count({
        where: { role: 'super_admin' },
      })
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last super admin' },
          { status: 400 }
        )
      }
    }

    await db.adminUser.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete admin user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
