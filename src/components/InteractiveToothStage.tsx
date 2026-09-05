import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Shield, Check, Play, RefreshCw } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';
import { TreatmentType } from '../types';
import { playSparkle, playPop, playSoftClick } from '../utils/soundEffects';
import { TextHighlight } from './AnimatedText';

interface InteractiveToothStageProps {
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const InteractiveToothStage: React.FC<InteractiveToothStageProps> = ({
  onSelectTreatmentForBooking
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>('whitening');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const currentInfo = TREATMENTS.find((t) => t.id === selectedTreatment) || TREATMENTS[0];

  const handleSelectTreatment = (id: TreatmentType) => {
    if (id !== selectedTreatment) {
      setSelectedTreatment(id);
      setIsAnimating(true);
      setAnimKey((prev) => prev + 1);
      playPop();
      if (id === 'whitening') {
        setTimeout(() => playSparkle(), 600);
      }
    }
  };

  const handleReplay = () => {
    setIsAnimating(true);
    setAnimKey((prev) => prev + 1);
    playPop();
    if (selectedTreatment === 'whitening') {
      setTimeout(() => playSparkle(), 600);
    }
  };

  return (
    <section id="interactive-stage" className="relative py-8 sm:py-12 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EAF6F1] via-white to-[#EAF6F1] overflow-hidden z-10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4BB88E]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Title with Animated Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3.5 py-1.5 rounded-full mb-2.5 shadow-sm font-['Outfit',sans-serif]">
            <Zap className="w-3.5 h-3.5 text-[#122620] fill-[#122620]" />
            INTERACTIVE DENTAL SIMULATION
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#122620] font-['Outfit',sans-serif] tracking-tight">
            Watch How We <TextHighlight color="yellow" variant="wavy">Transform</TextHighlight> You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Select any treatment below to preview the microscopic care and real-time enamel restoration.
          </p>
        </motion.div>

        {/* Treatment Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-6 sm:mb-8"
        >
          {TREATMENTS.map((treatment) => {
            const isSelected = selectedTreatment === treatment.id;
            return (
              <motion.button
                key={treatment.id}
                id={`treatment-tab-${treatment.id}`}
                onClick={() => handleSelectTreatment(treatment.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isSelected ? 1.04 : 0.96,
                }}
                transition={{ type: 'spring', damping: 14, stiffness: 180 }}
                className={`relative px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black tracking-wider transition-all duration-300 font-['Outfit',sans-serif] cursor-pointer select-none border ${
                  isSelected
                    ? 'bg-[#122620] text-[#F4F2BA] shadow-lg shadow-emerald-950/20 border-[#122620] z-10'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-[#122620] border-emerald-100 shadow-sm'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#F4F2BA] animate-pulse" />}
                  {treatment.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Central Visual Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.15, type: 'spring', damping: 16, stiffness: 200 }}
          className="relative bg-white/95 rounded-[28px] sm:rounded-[44px] border-2 border-emerald-100 shadow-[0_20px_60px_-15px_rgba(18,38,32,0.08)] p-4 sm:p-10 overflow-hidden"
        >
          
          {/* Subtle Stage Lighting */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#4BB88E]/15 to-transparent pointer-events-none" />

          {/* Tooth 3D Stage Canvas */}
          <div className="relative min-h-[300px] sm:min-h-[420px] flex items-center justify-center">
            
            {/* Tooth Interactive Container */}
            <div key={animKey} className="relative w-72 h-80 sm:w-88 sm:h-96 flex items-center justify-center">
              
              {/* ======================= ANIMATION: WHITENING ======================= */}
              {selectedTreatment === 'whitening' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* The Tooth SVG */}
                  <motion.div
                    initial={{ filter: 'brightness(0.75) saturate(0.6)' }}
                    animate={{
                      filter: ['brightness(0.75) saturate(0.6)', 'brightness(1.25) saturate(1.2)', 'brightness(1.15) saturate(1)']
                    }}
                    transition={{ duration: 2.2, times: [0, 0.7, 1], ease: 'easeInOut' }}
                    className="relative w-56 sm:w-64"
                  >
                    <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-2xl">
                      <defs>
                        <linearGradient id="whiteningEnamel" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#f7fbf9" />
                          <stop offset="100%" stopColor="#e3f4ec" />
                        </linearGradient>
                        <linearGradient id="shinyLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                          <stop offset="50%" stopColor="rgba(56, 189, 248, 0.85)" />
                          <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                        </linearGradient>
                      </defs>
                      {/* Tooth Body */}
                      <path
                        d="M 40,80 C 40,40 70,25 100,45 C 130,25 160,40 160,80 C 160,130 150,170 140,210 C 130,225 115,220 110,180 C 105,150 95,150 90,180 C 85,220 70,225 60,210 C 50,170 40,130 40,80 Z"
                        fill="url(#whiteningEnamel)"
                        stroke="#4BB88E"
                        strokeWidth="3"
                      />
                      {/* Crown highlights */}
                      <path
                        d="M 60,55 C 80,45 100,55 100,55 C 100,55 120,45 140,55 C 150,75 145,100 145,100"
                        fill="none"
                        stroke="white"
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Sparkle bursts */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.9] }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="absolute top-4 right-6 text-[#F4F2BA]"
                    >
                      <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.2, 0.9], opacity: [0, 1, 0.9] }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="absolute bottom-20 left-4 text-[#4BB88E]"
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                  </motion.div>

