import { motion, useReducedMotion } from 'motion/react';
import { DESIGN_PRINCIPLES } from '../data/portfolioData';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function DesignPrinciples() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#BF5AF2]/10 rounded-full blur-[140px] pointer-events-none" />

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
              FOUNDATIONS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              DESIGN <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">PRINCIPLES</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-sans font-light">
            Core visual principles actively studied, practiced, and applied across every graphic project.
          </p>
        </motion.div>

        {/* Grid of Principles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {DESIGN_PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={fadeUpVariant}
              whileHover={{ y: -6 }}
              className="p-6 apple-glass-card rounded-3xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {principle.title}
                </h3>
                <span className="text-xs font-mono text-[#64D2FF] font-semibold">
                  0{index + 1}
                </span>
              </div>

              <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                {principle.description}
              </p>

              <div className="pt-2 text-[11px] font-mono text-white/80 bg-black/40 p-3 rounded-xl border border-white/10">
                <span className="text-[#2997FF] font-semibold block mb-0.5">APPLICATION:</span>
                <span>{principle.example}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

