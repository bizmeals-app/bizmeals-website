'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Megaphone,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  FolderOpen,
  DollarSign,
  FileSearch,
  Users,
  Activity,
  Eye,
  FileText,
  Inbox,
  Building2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Stats {
  blogCount: number
  blogPublishedCount: number
  jobCount: number
  jobOpenCount: number
  trainingCount: number
  trainingPublishedCount: number
  updateCount: number
  updatePublishedCount: number
  portfolioCount: number
  portfolioPublishedCount: number
  pricingCount: number
  pricingPublishedCount: number
  caseStudyCount: number
  caseStudyPublishedCount: number
  formCount: number
  formPublishedCount: number
  submissionCount: number
  unreadSubmissionCount: number
  adminCount: number
  recentBlogs: Array<{
    id: string
    title: string
    category: string
    published: boolean
    createdAt: string
  }>
  recentJobs: Array<{
    id: string
    title: string
    department: string
    type: string
    status: string
    createdAt: string
  }>
  recentUpdates: Array<{
    id: string
    title: string
    type: string
    published: boolean
    createdAt: string
  }>
  recentPortfolios: Array<{
    id: string
    title: string
    client: string
    category: string
    published: boolean
    createdAt: string
  }>
  recentCaseStudies: Array<{
    id: string
    title: string
    client: string
    industry: string
    published: boolean
    createdAt: string
  }>
}

