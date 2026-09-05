import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, RotateCw, Eye, MapPin, ShieldCheck, Wind, Cpu } from 'lucide-react';
import { CLINIC_PHOTOS } from '../data/clinicData';
import { playPop, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const ClinicShowcaseStack: React.FC = () => {
  const [cards, setCards] = useState(CLINIC_PHOTOS);
  const [isCycling, setIsCycling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 14,
    mass: 0.3
  });

  // Layered parallax transforms for deep spatial feel
  const imageParallaxY = useTransform(smoothScroll, [0, 1], [-20, 20]);
  const pillParallaxY1 = useTransform(smoothScroll, [0, 1], [-45, 35]);
  const pillParallaxY2 = useTransform(smoothScroll, [0, 1], [35, -40]);
  const pillParallaxY3 = useTransform(smoothScroll, [0, 1], [-30, 25]);

  // Interactive mouse 3D tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const cycleCard = () => {
    if (isCycling) return;
    setIsCycling(true);
    playPop();

    // Rotate top card to the back of array
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });

    setTimeout(() => {
      setIsCycling(false);
    }, 320);
  };

  return (
    <section
      id="clinic-space"
      ref={containerRef}
      className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-3 sm:px-6 lg:px-8 overflow-hidden sm:overflow-visible z-10"
    >
      {/* Background Seamless Transition Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#61A2EE]/15 via-[#C8F8C3]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        
        {/* Minimalist Top Label Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="mb-6 sm:mb-8"
        >
          <PopBadge className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0B1B33] bg-[#E2F743] px-4 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
              <Layers className="w-3.5 h-3.5 text-[#0B1B33]" />
              THE SPACE · MALABAR HILL
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1B33] font-['Outfit',sans-serif] tracking-tight">
            Designed for <TextHighlight color="yellow" variant="wavy">Serene Healing</TextHighlight>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Tap the physical photograph stack to explore the private clinic environment.
          </p>
        </motion.div>

        {/* 3D Depth Stage with Parallax & Floating Information Pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 180 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-2xl h-[320px] sm:h-[420px] mx-auto flex items-center justify-center cursor-pointer select-none"
          style={{ perspective: 1200 }}
        >
          
          {/* FLOATING INFO PILL 1 (Top Left Overlap) */}
          <motion.div
            style={{ y: pillParallaxY1 }}
            animate={{
              y: [0, -5, 0],
              rotate: [0, -1.5, 0]
            }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08, y: -4 }}
            onClick={(e) => { e.stopPropagation(); playSoftClick(); }}
            className="absolute -top-2 sm:-top-5 left-0 sm:-left-6 z-30 pointer-events-auto group hidden xs:block"
          >
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md border border-sky-100 group-hover:border-[#61A2EE] transition-all">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#E2F743] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-black text-[#0B1B33] font-['Outfit',sans-serif] tracking-wide">
                🌿 Sunlit Park Views
              </span>
            </div>
          </motion.div>

          {/* FLOATING INFO PILL 2 (Top Right Overlap) */}
          <motion.div
            style={{ y: pillParallaxY2 }}
            animate={{
              y: [0, 6, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.5 }}
            whileHover={{ scale: 1.08, y: -4 }}
            onClick={(e) => { e.stopPropagation(); playSoftClick(); }}
            className="absolute -top-1 sm:-top-4 right-0 sm:-right-6 z-30 pointer-events-auto group hidden xs:block"
          >
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md border border-sky-100 group-hover:border-[#61A2EE] transition-all">
              <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#61A2EE]" />
              <span className="text-[10px] sm:text-[11px] font-black text-[#0B1B33] font-['Outfit',sans-serif] tracking-wide">
                3D Digital Intraoral Scan
              </span>
            </div>
          </motion.div>

          {/* FLOATING INFO PILL 3 (Bottom Left Overlap) */}
          <motion.div
            style={{ y: pillParallaxY3 }}
            animate={{
              y: [0, -6, 0],
              rotate: [0, 1.5, 0]
            }}
            transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 1 }}
            whileHover={{ scale: 1.08, y: -4 }}
            onClick={(e) => { e.stopPropagation(); playSoftClick(); }}
            className="absolute -bottom-2 sm:-bottom-5 left-0 sm:-left-4 z-30 pointer-events-auto group hidden xs:block"
          >
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md border border-sky-100 group-hover:border-[#61A2EE] transition-all">
              <Wind className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#61A2EE]" />
              <span className="text-[10px] sm:text-[11px] font-black text-[#0B1B33] font-['Outfit',sans-serif] tracking-wide">
                🍃 Quiet & Odour-Free
              </span>
            </div>
          </motion.div>

          {/* FLOATING INFO PILL 4 (Bottom Right Overlap) */}
          <motion.div
            style={{ y: pillParallaxY1 }}
            animate={{
              y: [0, 6, 0],
              rotate: [0, -1.8, 0]
            }}
            transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut', delay: 0.8 }}
            whileHover={{ scale: 1.08, y: -4 }}
            onClick={(e) => { e.stopPropagation(); playSoftClick(); }}
            className="absolute -bottom-1 sm:-bottom-4 right-0 sm:-right-4 z-30 pointer-events-auto group hidden xs:block"
          >
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full shadow-md border border-sky-100 group-hover:border-[#61A2EE] transition-all">
              <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#0B1B33]" />
              <span className="text-[10px] sm:text-[11px] font-black text-[#0B1B33] font-['Outfit',sans-serif] tracking-wide">
                100% Pain-Free Protocols
              </span>
            </div>
          </motion.div>

          {/* THE 3D ROTATING PHOTOGRAPH STACK WITH MOUSE TILT */}
          <motion.div
            style={{
              y: imageParallaxY,
              rotateX: mousePos.y,
              rotateY: mousePos.x,
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={cycleCard}
          >
            {cards.map((card, index) => {
              const isFront = index === 0;

              // Precalculated rotation angles and vertical offsets for physical fan look
              const rotationAngles = [0, 4, -4, 7, -6];
              const rot = rotationAngles[index % rotationAngles.length];
              
              const yOffset = index * 10;
              const scale = 1 - index * 0.05;
              const zIndex = cards.length - index;

              if (index > 3) return null;

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={false}
                  animate={{
                    rotate: rot,
                    y: yOffset,
                    scale: scale,
                    opacity: 1 - index * 0.14,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 14,
                    mass: 0.8
                  }}
                  whileHover={isFront ? { scale: 1.03, rotate: rot * 0.4 } : {}}
                  className="absolute w-[280px] sm:w-[390px] h-[240px] sm:h-[310px] rounded-[28px] sm:rounded-[34px] overflow-hidden bg-white p-2 sm:p-2.5 shadow-[0_20px_50px_-14px_rgba(11,27,51,0.22)] border-2 border-white ring-1 ring-sky-100"
                  style={{
                    zIndex,
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Photo Frame */}
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-slate-900 group">
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none"
                    />

                    {/* Gradient Overlay & Minimal Photographic Tag */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/90 via-transparent to-transparent flex flex-col justify-between p-4 sm:p-5">
                      
                      {/* Top Pill Tag */}
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0B1B33] bg-[#E2F743] px-3 py-1 rounded-full shadow-sm font-['Outfit',sans-serif]">
                          {card.tag}
                        </span>
                        
                        {isFront && (
                          <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center text-xs shadow-inner">
                            <RotateCw className="w-4 h-4 text-[#E2F743]" />
                          </div>
                        )}
                      </div>

                      {/* Bottom Caption */}
                      <div className="text-left text-white">
                        <h4 className="text-base sm:text-lg font-extrabold font-['Outfit',sans-serif] text-white leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#61A2EE] font-bold line-clamp-1 mt-0.5">
                          {card.subtitle}
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>

        {/* Minimal Tap Hint Pill with Framer Motion pop-in */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <motion.button
            id="flip-showcase-photo-btn"
            onClick={cycleCard}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', damping: 12, stiffness: 300 }}
            className="inline-flex items-center gap-2 bg-[#0B1B33] hover:bg-[#142d54] text-white text-[11px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-colors font-['Outfit',sans-serif] cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#E2F743]" />
            <span>Tap To Flip Photograph</span>
          </motion.button>
        </div>

      </div>
    </section>
  );
};

