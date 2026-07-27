'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  Briefcase,
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

interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string
  image: string
  testimonial: string
  testimonialAuthor: string
  testimonialRole: string
  category: string
  featured: boolean
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const caseStudyCategories = ['Digital Marketing', 'BPO', 'Consultancy', 'Events', 'Web Development']

const emptyCaseStudy: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  client: '',
  industry: '',
  challenge: '',
  solution: '',
  results: '',
  image: '',
  testimonial: '',
  testimonialAuthor: '',
  testimonialRole: '',
  category: 'Digital Marketing',
  featured: false,
  published: false,
  order: 0,
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null)
  const [formData, setFormData] = useState(emptyCaseStudy)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  async function fetchCaseStudies() {
    try {
      const res = await fetch('/api/admin/case-studies')
      const data = await res.json()
      setCaseStudies(data.caseStudies || [])
    } catch (err) {
      console.error('Failed to fetch case studies:', err)
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
    setEditingCaseStudy(null)
    setFormData(emptyCaseStudy)
    setShowForm(true)
  }

  function openEdit(cs: CaseStudy) {
    setEditingCaseStudy(cs)
    setFormData({
      title: cs.title,
      slug: cs.slug,
      client: cs.client,
      industry: cs.industry,
      challenge: cs.challenge,
      solution: cs.solution,
      results: cs.results,
      image: cs.image,
      testimonial: cs.testimonial,
      testimonialAuthor: cs.testimonialAuthor,
      testimonialRole: cs.testimonialRole,
      category: cs.category,
      featured: cs.featured,
      published: cs.published,
      order: cs.order,
    })
    setShowForm(true)
  }

  async function handleSave(publish: boolean) {
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setSaving(true)
    const slug = formData.slug || generateSlug(formData.title)
    const payload = { ...formData, slug, published: publish }

    try {
      if (editingCaseStudy) {
        const res = await fetch(`/api/admin/case-studies/${editingCaseStudy.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Case study updated successfully')
      } else {
        const res = await fetch('/api/admin/case-studies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Case study created successfully')
      }
      setShowForm(false)
      fetchCaseStudies()
    } catch {
      toast.error('Failed to save case study')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/case-studies/${deleteId}`, { method: 'DELETE' })
      toast.success('Case study deleted')
      setCaseStudies(caseStudies.filter((cs) => cs.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete case study')
    } finally {
      setDeleting(false)
    }
  }

  const filtered = caseStudies.filter((cs) => {
    const matchesSearch =
      cs.title.toLowerCase().includes(search.toLowerCase()) ||
      cs.client.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'all' || cs.category === filterCategory
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && cs.published) ||
      (filterStatus === 'draft' && !cs.published)
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Form View
  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">
              {editingCaseStudy ? 'Edit Case Study' : 'New Case Study'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {editingCaseStudy
                ? 'Update case study details'
                : 'Create a new case study'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Case study title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: generateSlug(e.target.value),
                      })
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    placeholder="url-friendly-slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client</Label>
                    <Input
                      placeholder="Client name"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input
                      placeholder="e.g. Healthcare, Finance"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Challenge</Label>
                  <Textarea
                    placeholder="Describe the challenge the client faced..."
                    value={formData.challenge}
                    onChange={(e) =>
                      setFormData({ ...formData, challenge: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Solution</Label>
                  <Textarea
                    placeholder="Describe the solution provided..."
                    value={formData.solution}
                    onChange={(e) =>
                      setFormData({ ...formData, solution: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Results (comma-separated key metrics)</Label>
                  <Input
                    placeholder="150% ROI, 3x growth, 40% cost reduction"
                    value={formData.results}
                    onChange={(e) =>
                      setFormData({ ...formData, results: e.target.value })
                    }
                  />
                  {formData.results && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {formData.results
                        .split(',')
                        .map((r) => r.trim())
                        .filter(Boolean)
                        .map((result, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {result}
                          </Badge>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Publishing</h3>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Published</Label>
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(v) =>
                      setFormData({ ...formData, published: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Featured</Label>
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(v) =>
                      setFormData({ ...formData, featured: v })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) =>
                      setFormData({ ...formData, category: v })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {caseStudyCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Testimonial</h3>
                <div className="space-y-2">
                  <Label>Testimonial</Label>
                  <Textarea
                    placeholder="Client testimonial quote..."
                    value={formData.testimonial}
                    onChange={(e) =>
                      setFormData({ ...formData, testimonial: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.testimonialAuthor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonialAuthor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    placeholder="CEO, Company Name"
                    value={formData.testimonialRole}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonialRole: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                onClick={() => handleSave(false)}
                variant="outline"
                className="flex-1"
                disabled={saving}
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : 'Save Draft'}
              </Button>
              <Button
                onClick={() => handleSave(true)}
                className="flex-1 gradient-purple text-white"
                disabled={saving}
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="size-5 text-primary" />
            Case Study Management
          </h1>
          <p className="text-sm text-muted-foreground">
            {caseStudies.length} case studies
          </p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add New Case Study
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {caseStudyCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
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

      {/* Table */}
      <Card className="glass-card border-0">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No case studies found</p>
              <Button
                onClick={openCreate}
                variant="outline"
                size="sm"
                className="mt-3 gap-2"
              >
                <Plus className="size-3.5" /> Create your first case study
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs">Client</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Order</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filtered.map((cs) => (
                    <motion.tr
                      key={cs.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-border/20 hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="font-medium max-w-[200px] truncate">
                        <div className="flex items-center gap-2">
                          {cs.featured && (
                            <span className="inline-block size-1.5 rounded-full bg-yellow-500 shrink-0" title="Featured" />
                          )}
                          {cs.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[120px] truncate">
                        {cs.client || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {cs.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={cs.published ? 'default' : 'secondary'}
                          className="text-[10px]"
                        >
                          {cs.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                        {cs.order}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => openEdit(cs)}
                          >
                            <Edit className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(cs.id)}
                          >
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

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-card-strong border-border/30">
          <DialogHeader>
            <DialogTitle>Delete Case Study</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this case study? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <Loader2 className="size-4 animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
