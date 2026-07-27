'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type PageName = 'home' | 'how-it-works' | 'services' | 'portfolio' | 'innovation-lab' | 'pricing' | 'training' | 'blog' | 'about' | 'founder' | 'contact' | 'career' | 'privacy-policy' | 'terms-of-service' | 'refund-policy' | 'cookie-policy' | 'disclaimer'

interface PageContextType {
  currentPage: PageName
  setCurrentPage: (page: PageName) => void
}

const PageContext = createContext<PageContextType>({
  currentPage: 'home',
  setCurrentPage: () => {},
})

export function PageProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPageState] = useState<PageName>('home')

  const setCurrentPage = useCallback((page: PageName) => {
    setCurrentPageState(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  return useContext(PageContext)
}
