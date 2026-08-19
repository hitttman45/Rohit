import { motion, useReducedMotion } from 'motion/react';
import { DESIGN_DISCIPLINES } from '../data/portfolioData';
import { ArrowUpRight, Film, Sparkles } from 'lucide-react';
import { Category } from '../types';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

interface DesignFocusProps {
  onSelectCategory?: (category: Category) => void;
}

export function DesignFocus({ onSelectCategory }: DesignFocusProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleDisciplineClick = (disciplineName: string) => {
    if (disciplineName === 'VIDEO EDITING') {
      const videoSection = document.getElementById('video-editing');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const categoryMap: Record<string, Category> = {
      'SOCIAL MEDIA DESIGN': 'SOCIAL MEDIA DESIGN',
      'POSTER DESIGN': 'POSTER DESIGN',
      'DIGITAL CREATIVES': 'DIGITAL CREATIVES',
      'PHOTO EDITING': 'PHOTO EDITING',
      'TYPOGRAPHY': 'TYPOGRAPHY',
      'LAYOUT DESIGN': 'LAYOUT DESIGN'
    };

    const targetCategory = categoryMap[disciplineName] || 'ALL';
    if (onSelectCategory) {
      onSelectCategory(targetCategory);
    }

    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const staticDisciplines = DESIGN_DISCIPLINES.filter(d => d.name !== 'VIDEO EDITING');
  const videoDiscipline = DESIGN_DISCIPLINES.find(d => d.name === 'VIDEO EDITING');

  return (
    <section className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient background lights */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#64D2FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#BF5AF2]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#64D2FF] block mb-2">
              DISCIPLINES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              WHAT I <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">CREATE</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-sans font-light">
            Specialized design disciplines combining typography, imagery, layout structures, and visual composition. Click any discipline to explore matching gallery work.
          </p>
        </motion.div>

        {/* Static Graphic Design Disciplines */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
          className="space-y-3"
        >
          {staticDisciplines.map((discipline, index) => (
            <motion.div
              key={discipline.name}
              variants={fadeUpVariant}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => handleDisciplineClick(discipline.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDisciplineClick(discipline.name);
                }
              }}
              role="button"
              tabIndex={0}
              data-cursor="GALLERY"
              className="group apple-glass p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#2997FF]/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              {/* Subtle specular sheen highlight line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2997FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[#2997FF] font-bold px-2.5 py-1 rounded-full bg-[#2997FF]/10 border border-[#2997FF]/20">
                  0{index + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-[#2997FF] transition-colors duration-300">
                  {discipline.name}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2">
                <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/90 transition-colors max-w-xs font-sans font-light">
                  {discipline.description}
                </p>
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:border-[#2997FF] group-hover:bg-[#0071E3] group-hover:text-white transition-all shadow-[0_0_15px_rgba(41,151,255,0.3)]">
                  <ArrowUpRight className="w-5 h-5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dedicated Spacing & Distinct Styling for Video Editing Discipline */}
        {videoDiscipline && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariant}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BF5AF2] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#BF5AF2] font-semibold">
                  MOTION & DYNAMIC VISUALS
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.03]">
                DEDICATED SHOWCASE
              </span>
            </div>

            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => handleDisciplineClick('VIDEO EDITING')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDisciplineClick('VIDEO EDITING');
                }
              }}
              role="button"
              tabIndex={0}
              data-cursor="SHOWCASE"
              className="group p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#BF5AF2]/15 via-[#5E5CE6]/10 to-black/40 border border-[#BF5AF2]/30 hover:border-[#BF5AF2]/80 hover:shadow-[0_0_35px_rgba(191,90,242,0.25)] transition-all duration-300 relative overflow-hidden cursor-pointer backdrop-blur-xl"
            >
              {/* Distinctive Purple/Violet Sheen Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Subtle ambient light glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#BF5AF2]/20 rounded-full blur-[60px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="flex items-center gap-6 relative z-10">
                <span className="font-mono text-xs text-[#BF5AF2] font-bold px-3 py-1.5 rounded-full bg-[#BF5AF2]/20 border border-[#BF5AF2]/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(191,90,242,0.3)]">
                  <Film className="w-3.5 h-3.5 text-[#BF5AF2]" />
                  <span>0{DESIGN_DISCIPLINES.length}</span>
                </span>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#BF5AF2] transition-colors duration-300">
                      {videoDiscipline.name}
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#BF5AF2]/20 text-[#E0A8FF] border border-[#BF5AF2]/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      MOTION
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/2 relative z-10">
                <p className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors max-w-xs font-sans font-light">
                  {videoDiscipline.description}
                </p>
                <div className="w-11 h-11 rounded-full border border-[#BF5AF2]/40 bg-[#BF5AF2]/15 flex items-center justify-center text-[#E0A8FF] group-hover:border-[#BF5AF2] group-hover:bg-[#BF5AF2] group-hover:text-black transition-all shadow-[0_0_20px_rgba(191,90,242,0.35)] shrink-0">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}


