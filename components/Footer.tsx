import { COSMIC_BUCKET_SLUG } from '@/lib/cosmic'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl">🌿</span>
              <span className="ml-2 text-xl font-bold">Pura Vida Costa Rica</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover the authentic spirit of Costa Rica through expert travel guides, 
              adventure stories, and cultural insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/posts" className="text-gray-300 hover:text-white transition-colors">
                  All Posts
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/puravidacostarica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://facebook.com/puravidacostarica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://twitter.com/puravidacr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="https://youtube.com/puravidacostarica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-2xl"
                aria-label="YouTube"
              >
                📺
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © {currentYear} Pura Vida Costa Rica. All rights reserved.
          </div>
          
          {/* Built with Cosmic button */}
          <a
            href={`https://www.cosmicjs.com?utm_source=bucket_${COSMIC_BUCKET_SLUG}&utm_medium=referral&utm_campaign=app_footer&utm_content=built_with_cosmic`}
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button"
          >
            <img 
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
              alt="Cosmic Logo" 
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            Built with Cosmic
          </a>
        </div>
      </div>
    </footer>
  )
}