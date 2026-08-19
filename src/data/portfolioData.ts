import { Project, SkillTool, DesignPrinciple, ProcessStep, PersonalInfo } from '../types';

/**
 * ==============================================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * ==============================================================================
 * Edit all your personal information, profile photo, contact details, social links,
 * software tools, and design projects directly in this file.
 * 
 * 1. Name & Titles
 * 2. Profile Photo URL
 * 3. About Text & Bio
 * 4. Skills & Practical Applications
 * 5. Software & Tools
 * 6. Portfolio Projects
 * 7. Project Images & Visual Gradients
 * 8. Project Descriptions & Case Study Details
 * 9. Video Projects
 * 10. Contact Details (Phone, Email, WhatsApp, Location)
 * 11. Social Media Links
 * 12. Location
 * 13. Resume / CV Link
 * ==============================================================================
 */

export const PERSONAL_INFO: PersonalInfo = {
  // 1. Name & Identity
  name: 'ROHIT MADANKAR',
  initials: 'RM',
  title: 'EMERGING GRAPHIC DESIGNER',
  roleBadge: 'GRAPHIC DESIGNER • 2026',
  
  // 2. Profile Photo (Replace with your direct image URL or local asset path)
  profilePhoto: 'https://i.ibb.co/v4DwWf2f/file-00000000dd648208ab97f1b7672bedad.png',
  
  // 12. Location Details
  location: 'Chhindwara, Madhya Pradesh, India',
  cityState: 'Chhindwara, MP',
  country: 'India',
  
  // Timeline & Availability
  careerStart: '2026 — Present',
  availability: 'AVAILABLE FOR CREATIVE PROJECTS',
  
  // 3. Taglines & About Bios
  tagline: 'Creating visual designs through typography, imagery and composition.',
  shortIntro: 'An emerging graphic designer focused on creating clear, engaging and visually polished digital designs.',
  aboutBio: 'I’m Rohit Madankar, an emerging graphic designer from Chhindwara, Madhya Pradesh. I create visual designs with a focus on composition, typography, imagery and clear communication. I’m building my professional practice through hands-on projects, experimentation and continuous learning.',
  
  // 10. Contact Information
  phone: '8871979382',
  phoneFormatted: '+91 8871979382',
  email: 'rohit.design.contact@gmail.com',
  emailPlaceholder: 'rohit.design.contact@gmail.com',
  whatsappUrl: 'https://wa.me/918871979382?text=Hello%20Rohit%2C%20I%20saw%20your%20design%20portfolio%20and%20would%20like%20to%20connect%21',
  telegramUrl: 'https://t.me/rohitmadankar',
  
  // 13. Resume / CV Link (Can be a Google Drive link, PDF URL, or mailto request)
  resumeUrl: '#contact',
  
  // 11. Social Media Links
  socials: [
    { name: 'INSTAGRAM', url: 'https://instagram.com', handle: '@rohit.design' },
    { name: 'BEHANCE', url: 'https://behance.net', handle: 'rohitmadankar' },
    { name: 'LINKEDIN', url: 'https://linkedin.com', handle: 'rohit-madankar' },
  ],

  // Marquee Ticker Keywords
  tickerItems: [
    'GRAPHIC DESIGN',
    'POSTER ART',
    'TYPOGRAPHY',
    'PHOTO RETOUCHING',
    'SOCIAL MEDIA CREATIVES',
    'CorelDRAW',
    'ADOBE PHOTOSHOP',
    'CANVA',
    'CHHINDWARA, MP',
    'LAYOUT DESIGN',
    'EDITORIAL COMPOSITION',
  ],

  // Creative Philosophy Statement
  statement: {
    quoteMain: 'DESIGN IS HOW AN IDEA BECOMES',
    quoteHighlighted: 'VISIBLE.',
    subtext: 'Exploring visual communication through typography, imagery and composition.'
  }
};

/**
 * 4 & 5. PRIMARY SOFTWARE & DESIGN TOOLS
 */
export const PRIMARY_TOOLS: SkillTool[] = [
  {
    name: 'Adobe Photoshop',
    category: 'PRIMARY TOOL',
    label: 'Photo Manipulation & Digital Compositing',
    description: 'Used for complex image editing, visual effects, photo color grading, poster mockups, and raster creative design.',
    iconName: 'Image',
    highlights: ['Layer Masking & Blending', 'Color Correction', 'Poster Compositing', 'Texturizing & Effects']
  },
  {
    name: 'Canva',
    category: 'DESIGN TOOL',
    label: 'Rapid Digital Creatives & Social Assets',
    description: 'Leveraged for agile social media campaign graphics, story layouts, quick digital promotions, and marketing collateral.',
    iconName: 'Layout',
    highlights: ['Social Media Kits', 'Story Templates', 'Quick Promotional Graphics', 'Brand Consistency']
  },
  {
    name: 'CorelDRAW',
    category: 'VECTOR & LAYOUT TOOL',
    label: 'Vector Graphics & Print Layouts',
    description: 'Applied for vector graphics creation, geometric shapes, print typography composition, logo explorations, and sharp layout structures.',
    iconName: 'PenTool',
    highlights: ['Vector Precision', 'Typography Layouts', 'Print & Banner Prep', 'Geometric Shapes']
  }
];

