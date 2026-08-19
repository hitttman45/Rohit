import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Calendar, Target, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  fadeUpVariant,
  fadeInLeftVariant,
  fadeInRightVariant,
  staggerContainerVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Liquid background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0071E3]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header Tag */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#2997FF] mb-12"
        >
          <span>01</span>
          <span className="w-8 h-[1px] bg-[#2997FF]" />
          <span>ABOUT ROHIT</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeInLeftVariant}
            className="lg:col-span-5 space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              DESIGNING <br />
              WITH <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">CURIOSITY.</span>
            </h2>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase pt-2">
              {PERSONAL_INFO.title} • 2026
            </p>
          </motion.div>

          {/* Right Column: Exact Copy & Apple Bento Glass Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : staggerContainerVariant}
            className="lg:col-span-7 space-y-10"
          >
            {/* Bio Paragraph inside Liquid Glass Feature Container */}
            <motion.div
              variants={fadeUpVariant}
              className="apple-glass-card p-8 rounded-3xl relative overflow-hidden"
            >
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-sans font-light">
                "{PERSONAL_INFO.aboutBio}"
              </p>
            </motion.div>

            {/* Structured Metadata Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <motion.div
                variants={fadeUpVariant}
                whileHover={{ y: -4 }}
                className="apple-glass-card p-5 rounded-2xl space-y-2"
              >
                <div className="flex items-center gap-2 text-[#2997FF] text-xs font-mono uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>LOCATION</span>
                </div>
                <p className="text-base font-semibold text-white">{PERSONAL_INFO.cityState}</p>
                <p className="text-xs text-white/50">{PERSONAL_INFO.country}</p>
              </motion.div>

              <motion.div
                variants={fadeUpVariant}
                whileHover={{ y: -4 }}
                className="apple-glass-card p-5 rounded-2xl space-y-2"
              >
                <div className="flex items-center gap-2 text-[#64D2FF] text-xs font-mono uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>TIMELINE</span>
                </div>
                <p className="text-base font-semibold text-white">{PERSONAL_INFO.careerStart}</p>
                <p className="text-xs text-white/50">Active Practice</p>
              </motion.div>

              <motion.div
                variants={fadeUpVariant}
                whileHover={{ y: -4 }}
                className="apple-glass-card p-5 rounded-2xl space-y-2"
              >
                <div className="flex items-center gap-2 text-[#BF5AF2] text-xs font-mono uppercase">
                  <Target className="w-4 h-4" />
                  <span>FOCUS</span>
                </div>
                <p className="text-base font-semibold text-white">Digital & Graphic</p>
                <p className="text-xs text-white/50">Visual Design</p>
              </motion.div>

            </div>

            {/* Mindset Statement Pill */}
            <motion.div
              variants={fadeUpVariant}
              className="apple-glass p-6 rounded-2xl border-l-4 border-[#2997FF] flex items-start gap-4 text-xs text-white/80"
            >
              <CheckCircle2 className="w-5 h-5 text-[#30D158] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-sans font-light">
                Positioned on practical design execution, craftsmanship, continuous visual iteration, and delivering functional graphics for modern digital platforms.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

