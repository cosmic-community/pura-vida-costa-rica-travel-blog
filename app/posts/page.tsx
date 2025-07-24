import { cosmic } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = {
  title: 'All Posts - Pura Vida Costa Rica',
  description: 'Browse all our Costa Rica travel guides, adventure stories, and cultural insights.',
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Adventures</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of Costa Rica travel guides, adventure stories, and cultural insights.
          </p>
        </div>

        <CategoryFilter categories={categories} />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts found</h2>
            <p className="text-gray-600">Check back soon for new adventures!</p>
          </div>
        )}
      </div>
    </div>
  )
}