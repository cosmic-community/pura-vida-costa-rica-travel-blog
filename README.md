# LFG YOOOOO

![App Preview](https://imgix.cosmicjs.com/a69e3d90-68ab-11f0-a051-23c10f41277a-photo-1518105779142-d975f22f1b0a-1753374687899.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful Costa Rica travel blog showcasing the authentic "Pura Vida" lifestyle through expert travel guides, adventure stories, and cultural insights. Built with Next.js 15 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

✨ **Dynamic Content Management** - All content powered by Cosmic CMS
🏖️ **Category-Based Organization** - Adventure, Beaches, Culture, and Wildlife themes
👥 **Author Profiles** - Showcase expert contributors with social media integration
📱 **Responsive Design** - Optimized for all devices with Tailwind CSS
🔍 **SEO Optimized** - Meta tags and performance optimization
📊 **Statistics Display** - Showcase your blog's achievements and reach
🌐 **Social Media Integration** - Connect with your audience across platforms

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68825d77a52aee06dba15ded&clone_repository=6882613aa52aee06dba15e0e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "add about page"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging. Use jungle, beach, wildlife, and surf themes.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Cosmic](https://www.cosmicjs.com/docs)** - Headless CMS for content management
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with content

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pura-vida-costa-rica-blog
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see your blog.

## Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting About Page Content
```typescript
const aboutPage = await cosmic.objects
  .findOne({ type: 'about-page' })
  .depth(1)
```

### Fetching by Category
```typescript
const beachPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This blog uses the following Cosmic object types:

- **Posts** - Blog articles with title, content, featured image, author, and category
- **Categories** - Content organization (Adventure, Beaches, Culture, Wildlife)  
- **Authors** - Writer profiles with bio, photo, and social links
- **About Page** - Singleton page with hero image, story, statistics, and featured authors

All content is managed through the Cosmic dashboard and automatically synced to your website.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard  
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - the headless CMS for modern applications.
<!-- README_END -->