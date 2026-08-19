import { motion, useReducedMotion } from 'motion/react';
import { PRIMARY_TOOLS } from '../data/portfolioData';
import { Image, Layout, PenTool, CheckCircle, Cpu } from 'lucide-react';
import {
  fadeUpVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Image':
        return <Image className="w-6 h-6 text-[#2997FF]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#64D2FF]" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-[#BF5AF2]" />;
      default:
        return <Cpu className="w-6 h-6 text-[#2997FF]" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Ambient background blur */}
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#2997FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2997FF] mb-12"
        >
          <span>02</span>
          <span className="w-8 h-[1px] bg-[#2997FF]" />
          <span>TOOLS & SKILLS</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="max-w-3xl mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            DESIGN SOFTWARE & <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">PRACTICAL TOOLKIT</span>
          </h2>
          <p className="text-base text-white/60 font-sans font-light leading-relaxed">
            Hands-on familiarity with industry-standard design tools for digital graphics, photo manipulation, vector layout, and creative content production.
          </p>
        </motion.div>

        {/* Software Cards Apple Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PRIMARY_TOOLS.map((tool, idx) => (
            <motion.div
              key={tool.name}
              variants={fadeUpVariant}
              whileHover={{ y: -8 }}
              className="group apple-glass-card p-8 rounded-3xl flex flex-col justify-between space-y-8 relative overflow-hidden"
            >
              {/* Category Badge & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 border border-white/15 text-[#2997FF] rounded-full font-semibold">
                    {tool.category}
                  </span>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-[#2997FF]/50 transition-all duration-300">
                    {getIcon(tool.iconName)}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#2997FF] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-mono text-[#64D2FF]">
                    {tool.label}
                  </p>
                </div>

                <p className="text-xs text-white/60 font-sans font-light leading-relaxed pt-2">
                  {tool.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  PRACTICAL APPLICATIONS
                </p>
                <ul className="space-y-2 text-xs font-sans text-white/90 font-light">
                  {tool.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#30D158] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Specular Sheen Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2997FF]/0 to-transparent group-hover:via-[#2997FF] transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Software & Methodologies Summary Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="mt-12 apple-glass p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6 text-xs text-white/60 font-light"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-white font-semibold uppercase tracking-wider font-mono">CREATIVE METHODOLOGY:</span>
            <span>Digital Composition • Vector Precision • Color Grading • Typography Pairing • Grid Systems</span>
          </div>
          <span className="font-mono text-[11px] text-[#2997FF] font-semibold">
            2026 PRACTICE
          </span>
        </motion.div>

      </div>
    </section>
  );
}