/**
 * DESIGN DISCIPLINES (WHAT I CREATE)
 */
export const DESIGN_DISCIPLINES = [
  { name: 'SOCIAL MEDIA DESIGN', description: 'Engaging, scroll-stopping graphics for Instagram, Facebook & digital platforms.' },
  { name: 'POSTER DESIGN', description: 'Bold, expressive poster compositions driven by visual hierarchy and mood.' },
  { name: 'DIGITAL CREATIVES', description: 'Modern promotional banners, web headers, and creative advertisement visuals.' },
  { name: 'PHOTO EDITING', description: 'Color grading, background replacement, contrast enhancement, and retouching.' },
  { name: 'TYPOGRAPHY', description: 'Expressive font pairings, display headings, and intentional editorial hierarchy.' },
  { name: 'LAYOUT DESIGN', description: 'Structured editorial grids, balanced whitespace, and readable information layout.' },
  { name: 'VIDEO EDITING', description: 'Creative video edits, motion-based visuals, rhythm sync, and engaging digital content.' }
];

/**
 * 6, 7 & 8. PORTFOLIO PROJECTS
 * All projects clearly labeled as concept, spec, or self-initiated practice works.
 */
export const PROJECTS: Project[] = [
  {
    id: 'bmw-m8-spec-poster',
    number: '01',
    title: 'BMW M8: SPEC AUTOMOTIVE POSTER',
    subtitle: 'Automotive Technical Specification & High-Performance Editorial Poster',
    category: 'POSTER DESIGN',
    label: 'SPEC AUTOMOTIVE POSTER',
    year: '2026',
    aspectRatio: 'portrait',
    gridSpan: 'half',
    imageUrl: 'https://i.ibb.co/zVkZp4G6/by-chatgpt-hehe.png',
    heroVisual: {
      bgGradient: 'from-[#0B1528] via-[#0D1F38] to-[#080B12]',
      headline: 'BMW M8 SPEC POSTER',
      subtext: 'TECHNICAL SPECIFICATION POSTER (3:4 PORTRAIT)',
      accentColor: '#2997FF',
      styleTag: 'SPEC AUTOMOTIVE POSTER',
      imageUrl: 'https://i.ibb.co/zVkZp4G6/by-chatgpt-hehe.png'
    },
    objective: 'Self-initiated technical spec poster created to explore precision industrial layout, automotive typography hierarchy, and high-contrast darkroom presentation.',
    idea: 'Self-initiated automotive poster exploring technical information hierarchy, blueprint geometry, and high-performance product presentation.',
    approach: {
      typography: 'Engineering-grade condensed display typography paired with monospaced telemetry data labels, chassis dimension callouts, and technical blueprint markers.',
      composition: 'Structured 3:4 portrait layout integrating dynamic 3/4 car perspective, exploded mechanical wireframe accents, and strict typographic baseline hierarchy.',
      color: 'Obsidian darkroom canvas contrasted with Electric Azure (#2997FF), High-Contrast White typography, and subtle metallic silver accents.',
      imagery: 'Automotive studio photo manipulation, aggressive headlight glow grading, metallic reflection passes, and carbon-fiber texture masking.',
      hierarchy: '1. Vehicle Silhouette & Front Fascia → 2. Spec Poster Title → 3. Performance Telemetry (HP, Torque, 0-100 km/h) → 4. Technical Chassis Blueprint & Spec Grid.'
    },
    tools: ['Adobe Photoshop', 'CorelDRAW', 'Lightroom'],
    deliverables: [
      'High-Resolution Print Poster (300 DPI • A2/A3 Format)',
      'Digital Automotive Exhibition Showcase (1440 × 1920 px)',
      'Social Media Story & Portrait Ad Format (1080 × 1920 px)',
      'Framed Gallery Mockup Asset'
    ]
  },
  {
    id: 'neon-horizon',
    number: '02',
    title: 'CRISPY FRIED CHICKEN SPEC AD',
    subtitle: 'Spec Food Advertisement & Promotional Social Media Creative',
    category: 'SOCIAL MEDIA DESIGN',
    label: 'SPEC FOOD AD',
    year: '2026',
    aspectRatio: 'square',
    gridSpan: 'half',
    imageUrl: 'https://i.ibb.co/mFSsZbVy/chicken.png',
    heroVisual: {
      bgGradient: 'from-[#2B1005] via-[#1A0A02] to-[#080B12]',
      headline: 'CRISPY FRIED CHICKEN',
      subtext: 'SPEC PROMOTIONAL AD (1:1 SQUARE)',
      accentColor: '#FF9F0A',
      styleTag: 'SPEC FOOD AD',
      imageUrl: 'https://i.ibb.co/mFSsZbVy/chicken.png'
    },
    objective: 'Self-initiated concept ad created to practice food compositing, vibrant appetite-stimulating contrast, and dynamic promotional social layout.',
    idea: 'Spec social media advertisement exploring promotional composition, appetizing food compositing, product emphasis, and visual hierarchy.',
    approach: {
      typography: 'Punchy 3D-styled display typography for "CRISPY FRIED CHICKEN", paired with high-contrast badge lettering for promotional callouts and crisp geometric sans for contact and action buttons.',
      composition: 'Centrally anchored hero food platter surrounded by dynamic floating ingredients (fresh herbs, chili peppers, garlic, flying spice embers) creating realistic depth and motion.',
      color: 'Appetite-stimulating warm spectrum: Fiery Amber (#FF9F0A), Chili Red (#FF453A), and Golden Crisp (#FFD60A) set against deep obsidian charcoal (#0A0706) for maximum feed contrast.',
      imagery: 'Food photo compositing, multi-layer spice brushing, selective sharpness mask on golden crust, and warm volumetric rim lighting.',
      hierarchy: '1. Crispy Chicken Platter (Primary Focal Point) → 2. Promotional Discount Callout Badge → 3. Bold Main Headline → 4. Order Call-to-Action with Contact Details.'
    },
    tools: ['Adobe Photoshop', 'Canva', 'Lightroom'],
    deliverables: [
      'Instagram Square Feed Post (1080 × 1080 px • 1:1 Aspect Ratio)',
      'Instagram & Facebook Story Promotion (1080 × 1920 px • 9:16)',
      'Digital Display Ads Asset Pack',
      'Table-Tent Promo Insert Mockup'
    ]
  },
  {
    id: 'asics-shoes-campaign',
    number: '03',
    title: 'ASICS RUNNING SHOES SPEC AD',
    subtitle: 'Dynamic Athletic Footwear Concept & Promotional Social Media Creative',
    category: 'SOCIAL MEDIA DESIGN',
    label: 'SPEC SOCIAL MEDIA AD',
    year: '2026',
    aspectRatio: 'square',
    gridSpan: 'half',
    imageUrl: 'https://i.ibb.co/whSZ4jJJ/asics-shoes.png',
    heroVisual: {
      bgGradient: 'from-[#0D1826] via-[#09111E] to-[#040810]',
      headline: 'ASICS PERFORMANCE',
      subtext: 'SPEC SNEAKER AD (1:1 SQUARE)',
      accentColor: '#2997FF',
      styleTag: 'SPEC FOOTWEAR AD',
      imageUrl: 'https://i.ibb.co/whSZ4jJJ/asics-shoes.png'
    },
    objective: 'Spec social media advertisement exploring dynamic motion trails, athletic typography, and promotional pricing composition for digital platforms.',
    idea: 'Spec social media advertisement exploring promotional composition, product emphasis, velocity effects, and visual hierarchy.',
    approach: {
      typography: 'Speed-angled athletic display typography for brand headline, combined with bold discount pill badges and monospaced performance spec callouts.',
      composition: 'Hero sneaker suspended dynamically at a 35° running angle with luminous velocity streaks and energetic particle bursts emanating from the sole.',
      color: 'High-contrast sport palette combining Electric Cobalt Blue (#2997FF), Vibrant Cyan (#64D2FF), and Neon Accent Highlights against a sleek dark carbon studio backdrop.',
      imagery: 'Studio shoe photo manipulation, crisp sole texture masking, ambient ground reflections, and volumetric atmospheric lighting.',
      hierarchy: '1. Floating Sneaker with dynamic lighting → 2. Promotional Offer & Discount Badge → 3. Athletic Headline Typography → 4. Call-to-Action button.'
    },
    tools: ['Adobe Photoshop', 'Canva', 'Lightroom'],
    deliverables: [
      'Instagram Square Feed Post (1080 × 1080 px • 1:1 Aspect Ratio)',
      'Instagram & Facebook Story Creative (1080 × 1920 px • 9:16)',
      'Digital Display Ads Asset Pack',
      'E-Commerce Homepage Promotional Banner'
    ]
  },
  {
    id: 'iphone-17-pro-campaign',
    number: '04',
    title: 'IPHONE 17 PRO PERSONAL CONCEPT',
    subtitle: 'Personal Concept Ad Exploring Digital Marketing Aesthetics',
    category: 'DIGITAL CREATIVES',
    label: 'PERSONAL CONCEPT AD',
    year: '2026',
    aspectRatio: 'square',
    gridSpan: 'half',
    imageUrl: 'https://i.ibb.co/pjyyZQyz/iphone-17-pro.png',
    heroVisual: {
      bgGradient: 'from-[#1A102A] via-[#100B1A] to-[#05040A]',
      headline: 'IPHONE 17 PRO CONCEPT',
      subtext: 'PERSONAL CONCEPT AD (1:1 SQUARE)',
      accentColor: '#BF5AF2',
      styleTag: 'PERSONAL CONCEPT AD',
      imageUrl: 'https://i.ibb.co/pjyyZQyz/iphone-17-pro.png'
    },
    objective: 'Self-initiated concept design created to explore minimalist technology product staging, dramatic lighting reflections, and promotional digital creatives.',
    idea: 'Personal concept ad exploring modern product presentation, studio lighting reflections, and clean promotional digital layouts.',
    approach: {
      typography: 'Clean modern typography paired with high-contrast promotional badge pills and technical specification highlights.',
      composition: 'Hero device angled with depth-of-field glass camera array reflections and dynamic ambient purple-blue backlighting.',
      color: 'Sophisticated deep space black canvas contrasted with Cosmic Violet (#BF5AF2), Titanium Silver (#E5E5EA), and Electric Blue (#2997FF) specular glows.',
      imagery: 'Device photo manipulation, glass lens refraction rendering, and crisp metallic bezel highlight passes.',
      hierarchy: '1. Hero device showcase → 2. Promotional Offer & Pricing → 3. Flagship Title & Feature Callouts → 4. Call-to-Action button.'
    },
    tools: ['Adobe Photoshop', 'Canva', 'Lightroom'],
    deliverables: [
      'Digital Display Ad Banners & E-Commerce Asset Pack',
      'Instagram Square Feed Post (1080 × 1080 px • 1:1 Aspect Ratio)',
      'Instagram & Facebook Story Creative (1080 × 1920 px • 9:16)',
      'Product Launch Hero Creative'
    ]
  }
];

