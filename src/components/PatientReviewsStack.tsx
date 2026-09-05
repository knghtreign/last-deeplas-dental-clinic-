import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { REVIEWS } from '../data/clinicData';
import { playPop, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const PatientReviewsStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = REVIEWS[activeIndex];

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    playPop();
    setActiveIndex(index);
  };

  const handleNext = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-4 sm:px-8 overflow-hidden z-10">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#61A2EE]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-8 sm:mb-10"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0B1B33] bg-[#E2F743] px-3.5 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#0B1B33]" />
              PATIENT EXPERIENCES
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1B33] font-['Outfit',sans-serif] tracking-tight">
            Voices from <TextHighlight color="blue" variant="bracket">Our Patients</TextHighlight>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto mt-2">
            Tap any patient portrait to read their firsthand story.
          </p>
        </motion.div>

        {/* Orbiting / Surrounding Patient Cards Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-8 flex-wrap"
        >
          {REVIEWS.map((review, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <motion.div
                key={review.id}
                onClick={() => handleSelect(idx)}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isSelected ? 1.12 : 0.92,
                  rotate: isSelected ? 0 : review.rotation,
                  opacity: isSelected ? 1 : 0.65,
                  filter: isSelected ? 'blur(0px)' : 'blur(0.5px)',
                }}
                transition={{ type: 'spring', damping: 14, stiffness: 180 }}
                className={`relative cursor-pointer p-1 rounded-2xl bg-white transition-all select-none ${
                  isSelected
                    ? 'ring-3 ring-[#0B1B33] shadow-xl shadow-sky-950/20 z-20'
                    : 'shadow-md hover:opacity-90 z-10 border border-sky-100'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={review.avatarUrl}
                    alt={review.patientName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isSelected && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#E2F743] text-[#0B1B33] font-bold flex items-center justify-center text-[10px] shadow border border-white">
                    ★
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Central Editorial Review Stage with 3D Slide & Horizontal Drag */}
        <div className="relative max-w-2xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 25, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -25, scale: 0.96 }}
              transition={{ type: 'spring', damping: 24, stiffness: 240 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) handleNext();
                else if (swipe > 50) handlePrev();
              }}
              className="relative bg-white/95 backdrop-blur-xl rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(11,27,51,0.15)] border-2 border-white text-center select-none"
            >
              {/* Subtle Quote Glyphs */}
              <div className="flex justify-center mb-3">
                <Quote className="w-8 h-8 text-[#61A2EE]/40 rotate-180" />
              </div>

              {/* Short Authentic Review Text */}
              <p className="text-base sm:text-xl font-bold text-[#0B1B33] font-['Outfit',sans-serif] leading-relaxed tracking-tight mb-6">
                "{activeReview.reviewText}"
              </p>

              {/* Patient Meta, Treatment & Rating */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                
                {/* Patient details */}
                <div className="text-center sm:text-left flex items-center gap-3">
                  <img
                    src={activeReview.avatarUrl}
                    alt={activeReview.patientName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#61A2EE] shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                      <span className="font-black text-sm text-[#0B1B33] font-['Outfit',sans-serif]">
                        {activeReview.patientName}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-xs text-[#61A2EE] font-bold">
                      {activeReview.treatment}
                    </span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 bg-[#E2F743] px-3.5 py-1.5 rounded-full text-xs font-black text-[#0B1B33] font-['Outfit',sans-serif] shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#0B1B33] text-[#0B1B33]" />
                  <span>5.0 Verified</span>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Sleek Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <motion.button
              id="prev-review-btn"
              onClick={handlePrev}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#0B1B33] hover:text-white border border-sky-100 text-[#0B1B33] flex items-center justify-center shadow-sm transition-colors cursor-pointer font-bold"
              title="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <span className="text-xs font-black text-slate-400 font-['Outfit',sans-serif]">
              {activeIndex + 1} / {REVIEWS.length}
            </span>
            <motion.button
              id="next-review-btn"
              onClick={handleNext}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#0B1B33] hover:text-white border border-sky-100 text-[#0B1B33] flex items-center justify-center shadow-sm transition-colors cursor-pointer font-bold"
              title="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
};

