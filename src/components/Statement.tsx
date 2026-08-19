import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Statement() {
  return (
    <section className="py-32 bg-black relative overflow-hidden text-center">
      {/* Liquid Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071E3]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#2997FF] font-semibold block">
            CREATIVE PHILOSOPHY
          </span>

          <h2 className="text-[clamp(2.8rem,7vw,7rem)] font-bold tracking-tight text-white leading-[0.98] max-w-5xl mx-auto">
            "{PERSONAL_INFO.statement.quoteMain} <br />
            <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">
              {PERSONAL_INFO.statement.quoteHighlighted}"
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-white/70 font-sans max-w-xl mx-auto font-light tracking-wide">
            {PERSONAL_INFO.statement.subtext}
          </p>

          <div className="pt-8 flex items-center justify-center gap-4 text-xs font-mono text-white/40">
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="font-medium text-white/60">{PERSONAL_INFO.name} • 2026</span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

