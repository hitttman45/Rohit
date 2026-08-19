import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest('[data-cursor], button, a, [role="button"], .cursor-pointer');
      if (hoverable) {
        setIsHovered(true);
        const explicitText = hoverable.getAttribute('data-cursor');
        if (explicitText) {
          setCursorText(explicitText);
        } else if (hoverable.tagName === 'A' || hoverable.tagName === 'BUTTON') {
          setCursorText('EXPLORE');
        } else {
          setCursorText('VIEW');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    // Smooth fluid trailing loop
    const animateTrail = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.22;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.22;
      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    requestRef.current = requestAnimationFrame(animateTrail);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Liquid Trailing Ambient Glow */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99998] transition-opacity duration-300 select-none"
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0)`,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-500 ease-out ${
            isHovered
              ? 'w-24 h-24 bg-gradient-to-r from-[#2997FF]/25 via-[#64D2FF]/20 to-[#BF5AF2]/20 blur-xl scale-125'
              : 'w-14 h-14 bg-gradient-to-tr from-[#2997FF]/20 to-[#64D2FF]/15 blur-lg'
          }`}
        />
      </div>

      {/* Main Liquid Glass Pointer */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out select-none"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          
          {/* Liquid Glass Capsule / Orb */}
          <div
            className={`relative rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-2xl overflow-hidden ${
              isHovered
                ? 'px-4 py-2.5 bg-gradient-to-b from-white/20 via-black/40 to-black/70 border border-white/40 shadow-[0_12px_40px_rgba(0,113,227,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-2px_6px_rgba(0,0,0,0.5)] scale-105 gap-2'
                : isClicking
                ? 'w-9 h-9 bg-gradient-to-b from-white/30 via-[#0071E3]/50 to-black/80 border border-white/60 shadow-[0_0_20px_rgba(41,151,255,0.8),inset_0_1px_2px_rgba(255,255,255,0.9)] scale-90'
                : 'w-10 h-10 bg-gradient-to-b from-white/25 via-black/40 to-black/70 border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(41,151,255,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.75),inset_0_-2px_4px_rgba(0,0,0,0.4)]'
            }`}
          >
            {/* Top Glossy Liquid Reflection highlight (Gives authentic 3D refractive glass curvature) */}
            <div className="absolute -top-1 left-2 right-2 h-3.5 bg-gradient-to-b from-white/60 to-transparent rounded-full opacity-70 pointer-events-none" />

            {/* Inner Prismatic Refraction shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2997FF]/15 to-[#64D2FF]/20 pointer-events-none" />

            {/* Default State: Sleek Dynamic Liquid Arrow */}
            {!isHovered ? (
              <div className="relative z-10 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                >
                  <defs>
                    <linearGradient id="liquidArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#E0F2FE" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                    <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#2997FF" floodOpacity="0.8" />
                    </filter>
                  </defs>
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="url(#liquidArrowGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#liquidGlow)"
                  />
                </svg>
              </div>
            ) : (
              /* Hovered State: Glass Pill with Typography + Liquid Arrow */
              <div className="relative z-10 flex items-center gap-2 text-white whitespace-nowrap">
                <span className="text-[11px] font-bold tracking-widest uppercase font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0F2FE] to-[#7DD3FC] drop-shadow-md">
                  {cursorText || 'VIEW'}
                </span>
                
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="translate-x-0.5 -translate-y-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="#64D2FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}


