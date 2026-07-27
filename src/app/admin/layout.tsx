'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  GraduationCap,
  Megaphone,
  FolderOpen,
  DollarSign,
  FileSearch,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Toaster } from 'sonner'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/portfolios', label: 'Portfolios', icon: FolderOpen },
  { href: '/admin/case-studies', label: 'Case Studies', icon: FileSearch },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/training', label: 'Training', icon: GraduationCap },
  { href: '/admin/updates', label: 'Updates', icon: Megaphone },
  { href: '/admin/forms', label: 'Forms', icon: FileText },
  { href: '/admin/users', label: 'Team', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

const bottomNavItems = [
  { href: '/', label: 'Back to Site', icon: ExternalLink, external: true },
  { href: '#logout', label: 'Logout', icon: LogOut, action: 'logout' as const },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/auth/session')
      const data = await res.json()
      if (data.authenticated && data.user) {
        setUser(data.user)
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } catch {
      if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/admin/login')
  }

  // Login page has its own layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading admin...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  function SidebarContent({ mobile = false }: { mobile?: boolean }) {
    return (
      <div className="flex flex-col h-full">
        {/* Logo / Brand */}
        <div className="p-4 pb-2">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg gradient-purple flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <AnimatePresence mode="wait">
              {(!collapsed || mobile) && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="gradient-text-purple font-bold text-lg">BizMeals</span>
                  <span className="text-muted-foreground text-xs ml-1.5">Admin</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <Separator className="mx-4 w-auto opacity-50" />

        {/* Main Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className={`text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 mb-2 ${collapsed && !mobile ? 'text-center' : ''}`}>
            {collapsed && !mobile ? '•••' : 'Navigation'}
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => mobile && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full gradient-purple"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={`size-[18px] shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-foreground transition-colors'}`} />
                <AnimatePresence mode="wait">
                  {(!collapsed || mobile) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        <Separator className="mx-4 w-auto opacity-50" />

        {/* Bottom Nav */}
        <div className="p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.action === 'logout') {
                  handleLogout()
                } else if (item.external) {
                  window.location.href = item.href
                }
                if (mobile) setMobileOpen(false)
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200 w-full"
            >
              <item.icon className="size-[18px] shrink-0" />
              <AnimatePresence mode="wait">
                {(!collapsed || mobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="p-3">
          <div className={`flex items-center gap-3 p-2.5 rounded-lg glass ${collapsed && !mobile ? 'justify-center' : ''}`}>
            <Avatar className="size-8">
              <AvatarFallback className="gradient-purple text-white text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence mode="wait">
              {(!collapsed || mobile) && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user.email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-border/50 glass-strong transition-all duration-300 shrink-0 ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <SidebarContent />

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 -right-3 z-10 w-6 h-6 rounded-full bg-border hover:bg-primary/80 flex items-center justify-center transition-colors hidden lg:flex"
        >
          <ChevronRight className={`size-3 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border/50 glass-strong flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border/50">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SidebarContent mobile />
              </SheetContent>
            </Sheet>

            {/* Breadcrumb / Page Title */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Admin</span>
              <ChevronRight className="size-3 text-muted-foreground/50" />
              <span className="text-foreground font-medium capitalize">
                {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop()?.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarFallback className="gradient-purple text-white text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}
