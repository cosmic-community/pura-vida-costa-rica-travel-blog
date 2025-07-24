export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-jungle-600 via-ocean-600 to-sunset-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Pura Vida
            </span>
            Experience
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12">
            Discover the authentic spirit of Costa Rica through expert travel guides, 
            adventure stories, and cultural insights. From pristine beaches to misty cloud forests, 
            we'll show you the real Costa Rica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/posts"
              className="bg-white text-jungle-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Adventures 🏔️
            </a>
            <a
              href="/about"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-jungle-600 transition-colors"
            >
              Our Story 📖
            </a>
          </div>

          {/* Feature Icons */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-2">🏖️</div>
              <div className="text-white/80 text-sm font-medium">Beautiful Beaches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌿</div>
              <div className="text-white/80 text-sm font-medium">Jungle Adventures</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🦋</div>
              <div className="text-white/80 text-sm font-medium">Wildlife Encounters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏄‍♂️</div>
              <div className="text-white/80 text-sm font-medium">Surf Culture</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}