export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: any;
  order: number;
  published: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  createdAt: any;
  published: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  review: string;
  rating: number;
  role: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImageUrl: string;
  cvUrl: string;
  email: string;
  whatsapp: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

export type Category = 'All' | 'Graphic Design' | 'Video Editing' | 'Meta Marketing' | 'Others';