                  {/* Sweeping Laser & Polisher Wand */}
                  <motion.div
                    initial={{ x: -180, y: -40, opacity: 0, rotate: -25 }}
                    animate={{
                      x: [-180, 0, 160],
                      y: [-40, 20, 80],
                      opacity: [0, 1, 0],
                      rotate: [-25, 0, 25]
                    }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="absolute z-20 pointer-events-none flex items-center"
                  >
                    <div className="w-36 h-2 bg-gradient-to-r from-[#4BB88E] via-emerald-200 to-white shadow-[0_0_20px_#4BB88E] rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-[#F4F2BA] shadow-[0_0_25px_#F4F2BA] border-2 border-white animate-ping" />
                  </motion.div>
                </div>
              )}

              {/* ======================= ANIMATION: VENEERS ======================= */}
              {selectedTreatment === 'veneers' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Natural Tooth Base */}
                  <div className="relative w-56 sm:w-64">
                    <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-lg opacity-85">
                      <path
                        d="M 40,80 C 40,40 70,25 100,45 C 130,25 160,40 160,80 C 160,130 150,170 140,210 C 130,225 115,220 110,180 C 105,150 95,150 90,180 C 85,220 70,225 60,210 C 50,170 40,130 40,80 Z"
                        fill="#e5effa"
                        stroke="#cbdff5"
                        strokeWidth="2.5"
                      />
                    </svg>

                    {/* Sliding Ultra-Thin Porcelain Veneer Shell */}
                    <motion.div
                      initial={{ x: 140, y: -60, scale: 1.15, opacity: 0, rotate: 12 }}
                      animate={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 18, stiffness: 140, delay: 0.2 }}
                      className="absolute inset-0"
                    >
                      <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-2xl">
                        <defs>
                          <linearGradient id="veneerPorcelain" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="60%" stopColor="#f0f7ff" />
                            <stop offset="100%" stopColor="#bde0fe" />
                          </linearGradient>
                        </defs>
                        {/* Sculpted Veneer Facet */}
                        <path
                          d="M 44,75 C 44,42 72,28 100,46 C 128,28 156,42 156,75 C 156,120 148,160 138,190 C 105,185 95,185 62,190 C 52,160 44,120 44,75 Z"
                          fill="url(#veneerPorcelain)"
                          stroke="#4BB88E"
                          strokeWidth="3.5"
                        />
                        {/* Luminous reflection highlight */}
                        <path
                          d="M 65,60 Q 100,45 135,60"
                          fill="none"
                          stroke="white"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Magnetic click snap star */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 2.5] }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="absolute inset-0 m-auto w-12 h-12 bg-[#F4F2BA]/70 rounded-full blur-sm"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ======================= ANIMATION: IMPLANTS ======================= */}
              {selectedTreatment === 'implants' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-56 sm:w-64 flex flex-col items-center">
                    
                    {/* Zirconia Crown dropping in from top */}
                    <motion.div
                      initial={{ y: -70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.5 }}
                      className="relative z-20 w-44"
                    >
                      <svg viewBox="0 0 160 100" className="w-full h-auto drop-shadow-xl">
                        <defs>
                          <linearGradient id="zirconiaCrown" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="70%" stopColor="#f5faf7" />
                            <stop offset="100%" stopColor="#d4f3e7" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 20,75 C 20,35 50,15 80,35 C 110,15 140,35 140,75 C 140,88 120,95 80,95 C 40,95 20,88 20,75 Z"
                          fill="url(#zirconiaCrown)"
                          stroke="#4BB88E"
                          strokeWidth="3"
                        />
                        <path d="M 40,45 Q 80,30 120,45" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </motion.div>

                    {/* Gold/Titanium Abutment Connector */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="w-16 h-6 bg-gradient-to-r from-amber-300 via-[#F4F2BA] to-amber-400 rounded-sm shadow-md z-10 -mt-2 border border-amber-500/40"
                    />

                    {/* Titanium Biocompatible Threaded Root Screw */}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 140 }}
                      className="w-24 z-0 -mt-1"
                    >
                      <svg viewBox="0 0 100 130" className="w-full h-auto drop-shadow-lg">
                        <defs>
                          <linearGradient id="titaniumScrew" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#122620" />
                          </linearGradient>
                        </defs>
                        {/* Threaded screw silhouette */}
                        <path
                          d="M 25,5 L 75,5 L 70,25 L 76,32 L 68,45 L 74,52 L 66,65 L 72,72 L 64,85 L 70,92 L 55,120 L 45,120 L 30,92 L 36,85 L 28,72 L 34,65 L 26,52 L 32,45 L 24,32 L 30,25 Z"
                          fill="url(#titaniumScrew)"
                          stroke="#122620"
                          strokeWidth="2"
                        />
                        {/* Precision thread marks */}
                        <line x1="30" y1="28" x2="70" y2="28" stroke="#cbd5e1" strokeWidth="2.5" />
                        <line x1="32" y1="48" x2="68" y2="48" stroke="#cbd5e1" strokeWidth="2.5" />
                        <line x1="34" y1="68" x2="66" y2="68" stroke="#cbd5e1" strokeWidth="2.5" />
                        <line x1="36" y1="88" x2="64" y2="88" stroke="#cbd5e1" strokeWidth="2.5" />
                      </svg>
                    </motion.div>

                  </div>
                </div>
              )}

              {/* ======================= ANIMATION: ROOT CANAL ======================= */}
              {selectedTreatment === 'rootcanal' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-56 sm:w-64">
                    {/* Semi-transparent cross section tooth */}
                    <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-xl">
                      {/* Outer translucent enamel */}
                      <path
                        d="M 40,80 C 40,40 70,25 100,45 C 130,25 160,40 160,80 C 160,130 150,170 140,210 C 130,225 115,220 110,180 C 105,150 95,150 90,180 C 85,220 70,225 60,210 C 50,170 40,130 40,80 Z"
                        fill="#f2f9f5"
                        stroke="#4BB88E"
                        strokeWidth="3"
                      />
                      
                      {/* Internal Nerve / Canal Chamber */}
                      <path
                        d="M 80,75 C 80,65 90,60 100,60 C 110,60 120,65 120,75 C 120,95 115,120 125,185 C 118,188 112,175 110,140 C 105,120 95,120 90,140 C 88,175 82,188 75,185 C 85,120 80,95 80,75 Z"
                        fill="#d4f3e7"
                        stroke="#2d7a5b"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Soothing micro-endodontic laser wave inside canal */}
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="absolute inset-x-0 top-16 bottom-12 flex justify-center pointer-events-none"
                    >
                      <div className="w-3 bg-gradient-to-b from-[#4BB88E] via-[#F4F2BA] to-[#122620] rounded-full shadow-[0_0_15px_#4BB88E] animate-pulse" />
                    </motion.div>

                    {/* Sealed clean canal notification */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, type: 'spring' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#122620] text-[#F4F2BA] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full shadow-lg border border-[#F4F2BA]/40 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Check className="w-3.5 h-3.5 text-[#F4F2BA]" />
                      <span>Nerve Protected & Sealed</span>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ======================= ANIMATION: CLEANING ======================= */}
              {selectedTreatment === 'cleaning' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-56 sm:w-64">
                    <svg viewBox="0 0 200 240" className="w-full h-auto drop-shadow-xl">
                      <path
                        d="M 40,80 C 40,40 70,25 100,45 C 130,25 160,40 160,80 C 160,130 150,170 140,210 C 130,225 115,220 110,180 C 105,150 95,150 90,180 C 85,220 70,225 60,210 C 50,170 40,130 40,80 Z"
                        fill="#f7fbff"
                        stroke="#4BB88E"
                        strokeWidth="3"
                      />
                    </svg>

                    {/* Plaque dissolving animation */}
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: 0.4 }}
                      className="absolute top-20 left-12 right-12 h-16 bg-amber-200/60 rounded-2xl blur-sm"
                    />

                    {/* Ultrasonic hydro-brush wand */}
                    <motion.div
                      initial={{ x: -160, y: -20, rotate: -30 }}
                      animate={{
                        x: [-160, 20, 140],
                        y: [-20, 40, -10],
                        rotate: [-30, 10, -20]
                      }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                      {/* Brush instrument tip */}
                      <div className="flex items-center">
                        <div className="w-24 h-4 bg-gradient-to-r from-slate-400 to-slate-200 rounded-full shadow" />
                        <div className="w-8 h-8 rounded-full bg-[#F4F2BA] flex items-center justify-center shadow-lg border-2 border-[#122620] animate-spin">
                          <Sparkles className="w-5 h-5 text-[#122620]" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Refreshing water bubbles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0, scale: 0.5 }}
                        animate={{ y: -60 - i * 15, opacity: [0, 1, 0], scale: 1.2 }}
                        transition={{ duration: 1.4, delay: 0.2 + i * 0.2, repeat: 1 }}
                        style={{ left: `${30 + i * 10}%`, top: '45%' }}
                        className="absolute w-4 h-4 rounded-full bg-emerald-300/80 border border-white backdrop-blur-sm pointer-events-none"
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Replay Button floating top right of stage */}
            <motion.button
              id="replay-animation-btn"
              onClick={handleReplay}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="absolute top-4 right-4 flex items-center gap-1.5 bg-white hover:bg-[#122620] hover:text-[#F4F2BA] px-3.5 py-2 rounded-full text-xs font-extrabold text-[#122620] shadow-sm border border-emerald-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replay Demo</span>
            </motion.button>
          </div>

          {/* Treatment Description Card */}
          <div className="mt-8 pt-6 border-t border-emerald-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
              className="space-y-1.5 max-w-lg text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3 py-1 rounded-full font-['Outfit',sans-serif]">
                  {currentInfo.badge}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  ⏱ {currentInfo.duration}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#122620] font-['Outfit',sans-serif]">
                {currentInfo.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {currentInfo.shortDesc}
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.button
              id="book-this-treatment-btn"
              onClick={() => onSelectTreatmentForBooking(currentInfo.name)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="inline-flex items-center justify-center gap-2 bg-[#122620] hover:bg-[#1b3d33] text-[#F4F2BA] font-extrabold text-sm px-7 py-4 rounded-full shadow-lg transition-colors shrink-0 font-['Outfit',sans-serif] border-2 border-white cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F4F2BA]" />
              <span>Book {currentInfo.name}</span>
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

