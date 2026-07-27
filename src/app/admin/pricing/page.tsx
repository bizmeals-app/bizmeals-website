'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  ArrowLeft,
  DollarSign,
  Star,
  Check,
  Crown,
  Tag,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface PricingPlan {
  id: string
  name: string
  slug: string
  description: string
  price: string
  period: string
  features: string
  highlight: boolean
  category: string
  ctaText: string
  ctaLink: string
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

const categories = [
  { value: 'marketing', label: 'Marketing', gradient: 'from-purple-500 to-blue-500', bg: 'from-purple-500/15 to-blue-500/15 border-purple-500/25' },
  { value: 'bpo', label: 'BPO', gradient: 'from-teal-500 to-emerald-500', bg: 'from-teal-500/15 to-emerald-500/15 border-teal-500/25' },
  { value: 'consultancy', label: 'Consultancy', gradient: 'from-amber-500 to-orange-500', bg: 'from-amber-500/15 to-orange-500/15 border-amber-500/25' },
  { value: 'events', label: 'Events', gradient: 'from-rose-500 to-pink-500', bg: 'from-rose-500/15 to-pink-500/15 border-rose-500/25' },
]

const periods = ['/month', '/project', '/quarter', '/year', 'one-time']

const emptyPlan: Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  slug: '',
  description: '',
  price: '',
  period: '/month',
  features: '',
  highlight: false,
  category: 'marketing',
  ctaText: 'Get Started',
  ctaLink: '/contact',
  order: 0,
  published: false,
}

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [formData, setFormData] = useState(emptyPlan)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {
    try {
      const res = await fetch('/api/admin/pricing')
      const data = await res.json()
      setPlans((data.plans || []).sort((a: PricingPlan, b: PricingPlan) => a.order - b.order))
    } catch (err) {
      console.error('Failed to fetch plans:', err)
    } finally {
      setLoading(false)
    }
  }

  function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  function openCreate() {
    setEditingPlan(null)
    setFormData({ ...emptyPlan, order: plans.length })
    setShowForm(true)
  }

  function openEdit(plan: PricingPlan) {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      slug: plan.slug,
      description: plan.description,
      price: plan.price,
      period: plan.period,
      features: plan.features,
      highlight: plan.highlight,
      category: plan.category,
      ctaText: plan.ctaText,
      ctaLink: plan.ctaLink,
      order: plan.order,
      published: plan.published,
    })
    setShowForm(true)
  }

  async function handleSave(publish: boolean) {
    if (!formData.name.trim()) {
      toast.error('Plan name is required')
      return
    }
    if (!formData.price.trim()) {
      toast.error('Price is required')
      return
    }

    setSaving(true)
    const slug = formData.slug || generateSlug(formData.name)
    const payload = { ...formData, slug, published: publish }

    try {
      if (editingPlan) {
        const res = await fetch(`/api/admin/pricing/${editingPlan.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Plan updated successfully')
      } else {
        const res = await fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Plan created successfully')
      }
      setShowForm(false)
      fetchPlans()
    } catch {
      toast.error('Failed to save plan')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/pricing/${deleteId}`, { method: 'DELETE' })
      toast.success('Plan deleted')
      setPlans(plans.filter((p) => p.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete plan')
    } finally {
      setDeleting(false)
    }
  }

  const filtered = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(search.toLowerCase()) ||
      plan.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === 'all' || plan.category === filterCategory
    return matchesSearch && matchesCategory
  })

  function getCategoryMeta(value: string) {
    return categories.find((c) => c.value === value) || categories[0]
  }

  function getFeatureCount(features: string): number {
    if (!features.trim()) return 0
    return features.split(',').filter((f) => f.trim()).length
  }

  // ── Form View ─────────────────────────────────────────────
  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{editingPlan ? 'Edit Plan' : 'New Plan'}</h1>
            <p className="text-sm text-muted-foreground">
              {editingPlan ? 'Update pricing plan details' : 'Create a new pricing plan'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label>Plan Name</Label>
                  <Input
                    placeholder="e.g. Starter, Growth, Enterprise"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })
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
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief description of the plan..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      placeholder="₹9,999 or Custom"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select value={formData.period} onValueChange={(v) => setFormData({ ...formData, period: v })}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Features (comma separated or one per line)</Label>
                  <Textarea
                    placeholder="SEO Optimization, Social Media Management, Content Strategy, Analytics"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={6}
                  />
                  {formData.features && (
                    <p className="text-xs text-muted-foreground">
                      {getFeatureCount(formData.features)} feature{getFeatureCount(formData.features) !== 1 ? 's' : ''} listed
                    </p>
                  )}
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
                    onCheckedChange={(v) => setFormData({ ...formData, published: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Highlight (Most Popular)</Label>
                  <Switch
                    checked={formData.highlight}
                    onCheckedChange={(v) => setFormData({ ...formData, highlight: v })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Plan Settings</h3>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                            {cat.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>CTA Text</Label>
                  <Input
                    placeholder="Get Started"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Link</Label>
                  <Input
                    placeholder="/contact"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
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

  // ── List View ─────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <DollarSign className="size-5 text-primary" />
            Pricing Plans
          </h1>
          <p className="text-sm text-muted-foreground">{plans.length} pricing plans</p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add New Plan
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search plans..."
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
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                  {cat.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <DollarSign className="size-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {plans.length === 0 ? 'No pricing plans yet' : 'No plans match your search'}
          </p>
          {plans.length === 0 && (
            <Button onClick={openCreate} variant="outline" size="sm" className="mt-3 gap-2">
              <Plus className="size-3.5" /> Create your first plan
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((plan, i) => {
              const catMeta = getCategoryMeta(plan.category)
              const featureCount = getFeatureCount(plan.features)
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`bg-gradient-to-br ${catMeta.bg} border glass-card overflow-hidden group relative`}>
                    {/* Top gradient bar */}
                    <div className={`h-1 bg-gradient-to-r ${catMeta.gradient}`} />

                    {/* Highlight badge */}
                    {plan.highlight && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] border-0 gap-1">
                          <Star className="size-2.5 fill-current" /> Popular
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${catMeta.gradient} flex items-center justify-center`}>
                            {plan.highlight ? (
                              <Crown className="size-4 text-white" />
                            ) : (
                              <Tag className="size-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm line-clamp-1">{plan.name}</h3>
                            <p className="text-[10px] text-muted-foreground capitalize">{plan.category}</p>
                          </div>
                        </div>
                        {!plan.highlight && (
                          <Badge variant={plan.published ? 'default' : 'secondary'} className="text-[10px] shrink-0">
                            {plan.published ? 'Published' : 'Draft'}
                          </Badge>
                        )}
                      </div>

                      {/* Price display */}
                      <div className="mb-3">
                        <span className="text-lg font-bold">{plan.price || '—'}</span>
                        {plan.price && plan.period !== 'one-time' && (
                          <span className="text-xs text-muted-foreground ml-0.5">{plan.period}</span>
                        )}
                        {plan.period === 'one-time' && plan.price && (
                          <span className="text-xs text-muted-foreground ml-1">one-time</span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{plan.description || 'No description'}</p>

                      {/* Features preview */}
                      {plan.features && (
                        <div className="space-y-1 mb-4">
                          {plan.features.split(',').slice(0, 3).map((feature, fi) => (
                            <div key={fi} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <Check className="size-3 text-biz-emerald shrink-0" />
                              <span className="truncate">{feature.trim()}</span>
                            </div>
                          ))}
                          {featureCount > 3 && (
                            <p className="text-[10px] text-muted-foreground/60 pl-4">
                              +{featureCount - 3} more
                            </p>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/20">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            {featureCount} feature{featureCount !== 1 ? 's' : ''}
                          </Badge>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            #{plan.order}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="size-7" onClick={() => openEdit(plan)}>
                            <Edit className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(plan.id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-card-strong border-border/30">
          <DialogHeader>
            <DialogTitle>Delete Pricing Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pricing plan? This action cannot be undone.
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