/**
 * DESIGN PROCESS STEPS
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    description: 'Deconstruct the project brief, identify the core message, define the target audience, and establish clear visual goals before pixel work begins.',
    deliverables: 'Design Objectives & Content Checklist'
  },
  {
    number: '02',
    title: 'RESEARCH',
    description: 'Explore visual references, moodboards, color palettes, typography trends, and design benchmarks to define an authentic creative direction.',
    deliverables: 'Visual Direction & Inspiration Board'
  },
  {
    number: '03',
    title: 'CONCEPT',
    description: 'Brainstorm layout structures, experiment with rough compositions, test font pairings, and map out visual hierarchy.',
    deliverables: 'Composition Sketches & Layout Drafts'
  },
  {
    number: '04',
    title: 'DESIGN',
    description: 'Execute the design using Photoshop, Canva, or CorelDRAW. Craft precise vector lines, refine photo grading, and calibrate typography spacing.',
    deliverables: 'High-Resolution Graphic Assets'
  },
  {
    number: '05',
    title: 'REFINE',
    description: 'Rigorously review contrast ratios, alignment grids, export formats, and visual balance to deliver polished, production-ready graphics.',
    deliverables: 'Final Export Files & Presentation Mockups'
  }
];

/**
 * DESIGN PRINCIPLES
 */
