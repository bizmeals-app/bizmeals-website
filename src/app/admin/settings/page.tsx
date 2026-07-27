'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Loader2,
  Save,
  Globe,
  Phone,
  Share2,
  Search,
  Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

interface Setting {
  id: string
  key: string
  value: string
  type: string
  label: string
  group: string
}

const groupConfig: Record<string, { label: string; icon: React.ElementType; description: string }> = {
  general: { label: 'General', icon: Globe, description: 'Site-wide settings' },
  contact: { label: 'Contact', icon: Phone, description: 'Contact information' },
  social: { label: 'Social Media', icon: Share2, description: 'Social media links' },
  seo: { label: 'SEO', icon: Search, description: 'Search engine optimization' },
  appearance: { label: 'Appearance', icon: Palette, description: 'Visual customization' },
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      setSettings(data.settings || [])
    } catch (err) {
      console.error('Failed to fetch settings:', err)
    } finally {
      setLoading(false)
    }
  }

  function updateValue(key: string, value: string) {
    setEditedValues((prev) => ({ ...prev, [key]: value }))
  }

  function getValue(setting: Setting): string {
    return editedValues[setting.key] !== undefined ? editedValues[setting.key] : setting.value
  }

  async function handleSave() {
    setSaving(true)
    const updates = Object.entries(editedValues).map(([key, value]) => ({ key, value }))
    if (updates.length === 0) {
      toast.info('No changes to save')
      setSaving(false)
      return
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error()
      toast.success('Settings saved successfully')
      setEditedValues({})
      fetchSettings()
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  // Group settings
  const groups: Record<string, Setting[]> = {}
  settings.forEach((s) => {
    if (!groups[s.group]) groups[s.group] = []
    groups[s.group].push(s)
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Settings className="size-5 text-muted-foreground" />
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">Manage your site configuration</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving || Object.keys(editedValues).length === 0}
          className="gradient-purple text-white gap-2"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Changes
          {Object.keys(editedValues).length > 0 && (
            <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
              {Object.keys(editedValues).length}
            </span>
          )}
        </Button>
      </div>

      {Object.keys(groups).length === 0 ? (
        <Card className="glass-card border-0">
          <CardContent className="p-8 text-center">
            <Settings className="size-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No settings configured yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Click &quot;Seed Demo Data&quot; on the dashboard to add default settings.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups).map(([group, groupSettings], gi) => {
            const config = groupConfig[group] || { label: group, icon: Settings, description: '' }
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.1 }}
              >
                <Card className="glass-card border-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                        <config.icon className="size-4 text-white" />
                      </div>
                      <div>
                        <span>{config.label}</span>
                        {config.description && (
                          <p className="text-xs font-normal text-muted-foreground">{config.description}</p>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {groupSettings.map((setting, si) => (
                      <div key={setting.id}>
                        {si > 0 && <Separator className="mb-4 opacity-30" />}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-4 items-start">
                          <div>
                            <Label className="text-sm font-medium">{setting.label}</Label>
                            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{setting.key}</p>
                          </div>
                          <div>
                            {setting.type === 'json' ? (
                              <Textarea
                                value={getValue(setting)}
                                onChange={(e) => updateValue(setting.key, e.target.value)}
                                rows={4}
                                className="font-mono text-xs"
                              />
                            ) : setting.type === 'boolean' ? (
                              <Input
                                value={getValue(setting)}
                                onChange={(e) => updateValue(setting.key, e.target.value)}
                                placeholder="true or false"
                              />
                            ) : (
                              <Input
                                value={getValue(setting)}
                                onChange={(e) => updateValue(setting.key, e.target.value)}
                                placeholder={`Enter ${setting.label.toLowerCase()}...`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
