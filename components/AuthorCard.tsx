import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
        )}
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {author.metadata?.name || author.title}
          </h3>
          
          {author.metadata?.bio && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
          
          {/* Contact Info */}
          {author.metadata?.email && (
            <div className="mb-3">
              <a
                href={`mailto:${author.metadata.email}`}
                className="text-jungle-600 hover:text-jungle-700 font-medium"
              >
                📧 {author.metadata.email}
              </a>
            </div>
          )}
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {author.metadata?.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-jungle-600 hover:text-jungle-700 text-sm flex items-center gap-1"
              >
                🌐 Website
              </a>
            )}
            {author.metadata?.instagram && (
              <a
                href={`https://instagram.com/${author.metadata.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-jungle-600 hover:text-jungle-700 text-sm flex items-center gap-1"
              >
                📷 Instagram
              </a>
            )}
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-jungle-600 hover:text-jungle-700 text-sm flex items-center gap-1"
              >
                🐦 Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}