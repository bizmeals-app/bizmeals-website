'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  GraduationCap,
  ArrowLeft,
  GripVertical,
  ArrowUp,
  ArrowDown,
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

interface TrainingCourse {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  duration: string
  skills: string
  includes: string
  outcome: string
  icon: string
  joinLink: string
  highlights: string
  accent: string
  order: number
  published: boolean
  createdAt: string
  updatedAt: string
}

const accentColors = [
  { value: 'biz-purple', label: 'Purple', gradient: 'from-purple-500 to-blue-500' },
  { value: 'biz-blue', label: 'Blue', gradient: 'from-blue-500 to-cyan-500' },
  { value: 'biz-teal', label: 'Teal', gradient: 'from-teal-500 to-emerald-500' },
  { value: 'biz-amber', label: 'Amber', gradient: 'from-amber-500 to-orange-500' },
  { value: 'biz-violet', label: 'Violet', gradient: 'from-violet-500 to-purple-500' },
  { value: 'biz-cyan', label: 'Cyan', gradient: 'from-cyan-500 to-blue-500' },
]

const lucideIcons = [
  'GraduationCap', 'Code', 'BarChart3', 'TrendingUp', 'Palette', 'Globe',
  'Database', 'Brain', 'Rocket', 'Laptop', 'Zap', 'Target',
]

const emptyCourse: Omit<TrainingCourse, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  description: '',
  fullDescription: '',
  duration: '90 Days',
  skills: '',
  includes: '',
  outcome: '',
  icon: 'GraduationCap',
  joinLink: 'https://bizmeals.in/bizmeals-training-program/',
  highlights: '',
  accent: 'biz-purple',
  order: 0,
  published: true,
}

