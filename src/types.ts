export type Category = 
  | 'ALL'
  | 'SOCIAL MEDIA DESIGN'
  | 'POSTER DESIGN'
  | 'PHOTO EDITING'
  | 'DIGITAL CREATIVES'
  | 'TYPOGRAPHY'
  | 'LAYOUT DESIGN';

export type ProjectLabel = 
  | 'PERSONAL PROJECT'
  | 'CONCEPT PROJECT'
  | 'DESIGN EXPLORATION'
  | 'SPEC AUTOMOTIVE POSTER'
  | 'SPEC FOOD AD'
  | 'SPEC SOCIAL MEDIA AD'
  | 'PERSONAL CONCEPT AD'
  | 'PERSONAL CONCEPT'
  | 'POSTER ARTWORK';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: Category;
  label: ProjectLabel;
  year: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  gridSpan: 'full' | 'half' | 'two-thirds' | 'one-third';
  imageUrl?: string;
  heroVisual: {
    bgGradient: string;
    headline: string;
    subtext: string;
    accentColor: string;
    styleTag: string;
    imageUrl?: string;
  };
  idea: string;
  objective?: string;
  aiAssisted?: boolean;
  aiNote?: string;
  approach: {
    typography: string;
    composition: string;
    color: string;
    imagery: string;
    hierarchy: string;
  };
  tools: string[];
  deliverables: string[];
}

export interface SkillTool {
  name: string;
  category: string;
  label: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface DesignPrinciple {
  title: string;
  description: string;
  example: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  iconName?: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  roleBadge: string;
  profilePhoto: string;
  location: string;
  cityState: string;
  country: string;
  careerStart: string;
  availability: string;
  tagline: string;
  shortIntro: string;
  aboutBio: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  emailPlaceholder: string;
  whatsappUrl?: string;
  telegramUrl?: string;
  resumeUrl?: string;
  socials: SocialLink[];
  tickerItems: string[];
  statement: {
    quoteMain: string;
    quoteHighlighted: string;
    subtext: string;
  };
}

export interface VideoProject {
  id: string;
  title?: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  duration?: string;
  year?: string;
  tags?: string[];
  isCustom?: boolean;
  createdAt?: number;
}

