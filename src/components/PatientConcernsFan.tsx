import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { playPop, playChime, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

interface ConcernCard {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  tag: string;
  solution: string;
  treatmentName: string;
  color: string;
  badgeText: string;
}

const CONCERNS: ConcernCard[] = [
  {
    id: 'c-1',
    title: 'Tooth Sensitivity & Enamel Wear',
    subtitle: 'Pain with hot or cold drinks? Micro-enamel cracks or erosion.',
    imageSrc: CLINIC_IMAGES.digitalScanner,
    tag: 'SENSITIVITY',
    solution: 'Laser desensitization & protective fluoride sealing',
    treatmentName: 'Consultation & General Checkup',
    color: '#4BB88E',
    badgeText: 'Instant Thermal Relief',
  },
  {
    id: 'c-2',
    title: 'Stained or Yellowing Enamel',
    subtitle: 'Tea, coffee, or aging stains diminishing your confidence.',
    imageSrc: CLINIC_IMAGES.smileResult,
    tag: 'AESTHETICS',
    solution: '45-minute gentle laser whitening up to 8 shades brighter',
    treatmentName: 'WHITENING',
    color: '#F4F2BA',
    badgeText: 'Up to 8 Shades Whiter',
  },
  {
    id: 'c-3',
    title: 'Missing or Broken Teeth',
    subtitle: 'Gaps affecting chewing strength, bite alignment, or smile aesthetics.',
    imageSrc: CLINIC_IMAGES.titaniumImplant,
    tag: 'RESTORATION',
    solution: '3D computer-guided titanium implants with natural zirconia crowns',
    treatmentName: 'IMPLANTS',
    color: '#F4F2BA',
    badgeText: 'Rock-Solid Bio-Integration',
  },
  {
    id: 'c-4',
    title: 'Deep Toothache & Nerve Pain',
    subtitle: 'Persistent throbbing or nocturnal toothache from deep decay.',
    imageSrc: CLINIC_IMAGES.dentistAction,
    tag: 'PAIN RELIEF',
    solution: 'Single-sitting microscopic root canal with painless rotary instruments',
    treatmentName: 'ROOT CANAL',
    color: '#4BB88E',
    badgeText: 'Single-Sitting Mastery',
  },
  {
    id: 'c-5',
    title: 'Bleeding Gums & Biofilm Tartar',
    subtitle: 'Swollen gums, persistent bad breath, or calculus buildup.',
    imageSrc: CLINIC_IMAGES.heroToothWorkers,
    tag: 'GUM HEALTH',
    solution: 'Ultrasonic hydro-polishing and deep periodontal therapy',
    treatmentName: 'CLEANING',
    color: '#D4F3E7',
    badgeText: 'Deep Hydro-Prophylaxis',
  },
];

interface PatientConcernsFanProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const PatientConcernsFan: React.FC<PatientConcernsFanProps> = ({ onSelectTreatment }) => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Center card (Implant) default

  const handlePrev = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev - 1 + CONCERNS.length) % CONCERNS.length);
  };

  const handleNext = () => {
    playChime();
    setActiveIndex((prev) => (prev + 1) % CONCERNS.length);
  };

  const handleSelectCard = (index: number) => {
    if (index === activeIndex) return;
    playChime();
    setActiveIndex(index);
  };

  const activeConcern = CONCERNS[activeIndex];

  return (
    <section id="concerns" className="relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden z-10">
      
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#4BB88E]/15 via-[#F4F2BA]/15 to-[#D4F3E7]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-6 sm:mb-10"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3.5 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
              <Sparkles className="w-3.5 h-3.5 text-[#122620]" />
              PATIENT CONCERNS
            </span>
          </PopBadge>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#122620] font-['Outfit',sans-serif] tracking-tight">
            What Concerns Do Patients <TextHighlight color="yellow" variant="wavy">Come To Us For?</TextHighlight>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto mt-2">
            Every smile has its own unique story. Explore the common dental challenges we gently solve every day at Malabar Hill.
          </p>

          {/* Navigation Controls in Center Top */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <motion.button
              id="concerns-prev-btn"
              onClick={handlePrev}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-11 h-11 rounded-full bg-[#F4F2BA] hover:bg-[#eae89f] text-[#122620] flex items-center justify-center shadow-md border-2 border-white transition-colors cursor-pointer"
              title="Previous Concern"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            <span className="text-xs font-black text-[#122620] bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-xs font-['Outfit',sans-serif]">
              {activeIndex + 1} of {CONCERNS.length} · <span className="text-[#4BB88E]">{activeConcern.tag}</span>
            </span>

            <motion.button
              id="concerns-next-btn"
              onClick={handleNext}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-11 h-11 rounded-full bg-[#F4F2BA] hover:bg-[#eae89f] text-[#122620] flex items-center justify-center shadow-md border-2 border-white transition-colors cursor-pointer"
              title="Next Concern"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        </motion.div>

        {/* Fanned-out 3D Card Stage (Matching Reference Aesthetic) */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-visible py-4">
          
          <div className="relative w-full max-w-4xl h-[340px] sm:h-[400px] flex items-center justify-center">
            {CONCERNS.map((concern, idx) => {
              // Calculate relative offset from activeIndex
              const offset = idx - activeIndex;
              const isCenter = offset === 0;

              const rotationAngle = offset * 10;
              const xPos = offset * 170;
              const scaleVal = isCenter ? 1.05 : Math.max(0.78, 1 - Math.abs(offset) * 0.1);
              const zIndexVal = 20 - Math.abs(offset);
              const isVisible = Math.abs(offset) <= 2; // Show 5 cards max in fan

              if (!isVisible) return null;

              return (
                <motion.div
                  key={concern.id}
                  onClick={() => handleSelectCard(idx)}
                  animate={{
                    x: xPos,
                    rotate: rotationAngle,
                    scale: scaleVal,
                    zIndex: zIndexVal,
                    y: isCenter ? -10 : Math.abs(offset) * 14,
                    opacity: isCenter ? 1 : 0.85,
                  }}
                  whileHover={{
                    scale: isCenter ? 1.08 : scaleVal + 0.06,
                    y: isCenter ? -18 : Math.abs(offset) * 10 - 8,
                  }}
                  transition={{ type: 'spring', damping: 16, stiffness: 220 }}
                  className={`absolute top-0 w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] rounded-[32px] overflow-hidden cursor-pointer select-none shadow-2xl border-4 transition-colors ${
                    isCenter
                      ? 'border-[#F4F2BA] shadow-[0_25px_60px_-15px_rgba(18,38,32,0.3)]'
                      : 'border-white/80 shadow-[0_15px_35px_-10px_rgba(18,38,32,0.18)]'
                  }`}
                  style={{
                    backgroundColor: '#122620',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Card Background Photograph / 3D Asset */}
                  <div className="relative w-full h-full">
                    <img
                      src={concern.imageSrc}
                      alt={concern.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for Top Pill Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

                    {/* Top Pill with Problem Headline & Arrow Button */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-start justify-between gap-2">
                      <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 max-w-[190px]">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#F4F2BA] block font-['Outfit',sans-serif]">
                          {concern.tag}
                        </span>
                        <span className="text-xs font-black text-white leading-tight block truncate mt-0.5">
                          {concern.title}
                        </span>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 15 }}
                        className="w-8 h-8 rounded-full bg-white text-[#122620] flex items-center justify-center shadow-md shrink-0 border border-white"
                      >
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </motion.div>
                    </div>

                    {/* Glowing highlight aura on center card */}
                    {isCenter && (
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#122620] via-[#122620]/80 to-transparent p-4 flex flex-col justify-end">
                        <span className="text-[10px] font-extrabold text-[#F4F2BA] uppercase tracking-wider block font-['Outfit',sans-serif]">
                          ✨ {concern.badgeText}
                        </span>
                        <p className="text-xs text-white/95 font-medium leading-snug line-clamp-2 mt-0.5">
                          {concern.solution}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Focus Summary Card Below Fan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConcern.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="mt-4 sm:mt-6 max-w-xl mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#122620] bg-[#F4F2BA] px-2.5 py-1 rounded-full font-['Outfit',sans-serif]">
                  {activeConcern.tag}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {activeConcern.badgeText}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#122620] font-['Outfit',sans-serif]">
                {activeConcern.title}
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                {activeConcern.solution}
              </p>
            </div>

            <motion.button
              id={`book-concern-btn-${activeConcern.id}`}
              onClick={() => {
                playPop();
                onSelectTreatment(activeConcern.treatmentName);
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="bg-[#122620] hover:bg-[#1b382f] text-[#F4F2BA] font-black text-xs px-6 py-3.5 rounded-full shadow-md font-['Outfit',sans-serif] shrink-0 border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Book For This</span>
              <ArrowUpRight className="w-4 h-4 text-[#F4F2BA]" />
            </motion.button>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
