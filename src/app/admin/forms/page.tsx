'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Loader2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  Mail,
  X,
  ArrowLeft,
  ClipboardList,
  MessageSquare,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { toast } from 'sonner'

// ─── Types ───────────────────────────────────────────────────

interface FormField {
  id: string
  type: string
  label: string
  placeholder: string
  required: boolean
  options: string[]
}

interface CustomForm {
  id: string
  title: string
  slug: string
  description: string
  fields: string // JSON
  published: boolean
  submitLabel: string
  successMsg: string
  notifyEmail: string
  order: number
  createdAt: string
  updatedAt: string
  submissions?: FormSubmission[]
  _count?: { submissions: number }
}

interface FormSubmission {
  id: string
  formId: string
  data: string // JSON
  read: boolean
  createdAt: string
}

// ─── Constants ───────────────────────────────────────────────

const FIELD_TYPES = [
  { value: 'text', label: 'Text', icon: 'T' },
  { value: 'email', label: 'Email', icon: '@' },
  { value: 'textarea', label: 'Textarea', icon: '¶' },
  { value: 'select', label: 'Select', icon: '▾' },
  { value: 'checkbox', label: 'Checkbox', icon: '☑' },
  { value: 'number', label: 'Number', icon: '#' },
  { value: 'phone', label: 'Phone', icon: '☎' },
  { value: 'url', label: 'URL', icon: '🔗' },
]

const emptyForm: Omit<CustomForm, 'id' | 'createdAt' | 'updatedAt' | '_count' | 'submissions'> = {
  title: '',
  slug: '',
  description: '',
  fields: '[]',
  published: false,
  submitLabel: 'Submit',
  successMsg: 'Thank you for your submission!',
  notifyEmail: '',
  order: 0,
}

let fieldCounter = 0

