'use client'

import { Post, Category } from '@/types'
import { useState, useMemo } from 'react'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

interface PostsClientProps {
  posts: Post[]
  categories: Category[]
}

export default function PostsClient({ posts, categories }: PostsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!activeCategory) {
      return posts
    }
    
    return posts.filter(post => post.metadata?.category?.id === activeCategory)
  }, [posts, activeCategory])

  return (
    <>
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {activeCategory ? 'No posts found in this category' : 'No posts found'}
          </h2>
          <p className="text-gray-600">
            {activeCategory ? 'Try selecting a different category or view all posts.' : 'Check back soon for new adventures!'}
          </p>
        </div>
      )}
    </>
  )
}