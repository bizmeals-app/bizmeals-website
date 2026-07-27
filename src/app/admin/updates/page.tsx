'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  Megaphone,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
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
import { toast } from 'sonner'

interface BusinessUpdate {
  id: string
  title: string
  slug: string
  content: string
  type: string
  image: string
  link: string
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

const updateTypes = ['announcement', 'achievement', 'news', 'milestone', 'update']

const emptyUpdate: Omit<BusinessUpdate, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  content: '',
  type: 'announcement',
  image: '',
  link: '',
  published: true,
  featured: false,
}

const typeColors: Record<string, string> = {
  announcement: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  achievement: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  news: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  milestone: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  update: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<BusinessUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingUpdate, setEditingUpdate] = useState<BusinessUpdate | null>(null)
  const [formData, setFormData] = useState(emptyUpdate)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchUpdates()
  }, [])

  async function fetchUpdates() {
    try {
      const res = await fetch('/api/admin/updates')
      const data = await res.json()
      setUpdates(data.updates || [])
    } catch (err) {
      console.error('Failed to fetch updates:', err)
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  function openCreate() {
    setEditingUpdate(null)
    setFormData(emptyUpdate)
    setShowForm(true)
  }

  function openEdit(update: BusinessUpdate) {
    setEditingUpdate(update)
    setFormData({
      title: update.title,
      slug: update.slug,
      content: update.content,
      type: update.type,
      image: update.image,
      link: update.link,
      published: update.published,
      featured: update.featured,
    })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setSaving(true)
    const slug = formData.slug || generateSlug(formData.title)
    const payload = { ...formData, slug }

    try {
      if (editingUpdate) {
        const res = await fetch(`/api/admin/updates/${editingUpdate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Update saved successfully')
      } else {
        const res = await fetch('/api/admin/updates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Update created successfully')
      }
      setShowForm(false)
      fetchUpdates()
    } catch {
      toast.error('Failed to save update')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/updates/${deleteId}`, { method: 'DELETE' })
      toast.success('Update deleted')
      setUpdates(updates.filter((u) => u.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete update')
    } finally {
      setDeleting(false)
    }
  }

  const filtered = updates.filter((update) => {
    const matchesSearch = update.title.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'all' || update.type === filterType
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'published' && update.published) ||
      (filterStatus === 'draft' && !update.published)
    return matchesSearch && matchesType && matchesStatus
  })

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{editingUpdate ? 'Edit Update' : 'New Update'}</h1>
            <p className="text-sm text-muted-foreground">
              {editingUpdate ? 'Update business update details' : 'Create a new business update'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Update title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    placeholder="url-friendly-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Update content..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Settings</h3>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {updateTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input
                    placeholder="https://..."
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Published</Label>
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(v) => setFormData({ ...formData, published: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Featured</Label>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(v) => setFormData({ ...formData, featured: v })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSave}
              className="w-full gradient-purple text-white"
              disabled={saving}
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : 'Save Update'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Megaphone className="size-5 text-biz-amber" />
            Business Updates
          </h1>
          <p className="text-sm text-muted-foreground">{updates.length} updates</p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add Update
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search updates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {updateTypes.map((t) => (
              <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card border-0">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Megaphone className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No updates found</p>
              <Button onClick={openCreate} variant="outline" size="sm" className="mt-3 gap-2">
                <Plus className="size-3.5" /> Create your first update
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filtered.map((update) => (
                    <motion.tr
                      key={update.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-border/20 hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="font-medium max-w-[200px] truncate">{update.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${typeColors[update.type] || ''}`}>
                          {update.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Badge variant={update.published ? 'default' : 'secondary'} className="text-[10px]">
                            {update.published ? 'Published' : 'Draft'}
                          </Badge>
                          {update.featured && (
                            <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                        {new Date(update.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(update)}>
                            <Edit className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(update.id)}>
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-card-strong border-border/30">
          <DialogHeader>
            <DialogTitle>Delete Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this update? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 className="size-4 animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