const statCards = [
  { key: 'blogCount' as const, publishedKey: 'blogPublishedCount' as const, label: 'Blogs', icon: BookOpen, color: 'from-purple-500 to-blue-500', href: '/admin/blogs' },
  { key: 'portfolioCount' as const, publishedKey: 'portfolioPublishedCount' as const, label: 'Portfolios', icon: FolderOpen, color: 'from-amber-500 to-orange-500', href: '/admin/portfolios' },
  { key: 'caseStudyCount' as const, publishedKey: 'caseStudyPublishedCount' as const, label: 'Case Studies', icon: FileSearch, color: 'from-teal-500 to-emerald-500', href: '/admin/case-studies' },
  { key: 'pricingCount' as const, publishedKey: 'pricingPublishedCount' as const, label: 'Pricing Plans', icon: DollarSign, color: 'from-rose-500 to-pink-500', href: '/admin/pricing' },
  { key: 'jobCount' as const, publishedKey: 'jobOpenCount' as const, label: 'Jobs', icon: Briefcase, color: 'from-blue-500 to-cyan-500', href: '/admin/jobs' },
  { key: 'trainingCount' as const, publishedKey: 'trainingPublishedCount' as const, label: 'Training', icon: GraduationCap, color: 'from-cyan-500 to-teal-500', href: '/admin/training' },
  { key: 'updateCount' as const, publishedKey: 'updatePublishedCount' as const, label: 'Updates', icon: Megaphone, color: 'from-violet-500 to-purple-500', href: '/admin/updates' },
  { key: 'formCount' as const, publishedKey: 'formPublishedCount' as const, label: 'Custom Forms', icon: FileText, color: 'from-orange-500 to-amber-500', href: '/admin/forms' },
  { key: 'adminCount' as const, publishedKey: null, label: 'Team', icon: Users, color: 'from-indigo-500 to-blue-500', href: '/admin/users' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-xl glass-card animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 rounded-xl glass-card animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 rounded-xl glass-card animate-pulse" />
          <div className="h-64 rounded-xl glass-card animate-pulse" />
        </div>
      </div>
    )
  }

  const totalContent = stats
    ? stats.blogCount + stats.portfolioCount + stats.caseStudyCount + stats.pricingCount + stats.jobCount + stats.trainingCount + stats.updateCount + stats.formCount
    : 0
  const totalPublished = stats
    ? stats.blogPublishedCount + stats.portfolioPublishedCount + stats.caseStudyPublishedCount + stats.pricingPublishedCount + stats.jobOpenCount + stats.trainingPublishedCount + stats.updatePublishedCount + stats.formPublishedCount
    : 0
  const publishRate = totalContent > 0 ? Math.round((totalPublished / totalContent) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back. Here&apos;s an overview of your content.</p>
        </div>
      </div>

      {/* Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="glass-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center shrink-0">
              <Activity className="size-6 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Total Content</p>
              <p className="text-2xl font-bold gradient-text-purple">{totalContent}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
              <Eye className="size-6 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Published</p>
              <p className="text-2xl font-bold text-emerald-400">{totalPublished}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
              <Inbox className="size-6 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Form Submissions</p>
              <p className="text-2xl font-bold text-amber-400">{stats?.submissionCount ?? 0}</p>
              {stats && stats.unreadSubmissionCount > 0 && (
                <p className="text-[10px] text-amber-400 font-medium">{stats.unreadSubmissionCount} unread</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Publish Rate</p>
              <span className="text-sm font-bold text-foreground">{publishRate}%</span>
            </div>
            <Progress value={publishRate} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link href={card.href}>
              <Card className="glass-card hover:glass-card-strong transition-all duration-300 card-hover cursor-pointer group border-0">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{card.label}</p>
                      <p className="text-3xl font-bold mt-1 gradient-text-purple">
                        {stats?.[card.key] ?? 0}
                      </p>
                      {card.publishedKey && stats && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {stats[card.publishedKey]} published
                        </p>
                      )}
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                      <card.icon className="size-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <TrendingUp className="size-3" />
                    <span>Manage</span>
                    <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="size-4 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blogs">
              <Button size="sm" className="gradient-purple text-white gap-1.5">
                <Plus className="size-3" /> New Blog
              </Button>
            </Link>
            <Link href="/admin/portfolios">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Portfolio
              </Button>
            </Link>
            <Link href="/admin/case-studies">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Case Study
              </Button>
            </Link>
            <Link href="/admin/pricing">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Pricing Plan
              </Button>
            </Link>
            <Link href="/admin/jobs">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Job
              </Button>
            </Link>
            <Link href="/admin/training">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Course
              </Button>
            </Link>
            <Link href="/admin/forms">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Plus className="size-3" /> New Form
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - All Content Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Portfolios */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FolderOpen className="size-4 text-amber-400" />
                Recent Portfolios
              </CardTitle>
              <Link href="/admin/portfolios">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.recentPortfolios && stats.recentPortfolios.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentPortfolios.slice(0, 5).map((portfolio) => (
                  <div key={portfolio.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{portfolio.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{portfolio.client || portfolio.category}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="size-2.5" />
                          {new Date(portfolio.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant={portfolio.published ? 'default' : 'secondary'} className="text-[10px] shrink-0 ml-2">
                      {portfolio.published ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No portfolios yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Case Studies */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileSearch className="size-4 text-teal-400" />
                Recent Case Studies
              </CardTitle>
              <Link href="/admin/case-studies">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.recentCaseStudies && stats.recentCaseStudies.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentCaseStudies.slice(0, 5).map((cs) => (
                  <div key={cs.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{cs.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{cs.client || cs.industry}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Building2 className="size-2.5" />
                          {cs.industry || 'General'}
                        </span>
                      </div>
                    </div>
                    <Badge variant={cs.published ? 'default' : 'secondary'} className="text-[10px] shrink-0 ml-2">
                      {cs.published ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No case studies yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Blogs */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />
                Recent Blogs
              </CardTitle>
              <Link href="/admin/blogs">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.recentBlogs && stats.recentBlogs.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentBlogs.slice(0, 5).map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{blog.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{blog.category}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="size-2.5" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant={blog.published ? 'default' : 'secondary'} className="text-[10px] shrink-0 ml-2">
                      {blog.published ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No blogs yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="size-4 text-blue-400" />
                Recent Jobs
              </CardTitle>
              <Link href="/admin/jobs">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.recentJobs && stats.recentJobs.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{job.department || 'General'}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span className="text-[10px] text-muted-foreground">{job.type}</span>
                      </div>
                    </div>
                    <Badge
                      variant={job.status === 'open' ? 'default' : job.status === 'closed' ? 'destructive' : 'secondary'}
                      className="text-[10px] shrink-0 ml-2 capitalize"
                    >
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No jobs yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
