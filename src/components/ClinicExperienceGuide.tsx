import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Coffee, HeartHandshake, Scan, FileCheck2 } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { playPop, playChime, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

interface VisitStep {
  stepNumber: string;
  tabLabel: string;
  headline: string;
  tagline: string;
  shortDesc: string;
  imageSrc: string;
  keyFeature: string;
  pills: string[];
  accentColor: string;
}

const VISIT_STEPS: VisitStep[] = [
  {
    stepNumber: '01',
    tabLabel: '01 — Say Hello',
    headline: 'Warm Welcome & Calm Arrival',
    tagline: 'RECEPTION & CHECK-IN',
    shortDesc: 'Arrive at our peaceful Malabar Hill clinic. Step into a quiet, clean, and odour-free clinical environment designed to put you at ease.',
    imageSrc: CLINIC_IMAGES.clinicLounge,
    keyFeature: 'Zero Waiting Room Anxiety',
    pills: ['🌿 Sunlit Park Setting', '🕊️ Zero Waiting Anxiety', '✨ Odour-Free Air'],
    accentColor: '#F4F2BA',
  },
  {
    stepNumber: '02',
    tabLabel: '02 — We Listen',
    headline: '1-on-1 Unhurried Dialogue',
    tagline: 'PRIVATE CONSULTATION',
    shortDesc: 'Dr. Deepal listens closely to your goals, past concerns, and comfort preferences without rushing.',
    imageSrc: CLINIC_IMAGES.dentistAction,
    keyFeature: 'Dedicated Patient Time',
    pills: ['🩺 1-on-1 with Dr. Deepal', '🕊️ Anxiety-Free Care', '💬 Honest Advice'],
    accentColor: '#4BB88E',
  },
  {
    stepNumber: '03',
    tabLabel: '03 — Gentle Look',
    headline: '3D Scan & Painless Check',
    tagline: 'HD DIGITAL SCAN',
    shortDesc: 'Instant intraoral 3D scan with soothing topical numbing gels. See your teeth in full high-definition.',
    imageSrc: CLINIC_IMAGES.isometricClinic,
    keyFeature: 'Zero Poking, Zero Pain',
    pills: ['🔍 3D Digital Scan', '❄️ Topical Numbing Gels', '💎 Enamel-Safe'],
    accentColor: '#D4F3E7',
  },
  {
    stepNumber: '04',
    tabLabel: '04 — Clear Plan',
    headline: 'Transparent Care Roadmap',
    tagline: 'UPFRONT PRICING',
    shortDesc: 'Receive clear options with fixed upfront costs and timelines. No surprises, no pressure.',
    imageSrc: CLINIC_IMAGES.clinicSuite,
    keyFeature: '100% Fixed Transparent Costs',
    pills: ['📋 Itemized Estimate', '🛡️ Zero Hidden Fees', '📅 Flexible Slots'],
    accentColor: '#F4F2BA',
  }
];

// Magnetic 3D Tilt Step Button with dynamic lighting
interface TiltStepButtonProps {
  step: VisitStep;
  idx: number;
  isActive: boolean;
  onSelect: (idx: number) => void;
  getIcon: (idx: number) => React.ReactNode;
}

const TiltStepButton: React.FC<TiltStepButtonProps> = ({
  step,
  idx,
  isActive,
  onSelect,
  getIcon,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-0.5, 0.5]
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Rotate bounds: max 12 deg tilt
    setTilt({
      x: -normY * 14,
      y: normX * 14,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50, isHovered: false });
  };

  return (
    <motion.button
      ref={buttonRef}
      id={`guide-step-${step.stepNumber}`}
      onClick={() => onSelect(idx)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.isHovered ? 1.05 : 1,
        y: tilt.isHovered ? -4 : 0,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', damping: 15, stiffness: 280 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`relative p-3 sm:p-3.5 rounded-2xl text-left transition-colors duration-200 font-['Outfit',sans-serif] cursor-pointer select-none border-2 overflow-hidden ${
        isActive
          ? 'bg-[#122620] text-[#F4F2BA] shadow-xl border-[#122620]'
          : 'bg-white hover:bg-emerald-50/50 text-[#122620] border-white shadow-sm'
      }`}
    >
      {/* Magnetic dynamic cursor lighting */}
      {tilt.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: isActive
              ? `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(244, 242, 186, 0.35), transparent 70%)`
              : `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(75, 184, 142, 0.25), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className={`flex items-center gap-1 text-[10px] font-black tracking-wider uppercase ${
            isActive ? 'text-[#F4F2BA]' : 'text-[#4BB88E]'
          }`}>
            {getIcon(idx)}
            <span>STEP {step.stepNumber}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#F4F2BA] animate-pulse' : 'bg-slate-200'}`} />
        </div>
        <div className="text-xs sm:text-sm font-extrabold truncate">
          {step.headline.split(' ')[0]} {step.headline.split(' ')[1] || ''}
        </div>
      </div>
    </motion.button>
  );
};

