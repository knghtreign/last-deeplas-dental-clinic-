import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, MoveHorizontal } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { playSoftClick, playChime, playMirrorSlideChime } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const SmileResultsMirror: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSoundPosRef = useRef<number>(50);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);

    // Audio cue throttle: trigger soft chime when moving past 10% thresholds
    if (Math.abs(percentage - lastSoundPosRef.current) > 12) {
      playMirrorSlideChime(percentage / 100);
      lastSoundPosRef.current = percentage;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    playSoftClick();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
      playSoftClick();
    }
  };

  const handlePreset = (pos: number) => {
    playChime();
    setSliderPos(pos);
    lastSoundPosRef.current = pos;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <section id="results" className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-4 sm:px-8 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0B1B33] bg-[#E2F743] px-3.5 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
              <Eye className="w-3.5 h-3.5 text-[#0B1B33]" />
              PHYSICAL MIRROR INSPECTION
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1B33] font-['Outfit',sans-serif] tracking-tight">
            Drag the <TextHighlight color="yellow" variant="pill">Dental Mirror</TextHighlight>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
            Glide the circular instrument across the smile to reveal the post-treatment brilliance.
          </p>
        </motion.div>

        {/* The Interactive Dental Mirror Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 180 }}
          className="relative max-w-4xl mx-auto rounded-[40px] bg-white p-4 sm:p-8 border-2 border-white shadow-[0_20px_60px_-15px_rgba(11,27,51,0.15)]"
        >
          
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full h-[320px] sm:h-[480px] rounded-[32px] overflow-hidden select-none cursor-ew-resize bg-slate-900 group"
          >
            {/* 1. Base Layer: BEFORE (Discolored/Slightly dull natural tone) */}
            <div className="absolute inset-0 w-full h-full filter saturate-75 brightness-90">
              <img
                src={CLINIC_IMAGES.smileResult}
                alt="Patient Smile Before Treatment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter sepia-[0.35] brightness-90"
              />
              {/* Subtle BEFORE label badge */}
              <div className="absolute top-6 left-6 bg-[#0B1B33]/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider font-['Outfit',sans-serif] border border-white/20">
                BEFORE: Discolored & Worn
              </div>
            </div>

            {/* 2. Top Layer: AFTER (Clipped at slider position, bright, luminous, perfect) */}
            <div
              style={{ width: `${sliderPos}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/90 z-10"
            >
              <div className="relative w-full h-full">
                <img
                  src={CLINIC_IMAGES.smileResult}
                  alt="Patient Smile After Treatment"
                  referrerPolicy="no-referrer"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    maxWidth: 'none',
                    height: '100%'
                  }}
                  className="w-full h-full object-cover filter brightness-110 contrast-105"
                />
                
                {/* Luminous flare on AFTER side */}
                <div className="absolute top-6 left-6 bg-[#E2F743] text-[#0B1B33] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md font-['Outfit',sans-serif] flex items-center gap-1.5 border border-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#0B1B33]" />
                  AFTER: Luminous & Balanced
                </div>
              </div>
            </div>

            {/* 3. Physical Dental Mirror Handle & Circular Lens at Slider Position */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center justify-center"
            >
              {/* Dental Mirror Handle (Top rod) */}
              <div className="w-1.5 h-16 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-md rounded-t-full" />

              {/* Circular Mirror Head with Chrome Rim */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#61A2EE]/30 via-white/80 to-white border-4 border-white shadow-[0_0_25px_rgba(11,27,51,0.4)] flex items-center justify-center backdrop-blur-xs">
                {/* Reflection highlight arc */}
                <div className="absolute inset-1 rounded-full border-2 border-white/60 pointer-events-none" />
                
                <div className="flex flex-col items-center justify-center text-[#0B1B33]">
                  <MoveHorizontal className="w-6 h-6 text-[#0B1B33] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest font-['Outfit',sans-serif]">
                    DRAG
                  </span>
                </div>
              </div>

              {/* Dental Mirror Handle (Bottom long stainless grip) */}
              <div className="w-2.5 h-full max-h-44 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 shadow-lg rounded-b-full border border-slate-300">
                {/* Knurled grip grooves */}
                <div className="w-full h-full flex flex-col justify-around py-4 opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-0.5 bg-slate-700" />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Quick preset positions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-sky-100/80">
            <div className="flex items-center gap-2">
              <motion.button
                id="preset-before-btn"
                onClick={() => handlePreset(0)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-xs font-black px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  sliderPos === 0 ? 'bg-[#0B1B33] text-[#E2F743] shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Full Before
              </motion.button>
              <motion.button
                id="preset-split-btn"
                onClick={() => handlePreset(50)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-xs font-black px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  sliderPos === 50 ? 'bg-[#0B1B33] text-[#E2F743] shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Split 50/50
              </motion.button>
              <motion.button
                id="preset-after-btn"
                onClick={() => handlePreset(100)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-xs font-black px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  sliderPos === 100 ? 'bg-[#0B1B33] text-[#E2F743] shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Full After
              </motion.button>
            </div>

            <span className="text-xs font-black text-[#61A2EE] font-['Outfit',sans-serif]">
              {Math.round(sliderPos)}% Reveal
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
