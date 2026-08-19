import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Layers, Maximize2, ShieldCheck, Eye } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
}

export function CaseStudyModal({ project, onClose, onSelectProject, allProjects }: CaseStudyModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isZoomed]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex justify-center p-4 sm:p-6 lg:p-12">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl apple-glass-card rounded-3xl p-6 sm:p-10 lg:p-14 text-white my-auto shadow-[0_25px_70px_rgba(0,0,0,0.8)] space-y-10 overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#2997FF] font-semibold">PROJECT {project.number}</span>
              <span className="text-white/30">•</span>
              <span className="apple-glass-pill px-3 py-1 rounded-full text-white/90 text-[10px] tracking-wider uppercase font-medium">
                {project.label}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{project.year}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all flex items-center gap-2 text-xs font-mono uppercase cursor-pointer"
            >
              <span className="hidden sm:inline">CLOSE</span>
              <X className="w-4 h-4 text-[#2997FF]" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-[#64D2FF] uppercase tracking-widest font-semibold">
                {project.category}
              </span>
              {project.aspectRatio === 'square' && (
                <span className="px-3 py-0.5 bg-[#FF9F0A]/20 border border-[#FF9F0A]/40 text-[#FF9F0A] text-[10px] font-mono rounded-full font-semibold">
                  1:1 ASPECT RATIO (1080 × 1080 PX)
                </span>
              )}
              {project.aspectRatio === 'portrait' && (
                <span className="px-3 py-0.5 bg-[#2997FF]/20 border border-[#2997FF]/40 text-[#64D2FF] text-[10px] font-mono rounded-full font-semibold">
                  3:4 PORTRAIT POSTER (PRINT & DIGITAL)
                </span>
              )}
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-sans font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Hero Visual Artwork Banner (Adaptive Aspect Ratio & Zero Cropping) */}
          <div className={`relative w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br ${project.heroVisual.bgGradient} flex flex-col justify-between shadow-2xl ${
            project.imageUrl 
              ? (project.aspectRatio === 'square' 
                  ? 'max-w-2xl mx-auto aspect-square' 
                  : project.aspectRatio === 'portrait' 
                  ? 'max-w-lg mx-auto aspect-[3/4] sm:aspect-[4/5] min-h-[460px] sm:min-h-[560px]' 
                  : 'aspect-video') 
              : 'aspect-video'
          }`}>
            {project.imageUrl || project.heroVisual.imageUrl ? (
              <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
                {/* Soft ambient backdrop blur */}
                <img
                  src={project.imageUrl || project.heroVisual.imageUrl}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none"
                />
                
                {/* Main sharp artwork with object-contain to NEVER crop */}
                <img
                  src={project.imageUrl || project.heroVisual.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full h-full object-contain p-2.5 sm:p-4 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 text-[10px] font-mono text-white/90 p-4 sm:p-6 pointer-events-none">
                  <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/20 rounded-full uppercase font-medium shadow-lg">
                    {project.heroVisual.styleTag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-white font-semibold bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF9F0A]" /> {project.aspectRatio === 'square' ? '1:1 FEED STANDARD' : project.aspectRatio === 'portrait' ? '3:4 POSTER ART' : project.category}
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between z-20 text-xs font-mono text-white/90 border-t border-white/15 p-4 sm:p-6 bg-black/75 backdrop-blur-md">
                  <span className="text-[11px] text-white/80">ROHIT MADANKAR • CHHINDWARA, MP</span>
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 flex items-center gap-1.5 transition-all text-[11px] cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#2997FF]" />
                    <span>VIEW 100% UNTOUCHED</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-12 flex flex-col justify-between h-full w-full">
                {/* Visual Style Tag */}
                <div className="flex justify-between items-center z-10 text-[10px] font-mono text-white/80">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-full uppercase font-medium">
                    {project.heroVisual.styleTag}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#2997FF] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> GRAPHIC DESIGN COMPOSITION
                  </span>
                </div>

                {/* Main Visual Display Text */}
                <div className="my-auto text-center space-y-2 z-10">
                  <h3 className="font-serif-editorial text-3xl sm:text-6xl font-bold text-white tracking-widest uppercase">
                    {project.heroVisual.headline}
                  </h3>
                  <p className="text-xs font-mono text-[#64D2FF] tracking-widest uppercase font-semibold">
                    {project.heroVisual.subtext}
                  </p>
                </div>

                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
                
                <div className="flex items-center justify-between z-10 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
                  <span>DESIGNED BY ROHIT MADANKAR</span>
                  <span>CHHINDWARA, MP</span>
                </div>
              </div>
            )}
          </div>

          {/* Case Study Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Left: Overview, Objective & Brief */}
            <div className="lg:col-span-5 space-y-5 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#2997FF] tracking-wider uppercase font-semibold block">
                  01. PROJECT OVERVIEW & OBJECTIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                  {project.title}
                </h3>
                {project.objective && (
                  <div className="p-3.5 bg-black/40 border-l-2 border-[#2997FF] rounded-r-xl text-xs text-white/80 font-sans font-light leading-relaxed">
                    <span className="font-semibold text-white block mb-0.5 font-mono text-[11px]">OBJECTIVE:</span>
                    {project.objective}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#64D2FF] tracking-wider uppercase font-semibold block">
                  02. CONCEPT & IDEA
                </span>
                <p className="text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed">
                  {project.idea}
                </p>
              </div>

              {project.aiAssisted && (
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-start gap-2.5 text-xs text-white/60">
                  <ShieldCheck className="w-4 h-4 text-[#64D2FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-white/80 text-[11px] font-semibold block">AI-Assisted Visual Development</span>
                    <span className="text-[11px] text-white/60">{project.aiNote || 'AI generation tools assisted in foundational background assets and compositing references.'}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-xs font-mono text-white/80 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-[#64D2FF]" /> TOOLS & SOFTWARE USED
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs font-mono text-white font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-xs font-mono text-white/80 uppercase tracking-wider font-semibold">
                  DELIVERABLE SPECIFICATIONS
                </p>
                <ul className="space-y-1.5 text-xs text-white/70 font-light">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Design Approach & Visual Direction */}
            <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#64D2FF] tracking-wider uppercase font-semibold block">
                  03. DESIGN APPROACH & VISUAL DIRECTION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                  EXECUTION BREAKDOWN
                </h3>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="p-3.5 bg-black/40 border-l-2 border-[#2997FF] rounded-r-xl">
                  <span className="font-bold text-white uppercase block mb-1 font-mono text-[11px]">TYPOGRAPHY:</span>
                  <span className="text-white/70 font-light leading-relaxed">{project.approach.typography}</span>
                </div>

                <div className="p-3.5 bg-black/40 border-l-2 border-[#64D2FF] rounded-r-xl">
                  <span className="font-bold text-white uppercase block mb-1 font-mono text-[11px]">COMPOSITION:</span>
                  <span className="text-white/70 font-light leading-relaxed">{project.approach.composition}</span>
                </div>

                <div className="p-3.5 bg-black/40 border-l-2 border-[#FF9F0A] rounded-r-xl">
                  <span className="font-bold text-white uppercase block mb-1 font-mono text-[11px]">COLOR PALETTE:</span>
                  <span className="text-white/70 font-light leading-relaxed">{project.approach.color}</span>
                </div>

                <div className="p-3.5 bg-black/40 border-l-2 border-[#BF5AF2] rounded-r-xl">
                  <span className="font-bold text-white uppercase block mb-1 font-mono text-[11px]">IMAGERY & TEXTURE:</span>
                  <span className="text-white/70 font-light leading-relaxed">{project.approach.imagery}</span>
                </div>

                <div className="p-3.5 bg-black/40 border-l-2 border-[#30D158] rounded-r-xl">
                  <span className="font-bold text-white uppercase block mb-1 font-mono text-[11px]">VISUAL HIERARCHY:</span>
                  <span className="text-white/70 font-light leading-relaxed">{project.approach.hierarchy}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Project Navigation */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#2997FF] group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS: {prevProject.title}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
              <span>NEXT: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4 text-[#2997FF] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Full Image Zoom / Lightbox Modal */}
        {isZoomed && (project.imageUrl || project.heroVisual.imageUrl) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setIsZoomed(false)}
          >
            <div className="absolute top-6 right-6 flex items-center gap-4 z-70">
              <span className="text-xs font-mono text-white/70">
                {project.aspectRatio === 'square' ? '100% UNTOUCHED SQUARE RATIO (1080 × 1080 PX)' : project.aspectRatio === 'portrait' ? '100% UNTOUCHED PORTRAIT POSTER (3:4 RATIO)' : '100% UNTOUCHED ORIGINAL RESOLUTION'}
              </span>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5 text-[#2997FF]" />
              </button>
            </div>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={project.imageUrl || project.heroVisual.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-[0_0_80px_rgba(255,159,10,0.3)] border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}

      </div>
    </AnimatePresence>
  );
}

