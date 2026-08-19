import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection?: string;
}

export function Navbar({ activeSection = 'hero' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open & listen for ESC
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { number: '01', label: 'ABOUT', href: '#about' },
    { number: '02', label: 'WORK', href: '#work' },
    { number: '03', label: 'VIDEO', href: '#video-editing' },
    { number: '04', label: 'SKILLS', href: '#skills' },
    { number: '05', label: 'PROCESS', href: '#process' },
    { number: '06', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 py-4 sm:py-6 px-4 sm:px-8 transition-all duration-500">
        <div className="max-w-[1280px] mx-auto">
          <div
            className={`apple-glass-pill rounded-full px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-500 flex items-center justify-between shadow-2xl ${
              isScrolled
                ? 'bg-black/60 border-white/15 backdrop-blur-2xl py-2 sm:py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
                : 'bg-white/[0.04] border-white/10 backdrop-blur-xl'
            }`}
          >
            {/* Apple Logo & Branding */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="group flex items-center gap-2.5 text-white focus:outline-none rounded-full"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2997FF] to-[#64D2FF] p-[1px] flex items-center justify-center shadow-[0_0_12px_rgba(41,151,255,0.4)]">
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center text-[10px] font-bold tracking-tighter text-white">
                  RM
                </div>
              </div>
              <span className="font-sans text-sm font-semibold tracking-tight text-white group-hover:text-[#2997FF] transition-colors">
                ROHIT MADANKAR
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                <Sparkles className="w-2.5 h-2.5 text-[#2997FF]" /> PORTFOLIO • 2026
              </span>
            </a>

            {/* Desktop Links - Apple Liquid Glass Pill Nav */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-white/70">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-cursor="GOTO"
                  className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all duration-200 relative focus:outline-none focus:text-[#2997FF]"
                >
                  <span>{link.label}</span>
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                data-cursor="HIRE"
                className="ml-3 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#0071E3] to-[#2997FF] hover:brightness-110 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(41,151,255,0.4)] hover:shadow-[0_0_25px_rgba(41,151,255,0.7)] flex items-center gap-1.5"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white px-3 py-1.5 bg-white/10 border border-white/15 rounded-full focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 text-[#2997FF]" /> : <Menu className="w-3.5 h-3.5 text-[#2997FF]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Glass Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl text-[#F5F5F7] flex flex-col justify-between p-8 sm:p-12 md:hidden"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2997FF] flex items-center justify-center text-[10px] font-bold text-black">
                  RM
                </div>
                <span className="font-sans text-base font-bold tracking-tight text-white uppercase">
                  ROHIT MADANKAR
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-white p-2 border border-white/15 rounded-full bg-white/5"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4 text-[#2997FF]" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="my-auto space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-[#2997FF]/50 transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono text-[#2997FF]">{link.number}</span>
                      <span className="text-2xl font-semibold tracking-tight text-white group-hover:text-[#2997FF] transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#2997FF] group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Details */}
            <div className="border-t border-white/10 pt-6 space-y-2">
              <p className="text-xs font-semibold text-white">{PERSONAL_INFO.title}</p>
              <p className="text-xs text-white/60">{PERSONAL_INFO.location} • {PERSONAL_INFO.phoneFormatted}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

