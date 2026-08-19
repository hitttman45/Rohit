import { motion, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#0071E3]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2997FF] mb-12"
        >
          <span>04</span>
          <span className="w-8 h-[1px] bg-[#2997FF]" />
          <span>DESIGN WORKFLOW</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="max-w-3xl mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            MY DESIGN <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">PROCESS</span>
          </h2>
          <p className="text-base text-white/60 font-sans font-light leading-relaxed">
            A structured five-step approach ensuring visual clarity, purposeful composition, precise execution, and consistent quality across every creative deliverable.
          </p>
        </motion.div>

        {/* 5-Step Process Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUpVariant}
              whileHover={{ y: -6 }}
              className="group relative p-6 apple-glass-card rounded-3xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-3xl font-bold font-mono text-[#2997FF] block">
                  {step.number}
                </span>

                <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#64D2FF] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-[#2997FF] uppercase tracking-wider block font-semibold">
                  DELIVERABLE
                </span>
                <span className="text-[11px] font-mono text-white/90 block">
                  {step.deliverables}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

