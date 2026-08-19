import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { fadeUpVariant } from '../utils/motionVariants';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-black border-t border-white/10 text-xs font-mono text-white/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUpVariant}
        className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Left: Branding & Role */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white uppercase text-sm tracking-widest font-sans">
            ROHIT MADANKAR
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="text-white/80">{PERSONAL_INFO.title}</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>{PERSONAL_INFO.location}</span>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-6">
          <span>© 2026 ROHIT MADANKAR. ALL RIGHTS RESERVED.</span>
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="TOP"
            className="p-2.5 apple-glass hover:bg-[#2997FF] hover:text-white border border-white/15 rounded-full transition-all text-white flex items-center justify-center cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.05)]"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </footer>
  );
}

