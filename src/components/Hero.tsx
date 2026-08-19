import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  fadeUpVariant,
  fadeInRightVariant,
  scaleUpVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : fadeUpVariant;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black text-[#F5F5F7]"
    >
      {/* Liquid Ambient Gradient Lights (Apple Vision style drift) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.3 }
            : {
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.45, 0.25],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#0071E3]/30 via-[#2997FF]/20 to-[#64D2FF]/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.25 }
            : {
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.35, 0.2],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-[#BF5AF2]/25 via-[#5E5CE6]/20 to-[#0071E3]/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Apple Typography & CTA (7 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2, margin: '-20px 0px -20px 0px' }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8"
          >
            {/* Top Apple Glass Pill Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-medium text-white/90 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse shadow-[0_0_8px_#30D158]" />
                <span className="text-white/80 font-mono tracking-wider text-[11px]">
                  {PERSONAL_INFO.name.toUpperCase()}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#2997FF] font-semibold text-[11px] uppercase tracking-widest">
                  GRAPHIC DESIGNER
                </span>
              </div>

              <span className="text-xs font-mono text-white/50 tracking-wider hidden sm:inline">
                {PERSONAL_INFO.location}
              </span>
            </motion.div>

            {/* Main Apple Keynote Title */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="block text-xs font-mono uppercase tracking-[0.3em] text-[#2997FF] font-semibold">
                PORTFOLIO 2026
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.98]">
                ROHIT <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="apple-blue-gradient-text inline-block font-serif-editorial italic font-normal"
                >
                  MADANKAR.
                </motion.span>
              </h1>
            </motion.div>

            {/* Introduction */}
            <motion.p variants={itemVariants} className="max-w-xl text-lg sm:text-xl text-white/70 font-sans font-light leading-relaxed">
              {PERSONAL_INFO.shortIntro}
            </motion.p>

            {/* Apple Style CTAs */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleScrollTo('#work')}
                data-cursor="WORK"
                className="pl-7 pr-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:brightness-110 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(41,151,255,0.4)] flex items-center gap-3 cursor-pointer group"
              >
                <span>EXPLORE WORK</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0071E3] transition-all duration-300">
                  <ChevronRight className="w-4 h-4 text-white group-hover:text-[#0071E3] transition-colors" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleScrollTo('#contact')}
                data-cursor="HELLO"
                className="apple-glass pl-7 pr-4 py-3 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 border border-white/15 flex items-center gap-3 cursor-pointer group"
              >
                <span>GET IN TOUCH</span>
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#2997FF] group-hover:text-white transition-all duration-300">
                  <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </span>
              </motion.button>
            </motion.div>

            {/* Apple Glass Tool Badges */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                PRIMARY SOFTWARE
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium hover:border-[#2997FF]/50 hover:text-[#2997FF] transition-all">
                  Adobe Photoshop
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium hover:border-[#2997FF]/50 hover:text-[#2997FF] transition-all">
                  Canva
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium hover:border-[#2997FF]/50 hover:text-[#2997FF] transition-all">
                  CorelDRAW
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Apple Liquid Glass Frame Display (5 columns) */}
          <motion.div
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : scaleUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2, margin: '-20px 0px -20px 0px' }}
            transition={TRANSITION_SMOOTH}
            className="lg:col-span-5 relative"
          >
            {/* Liquid Glass Display Container */}
            <motion.div
              whileHover={{ y: -8, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden apple-glass-card shadow-[0_30px_70px_rgba(0,0,0,0.8)] group p-2.5"
            >
              {/* Inner Picture Housing with Rounded Corners */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                
                {/* Hero Portrait Image */}
                <img
                  src={PERSONAL_INFO.profilePhoto}
                  alt={`${PERSONAL_INFO.name} - Graphic Designer Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Apple Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10 pointer-events-none" />

                {/* Top Corner Glass Watermark */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <span className="apple-glass-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-white/90 font-medium">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="apple-glass-pill px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-[#64D2FF] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2997FF]" /> 2026
                  </span>
                </div>

                {/* Bottom Frame Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pt-3 flex items-center justify-between text-xs font-mono">
                  <div className="apple-glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white/90">
                    <Compass className="w-3.5 h-3.5 text-[#30D158]" />
                    <span>{PERSONAL_INFO.cityState}</span>
                  </div>
                  <div className="apple-glass-pill px-3 py-1.5 rounded-full text-[#2997FF] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GRAPHICS</span>
                  </div>
                </div>

              </div>

              {/* Specular Edge Gloss Reflection */}
              <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-[#2997FF]/50 transition-colors duration-500" />
            </motion.div>

            {/* Floating Apple Liquid Pill Tag */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-2 sm:left-4 z-30 apple-glass-pill px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3 text-xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#30D158] animate-pulse shadow-[0_0_10px_#30D158]" />
              <span className="text-white font-medium">{PERSONAL_INFO.availability}</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