export const ClinicExperienceGuide: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeStep = VISIT_STEPS[activeStepIdx] || VISIT_STEPS[0];

  const handleSelectStep = (idx: number) => {
    if (idx === activeStepIdx) return;
    playChime();
    setActiveStepIdx(idx);
  };

  const handleNext = () => {
    playChime();
    setActiveStepIdx((prev) => (prev + 1) % VISIT_STEPS.length);
  };

  const handlePrev = () => {
    playSoftClick();
    setActiveStepIdx((prev) => (prev - 1 + VISIT_STEPS.length) % VISIT_STEPS.length);
  };

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Coffee className="w-4 h-4" />;
      case 1:
        return <HeartHandshake className="w-4 h-4" />;
      case 2:
        return <Scan className="w-4 h-4" />;
      case 3:
        return <FileCheck2 className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="about" className="relative py-10 sm:py-16 -mt-2 sm:-mt-4 px-3 sm:px-6 lg:px-8 overflow-hidden z-10">
      
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#4BB88E]/15 via-[#D4F3E7]/25 to-[#F4F2BA]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header with Re-triggering Scroll Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-6 sm:mb-8"
        >
          <PopBadge className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3.5 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
              <Sparkles className="w-3.5 h-3.5 text-[#122620]" />
              VISIT EXPERIENCE
            </span>
          </PopBadge>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#122620] font-['Outfit',sans-serif] tracking-tight">
            What Happens When You <TextHighlight color="yellow" variant="wavy">Visit?</TextHighlight>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-1.5">
            A simple, serene 4-step sequence designed for your complete comfort.
          </p>
        </motion.div>

        {/* Tactile Magnetic 3D Step Selector Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6"
        >
          {VISIT_STEPS.map((step, idx) => (
            <TiltStepButton
              key={step.stepNumber}
              step={step}
              idx={idx}
              isActive={idx === activeStepIdx}
              onSelect={handleSelectStep}
              getIcon={getStepIcon}
            />
          ))}
        </motion.div>

        {/* Dynamic Visual Stage with interactive animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.stepNumber}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', damping: 16, stiffness: 240 }}
            className="bg-white rounded-[32px] sm:rounded-[36px] p-5 sm:p-8 shadow-[0_20px_60px_-15px_rgba(18,38,32,0.12)] border-2 border-white grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            
            {/* Left: Visual Media with Interactive Scan / Glow simulation */}
            <div className="md:col-span-6 relative">
              <div className="relative rounded-[24px] overflow-hidden bg-[#122620] aspect-[4/3] shadow-md border-2 border-emerald-100 group">
                <img
                  src={activeStep.imageSrc}
                  alt={activeStep.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Animated Scanning Beam for Step 03 */}
                {activeStep.stepNumber === '03' && (
                  <motion.div
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F4F2BA] to-transparent shadow-[0_0_15px_#F4F2BA] pointer-events-none"
                  />
                )}

                {/* Step Pill Overlay */}
                <div className="absolute top-3 left-3 bg-[#122620]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-[#F4F2BA] font-['Outfit',sans-serif] border border-white/20">
                  STEP {activeStep.stepNumber} · {activeStep.tagline}
                </div>

                {/* Key feature bar */}
                <div className="absolute bottom-3 inset-x-3 bg-[#122620]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs flex items-center justify-between border border-white/15">
                  <span className="font-bold text-[#F4F2BA] text-[11px] font-['Outfit',sans-serif]">{activeStep.keyFeature}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F4F2BA]" />
                </div>
              </div>
            </div>

            {/* Right: Crisp, Short Copy & Interactive Pills */}
            <div className="md:col-span-6 space-y-4 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3 py-1 rounded-full inline-block mb-1.5 font-['Outfit',sans-serif]">
                  Step {activeStep.stepNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#122620] font-['Outfit',sans-serif] leading-snug">
                  {activeStep.headline}
                </h3>
              </div>

              {/* Short, punchy summary */}
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {activeStep.shortDesc}
              </p>

              {/* Interactive Takeaway Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeStep.pills.map((pill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                    onClick={() => playPop()}
                    className="inline-flex items-center gap-1.5 bg-[#EAF6F1] hover:bg-[#d8efe5] text-[#122620] px-3 py-1.5 rounded-full text-xs font-black border border-emerald-100 shadow-xs cursor-pointer font-['Outfit',sans-serif]"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* Navigation Stepper Controls */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#122620] hover:text-[#F4F2BA] text-[#122620] flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#122620] hover:text-[#F4F2BA] text-[#122620] flex items-center justify-center transition-colors cursor-pointer"
                    title="Next Step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <span className="text-[11px] font-black text-[#4BB88E] font-['Outfit',sans-serif]">
                  Step {activeStepIdx + 1} of {VISIT_STEPS.length}
                </span>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};


