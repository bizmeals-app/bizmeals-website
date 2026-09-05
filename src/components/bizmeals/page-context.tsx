'use client'

import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * BizMeals — page context (router-backed)
 *
 * The site now uses real Next.js routes (/services, /about, /contact, …).
 * `currentPage` is derived from the current URL pathname, and `setCurrentPage`
 * navigates to the corresponding route. Existing call sites that use
 * `setCurrentPage('services')` keep working but now produce real crawlable
 * URLs like https://bizmeals.in/services.
 */
export type PageName =
  | 'home'
  | 'how-it-works'
  | 'services'
  | 'portfolio'
  | 'innovation-lab'
  | 'pricing'
  | 'training'
  | 'blog'
  | 'about'
  | 'founder'
  | 'contact'
  | 'career'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'refund-policy'
  | 'cookie-policy'
  | 'disclaimer'

const VALID_PAGES: PageName[] = [
  'home',
  'how-it-works',
  'services',
  'portfolio',
  'innovation-lab',
  'pricing',
  'training',
  'blog',
  'about',
  'founder',
  'contact',
  'career',
  'privacy-policy',
  'terms-of-service',
  'refund-policy',
  'cookie-policy',
  'disclaimer',
]

function pathToPage(pathname: string): PageName {
  const segment = pathname.replace(/^\//, '').split('/')[0] || 'home'
  return (VALID_PAGES as string[]).includes(segment) ? (segment as PageName) : 'home'
}

interface PageContextType {
  currentPage: PageName
  setCurrentPage: (page: PageName) => void
}

const PageContext = createContext<PageContextType>({
  currentPage: 'home',
  setCurrentPage: () => {},
})

export function PageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const currentPage = useMemo(() => pathToPage(pathname || '/'), [pathname])

  const setCurrentPage = useCallback(
    (page: PageName) => {
      const href = page === 'home' ? '/' : `/${page}`
      router.push(href)
      // Scroll to top on navigation, mirroring the previous SPA behavior.
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    },
    [router],
  )

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  return useContext(PageContext)
}
