'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

interface CurrentUser {
  id: string
  email: string
  name: string
  role: string
}

const roleConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ComponentType<{ className?: string }> }> = {
  super_admin: {
    label: 'Super Admin',
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/15 border-purple-500/25',
    icon: ShieldAlert,
  },
  admin: {
    label: 'Admin',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/15 border-blue-500/25',
    icon: ShieldCheck,
  },
  editor: {
    label: 'Editor',
    color: 'text-teal-300',
    bgColor: 'bg-teal-500/15 border-teal-500/25',
    icon: Shield,
  },
}

const roleDescriptions: Record<string, string> = {
  super_admin: 'Full access to everything including user management',
  admin: 'Can manage all content (blogs, jobs, training, etc.)',
  editor: 'Can create and edit content, cannot delete or manage users',
}

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'admin',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchSessionAndUsers()
  }, [])

  async function fetchSessionAndUsers() {
    try {
      // Fetch current user session
      const sessionRes = await fetch('/api/admin/auth/session')
      const sessionData = await sessionRes.json()

      if (sessionData.authenticated && sessionData.user) {
        setCurrentUser(sessionData.user)
      }

      // Only fetch users if super_admin
      if (sessionData.user?.role === 'super_admin') {
        const usersRes = await fetch('/api/admin/users')
        if (usersRes.ok) {
          const usersData = await usersRes.json()
          setUsers(Array.isArray(usersData) ? usersData : usersData.users || [])
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setEditingUser(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  function openEdit(user: AdminUser) {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }
    if (!editingUser && !formData.password.trim()) {
      toast.error('Password is required for new users')
      return
    }

    setSaving(true)
    try {
      if (editingUser) {
        const payload: Record<string, string> = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
        }
        if (formData.password.trim()) {
          payload.password = formData.password.trim()
        }

        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to update user')
        }
        toast.success('User updated successfully')
      } else {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password.trim(),
            role: formData.role,
          }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to create user')
        }
        toast.success('User created successfully')
      }

      setShowForm(false)
      fetchSessionAndUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save user')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteUser) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/users/${deleteUser.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete user')
      }
      toast.success('User deleted successfully')
      setUsers(users.filter((u) => u.id !== deleteUser.id))
      setDeleteUser(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete user')
    } finally {
      setDeleting(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-lg bg-white/[0.04] animate-pulse" />
            <div className="h-4 w-32 rounded bg-white/[0.03] animate-pulse" />
          </div>
          <div className="h-9 w-36 rounded-lg bg-white/[0.04] animate-pulse" />
        </div>
        <Card className="glass-card border-0">
          <CardContent className="p-0">
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Not super_admin — show permission message
  if (currentUser?.role !== 'super_admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="size-5 text-primary" />
            User Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage admin users and roles</p>
        </div>

        <Card className="glass-card border-0">
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <AlertTriangle className="size-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Only Super Admins can manage admin users. Your current role is{' '}
                <Badge className={`${roleConfig[currentUser?.role || 'editor']?.bgColor} ${roleConfig[currentUser?.role || 'editor']?.color} border text-[10px]`}>
                  {roleConfig[currentUser?.role || 'editor']?.label}
                </Badge>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="size-5 text-primary" />
            User Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {users.length} admin user{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add New Admin
        </Button>
      </div>

      {/* Table */}
      <Card className="glass-card border-0">
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="text-center py-16">
              <Users className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No admin users found</p>
              <Button onClick={openCreate} variant="outline" size="sm" className="mt-3 gap-2">
                <Plus className="size-3.5" /> Add your first admin
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Role</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Created</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {users.map((user) => {
                    const config = roleConfig[user.role] || roleConfig.editor
                    const RoleIcon = config.icon
                    const isCurrentUser = currentUser?.id === user.id

                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-border/20 hover:bg-white/[0.02] transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {user.name}
                            {isCurrentUser && (
                              <Badge className="bg-primary/15 text-primary border border-primary/25 text-[10px] px-1.5 py-0">
                                You
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${config.bgColor} ${config.color} border gap-1.5 text-[10px]`}>
                            <RoleIcon className="size-3" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => openEdit(user)}
                            >
                              <Edit className="size-3.5" />
                            </Button>
                            {!isCurrentUser && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-destructive hover:text-destructive"
                                onClick={() => setDeleteUser(user)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="glass-card-strong border-border/30 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit Admin User' : 'Add New Admin'}</DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Update admin user details. Leave password blank to keep current.'
                : 'Create a new admin user with a specific role.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={editingUser ? 'Leave blank to keep current' : 'Enter password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {editingUser && (
                <p className="text-[11px] text-muted-foreground">
                  Leave blank to keep the current password
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleConfig).map(([key, config]) => {
                    const Icon = config.icon
                    return (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <Icon className="size-3.5" />
                          {config.label}
                        </span>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {/* Role description */}
              {formData.role && (
                <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span>
                  {roleDescriptions[formData.role]}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)} disabled={saving}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="gradient-purple text-white"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : editingUser ? (
                'Update User'
              ) : (
                'Create User'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
        <AlertDialogContent className="glass-card-strong border-border/30">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <span className="text-foreground font-medium">{deleteUser?.name}</span>? This action
              cannot be undone.
              {deleteUser?.role === 'super_admin' && (
                <span className="block mt-2 text-amber-400 text-sm">
                  Warning: This is a Super Admin account.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="size-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
