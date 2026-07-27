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

interface Portfolio {
  id: string
  title: string
  slug: string
  client: string
  description: string
  category: string
  image: string
  results: string
  technologies: string
  duration: string
  testimonial: string
  featured: boolean
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const portfolioCategories = ['Digital Marketing', 'BPO', 'Consultancy', 'Events', 'Web Development']

const emptyPortfolio: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  client: '',
  description: '',
  category: 'Digital Marketing',
  image: '',
  results: '',
  technologies: '',
  duration: '',
  testimonial: '',
  featured: false,
  published: false,
  order: 0,
}

export default function AdminPortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null)
  const [formData, setFormData] = useState(emptyPortfolio)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPortfolios()
  }, [])

  async function fetchPortfolios() {
    try {
      const res = await fetch('/api/admin/portfolios')
      const data = await res.json()
      setPortfolios(data.portfolios || [])
    } catch (err) {
      console.error('Failed to fetch portfolios:', err)
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
    setEditingPortfolio(null)
    setFormData(emptyPortfolio)
    setShowForm(true)
  }

  function openEdit(portfolio: Portfolio) {
    setEditingPortfolio(portfolio)
    setFormData({
      title: portfolio.title,
      slug: portfolio.slug,
      client: portfolio.client,
      description: portfolio.description,
      category: portfolio.category,
      image: portfolio.image,
      results: portfolio.results,
      technologies: portfolio.technologies,
      duration: portfolio.duration,
      testimonial: portfolio.testimonial,
      featured: portfolio.featured,
      published: portfolio.published,
      order: portfolio.order,
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
      if (editingPortfolio) {
        const res = await fetch(`/api/admin/portfolios/${editingPortfolio.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Portfolio updated successfully')
      } else {
        const res = await fetch('/api/admin/portfolios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Portfolio created successfully')
      }
      setShowForm(false)
      fetchPortfolios()
    } catch {
      toast.error('Failed to save portfolio')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/portfolios/${deleteId}`, { method: 'DELETE' })
      toast.success('Portfolio deleted')
      setPortfolios(portfolios.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete portfolio')
    } finally {
      setDeleting(false)
    }
  }

  const filtered = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.title.toLowerCase().includes(search.toLowerCase()) ||
      portfolio.client.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'all' || portfolio.category === filterCategory
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && portfolio.published) ||
      (filterStatus === 'draft' && !portfolio.published)
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
              {editingPortfolio ? 'Edit Portfolio' : 'New Portfolio'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {editingPortfolio
                ? 'Update portfolio item details'
                : 'Create a new portfolio item'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Portfolio project title"
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
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input
                    placeholder="Client or company name"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the project, scope, and objectives..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Results (comma separated)</Label>
                  <Textarea
                    placeholder="300% ROI, 50K new users, 2x conversion rate"
                    value={formData.results}
                    onChange={(e) =>
                      setFormData({ ...formData, results: e.target.value })
                    }
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter key results separated by commas
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Technologies (comma separated)</Label>
                  <Input
                    placeholder="React, Node.js, AWS, PostgreSQL"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter technologies used separated by commas
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Testimonial</Label>
                  <Textarea
                    placeholder="Client testimonial or quote about the project..."
                    value={formData.testimonial}
                    onChange={(e) =>
                      setFormData({ ...formData, testimonial: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
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
                      {portfolioCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Details</h3>
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
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g. 3 months, 6 weeks"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
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
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first
                  </p>
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
            Portfolio Management
          </h1>
          <p className="text-sm text-muted-foreground">
            {portfolios.length} portfolio item{portfolios.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add New Portfolio
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search portfolios..."
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
            {portfolioCategories.map((cat) => (
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
              <p className="text-muted-foreground">
                {portfolios.length === 0
                  ? 'No portfolio items yet'
                  : 'No portfolios match your filters'}
              </p>
              {portfolios.length === 0 && (
                <Button
                  onClick={openCreate}
                  variant="outline"
                  size="sm"
                  className="mt-3 gap-2"
                >
                  <Plus className="size-3.5" /> Create your first portfolio
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Client</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filtered.map((portfolio) => (
                    <motion.tr
                      key={portfolio.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-border/20 hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="font-medium max-w-[200px] truncate">
                        <div className="flex items-center gap-2">
                          {portfolio.title}
                          {portfolio.featured && (
                            <Badge className="text-[9px] px-1.5 py-0 gradient-purple text-white border-0">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {portfolio.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden sm:table-cell max-w-[150px] truncate">
                        {portfolio.client || '\u2014'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={portfolio.published ? 'default' : 'secondary'}
                          className="text-[10px]"
                        >
                          {portfolio.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => openEdit(portfolio)}
                          >
                            <Edit className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(portfolio.id)}
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
            <DialogTitle>Delete Portfolio Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this portfolio item? This action
              cannot be undone.
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
