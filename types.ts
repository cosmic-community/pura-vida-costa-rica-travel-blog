// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// About Page interface
interface AboutPage extends CosmicObject {
  type: 'about-page';
  metadata: {
    page_title?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    intro_text?: string;
    our_story?: string;
    mission_statement?: string;
    featured_authors?: Author[];
    statistics?: {
      years_exploring?: number;
      destinations_covered?: number;
      articles_published?: number;
      national_parks_visited?: number;
      wildlife_species_photographed?: number;
    };
    contact_email?: string;
    social_media_links?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      youtube?: string;
    };
    cta_text?: string;
    cta_link?: string;
  };
}

// Post interface
interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    read_time?: number;
  };
}

// Category interface
interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
  };
}

// Author interface
interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

function isAboutPage(obj: CosmicObject): obj is AboutPage {
  return obj.type === 'about-page';
}

export type {
  CosmicObject,
  Post,
  Category,
  Author,
  AboutPage,
  CosmicResponse
};

export {
  isPost,
  isCategory,
  isAuthor,
  isAboutPage
};