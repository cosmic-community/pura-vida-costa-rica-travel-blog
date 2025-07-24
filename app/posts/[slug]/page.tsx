// app/posts/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Post } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts',
        slug: slug
      })
      .depth(1)
    
    return response.object as Post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} - Pura Vida Costa Rica`,
    description: post.metadata?.excerpt || `Read about ${post.title} on Pura Vida Costa Rica`,
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || `Read about ${post.title} on Pura Vida Costa Rica`,
      images: post.metadata?.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { metadata } = post

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <header className="relative py-20 lg:py-32 bg-gradient-to-br from-jungle-600 to-ocean-600">
        {metadata?.featured_image && (
          <div className="absolute inset-0 z-0">
            <img
              src={`${metadata.featured_image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Category Badge */}
            {metadata?.category && (
              <div className="mb-6">
                <span 
                  className="category-badge text-white"
                  style={{ backgroundColor: metadata.category.metadata?.color || '#16a34a' }}
                >
                  {metadata.category.metadata?.icon} {metadata.category.metadata?.name}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {post.title}
            </h1>
            
            {metadata?.excerpt && (
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                {metadata.excerpt}
              </p>
            )}
            
            {/* Author and Meta Info */}
            <div className="flex items-center justify-center gap-6 text-white/80">
              {metadata?.author && (
                <div className="flex items-center gap-3">
                  {metadata.author.metadata?.profile_photo && (
                    <img
                      src={`${metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={metadata.author.metadata?.name || metadata.author.title}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium">
                      By {metadata.author.metadata?.name || metadata.author.title}
                    </p>
                  </div>
                </div>
              )}
              
              {metadata?.read_time && (
                <div className="flex items-center gap-2">
                  <span>📖</span>
                  <span>{metadata.read_time} min read</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {metadata?.content && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt, ...props }) => (
                    <img
                      src={src?.includes('?') ? src : `${src}?w=800&auto=format,compress`}
                      alt={alt}
                      className="w-full rounded-lg shadow-md"
                      {...props}
                    />
                  ),
                }}
              >
                {metadata.content}
              </ReactMarkdown>
            </div>
          )}
          
          {/* Tags */}
          {metadata?.tags && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-jungle-100 text-jungle-800 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Author Bio */}
      {metadata?.author && metadata.author.metadata?.bio && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
              <div className="flex items-start gap-6">
                {metadata.author.metadata?.profile_photo && (
                  <img
                    src={`${metadata.author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={metadata.author.metadata?.name || metadata.author.title}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {metadata.author.metadata?.name || metadata.author.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {metadata.author.metadata.bio}
                  </p>
                  
                  {/* Author Social Links */}
                  <div className="flex gap-4">
                    {metadata.author.metadata?.website && (
                      <a
                        href={metadata.author.metadata.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-jungle-600 hover:text-jungle-700"
                      >
                        🌐 Website
                      </a>
                    )}
                    {metadata.author.metadata?.instagram && (
                      <a
                        href={`https://instagram.com/${metadata.author.metadata.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-jungle-600 hover:text-jungle-700"
                      >
                        📷 Instagram
                      </a>
                    )}
                    {metadata.author.metadata?.twitter && (
                      <a
                        href={`https://twitter.com/${metadata.author.metadata.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-jungle-600 hover:text-jungle-700"
                      >
                        🐦 Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}