export default function AdminTrainingPage() {
  const [courses, setCourses] = useState<TrainingCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null)
  const [formData, setFormData] = useState(emptyCourse)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    try {
      const res = await fetch('/api/admin/training')
      const data = await res.json()
      setCourses((data.courses || []).sort((a: TrainingCourse, b: TrainingCourse) => a.order - b.order))
    } catch (err) {
      console.error('Failed to fetch courses:', err)
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
    setEditingCourse(null)
    setFormData({ ...emptyCourse, order: courses.length })
    setShowForm(true)
  }

  function openEdit(course: TrainingCourse) {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      slug: course.slug,
      description: course.description,
      fullDescription: course.fullDescription,
      duration: course.duration,
      skills: course.skills,
      includes: course.includes,
      outcome: course.outcome,
      icon: course.icon,
      joinLink: course.joinLink,
      highlights: course.highlights,
      accent: course.accent,
      order: course.order,
      published: course.published,
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
      if (editingCourse) {
        const res = await fetch(`/api/admin/training/${editingCourse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Course updated successfully')
      } else {
        const res = await fetch('/api/admin/training', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Course created successfully')
      }
      setShowForm(false)
      fetchCourses()
    } catch {
      toast.error('Failed to save course')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/training/${deleteId}`, { method: 'DELETE' })
      toast.success('Course deleted')
      setCourses(courses.filter((c) => c.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(false)
    }
  }

  async function reorderCourse(courseId: string, direction: 'up' | 'down') {
    const sorted = [...courses].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((c) => c.id === courseId)
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sorted.length - 1)) return

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const temp = sorted[idx].order
    sorted[idx].order = sorted[swapIdx].order
    sorted[swapIdx].order = temp

    // Update both via API
    try {
      await fetch(`/api/admin/training/${sorted[idx].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: sorted[idx].order }),
      })
      await fetch(`/api/admin/training/${sorted[swapIdx].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: sorted[swapIdx].order }),
      })
      fetchCourses()
    } catch {
      toast.error('Failed to reorder')
    }
  }

  const accentMap: Record<string, string> = {
    'biz-purple': 'from-purple-500/20 to-blue-500/20 border-purple-500/30',
    'biz-blue': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'biz-teal': 'from-teal-500/20 to-emerald-500/20 border-teal-500/30',
    'biz-amber': 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    'biz-violet': 'from-violet-500/20 to-purple-500/20 border-violet-500/30',
    'biz-cyan': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  }

  const accentGradientMap: Record<string, string> = {
    'biz-purple': 'from-purple-500 to-blue-500',
    'biz-blue': 'from-blue-500 to-cyan-500',
    'biz-teal': 'from-teal-500 to-emerald-500',
    'biz-amber': 'from-amber-500 to-orange-500',
    'biz-violet': 'from-violet-500 to-purple-500',
    'biz-cyan': 'from-cyan-500 to-blue-500',
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'New Course'}</h1>
            <p className="text-sm text-muted-foreground">
              {editingCourse ? 'Update training course details' : 'Create a new training course'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input
                    placeholder="e.g. Digital Marketing Mastery"
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
                  <Label>Short Description</Label>
                  <Textarea
                    placeholder="Brief course description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Full Description (separate paragraphs with |)</Label>
                  <Textarea
                    placeholder="Paragraph 1 | Paragraph 2 | Paragraph 3"
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    rows={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Requirements / What You&apos;ll Learn (comma separated)</Label>
                  <Textarea
                    placeholder="SEO, Social Media, PPC, Analytics"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Includes (comma separated)</Label>
                  <Textarea
                    placeholder="Live Projects, Certificate, Mentorship"
                    value={formData.includes}
                    onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Highlights (comma separated)</Label>
                  <Textarea
                    placeholder="100% Placement Support, Industry Expert Led"
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm">Course Settings</h3>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="90 Days"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Input
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="e.g. Job-ready Digital Marketer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {lucideIcons.map((icon) => (
                        <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <Select value={formData.accent} onValueChange={(v) => setFormData({ ...formData, accent: v })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accentColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <span className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${color.gradient}`} />
                            {color.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Join Link</Label>
                  <Input
                    value={formData.joinLink}
                    onChange={(e) => setFormData({ ...formData, joinLink: e.target.value })}
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
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Published</Label>
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(v) => setFormData({ ...formData, published: v })}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSave}
              className="w-full gradient-purple text-white"
              disabled={saving}
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : 'Save Course'}
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
            <GraduationCap className="size-5 text-biz-teal" />
            Training Management
          </h1>
          <p className="text-sm text-muted-foreground">{courses.length} training courses</p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> Add New Course
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap className="size-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No courses yet</p>
          <Button onClick={openCreate} variant="outline" size="sm" className="mt-3 gap-2">
            <Plus className="size-3.5" /> Create your first course
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`bg-gradient-to-br ${accentMap[course.accent] || accentMap['biz-purple']} border glass-card overflow-hidden group`}>
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${accentGradientMap[course.accent] || accentGradientMap['biz-purple']}`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${accentGradientMap[course.accent] || accentGradientMap['biz-purple']} flex items-center justify-center`}>
                          <GraduationCap className="size-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
                          <p className="text-[10px] text-muted-foreground">{course.duration}</p>
                        </div>
                      </div>
                      <Badge variant={course.published ? 'default' : 'secondary'} className="text-[10px] shrink-0">
                        {course.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{course.description}</p>

                    {/* Skills preview */}
                    {course.skills && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.skills.split(',').slice(0, 3).map((skill, si) => (
                          <Badge key={si} variant="outline" className="text-[9px] px-1.5 py-0">
                            {skill.trim()}
                          </Badge>
                        ))}
                        {course.skills.split(',').length > 3 && (
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            +{course.skills.split(',').length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => reorderCourse(course.id, 'up')}
                          disabled={i === 0}
                        >
                          <ArrowUp className="size-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => reorderCourse(course.id, 'down')}
                          disabled={i === courses.length - 1}
                        >
                          <ArrowDown className="size-3" />
                        </Button>
                        <GripVertical className="size-3 text-muted-foreground/30 ml-1" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => openEdit(course)}>
                          <Edit className="size-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(course.id)}>
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-card-strong border-border/30">
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this training course? This action cannot be undone.
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
