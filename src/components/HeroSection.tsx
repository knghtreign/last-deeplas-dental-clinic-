import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Star, ShieldCheck, ArrowUpRight, Award, CheckCircle, Heart, Phone } from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_DETAILS } from '../data/clinicData';
import { playPop, playSparkle } from '../utils/soundEffects';
import { TextHighlight } from './AnimatedText';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [activeWorkerTip, setActiveWorkerTip] = useState<string | null>(null);
  const [toothShine, setToothShine] = useState(false);

  const { scrollY } = useScroll();
  const toothY = useTransform(scrollY, [0, 500], [0, 40]);
  const textY = useTransform(scrollY, [0, 500], [0, -20]);

  const handleWorkerClick = (message: string) => {
    playPop();
    setActiveWorkerTip(message);
    setTimeout(() => {
      setActiveWorkerTip(null);
    }, 3200);
  };

  const triggerToothSparkle = () => {
    playSparkle();
    setToothShine(true);
    setTimeout(() => setToothShine(false), 1200);
  };

  return (
    <section id="hero" className="relative pt-16 sm:pt-24 pb-8 sm:pb-14 px-2.5 sm:px-6 lg:px-8 overflow-visible">
      
      {/* Outer Atmospheric Mint-Lime to Butter Cream Frame */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#EAF6F1] via-[#F5FAF7] to-[#FAF8D8] pointer-events-none" />

      {/* Floating Ambient Aura Highlights */}
      <div className="absolute top-8 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#F4F2BA]/40 rounded-full blur-3xl pointer-events-none -z-20 animate-pulse" />
      <div className="absolute bottom-6 right-6 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#4BB88E]/25 rounded-full blur-3xl pointer-events-none -z-20" />

      {/* Signature Large Curved Mint Jade Canvas */}
      <div className="max-w-7xl mx-auto w-full relative rounded-[28px] sm:rounded-[44px] bg-gradient-to-br from-[#3AA87E] via-[#4BB88E] to-[#369B73] p-4 sm:p-8 lg:p-12 shadow-[0_25px_70px_-15px_rgba(58,168,126,0.32)] border-2 sm:border-4 border-white/70 overflow-hidden text-white">
        
        {/* Subtle inner sheen lighting */}
        <div className="absolute -top-28 -right-28 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-[#F4F2BA]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Navbar Row inside card */}
        <div className="flex items-center justify-between pb-5 sm:pb-8 border-b border-white/20 relative z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#122620] flex items-center justify-center font-black text-xs shadow-sm shrink-0">
              🦷
            </div>
            <span className="font-black text-xs sm:text-base tracking-tight font-['Outfit',sans-serif]">
              Dr. Deepal's <span className="text-[#F4F2BA] font-black">SmileLab</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-white/90">
            <a href="#about" className="hover:text-[#F4F2BA] transition-colors">About</a>
            <a href="#treatments" className="hover:text-[#F4F2BA] transition-colors">Treatments</a>
            <a href="#results" className="hover:text-[#F4F2BA] transition-colors">Smiles</a>
            <a href="#doctor" className="hover:text-[#F4F2BA] transition-colors">Doctor</a>
            <a href="#location" className="hover:text-[#F4F2BA] transition-colors">Location</a>
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-[#F4F2BA] text-[#122620] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-['Outfit',sans-serif]"
          >
            <span>BOOK VISIT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#122620]" />
          </button>
        </div>

        {/* Main Grid: Left Typography + Right Giant 3D Tooth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center pt-6 sm:pt-10 relative z-10">
          
          {/* Left Column: Bold White Typography & Proof Pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 16, stiffness: 180 }}
            style={{ y: textY }}
            className="lg:col-span-6 flex flex-col items-start z-20 space-y-4 sm:space-y-6 text-left"
          >
            {/* Main Display Headline (Responsive: compact on mobile, majestic on desktop) */}
            <div className="space-y-2 sm:space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, type: 'spring', damping: 14 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] sm:leading-[1.04] font-['Outfit',sans-serif]"
              >
                Restore <br />
                Your True <br />
                <span className="flex items-center gap-2.5 flex-wrap">
                  <span className="relative">
                    Smile
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2.5 overflow-visible"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 0,6 Q 25,0 50,6 T 100,6"
                        fill="none"
                        stroke="#F4F2BA"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </svg>
                  </span>

                  {/* +2k Patient Avatars Pill Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: 'spring', delay: 0.3, damping: 12 }}
                    className="inline-flex items-center bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white shadow-md select-none -translate-y-0.5"
                  >
                    <div className="flex -space-x-1.5">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                        alt="Patient"
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                        alt="Patient"
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white object-cover"
                      />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-black text-[#122620] ml-1 font-['Outfit',sans-serif]">
                      +2k
                    </span>
                  </motion.div>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs sm:text-base text-white/95 font-medium max-w-md pt-1 sm:pt-2 leading-relaxed"
              >
                Using <strong className="text-white font-black underline decoration-[#F4F2BA] decoration-2 underline-offset-4">advanced technology</strong>, we deliver comprehensive treatments for a healthy, confident smile.
              </motion.p>
            </div>

            {/* 98% Loyal Dental Patients Card */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.25, type: 'spring', damping: 14 }}
                className="relative bg-white text-[#122620] p-3 sm:p-4 rounded-[22px] sm:rounded-[26px] shadow-lg border-2 border-white flex items-center justify-between sm:justify-start gap-3 group max-w-xs"
              >
                <div className="text-left">
                  <div className="text-xl sm:text-3xl font-extrabold text-[#122620] font-['Outfit',sans-serif] leading-none">
                    98%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">
                    loyal dental patients
                  </div>
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                    alt="Smiling Patient"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              {/* Doctor Credentials Mini Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.35, type: 'spring', damping: 14 }}
                className="bg-white/15 backdrop-blur-md px-3.5 py-2.5 sm:py-3 rounded-2xl border border-white/20 text-xs font-semibold text-white space-y-0.5 sm:space-y-1"
              >
                <div className="flex items-center gap-1 text-[#F4F2BA] font-black text-[11px] sm:text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#F4F2BA]" />
                  <span>5.0 Star Rated (140+ Google Reviews)</span>
                </div>
                <div className="text-white/80 text-[10px] sm:text-[11px] font-medium">
                  Malabar Hill · Priyadarshini Park Gate 2
                </div>
              </motion.div>
            </div>

            {/* Interactive Worker Message Toast */}
            {activeWorkerTip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#122620] text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-[#F4F2BA]/60"
              >
                <Sparkles className="w-4 h-4 text-[#F4F2BA] shrink-0" />
                <span className="font-bold text-[11px] sm:text-xs">{activeWorkerTip}</span>
              </motion.div>
            )}

            {/* Book Appointment CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.45, type: 'spring', damping: 14 }}
              className="pt-1"
            >
              <motion.button
                id="hero-book-appointment-btn"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 bg-[#F4F2BA] hover:bg-[#eae79f] text-[#122620] font-black text-xs sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-emerald-950/20 transition-colors font-['Outfit',sans-serif] border-2 border-white cursor-pointer"
              >
                <span>BOOK YOUR CONSULTATION</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#122620] text-[#F4F2BA] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Giant 3D Tooth with Workers on Ladders & Rotating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 16, stiffness: 180, delay: 0.15 }}
            style={{ y: toothY }}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[280px] sm:min-h-[460px] pt-4 lg:pt-0"
          >
            {/* Visual Glass Stage */}
            <div className="relative w-full max-w-md sm:max-w-lg group">
              
              {/* Backlight halo */}
              <div className="absolute inset-0 bg-white/30 rounded-[36px] filter blur-2xl scale-105 pointer-events-none" />

              {/* The Cinematic Tooth Render Box */}
              <div
                onClick={triggerToothSparkle}
                className="relative cursor-pointer rounded-[28px] sm:rounded-[36px] overflow-hidden border-2 sm:border-4 border-white/80 shadow-2xl bg-gradient-to-b from-[#3AA87E]/30 to-white/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <img
                  src={CLINIC_IMAGES.heroToothWorkers}
                  alt="Dental specialists polishing giant 3D porcelain molar tooth"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Sparkling layer on tap */}
                {toothShine && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-radial from-white/70 via-transparent to-transparent pointer-events-none flex items-center justify-center"
                  >
                    <Sparkles className="w-20 h-20 text-[#F4F2BA] animate-spin" />
                  </motion.div>
                )}

                {/* Worker Hotspots */}
                <button
                  id="worker-polisher-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 1: High-gloss diamond polishing active! ✨");
                  }}
                  className="absolute top-[26%] right-[18%] flex items-center gap-1 bg-white/95 hover:bg-[#122620] hover:text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black text-[#122620] shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif]"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F4F2BA] animate-ping" />
                  <span>Diamond Polish</span>
                </button>

                <button
                  id="worker-mist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 2: Gentle hydro-mist spray active! 💧");
                  }}
                  className="absolute top-[46%] left-[16%] flex items-center gap-1 bg-white/95 hover:bg-[#122620] hover:text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black text-[#122620] shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif]"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-[#4BB88E] animate-pulse" />
                  <span>Hydro-Mist</span>
                </button>

                <button
                  id="worker-scaffold-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 3: Zirconia porcelain strength checked at 100%! 🛡️");
                  }}
                  className="absolute bottom-[24%] left-[26%] flex items-center gap-1 bg-white/95 hover:bg-[#122620] hover:text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black text-[#122620] shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif]"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-[#4BB88E]" />
                  <span>Enamel Check</span>
                </button>
              </div>

              {/* Iconic Butter Rotating Stamp Badge */}
              <motion.div
                onClick={onOpenBooking}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.92 }}
                className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:right-4 w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-[#F4F2BA] text-[#122620] p-1.5 sm:p-2 flex items-center justify-center shadow-[0_15px_35px_rgba(244,242,186,0.55)] cursor-pointer border-2 sm:border-4 border-white z-30"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <path
                      id="heroCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] font-black uppercase tracking-[0.2em] fill-[#122620]">
                      <textPath href="#heroCirclePath" startOffset="0%">
                        • BOOK YOUR CONSULTATION •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 m-auto w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#122620] text-[#F4F2BA] flex items-center justify-center shadow-md">
                    <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Subtle bottom guide */}
      <div className="text-center pt-5 sm:pt-8 pb-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-950/80 font-bold uppercase tracking-widest bg-white/70 backdrop-blur-md px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/80 shadow-sm font-['Outfit',sans-serif]">
          Scroll to explore interactive care ↓
        </span>
      </div>

    </section>
  );
};
