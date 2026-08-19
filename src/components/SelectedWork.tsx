import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Category, Project } from '../types';
import { ChevronRight, Sparkles, LayoutGrid, Rows3, ArrowUpRight, CheckCircle2, FolderOpen } from 'lucide-react';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

interface SelectedWorkProps {
  onSelectProject: (p: Project) => void;
  selectedCategory?: Category;
  onSelectCategory?: (category: Category) => void;
}

export function SelectedWork({ onSelectProject, selectedCategory: controlledCategory, onSelectCategory }: SelectedWorkProps) {
  const [internalCategory, setInternalCategory] = useState<Category>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const handleCategoryChange = (cat: Category) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const categories: Category[] = [
    'ALL',
    'POSTER DESIGN',
    'SOCIAL MEDIA DESIGN',
    'PHOTO EDITING',
    'TYPOGRAPHY',
    'DIGITAL CREATIVES',
    'LAYOUT DESIGN'
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const isSocialMediaView = selectedCategory === 'SOCIAL MEDIA DESIGN';

  return (
    <section id="work" className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient liquid glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#BF5AF2]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0071E3]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2997FF] mb-3">
              <span>03</span>
              <span className="w-8 h-[1px] bg-[#2997FF]" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              SELECTED <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">WORK</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-white/60 font-sans font-light">
            Selected work includes self-initiated concepts, practice projects and design explorations.
          </p>
        </motion.div>

        {/* Category Controls & Layout Switcher Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8"
        >
          {/* Apple Segmented Filter Pills */}
          <div className="apple-glass-pill p-1.5 rounded-full flex items-center gap-1 overflow-x-auto scrollbar-none w-max max-w-full">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer z-10 ${
                    isSelected ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterTab"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#2997FF] rounded-full shadow-[0_0_15px_rgba(41,151,255,0.4)] -z-10"
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Linewise View Mode Switcher */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider hidden sm:inline-block">LAYOUT:</span>
            <div className="apple-glass-pill p-1 rounded-full flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#2997FF] text-white shadow-[0_0_10px_rgba(41,151,255,0.5)] font-semibold' 
                    : 'text-white/60 hover:text-white'
                }`}
                title="Linewise Multi-Column Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px]">GRID</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('rows')}
                className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                  viewMode === 'rows' 
                    ? 'bg-[#2997FF] text-white shadow-[0_0_10px_rgba(41,151,255,0.5)] font-semibold' 
                    : 'text-white/60 hover:text-white'
                }`}
                title="Linewise Horizontal Editorial Rows"
              >
                <Rows3 className="w-3.5 h-3.5" />
                <span className="text-[11px]">LINEWISE ROWS</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Specialized Category Linewise Header (Dynamic for each category) */}
        {selectedCategory !== 'ALL' && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl apple-glass border border-[#2997FF]/30 bg-gradient-to-r from-[#0071E3]/10 via-[#2997FF]/5 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#64D2FF] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#2997FF]" />
                <span>
                  {selectedCategory === 'POSTER DESIGN' && 'CREATIVE POSTER DESIGN • 3:4 PORTRAIT SPEC ART'}
                  {selectedCategory === 'SOCIAL MEDIA DESIGN' && 'SPEC SOCIAL MEDIA CREATIVES • 1:1 SQUARE FORMAT'}
                  {selectedCategory === 'PHOTO EDITING' && 'EDITORIAL PHOTO EDITING & TONAL RETOUCHING'}
                  {selectedCategory === 'TYPOGRAPHY' && 'EXPERIMENTAL TYPOGRAPHY & BASELINE GEOMETRY'}
                  {selectedCategory === 'DIGITAL CREATIVES' && 'CONCEPT DIGITAL CREATIVES & PROMOTIONAL BANNERS'}
                  {selectedCategory === 'LAYOUT DESIGN' && 'EDITORIAL PUBLICATION & MAGAZINE SPREADS'}
                </span>
              </div>
              <p className="text-xs text-white/75 max-w-2xl leading-relaxed">
                {selectedCategory === 'POSTER DESIGN' && 'Spec concept poster compositions exploring technical typography, structured layout hierarchy, and darkroom visual precision.'}
                {selectedCategory === 'SOCIAL MEDIA DESIGN' && 'Self-initiated social media ad creatives formatted specifically for Instagram feeds and promotional digital placements (1080 × 1080 px).'}
                {selectedCategory === 'PHOTO EDITING' && 'Tone mapping, color grading, shadow recovery, grain textures, and architectural photographic explorations.'}
                {selectedCategory === 'TYPOGRAPHY' && 'Rigid baseline grid explorations, scale contrast, expressive serif pairings, and letterform geometry.'}
                {selectedCategory === 'DIGITAL CREATIVES' && 'Self-initiated digital creatives, promotional banners, product isolation graphics, and marketing concepts.'}
                {selectedCategory === 'LAYOUT DESIGN' && 'Structured editorial grids, balanced negative space, magazine cover layouts, and comfortable reading rhythm.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0 text-[11px] font-mono text-white/70">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-medium">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#64D2FF]">
                {selectedCategory === 'POSTER DESIGN' ? '3:4 PORTRAIT RATIO' : selectedCategory === 'SOCIAL MEDIA DESIGN' ? '1080 × 1080 PX' : selectedCategory === 'DIGITAL CREATIVES' ? 'DIGITAL RATIOS' : 'HIGH-RES EXPORT'}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                {selectedCategory === 'POSTER DESIGN' ? 'PHOTOSHOP • CORELDRAW' : selectedCategory === 'SOCIAL MEDIA DESIGN' ? 'PHOTOSHOP • CANVA' : selectedCategory === 'DIGITAL CREATIVES' ? 'PHOTOSHOP • CANVA • LIGHTROOM' : 'ADOBE SUITE'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Empty State when Category has no uploaded projects */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-20 px-8 rounded-3xl apple-glass border border-white/10 text-center flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#2997FF] shadow-[0_0_25px_rgba(41,151,255,0.2)]">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white tracking-tight">
                No projects uploaded yet.
              </h4>
              <p className="text-sm text-white/60 font-sans font-light max-w-md mx-auto leading-relaxed">
                There are currently no uploaded projects in <span className="text-[#64D2FF] font-medium">{selectedCategory}</span>. Uploaded works will appear here once added.
              </p>
            </div>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            layout
            className={`grid grid-cols-1 ${
              isSocialMediaView 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'md:grid-cols-12'
            } gap-6`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                // Balanced 2-column Grid Span (6 + 6 = 12 cols per row) to ensure Project 08 & others are balanced
                let spanClass = '';
                if (!isSocialMediaView) {
                  if (selectedCategory === 'ALL') {
                    spanClass = 'md:col-span-6';
                  } else {
                    spanClass = filteredProjects.length === 1 
                      ? 'md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4' 
                      : 'md:col-span-6';
                  }
                }

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.12 }}
                    variants={fadeUpVariant}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    className={`${spanClass} group cursor-pointer h-full flex flex-col`}
                    onClick={() => onSelectProject(project)}
                    data-cursor="CASE STUDY"
                  >
                    <div className="apple-glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full space-y-5 border border-white/10 hover:border-[#2997FF]/50 transition-all duration-300">
                      
                      {/* Top Card Metadata Header */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#2997FF] font-semibold tracking-wider">PROJECT {project.number}</span>
                        <span className="apple-glass-pill px-3 py-1 rounded-full text-[10px] tracking-wider text-white/90 font-medium uppercase border border-white/15">
                          {project.label}
                        </span>
                      </div>

                      {/* Graphic Visual Artwork Display Frame with Optimized Aspect Ratio Precision */}
                      <div className={`relative ${
                        project.aspectRatio === 'square'
                          ? 'aspect-square' 
                          : project.aspectRatio === 'portrait' 
                          ? 'aspect-[3/4] min-h-[300px] sm:min-h-[380px]' 
                          : 'aspect-[16/10]'
                      } w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br ${project.heroVisual.bgGradient} flex flex-col justify-between group-hover:scale-[1.01] transition-transform duration-500 shadow-xl`}>
                        {project.imageUrl || project.heroVisual.imageUrl ? (
                          <>
                            {/* Ambient soft glow background */}
                            <img
                              src={project.imageUrl || project.heroVisual.imageUrl}
                              alt=""
                              aria-hidden="true"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                            />
                            
                            {/* Full uncropped artwork with object-contain */}
                            <img
                              src={project.imageUrl || project.heroVisual.imageUrl}
                              alt={project.title}
                              referrerPolicy="no-referrer"
                              className="relative z-10 w-full h-full object-contain p-2.5 group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-2xl"
                            />

                            {/* Top Frame Tag */}
                            <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 text-[10px] font-mono text-white/90 p-3.5 pointer-events-none">
                              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full font-medium shadow-md">
                                {project.heroVisual.styleTag}
                              </span>
                              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full font-mono text-[#FF9F0A] font-semibold flex items-center gap-1 shadow-md">
                                <Sparkles className="w-3 h-3 text-[#FF9F0A]" />
                                {project.aspectRatio === 'square' ? '1:1 FEED' : project.aspectRatio === 'portrait' ? '3:4 POSTER' : project.year}
                              </span>
                            </div>

                            {/* Bottom Resolution Specs */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center z-20 text-[10px] font-mono text-white/80 p-3.5 pointer-events-none">
                              <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/15">ROHIT MADANKAR</span>
                              <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/15">
                                {project.aspectRatio === 'square' ? '1080 × 1080 PX' : project.aspectRatio === 'portrait' ? '3:4 PRINT POSTER' : project.year}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="p-6 sm:p-8 flex flex-col justify-between h-full w-full relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-black/80">
                            {/* Subtle Grid Lines Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                            {/* Top Frame Tag */}
                            <div className="flex justify-between items-center z-10 text-[10px] font-mono text-white/80">
                              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-full font-medium">
                                {project.heroVisual.styleTag}
                              </span>
                              <span className="flex items-center gap-1 text-[#64D2FF] font-semibold">
                                <Sparkles className="w-3 h-3 text-[#2997FF]" /> {project.category}
                              </span>
                            </div>

                            {/* Display Editorial Artwork Layout */}
                            <div className="my-auto py-4 text-center space-y-2 z-10">
                              <span className="text-[10px] font-mono tracking-[0.25em] text-[#64D2FF] uppercase block">
                                EDITORIAL EXPLORATION
                              </span>
                              <h4 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase">
                                {project.heroVisual.headline}
                              </h4>
                              <p className="text-[11px] font-mono text-white/60 uppercase tracking-widest">
                                {project.heroVisual.subtext}
                              </p>
                            </div>

                            {/* Bottom Specs */}
                            <div className="flex justify-between items-center z-10 text-[10px] font-mono text-white/50 border-t border-white/10 pt-3">
                              <span>ROHIT MADANKAR</span>
                              <span>{project.year} • SPEC STUDY</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Card Title & Action */}
                      <div className="flex items-end justify-between pt-1 mt-auto">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[#64D2FF] tracking-wider font-semibold block">
                            {project.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#2997FF] transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-white/60 line-clamp-1 font-sans font-light">
                            {project.subtitle}
                          </p>
                        </div>

                        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 group-hover:bg-[#0071E3] group-hover:text-white group-hover:border-[#2997FF] group-hover:scale-110 transition-all text-white shrink-0 ml-3 shadow-[0_0_15px_rgba(41,151,255,0.3)] flex items-center justify-center">
                          <ChevronRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* View Mode 2: Linewise Editorial Horizontal Rows */
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.12 }}
                  variants={fadeUpVariant}
                  exit={{ opacity: 0, scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  onClick={() => onSelectProject(project)}
                  data-cursor="CASE STUDY"
                  className="apple-glass-card p-6 sm:p-8 rounded-3xl group cursor-pointer border border-white/10 hover:border-[#2997FF]/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Artwork Image Container with Adaptive Aspect Ratio */}
                    <div className="lg:col-span-5 relative flex items-center justify-center">
                      <div className={`${
                        project.aspectRatio === 'portrait'
                          ? 'aspect-[3/4] max-w-[290px]'
                          : project.aspectRatio === 'square'
                          ? 'aspect-square max-w-[340px]'
                          : 'aspect-video max-w-[380px]'
                      } w-full mx-auto rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0B1528] to-[#040810] relative shadow-xl flex flex-col justify-between`}>
                        {project.imageUrl || project.heroVisual.imageUrl ? (
                          <>
                            <img
                              src={project.imageUrl || project.heroVisual.imageUrl}
                              alt=""
                              aria-hidden="true"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-125 pointer-events-none"
                            />
                            <img
                              src={project.imageUrl || project.heroVisual.imageUrl}
                              alt={project.title}
                              referrerPolicy="no-referrer"
                              className="relative z-10 w-full h-full object-contain p-2.5 group-hover:scale-[1.03] transition-transform duration-500 drop-shadow-2xl"
                            />
                            <span className="absolute top-3 left-3 z-20 text-[10px] font-mono px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-white">
                              {project.heroVisual.styleTag}
                            </span>
                            <span className="absolute bottom-3 right-3 z-20 text-[10px] font-mono px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 text-[#64D2FF]">
                              {project.aspectRatio === 'square' ? '1080 × 1080 PX' : project.aspectRatio === 'portrait' ? '3:4 POSTER' : '16:10 LAYOUT'}
                            </span>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center p-6 text-center">
                            <h4 className="font-serif-editorial text-2xl text-white font-bold">{project.heroVisual.headline}</h4>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Complete Editorial Details & Strategy Breakdown */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[#2997FF] font-mono text-xs font-semibold">PROJECT {project.number}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <span className="apple-glass-pill px-3 py-0.5 rounded-full text-[10px] font-mono uppercase text-white/90">
                            {project.label}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <span className="text-white/50 font-mono text-xs">{project.year}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#2997FF] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#64D2FF] font-mono">
                          {project.subtitle}
                        </p>
                        <p className="text-sm text-white/70 font-sans font-light leading-relaxed">
                          {project.idea}
                        </p>
                      </div>

                      {/* Tools & Deliverables Badges */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono text-white/40 uppercase">TOOLS:</span>
                          {project.tools.map((tool) => (
                            <span key={tool} className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs font-mono text-white/60">
                          {project.category} • Full Creative Suite
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#2997FF] font-semibold group-hover:translate-x-1 transition-transform">
                          <span>EXPLORE FULL CASE STUDY</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}


