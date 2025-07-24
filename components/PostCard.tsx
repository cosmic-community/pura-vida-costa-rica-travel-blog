import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="card group">
      <a href={`/posts/${post.slug}`} className="block h-full">
        {post.metadata?.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {post.metadata?.category && (
              <span 
                className="category-badge text-white text-xs"
                style={{ backgroundColor: post.metadata.category.metadata?.color || '#16a34a' }}
              >
                {post.metadata.category.metadata?.icon} {post.metadata.category.metadata?.name}
              </span>
            )}
            {post.metadata?.read_time && (
              <span className="text-sm text-gray-500">
                {post.metadata.read_time} min read
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jungle-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {post.metadata?.author && (
              <div className="flex items-center gap-3">
                {post.metadata.author.metadata?.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </p>
                </div>
              </div>
            )}
            
            <span className="text-jungle-600 hover:text-jungle-700 font-medium text-sm transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}