function generateFieldId(): string {
  fieldCounter++
  return `field_${Date.now()}_${fieldCounter}`
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseFields(json: string): FormField[] {
  try {
    return JSON.parse(json || '[]')
  } catch {
    return []
  }
}

function stringifyFields(fields: FormField[]): string {
  return JSON.stringify(fields)
}

// ─── Component ───────────────────────────────────────────────

export default function AdminFormsPage() {
  // View state
  const [view, setView] = useState<'list' | 'builder' | 'submissions'>('list')
  const [forms, setForms] = useState<CustomForm[]>([])
  const [loading, setLoading] = useState(true)

  // Form builder state
  const [editingForm, setEditingForm] = useState<CustomForm | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [fields, setFields] = useState<FormField[]>([])
  const [saving, setSaving] = useState(false)

  // Submissions state
  const [viewingForm, setViewingForm] = useState<CustomForm | null>(null)
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(false)

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Add field dialog
  const [showAddField, setShowAddField] = useState(false)
  const [newFieldType, setNewFieldType] = useState('text')

  useEffect(() => {
    fetchForms()
  }, [])

  async function fetchForms() {
    try {
      const res = await fetch('/api/admin/forms')
      const data = await res.json()
      setForms(data.forms || [])
    } catch (err) {
      console.error('Failed to fetch forms:', err)
    } finally {
      setLoading(false)
    }
  }

  // ── Form Builder Actions ──

  function openCreate() {
    setEditingForm(null)
    setFormData({ ...emptyForm, order: forms.length })
    setFields([])
    setView('builder')
  }

  function openEdit(form: CustomForm) {
    setEditingForm(form)
    setFormData({
      title: form.title,
      slug: form.slug,
      description: form.description,
      fields: form.fields,
      published: form.published,
      submitLabel: form.submitLabel,
      successMsg: form.successMsg,
      notifyEmail: form.notifyEmail,
      order: form.order,
    })
    setFields(parseFields(form.fields))
    setView('builder')
  }

  function openSubmissions(form: CustomForm) {
    setViewingForm(form)
    setView('submissions')
    fetchSubmissions(form.id)
  }

  async function fetchSubmissions(formId: string) {
    setLoadingSubmissions(true)
    try {
      const res = await fetch(`/api/admin/forms/${formId}/submissions`)
      const data = await res.json()
      setSubmissions(data.submissions || [])
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
      toast.error('Failed to load submissions')
    } finally {
      setLoadingSubmissions(false)
    }
  }

  async function handleSave(publish: boolean) {
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setSaving(true)
    const slug = formData.slug || generateSlug(formData.title)
    const payload = {
      title: formData.title,
      slug,
      description: formData.description,
      fields: stringifyFields(fields),
      published: publish,
      submitLabel: formData.submitLabel || 'Submit',
      successMsg: formData.successMsg || 'Thank you for your submission!',
      notifyEmail: formData.notifyEmail,
    }

    try {
      if (editingForm) {
        const res = await fetch(`/api/admin/forms/${editingForm.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Form updated successfully')
      } else {
        const res = await fetch('/api/admin/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast.success('Form created successfully')
      }
      setView('list')
      fetchForms()
    } catch {
      toast.error('Failed to save form')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/forms/${deleteId}`, { method: 'DELETE' })
      toast.success('Form deleted')
      setForms(forms.filter((f) => f.id !== deleteId))
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete form')
    } finally {
      setDeleting(false)
    }
  }

  // ── Field Builder Actions ──

  function addField(type: string) {
    const newField: FormField = {
      id: generateFieldId(),
      type,
      label: '',
      placeholder: type === 'select' ? 'Choose an option...' : `Enter ${type}...`,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2'] : [],
    }
    setFields([...fields, newField])
    setShowAddField(false)
  }

  function updateField(index: number, updates: Partial<FormField>) {
    const updated = [...fields]
    updated[index] = { ...updated[index], ...updates }
    setFields(updated)
  }

  function removeField(index: number) {
    setFields(fields.filter((_, i) => i !== index))
  }

  function moveField(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= fields.length) return
    const updated = [...fields]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    setFields(updated)
  }

  function addOption(index: number) {
    const updated = [...fields]
    const currentOptions = updated[index].options || []
    updated[index] = { ...updated[index], options: [...currentOptions, `Option ${currentOptions.length + 1}`] }
    setFields(updated)
  }

  function updateOption(fieldIndex: number, optionIndex: number, value: string) {
    const updated = [...fields]
    const currentOptions = [...(updated[fieldIndex].options || [])]
    currentOptions[optionIndex] = value
    updated[fieldIndex] = { ...updated[fieldIndex], options: currentOptions }
    setFields(updated)
  }

  function removeOption(fieldIndex: number, optionIndex: number) {
    const updated = [...fields]
    const currentOptions = (updated[fieldIndex].options || []).filter((_, i) => i !== optionIndex)
    updated[fieldIndex] = { ...updated[fieldIndex], options: currentOptions }
    setFields(updated)
  }

  function getSubmissionCount(form: CustomForm): number {
    if (form._count?.submissions !== undefined) return form._count.submissions
    if (form.submissions?.length !== undefined) return form.submissions.length
    return 0
  }

  function getFieldTypeLabel(type: string): string {
    return FIELD_TYPES.find((t) => t.value === type)?.label || type
  }

  function getFieldTypeIcon(type: string): string {
    return FIELD_TYPES.find((t) => t.value === type)?.icon || '?'
  }

  // ── Submissions View ──

  if (view === 'submissions' && viewingForm) {
    const formFields = parseFields(viewingForm.fields)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setView('list')}>
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold truncate">{viewingForm.title}</h1>
            <p className="text-sm text-muted-foreground">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => openEdit(viewingForm)}
          >
            <Edit className="size-3.5" /> Edit Form
          </Button>
        </div>

        {loadingSubmissions ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : submissions.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="py-16 text-center">
              <ClipboardList className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No submissions yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Submissions will appear here when people fill out your form
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {submissions.map((sub, i) => {
                const subData = (() => {
                  try { return JSON.parse(sub.data || '{}') } catch { return {} }
                })()
                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card className="glass-card border-0">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              #{i + 1}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(sub.createdAt).toLocaleString()}
                            </span>
                          </div>
                          {!sub.read && (
                            <Badge className="text-[10px] gradient-purple text-white border-0">New</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formFields.map((field) => (
                            <div key={field.id} className="space-y-1">
                              <Label className="text-xs text-muted-foreground">{field.label || field.type}</Label>
                              <div className="text-sm font-medium">
                                {field.type === 'checkbox'
                                  ? (subData[field.id] ? '✓ Yes' : '✗ No')
                                  : (subData[field.id] || <span className="text-muted-foreground/50">—</span>)
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    )
  }

  // ── Form Builder View ──

  if (view === 'builder') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setView('list')}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{editingForm ? 'Edit Form' : 'New Form'}</h1>
            <p className="text-sm text-muted-foreground">
              {editingForm ? 'Update form details and fields' : 'Create a custom form with flexible fields'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Form Details & Field Builder */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <FileText className="size-4 text-primary" /> Form Details
                </h3>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="e.g. Contact Form, Survey, Registration"
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
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief description of this form..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Visual Form Builder */}
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <ClipboardList className="size-4 text-primary" /> Form Fields
                  </h3>
                  <Badge variant="outline" className="text-[10px]">
                    {fields.length} field{fields.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Field List */}
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="glass rounded-lg p-4 space-y-3 group border border-border/20 hover:border-border/40 transition-colors">
                          {/* Field Header */}
                          <div className="flex items-center gap-2">
                            <GripVertical className="size-4 text-muted-foreground/40 cursor-grab" />
                            <div className="w-7 h-7 rounded gradient-purple flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {getFieldTypeIcon(field.type)}
                            </div>
                            <Badge variant="outline" className="text-[10px]">
                              {getFieldTypeLabel(field.type)}
                            </Badge>
                            <div className="flex-1" />
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                disabled={index === 0}
                                onClick={() => moveField(index, 'up')}
                              >
                                <ArrowUp className="size-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                disabled={index === fields.length - 1}
                                onClick={() => moveField(index, 'down')}
                              >
                                <ArrowDown className="size-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 text-destructive hover:text-destructive"
                                onClick={() => removeField(index)}
                              >
                                <Trash2 className="size-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Field Settings */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                            <div className="space-y-1.5">
                              <Label className="text-xs">Label</Label>
                              <Input
                                placeholder="Field label"
                                value={field.label}
                                onChange={(e) => updateField(index, { label: e.target.value })}
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs">Placeholder</Label>
                              <Input
                                placeholder="Placeholder text"
                                value={field.placeholder}
                                onChange={(e) => updateField(index, { placeholder: e.target.value })}
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-4 pl-8">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.required}
                                onCheckedChange={(v) => updateField(index, { required: v })}
                                className="scale-75"
                              />
                              <Label className="text-xs text-muted-foreground">Required</Label>
                            </div>

                            <div className="space-y-1.5">
                              <Label className="text-xs">Type</Label>
                              <Select
                                value={field.type}
                                onValueChange={(v) => {
                                  const updates: Partial<FormField> = { type: v }
                                  if (v === 'select' && (!field.options || field.options.length === 0)) {
                                    updates.options = ['Option 1', 'Option 2']
                                  }
                                  updateField(index, updates)
                                }}
                              >
                                <SelectTrigger className="h-7 text-xs w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {FIELD_TYPES.map((ft) => (
                                    <SelectItem key={ft.value} value={ft.value}>
                                      <span className="flex items-center gap-1.5">
                                        <span className="text-xs">{ft.icon}</span>
                                        {ft.label}
                                      </span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Options for Select type */}
                          {field.type === 'select' && (
                            <div className="pl-8 space-y-2">
                              <Label className="text-xs text-muted-foreground">Options</Label>
                              <div className="space-y-1.5">
                                {(field.options || []).map((opt, oi) => (
                                  <div key={oi} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full gradient-purple shrink-0" />
                                    <Input
                                      value={opt}
                                      onChange={(e) => updateOption(index, oi, e.target.value)}
                                      className="h-7 text-xs flex-1"
                                      placeholder={`Option ${oi + 1}`}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="size-6 shrink-0 text-muted-foreground hover:text-destructive"
                                      onClick={() => removeOption(index, oi)}
                                    >
                                      <X className="size-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() => addOption(index)}
                              >
                                <Plus className="size-3" /> Add Option
                              </Button>
                            </div>
                          )}

                          {/* Live Preview for this field */}
                          <div className="pl-8 pt-2 border-t border-border/10">
                            <p className="text-[10px] text-muted-foreground/60 mb-1.5">Preview</p>
                            <div className="space-y-1">
                              <label className="text-xs font-medium flex items-center gap-1">
                                {field.label || 'Label'}
                                {field.required && <span className="text-destructive text-[10px]">*</span>}
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  placeholder={field.placeholder}
                                  className="w-full h-16 text-xs bg-white/5 border border-border/30 rounded-md px-3 py-2 text-muted-foreground resize-none"
                                  disabled
                                />
                              ) : field.type === 'select' ? (
                                <div className="w-full text-xs bg-white/5 border border-border/30 rounded-md px-3 py-2 text-muted-foreground flex items-center justify-between">
                                  <span>{field.placeholder || 'Choose...'}</span>
                                  <span className="text-[10px]">▾</span>
                                </div>
                              ) : field.type === 'checkbox' ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded border border-border/40" />
                                  <span className="text-xs text-muted-foreground">{field.placeholder || 'Check this'}</span>
                                </div>
                              ) : (
                                <input
                                  type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : 'text'}
                                  placeholder={field.placeholder}
                                  className="w-full text-xs bg-white/5 border border-border/30 rounded-md px-3 py-2 text-muted-foreground"
                                  disabled
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty state */}
                  {fields.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-border/30 rounded-lg">
                      <ClipboardList className="size-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No fields yet</p>
                      <p className="text-xs text-muted-foreground/60 mb-3">Add fields to build your form</p>
                    </div>
                  )}

                  {/* Add Field Button */}
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-dashed"
                    onClick={() => {
                      setNewFieldType('text')
                      setShowAddField(true)
                    }}
                  >
                    <Plus className="size-4" /> Add Field
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Publishing */}
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
                {editingForm && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Created {new Date(editingForm.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Form Settings */}
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <MessageSquare className="size-4 text-primary" /> Form Settings
                </h3>
                <div className="space-y-2">
                  <Label>Submit Button Label</Label>
                  <Input
                    placeholder="Submit"
                    value={formData.submitLabel}
                    onChange={(e) => setFormData({ ...formData, submitLabel: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Success Message</Label>
                  <Textarea
                    placeholder="Thank you for your submission!"
                    value={formData.successMsg}
                    onChange={(e) => setFormData({ ...formData, successMsg: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5">
                    <Mail className="size-3.5" /> Notify Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.notifyEmail}
                    onChange={(e) => setFormData({ ...formData, notifyEmail: e.target.value })}
                  />
                  <p className="text-[10px] text-muted-foreground/60">
                    Get notified when this form receives a submission
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Form Preview Summary */}
            <Card className="glass-card border-0">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Eye className="size-4 text-primary" /> Summary
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium truncate ml-2">{formData.title || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slug</span>
                    <span className="font-medium truncate ml-2">{formData.slug || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fields</span>
                    <span className="font-medium">{fields.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Required</span>
                    <span className="font-medium">{fields.filter((f) => f.required).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={formData.published ? 'default' : 'secondary'} className="text-[10px]">
                      {formData.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Buttons */}
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

        {/* Add Field Dialog */}
        <Dialog open={showAddField} onOpenChange={setShowAddField}>
          <DialogContent className="glass-card-strong border-border/30">
            <DialogHeader>
              <DialogTitle>Add Field</DialogTitle>
              <DialogDescription>
                Choose a field type to add to your form
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2 py-2">
              {FIELD_TYPES.map((ft) => (
                <Button
                  key={ft.value}
                  variant="outline"
                  className={`justify-start gap-2 h-10 ${newFieldType === ft.value ? 'border-primary bg-primary/10' : ''}`}
                  onClick={() => setNewFieldType(ft.value)}
                >
                  <span className="w-5 h-5 rounded gradient-purple flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {ft.icon}
                  </span>
                  {ft.label}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddField(false)}>Cancel</Button>
              <Button
                className="gradient-purple text-white"
                onClick={() => addField(newFieldType)}
              >
                <Plus className="size-4 mr-1" /> Add {getFieldTypeLabel(newFieldType)} Field
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // ── List View ──

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Custom Forms
          </h1>
          <p className="text-sm text-muted-foreground">
            {forms.length} form{forms.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={openCreate} className="gradient-purple text-white gap-2">
          <Plus className="size-4" /> New Form
        </Button>
      </div>

      {/* Table */}
      <Card className="glass-card border-0">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="size-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No custom forms yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1 mb-4">
                Create flexible forms with custom fields for any purpose
              </p>
              <Button onClick={openCreate} variant="outline" size="sm" className="gap-2">
                <Plus className="size-3.5" /> Create your first form
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-xs">Form</TableHead>
                  <TableHead className="text-xs hidden md:table-cell">Fields</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">Submissions</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {forms.map((form) => {
                    const parsedFields = parseFields(form.fields)
                    const submissionCount = getSubmissionCount(form)
                    return (
                      <motion.tr
                        key={form.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-border/20 hover:bg-white/[0.02] transition-colors"
                      >
                        <TableCell>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate max-w-[200px]">{form.title}</p>
                            {form.description && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px] mt-0.5">
                                {form.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {parsedFields.slice(0, 3).map((f, i) => (
                              <Badge key={i} variant="outline" className="text-[9px] px-1.5 py-0">
                                {getFieldTypeLabel(f.type)}
                              </Badge>
                            ))}
                            {parsedFields.length > 3 && (
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                +{parsedFields.length - 3}
                              </Badge>
                            )}
                            {parsedFields.length === 0 && (
                              <span className="text-xs text-muted-foreground/50">No fields</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={form.published ? 'default' : 'secondary'}
                            className="text-[10px]"
                          >
                            {form.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => openSubmissions(form)}
                            disabled={submissionCount === 0}
                          >
                            <ClipboardList className="size-3" />
                            {submissionCount}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => openSubmissions(form)}
                              title="View Submissions"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => openEdit(form)}
                              title="Edit Form"
                            >
                              <Edit className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(form.id)}
                              title="Delete Form"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
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

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="glass-card-strong border-border/30">
          <DialogHeader>
            <DialogTitle>Delete Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this form? All submissions will also be deleted. This action cannot be undone.
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
