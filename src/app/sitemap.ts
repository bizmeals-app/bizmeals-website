import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

/**
 * BizMeals — sitemap.xml
 * Lists every real, crawlable route on the site.
 */
const ROUTES = [
  '',
  '/services',
  '/how-it-works',
  '/portfolio',
  '/about',
  '/founder',
  '/pricing',
  '/training',
  '/career',
  '/blog',
  '/innovation-lab',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/cookie-policy',
  '/disclaimer',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((path) => ({
    url: `${siteConfig.seo.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/contact' || path === '/services' ? 0.9 : 0.7,
  }))
}
