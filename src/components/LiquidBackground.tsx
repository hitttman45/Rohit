import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function LiquidBackground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Trigger smooth liquid water drop ripple on pointer click
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      // Don't spawn ripples on interactive buttons or form inputs if preferred, or spawn everywhere
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-10), newRipple]);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none">
      
      {/* Dynamic Apple Ambient Glow Lights */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.2, 0.95, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-gradient-to-tr from-[#0071E3] via-[#2997FF] to-[#64D2FF] rounded-full blur-[160px] opacity-25"
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[45%] right-[-5%] w-[550px] h-[550px] bg-gradient-to-br from-[#BF5AF2] via-[#5E5CE6] to-[#0071E3] rounded-full blur-[170px] opacity-20"
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 30, 0],
          scale: [0.9, 1.15, 0.9],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        className="absolute bottom-[-10%] left-[30%] w-[650px] h-[650px] bg-gradient-to-tr from-[#0071E3] via-[#30D158]/30 to-[#64D2FF] rounded-full blur-[180px] opacity-15"
      />

      {/* iOS Liquid Droplets (Organic Water Mercury Drops Floating in Background) */}
      <div className="absolute inset-0 opacity-40">
        
        {/* Drop 1 - Top Right Liquid Orb */}
        <motion.div
          animate={{
            y: [0, -35, 20, 0],
            x: [0, 20, -15, 0],
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[18%] right-[12%] w-36 h-36 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md border border-white/25 rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),0_15px_35px_rgba(0,0,0,0.5)]"
        />

        {/* Drop 2 - Mid Left Small Glass Droplet */}
        <motion.div
          animate={{
            y: [0, 30, -20, 0],
            x: [0, -25, 15, 0],
            borderRadius: [
              '50% 50% 70% 30% / 30% 60% 40% 70%',
              '70% 30% 50% 50% / 60% 40% 60% 40%',
              '50% 50% 70% 30% / 30% 60% 40% 70%',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[42%] left-[8%] w-24 h-24 bg-gradient-to-br from-white/25 via-white/5 to-transparent backdrop-blur-md border border-white/30 rounded-full shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),0_12px_28px_rgba(0,0,0,0.6)]"
        />

        {/* Drop 3 - Bottom Right Medium Glass Droplet */}
        <motion.div
          animate={{
            y: [0, -40, 25, 0],
            x: [0, -30, 20, 0],
            borderRadius: [
              '40% 60% 60% 40% / 60% 30% 70% 40%',
              '60% 40% 40% 60% / 40% 70% 30% 60%',
              '40% 60% 60% 40% / 60% 30% 70% 40%',
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[22%] right-[18%] w-28 h-28 bg-gradient-to-br from-white/20 via-[#2997FF]/10 to-transparent backdrop-blur-md border border-white/25 rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),0_15px_30px_rgba(0,0,0,0.5)]"
        />

        {/* Drop 4 - Floating Tiny Water Beads */}
        <motion.div
          animate={{
            y: [0, -15, 10, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[65%] left-[25%] w-12 h-12 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-sm border border-white/35 rounded-full shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)]"
        />

      </div>

      {/* iOS Liquid Water Drop Ripple Physics Effect on Click */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 3.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
            }}
            className="absolute w-24 h-24 rounded-full border-2 border-[#2997FF]/60 shadow-[0_0_20px_rgba(41,151,255,0.5),inset_0_0_15px_rgba(255,255,255,0.3)] bg-[#2997FF]/5 backdrop-blur-xs pointer-events-none z-10"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
