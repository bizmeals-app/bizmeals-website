'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight, Tag, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AnimatedSection, { SectionBadge, StaggerContainer, StaggerItem } from './animated-section'

const categories = ['All', 'Digital Marketing', 'Business Growth', 'Startup Insights']

const categoryColors: Record<string, string> = {
  'Digital Marketing': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Business Growth': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  'Startup Insights': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
}

const categoryGradients: Record<string, string> = {
  'Digital Marketing': 'from-orange-500/40 via-amber-500/25 to-orange-600/15',
  'Business Growth': 'from-teal-500/40 via-cyan-500/25 to-teal-600/15',
  'Startup Insights': 'from-amber-500/40 via-orange-500/25 to-amber-600/15',
}

const categoryIconGradients: Record<string, string> = {
  'Digital Marketing': 'gradient-orange',
  'Business Growth': 'gradient-teal',
  'Startup Insights': 'from-amber-500 to-orange-500',
}

interface BlogPost {
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
}

const blogPosts: BlogPost[] = [
  {
    title: "Why Your Google Ads Are Burning Money",
    category: "Digital Marketing",
    date: "Feb 2025",
    readTime: "8 min",
    excerpt: "Most businesses waste 40% of their ad budget on poorly optimized campaigns. Here's the systematic fix that stops the bleeding and turns ads into a profit engine.",
  },
  {
    title: "The \u20B90 to \u20B91Cr Revenue Playbook for Indian Startups",
    category: "Startup Insights",
    date: "Jan 2025",
    readTime: "12 min",
    excerpt: "A step-by-step framework from working with 20+ startups on their journey to first crore.",
  },
  {
    title: "Local SEO in 2025: Complete Guide for Indian Businesses",
    category: "Digital Marketing",
    date: "Jan 2025",
    readTime: "10 min",
    excerpt: "Google My Business, local citations, and hyperlocal strategies that actually work in Tier-1 and Tier-2 cities.",
  },
  {
    title: "Why Most Business Strategies Fail Before Execution",
    category: "Business Growth",
    date: "Dec 2024",
    readTime: "7 min",
    excerpt: "The gap between strategy and execution is where businesses lose millions. Here's how to bridge it.",
  },
  {
    title: "Building a Freelancer-Powered Growth Engine",
    category: "Business Growth",
    date: "Dec 2024",
    readTime: "9 min",
    excerpt: "How the network-based execution model delivers better results at lower cost than traditional agencies.",
  },
  {
    title: "From Idea to Launch: A Startup's First 90 Days",
    category: "Startup Insights",
    date: "Nov 2024",
    readTime: "11 min",
    excerpt: "The critical first 90 days determine whether a startup survives. Our battle-tested framework for getting it right.",
  },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory)

  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="mesh-gradient-dark absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <SectionBadge variant="muted">INSIGHTS</SectionBadge>
          <h2 className="text-4xl md:text-6xl font-bold mt-5 mb-4">
            <span className="gradient-text">Insights &amp; Ideas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Actionable growth strategies, startup wisdom, and marketing playbooks from our team.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'gradient-orange text-white shadow-lg shadow-orange-500/25'
                  : 'glass-card text-muted-foreground hover:text-foreground hover:border-white/20'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Blog Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {featuredPost && (
              /* ============ FEATURED ARTICLE ============ */
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card rounded-3xl overflow-hidden group mb-10 hover:border-orange-500/30 transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Area - Left */}
                  <div className={`relative min-h-[300px] lg:min-h-[420px] bg-gradient-to-br ${categoryGradients[featuredPost.category]} overflow-hidden`}>
                    <div className="absolute inset-0 dot-pattern opacity-30" />
                    <div className="absolute inset-0 shimmer" />
                    {/* Large decorative icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-28 h-28 rounded-3xl ${categoryIconGradients[featuredPost.category]} flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500`}>
                        <BookOpen className="w-14 h-14 text-white" />
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-6 left-6">
                      <Badge className={`${categoryColors[featuredPost.category]} border text-xs font-semibold`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {featuredPost.category}
                      </Badge>
                    </div>
                    {/* Featured label */}
                    <div className="absolute top-6 right-6">
                      <div className="glass-card-strong rounded-full px-4 py-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
                        Featured
                      </div>
                    </div>
                    {/* Decorative floating elements */}
                    <div className="absolute bottom-6 left-6 w-20 h-20 morph-blob bg-orange-500/10 blur-xl float-animation" />
                    <div className="absolute top-1/3 right-10 w-16 h-16 morph-blob bg-teal-500/10 blur-xl float-delayed" />
                  </div>

                  {/* Content - Right */}
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        {featuredPost.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-teal-400" />
                        {featuredPost.readTime} read
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-muted-foreground text-base leading-relaxed mb-8">
                      {featuredPost.excerpt}
                    </p>

                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-primary font-semibold group/link"
                    >
                      Read More
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.article>
            )}

            {/* ============ REGULAR ARTICLES GRID ============ */}
            {regularPosts.length > 0 && (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <StaggerItem key={`${post.title}-${index}`}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:border-orange-500/30 h-full flex flex-col"
                    >
                      {/* Image Area */}
                      <div className={`relative h-52 bg-gradient-to-br ${categoryGradients[post.category]} overflow-hidden`}>
                        <div className="absolute inset-0 dot-pattern opacity-25" />
                        <div className="absolute inset-0 shimmer" />

                        {/* Category badge overlay */}
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categoryColors[post.category]} border text-xs font-semibold`}>
                            <Tag className="w-3 h-3 mr-1" />
                            {post.category}
                          </Badge>
                        </div>

                        {/* Read More overlay on hover */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1 }}
                            className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center shadow-lg shadow-orange-500/30"
                          >
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read More
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* No results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No articles found in this category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary hover:text-primary transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
