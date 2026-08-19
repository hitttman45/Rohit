import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Ticker() {
  const items = PERSONAL_INFO.tickerItems;

  return (
    <div className="w-full bg-white/[0.02] backdrop-blur-xl border-y border-white/10 py-4 overflow-hidden select-none relative z-20">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
        className="flex items-center gap-8 whitespace-nowrap w-max"
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-xs font-mono tracking-[0.25em] font-medium uppercase text-white/70 hover:text-[#2997FF] transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2997FF] shadow-[0_0_8px_#2997FF]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

