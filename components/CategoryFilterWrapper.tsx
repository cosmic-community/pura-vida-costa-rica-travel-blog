'use client'

import { useState } from 'react'
import { Category, Post } from '@/types'
import CategoryFilter from './CategoryFilter'
import PostCard from './PostCard'

interface CategoryFilterWrapperProps {
  categories: Category[]
  posts: Post[]
}

export default function CategoryFilterWrapper({ categories, posts }: CategoryFilterWrapperProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = activeCategory 
    ? posts.filter(post => post.metadata?.category?.id === activeCategory)
    : posts

  return (
    <div>
      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}