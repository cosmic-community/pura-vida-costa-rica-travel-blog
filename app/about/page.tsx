import { cosmic } from '@/lib/cosmic'
import { AboutPage } from '@/types'
import { Metadata } from 'next'
import AuthorCard from '@/components/AuthorCard'
import StatCard from '@/components/StatCard'

async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-page' })
      .depth(1)
    
    return response.object as AboutPage
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage()
  
  return {
    title: aboutPage?.metadata?.page_title || 'About Us - Pura Vida Costa Rica',
    description: aboutPage?.metadata?.intro_text || 'Learn about our mission to share the authentic spirit of Costa Rica through expert travel guides and adventures.',
    openGraph: {
      title: aboutPage?.metadata?.page_title || 'About Us - Pura Vida Costa Rica',
      description: aboutPage?.metadata?.intro_text || 'Learn about our mission to share the authentic spirit of Costa Rica.',
      images: aboutPage?.metadata?.hero_image ? [
        {
          url: `${aboutPage.metadata.hero_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: aboutPage.metadata?.page_title || 'About Us',
        }
      ] : [],
    },
  }
}

export default async function AboutPage() {
  const aboutPage = await getAboutPage()

  if (!aboutPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">About page not found</h1>
          <p className="text-gray-600">The about page content is not available.</p>
        </div>
      </div>
    )
  }

  const { metadata } = aboutPage

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-jungle-600 to-ocean-600">
        {metadata?.hero_image && (
          <div className="absolute inset-0 z-0">
            <img
              src={`${metadata.hero_image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
              alt={metadata?.page_title || 'About Us'}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {metadata?.page_title || 'About Us'}
          </h1>
          
          {metadata?.intro_text && (
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {metadata.intro_text}
            </p>
          )}
        </div>
      </section>

      {/* Mission Statement */}
      {metadata?.mission_statement && (
        <section className="py-16 bg-jungle-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "{metadata.mission_statement}"
            </p>
          </div>
        </section>
      )}

      {/* Our Story */}
      {metadata?.our_story && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: metadata.our_story }}
            />
          </div>
        </section>
      )}

      {/* Statistics */}
      {metadata?.statistics && (
        <section className="py-16 bg-gradient-to-r from-ocean-50 to-jungle-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {metadata.statistics.years_exploring && (
                <StatCard
                  number={metadata.statistics.years_exploring}
                  label="Years Exploring"
                  icon="🗓️"
                />
              )}
              {metadata.statistics.destinations_covered && (
                <StatCard
                  number={metadata.statistics.destinations_covered}
                  label="Destinations Covered"
                  icon="📍"
                />
              )}
              {metadata.statistics.articles_published && (
                <StatCard
                  number={metadata.statistics.articles_published}
                  label="Articles Published"
                  icon="📚"
                />
              )}
              {metadata.statistics.national_parks_visited && (
                <StatCard
                  number={metadata.statistics.national_parks_visited}
                  label="National Parks Visited"
                  icon="🌳"
                />
              )}
              {metadata.statistics.wildlife_species_photographed && (
                <StatCard
                  number={metadata.statistics.wildlife_species_photographed}
                  label="Wildlife Species Photographed"
                  icon="📸"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Authors */}
      {metadata?.featured_authors && metadata.featured_authors.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Expert Authors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {metadata.featured_authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact & Social */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Connect With Us</h2>
          
          {metadata?.contact_email && (
            <div className="mb-8">
              <p className="text-lg text-gray-600 mb-4">Have questions or want to share your Costa Rica story?</p>
              <a 
                href={`mailto:${metadata.contact_email}`}
                className="btn-primary text-lg"
              >
                Get in Touch
              </a>
            </div>
          )}

          {metadata?.social_media_links && (
            <div className="flex justify-center gap-6">
              {metadata.social_media_links.instagram && (
                <a
                  href={metadata.social_media_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-jungle-600 transition-colors"
                  aria-label="Instagram"
                >
                  📷
                </a>
              )}
              {metadata.social_media_links.facebook && (
                <a
                  href={metadata.social_media_links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-jungle-600 transition-colors"
                  aria-label="Facebook"
                >
                  📘
                </a>
              )}
              {metadata.social_media_links.twitter && (
                <a
                  href={metadata.social_media_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-jungle-600 transition-colors"
                  aria-label="Twitter"
                >
                  🐦
                </a>
              )}
              {metadata.social_media_links.youtube && (
                <a
                  href={metadata.social_media_links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-jungle-600 transition-colors"
                  aria-label="YouTube"
                >
                  📺
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {metadata?.cta_text && metadata?.cta_link && (
        <section className="py-16 bg-gradient-to-r from-jungle-600 to-ocean-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready for Your Adventure?</h2>
            <a 
              href={metadata.cta_link}
              className="inline-block bg-white text-jungle-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
            >
              {metadata.cta_text}
            </a>
          </div>
        </section>
      )}
    </div>
  )
}