import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sliders, Grid, Eye, RefreshCw, Layers, Download, Sparkles } from 'lucide-react';
import {
  fadeUpVariant,
  fadeInLeftVariant,
  fadeInRightVariant,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

export function PosterStudioPlayground() {
  const shouldReduceMotion = useReducedMotion();
  const [headline, setHeadline] = useState('URBAN COMPOSITION');
  const [subtext, setSubtext] = useState('EXPLORING TYPOGRAPHY, GRID & VISUAL HIERARCHY');
  const [theme, setTheme] = useState<'electric' | 'cyan' | 'bone' | 'mono'>('electric');
  const [fontFamily, setFontFamily] = useState<'serif' | 'display' | 'sans'>('serif');
  const [showGrid, setShowGrid] = useState(true);
  const [showGrain, setShowGrain] = useState(true);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [fontScale, setFontScale] = useState(100);

  const resetPlayground = () => {
    setHeadline('URBAN COMPOSITION');
    setSubtext('EXPLORING TYPOGRAPHY, GRID & VISUAL HIERARCHY');
    setTheme('electric');
    setFontFamily('serif');
    setShowGrid(true);
    setShowGrain(true);
    setAlignment('left');
    setFontScale(100);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'electric':
        return {
          bg: 'bg-gradient-to-br from-[#0B1528] via-[#0E1B33] to-[#080B12]',
          accent: '#2997FF',
          accentBg: 'bg-[#2997FF]',
          text: 'text-white',
          badge: 'border-[#2997FF] text-[#2997FF]',
        };
      case 'cyan':
        return {
          bg: 'bg-gradient-to-br from-[#0D2422] via-[#0B1C1B] to-[#080B12]',
          accent: '#64D2FF',
          accentBg: 'bg-[#64D2FF]',
          text: 'text-white',
          badge: 'border-[#64D2FF] text-[#64D2FF]',
        };
      case 'bone':
        return {
          bg: 'bg-gradient-to-br from-[#1C1A17] via-[#24211D] to-[#080B12]',
          accent: '#E9E5DC',
          accentBg: 'bg-[#E9E5DC]',
          text: 'text-[#E9E5DC]',
          badge: 'border-[#E9E5DC] text-[#E9E5DC]',
        };
      case 'mono':
      default:
        return {
          bg: 'bg-gradient-to-br from-[#181818] via-[#0F0F0F] to-[#080B12]',
          accent: '#FFFFFF',
          accentBg: 'bg-white',
          text: 'text-white',
          badge: 'border-white text-white',
        };
    }
  };

  const currentTheme = getThemeStyles();

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'serif':
        return 'font-serif-editorial';
      case 'display':
        return 'font-display-modern';
      case 'sans':
      default:
        return 'font-sans-clean';
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden text-[#F5F5F7]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#0071E3]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariant}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#64D2FF] mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>INTERACTIVE LAB</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              POSTER & TYPE <span className="apple-blue-gradient-text italic font-serif-editorial font-normal">STUDIO</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-white/60 font-sans font-light">
            Test and adjust graphic design parameters in real-time. Experience how typography scale, baseline grids, and visual contrast alter composition mood.
          </p>
        </motion.div>

        {/* Studio Controls & Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (5 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeInLeftVariant}
            className="lg:col-span-5 apple-glass-card p-6 sm:p-8 rounded-3xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2997FF]" /> COMPOSITION CONTROLS
              </span>
              <button
                type="button"
                onClick={resetPlayground}
                className="text-[11px] font-mono text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> RESET
              </button>
            </div>

            {/* Input Headline */}
            <div className="space-y-2">
              <label htmlFor="headline-input" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
                HEADLINE TEXT
              </label>
              <input
                id="headline-input"
                type="text"
                value={headline || ''}
                onChange={(e) => setHeadline(e.target.value)}
                maxLength={30}
                className="w-full bg-black/40 border border-white/15 focus:border-[#2997FF] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none transition-all"
              />
            </div>

            {/* Input Subtext */}
            <div className="space-y-2">
              <label htmlFor="subtext-input" className="text-xs font-mono text-white/60 uppercase tracking-wider block">
                SUBTITLE / CAPTION
              </label>
              <input
                id="subtext-input"
                type="text"
                value={subtext || ''}
                onChange={(e) => setSubtext(e.target.value)}
                maxLength={60}
                className="w-full bg-black/40 border border-white/15 focus:border-[#2997FF] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none transition-all"
              />
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider block">
                COLOR PALETTE PRESET
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('electric')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    theme === 'electric' ? 'bg-[#2997FF] text-white border-[#2997FF] font-bold shadow-[0_0_12px_rgba(41,151,255,0.4)]' : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  ELECTRIC
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('cyan')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    theme === 'cyan' ? 'bg-[#64D2FF] text-black border-[#64D2FF] font-bold shadow-[0_0_12px_rgba(100,210,255,0.4)]' : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  CYAN
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('bone')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    theme === 'bone' ? 'bg-[#E9E5DC] text-black border-[#E9E5DC] font-bold shadow-[0_0_12px_rgba(233,229,220,0.4)]' : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  BONE
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('mono')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    theme === 'mono' ? 'bg-white text-black border-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  MONO
                </button>
              </div>
            </div>

            {/* Typography Selection */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider block">
                DISPLAY TYPOGRAPHY STYLE
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFontFamily('serif')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    fontFamily === 'serif' ? 'bg-white/20 border-[#2997FF] text-white font-bold' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  EDITORIAL SERIF
                </button>
                <button
                  type="button"
                  onClick={() => setFontFamily('display')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    fontFamily === 'display' ? 'bg-white/20 border-[#2997FF] text-white font-bold' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  MODERN SYNE
                </button>
                <button
                  type="button"
                  onClick={() => setFontFamily('sans')}
                  className={`p-2.5 rounded-xl text-[10px] font-mono border transition-all cursor-pointer ${
                    fontFamily === 'sans' ? 'bg-white/20 border-[#2997FF] text-white font-bold' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5'
                  }`}
                >
                  CLEAN SANS
                </button>
              </div>
            </div>

            {/* Typography Scale Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-white/60">
                <span>TYPOGRAPHY SCALE</span>
                <span className="text-white font-semibold">{fontScale}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={140}
                value={Number.isFinite(fontScale) ? fontScale : 100}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFontScale(Number.isFinite(val) ? val : 100);
                }}
                className="w-full accent-[#2997FF] bg-black/50 rounded-lg cursor-pointer"
              />
            </div>

            {/* Alignment & Grid Toggles */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-white/60 uppercase block">ALIGNMENT</span>
                <div className="flex gap-1">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setAlignment(align)}
                      className={`flex-1 py-1.5 text-[10px] font-mono uppercase rounded-lg border cursor-pointer transition-all ${
                        alignment === align ? 'bg-[#2997FF] text-white border-[#2997FF] font-bold shadow-[0_0_10px_rgba(41,151,255,0.4)]' : 'bg-black/30 text-white/60 border-white/10 hover:bg-white/5'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-white/60 uppercase block">OVERLAYS</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGrid(!showGrid)}
                    className={`flex-1 py-1.5 text-[10px] font-mono uppercase rounded-lg border flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      showGrid ? 'bg-white/20 border-[#64D2FF] text-white font-semibold' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Grid className="w-3 h-3" /> GRID
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGrain(!showGrain)}
                    className={`flex-1 py-1.5 text-[10px] font-mono uppercase rounded-lg border flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      showGrain ? 'bg-white/20 border-[#64D2FF] text-white font-semibold' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Eye className="w-3 h-3" /> GRAIN
                  </button>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Live Preview Canvas (7 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeInRightVariant}
            className="lg:col-span-7 relative"
          >
            <motion.div
              layout
              className={`relative aspect-[3/4] w-full max-w-lg mx-auto rounded-3xl overflow-hidden border border-white/20 ${currentTheme.bg} p-8 sm:p-12 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 ${
                showGrain ? 'editorial-grain' : ''
              }`}
            >
              {/* Optional Grid Lines Overlay */}
              {showGrid && (
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              )}

              {/* Crosshair Corner Marks */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30">+ 001</div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-white/30">GRID • 2026</div>

              {/* Top Header Stamp */}
              <div className="z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <span className={`text-[10px] font-mono tracking-widest uppercase border px-2.5 py-0.5 rounded-full font-semibold ${currentTheme.badge}`}>
                  POSTER LAB FIG. 01
                </span>
                <span className="text-[10px] font-mono text-white/60 flex items-center gap-1 font-light">
                  <Sparkles className="w-3 h-3 text-[#64D2FF]" /> ROHIT MADANKAR
                </span>
              </div>

              {/* Live Headline & Subtext */}
              <div className={`my-auto z-10 space-y-4 text-${alignment}`}>
                <motion.h3
                  key={`${headline}-${fontFamily}-${fontScale}`}
                  initial={{ opacity: 0.8, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${getFontFamilyClass()} ${currentTheme.text} font-bold leading-[0.95] uppercase tracking-tight transition-all duration-300`}
                  style={{ fontSize: `${(fontScale / 100) * 2.75}rem` }}
                >
                  {headline || 'DESIGN COMPOSITION'}
                </motion.h3>
                <motion.p
                  key={subtext}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono text-white/80 max-w-sm uppercase tracking-widest font-light"
                >
                  {subtext || 'EXPLORING TYPOGRAPHY, GRID & VISUAL HIERARCHY'}
                </motion.p>
              </div>

              {/* Bottom Specs */}
              <div className="z-10 pt-4 border-t border-white/10 flex items-end justify-between text-[10px] font-mono text-white/50">
                <div>
                  <p className="text-white font-bold">CHHINDWARA, MP</p>
                  <p>CORE SKILLS • 2026</p>
                </div>
                <div className="text-right">
                  <p>SCALE: {fontScale}%</p>
                  <p>STYLE: {fontFamily.toUpperCase()}</p>
                </div>
              </div>

              {/* Border Accent Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-colors duration-300"
                style={{ backgroundColor: currentTheme.accent }}
              />
            </motion.div>

            {/* Live Spec Export Badge */}
            <div className="mt-4 apple-glass p-4 rounded-2xl flex flex-wrap items-center justify-between text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[#2997FF]" />
                <span>LIVE SYSTEM SPECIFICATION GENERATED</span>
              </div>
              <span className="text-white font-semibold">
                THEME: {theme.toUpperCase()} • FONT: {fontFamily.toUpperCase()}
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

