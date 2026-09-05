import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Phone, X, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { CLINIC_DETAILS } from '../data/clinicData';
import { playSoftClick, toggleSound, isSoundEnabled } from '../utils/soundEffects';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'TREATMENTS', href: '#treatments' },
    { label: 'SMILES', href: '#results' },
    { label: 'DOCTOR', href: '#doctor' },
    { label: 'CLINIC', href: '#location' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playSoftClick();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSoftClick();
  };

  return (
    <>
      <header id="main-nav-header" className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto gap-2">
          {/* Logo / Brand badge */}
          <a
            href="#"
            id="nav-logo-btn"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 bg-white/95 hover:bg-white backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-sky-100/90 shadow-[0_4px_16px_rgba(11,27,51,0.08)] transition-all duration-300 hover:scale-[1.02] shrink min-w-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#61A2EE] to-[#E2F743] flex items-center justify-center text-[#0B1B33] shadow-inner font-black text-xs shrink-0">
              🦷
            </div>
            <div className="text-left min-w-0">
              <span className="block text-[11px] sm:text-xs tracking-wider uppercase font-black text-[#0B1B33] font-['Outfit',sans-serif] truncate">
                Dr. Deepal's <span className="text-[#61A2EE]">SmileLab</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-bold tracking-tight truncate">
                Malabar Hill · 5.0 ★ (140+ reviews)
              </span>
            </div>
          </a>

          {/* Minimal Central Capsule Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="center-menu-trigger"
              onClick={() => {
                playSoftClick();
                setIsOpen(!isOpen);
              }}
              className="group relative flex items-center gap-1.5 sm:gap-2 bg-[#0B1B33] hover:bg-[#142d54] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E2F743] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#61A2EE]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
              <span className="text-[11px] sm:text-xs tracking-widest font-black uppercase font-['Outfit',sans-serif]">
                {isOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={handleSoundToggle}
              aria-label="Toggle sound effects"
              title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-sky-100 flex items-center justify-center text-[#0B1B33] hover:text-[#61A2EE] transition-all duration-200 shadow-sm shrink-0"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B1B33]" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />}
            </button>

            {/* Quick Call */}
            <a
              id="nav-direct-phone-link"
              href={`tel:${CLINIC_DETAILS.phoneClean}`}
              className="hidden md:flex items-center gap-2 bg-white/95 hover:bg-white px-4 py-2.5 rounded-full border border-sky-100 text-xs font-bold text-[#0B1B33] hover:text-[#61A2EE] transition-all duration-200 shadow-sm hover:shadow"
            >
              <Phone className="w-3.5 h-3.5 text-[#61A2EE]" />
              <span>{CLINIC_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Center-Expanding Minimal Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div id="center-nav-modal" className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0B1B33]/70 backdrop-blur-xl"
            />

            {/* Expanding Circle / Card from Center */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 6 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-white via-[#F4F9FF] to-[#E6F2FF] rounded-[36px] p-8 sm:p-12 shadow-2xl border-2 border-white/80 overflow-hidden"
            >
              {/* Decorative subtle background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#61A2EE]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E2F743]/20 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

              {/* Close Button */}
              <button
                id="close-menu-btn"
                onClick={() => {
                  playSoftClick();
                  setIsOpen(false);
                }}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0B1B33] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 text-center">
                <span className="inline-block text-[11px] font-bold tracking-widest text-[#0B1B33] uppercase bg-[#E2F743] px-3.5 py-1 rounded-full mb-4 shadow-sm font-['Outfit',sans-serif]">
                  Dr. Deepal's SmileLab · Malabar Hill
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B33] font-['Outfit',sans-serif] tracking-tight mb-8">
                  Navigate Experience
                </h3>

                {/* Minimalist Menu List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.label}
                      id={`nav-link-${item.label.toLowerCase()}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      onClick={() => handleNavClick(item.href)}
                      className="group flex items-center justify-between bg-white/90 hover:bg-[#0B1B33] text-[#0B1B33] hover:text-white p-4 rounded-2xl border border-sky-100 shadow-sm hover:shadow-md transition-all duration-300 text-left"
                    >
                      <span className="text-base font-extrabold font-['Outfit',sans-serif] tracking-wide">
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#61A2EE] group-hover:text-[#E2F743] group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>

                {/* Direct Action */}
                <button
                  id="menu-book-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-[#E2F743] hover:bg-[#d8f035] text-[#0B1B33] font-black text-sm py-4 px-6 rounded-2xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-2 border-white"
                >
                  <Sparkles className="w-4 h-4 text-[#0B1B33]" />
                  <span>BOOK YOUR CONSULTATION</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

