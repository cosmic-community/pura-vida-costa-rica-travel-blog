import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pura Vida Costa Rica - Authentic Travel Experiences',
  description: 'Discover the authentic spirit of Costa Rica through expert travel guides, adventure stories, and cultural insights. Your guide to the pure life.',
  keywords: 'Costa Rica, travel, Pura Vida, adventure, beaches, wildlife, culture, guide',
  authors: [{ name: 'Pura Vida Costa Rica Team' }],
  openGraph: {
    title: 'Pura Vida Costa Rica - Authentic Travel Experiences',
    description: 'Discover the authentic spirit of Costa Rica through expert travel guides, adventure stories, and cultural insights.',
    type: 'website',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/a69e3d90-68ab-11f0-a051-23c10f41277a-photo-1518105779142-d975f22f1b0a-1753374687899.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Pura Vida Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pura Vida Costa Rica - Authentic Travel Experiences',
    description: 'Discover the authentic spirit of Costa Rica through expert travel guides, adventure stories, and cultural insights.',
    images: ['https://imgix.cosmicjs.com/a69e3d90-68ab-11f0-a051-23c10f41277a-photo-1518105779142-d975f22f1b0a-1753374687899.jpg?w=1200&h=630&fit=crop&auto=format,compress'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇨🇷</text></svg>"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}