export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    title: 'TYPOGRAPHY',
    description: 'Choosing and arranging type to create clarity, character, and immediate reading hierarchy.',
    example: 'Pairing robust serif display headers with clean geometric sans-serif body text.'
  },
  {
    title: 'CONTRAST',
    description: 'Using differences in scale, weight, color, and spacing to effortlessly guide human attention.',
    example: 'Combining deep midnight backdrops with electric accents and crisp editorial text.'
  },
  {
    title: 'HIERARCHY',
    description: 'Creating an intuitive visual order so viewers instantly digest what matters first.',
    example: 'Dominant hero headlines leading seamlessly into structured subheads and micro-copy.'
  },
  {
    title: 'ALIGNMENT',
    description: 'Connecting visual elements along precise mathematical grids to establish harmony and order.',
    example: 'Consistent column grids that create visual trust across multi-page layouts.'
  },
  {
    title: 'COMPOSITION',
    description: 'Arranging shapes, type, and images within a frame to tell a captivating visual story.',
    example: 'Using rule-of-thirds and negative space to make graphic elements breathe.'
  },
  {
    title: 'BALANCE',
    description: 'Distributing visual weight across symmetrical or asymmetrical layout structures.',
    example: 'Offsetting a heavy photo block with light, airy editorial typography.'
  }
];
