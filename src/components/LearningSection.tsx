import { motion, useReducedMotion } from 'motion/react';
import { Compass, BookOpen, Sparkles } from 'lucide-react';
import {
  scaleUpVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function LearningSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#2997FF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : scaleUpVariant}
          className="max-w-4xl mx-auto p-8 sm:p-12 lg:p-16 apple-glass-card rounded-3xl relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2997FF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#2997FF]">
              <span className="flex items-center gap-1.5 px-3.5 py-1 bg-white/10 border border-white/15 rounded-full uppercase font-medium text-white/90">
                <Compass className="w-3.5 h-3.5 text-[#2997FF]" /> 2026 PRACTICE
              </span>
              <span className="text-white/50 font-light">CONTINUOUS DEVELOPMENT</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              ALWAYS <br className="hidden sm:inline" />
              <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">LEARNING.</span>
            </h2>

            <p className="text-base sm:text-xl text-white/80 font-sans font-light max-w-2xl leading-relaxed">
              "Graphic design is a continuous process of exploration. I’m constantly practicing, studying visual references and refining my approach to create stronger and more intentional work."
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-8 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#64D2FF]" />
                <span className="font-medium">VISUAL REFERENCE STUDY</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2997FF]" />
                <span className="font-medium">HANDS-ON EXPERIMENTATION</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

