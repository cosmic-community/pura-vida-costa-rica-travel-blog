import { cosmic } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import CategoryFilterWrapper from '@/components/CategoryFilterWrapper'

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

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)

  return (
    <div>
      <Hero />
      
      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-gradient-to-br from-jungle-50 to-ocean-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Adventure</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dive into our latest Costa Rica adventure and discover what makes this country truly magical.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="card overflow-hidden">
                {featuredPost.metadata?.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${featuredPost.metadata.featured_image.imgix_url}?w=1000&h=600&fit=crop&auto=format,compress`}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    {featuredPost.metadata?.category && (
                      <span 
                        className="category-badge text-white"
                        style={{ backgroundColor: featuredPost.metadata.category.metadata?.color || '#16a34a' }}
                      >
                        {featuredPost.metadata.category.metadata?.icon} {featuredPost.metadata.category.metadata?.name}
                      </span>
                    )}
                    {featuredPost.metadata?.read_time && (
                      <span className="text-sm text-gray-500">
                        {featuredPost.metadata.read_time} min read
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-jungle-600 transition-colors">
                    <a href={`/posts/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </a>
                  </h3>
                  
                  {featuredPost.metadata?.excerpt && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.metadata.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {featuredPost.metadata?.author && (
                      <div className="flex items-center gap-3">
                        {featuredPost.metadata.author.metadata?.profile_photo && (
                          <img
                            src={`${featuredPost.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                            alt={featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <a 
                      href={`/posts/${featuredPost.slug}`}
                      className="btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Adventures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our recent discoveries and travel insights from across Costa Rica.
            </p>
          </div>

          <CategoryFilterWrapper categories={categories} posts={recentPosts} />

          <div className="text-center mt-12">
            <a href="/posts" className="btn-secondary">
              View All Posts
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}