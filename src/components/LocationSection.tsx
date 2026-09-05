import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Phone, ExternalLink, Sparkles, Clock, Compass, ZoomIn, ZoomOut } from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_DETAILS } from '../data/clinicData';
import { playPop, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const LocationSection: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    playPop();
  };

  return (
    <section id="location" className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-4 sm:px-8 bg-gradient-to-b from-[#F2FAF6] via-[#FAFDFB] to-[#E9F6F0] overflow-hidden z-10">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6"
        >
          <div>
            <PopBadge className="mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-3.5 py-1.5 rounded-full shadow-sm font-['Outfit',sans-serif]">
                <Compass className="w-3.5 h-3.5 text-[#122620]" />
                SOUTH MUMBAI LOCATION
              </span>
            </PopBadge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#122620] font-['Outfit',sans-serif] tracking-tight">
              Malabar Hill, <TextHighlight color="mint" variant="bracket">Mumbai</TextHighlight>
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md font-medium">
            Located along picturesque L.D. Ruparel Marg, adjacent to Priyadarshini Park Gate No. 2 with easy parking.
          </p>
        </motion.div>

        {/* 3D Isometric Map Stage with Interactive Zoom Camera */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 180 }}
          className="relative rounded-[36px] bg-white p-4 sm:p-6 border-2 border-white shadow-[0_25px_70px_-15px_rgba(18,38,32,0.12)] overflow-hidden"
        >
          
          <div className="relative w-full h-[360px] sm:h-[480px] rounded-[28px] overflow-hidden bg-slate-900 group">
            
            {/* The Isometric Illustration Container */}
            <motion.div
              animate={{
                scale: isZoomed ? 1.55 : 1,
                x: isZoomed ? '-8%' : '0%',
                y: isZoomed ? '-8%' : '0%'
              }}
              transition={{ type: 'spring', damping: 14, stiffness: 180 }}
              className="w-full h-full cursor-pointer relative"
              onClick={toggleZoom}
            >
              <img
                src={CLINIC_IMAGES.malabarMap}
                alt="Stylized 3D isometric illustration of Malabar Hill Mumbai coastline"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Glowing Destination Marker Pin at Clinic Position */}
              <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative flex flex-col items-center cursor-pointer group/pin"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                >
                  {/* Outer pulse wave */}
                  <div className="absolute w-16 h-16 rounded-full bg-[#F4F2BA]/60 animate-ping pointer-events-none" />
                  
                  {/* The Golden Pin Head */}
                  <div className="w-12 h-12 rounded-full bg-[#F4F2BA] text-[#122620] flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-[#F4F2BA]/50">
                    <Sparkles className="w-6 h-6 text-[#122620]" />
                  </div>

                  {/* Pin label badge */}
                  <div className="mt-2 bg-[#122620] text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-xl border border-white/20 whitespace-nowrap font-['Outfit',sans-serif]">
                    Dr. Deepal's Clinic 📍
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Top Right Zoom Toggle Pill */}
            <motion.button
              id="map-zoom-toggle-btn"
              onClick={toggleZoom}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-[#122620]/95 hover:bg-[#122620] text-white px-4 py-2.5 rounded-full text-xs font-black shadow-xl border border-white/20 backdrop-blur-md transition-colors cursor-pointer font-['Outfit',sans-serif]"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-4 h-4 text-[#F4F2BA]" />
                  <span>Overview Map</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-4 h-4 text-[#F4F2BA]" />
                  <span>Zoom To Clinic</span>
                </>
              )}
            </motion.button>

            {/* Interactive Clinic Detail Card (Overlaid smoothly) */}
            <AnimatePresence>
              {isZoomed && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-white z-30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#122620] bg-[#F4F2BA] px-2.5 py-1 rounded-full font-['Outfit',sans-serif]">
                        Gate No. 2 · Priyadarshini Park
                      </span>
                      <h3 className="text-xl font-extrabold text-[#122620] font-['Outfit',sans-serif] mt-2">
                        {CLINIC_DETAILS.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Malabar Hill, Mumbai
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium mt-3 mb-4 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100">
                    📍 {CLINIC_DETAILS.address}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <motion.a
                      id="google-maps-directions-link"
                      href={CLINIC_DETAILS.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#122620] hover:bg-[#1b382f] text-[#F4F2BA] font-black text-xs py-3 px-4 rounded-xl shadow-md transition-colors font-['Outfit',sans-serif]"
                    >
                      <Navigation className="w-4 h-4 text-[#F4F2BA]" />
                      <span>Get Directions →</span>
                    </motion.a>

                    <motion.a
                      id="clinic-location-phone-btn"
                      href={`tel:${CLINIC_DETAILS.phoneClean}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-[#122620] font-bold text-xs py-3 px-4 rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#4BB88E]" />
                      <span>Call Clinic</span>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Quick Info Grid below map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-100/80 text-left">
            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-[#4BB88E] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-[#122620] font-['Outfit',sans-serif]">
                  Full Address
                </span>
                <span className="block text-xs text-slate-600 leading-tight mt-0.5 font-medium">
                  Shop No. 9, Gate 2, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl">
              <Clock className="w-5 h-5 text-[#4BB88E] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-[#122620] font-['Outfit',sans-serif]">
                  Timings
                </span>
                <span className="block text-xs text-slate-600 leading-tight mt-0.5 font-medium">
                  Mon – Sat: 10:00 AM – 8:00 PM <br />
                  Sundays: Emergency & by appointment
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl">
              <Phone className="w-5 h-5 text-[#4BB88E] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-[#122620] font-['Outfit',sans-serif]">
                  Direct Contact
                </span>
                <a href={`tel:${CLINIC_DETAILS.phoneClean}`} className="block text-xs text-[#122620] font-bold hover:underline mt-0.5">
                  {CLINIC_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

